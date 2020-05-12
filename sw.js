self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('my-pwa-v1')
      .then(cache => cache.addAll(['/', '/index.html',
        '/pages/about.html', '/pages/contact.html', '/pages/products.html',
        '/manifest.json', '/css/style.css',
        '/js/app.js', '/js/install.js',
        '/favicon.ico',
        '/images/pic01.jpg',
        '/images/pic02.jpg',
        '/images/pic03.jpg',
        '/images/icons/favicon-32x32.png',
        '/images/icons/favicon-16x16.png',
        '/images/icons/apple-touch-icon-60x60.png',
        '/images/icons/apple-touch-icon-76x76.png',
        '/images/icons/apple-touch-icon-120x120.png',
        '/images/icons/apple-touch-icon-152x152.png',
        '/images/icons/apple-touch-icon.png',
        '/images/icons/safari-pinned-tab.svg',
        '/images/icons/icon-72x72.png',
        '/images/icons/icon-96x96.png',
        '/images/icons/icon-128x128.png',
        '/images/icons/icon-144x144.png',
        '/images/icons/icon-152x152.png',
        '/images/icons/icon-192x192.png',
        '/images/icons/icon-384x384.png',
        '/images/icons/icon-512x512.png',
      ]))
      .then(() => self.skipWaiting())
  );
});


self.addEventListener('activate', event => {

})

self.addEventListener('fetch', event => {
  event.respondWith(async function () {
    const cache = await caches.open('mysite-dynamic');
    const cachedResponse = await cache.match(event.request);
    if (cachedResponse) return cachedResponse;
    const networkResponse = await fetch(event.request);
    event.waitUntil(
      cache.put(event.request, networkResponse.clone())
    );
    return networkResponse;
  }());
});

/*
event.respondWith(
  caches.open('my-pwa-v1').then(cache => {
    return fetch(event.request).then(response => {
      cache.put(event.request, response.clone());
      return response;
    })
  })
)
*/
