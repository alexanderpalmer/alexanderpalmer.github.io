self.addEventListener('install', event => {
  event.waitUntil(
    new Promise((resolve, reject) => {
      resolve('Installing');
    })
    .then(result => console.log(result))
  )
})

self.addEventListener('activate', event => {
  event.waitUntil(
    new Promise((resolve, reject) => {
      resolve('Waiting');
    })
    .then(result => console.log(result))
  )
})

self.addEventListener('fetch', event => {
  console.log('fetch', event.request);
  if (event.request.url.endsWith('/hello-world')) {
    event.respondWith(new Response('Hallo Welt'));
  }

})