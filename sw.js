/* Combo service worker.
   1. Serves voice audio that the FULL download saved on this device.
   2. Game files (flag "rcover"): the page keeps a copy of the game's own files in the cache "combo-shell-v1". The newest files from the game
      server are always used when it answers in time. When it does not (asleep, starting up, or the host shows its own waiting page), the saved
      copy is shown instead so the studio intro and start screen appear right away. Nothing is served from the copy unless the page made one. */
const CN = 'combo-audio-v1', HOST = 'https://platform.r2.fish.audio/', SH = 'combo-shell-v1';
let coldUntil = 0;
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
const good = r => r && r.status === 200 && r.headers.get('x-combo') === '1';
const timed = (req, ms) => new Promise((res, rej) => { const t = setTimeout(() => rej(new Error('slow')), ms); fetch(req).then(r => { clearTimeout(t); res(r); }, x => { clearTimeout(t); rej(x); }); });
async function shell(e, key) {
  let c = null, hit = null;
  try { if (await caches.has(SH)) { c = await caches.open(SH); hit = await c.match(key); } } catch (x) {}
  if (!hit) return fetch(e.request);
  const nav = e.request.mode === 'navigate';
  if (!nav && Date.now() < coldUntil) return hit;
  try {
    const r = await timed(e.request, nav ? 3000 : 6000);
    if (good(r)) { try { await c.put(key, r.clone()); } catch (x) {} if (nav) coldUntil = 0; return r; }
  } catch (x) {}
  if (nav) coldUntil = Date.now() + 25000;
  return hit;
}
self.addEventListener('fetch', e => {
  const u = e.request.url;
  if (e.request.method !== 'GET') return;
  if (u.indexOf(HOST) !== 0) {
    let q; try { q = new URL(u); } catch (x) { return; }
    if (q.origin !== self.location.origin) return;
    const p = q.pathname;
    if (p.indexOf('/api/') === 0 || p === '/live.json' || p === '/health' || p === '/sw.js') return;
    if (!/^\/$|\.(html|js|png|json)$/.test(p)) return;
    e.respondWith(shell(e, q.origin + p));
    return;
  }
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
