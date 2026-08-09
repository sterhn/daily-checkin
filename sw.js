const CACHE = "daily-checkin-v4";
const ASSETS = ["./", "index.html", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png", "icons/icon-512-maskable.png"];
const NETWORK_TIMEOUT = 3500;

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
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

// network-first (with a timeout) so updates land quickly, cache fallback so it works offline
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetchWithTimeout(e.request, NETWORK_TIMEOUT)
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
