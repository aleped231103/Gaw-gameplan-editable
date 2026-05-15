self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('gw-guide-v1').then(cache => cache.addAll([
      './gw-tournament-guide.html',
      './manifest.webmanifest'
    ]))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request).catch(() => caches.match('./gw-tournament-guide.html')))
  );
});
