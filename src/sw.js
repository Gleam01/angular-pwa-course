const VERSION = "v10";

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

self.addEventListener("activate", () => {
  log("Service Worker activated");
});

function log(message, ...data) {
  if (data.length > 0) {
    console.log(VERSION, message, data);
  } else {
    console.log(VERSION, message);
  }
}
