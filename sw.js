const cacheName = "prueba-pwa-v1";
const baseURL = "/Prueba_PWA/";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(cacheName)
      .then((cache) =>
        cache.addAll([
          baseURL,
          baseURL + "index.html",
          baseURL + "manifest.json",
          baseURL + "image/Icon_image.png",
          baseURL + "image/Icon_image2.png",
        ])
      )
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== cacheName)
            .map((key) => caches.delete(key))
        )
      )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then((response) => {
      if (response) return response;

      return fetch(event.request).then((res) => {
        if (!res || res.status !== 200) return res;

        const resClone = res.clone();
        caches.open(cacheName).then((cache) => {
          cache.put(event.request, resClone);
        });

        return res;
      });
    })
  );
});
