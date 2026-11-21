/* Combo service worker: only serves voice audio that the FULL download saved on this device. It never caches or changes the game's own files. */
const CN = 'combo-audio-v1', HOST = 'https://platform.r2.fish.audio/';
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  const u = e.request.url;
  if (u.indexOf(HOST) !== 0 || e.request.method !== 'GET') return;
  e.respondWith((async () => {
    try {
      const c = await caches.open(CN), hit = await c.match(u);
      if (!hit) return fetch(e.request);
      const rg = e.request.headers.get('range');
      if (!rg || hit.type === 'opaque') return hit;
      const buf = await hit.arrayBuffer(), n = buf.byteLength, m = /bytes=(\d*)-(\d*)/.exec(rg) || [];
      let a = m[1] ? +m[1] : 0, b = m[2] ? +m[2] : n - 1;
      if (!m[1] && m[2]) { a = Math.max(0, n - (+m[2])); b = n - 1; }
      b = Math.min(b, n - 1);
      if (a > b) return new Response(null, { status: 416, headers: { 'content-range': 'bytes */' + n } });
      return new Response(buf.slice(a, b + 1), { status: 206, headers: { 'content-type': hit.headers.get('content-type') || 'audio/wav', 'content-range': 'bytes ' + a + '-' + b + '/' + n, 'accept-ranges': 'bytes', 'content-length': String(b - a + 1) } });
    } catch (x) { return fetch(e.request); }
  })());
});
