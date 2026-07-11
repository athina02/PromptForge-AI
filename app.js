/**
 * ============================================================
 * PromptForge AI — Application Logic
 * ------------------------------------------------------------
 * Architecture:
 *   1. Utilities        — small pure helpers, no side effects
 *   2. State             — single source of truth for UI state
 *   3. Toast             — transient notification system
 *   4. Ripple            — Material-style press feedback
 *   5. Router            — screen switching + bottom nav sync
 *   6. Card rendering    — one reusable card renderer for every list
 *   7. Home / Categories / Search / Favorites renderers
 *   8. Details screen    — full prompt view
 *   9. Favorites store   — localStorage persistence
 *  10. Copy / Share      — clipboard + native share
 *  11. Theme             — Midnight / Obsidian toggle
 *  12. PWA               — install prompt + offline status
 *  13. Event delegation  — one listener per interaction type
 *  14. Init
 *
 * Depends on `prompts.js` being loaded first (PROMPTS, CATEGORIES).
 * ============================================================
 */

(() => {
  "use strict";

  /* ============================================================
     1. Utilities
  ============================================================ */
  const qs = (selector, scope = document) => scope.querySelector(selector);
  const qsa = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

  /** Escapes text before it is interpolated into innerHTML templates. */
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  /** Truncates long prompt bodies for card excerpts without cutting mid-word. */
  function excerpt(text, maxLen = 92) {
    if (text.length <= maxLen) return text;
    const cut = text.slice(0, maxLen);
    return cut.slice(0, cut.lastIndexOf(" ")) + "…";
  }

  /** Formats an ISO date ("2026-07-08") into a short human label ("Jul 8"). */
  function formatShortDate(iso) {
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  }

  function byId(id) {
    return PROMPTS.find((p) => p.id === id);
  }

  function categoryMeta(categoryId) {
    return CATEGORIES.find((c) => c.id === categoryId);
  }

  /* ============================================================
     2. State
  ============================================================ */
  const state = {
    currentScreen: "home",
    previousScreen: "home", // used only to power the Details back button
    activeCategory: "All",
    searchKeyword: "",
    favorites: [], // array of prompt ids, hydrated from localStorage on init
    detailsId: null,
    theme: "midnight",
    deferredInstallPrompt: null
  };

  const STORAGE_KEYS = {
    favorites: "promptforge:favorites",
    theme: "promptforge:theme"
  };

  /* ============================================================
     3. Toast
  ============================================================ */
  const toastHost = qs("#toastHost");
  let toastTimer = null;

  /**
   * Shows a transient toast above the bottom nav.
   * Reused by every feature (copy, favorite, share, clear data, errors)
   * so there is exactly one notification code path in the app.
   */
  function showToast(message, variant = "default") {
    // Only one toast on screen at a time keeps the UI calm and legible.
    qsa(".toast", toastHost).forEach((t) => t.remove());
    clearTimeout(toastTimer);

    const toast = document.createElement("div");
    toast.className = `toast${variant === "danger" ? " toast-danger" : ""}`;
    toast.innerHTML = `<span class="toast-dot"></span><span>${escapeHtml(message)}</span>`;
    toastHost.appendChild(toast);

    toastTimer = setTimeout(() => {
      toast.classList.add("leaving");
      toast.addEventListener("animationend", () => toast.remove(), { once: true });
    }, 2200);
  }

  /* ============================================================
     4. Ripple (Material-style press feedback)
  ============================================================ */
  /**
   * Delegated ripple effect. Any element with the `.ripple` class gets
   * a circular pulse centered on the pointer position. Delegation means
   * dynamically rendered cards/buttons get the effect for free, with
   * zero per-element listener setup.
   */
  function initRipples() {
    document.addEventListener("pointerdown", (event) => {
      const target = event.target.closest(".ripple");
      if (!target) return;

      const rect = target.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 1.4;
      const circle = document.createElement("span");
      circle.className = "ripple-circle";
      circle.style.width = circle.style.height = `${size}px`;
      circle.style.left = `${event.clientX - rect.left - size / 2}px`;
      circle.style.top = `${event.clientY - rect.top - size / 2}px`;

      target.appendChild(circle);
      circle.addEventListener("animationend", () => circle.remove(), { once: true });
    });
  }

  /* ============================================================
     5. Router
  ============================================================ */
  const NAV_SCREENS = ["home", "categories", "search", "favorites", "settings"];
  const navIndicator = qs("#navIndicator");
  const bottomNav = qs("#bottomNav");

  /**
   * Switches the visible screen and keeps the bottom nav (active state +
   * sliding indicator) in sync. Top-level screens reset navigation history;
   * "details" is the one screen reached from many places, so it remembers
   * `previousScreen` to power its back button correctly.
   */
  function goToScreen(screenName, { fromDetails = false } = {}) {
    if (!fromDetails && screenName !== "details") {
      state.previousScreen = screenName;
    }

    qsa(".screen").forEach((el) => el.classList.remove("active"));
    const target = qs(`#screen-${screenName}`);
    if (target) target.classList.add("active");

    state.currentScreen = screenName;

    const isTopLevel = NAV_SCREENS.includes(screenName);
    bottomNav.style.transform = "translateY(0)";
    qsa(".nav-btn", bottomNav).forEach((btn) => {
      const match = btn.dataset.nav === screenName;
      btn.classList.toggle("active", isTopLevel && match);
    });

    if (isTopLevel) {
      const index = NAV_SCREENS.indexOf(screenName);
      navIndicator.style.transform = `translateX(${index * 100}%)`;
    }

    // Scroll each screen back to top on entry for a crisp navigation feel.
    const scroller = qs(".screen-scroll", target);
    if (scroller) scroller.scrollTop = 0;
  }

  /* ============================================================
     6. Card rendering (single reusable renderer)
  ============================================================ */
  /**
   * Renders one prompt as HTML in one of two layouts:
   *  - "list": full-width row used by Recent / Search / Favorites
   *  - "rail": fixed-width tile used by the horizontal Trending rail
   * Centralizing this avoids the duplicate-markup bug pattern where
   * list/rail/featured cards drift out of sync with each other.
   */
  function renderPromptCard(prompt, variant = "list") {
    const isFav = state.favorites.includes(prompt.id);
    const cat = categoryMeta(prompt.category);

    if (variant === "rail") {
      return `
        <article class="card rail-card ripple" data-id="${prompt.id}" tabindex="0" role="button" aria-label="Open ${escapeHtml(prompt.title)}">
          <div class="badge-row">
            <span class="badge badge-category">${cat ? cat.icon : ""} ${escapeHtml(prompt.category)}</span>
          </div>
          <h4>${escapeHtml(prompt.title)}</h4>
          <div class="rail-foot">
            <span>${escapeHtml(prompt.ai)}</span>
            <span>${escapeHtml(prompt.level)}</span>
          </div>
        </article>
      `;
    }

    // "list" variant
    return `
      <article class="card prompt-card ripple" data-id="${prompt.id}" tabindex="0" role="button" aria-label="Open ${escapeHtml(prompt.title)}">
        <div class="prompt-main">
          <div class="badge-row">
            <span class="badge badge-category">${cat ? cat.icon : ""} ${escapeHtml(prompt.category)}</span>
            <span class="badge badge-ai">${escapeHtml(prompt.ai)}</span>
          </div>
          <h4>${escapeHtml(prompt.title)}</h4>
          <p class="prompt-meta">${escapeHtml(prompt.level)} · ${escapeHtml(prompt.tags.slice(0, 2).join(", "))}</p>
        </div>
        <div class="prompt-actions">
          <button class="mini-btn ripple${isFav ? " is-fav" : ""}" data-action="fav" data-id="${prompt.id}" aria-label="Toggle favorite" aria-pressed="${isFav}">
            ${favIconSvg(isFav)}
          </button>
          <button class="mini-btn ripple" data-action="copy" data-id="${prompt.id}" aria-label="Copy prompt">
            ${copyIconSvg()}
          </button>
        </div>
      </article>
    `;
  }

  function favIconSvg(filled) {
    return `<svg viewBox="0 0 24 24" width="17" height="17" fill="${filled ? "currentColor" : "none"}" stroke="currentColor" stroke-width="2"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"/></svg>`;
  }
  function copyIconSvg() {
    return `<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"/></svg>`;
  }

  function emptyStateHtml({ icon, title, message, ctaLabel, ctaNav }) {
    return `
      <div class="empty-state">
        <span class="empty-icon">${icon}</span>
        <h3>${escapeHtml(title)}</h3>
        <p>${escapeHtml(message)}</p>
        ${ctaLabel ? `<button class="btn-primary ripple" data-nav="${ctaNav}">${escapeHtml(ctaLabel)}</button>` : ""}
      </div>
    `;
  }

  /* ============================================================
     7. Home / Categories / Search / Favorites renderers
  ============================================================ */

  function renderFeatured() {
    // The featured prompt is the most recently added trending prompt —
    // a deterministic pick rather than a hardcoded id.
    const featured = [...PROMPTS].filter((p) => p.trending).sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))[0] || PROMPTS[0];

    const cat = categoryMeta(featured.category);
    const card = qs("#featuredCard");
    card.dataset.id = featured.id;
    card.innerHTML = `
      <div class="badge-row">
        <span class="badge badge-category">${cat ? cat.icon : ""} ${escapeHtml(featured.category)}</span>
        <span class="badge badge-ai">${escapeHtml(featured.ai)}</span>
        <span class="badge badge-level">${escapeHtml(featured.level)}</span>
      </div>
      <h3>${escapeHtml(featured.title)}</h3>
      <p class="excerpt">${escapeHtml(excerpt(featured.prompt, 110))}</p>
      <div class="card-actions">
        <button class="btn-primary ripple" data-action="copy" data-id="${featured.id}">📋 Copy Prompt</button>
        <button class="btn-secondary ripple" data-action="open" data-id="${featured.id}">View</button>
      </div>
    `;
  }

  function renderTrendingRail() {
    const rail = qs("#trendingRail");
    const trending = PROMPTS.filter((p) => p.trending);
    rail.innerHTML = trending.map((p) => renderPromptCard(p, "rail")).join("");
  }

  /** Shared category-grid renderer; `full` adds the blurb + 2-col layout for the Categories screen. */
  function renderCategoryGrid(container, full = false) {
    container.innerHTML = CATEGORIES.map((cat) => {
      const count = PROMPTS.filter((p) => p.category === cat.id).length;
      return `
        <div class="card cat-tile ripple" data-category="${cat.id}" tabindex="0" role="button" aria-label="Browse ${escapeHtml(cat.id)}">
          <span class="cat-icon">${cat.icon}</span>
          <span class="cat-name">${escapeHtml(cat.id)}</span>
          ${full ? `<span class="cat-blurb">${escapeHtml(cat.blurb)}</span>` : ""}
          <span class="cat-count">${count} prompt${count === 1 ? "" : "s"}</span>
        </div>
      `;
    }).join("");
  }

  function renderRecentList() {
    const list = qs("#recentList");
    const recent = [...PROMPTS].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)).slice(0, 5);
    list.innerHTML = recent.map((p) => renderPromptCard(p, "list")).join("");
  }

  /** Builds the "All" + per-category chip row used on the Search screen. */
  function renderChipRow() {
    const row = qs("#categoryChipRow");
    const chips = ["All", ...CATEGORIES.map((c) => c.id)];
    row.innerHTML = chips
      .map((id) => {
        const cat = categoryMeta(id);
        const active = state.activeCategory === id;
        return `<button class="chip ripple${active ? " active" : ""}" data-chip="${id}">${cat ? cat.icon + " " : ""}${escapeHtml(id)}</button>`;
      })
      .join("");
  }

  /** Central filter used by the Search screen — matches keyword across every searchable field. */
  function filterPrompts(keyword, category) {
    const kw = keyword.trim().toLowerCase();
    return PROMPTS.filter((p) => {
      const matchesCategory = category === "All" || p.category === category;
      if (!matchesCategory) return false;
      if (!kw) return true;
      return (
        p.title.toLowerCase().includes(kw) ||
        p.category.toLowerCase().includes(kw) ||
        p.ai.toLowerCase().includes(kw) ||
        p.level.toLowerCase().includes(kw) ||
        p.tags.join(" ").toLowerCase().includes(kw)
      );
    });
  }

  function renderSearchResults() {
    const listEl = qs("#searchResultsList");
    const metaEl = qs("#searchResultsMeta");
    const results = filterPrompts(state.searchKeyword, state.activeCategory);

    metaEl.textContent = state.searchKeyword || state.activeCategory !== "All"
      ? `${results.length} result${results.length === 1 ? "" : "s"}`
      : `${results.length} prompts in the library`;

    listEl.innerHTML = results.length
      ? results.map((p) => renderPromptCard(p, "list")).join("")
      : emptyStateHtml({
          icon: "😔",
          title: "No prompts found",
          message: "Try a different keyword or clear the category filter.",
          ctaLabel: null
        });
  }

  function renderFavoritesList() {
    const listEl = qs("#favoritesList");
    const favPrompts = state.favorites.map((id) => byId(id)).filter(Boolean);

    listEl.innerHTML = favPrompts.length
      ? favPrompts.map((p) => renderPromptCard(p, "list")).join("")
      : emptyStateHtml({
          icon: "🤍",
          title: "No favorites yet",
          message: "Tap the heart on any prompt to save it here for quick access.",
          ctaLabel: "Explore prompts",
          ctaNav: "home"
        });
  }

  /* ============================================================
     8. Details screen
  ============================================================ */
  function openDetails(id) {
    const prompt = byId(id);
    if (!prompt) return;

    state.detailsId = id;
    state.previousScreen = state.currentScreen;

    const cat = categoryMeta(prompt.category);
    const isFav = state.favorites.includes(prompt.id);

    qs("#detailsBody").innerHTML = `
      <div class="details-badges">
        <span class="badge badge-category">${cat ? cat.icon : ""} ${escapeHtml(prompt.category)}</span>
        <span class="badge badge-ai">${escapeHtml(prompt.ai)}</span>
        <span class="badge badge-level">${escapeHtml(prompt.level)}</span>
      </div>
      <h2 class="details-title">${escapeHtml(prompt.title)}</h2>
      <div class="details-tags">
        ${prompt.tags.map((t) => `<span class="tag-chip">#${escapeHtml(t)}</span>`).join("")}
      </div>
      <span class="prompt-box-label">Prompt</span>
      <div class="prompt-box" id="detailsPromptText">${escapeHtml(prompt.prompt)}</div>
      <div class="details-actions">
        <button class="btn-primary ripple" id="detailsCopyBtn" data-action="copy" data-id="${prompt.id}">📋 Copy Prompt</button>
        <button class="btn-secondary ripple" id="detailsShareBtn" data-action="share" data-id="${prompt.id}">↗ Share</button>
      </div>
    `;

    const favBtn = qs("#detailsFavBtn");
    favBtn.classList.toggle("is-active", isFav);
    favBtn.innerHTML = favIconSvg(isFav);
    favBtn.dataset.id = prompt.id;

    goToScreen("details", { fromDetails: true });
    qsa(".nav-btn", bottomNav).forEach((btn) => btn.classList.remove("active"));
  }

  function closeDetails() {
    goToScreen(state.previousScreen);
  }

  /* ============================================================
     9. Favorites store (localStorage)
  ============================================================ */
  function loadFavorites() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.favorites);
      const parsed = raw ? JSON.parse(raw) : [];
      state.favorites = Array.isArray(parsed) ? parsed : [];
    } catch {
      state.favorites = [];
    }
  }

  function persistFavorites() {
    localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(state.favorites));
  }

  /** Toggles favorite status for a prompt and refreshes every screen that could show it. */
  function toggleFavorite(id) {
    const numId = Number(id);
    const idx = state.favorites.indexOf(numId);
    const nowFav = idx === -1;

    if (nowFav) {
      state.favorites.push(numId);
    } else {
      state.favorites.splice(idx, 1);
    }
    persistFavorites();

    // Sync every mini favorite button for this id currently in the DOM
    // (a prompt can appear in Home, Search and Favorites simultaneously).
    qsa(`[data-action="fav"][data-id="${numId}"]`).forEach((btn) => {
      btn.classList.toggle("is-fav", nowFav);
      btn.setAttribute("aria-pressed", String(nowFav));
      btn.innerHTML = favIconSvg(nowFav);
    });

    if (state.detailsId === numId) {
      const favBtn = qs("#detailsFavBtn");
      favBtn.classList.toggle("is-active", nowFav);
      favBtn.innerHTML = favIconSvg(nowFav);
    }

    // Keep the Favorites list itself in sync if it's the visible screen.
    if (state.currentScreen === "favorites") renderFavoritesList();

    showToast(nowFav ? "Added to favorites" : "Removed from favorites");
  }

  function clearAllFavorites() {
    if (state.favorites.length === 0) {
      showToast("You have no favorites saved");
      return;
    }
    const confirmed = window.confirm("Remove every saved favorite from this device? This can't be undone.");
    if (!confirmed) return;

    state.favorites = [];
    persistFavorites();
    qsa('[data-action="fav"]').forEach((btn) => {
      btn.classList.remove("is-fav");
      btn.setAttribute("aria-pressed", "false");
      btn.innerHTML = favIconSvg(false);
    });
    if (state.currentScreen === "favorites") renderFavoritesList();
    showToast("Favorites cleared");
  }

  /* ============================================================
     10. Copy / Share
  ============================================================ */
  /** Copies a prompt's body to the clipboard, with a graceful fallback for older browsers. */
  async function copyPromptToClipboard(id, triggerBtn) {
    const prompt = byId(Number(id));
    if (!prompt) return;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(prompt.prompt);
      } else {
        fallbackCopy(prompt.prompt);
      }
      flashCopiedState(triggerBtn);
      showToast("Prompt copied to clipboard");
    } catch {
      try {
        fallbackCopy(prompt.prompt);
        flashCopiedState(triggerBtn);
        showToast("Prompt copied to clipboard");
      } catch {
        showToast("Copy failed — please try again", "danger");
      }
    }
  }

  function fallbackCopy(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }

  /** Briefly swaps a copy button's visual state to confirm success, then reverts it. */
  function flashCopiedState(btn) {
    if (!btn) return;

    if (btn.classList.contains("mini-btn")) {
      const original = btn.innerHTML;
      btn.classList.add("is-copied");
      btn.innerHTML = `<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M20 6 9 17l-5-5"/></svg>`;
      setTimeout(() => {
        btn.classList.remove("is-copied");
        btn.innerHTML = original;
      }, 1400);
      return;
    }

    // Primary "📋 Copy Prompt" buttons (Featured card + Details screen)
    const original = btn.textContent;
    btn.textContent = "✅ Copied";
    btn.classList.add("is-success");
    setTimeout(() => {
      btn.textContent = original;
      btn.classList.remove("is-success");
    }, 1400);
  }

  /** Uses the native Web Share Sheet when available, otherwise copies a shareable text block. */
  async function sharePrompt(id) {
    const prompt = byId(Number(id));
    if (!prompt) return;

    const shareText = `${prompt.title} (${prompt.category} · ${prompt.ai})\n\n${prompt.prompt}\n\nShared from PromptForge AI`;

    if (navigator.share) {
      try {
        await navigator.share({ title: `${prompt.title} — PromptForge AI`, text: shareText });
      } catch (err) {
        // AbortError fires when the user simply dismisses the native share sheet.
        if (err && err.name !== "AbortError") showToast("Share failed — please try again", "danger");
      }
      return;
    }

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(shareText);
      } else {
        fallbackCopy(shareText);
      }
      showToast("Sharing isn't supported here — copied instead");
    } catch {
      showToast("Share failed — please try again", "danger");
    }
  }

  /* ============================================================
     11. Theme (Midnight / Obsidian)
  ============================================================ */
  function applyTheme(themeName) {
    state.theme = themeName;
    if (themeName === "obsidian") {
      document.documentElement.setAttribute("data-theme", "obsidian");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    localStorage.setItem(STORAGE_KEYS.theme, themeName);

    qsa(".segmented-btn", qs("#themeSegmented")).forEach((btn) => {
      const isActive = btn.dataset.theme === themeName;
      btn.setAttribute("aria-checked", String(isActive));
    });

    // Keep the browser chrome color (status bar) matched to the surface.
    const themeColorMeta = qs('meta[name="theme-color"]');
    if (themeColorMeta) themeColorMeta.setAttribute("content", themeName === "obsidian" ? "#000000" : "#0F172A");
  }

  function loadTheme() {
    const saved = localStorage.getItem(STORAGE_KEYS.theme);
    applyTheme(saved === "obsidian" ? "obsidian" : "midnight");
  }

  /* ============================================================
     12. PWA — install prompt + offline status
  ============================================================ */
  function initInstallFlow() {
    const installStatusText = qs("#installStatusText");
    const installBtn = qs("#btnInstallApp");

    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;

    if (isStandalone) {
      installStatusText.textContent = "Installed on this device ✓";
    }

    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault();
      state.deferredInstallPrompt = event;
      if (!isStandalone) installStatusText.textContent = "Add PromptForge to your home screen.";
    });

    installBtn.addEventListener("click", async () => {
      if (isStandalone) {
        showToast("PromptForge is already installed");
        return;
      }
      if (!state.deferredInstallPrompt) {
        showToast("Use your browser's \u201cAdd to Home Screen\u201d option to install");
        return;
      }
      state.deferredInstallPrompt.prompt();
      const { outcome } = await state.deferredInstallPrompt.userChoice;
      state.deferredInstallPrompt = null;
      installStatusText.textContent = outcome === "accepted" ? "Installed on this device ✓" : "Add PromptForge to your home screen.";
      showToast(outcome === "accepted" ? "PromptForge installed" : "Install dismissed");
    });

    window.addEventListener("appinstalled", () => {
      installStatusText.textContent = "Installed on this device ✓";
      showToast("PromptForge installed");
    });
  }

  function initOfflineStatus() {
    const dot = qs("#offlineStatusDot");
    const text = qs("#offlineStatusText");

    function refresh() {
      const swReady = "serviceWorker" in navigator && !!navigator.serviceWorker.controller;
      dot.classList.toggle("is-online", swReady);
      text.textContent = swReady
        ? "Cached for offline use ✓"
        : navigator.onLine
        ? "Preparing offline cache…"
        : "You're offline — some data may be limited.";
    }

    refresh();
    window.addEventListener("online", refresh);
    window.addEventListener("offline", refresh);
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("controllerchange", refresh);
      navigator.serviceWorker.ready.then(refresh).catch(() => {});
    }
  }

  function registerServiceWorker() {
    if (!("serviceWorker" in navigator)) return;
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js").catch(() => {
        showToast("Offline support unavailable in this browser", "danger");
      });
    });
  }

  /* ============================================================
     13. Event delegation
  ============================================================ */
  function initEventDelegation() {
    // ---- Single click handler covers nav, cards, chips, actions ----
    document.addEventListener("click", (event) => {
      const target = event.target;

      // Bottom nav + every [data-nav] shortcut (search launcher, "See all", gear icon, empty-state CTA)
      const navEl = target.closest("[data-nav]");
      if (navEl) {
        event.preventDefault();
        goToScreen(navEl.dataset.nav);
        if (navEl.dataset.nav === "search") {
          setTimeout(() => qs("#searchInput").focus({ preventScroll: true }), 260);
        }
        return;
      }

      // Category tile → open Search screen pre-filtered to that category
      const catTile = target.closest(".cat-tile");
      if (catTile) {
        state.activeCategory = catTile.dataset.category;
        state.searchKeyword = "";
        qs("#searchInput").value = "";
        qs("#btnClearSearch").hidden = true;
        renderChipRow();
        renderSearchResults();
        goToScreen("search");
        return;
      }

      // Category chip inside Search screen
      const chip = target.closest(".chip");
      if (chip) {
        state.activeCategory = chip.dataset.chip;
        renderChipRow();
        renderSearchResults();
        return;
      }

      // Favorite toggle (mini-btn or details heart) — stop before card-open logic
      const favActionEl = target.closest('[data-action="fav"]');
      if (favActionEl) {
        event.stopPropagation();
        toggleFavorite(favActionEl.dataset.id);
        return;
      }

      // Copy action (mini-btn, featured card button, details button)
      const copyActionEl = target.closest('[data-action="copy"]');
      if (copyActionEl) {
        event.stopPropagation();
        copyPromptToClipboard(copyActionEl.dataset.id, copyActionEl);
        return;
      }

      // Share action (details screen)
      const shareActionEl = target.closest('[data-action="share"]');
      if (shareActionEl) {
        event.stopPropagation();
        sharePrompt(shareActionEl.dataset.id);
        return;
      }

      // Explicit "View" button on the featured card
      const openActionEl = target.closest('[data-action="open"]');
      if (openActionEl) {
        openDetails(Number(openActionEl.dataset.id));
        return;
      }

      // Any prompt card / rail card / featured card opens Details
      const card = target.closest(".prompt-card, .rail-card, .featured-card");
      if (card && card.dataset.id) {
        openDetails(Number(card.dataset.id));
        return;
      }

      // Details screen back button
      if (target.closest("#btnBackFromDetails")) {
        closeDetails();
        return;
      }

      // Settings: theme segmented control
      const themeBtn = target.closest(".segmented-btn");
      if (themeBtn) {
        applyTheme(themeBtn.dataset.theme);
        return;
      }

      // Settings: clear favorites
      if (target.closest("#btnClearFavorites")) {
        clearAllFavorites();
        return;
      }

      // Settings: about sheet open/close
      if (target.closest("#btnAbout")) {
        openAboutSheet();
        return;
      }
      if (target.closest("#btnCloseAbout") || target === qs("#aboutBackdrop")) {
        closeAboutSheet();
        return;
      }
    });

    // ---- Keyboard activation for card/tile elements (role="button") ----
    document.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      const interactive = event.target.closest('[role="button"]');
      if (interactive) {
        event.preventDefault();
        interactive.click();
      }
    });

    // ---- Live search input ----
    const searchInput = qs("#searchInput");
    const clearBtn = qs("#btnClearSearch");
    searchInput.addEventListener("input", () => {
      state.searchKeyword = searchInput.value;
      clearBtn.hidden = searchInput.value.length === 0;
      renderSearchResults();
    });
    clearBtn.addEventListener("click", () => {
      searchInput.value = "";
      state.searchKeyword = "";
      clearBtn.hidden = true;
      renderSearchResults();
      searchInput.focus();
    });
  }

  function openAboutSheet() {
    const backdrop = qs("#aboutBackdrop");
    backdrop.hidden = false;
    requestAnimationFrame(() => backdrop.classList.add("visible"));
  }
  function closeAboutSheet() {
    const backdrop = qs("#aboutBackdrop");
    backdrop.classList.remove("visible");
    setTimeout(() => (backdrop.hidden = true), 240);
  }

  /* ============================================================
     14. Init
  ============================================================ */
  function renderAllHomeSections() {
    renderFeatured();
    renderTrendingRail();
    renderCategoryGrid(qs("#homeCategoryGrid"), false);
    renderRecentList();
  }

  function initApp() {
    loadFavorites();
    loadTheme();

    renderAllHomeSections();
    renderCategoryGrid(qs("#categoriesFullGrid"), true);
    renderChipRow();
    renderSearchResults();
    renderFavoritesList();

    initRipples();
    initEventDelegation();
    initInstallFlow();
    initOfflineStatus();
    registerServiceWorker();

    // Support PWA manifest shortcuts (e.g. long-press icon → "Search"),
    // which launch the app with ?screen=search|favorites in the URL.
    const requestedScreen = new URLSearchParams(window.location.search).get("screen");
    if (requestedScreen && NAV_SCREENS.includes(requestedScreen)) {
      goToScreen(requestedScreen);
    } else {
      goToScreen("home");
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
  } else {
    initApp();
  }
})();
