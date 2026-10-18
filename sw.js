/* Service worker: tiene una copia del cruscotto sul telefono, così si apre anche senza rete (in aereo).
   Pagina e file del sito: prima la rete (per avere sempre l'ultima versione), se non risponde la copia salvata.
   Font Google: dalla copia salvata. Google Maps e database non passano di qui: senza rete non funzionano. */
const CACHE = "jp26-v1";
const FILES = ["./", "index.html", "config.js", "foto-famiglia.webp", "manifest.webmanifest", "icona-180.png", "icona-192.png", "icona-512.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES.map(f => new Request(f, { cache: "reload" })))).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

function fromNetwork(req, key) {
  return new Promise((res, rej) => {
    const t = setTimeout(() => rej(new Error("timeout")), 4000);
    fetch(req).then(r => {
      clearTimeout(t);
      if (r.ok) { const copy = r.clone(); caches.open(CACHE).then(c => c.put(key, copy)); }
      res(r);
    }, err => { clearTimeout(t); rej(err); });
  });
}

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  if (url.origin === self.location.origin) {
    // la pagina si salva sempre come "./", qualunque parametro abbia l'indirizzo
    const key = req.mode === "navigate" ? "./" : url.pathname;
    e.respondWith(fromNetwork(req, key).catch(() =>
      caches.match(key, { ignoreSearch: true }).then(r => r || caches.match("./")).then(r => r || Response.error())));
    return;
  }

  if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => {
      if (r.ok || r.type === "opaque") { const copy = r.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
      return r;
    })));
  }
});
