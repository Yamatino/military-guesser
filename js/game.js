
(function () {
  const streakEl = document.getElementById("streak");
  const highScoreEl = document.getElementById("high-score");
  const accuracyEl = document.getElementById("accuracy");
  const livesBar = document.getElementById("lives-bar");
  const assetImage = document.getElementById("asset-image");
  const categoryBadge = document.getElementById("category-badge");
  const guessInput = document.getElementById("guess-input");
  const autocompleteList = document.getElementById("autocomplete-list");
  const submitBtn = document.getElementById("submit-btn");
  const historyEl = document.getElementById("history");
  const hintsEl = document.getElementById("hints");
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modal-title");
  const modalBody = document.getElementById("modal-body");
  const modalAction = document.getElementById("modal-action");
  const modalMenu = document.getElementById("modal-menu");
  const setup = document.getElementById("setup");
  const startBtn = document.getElementById("start-btn");
  const setupWarning = document.getElementById("setup-warning");
  const categoryChips = document.querySelectorAll("#category-chips .chip");
  const eraChips = document.querySelectorAll("#era-chips .chip");
  const modeRadios = document.getElementsByName("mode");
  const hiddenModeToggle = document.getElementById("hidden-mode-toggle");
  const btnLeaderboard = document.getElementById("btn-leaderboard");
  const btnMenu = document.getElementById("btn-menu");
  const mainMenu = document.getElementById("main-menu");
  const btnSp = document.getElementById("btn-sp");
  const btnDaily = document.getElementById("btn-daily");
  const dailyMenuStatus = document.getElementById("daily-menu-status");
  const setupBack = document.getElementById("setup-back");
  const lbModal = document.getElementById("leaderboard-modal");
  const lbClose = document.getElementById("lb-close");
  const lbTabs = document.querySelectorAll(".lb-tab");
  const lbPanels = { top10: document.getElementById("lb-top10"), cats: document.getElementById("lb-cats") };
  const lbList = document.getElementById("lb-list");
  const lbCatGrid = document.getElementById("lb-cat-grid");
  const spStats = document.getElementById("sp-stats");
  const dailyHud = document.getElementById("daily-hud");
  const dailyHudNum = document.getElementById("daily-hud-num");
  const dailyPips = document.getElementById("daily-pips");
  const dailyModal = document.getElementById("daily-modal");
  const dailyTitle = document.getElementById("daily-title");
  const dailyBody = document.getElementById("daily-body");
  const dailyGrid = document.getElementById("daily-grid");
  const dailyStatsEl = document.getElementById("daily-stats");
  const dailyNext = document.getElementById("daily-next");
  const dailyShare = document.getElementById("daily-share");
  const dailyMenuBtn = document.getElementById("daily-menu");

  const IMAGE_BASE_PATH = "assets/images/";
  const HIGH_SCORE_KEY = "militaryGuesserHighScore";
  const LEADERBOARD_KEY = "militaryGuesserLeaderboard";
  const CATEGORY_BESTS_KEY = "militaryGuesserCategoryBests";
  const STATS_KEY = "militaryGuesserStats";
  const DAILY_KEY = "militaryGuesserDaily";
  const DAILY_STATS_KEY = "militaryGuesserDailyStats";
  const MIN_POOL = 25;
  const BLURS = [18, 12, 8, 4, 2, 0];
  const SITE_URL = "https://yamatino.github.io/military-guesser/";

  // Daily Challenge: #1 is this date. Each day picks one asset per slot,
  // ordered easy -> hard, seeded from the date so everyone gets the same set.
  const DAILY_EPOCH = "2026-11-08";
  const DAILY_SLOTS = ["easy", "medium", "medium", "medium", "hard"];
  const DAILY_GUESSES = 5;

  // Hint ladder, by number of wrong guesses on the current asset.
  const HINT_ERA_AT = 1;
  const HINT_YEAR_AT = 2;
  const HINT_COUNTRY_AT = 3;
  const HINT_INITIALS_AT = 4;

  const FLAG_CODES = {
    "United States": "us", "United Kingdom": "gb", "Russia": "ru", "Germany": "de",
    "China": "cn", "France": "fr", "Sweden": "se", "Israel": "il",
    "European Consortium": "eu", "South Korea": "kr", "Japan": "jp", "Italy": "it",
    "Pakistan": "pk", "Ukraine": "ua", "Poland": "pl", "India": "in", "Belgium": "be",
    "Austria": "at", "Spain": "es", "Czechoslovakia": "cz", "Turkey": "tr",
    "Czech Republic": "cz", "South Africa": "za", "Brazil": "br", "Australia": "au",
    "Canada": "ca", "Finland": "fi", "Switzerland": "ch", "Iran": "ir",
    "Indonesia": "id", "Singapore": "sg", "Greece": "gr", "Argentina": "ar"
  };

  let currentAsset = null;
  let lives = 5;
  let maxLives = 5;
  let streak = 0;
  let highScore = 0;
  let availableAssets = [];
  let selectedGuess = null;
  let activeIndex = -1;
  let wrongCount = 0;
  let pixelLevel = 0;
  let guessedNames = new Set();
  let settings = { mode: "classic", categories: new Set(), eras: new Set(), hiddenMode: false };
  let sessionGuesses = 0;
  let sessionFirstCorrect = 0;
  let mpMode = false;
  let mpCallbacks = {};
  let mpLastGuess = null;
  let imageLoadToken = 0;
  let currentObjectUrl = null;
  // Pending "show the answer, then move on" delay. Cleared whenever the game
  // state is reset so a stale timer can't advance a new run.
  let advanceTimer = null;
  let dailyMode = false;
  let daily = null; // { date, number, ids, assets, results, index }
  let dailyCountdown = null;

  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  function beep(freq, type, duration) {
    if (audioCtx.state === "suspended") audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  }

  function playWinSound() {
    beep(523.25, "sine", 0.15);
    setTimeout(() => beep(659.25, "sine", 0.15), 120);
    setTimeout(() => beep(783.99, "sine", 0.25), 240);
  }

  function playLossSound() {
    beep(196.0, "sawtooth", 0.35);
    setTimeout(() => beep(146.83, "sawtooth", 0.45), 300);
  }

  function getEra(year) {
    if (year <= 1945) return "World War II";
    if (year <= 1991) return "Cold War";
    return "Post-Cold War";
  }

  function readJSON(key, fallback) {
    try {
      return JSON.parse(localStorage.getItem(key)) || fallback;
    } catch (e) {
      return fallback;
    }
  }

  function writeJSON(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {}
  }

  function loadStats() {
    const s = readJSON(STATS_KEY, {});
    return { totalGuesses: s.totalGuesses || 0, firstCorrect: s.firstCorrect || 0 };
  }

  function saveStats(stats) {
    writeJSON(STATS_KEY, stats);
  }

  function updateAccuracy() {
    const stats = loadStats();
    const acc = stats.totalGuesses > 0 ? Math.round((stats.firstCorrect / stats.totalGuesses) * 100) : 0;
    accuracyEl.textContent = acc + "%";
  }

  function loadLeaderboard() {
    return readJSON(LEADERBOARD_KEY, []);
  }

  function saveLeaderboard(list) {
    writeJSON(LEADERBOARD_KEY, list.slice(0, 10));
  }

  function loadCategoryBests() {
    return readJSON(CATEGORY_BESTS_KEY, {});
  }

  function saveCategoryBests(obj) {
    writeJSON(CATEGORY_BESTS_KEY, obj);
  }

  function init() {
    highScore = parseInt(localStorage.getItem(HIGH_SCORE_KEY), 10) || 0;
    highScoreEl.textContent = highScore;
    updateAccuracy();
    attachSetupListeners();
    setupListeners();
    modalAction.addEventListener("click", onModalAction);
    modalMenu.addEventListener("click", returnToMenu);
    btnLeaderboard.addEventListener("click", openLeaderboard);
    lbClose.addEventListener("click", closeLeaderboard);
    lbTabs.forEach((tab) => tab.addEventListener("click", () => switchLbTab(tab.dataset.tab)));
    if (btnMenu) btnMenu.addEventListener("click", onHeaderMenu);
    if (btnSp && mainMenu) {
      btnSp.addEventListener("click", () => {
        mainMenu.classList.remove("open");
        setup.classList.add("open");
        validateSetup();
      });
    }
    if (btnDaily) btnDaily.addEventListener("click", startDaily);
    if (dailyShare) dailyShare.addEventListener("click", shareDaily);
    if (dailyMenuBtn) dailyMenuBtn.addEventListener("click", goToMainMenu);
    if (setupBack && mainMenu) {
      setupBack.addEventListener("click", () => {
        setup.classList.remove("open");
        mainMenu.classList.add("open");
      });
    }
    // Refresh the Daily button's status line whenever the main menu appears,
    // including when multiplayer code opens it.
    if (mainMenu) {
      new MutationObserver(() => {
        if (mainMenu.classList.contains("open")) renderDailyMenuStatus();
      }).observe(mainMenu, { attributes: true, attributeFilter: ["class"] });
    }
    renderDailyMenuStatus();
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".autocomplete-wrap")) closeDropdown();
      if (e.target === lbModal) closeLeaderboard();
    });
  }

  function attachSetupListeners() {
    categoryChips.forEach((chip) => {
      chip.addEventListener("click", () => {
        chip.classList.toggle("active");
        validateSetup();
      });
    });
    eraChips.forEach((chip) => {
      chip.addEventListener("click", () => {
        chip.classList.toggle("active");
        validateSetup();
      });
    });
    Array.from(modeRadios).forEach((r) => r.addEventListener("change", validateSetup));
    hiddenModeToggle.addEventListener("change", validateSetup);
    startBtn.addEventListener("click", startGame);
  }

  function readSettings() {
    const mode = Array.from(modeRadios).find((r) => r.checked)?.value || "classic";
    const categories = new Set();
    categoryChips.forEach((c) => { if (c.classList.contains("active")) categories.add(c.dataset.value); });
    const eras = new Set();
    eraChips.forEach((c) => { if (c.classList.contains("active")) eras.add(c.dataset.value); });
    const hiddenMode = hiddenModeToggle.checked;
    return { mode, categories, eras, hiddenMode };
  }

  function validateSetup() {
    const s = readSettings();
    const pool = getFilteredPool(s);
    if (pool.length < MIN_POOL) {
      setupWarning.textContent = `Only ${pool.length} assets match your filters. Select at least ${MIN_POOL}.`;
      setupWarning.classList.remove("hidden");
      startBtn.disabled = true;
      startBtn.style.opacity = "0.5";
    } else {
      setupWarning.classList.add("hidden");
      startBtn.disabled = false;
      startBtn.style.opacity = "1";
    }
  }

  function getFilteredPool(s) {
    return db.filter((item) => {
      if (s.categories.size > 0 && !s.categories.has(item.category)) return false;
      if (s.eras.size > 0 && !s.eras.has(getEra(item.year))) return false;
      if (s.mode === "hard" && item.difficulty === "easy") return false;
      return true;
    });
  }

  function cancelAdvance() {
    clearTimeout(advanceTimer);
    advanceTimer = null;
  }

  function setInputDisabled(disabled) {
    guessInput.disabled = disabled;
    submitBtn.disabled = disabled;
  }

  // Header shows streak/best/accuracy in endless mode and target progress in
  // the Daily Challenge.
  function setHeaderMode(mode) {
    if (spStats) spStats.classList.toggle("hidden", mode !== "sp");
    if (dailyHud) dailyHud.classList.toggle("hidden", mode !== "daily");
    if (btnMenu) btnMenu.classList.toggle("hidden", mode === "mp");
  }

  function startGame() {
    settings = readSettings();
    const pool = getFilteredPool(settings);
    if (pool.length < MIN_POOL) return;
    setup.classList.remove("open");
    beginRun(pool);
  }

  function beginRun(pool) {
    cancelAdvance();
    dailyMode = false;
    setHeaderMode("sp");
    availableAssets = shuffle([...pool]);
    streak = 0;
    streakEl.textContent = streak;
    sessionGuesses = 0;
    sessionFirstCorrect = 0;
    maxLives = settings.mode === "sudden" ? 1 : 5;
    lives = maxLives;
    renderLives();
    loadNextItem();
  }

  function returnToMenu() {
    hideModal();
    setup.classList.add("open");
    validateSetup();
  }

  function goToMainMenu() {
    cancelAdvance();
    closeDailyModal();
    hideModal();
    dailyMode = false;
    setHeaderMode("sp");
    setup.classList.remove("open");
    mainMenu.classList.add("open");
  }

  function onHeaderMenu() {
    if (mpMode) return;
    const runInProgress = !dailyMode && !guessInput.disabled && streak > 0;
    if (runInProgress && !window.confirm("Leave this run? Your current streak of " + streak + " will be lost.")) return;
    goToMainMenu();
  }

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function loadNextItem() {
    if (availableAssets.length === 0) {
      availableAssets = shuffle([...getFilteredPool(settings)]);
    }
    return showAsset(availableAssets.pop());
  }

  // Shared reset for a new target in endless and daily modes.
  async function showAsset(asset) {
    currentAsset = asset;
    selectedGuess = null;
    guessInput.value = "";
    setInputDisabled(false);
    historyEl.innerHTML = "";
    activeIndex = -1;
    wrongCount = 0;
    pixelLevel = 0;
    guessedNames = new Set();
    renderLives();
    renderHints();
    renderCategoryBadge();
    const blurred = !dailyMode && settings.hiddenMode;
    // Apply the blur before the image arrives so it never flashes unblurred.
    assetImage.style.filter = blurred ? `blur(${BLURS[0]}px)` : "none";
    await loadImageObfuscated(IMAGE_BASE_PATH + asset.image);
  }

  // Loads via fetch + blob URL so the filename (which gives away the answer)
  // never appears in the DOM. The token discards stale loads when a new asset
  // is requested before the previous image finished downloading.
  function loadImageObfuscated(url) {
    const token = ++imageLoadToken;
    return new Promise((resolve) => {
      const done = () => {
        if (token === imageLoadToken) assetImage.removeAttribute("loading-state");
        resolve();
      };
      assetImage.removeAttribute("src");
      assetImage.setAttribute("loading-state", "");
      assetImage.onload = done;
      assetImage.onerror = done;
      fetch(url)
        .then((r) => (r.ok ? r.blob() : Promise.reject()))
        .then((blob) => {
          if (token !== imageLoadToken) return resolve();
          if (currentObjectUrl) URL.revokeObjectURL(currentObjectUrl);
          currentObjectUrl = URL.createObjectURL(blob);
          assetImage.src = currentObjectUrl;
        })
        .catch(() => {
          if (token !== imageLoadToken) return resolve();
          assetImage.src = url;
        });
    });
  }

  function renderLives() {
    const hearts = Array.from(livesBar.children);
    hearts.forEach((el, idx) => {
      el.classList.toggle("hidden", idx >= maxLives);
      el.classList.toggle("lost", idx >= lives);
    });
  }

  function renderCategoryBadge() {
    if (!currentAsset) return;
    categoryBadge.textContent = currentAsset.category;
    categoryBadge.className = "category-badge cat-" + currentAsset.category;
  }

  // "F-22 Raptor" -> "F-__ R_____": first letter/digit of each word shown,
  // other letters/digits masked, punctuation kept.
  function maskName(name) {
    return name.split(" ").map((word) => {
      let shown = false;
      return Array.from(word).map((ch) => {
        if (!/[\p{L}\p{N}]/u.test(ch)) return ch;
        if (!shown) { shown = true; return ch; }
        return "_";
      }).join("");
    }).join(" ");
  }

  function flagHtml(country) {
    const code = FLAG_CODES[country];
    if (!code) return "";
    return `<img class="hint-flag" src="https://flagcdn.com/w40/${code}.png" alt="" width="20" height="15" onerror="this.remove()">`;
  }

  function renderHints() {
    if (!currentAsset) return;
    const a = currentAsset;
    const badge = (text, revealed) =>
      `<span class="hint-badge${revealed ? " revealed" : ""}">${text}</span>`;
    let html = "";

    if (wrongCount >= HINT_YEAR_AT) {
      html += badge(`Year: ${escapeHtml(String(a.year))}`, true);
    } else if (wrongCount >= HINT_ERA_AT) {
      html += badge(`Era: ${escapeHtml(getEra(a.year))}`, true);
    } else {
      html += badge("Year: ???", false);
    }

    if (wrongCount >= HINT_COUNTRY_AT) {
      html += badge(`${flagHtml(a.country)}Country: ${escapeHtml(a.country)}`, true);
    } else {
      html += badge("Country: ???", false);
    }

    if (wrongCount >= HINT_INITIALS_AT) {
      html += badge(`Name: <span class="hint-mask">${escapeHtml(maskName(a.name))}</span>`, true);
    } else {
      html += badge("Name: ???", false);
    }

    hintsEl.innerHTML = html;
  }

  function setupListeners() {
    guessInput.addEventListener("input", onInput);
    guessInput.addEventListener("keydown", onInputKey);
    submitBtn.addEventListener("click", submitGuess);
  }

  function findMatches(value) {
    return db.filter((item) => {
      const terms = [item.name, ...item.aliases].join(" ").toLowerCase();
      return terms.includes(value);
    });
  }

  function onInput() {
    const value = guessInput.value.trim().toLowerCase();
    selectedGuess = null;
    activeIndex = -1;
    if (!value) {
      closeDropdown();
      return;
    }
    renderDropdown(findMatches(value));
  }

  // Turn free text into a guess when it unambiguously names one asset: an
  // exact name match, else an alias only one asset uses, else the only
  // autocomplete match.
  function resolveTypedGuess(text) {
    const value = text.trim().toLowerCase();
    if (!value) return null;
    const byName = db.find((item) => item.name.toLowerCase() === value);
    if (byName) return byName;
    const byAlias = db.filter((item) => item.aliases.some((al) => al.toLowerCase() === value));
    if (byAlias.length === 1) return byAlias[0];
    const matches = findMatches(value);
    return matches.length === 1 ? matches[0] : null;
  }

  function renderDropdown(matches) {
    autocompleteList.innerHTML = "";
    if (!matches.length) {
      closeDropdown();
      return;
    }
    matches.forEach((item) => {
      const li = document.createElement("li");
      li.setAttribute("role", "option");
      li.dataset.id = item.id;
      li.innerHTML = `
        <span class="autocomplete-name">${escapeHtml(item.name)}</span>
        <span class="autocomplete-meta">${escapeHtml(item.category)}</span>
      `;
      li.addEventListener("click", () => selectItem(item));
      autocompleteList.appendChild(li);
    });
    autocompleteList.classList.add("open");
  }

  function closeDropdown() {
    autocompleteList.classList.remove("open");
    autocompleteList.innerHTML = "";
    activeIndex = -1;
  }

  function selectItem(item) {
    selectedGuess = item;
    guessInput.value = item.name;
    closeDropdown();
  }

  function onInputKey(e) {
    const items = Array.from(autocompleteList.children);

    // Enter must work even when the dropdown is closed (e.g. after clicking
    // a suggestion), so handle it before the empty-list early return.
    if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && items[activeIndex]) {
        const id = parseInt(items[activeIndex].dataset.id, 10);
        const item = db.find((x) => x.id === id);
        if (item) selectItem(item);
      }
      submitGuess();
      return;
    }

    if (!items.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      activeIndex = (activeIndex + 1) % items.length;
      updateActive(items);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      activeIndex = (activeIndex - 1 + items.length) % items.length;
      updateActive(items);
    } else if (e.key === "Escape") {
      closeDropdown();
    }
  }

  function updateActive(items) {
    items.forEach((li, idx) => li.classList.toggle("active", idx === activeIndex));
  }

  function clearGuessInput() {
    selectedGuess = null;
    guessInput.value = "";
    closeDropdown();
  }

  function submitGuess() {
    if (guessInput.disabled || !currentAsset) return;
    if (!selectedGuess) selectedGuess = resolveTypedGuess(guessInput.value);
    if (!selectedGuess) {
      if (guessInput.value.trim()) shakeInput();
      return;
    }
    const guess = selectedGuess;

    if (guessedNames.has(guess.name)) {
      clearGuessInput();
      shakeInput();
      showToast("Already guessed " + guess.name);
      return;
    }
    guessedNames.add(guess.name);

    if (mpMode) {
      mpLastGuess = guess;
      // Wait for the host's verdict before allowing another guess, so the
      // history can't attribute a result to the wrong guess.
      setInputDisabled(true);
      clearGuessInput();
      if (mpCallbacks.onGuess) mpCallbacks.onGuess(guess);
      return;
    }
    if (dailyMode) {
      handleDailyGuess(guess);
      return;
    }

    const correct = guess.name === currentAsset.name;

    sessionGuesses++;
    const stats = loadStats();
    stats.totalGuesses++;
    if (correct) stats.firstCorrect++;
    saveStats(stats);
    updateAccuracy();

    if (correct) {
      sessionFirstCorrect++;
      handleWin();
      return;
    }

    lives--;
    wrongCount++;
    pixelLevel++;
    renderLives();
    renderHints();
    if (settings.hiddenMode) {
      assetImage.style.filter = `blur(${BLURS[Math.min(pixelLevel, BLURS.length - 1)]}px)`;
    }
    addHistory(guess, false);
    clearGuessInput();

    if (lives <= 0) {
      handleLoss();
    }
  }

  function addHistory(guess, correct) {
    const div = document.createElement("div");
    div.className = "history-item";
    div.innerHTML = `
      <span class="history-name ${correct ? "correct" : "wrong"}">${escapeHtml(guess.name)}</span>
      <span class="hint">${correct ? "Correct" : "Incorrect"}</span>
    `;
    historyEl.prepend(div);
  }

  function addHistoryNote(html) {
    const div = document.createElement("div");
    div.className = "history-item history-note";
    div.innerHTML = html;
    historyEl.prepend(div);
  }

  function handleWin() {
    streak++;
    streakEl.textContent = streak;
    if (streak > highScore) {
      highScore = streak;
      highScoreEl.textContent = highScore;
      localStorage.setItem(HIGH_SCORE_KEY, highScore);
    }
    playWinSound();
    assetImage.parentElement.classList.add("victory-pulse");
    setTimeout(() => assetImage.parentElement.classList.remove("victory-pulse"), 600);

    // A category best only means something when the whole run was limited to
    // that one category; mixed runs would otherwise credit the full streak to
    // whichever category the last asset happened to be.
    if (settings.categories.size === 1) {
      const cat = Array.from(settings.categories)[0];
      const cats = loadCategoryBests();
      if (!cats[cat] || streak > cats[cat]) {
        cats[cat] = streak;
        saveCategoryBests(cats);
      }
    }

    clearGuessInput();
    if (settings.hiddenMode) {
      // Let the player actually see the unblurred image before moving on.
      assetImage.style.filter = "none";
      addRevealFlash();
      setInputDisabled(true);
      cancelAdvance();
      advanceTimer = setTimeout(() => {
        advanceTimer = null;
        loadNextItem();
      }, 900);
      return;
    }
    loadNextItem();
  }

  function handleLoss() {
    setInputDisabled(true);

    const entry = {
      streak,
      mode: settings.mode,
      hiddenMode: settings.hiddenMode,
      categories: Array.from(settings.categories),
      eras: Array.from(settings.eras),
      date: new Date().toLocaleString()
    };
    const board = loadLeaderboard();
    board.push(entry);
    board.sort((a, b) => b.streak - a.streak);
    saveLeaderboard(board);

    playLossSound();
    assetImage.parentElement.classList.add("loss-fade");
    setTimeout(() => assetImage.parentElement.classList.remove("loss-fade"), 500);

    if (settings.hiddenMode) {
      assetImage.style.filter = "none";
      addRevealFlash();
    }

    streak = 0;
    streakEl.textContent = streak;
    showModal(
      "Game Over",
      `The correct answer was <strong>${escapeHtml(currentAsset.name)}</strong>.`,
      "Play Again"
    );
  }

  function showModal(title, body, actionText) {
    modalTitle.textContent = title;
    modalBody.innerHTML = body;
    modalAction.textContent = actionText;
    modal.classList.add("open");
  }

  function hideModal() {
    modal.classList.remove("open");
  }

  function onModalAction() {
    hideModal();
    beginRun(getFilteredPool(settings));
  }

  // ---------- Daily Challenge ----------

  function localDateKey(d) {
    const pad = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  }

  function dayIndex(key) {
    const [y, m, d] = key.split("-").map(Number);
    return Math.round(Date.UTC(y, m - 1, d) / 86400000);
  }

  function keyFromDayIndex(idx) {
    const d = new Date(idx * 86400000);
    const pad = (n) => String(n).padStart(2, "0");
    return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
  }

  function dailyNumber(key) {
    return dayIndex(key) - dayIndex(DAILY_EPOCH) + 1;
  }

  function hashString(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  function mulberry32(seed) {
    let a = seed;
    return function () {
      a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  // Deterministic for a given date and database. Tries to cover a different
  // category with each pick so a day isn't five rifles.
  function pickDailyIds(key) {
    const rng = mulberry32(hashString("military-guesser-daily:" + key));
    const sorted = [...db].sort((a, b) => a.id - b.id);
    const used = new Set();
    const usedCats = new Set();
    return DAILY_SLOTS.map((difficulty) => {
      const pool = sorted.filter((a) => a.difficulty === difficulty && !used.has(a.id));
      const fresh = pool.filter((a) => !usedCats.has(a.category));
      const candidates = fresh.length ? fresh : pool;
      const pick = candidates[Math.floor(rng() * candidates.length)];
      used.add(pick.id);
      usedCats.add(pick.category);
      return pick.id;
    });
  }

  function emptyDailyResults(n) {
    return Array.from({ length: n }, () => ({ guesses: [], solved: false, done: false }));
  }

  // Today's saved progress, or a fresh challenge. The picked ids are saved so
  // a database update mid-day can't swap targets under an in-progress player.
  function loadDailyState() {
    const today = localDateKey(new Date());
    const saved = readJSON(DAILY_KEY, null);
    let ids, results;
    if (saved && saved.date === today && Array.isArray(saved.ids) && Array.isArray(saved.results)) {
      ids = saved.ids;
      results = saved.results;
    } else {
      ids = pickDailyIds(today);
      results = emptyDailyResults(ids.length);
    }
    const assets = ids.map((id) => db.find((a) => a.id === id));
    if (assets.some((a) => !a) || results.length !== ids.length) {
      ids = pickDailyIds(today);
      return { date: today, number: dailyNumber(today), ids, assets: ids.map((id) => db.find((a) => a.id === id)), results: emptyDailyResults(ids.length) };
    }
    return { date: today, number: dailyNumber(today), ids, assets, results };
  }

  function saveDailyState() {
    if (!daily) return;
    writeJSON(DAILY_KEY, { date: daily.date, ids: daily.ids, results: daily.results });
  }

  function dailyIsComplete(state) {
    return state.results.every((r) => r.done);
  }

  function resultTier(r) {
    if (!r.done) return "pending";
    if (!r.solved) return "missed";
    const n = r.guesses.length;
    if (n <= 1) return "first";
    if (n <= 3) return "mid";
    return "late";
  }

  const TIER_EMOJI = { first: "🟩", mid: "🟨", late: "🟧", missed: "🟥", pending: "⬜" };

  function startDaily() {
    cancelAdvance();
    daily = loadDailyState();
    if (dailyIsComplete(daily)) {
      showDailyModal();
      return;
    }
    mainMenu.classList.remove("open");
    setup.classList.remove("open");
    hideModal();
    dailyMode = true;
    setHeaderMode("daily");
    if (dailyHudNum) dailyHudNum.textContent = "#" + daily.number;
    maxLives = DAILY_GUESSES;
    daily.index = daily.results.findIndex((r) => !r.done);
    showDailyTarget();
  }

  function showDailyTarget() {
    const r = daily.results[daily.index];
    lives = maxLives;
    const loading = showAsset(daily.assets[daily.index]);
    // Restore guesses made before a reload so refreshing can't reset a target.
    r.guesses.forEach((name) => {
      const g = db.find((a) => a.name === name) || { name };
      guessedNames.add(name);
      addHistory(g, false);
      lives--;
      wrongCount++;
    });
    renderLives();
    renderHints();
    renderDailyHud();
    return loading;
  }

  function renderDailyHud() {
    if (!dailyPips || !daily) return;
    dailyPips.innerHTML = daily.results.map((r, idx) => {
      const tier = resultTier(r);
      const current = dailyMode && idx === daily.index && !r.done ? " current" : "";
      return `<span class="daily-pip tier-${tier}${current}" title="Target ${idx + 1}"></span>`;
    }).join("");
  }

  function handleDailyGuess(guess) {
    const r = daily.results[daily.index];
    const correct = guess.name === currentAsset.name;
    r.guesses.push(guess.name);
    addHistory(guess, correct);
    clearGuessInput();

    if (correct) {
      r.solved = true;
      r.done = true;
      playWinSound();
      assetImage.parentElement.classList.add("victory-pulse");
      setTimeout(() => assetImage.parentElement.classList.remove("victory-pulse"), 600);
    } else {
      lives--;
      wrongCount++;
      renderLives();
      renderHints();
      if (lives <= 0) {
        r.done = true;
        playLossSound();
        addHistoryNote(`It was <strong>${escapeHtml(currentAsset.name)}</strong>`);
      }
    }
    saveDailyState();
    renderDailyHud();

    if (!r.done) return;
    setInputDisabled(true);
    cancelAdvance();
    advanceTimer = setTimeout(() => {
      advanceTimer = null;
      const next = daily.results.findIndex((x) => !x.done);
      if (next === -1) {
        finishDaily();
      } else {
        daily.index = next;
        showDailyTarget();
      }
    }, correct ? 1200 : 2400);
  }

  function loadDailyStats() {
    const s = readJSON(DAILY_STATS_KEY, {});
    return {
      played: s.played || 0,
      perfect: s.perfect || 0,
      streak: s.streak || 0,
      maxStreak: s.maxStreak || 0,
      lastDate: s.lastDate || null
    };
  }

  function finishDaily() {
    const stats = loadDailyStats();
    if (stats.lastDate !== daily.date) {
      const yesterday = keyFromDayIndex(dayIndex(daily.date) - 1);
      stats.streak = stats.lastDate === yesterday ? stats.streak + 1 : 1;
      stats.maxStreak = Math.max(stats.maxStreak, stats.streak);
      stats.played++;
      if (daily.results.every((r) => r.solved)) stats.perfect++;
      stats.lastDate = daily.date;
      writeJSON(DAILY_STATS_KEY, stats);
    }
    showDailyModal();
  }

  // A streak still counts while today's challenge hasn't been played yet.
  function liveDailyStreak(stats) {
    if (!stats.lastDate) return 0;
    const today = localDateKey(new Date());
    const yesterday = keyFromDayIndex(dayIndex(today) - 1);
    return stats.lastDate === today || stats.lastDate === yesterday ? stats.streak : 0;
  }

  function dailyScore(state) {
    const solved = state.results.filter((r) => r.solved).length;
    const guesses = state.results.reduce((sum, r) => sum + r.guesses.length, 0);
    return { solved, guesses, total: state.results.length };
  }

  function buildShareText() {
    const { solved, total } = dailyScore(daily);
    const squares = daily.results.map((r) => TIER_EMOJI[resultTier(r)]).join("");
    return `Military Guesser Daily #${daily.number} — ${solved}/${total}\n${squares}\n${SITE_URL}`;
  }

  function showDailyModal() {
    const { solved, guesses, total } = dailyScore(daily);
    dailyTitle.textContent = `Daily #${daily.number}`;
    dailyBody.innerHTML = `You identified <strong>${solved} of ${total}</strong> in ${guesses} guess${guesses === 1 ? "" : "es"}.`;
    dailyGrid.innerHTML = daily.results.map((r, idx) => {
      const tier = resultTier(r);
      const n = r.guesses.length;
      const detail = r.solved ? `${n} guess${n === 1 ? "" : "es"}` : "Missed";
      return `
        <div class="daily-row">
          <span class="daily-pip tier-${tier}"></span>
          <span class="daily-row-name">${escapeHtml(daily.assets[idx].name)}</span>
          <span class="daily-row-detail">${detail}</span>
        </div>`;
    }).join("");

    const stats = loadDailyStats();
    const cell = (label, value) => `<div class="stat"><span class="stat-label">${label}</span><span class="stat-value">${value}</span></div>`;
    dailyStatsEl.innerHTML = cell("Played", stats.played) + cell("Perfect", stats.perfect) +
      cell("Streak", liveDailyStreak(stats)) + cell("Best", stats.maxStreak);

    dailyShare.textContent = "Share Result";
    updateDailyCountdown();
    clearInterval(dailyCountdown);
    dailyCountdown = setInterval(updateDailyCountdown, 1000);
    dailyModal.classList.add("open");
  }

  function closeDailyModal() {
    clearInterval(dailyCountdown);
    dailyCountdown = null;
    if (dailyModal) dailyModal.classList.remove("open");
  }

  function msUntilTomorrow() {
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    return tomorrow - now;
  }

  function updateDailyCountdown() {
    if (!dailyNext) return;
    if (daily && daily.date !== localDateKey(new Date())) {
      dailyNext.textContent = "A new challenge is ready!";
      return;
    }
    const s = Math.max(0, Math.floor(msUntilTomorrow() / 1000));
    const pad = (n) => String(n).padStart(2, "0");
    dailyNext.textContent = `Next challenge in ${pad(Math.floor(s / 3600))}:${pad(Math.floor((s % 3600) / 60))}:${pad(s % 60)}`;
  }

  function shareDaily() {
    const text = buildShareText();
    const copied = () => {
      dailyShare.textContent = "Copied!";
      setTimeout(() => { dailyShare.textContent = "Share Result"; }, 1800);
    };
    const fallbackCopy = () => {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      let ok = false;
      try { ok = document.execCommand("copy"); } catch (e) {}
      ta.remove();
      if (ok) copied(); else window.prompt("Copy your result:", text);
    };
    // Phones get the native share sheet; desktops copy to the clipboard.
    if (navigator.share && window.matchMedia("(pointer: coarse)").matches) {
      navigator.share({ text }).catch(() => {});
      return;
    }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(copied, fallbackCopy);
    } else {
      fallbackCopy();
    }
  }

  function renderDailyMenuStatus() {
    if (!dailyMenuStatus) return;
    const today = localDateKey(new Date());
    const saved = readJSON(DAILY_KEY, null);
    const num = "#" + dailyNumber(today);
    if (!saved || saved.date !== today || !Array.isArray(saved.results)) {
      dailyMenuStatus.textContent = `${num} · New challenge ready`;
      return;
    }
    const done = saved.results.filter((r) => r.done).length;
    if (done < saved.results.length) {
      dailyMenuStatus.textContent = `${num} · In progress (${done}/${saved.results.length})`;
    } else {
      const solved = saved.results.filter((r) => r.solved).length;
      dailyMenuStatus.textContent = `${num} · Done: ${solved}/${saved.results.length}`;
    }
  }

  // ---------- Misc UI ----------

  function shakeInput() {
    guessInput.classList.add("shake");
    setTimeout(() => guessInput.classList.remove("shake"), 300);
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
    showToast.timer = setTimeout(() => toast.classList.remove("show"), 2000);
  }

  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  function openLeaderboard() {
    renderLeaderboard();
    lbModal.classList.add("open");
  }

  function closeLeaderboard() {
    lbModal.classList.remove("open");
  }

  function switchLbTab(tab) {
    lbTabs.forEach((t) => t.classList.toggle("active", t.dataset.tab === tab));
    Object.keys(lbPanels).forEach((k) => lbPanels[k].classList.toggle("hidden", k !== tab));
  }

  function renderLeaderboard() {
    const board = loadLeaderboard();
    if (board.length === 0) {
      lbList.innerHTML = `<div class="lb-empty">No runs yet. Go play!</div>`;
    } else {
      lbList.innerHTML = board.map((row, idx) => {
        const filterLabel = [];
        if (row.categories && row.categories.length) filterLabel.push(row.categories.join(", "));
        if (row.eras && row.eras.length) filterLabel.push(row.eras.join(", "));
        const modeLabel = row.mode + (row.hiddenMode ? " + Hidden" : "");
        const meta = `${modeLabel}${filterLabel.length ? " • " + filterLabel.join(" • ") : ""} • ${row.date}`;
        return `
          <div class="lb-row rank-${idx + 1}">
            <div>
              <div>#${idx + 1} <span class="lb-streak">${escapeHtml(String(row.streak))}</span></div>
              <div class="lb-meta">${escapeHtml(meta)}</div>
            </div>
          </div>
        `;
      }).join("");
    }

    const cats = loadCategoryBests();
    const catNames = ["Land", "Air", "Sea", "Infantry"];
    lbCatGrid.innerHTML = catNames.map((c) => `
      <div class="lb-cat-cell">
        <div class="lb-cat-name">${c}</div>
        <div class="lb-cat-score">${escapeHtml(String(cats[c] || 0))}</div>
      </div>
    `).join("");
  }

  function addRevealFlash() {
    assetImage.style.animation = "revealFlash 0.6s ease-out";
    setTimeout(() => { assetImage.style.animation = ""; }, 600);
  }

  window.GameAPI = {
    enableMultiplayer(enabled, callbacks) {
      mpMode = enabled;
      mpCallbacks = callbacks || {};
      mpLastGuess = null;
      cancelAdvance();
      if (enabled) dailyMode = false;
      const mpStatsHeader = document.getElementById("mp-stats-header");
      const mpHud = document.getElementById("mp-hud");
      setHeaderMode(enabled ? "mp" : "sp");
      if (mpStatsHeader) mpStatsHeader.classList.toggle("hidden", !enabled);
      if (livesBar) livesBar.classList.toggle("hidden", enabled);
      if (mpHud) mpHud.classList.toggle("hidden", !enabled);
    },
    loadAsset(asset) {
      currentAsset = asset;
      selectedGuess = null;
      mpLastGuess = null;
      guessInput.value = "";
      setInputDisabled(false);
      historyEl.innerHTML = "";
      activeIndex = -1;
      wrongCount = 0;
      pixelLevel = 0;
      guessedNames = new Set();
      renderHints();
      renderCategoryBadge();
      assetImage.style.filter = "none";
      return loadImageObfuscated(IMAGE_BASE_PATH + asset.image);
    },
    addHistoryItem(guess, correct) {
      addHistory(guess, correct);
    },
    setInputDisabled(disabled) {
      setInputDisabled(disabled);
    },
    getCurrentAsset() {
      return currentAsset;
    },
    clearHistory() {
      historyEl.innerHTML = "";
    },
    preloadAsset(asset) {
      fetch(IMAGE_BASE_PATH + asset.image).then((r) => r.blob()).catch(() => {});
    },
    handleMpGuessResult(correct) {
      if (!mpLastGuess) {
        setInputDisabled(false);
        return;
      }
      if (correct) {
        addHistory(mpLastGuess, true);
        window.dispatchEvent(new CustomEvent("mpGuessCorrect", { detail: {} }));
        setInputDisabled(true);
      } else {
        wrongCount++;
        addHistory(mpLastGuess, false);
        renderHints();
        setInputDisabled(false);
        guessInput.focus();
      }
      mpLastGuess = null;
    }
  };

  init();
})();
