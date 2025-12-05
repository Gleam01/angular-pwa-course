const VERSION = "v11";

log("Installing Service Worker");

self.addEventListener("install", (event) =>
  event.waitUntil(installServiceWorker())
);

async function installServiceWorker() {
  log("Service Worker installation started ");
  const cache = await caches.open(getCacheName());
  return cache.addAll([
    "/",
    "/runtime.js",
    "/polyfills.js",
    "/styles.js",
    "/vendor.js",
    "/main.js",
    "/assets/bundle.css",
    "/assets/angular-pwa-course.png",
    "/assets/main-page-logo-small-hat.png",
    "/favicon.ico",
  ]);
  log("Service Worker installation completed ");
}

function getCacheName() {
  return `app-cache-${VERSION}`;
}

self.addEventListener("fetch", event => event.respondWith(cacheThenNetwork(event)));

async function cacheThenNetwork(event) {
  const cache = await caches.open(getCacheName());
  const cachedResponse = await cache.match(event.request);
  if (cachedResponse) {
    log("Serving from cache:", event.request.url);
    return cachedResponse;
  }

  const networkResponse = await fetch(event.request);
  log("Serving from network:", event.request.url);
  return networkResponse;
}

function log(message, ...data) {
  if (data.length > 0) {
    console.log(VERSION, message, data);
  } else {
    console.log(VERSION, message);
  }
}
