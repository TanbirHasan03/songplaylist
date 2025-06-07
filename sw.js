const CACHE_NAME = 'playlist-cache-v1';
const urlsToCache = [
  '/',
  'index.html',
  'manifest.json',
  'style.css',
  'sw.js',
  // Image and audio files dynamically added
];

for (let i = 1; i <= 24; i++) {
  urlsToCache.push(`${i}.jpg`);
  urlsToCache.push(`${i}.mp3`);
}

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
