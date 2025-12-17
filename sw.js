const CACHE = 'elevator-cache-v1';
const urlsToCache = ['/', '/index.html', '/src/styles/index.css'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(urlsToCache)));
});
self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then((r) => r || fetch(e.request)));
});
