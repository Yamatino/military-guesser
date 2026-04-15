
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
  const lbModal = document.getElementById("leaderboard-modal");
  const lbClose = document.getElementById("lb-close");
  const lbTabs = document.querySelectorAll(".lb-tab");
  const lbPanels = { top10: document.getElementById("lb-top10"), cats: document.getElementById("lb-cats") };
  const lbList = document.getElementById("lb-list");
  const lbCatGrid = document.getElementById("lb-cat-grid");

  const IMAGE_BASE_PATH = "assets/images/";
  const HIGH_SCORE_KEY = "militaryGuesserHighScore";
  const LEADERBOARD_KEY = "militaryGuesserLeaderboard";
  const CATEGORY_BESTS_KEY = "militaryGuesserCategoryBests";
  const STATS_KEY = "militaryGuesserStats";
  const MIN_POOL = 25;
  const BLURS = [18, 12, 8, 4, 2, 0];

  let currentAsset = null;
  let lives = 5;
  let streak = 0;
  let highScore = 0;
  let availableAssets = [];
  let selectedGuess = null;
  let activeIndex = -1;
  let wrongCount = 0;
  let pixelLevel = 0;
  let settings = { mode: "classic", categories: new Set(), eras: new Set(), hiddenMode: false };
  let sessionGuesses = 0;
  let sessionFirstCorrect = 0;

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

  function loadStats() {
    const s = JSON.parse(localStorage.getItem(STATS_KEY) || "{}") || {};
    return { totalGuesses: s.totalGuesses || 0, firstCorrect: s.firstCorrect || 0 };
  }

  function saveStats(stats) {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  }

  function updateAccuracy() {
    const stats = loadStats();
    const acc = stats.totalGuesses > 0 ? Math.round((stats.firstCorrect / stats.totalGuesses) * 100) : 0;
    accuracyEl.textContent = acc + "%";
  }

  function loadLeaderboard() {
    return JSON.parse(localStorage.getItem(LEADERBOARD_KEY) || "[]") || [];
  }

  function saveLeaderboard(list) {
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(list.slice(0, 10)));
  }

  function loadCategoryBests() {
    return JSON.parse(localStorage.getItem(CATEGORY_BESTS_KEY) || "{}") || {};
  }

  function saveCategoryBests(obj) {
    localStorage.setItem(CATEGORY_BESTS_KEY, JSON.stringify(obj));
  }

  function init() {
    highScore = parseInt(localStorage.getItem(HIGH_SCORE_KEY), 10) || 0;
    highScoreEl.textContent = highScore;
    updateAccuracy();
    setup.classList.add("open");
    attachSetupListeners();
    modalAction.addEventListener("click", onModalAction);
    modalMenu.addEventListener("click", returnToMenu);
    btnLeaderboard.addEventListener("click", openLeaderboard);
    lbClose.addEventListener("click", closeLeaderboard);
    lbTabs.forEach((tab) => tab.addEventListener("click", () => switchLbTab(tab.dataset.tab)));
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".autocomplete-wrap")) closeDropdown();
      if (e.target === lbModal) closeLeaderboard();
      if (e.target === modal) hideModal();
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

  function startGame() {
    settings = readSettings();
    const pool = getFilteredPool(settings);
    if (pool.length < MIN_POOL) return;
    availableAssets = shuffle([...pool]);
    streak = 0;
    streakEl.textContent = streak;
    sessionGuesses = 0;
    sessionFirstCorrect = 0;
    lives = settings.mode === "sudden" ? 1 : 5;
    renderLives();
    setup.classList.remove("open");
    guessInput.disabled = false;
    submitBtn.disabled = false;
    setupListeners();
    loadNextItem();
  }

  function returnToMenu() {
    hideModal();
    setup.classList.add("open");
    validateSetup();
  }

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  async function loadNextItem() {
    if (availableAssets.length === 0) {
      availableAssets = shuffle([...getFilteredPool(settings)]);
    }
    currentAsset = availableAssets.pop();
    selectedGuess = null;
    guessInput.value = "";
    guessInput.disabled = false;
    submitBtn.disabled = false;
    historyEl.innerHTML = "";
    activeIndex = -1;
    wrongCount = 0;
    pixelLevel = 0;
    renderLives();
    renderHints();
    renderCategoryBadge();
    await loadImageObfuscated(IMAGE_BASE_PATH + currentAsset.image);
    assetImage.style.filter = settings.hiddenMode ? `blur(${BLURS[pixelLevel]}px)` : "none";
  }

  function loadImageObfuscated(url) {
    return new Promise((resolve) => {
      assetImage.removeAttribute("src");
      assetImage.onload = () => resolve();
      assetImage.onerror = () => {
        assetImage.src = url;
        assetImage.onload = () => resolve();
      };
      fetch(url)
        .then((r) => (r.ok ? r.blob() : Promise.reject()))
        .then((blob) => {
          assetImage.src = URL.createObjectURL(blob);
        })
        .catch(() => {
          assetImage.src = url;
        });
    });
  }

  function renderLives() {
    const hearts = Array.from(livesBar.children);
    hearts.forEach((el, idx) => el.classList.toggle("lost", idx >= lives));
  }

  function renderCategoryBadge() {
    if (!currentAsset) return;
    categoryBadge.textContent = currentAsset.category;
    categoryBadge.className = "category-badge cat-" + currentAsset.category;
  }

  function renderHints() {
    if (!currentAsset) return;
    let html = "";
    if (wrongCount >= 2) {
      html += `<span class="hint-badge revealed">Year: ${escapeHtml(String(currentAsset.year))}</span>`;
    } else {
      html += `<span class="hint-badge">Year: ???</span>`;
    }
    if (wrongCount >= 3) {
      html += `<span class="hint-badge revealed">Country: ${escapeHtml(currentAsset.country)}</span>`;
    } else {
      html += `<span class="hint-badge">Country: ???</span>`;
    }
    hintsEl.innerHTML = html;
  }

  function setupListeners() {
    guessInput.addEventListener("input", onInput);
    guessInput.addEventListener("keydown", onInputKey);
    submitBtn.addEventListener("click", submitGuess);
  }

  function onInput() {
    const value = guessInput.value.trim().toLowerCase();
    selectedGuess = null;
    activeIndex = -1;
    if (!value) {
      closeDropdown();
      return;
    }
    const matches = db.filter((item) => {
      const terms = [item.name, ...item.aliases].join(" ").toLowerCase();
      return terms.includes(value);
    });
    renderDropdown(matches);
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
    if (!items.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      activeIndex = (activeIndex + 1) % items.length;
      updateActive(items);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      activeIndex = (activeIndex - 1 + items.length) % items.length;
      updateActive(items);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && items[activeIndex]) {
        const id = parseInt(items[activeIndex].dataset.id, 10);
        const item = db.find((x) => x.id === id);
        if (item) selectItem(item);
      }
      submitGuess();
    } else if (e.key === "Escape") {
      closeDropdown();
    }
  }

  function updateActive(items) {
    items.forEach((li, idx) => li.classList.toggle("active", idx === activeIndex));
  }

  function submitGuess() {
    if (!selectedGuess) {
      if (guessInput.value.trim()) shakeInput();
      return;
    }
    const guess = selectedGuess;
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
    addHistory(guess, correct);
    selectedGuess = null;
    guessInput.value = "";

    if (lives === 0) {
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

    const cats = loadCategoryBests();
    const cat = currentAsset.category;
    if (!cats[cat] || streak > cats[cat]) {
      cats[cat] = streak;
      saveCategoryBests(cats);
    }

    if (settings.hiddenMode) assetImage.style.filter = "none";
    loadNextItem();
  }

  function handleLoss() {
    guessInput.disabled = true;
    submitBtn.disabled = true;

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

    if (settings.hiddenMode) assetImage.style.filter = "none";

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
    loadNextItem();
  }

  function shakeInput() {
    guessInput.classList.add("shake");
    setTimeout(() => guessInput.classList.remove("shake"), 300);
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
        const modeLabel = row.hiddenMode ? "Hidden" : row.mode;
        const meta = `${modeLabel}${filterLabel.length ? " \u2022 " + filterLabel.join(" \u2022 ") : ""} \u2022 ${row.date}`;
        return `
          <div class="lb-row rank-${idx + 1}">
            <div>
              <div>#${idx + 1} <span class="lb-streak">${row.streak}</span></div>
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
        <div class="lb-cat-score">${cats[c] || 0}</div>
      </div>
    `).join("");
  }

  const style = document.createElement("style");
  style.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-4px); }
      75% { transform: translateX(4px); }
    }
    .shake {
      animation: shake 0.25s ease-in-out 2;
      border-color: var(--danger) !important;
    }
  `;
  document.head.appendChild(style);

  init();
})();
