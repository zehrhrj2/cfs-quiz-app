// Service worker for the /doctor lead-magnet pages. Registered with
// scope: "/doctor" (see lib/doctor/useOfflineCache.ts) so it never touches
// /quiz, /ua, /ru, or /admin.
//
// Strategy: cache-first for every same-origin GET. Phrase data is bundled
// into the page's JS (not fetched separately), so caching the page's own
// script/style/font requests as they happen is what makes the whole thing
// work offline after one visit — there's nothing else to precache.
//
// Bump CACHE_NAME on any deploy where the doctor page content changes;
// cache-first means a returning visitor never sees new HTML/JS until the
// cache name changes and the old cache is evicted in `activate`.
const CACHE_NAME = "doctor-cache-v1";
const PRECACHE_URLS = ["/doctor", "/doctor/ru"];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll(PRECACHE_URLS).catch(() => {
        // one of the two locale pages may not be reachable yet (e.g. first
        // install triggered from whichever page the visitor landed on)
      })
    )
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request)
        .then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(() => cached);
    })
  );
});
