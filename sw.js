const CACHE = "crg-8b46aa1e0830";
const FILES = ["./","./index.html","./assets/index-C0wkDRXk.js","./assets/ibm-plex-mono-latin-500-normal-DSY6xOcd.woff2","./assets/ibm-plex-mono-latin-600-normal-BgSNZQsw.woff2","./assets/ibm-plex-sans-condensed-latin-600-normal-CRd5VyFf.woff2","./assets/ibm-plex-sans-condensed-latin-700-normal-D8r4s4aS.woff2","./assets/ibm-plex-sans-latin-400-normal-CDDApCn2.woff2","./assets/ibm-plex-sans-latin-500-normal-6ng42L7E.woff2","./assets/ibm-plex-sans-latin-600-normal-CuJfVYMP.woff2","./assets/ibm-plex-sans-latin-700-normal-Bxkt5Cjx.woff2","./assets/index-bGOer7EI.css","./manifest.webmanifest","./icon.svg","./icon-192.png","./icon-512.png"];
self.addEventListener('install', (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  if (e.request.mode === 'navigate') {
    // Network-first for navigations: a fresh index.html references the new hashed assets, so the
    // first reload after a deploy picks up the new build whenever the player is online. Offline
    // (or any network failure) falls back to the last cached shell.
    e.respondWith(fetch(e.request).catch(() => caches.match('./index.html', { ignoreVary: true, ignoreSearch: true })));
    return;
  }
  // ignoreVary: vite preview (and some hosts) send a "Vary: Origin" header on static assets, which
  // would otherwise make this exact-URL precache lookup miss.
  e.respondWith(caches.match(e.request, { ignoreSearch: true, ignoreVary: true }).then((hit) => hit || fetch(e.request).catch(() => caches.match('./index.html'))));
});
