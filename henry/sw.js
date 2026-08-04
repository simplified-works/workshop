// Offline-Speicher für IdeenBlitz.
// Merkt sich die App auf dem Gerät, damit sie auch ohne Internet startet.
// Bei jeder neuen Version hier die Nummer erhöhen!
const CACHE = "ideenblitz-v8";

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => c.addAll(["./", "icon.png"]))
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
      const ausDemNetz = fetch(e.request)
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
