/**
 * ============================================================
 * PromptForge AI — Service Worker
 * ------------------------------------------------------------
 * Strategy:
 *   - App shell (HTML/CSS/JS/data/icons/manifest) is precached
 *     on install so the app works fully offline after first load.
 *   - Navigation requests use network-first with a cache fallback,
 *     so users always get the freshest shell when online, and the
 *     cached shell when they're not.
 *   - Other same-origin GET requests use cache-first with a
 *     background network fallback (stale-while-revalidate-lite).
 *
 * Bump CACHE_VERSION whenever any precached file changes so the
 * old cache is cleaned up on activate.
 * ============================================================
 */

const CACHE_VERSION = "v1.0.0";
const CACHE_NAME = `promptforge-${CACHE_VERSION}`;

const APP_SHELL = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./prompts.js",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-512-maskable.png",
  "./icons/apple-touch-icon.png",
  "./icons/favicon-32.png",
  "./icons/favicon-16.png"
];

/* ---------- Install: precache the app shell ---------- */
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

/* ---------- Activate: drop any outdated cache versions ---------- */
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((key) => key.startsWith("promptforge-") && key !== CACHE_NAME).map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

/* ---------- Fetch: routing between strategies ---------- */
self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Only handle same-origin GET requests; let everything else (e.g. cross-origin,
  // POST) pass straight through to the network untouched.
  if (request.method !== "GET" || new URL(request.url).origin !== self.location.origin) {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request));
  } else {
    event.respondWith(cacheFirst(request));
  }
});

/** Network-first: try live data, fall back to cache, then to the cached shell as a last resort. */
async function networkFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  try {
    const fresh = await fetch(request);
    cache.put(request, fresh.clone());
    return fresh;
  } catch {
    const cached = await cache.match(request);
    return cached || cache.match("./index.html");
  }
}

/** Cache-first: serve instantly from cache, refresh the cache in the background when possible. */
async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);

  const networkFetch = fetch(request)
    .then((response) => {
      if (response && response.ok) cache.put(request, response.clone());
      return response;
    })
    .catch(() => null);

  return cached || (await networkFetch) || Response.error();
}
