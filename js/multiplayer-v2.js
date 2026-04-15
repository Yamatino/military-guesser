(function () {
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
  const hostSettings = document.getElementById("host-settings");
  const lobbyLeave = document.getElementById("lobby-leave");
  const lobbyReady = document.getElementById("lobby-ready");
  const lobbyStart = document.getElementById("lobby-start");
  const mpCategoryChips = document.querySelectorAll("#mp-category-chips .chip");
  const mpEraChips = document.querySelectorAll("#mp-era-chips .chip");
  const mpRoundRadios = document.getElementsByName("mp-rounds");
  const mpTimeRadios = document.getElementsByName("mp-time");
  const mpHud = document.getElementById("mp-hud");
  const mpTimerBar = document.getElementById("mp-timer-bar");
  const mpScores = document.getElementById("mp-scores");
  const mpRoundNum = document.getElementById("mp-round-num");
  const mpRoundTotal = document.getElementById("mp-round-total");
  const mpResultModal = document.getElementById("mp-result-modal");
  const mpResultTitle = document.getElementById("mp-result-title");
  const mpResultBody = document.getElementById("mp-result-body");
  const mpResultScores = document.getElementById("mp-result-scores");
  const mpResultAction = document.getElementById("mp-result-action");

  const MQTT_BROKER_URL = "wss://broker.hivemq.com:8884/mqtt";
  const MQTT_TOPIC_PREFIX = "military-guesser/lobby/";
  const MQTT_CLIENT_ID_PREFIX = "mg_";

  let peer = null;
  let isHost = false;
  let myPeerId = null;
  let myName = "";
  let lobbyKeyword = "";
  let connections = {};
  let players = {};
  let mqttClient = null;
  let mqttTopic = "";
  let mqttHostId = null;
  let mpSettings = {
    categories: new Set(),
    eras: new Set(),
    rounds: 10,
    timeLimit: 30
  };

  let gameActive = false;
  let currentRound = 0;
  let roundAssets = [];
  let roundStartTime = 0;
  let roundTimerInterval = null;
  let roundResults = {};
  let hostRoundTimeout = null;

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

  function showError(msg) {
    mpError.textContent = msg;
    mpError.classList.remove("hidden");
  }

  function clearError() {
    mpError.classList.add("hidden");
  }

  function openMpMenu() {
    mainMenu.classList.remove("open");
    mpMenu.classList.add("open");
  }

  function backToMainMenu() {
    mpMenu.classList.remove("open");
    mpLobby.classList.remove("open");
    mpResultModal.classList.remove("open");
    mainMenu.classList.add("open");
    cleanupAll();
  }

  function cleanupAll() {
    gameActive = false;
    clearInterval(roundTimerInterval);
    clearTimeout(hostRoundTimeout);
    if (peer) {
      try { peer.destroy(); } catch (e) {}
      peer = null;
    }
    if (mqttClient) {
      try { mqttClient.end(); } catch (e) {}
    }
    mqttClient = null;
    mqttHostId = null;
    connections = {};
    players = {};
    isHost = false;
    myPeerId = null;
    lobbyKeyword = "";
    if (window.GameAPI) window.GameAPI.enableMultiplayer(false);
  }

  function mqttClientId() {
    return MQTT_CLIENT_ID_PREFIX + Math.random().toString(36).substring(2, 10) + "_" + Date.now().toString(36);
  }

  function getMqttTopic(keyword) {
    return MQTT_TOPIC_PREFIX + keyword.toLowerCase().replace(/[^a-z0-9]/g, "");
  }

  function initMqtt(onConnect, onMessage) {
    const clientId = mqttClientId();
    mqttClient = mqtt.connect(MQTT_BROKER_URL, {
      clientId: clientId,
      clean: true,
      connectTimeout: 4000,
      reconnectPeriod: 0
    });
    mqttClient.on("connect", () => {
      if (onConnect) onConnect();
    });
    mqttClient.on("message", (topic, message) => {
      if (onMessage) onMessage(topic, message.toString());
    });
    mqttClient.on("error", (err) => {
      console.error("MQTT error:", err);
    });
    mqttClient.on("close", () => {
      if (!isHost && !mpLobby.classList.contains("open")) {
        showError("Could not connect to lobby network. Please try again.");
      }
    });
  }

  if (mpJoin) {
    mpJoin.addEventListener("click", () => {
      clearError();
      myName = (mpNameInput.value || "").trim() || "Player";
      lobbyKeyword = (mpKeywordInput.value || "").trim().toLowerCase();
      if (!lobbyKeyword) { showError("Enter a lobby keyword."); return; }
      if (!myName) { showError("Enter your name."); return; }

      mqttTopic = getMqttTopic(lobbyKeyword);

      initMqtt(
        () => {
          mqttClient.subscribe(mqttTopic, (err) => {
            if (err) {
              showError("Failed to subscribe to lobby.");
              return;
            }
            setTimeout(() => {
              if (!mpLobby.classList.contains("open") && !isHost) {
                becomeHost();
              }
            }, 1500);
          });
        },
        (topic, payload) => {
          if (topic !== mqttTopic) return;
          try {
            const data = JSON.parse(payload);
            if (data.type === "host_announce" && data.peerId) {
              mqttHostId = data.peerId;
              if (!mpLobby.classList.contains("open")) {
                joinAsClient(mqttHostId);
              }
            }
          } catch (e) {}
        }
      );
    });
  }

  function becomeHost() {
    if (isHost || mpLobby.classList.contains("open")) return;
    if (mqttClient && mqttClient.connected) {
      mqttClient.unsubscribe(mqttTopic);
    }
    isHost = true;
    peer = new Peer();
    peer.on("open", (id) => {
      myPeerId = id;
      players[myPeerId] = { name: myName + " (You)", ready: true, score: 0, isHost: true, guessedThisRound: false };
      mpSettings.categories = new Set();
      mpSettings.eras = new Set();
      mpSettings.rounds = 10;
      mpSettings.timeLimit = 30;
      showLobby();
      if (mqttClient && mqttClient.connected) {
        mqttClient.publish(mqttTopic, JSON.stringify({ type: "host_announce", peerId: myPeerId }), { qos: 1, retain: true });
      }
    });
    peer.on("error", (err) => {
      showError("Lobby error: " + err.type);
      cleanupAll();
    });
    peer.on("connection", (conn) => {
      conn.on("open", () => {
        connections[conn.peer] = conn;
        conn.on("data", (data) => handleHostMessage(conn, data));
        conn.on("close", () => handleClientDisconnect(conn.peer));
      });
    });
  }

  function joinAsClient(hostPeerId) {
    if (isHost || mpLobby.classList.contains("open")) return;
    peer = new Peer();
    peer.on("open", (id) => {
      myPeerId = id;
      const conn = peer.connect(hostPeerId, { reliable: true });
      conn.on("open", () => {
        connections[hostPeerId] = conn;
        conn.send({ type: "join", name: myName });
      });
      conn.on("data", (data) => handleClientMessage(data));
      conn.on("close", () => {
        if (mpLobby.classList.contains("open") || gameActive) {
          showError("Host disconnected.");
          cleanupAll();
          backToMainMenu();
        }
      });
    });
    peer.on("error", (err) => {
      if (err.type === "peer-unavailable") {
        showError("Lobby not found. It may have just closed.");
      } else {
        showError("Connection error: " + err.type);
      }
      cleanupAll();
      backToMainMenu();
    });
  }

  if (btnMp) btnMp.addEventListener("click", openMpMenu);
  if (mpBack) mpBack.addEventListener("click", backToMainMenu);

  if (lobbyLeave) {
    lobbyLeave.addEventListener("click", () => {
      if (isHost) {
        if (mqttClient && mqttClient.connected) {
          mqttClient.publish(mqttTopic, "", { qos: 1, retain: true });
        }
        broadcast({ type: "host_left" });
      } else {
        const conn = Object.values(connections)[0];
        if (conn && conn.open) conn.send({ type: "leave" });
      }
      cleanupAll();
      backToMainMenu();
    });
  }

  if (lobbyReady) {
    lobbyReady.addEventListener("click", () => {
      const me = players[myPeerId];
      if (!me) return;
      const newReady = !me.ready;
      me.ready = newReady;
      lobbyReady.textContent = newReady ? "Not Ready" : "Ready";
      const conn = Object.values(connections)[0];
      if (conn && conn.open) conn.send({ type: "ready", ready: newReady });
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
  function handleHostMessage(conn, data) {
    if (!data || !data.type) return;
    const pid = conn.peer;
    switch (data.type) {
      case "join":
        if (gameActive) return;
        players[pid] = { name: data.name, ready: false, score: 0, isHost: false, guessedThisRound: false, connection: conn };
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
        if (gameActive) handleHostGuess(pid, data);
        break;
    }
  }

  function handleClientDisconnect(pid) {
    if (players[pid]) {
      delete players[pid];
      delete connections[pid];
      if (gameActive) {
        checkRoundEndCondition();
      } else {
        broadcastLobbyState();
      }
    }
  }

  function broadcastLobbyState() {
    const payload = {
      type: "lobby_state",
      players: Object.entries(players).map(([id, p]) => ({
        id, name: p.name, ready: p.ready, score: p.score, isHost: p.isHost
      })),
      settings: {
        categories: Array.from(mpSettings.categories),
        eras: Array.from(mpSettings.eras),
        rounds: mpSettings.rounds,
        timeLimit: mpSettings.timeLimit
      }
    };
    broadcast(payload);
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
        mpSettings.categories = new Set(data.settings.categories || []);
        mpSettings.eras = new Set(data.settings.eras || []);
        mpSettings.rounds = data.settings.rounds || 10;
        mpSettings.timeLimit = data.settings.timeLimit || 30;
        updateLobbySettingsUI();
        renderLobby();
        if (!mpLobby.classList.contains("open")) {
          mpMenu.classList.remove("open");
          mpLobby.classList.add("open");
        }
        break;
      case "update_settings":
        mpSettings.categories = new Set(data.settings.categories || []);
        mpSettings.eras = new Set(data.settings.eras || []);
        mpSettings.rounds = data.settings.rounds || 10;
        mpSettings.timeLimit = data.settings.timeLimit || 30;
        updateLobbySettingsUI();
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
        showToast(escapeHtml(data.name) + " guessed correctly!");
        break;
      case "round_end":
        showRoundResult(data);
        break;
      case "game_over":
        showGameOver(data);
        break;
      case "host_left":
        showError("Host left the lobby.");
        cleanupAll();
        backToMainMenu();
        break;
    }
  }

  // Lobby UI
  function showLobby() {
    mpMenu.classList.remove("open");
    mpLobby.classList.add("open");
    renderLobby();
  }

  function renderLobby() {
    lobbyKeywordDisplay.textContent = lobbyKeyword ? "(" + lobbyKeyword + ")" : "";
    hostSettings.classList.toggle("hidden", !isHost);
    lobbyStart.classList.toggle("hidden", !isHost);
    lobbyReady.classList.toggle("hidden", isHost);

    lobbyPlayers.innerHTML = "";
    Object.entries(players).forEach(([id, p]) => {
      const div = document.createElement("div");
      div.className = "lobby-player" + (p.ready ? " ready" : "");
      const star = p.isHost ? '<span class="lobby-host-star">★</span>' : "";
      const status = p.ready ? "Ready" : "Not Ready";
      div.innerHTML = '<div class="lobby-player-name">' + escapeHtml(p.name) + " " + star + '</div><div class="lobby-player-status">' + status + "</div>";
      lobbyPlayers.appendChild(div);
    });

    if (isHost) {
      const allReady = Object.entries(players).every(([id, p]) => p.isHost || p.ready);
      const enoughPlayers = Object.keys(players).length >= 1;
      lobbyStart.disabled = !(allReady && enoughPlayers);
      lobbyStart.style.opacity = (allReady && enoughPlayers) ? "1" : "0.5";
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
    const s = readMpSettings();
    mpSettings = s;
    broadcast({
      type: "update_settings",
      settings: {
        categories: Array.from(s.categories),
        eras: Array.from(s.eras),
        rounds: s.rounds,
        timeLimit: s.timeLimit
      }
    });
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
    Object.keys(players).forEach((pid) => {
      if (players[pid]) {
        players[pid].score = 0;
        players[pid].guessedThisRound = false;
      }
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
    mpSettings.rounds = data.rounds;
    mpSettings.timeLimit = data.timeLimit;
    roundAssets = data.assetIds.map((id) => db.find((x) => x.id === id)).filter(Boolean);
    currentRound = 0;
    mpLobby.classList.remove("open");
    if (window.GameAPI) window.GameAPI.enableMultiplayer(true, { onGuess: onMpGuess });
  }

  // Round logic
  function startHostRound() {
    if (currentRound >= roundAssets.length) {
      endGame();
      return;
    }
    roundResults = {};
    const asset = roundAssets[currentRound];
    Object.keys(players).forEach((pid) => { if (players[pid]) players[pid].guessedThisRound = false; });
    broadcast({ type: "round_start", roundIndex: currentRound, assetId: asset.id });
    loadRoundAsset(asset);
    roundStartTime = Date.now();
    startTimer(mpSettings.timeLimit);
    hostRoundTimeout = setTimeout(() => {
      endHostRound();
    }, mpSettings.timeLimit * 1000);
  }

  function startClientRound(data) {
    currentRound = data.roundIndex;
    mpResultModal.classList.remove("open");
    const asset = db.find((x) => x.id === data.assetId);
    if (asset) loadRoundAsset(asset);
    startTimer(mpSettings.timeLimit);
  }

  function loadRoundAsset(asset) {
    mpRoundNum.textContent = currentRound + 1;
    mpRoundTotal.textContent = mpSettings.rounds;
    if (window.GameAPI) {
      window.GameAPI.loadAsset(asset).then(() => {
        // asset loaded
      });
      window.GameAPI.clearHistory();
      window.GameAPI.setInputDisabled(false);
    }
    mpScores.innerHTML = "";
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
    const msg = { type: "guess", name: guess.name };
    if (isHost) {
      handleHostGuess(myPeerId, msg);
    } else {
      const conn = Object.values(connections)[0];
      if (conn && conn.open) conn.send(msg);
    }
  }

  function handleHostGuess(pid, data) {
    if (!gameActive) return;
    const asset = roundAssets[currentRound];
    if (!asset) return;
    if (players[pid] && players[pid].guessedThisRound) return;
    const correct = data.name === asset.name;

    const targetConn = (pid === myPeerId) ? null : (players[pid] && players[pid].connection);
    const resultMsg = { type: "guess_result", correct };
    if (targetConn && targetConn.open) {
      targetConn.send(resultMsg);
    } else if (pid === myPeerId && window.GameAPI) {
      window.GameAPI.handleMpGuessResult(correct);
    }

    if (correct) {
      players[pid].guessedThisRound = true;
      const elapsed = Math.max(0, Date.now() - roundStartTime);
      roundResults[pid] = { elapsedMs: elapsed };
      const points = calculatePoints(elapsed);
      players[pid].score = (players[pid].score || 0) + points;
      broadcast({ type: "player_guessed", name: players[pid].name });
      renderScores();
      checkRoundEndCondition();
    }
  }

  function checkRoundEndCondition() {
    if (!gameActive) return;
    const activePlayers = Object.keys(players).filter((pid) => players[pid]);
    const allGuessed = activePlayers.every((pid) => players[pid].guessedThisRound);
    if (allGuessed) {
      clearTimeout(hostRoundTimeout);
      endHostRound();
    }
  }

  function endHostRound() {
    clearInterval(roundTimerInterval);
    clearTimeout(hostRoundTimeout);
    const asset = roundAssets[currentRound];
    const scoresList = Object.entries(players).map(([pid, p]) => ({
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
    if (isLastRound) {
      showGameOver(payload);
    } else {
      showRoundResult(payload);
    }
  }

  function showRoundResult(data) {
    clearInterval(roundTimerInterval);
    if (window.GameAPI) window.GameAPI.setInputDisabled(true);
    mpResultTitle.textContent = data.isLastRound ? "Game Over" : "Round Over";
    mpResultBody.innerHTML = 'The correct answer was <strong>' + escapeHtml(data.correctAnswer) + '</strong>.';
    mpResultScores.innerHTML = data.scores.map((s, idx) => {
      return '<div class="mp-result-row ' + (idx === 0 ? 'winner' : '') + '"><span>' + escapeHtml(s.name) + ' ' + (s.correct ? '✓' : '✗') + '</span><span><strong>' + s.score + '</strong> ' + (s.correct ? '(+' + s.roundPoints + ')' : '') + '</span></div>';
    }).join("");
    mpResultModal.classList.add("open");
    mpResultAction.textContent = data.isLastRound ? "Back to Lobby" : "Next Round";
  }

  function showGameOver(data) {
    showRoundResult(data);
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
    }
    if (!isHost && gameActive) {
      setTimeout(() => {
        if (gameActive && !mpResultModal.classList.contains("open")) {
          returnToLobby();
        }
      }, 100);
    }
  }

  function returnToLobby() {
    gameActive = false;
    clearInterval(roundTimerInterval);
    clearTimeout(hostRoundTimeout);
    if (window.GameAPI) window.GameAPI.enableMultiplayer(false);
    mpResultModal.classList.remove("open");
    mpLobby.classList.add("open");
    if (isHost) broadcastLobbyState();
  }

  function endGame() {
    returnToLobby();
  }

  function renderScores() {
    mpScores.innerHTML = "";
    const list = Object.entries(players).map(([id, p]) => ({
      name: p.name.replace(" (You)", ""),
      score: p.score || 0,
      isMe: id === myPeerId
    })).sort((a, b) => b.score - a.score);
    list.forEach((p) => {
      const div = document.createElement("div");
      div.className = "mp-score-pill" + (p.isMe ? " me" : "");
      div.innerHTML = '<span class="mp-score-name">' + escapeHtml(p.name) + '</span><span class="mp-score-val">' + p.score + '</span>';
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
    setTimeout(() => toast.classList.remove("show"), 2500);
  }
})();
