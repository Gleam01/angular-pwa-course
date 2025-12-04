const VERSION = 'v8';
function log(messages) {
  console.log(VERSION, messages);
}

log('Installing Service Worker...');

self.addEventListener('install', (event) => event.waitUntil(installServiceWorker()));

async function installServiceWorker() {
  log(' service worker installation started');
  const request = new Request('offline.html');
  const response = await fetch(request);

  log(' response received after loading offline.html', response);

  if (response.status !== 200) {
    throw new Error('Could not load offline page!');
  }

  const cache = await caches.open('app-cache');
  cache.put(request, response);
  log(' Cached offline.html');
}

self.addEventListener('fetch', (event) => event.respondWith(showOfflineIfError(event)));

async function showOfflineIfError(event) {
  try {
    log(' Calling network: ' + event.request.url);
    return await fetch(event.request);
  } catch (error) {
    log(' Network request failed. Serving offline page: ', error);
    const cache = await caches.open('app-cache');
    return await cache.match('offline.html');
  }
}
