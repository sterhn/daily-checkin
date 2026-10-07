const CACHE = "daily-checkin-v17";
const ASSETS = ["./", "index.html", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png", "icons/icon-512-maskable.png",
  "chars/neutral.webp", "chars/happy.webp", "chars/great.webp", "chars/low.webp", "chars/rough.webp", "chars/sleepy.webp", "chars/proud.webp", "chars/coffee.webp", "chars/thinking.webp", "chars/cozy.webp", "chars/sigh.webp", "chars/nice.webp", "chars/annoyed.webp", "chars/surprised.webp", "chars/flustered.webp", "chars/away.webp"];
const NETWORK_TIMEOUT = 3500;

// "reload" skips the browser's HTTP cache, so a new version never precaches a stale copy
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS.map(u => new Request(u, { cache: "reload" })))).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// fetch with a timeout so a slow/stalled connection doesn't block the cache fallback
function fetchWithTimeout(request, ms) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("network timeout")), ms);
    fetch(request).then(
      res => { clearTimeout(timer); resolve(res); },
      err => { clearTimeout(timer); reject(err); }
    );
  });
}

// stickers and icons only change along with CACHE, so they come straight from the cache —
// a new face never waits on a slow connection
const STATIC = /\/(chars|icons)\//;
function cacheFirst(request) {
  return caches.match(request, { ignoreSearch: true }).then(hit => hit || fetch(request).then(res => {
    const copy = res.clone();
    caches.open(CACHE).then(c => c.put(request, copy));
    return res;
  }));
}

// everything else is network-first (with a timeout) so updates land quickly, cache fallback
// so it works offline. Our own files revalidate instead of trusting the HTTP cache, which on
// GitHub Pages can hold an old copy for 10 minutes.
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  const sameOrigin = new URL(e.request.url).origin === self.location.origin;
  if (sameOrigin && STATIC.test(new URL(e.request.url).pathname)) { e.respondWith(cacheFirst(e.request)); return; }
  e.respondWith(
    fetchWithTimeout(sameOrigin ? new Request(e.request, { cache: "no-cache" }) : e.request, NETWORK_TIMEOUT)
      .then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy));
        return res;
      })
      .catch(() =>
        caches.match(e.request, { ignoreSearch: true }).then(cached => {
          if (cached) return cached;
          // total cache miss: navigations fall back to the shell, everything else gets a clean 503
          if (e.request.mode === "navigate") return caches.match("index.html");
          return new Response("offline", { status: 503, statusText: "Service Unavailable" });
        })
      )
  );
});
