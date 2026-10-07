(function () {
  // ===========================================
  // FIREBASE CONFIG
  // The Realtime Database is only used as a lobby registry (keyword -> host
  // peer id). Its security rules live in database.rules.json — deploy them
  // with `firebase deploy --only database` or paste them into the console.
  // ===========================================
  const FIREBASE_CONFIG = {
    apiKey: "AIzaSyC2Vof647jkwdVVpdZ-yhX3hdxiY1mTnAM",
    authDomain: "military-guesser.firebaseapp.com",
    databaseURL: "https://military-guesser-default-rtdb.firebaseio.com",
    projectId: "military-guesser",
    storageBucket: "military-guesser.firebasestorage.app",
    messagingSenderId: "127985179137",
    appId: "1:127985179137:web:9f5e1d80a09682a082fe00"
  };
  // ===========================================

  const mainMenu = document.getElementById("main-menu");
  const btnMp = document.getElementById("btn-mp");
  const mpMenu = document.getElementById("mp-menu");
  const mpNameInput = document.getElementById("mp-name");
  const mpKeywordInput = document.getElementById("mp-keyword");
  const mpError = document.getElementById("mp-error");
  const mpBack = document.getElementById("mp-back");
  const mpJoin = document.getElementById("mp-join");
  const mpLobby = document.getElementById("mp-lobby");
  const lobbyKeywordDisplay = document.getElementById("lobby-keyword-display");
  const lobbyPlayers = document.getElementById("lobby-players");
  const lobbySettingsSummary = document.getElementById("lobby-settings-summary");
  const hostSettings = document.getElementById("host-settings");
  const lobbyLeave = document.getElementById("lobby-leave");
  const lobbyReady = document.getElementById("lobby-ready");
  const lobbyStart = document.getElementById("lobby-start");
  const mpCategoryChips = document.querySelectorAll("#mp-category-chips .chip");
  const mpEraChips = document.querySelectorAll("#mp-era-chips .chip");
  const mpRoundRadios = document.getElementsByName("mp-rounds");
  const mpTimeRadios = document.getElementsByName("mp-time");
  const mpTimerBar = document.getElementById("mp-timer-bar");
  const mpScores = document.getElementById("mp-scores");
  const mpRoundNum = document.getElementById("mp-round-num");
  const mpRoundTotal = document.getElementById("mp-round-total");
  const mpResultModal = document.getElementById("mp-result-modal");
  const mpResultTitle = document.getElementById("mp-result-title");
  const mpResultBody = document.getElementById("mp-result-body");
  const mpResultScores = document.getElementById("mp-result-scores");
  const mpResultAction = document.getElementById("mp-result-action");

  const LOBBY_PREFIX = "militaryGuesserLobbies/";
  // Bump when the message format changes so mismatched clients get a clear error.
  const PROTOCOL_VERSION = 2;
  const JOIN_TIMEOUT_MS = 12000;
  const MAX_PLAYERS = 10;
  const INTERMISSION_SECONDS = 5;

  let peer = null;
  let isHost = false;
  let myPeerId = null;
  let myName = "";
  let lobbyKeyword = "";
  let connections = {};
  let players = {};
  let dbRef = null;
  let lobbyRef = null;
  let hostPeerId = null;
  let hostConn = null;
  let joinTimer = null;
  let takeoverAttempted = false;
  let mpSettings = {
    categories: new Set(),
    eras: new Set(),
    rounds: 10,
    timeLimit: 30
  };

  let gameActive = false;
  let roundActive = false;
  let currentRound = 0;
  let roundAssets = [];
  let roundStartTime = 0;
  let roundShownAt = 0;
  let roundTimerInterval = null;
  let roundResults = {};
  let hostRoundTimeout = null;
  let intermissionTimer = null;

  function initFirebase() {
    if (typeof firebase === "undefined") {
      showError("Firebase SDK not loaded. Check your connection or ad blocker.");
      return false;
    }
    if (!firebase.apps.length) {
      try {
        firebase.initializeApp(FIREBASE_CONFIG);
      } catch (e) {
        showError("Firebase config invalid. Check your FIREBASE_CONFIG.");
        return false;
      }
    }
    dbRef = firebase.database().ref(LOBBY_PREFIX);
    return true;
  }

  function describeFirebaseError(err) {
    const text = String((err && (err.code || err.message)) || err);
    if (/permission/i.test(text)) {
      return "The lobby server refused the request (Firebase permission denied). Multiplayer is unavailable until the database rules are fixed.";
    }
    return "Failed to reach the lobby server. Check your connection and try again.";
  }

  function getEra(year) {
    if (year <= 1945) return "World War II";
    if (year <= 1991) return "Cold War";
    return "Post-Cold War";
  }

  function getFilteredPool() {
    return db.filter((item) => {
      if (mpSettings.categories.size > 0 && !mpSettings.categories.has(item.category)) return false;
      if (mpSettings.eras.size > 0 && !mpSettings.eras.has(getEra(item.year))) return false;
      return true;
    });
  }

  // Cheap fingerprint of the asset database so host and clients can detect a
  // stale cached db.js (asset ids would otherwise silently point at nothing).
  function getDbSignature() {
    let hash = 5381;
    const str = db.map((a) => a.id + ":" + a.name).join("|");
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) + hash + str.charCodeAt(i)) | 0;
    }
    return db.length + "-" + (hash >>> 0).toString(36);
  }

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function calculatePoints(elapsedMs) {
    const maxTime = mpSettings.timeLimit * 1000;
    const rate = 900 / maxTime;
    return Math.max(100, Math.round(1000 - elapsedMs * rate));
  }

  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  function sanitizeName(name) {
    return String(name || "").trim().substring(0, 16) || "Player";
  }

  function displayName(id, name) {
    return name + (id === myPeerId ? " (You)" : "");
  }

  function showError(msg) {
    mpError.textContent = msg;
    mpError.classList.remove("hidden");
  }

  function clearError() {
    mpError.classList.add("hidden");
  }

  function setConnecting(connecting) {
    mpJoin.disabled = connecting;
    mpJoin.textContent = connecting ? "Connecting..." : "Join / Create";
  }

  function inSession() {
    return mpLobby.classList.contains("open") || gameActive;
  }

  function openMpMenu() {
    mainMenu.classList.remove("open");
    mpMenu.classList.add("open");
    clearError();
  }

  function backToMainMenu() {
    cleanupAll();
    mpMenu.classList.remove("open");
    mpLobby.classList.remove("open");
    mpResultModal.classList.remove("open");
    mainMenu.classList.add("open");
  }

  // Tear everything down and land on the multiplayer menu with a visible error.
  function failToMenu(msg) {
    cleanupAll();
    mpLobby.classList.remove("open");
    mpResultModal.classList.remove("open");
    mainMenu.classList.remove("open");
    mpMenu.classList.add("open");
    showError(msg);
  }

  function cleanupAll() {
    gameActive = false;
    roundActive = false;
    clearInterval(roundTimerInterval);
    clearInterval(intermissionTimer);
    clearTimeout(hostRoundTimeout);
    clearTimeout(joinTimer);
    if (isHost && lobbyRef && myPeerId) {
      // Only remove the lobby record if it still points at us. Returning null
      // for an empty local cache makes Firebase re-run us with the server value.
      const id = myPeerId;
      lobbyRef.onDisconnect().cancel();
      lobbyRef.transaction((cur) => (!cur || cur.hostPeerId === id ? null : undefined)).catch(() => {});
    }
    const oldPeer = peer;
    peer = null;
    if (oldPeer) {
      try { oldPeer.destroy(); } catch (e) {}
    }
    lobbyRef = null;
    hostPeerId = null;
    hostConn = null;
    connections = {};
    players = {};
    isHost = false;
    myPeerId = null;
    lobbyKeyword = "";
    takeoverAttempted = false;
    setConnecting(false);
    if (window.GameAPI) window.GameAPI.enableMultiplayer(false);
  }

  function getLobbyPath(keyword) {
    return keyword.toLowerCase().replace(/[^a-z0-9]/g, "").substring(0, 32);
  }

  if (mpJoin) {
    mpJoin.addEventListener("click", () => {
      clearError();
      if (peer) return;
      myName = sanitizeName(mpNameInput.value);
      const path = getLobbyPath(mpKeywordInput.value || "");
      if (!path) { showError("Enter a lobby keyword (letters and numbers only)."); return; }
      if (typeof Peer === "undefined") { showError("PeerJS not loaded. Check your connection or ad blocker."); return; }
      if (!initFirebase()) return;

      lobbyKeyword = path;
      lobbyRef = dbRef.child(path);
      setConnecting(true);
      connectPeer();
    });
  }

  function connectPeer() {
    const p = new Peer();
    peer = p;
    p.on("open", (id) => {
      if (peer !== p) return;
      myPeerId = id;
      claimOrJoinLobby(null);
    });
    p.on("connection", (conn) => {
      if (peer !== p) return;
      onIncomingConnection(conn);
    });
    // The signalling server drops idle sockets now and then; existing data
    // connections survive, but the host must re-register to accept new joins.
    p.on("disconnected", () => {
      if (peer !== p || p.destroyed) return;
      try { p.reconnect(); } catch (e) {}
    });
    p.on("error", (err) => {
      if (peer !== p) return;
      onPeerError(err);
    });
  }

  // Atomically become host if the lobby is free (or held by a host we know is
  // dead), otherwise join whoever holds it.
  function claimOrJoinLobby(staleHostId) {
    const ref = lobbyRef;
    const myId = myPeerId;
    ref.transaction((cur) => {
      if (cur && cur.hostPeerId && cur.hostPeerId !== staleHostId) return;
      return { hostPeerId: myId, created: firebase.database.ServerValue.TIMESTAMP };
    }).then((result) => {
      if (lobbyRef !== ref) return;
      if (result.committed) {
        startHosting();
      } else {
        joinHost(result.snapshot.val().hostPeerId);
      }
    }).catch((err) => {
      console.error("Lobby lookup failed:", err);
      if (lobbyRef !== ref) return;
      failToMenu(describeFirebaseError(err));
    });
  }

  function startHosting() {
    isHost = true;
    lobbyRef.onDisconnect().remove();
    players = {};
    players[myPeerId] = { name: myName, ready: true, score: 0, isHost: true, guessedThisRound: false };
    mpSettings = { categories: new Set(), eras: new Set(), rounds: 10, timeLimit: 30 };
    updateLobbySettingsUI();
    setConnecting(false);
    showLobby();
  }

  function joinHost(hpid) {
    hostPeerId = hpid;
    const conn = peer.connect(hpid, { reliable: true });
    hostConn = conn;
    clearTimeout(joinTimer);
    joinTimer = setTimeout(() => {
      if (hostConn !== conn || conn.open) return;
      failToMenu("Couldn't connect to the lobby host. One of you may be behind a strict firewall/NAT — try again or use a different network.");
    }, JOIN_TIMEOUT_MS);
    conn.on("open", () => {
      if (hostConn !== conn) return;
      clearTimeout(joinTimer);
      connections[hpid] = conn;
      conn.send({ type: "join", name: myName, version: PROTOCOL_VERSION, dbSignature: getDbSignature() });
    });
    conn.on("data", (data) => {
      if (hostConn !== conn) return;
      handleClientMessage(data);
    });
    conn.on("close", () => {
      if (hostConn !== conn || !inSession()) return;
      failToMenu("Host disconnected.");
    });
    conn.on("error", (err) => console.warn("Host connection error:", err));
  }

  function onPeerError(err) {
    console.error("PeerJS error:", err.type, err);
    if (err.type === "peer-unavailable" && !isHost && !inSession()) {
      // The lobby record points at a host that no longer exists (e.g. the tab
      // crashed before Firebase cleaned up). Take the lobby over once.
      clearTimeout(joinTimer);
      hostConn = null;
      if (!takeoverAttempted) {
        takeoverAttempted = true;
        claimOrJoinLobby(hostPeerId);
      } else {
        failToMenu("Lobby host is unreachable. Try again in a moment.");
      }
      return;
    }
    if (!inSession()) {
      failToMenu("Connection error (" + err.type + "). Try again in a moment.");
    }
    // During a session most errors are non-fatal; data connections keep working.
  }

  if (btnMp) btnMp.addEventListener("click", openMpMenu);
  if (mpBack) mpBack.addEventListener("click", backToMainMenu);

  function notifyLeaving() {
    if (isHost) {
      broadcast({ type: "host_left" });
    } else if (hostConn && hostConn.open) {
      hostConn.send({ type: "leave" });
    }
  }

  if (lobbyLeave) {
    lobbyLeave.addEventListener("click", () => {
      notifyLeaving();
      backToMainMenu();
    });
  }

  window.addEventListener("pagehide", () => {
    if (peer) notifyLeaving();
  });

  if (lobbyReady) {
    lobbyReady.addEventListener("click", () => {
      const me = players[myPeerId];
      if (!me) return;
      me.ready = !me.ready;
      renderLobby();
      if (hostConn && hostConn.open) hostConn.send({ type: "ready", ready: me.ready });
    });
  }

  if (lobbyStart) lobbyStart.addEventListener("click", hostStartGame);
  if (mpResultAction) mpResultAction.addEventListener("click", onResultContinue);

  mpCategoryChips.forEach((chip) => {
    chip.addEventListener("click", () => { chip.classList.toggle("active"); onMpSettingsChange(); });
  });
  mpEraChips.forEach((chip) => {
    chip.addEventListener("click", () => { chip.classList.toggle("active"); onMpSettingsChange(); });
  });
  Array.from(mpRoundRadios).forEach((r) => r.addEventListener("change", onMpSettingsChange));
  Array.from(mpTimeRadios).forEach((r) => r.addEventListener("change", onMpSettingsChange));

  // Host handlers
  function onIncomingConnection(conn) {
    // Attach the data listener immediately so the client's first message
    // can't arrive before we're listening.
    conn.on("data", (data) => handleHostMessage(conn, data));
    conn.on("open", () => { connections[conn.peer] = conn; });
    conn.on("close", () => handleClientDisconnect(conn.peer));
    conn.on("error", (err) => console.warn("Client connection error:", err));
  }

  function rejectConnection(conn, reason) {
    if (conn.open) conn.send({ type: "rejected", reason });
    setTimeout(() => { try { conn.close(); } catch (e) {} }, 500);
  }

  function handleHostMessage(conn, data) {
    if (!isHost || !data || !data.type) return;
    const pid = conn.peer;
    switch (data.type) {
      case "join":
        if (data.version !== PROTOCOL_VERSION || data.dbSignature !== getDbSignature()) {
          rejectConnection(conn, "Your game version doesn't match the host's. Both players should hard-refresh the page (Ctrl+Shift+R) and try again.");
          return;
        }
        if (gameActive) {
          rejectConnection(conn, "A game is already in progress in this lobby. Try again when it ends.");
          return;
        }
        if (!players[pid] && Object.keys(players).length >= MAX_PLAYERS) {
          rejectConnection(conn, "This lobby is full.");
          return;
        }
        connections[pid] = conn;
        players[pid] = { name: sanitizeName(data.name), ready: false, score: 0, isHost: false, guessedThisRound: false, connection: conn };
        broadcastLobbyState();
        break;
      case "ready":
        if (players[pid]) {
          players[pid].ready = !!data.ready;
          broadcastLobbyState();
        }
        break;
      case "leave":
        handleClientDisconnect(pid);
        break;
      case "guess":
        handleHostGuess(pid, data);
        break;
    }
  }

  function handleClientDisconnect(pid) {
    delete connections[pid];
    if (!players[pid]) return;
    delete players[pid];
    if (gameActive) {
      broadcast({ type: "player_left", id: pid });
      renderScores();
      checkRoundEndCondition();
    } else {
      broadcastLobbyState();
    }
  }

  function serializeSettings() {
    return {
      categories: Array.from(mpSettings.categories),
      eras: Array.from(mpSettings.eras),
      rounds: mpSettings.rounds,
      timeLimit: mpSettings.timeLimit
    };
  }

  function applySettings(s) {
    mpSettings.categories = new Set(s.categories || []);
    mpSettings.eras = new Set(s.eras || []);
    mpSettings.rounds = s.rounds || 10;
    mpSettings.timeLimit = s.timeLimit || 30;
  }

  function broadcastLobbyState() {
    broadcast({
      type: "lobby_state",
      players: Object.entries(players).map(([id, p]) => ({
        id, name: p.name, ready: p.ready, score: p.score, isHost: p.isHost
      })),
      settings: serializeSettings()
    });
    renderLobby();
  }

  function broadcast(msg) {
    Object.values(connections).forEach((conn) => {
      if (conn && conn.open) conn.send(msg);
    });
  }

  // Client handlers
  function handleClientMessage(data) {
    if (!data || !data.type) return;
    switch (data.type) {
      case "lobby_state":
        players = {};
        data.players.forEach((p) => {
          players[p.id] = { name: p.name, ready: p.ready, score: p.score, isHost: p.isHost };
        });
        applySettings(data.settings || {});
        updateLobbySettingsUI();
        if (!gameActive && !mpLobby.classList.contains("open")) {
          setConnecting(false);
          mpMenu.classList.remove("open");
          mpLobby.classList.add("open");
        }
        renderLobby();
        break;
      case "update_settings":
        applySettings(data.settings || {});
        updateLobbySettingsUI();
        renderLobby();
        break;
      case "rejected":
        failToMenu(data.reason || "The host rejected the connection.");
        break;
      case "start_game":
        startClientGame(data);
        break;
      case "round_start":
        startClientRound(data);
        break;
      case "guess_result":
        if (window.GameAPI) window.GameAPI.handleMpGuessResult(data.correct);
        break;
      case "player_guessed":
        if (data.id && players[data.id]) players[data.id].guessedThisRound = true;
        if (data.id !== myPeerId) showToast(data.name + " guessed correctly!");
        renderScores();
        break;
      case "player_left":
        delete players[data.id];
        renderScores();
        break;
      case "round_end":
      case "game_over":
        showRoundResult(data);
        break;
      case "host_left":
        failToMenu("The host left the lobby.");
        break;
    }
  }

  // Lobby UI
  function showLobby() {
    mpMenu.classList.remove("open");
    mpLobby.classList.add("open");
    renderLobby();
  }

  function describeSettings() {
    const cats = mpSettings.categories.size ? Array.from(mpSettings.categories).join(", ") : "All categories";
    const eras = mpSettings.eras.size ? Array.from(mpSettings.eras).join(", ") : "All eras";
    return cats + " • " + eras + " • " + mpSettings.rounds + " rounds • " + mpSettings.timeLimit + "s";
  }

  function renderLobby() {
    lobbyKeywordDisplay.textContent = lobbyKeyword ? "(" + lobbyKeyword + ")" : "";
    hostSettings.classList.toggle("hidden", !isHost);
    lobbyStart.classList.toggle("hidden", !isHost);
    lobbyReady.classList.toggle("hidden", isHost);
    if (lobbySettingsSummary) {
      lobbySettingsSummary.classList.toggle("hidden", isHost);
      lobbySettingsSummary.textContent = describeSettings();
    }
    const me = players[myPeerId];
    lobbyReady.textContent = me && me.ready ? "Not Ready" : "Ready";

    lobbyPlayers.innerHTML = "";
    Object.entries(players).forEach(([id, p]) => {
      const div = document.createElement("div");
      div.className = "lobby-player" + (p.ready ? " ready" : "");
      const star = p.isHost ? '<span class="lobby-host-star">★</span>' : "";
      const status = p.ready ? "Ready" : "Not Ready";
      div.innerHTML = '<div class="lobby-player-name">' + escapeHtml(displayName(id, p.name)) + " " + star + '</div><div class="lobby-player-status">' + status + "</div>";
      lobbyPlayers.appendChild(div);
    });

    if (isHost) {
      const allReady = Object.values(players).every((p) => p.isHost || p.ready);
      lobbyStart.disabled = !allReady;
      lobbyStart.style.opacity = allReady ? "1" : "0.5";
    }
  }

  function updateLobbySettingsUI() {
    mpCategoryChips.forEach((chip) => {
      chip.classList.toggle("active", mpSettings.categories.has(chip.dataset.value));
    });
    mpEraChips.forEach((chip) => {
      chip.classList.toggle("active", mpSettings.eras.has(chip.dataset.value));
    });
    Array.from(mpRoundRadios).forEach((r) => {
      r.checked = String(r.value) === String(mpSettings.rounds);
    });
    Array.from(mpTimeRadios).forEach((r) => {
      r.checked = String(r.value) === String(mpSettings.timeLimit);
    });
  }

  function readMpSettings() {
    const categories = new Set();
    mpCategoryChips.forEach((c) => { if (c.classList.contains("active")) categories.add(c.dataset.value); });
    const eras = new Set();
    mpEraChips.forEach((c) => { if (c.classList.contains("active")) eras.add(c.dataset.value); });
    const rounds = parseInt(Array.from(mpRoundRadios).find((r) => r.checked)?.value || "10", 10);
    const timeLimit = parseInt(Array.from(mpTimeRadios).find((r) => r.checked)?.value || "30", 10);
    return { categories, eras, rounds, timeLimit };
  }

  function onMpSettingsChange() {
    if (!isHost) return;
    mpSettings = readMpSettings();
    broadcast({ type: "update_settings", settings: serializeSettings() });
    renderLobby();
  }

  // Game start
  function hostStartGame() {
    const pool = getFilteredPool();
    if (pool.length < mpSettings.rounds) {
      alert("Only " + pool.length + " assets match the selected filters. Need at least " + mpSettings.rounds + ".");
      return;
    }
    roundAssets = shuffle([...pool]).slice(0, mpSettings.rounds);
    currentRound = 0;
    gameActive = true;
    Object.values(players).forEach((p) => {
      p.score = 0;
      p.guessedThisRound = false;
    });
    broadcast({
      type: "start_game",
      rounds: mpSettings.rounds,
      timeLimit: mpSettings.timeLimit,
      assetIds: roundAssets.map((a) => a.id)
    });
    mpLobby.classList.remove("open");
    if (window.GameAPI) window.GameAPI.enableMultiplayer(true, { onGuess: onMpGuess });
    startHostRound();
  }

  function startClientGame(data) {
    gameActive = true;
    // A slow intermission countdown from the previous game must not fire
    // returnToLobby() in the middle of this one.
    clearInterval(intermissionTimer);
    mpSettings.rounds = data.rounds;
    mpSettings.timeLimit = data.timeLimit;
    roundAssets = data.assetIds.map((id) => db.find((x) => x.id === id)).filter(Boolean);
    currentRound = 0;
    Object.values(players).forEach((p) => { p.score = 0; });
    mpLobby.classList.remove("open");
    if (window.GameAPI) window.GameAPI.enableMultiplayer(true, { onGuess: onMpGuess });
  }

  // Round logic
  function startHostRound() {
    if (currentRound >= roundAssets.length) {
      returnToLobby();
      return;
    }
    roundResults = {};
    roundActive = true;
    const asset = roundAssets[currentRound];
    Object.values(players).forEach((p) => { p.guessedThisRound = false; });
    broadcast({ type: "round_start", roundIndex: currentRound, assetId: asset.id });
    loadRoundAsset(asset);
    roundStartTime = Date.now();
    startTimer(mpSettings.timeLimit);
    hostRoundTimeout = setTimeout(endHostRound, mpSettings.timeLimit * 1000);
  }

  function startClientRound(data) {
    currentRound = data.roundIndex;
    clearInterval(intermissionTimer);
    mpResultModal.classList.remove("open");
    Object.values(players).forEach((p) => { p.guessedThisRound = false; });
    const asset = db.find((x) => x.id === data.assetId);
    if (asset) loadRoundAsset(asset);
    startTimer(mpSettings.timeLimit);
  }

  function loadRoundAsset(asset) {
    mpRoundNum.textContent = currentRound + 1;
    mpRoundTotal.textContent = mpSettings.rounds;
    roundShownAt = 0;
    if (window.GameAPI) {
      const roundIndex = currentRound;
      window.GameAPI.loadAsset(asset).then(() => {
        if (currentRound === roundIndex) roundShownAt = Date.now();
      });
      window.GameAPI.clearHistory();
      window.GameAPI.setInputDisabled(false);
      const next = roundAssets[currentRound + 1];
      if (next) window.GameAPI.preloadAsset(next);
    }
    renderScores();
  }

  function startTimer(seconds) {
    clearInterval(roundTimerInterval);
    mpTimerBar.style.width = "100%";
    mpTimerBar.classList.remove("low");
    const end = Date.now() + seconds * 1000;
    roundTimerInterval = setInterval(() => {
      const remaining = Math.max(0, end - Date.now());
      const pct = (remaining / (seconds * 1000)) * 100;
      mpTimerBar.style.width = pct + "%";
      if (pct < 25) mpTimerBar.classList.add("low");
      if (remaining <= 0) clearInterval(roundTimerInterval);
    }, 100);
  }

  function onMpGuess(guess) {
    if (!gameActive) return;
    // Points are based on time since the image actually appeared for this
    // player, so slow image downloads don't cost points.
    const elapsedMs = roundShownAt ? Date.now() - roundShownAt : 0;
    const msg = { type: "guess", name: guess.name, elapsedMs };
    if (isHost) {
      handleHostGuess(myPeerId, msg);
    } else if (hostConn && hostConn.open) {
      hostConn.send(msg);
    }
  }

  function handleHostGuess(pid, data) {
    if (!gameActive || !roundActive) return;
    const asset = roundAssets[currentRound];
    const player = players[pid];
    if (!asset || !player || player.guessedThisRound) return;
    const correct = data.name === asset.name;

    const resultMsg = { type: "guess_result", correct };
    if (pid === myPeerId) {
      if (window.GameAPI) window.GameAPI.handleMpGuessResult(correct);
    } else if (player.connection && player.connection.open) {
      player.connection.send(resultMsg);
    }

    if (correct) {
      player.guessedThisRound = true;
      const hostElapsed = Math.max(0, Date.now() - roundStartTime);
      const reported = Number(data.elapsedMs);
      const elapsed = Number.isFinite(reported) ? Math.min(Math.max(0, reported), hostElapsed) : hostElapsed;
      roundResults[pid] = { elapsedMs: elapsed };
      player.score = (player.score || 0) + calculatePoints(elapsed);
      broadcast({ type: "player_guessed", id: pid, name: player.name });
      renderScores();
      checkRoundEndCondition();
    }
  }

  function checkRoundEndCondition() {
    if (!gameActive || !roundActive) return;
    const allGuessed = Object.values(players).every((p) => p.guessedThisRound);
    if (allGuessed) endHostRound();
  }

  function endHostRound() {
    if (!roundActive) return;
    roundActive = false;
    clearInterval(roundTimerInterval);
    clearTimeout(hostRoundTimeout);
    const asset = roundAssets[currentRound];
    const scoresList = Object.entries(players).map(([pid, p]) => ({
      id: pid,
      name: p.name,
      score: p.score || 0,
      roundPoints: roundResults[pid] ? calculatePoints(roundResults[pid].elapsedMs) : 0,
      correct: !!roundResults[pid]
    })).sort((a, b) => b.score - a.score);

    const isLastRound = currentRound >= roundAssets.length - 1;
    const payload = {
      type: isLastRound ? "game_over" : "round_end",
      correctAnswer: asset.name,
      scores: scoresList,
      isLastRound
    };
    broadcast(payload);
    showRoundResult(payload);
  }

  let mpResultIsLastRound = false;

  function showRoundResult(data) {
    if (data.scores) {
      data.scores.forEach((s) => {
        if (s.id && players[s.id]) players[s.id].score = s.score;
      });
    }
    clearInterval(roundTimerInterval);
    clearInterval(intermissionTimer);
    if (window.GameAPI) window.GameAPI.setInputDisabled(true);
    mpResultIsLastRound = !!data.isLastRound;
    mpResultTitle.textContent = data.isLastRound ? "Game Over" : "Round Over";
    let body = 'The correct answer was <strong>' + escapeHtml(data.correctAnswer) + '</strong>.';
    if (data.isLastRound && data.scores.length) {
      const top = data.scores[0];
      body += '<br>🏆 <strong>' + escapeHtml(displayName(top.id, top.name)) + '</strong> wins with ' + top.score + ' points!';
    }
    mpResultBody.innerHTML = body;
    mpResultScores.innerHTML = data.scores.map((s, idx) => {
      return '<div class="mp-result-row ' + (idx === 0 ? 'winner' : '') + '"><span>' + escapeHtml(displayName(s.id, s.name)) + ' ' + (s.correct ? '✓' : '✗') + '</span><span><strong>' + s.score + '</strong> ' + (s.correct ? '(+' + s.roundPoints + ')' : '') + '</span></div>';
    }).join("");
    mpResultModal.classList.add("open");
    mpResultAction.disabled = true;

    let countdown = INTERMISSION_SECONDS;
    const label = () => (mpResultIsLastRound ? "Returning to lobby in " : "Next round in ") + countdown + "...";
    mpResultAction.textContent = label();

    intermissionTimer = setInterval(() => {
      countdown--;
      if (countdown > 0) {
        mpResultAction.textContent = label();
      } else {
        clearInterval(intermissionTimer);
        intermissionTimer = null;
        onResultContinue();
      }
    }, 1000);
  }

  function onResultContinue() {
    mpResultModal.classList.remove("open");
    if (isHost) {
      currentRound++;
      if (currentRound >= roundAssets.length) {
        returnToLobby();
      } else {
        startHostRound();
      }
    } else if (mpResultIsLastRound) {
      returnToLobby();
    }
    // Otherwise clients just wait for the host's round_start.
  }

  function returnToLobby() {
    gameActive = false;
    roundActive = false;
    clearInterval(roundTimerInterval);
    clearInterval(intermissionTimer);
    clearTimeout(hostRoundTimeout);
    if (window.GameAPI) window.GameAPI.enableMultiplayer(false);
    mpResultModal.classList.remove("open");
    mpLobby.classList.add("open");
    if (isHost) broadcastLobbyState(); else renderLobby();
  }

  function renderScores() {
    mpScores.innerHTML = "";
    const list = Object.entries(players).map(([id, p]) => ({
      name: p.name,
      score: p.score || 0,
      isMe: id === myPeerId,
      guessedThisRound: !!p.guessedThisRound
    })).sort((a, b) => b.score - a.score);
    list.forEach((p) => {
      const div = document.createElement("div");
      div.className = "mp-score-pill" + (p.isMe ? " me" : "");
      const doneMark = p.guessedThisRound ? ' <span style="color:var(--warning);">★</span>' : "";
      div.innerHTML = '<span class="mp-score-name">' + escapeHtml(p.name) + doneMark + '</span><span class="mp-score-val">' + p.score + '</span>';
      mpScores.appendChild(div);
    });
  }

  function showToast(msg) {
    let toast = document.getElementById("mp-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "mp-toast";
      toast.className = "mp-toast";
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove("show"), 2500);
  }

  window.addEventListener("mpGuessCorrect", () => showToast("Correct!"));
})();
