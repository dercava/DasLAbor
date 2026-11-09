/* dasLabor23 – Offline-Unterstützung: App-Dateien werden gespeichert, Updates kommen beim nächsten Start */
const C="daslabor23-v42";
const FILES=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png","apple-touch-icon.png"];
self.addEventListener("install",e=>{ e.waitUntil(caches.open(C).then(c=>c.addAll(FILES))); self.skipWaiting(); });
self.addEventListener("activate",e=>{ e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x))))); self.clients.claim(); });
self.addEventListener("fetch",e=>{ const u=new URL(e.request.url);
  if(e.request.method!=="GET"||u.origin!==location.origin||e.request.headers.has("range")||/\.(mp3|m4a)$/i.test(u.pathname)) return; /* Podcast, Schriften usw. direkt aus dem Netz */
  e.respondWith(fetch(e.request).then(r=>{ const cp=r.clone(); caches.open(C).then(c=>c.put(e.request,cp)); return r; }).catch(()=>caches.match(e.request).then(r=>r||caches.match("index.html")))); });
