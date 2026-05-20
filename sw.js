const CACHE_NAME = 'baby-monitor-v2';
const urlsToCache = [
  './',
  './manifest.json',
  './icon.svg',
  './mqttws31.js',
  './screenshot1.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

// 接收推送通知
self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : {};
  const options = {
    body: data.body || '婴儿哭声警报',
    icon: './icon.svg',
    vibrate: [200, 100, 200],
    tag: 'baby-alert'
  };
  event.waitUntil(self.registration.showNotification(data.title || '婴睿监护', options));
});

// 点击通知打开页面
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(clients.openWindow('./'));
});