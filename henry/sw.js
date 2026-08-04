// Offline-Speicher für IdeenBlitz.
// Merkt sich die App auf dem Gerät, damit sie auch ohne Internet startet.
// Bei jeder neuen Version hier die Nummer erhöhen!
const CACHE = "ideenblitz-v9";

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE)
      // «reload» heisst: garantiert frisch vom Server holen,
      // nie aus einem alten Zwischenspeicher!
      .then((c) => c.addAll([
        new Request("./", { cache: "reload" }),
        new Request("icon.png", { cache: "reload" })
      ]))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((alle) => Promise.all(alle.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Erst aus dem Speicher antworten (schnell, geht offline),
// gleichzeitig im Internet nach einer neueren Version schauen.
// Das Wetter (fremde Adresse) wird nie gespeichert – es muss frisch sein!
self.addEventListener("fetch", (e) => {
  if (!e.request.url.startsWith(self.location.origin)) return;
  e.respondWith(
    caches.match(e.request).then((gespeichert) => {
      const ausDemNetz = fetch(e.request, { cache: "no-cache" })
        .then((antwort) => {
          if (antwort.ok) {
            const kopie = antwort.clone();
            caches.open(CACHE).then((c) => c.put(e.request, kopie));
          }
          return antwort;
        })
        .catch(() => gespeichert);
      return gespeichert || ausDemNetz;
    })
  );
});
