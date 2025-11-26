const cacheName = "multiplos-divisores-v1";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) =>
      cache.addAll([
        "/", // raíz
        "/multiplos-divisores/",
        "/multiplos-divisores/index.html",
        "/multiplos-divisores/manifest.json",
        "/multiplos-divisores/image/Icon_image.png",
        "/multiplos-divisores/image/Icon_image2.png",
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

// -------------------- PUSH NOTIFICATIONS --------------------
self.addEventListener("push", (event) => {
  const payload = event.data ? JSON.parse(event.data.text()) : {};

  const title = "Progressive Times";

  const options = {
    body: payload.msg,
    icon: payload.icon || "/image/Icon_image.png",
    data: { url: payload.url || "/" },
  };

  if (payload.type === "actionMessage") {
    options.actions = [
      { action: "voteup", title: "Vote Up" },
      { action: "votedown", title: "Vote Down" },
    ];
  }

  event.waitUntil(self.registration.showNotification(title, options));
});

// -------------------- CLICK NOTIFICATION --------------------
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const url =
    event.action === "voteup"
      ? "https://www.progressivetimes.com/voteup"
      : event.action === "votedown"
      ? "https://www.progressivetimes.com/votedown"
      : event.notification.data.url;

  event.waitUntil(clients.openWindow(url));
});

// -------------------- FETCH (CACHE + NETWORK) --------------------
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
