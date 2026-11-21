// Combo game server: serves the game, pairs players for online matches,
// and relays friend requests and chat between players who are online.
// Nothing is stored on disk: friend lists live in each player's browser.
// Dev Studio items (staged and released content) are kept in Postgres when one is attached.
// No dependencies: plain Node http + a small WebSocket implementation.
const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = process.env.PORT || 10000;
const ROOT = __dirname;
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.svg': 'image/svg+xml', '.json': 'application/json' };
const MAX_MSG = 16 * 1024;
const RELAY = new Set(['i', 's', 'k', 'h', 'v', 'map', 'tg', 'bi']);

const queues = { casual: [], ranked: [], raid: [] };
const users = new Map();    // lowercase name -> client
const pending = new Map();  // lowercase name -> [profile of people who sent a friend request while they were offline]
let online = 0;

// ---- Dev Studio storage (optional) ----------------------------------------
// Staged and released fighters, maps, modes and banners live in Postgres when DATABASE_URL is set.
// Without a database the game still runs: released content then comes from the live.json file.
// The studio is only reachable with the DEV_KEY environment variable (sent as the x-dev-key header).
const DEV_KEY = process.env.DEV_KEY || '';
const COLS = new Set(['staged', 'live']);
let pool = null, dbReady = false, liveCache = null;
try {
  if (process.env.DATABASE_URL) { const { Pool } = require('pg'); pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 3 }); pool.on('error', () => {}); }
} catch (e) { console.log('Dev Studio storage is off: ' + e.message); pool = null; }
const cleanId = v => String(v == null ? '' : v).replace(/[^A-Za-z0-9_\-]/g, '').slice(0, 60);
const rowItem = r => Object.assign({}, r.data, { id: r.id });
async function itemsIn(col) { const r = await pool.query('select id, data from combo_items where col = $1 order by updated_at desc', [col]); return r.rows.map(rowItem); }
async function refreshLive() { if (!pool || !dbReady) return; try { liveCache = await itemsIn('live'); } catch (e) {} }
async function dbInit() {
  if (!pool) return;
  try {
    await pool.query('create table if not exists combo_items (id text primary key, col text not null, data jsonb not null, updated_at timestamptz not null default now())');
    await pool.query('create table if not exists combo_seen (id text primary key)');
    await pool.query('create table if not exists combo_lb (id text primary key, name text not null, rank int not null default 1000, wins int not null default 0, raids int not null default 0, xp int not null default 0, updated_at timestamptz not null default now())');
    await pool.query('alter table combo_lb add column if not exists icon int not null default 0');
    await pool.query('alter table combo_lb add column if not exists banner int not null default 0');
    // staged.json in the repo is how new items arrive: each id (and each new "rev" of it) is added to the staged list once.
    let seed = [];
    try { seed = JSON.parse(fs.readFileSync(path.join(ROOT, 'staged.json'), 'utf8')); } catch (e) {}
    for (const it of Array.isArray(seed) ? seed : []) {
      const id = cleanId(it && it.id); if (!id || !it.name || !it.type) continue;
      const seen = await pool.query('insert into combo_seen (id) values ($1) on conflict do nothing', [id + '@' + (parseInt(it.rev, 10) || 1)]);
      if (!seen.rowCount) continue;
      const data = Object.assign({}, it); delete data.id;
      await pool.query("insert into combo_items (id, col, data) values ($1, 'staged', $2::jsonb) on conflict (id) do update set data = excluded.data, updated_at = now() where combo_items.col = 'staged'", [id, JSON.stringify(data)]);
    }
    dbReady = true; await refreshLive();
    console.log('Dev Studio storage ready' + (DEV_KEY.length >= 6 ? '' : ' (set DEV_KEY to open the studio)'));
  } catch (e) { console.log('Dev Studio storage not ready, retrying: ' + e.message); setTimeout(dbInit, 30000); }
}
dbInit();
setInterval(refreshLive, 60000).unref();
const bad = new Map();      // ip -> [count, window start] for wrong dev keys
function keyOk(v) {
  if (DEV_KEY.length < 6 || typeof v !== 'string') return false;
  const h = x => crypto.createHash('sha256').update(x).digest();
  return crypto.timingSafeEqual(h(v), h(DEV_KEY));
}
function json(res, code, obj) { res.writeHead(code, { 'content-type': 'application/json', 'cache-control': 'no-store' }); res.end(JSON.stringify(obj)); }
function devApi(req, res) {
  if (req.method !== 'POST') return json(res, 405, { error: 'post only' });
  if (!pool || !dbReady || DEV_KEY.length < 6) return json(res, 503, { error: 'off' });
  const ip = String(req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').split(',')[0].trim(), now = Date.now();
  let b = bad.get(ip); if (b && now - b[1] > 600000) { bad.delete(ip); b = null; }
  if (b && b[0] >= 8) return json(res, 429, { error: 'slow down' });
  if (!keyOk(req.headers['x-dev-key'])) { if (b) b[0]++; else bad.set(ip, [1, now]); if (bad.size > 5000) bad.clear(); return json(res, 401, { error: 'key' }); }
  let body = '', over = false;
  req.on('data', d => { if (over) return; body += d; if (body.length > 65536) { over = true; json(res, 413, { error: 'too big' }); req.destroy(); } });
  req.on('end', async () => {
    if (over) return;
    try {
      let m; try { m = JSON.parse(body || '{}'); } catch (e) { return json(res, 400, { error: 'json' }); }
      const id = cleanId(m.id), col = COLS.has(m.col) ? m.col : '';
      if (m.op === 'set') {
        if (!id || !col || !m.data || typeof m.data !== 'object' || Array.isArray(m.data)) return json(res, 400, { error: 'bad item' });
        const data = Object.assign({}, m.data); delete data.id;
        await pool.query('insert into combo_items (id, col, data) values ($1, $2, $3::jsonb) on conflict (id) do update set col = excluded.col, data = excluded.data, updated_at = now()', [id, col, JSON.stringify(data)]);
      } else if (m.op === 'del') {
        if (!id || !col) return json(res, 400, { error: 'bad item' });
        await pool.query('delete from combo_items where id = $1 and col = $2', [id, col]);
      } else if (m.op !== 'list') return json(res, 400, { error: 'op' });
      const staged = await itemsIn('staged'); liveCache = await itemsIn('live');
      json(res, 200, { staged, live: liveCache });
    } catch (e) { json(res, 500, { error: 'storage' }); }
  });
}

// ---- Leaderboard (optional, needs the database) ----------------------------
// GET /api/lb returns the top players of each board; POST /api/lb saves one player's own numbers.
let lbCache = null, lbAt = 0; const lbHits = new Map();
const lbInt = (v, max) => Math.max(0, Math.min(max, Math.floor(Number(v) || 0)));
function lbApi(req, res) {
  if (!pool || !dbReady) return json(res, 503, { error: 'off' });
  if (req.method === 'GET') {
    if (lbCache && Date.now() - lbAt < 15000) return json(res, 200, lbCache);
    const q = c => pool.query('select id, name, rank, wins as w, raids as r, xp, icon, banner from combo_lb order by ' + c + ' desc limit 100');
    return Promise.all([q('rank'), q('wins'), q('raids'), q('xp')]).then(rs => {
      const seen = new Map(); rs.forEach(r => r.rows.forEach(x => seen.set(x.id, x)));
      lbCache = { rows: Array.from(seen.values()) }; lbAt = Date.now(); json(res, 200, lbCache);
    }).catch(() => json(res, 500, { error: 'storage' }));
  }
  if (req.method !== 'POST') return json(res, 405, { error: 'method' });
  const ip = String(req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').split(',')[0].trim(), now = Date.now();
  if (now - (lbHits.get(ip) || 0) < 3000) return json(res, 429, { error: 'slow down' });
  lbHits.set(ip, now); if (lbHits.size > 20000) lbHits.clear();
  let body = '', over = false;
  req.on('data', d => { if (over) return; body += d; if (body.length > 2048) { over = true; json(res, 413, { error: 'too big' }); req.destroy(); } });
  req.on('end', async () => {
    if (over) return;
    try {
      let m; try { m = JSON.parse(body || '{}'); } catch (e) { return json(res, 400, { error: 'json' }); }
      const id = cleanId(m.id), name = String(m.name == null ? '' : m.name).replace(/[^A-Za-z0-9 _\-]/g, '').trim().slice(0, 14);
      if (id.length < 8 || !name) return json(res, 400, { error: 'bad player' });
      const vals = [id, name, lbInt(m.rank, 9999), lbInt(m.w, 1000000), lbInt(m.r, 1000000), lbInt(m.xp, 400000000)];
      // icon and banner are only sent by games with the leaderboard-cards update on; a save without them leaves the stored look alone
      if (m.icon != null && m.banner != null) await pool.query('insert into combo_lb (id, name, rank, wins, raids, xp, icon, banner) values ($1, $2, $3, $4, $5, $6, $7, $8) on conflict (id) do update set name = excluded.name, rank = excluded.rank, wins = excluded.wins, raids = excluded.raids, xp = excluded.xp, icon = excluded.icon, banner = excluded.banner, updated_at = now()', vals.concat([lbInt(m.icon, 9999), lbInt(m.banner, 9999)]));
      else await pool.query('insert into combo_lb (id, name, rank, wins, raids, xp) values ($1, $2, $3, $4, $5, $6) on conflict (id) do update set name = excluded.name, rank = excluded.rank, wins = excluded.wins, raids = excluded.raids, xp = excluded.xp, updated_at = now()', vals);
      json(res, 200, { ok: true });
    } catch (e) { json(res, 500, { error: 'storage' }); }
  });
}

const server = http.createServer((req, res) => {
  const url = (req.url || '/').split('?')[0];
  if (url === '/health') { res.writeHead(200, { 'content-type': 'application/json' }); return res.end(JSON.stringify({ ok: true, online })); }
  if (url === '/api/dev') return devApi(req, res);
  if (url === '/api/lb') return lbApi(req, res);
  if (url === '/live.json' && dbReady && liveCache) { res.writeHead(200, { 'content-type': 'application/json', 'cache-control': 'no-cache' }); return res.end(JSON.stringify(liveCache)); }
  const rel = url === '/' ? 'index.html' : path.normalize(url).replace(/^([/\\]|\.\.)+/, '');
  const file = path.join(ROOT, rel);
  if (!file.startsWith(ROOT) || !TYPES[path.extname(file)] || path.basename(file) === 'server.js' || path.basename(file) === 'package.json' || path.basename(file) === 'staged.json') { res.writeHead(404); return res.end('Not found'); }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); return res.end('Not found'); }
    res.writeHead(200, { 'content-type': TYPES[path.extname(file)], 'cache-control': 'no-cache' });
    res.end(data);
  });
});

function send(c, obj) {
  if (!c || c.closed) return;
  const data = Buffer.from(typeof obj === 'string' ? obj : JSON.stringify(obj));
  const n = data.length;
  let head;
  if (n < 126) head = Buffer.from([0x81, n]);
  else if (n < 65536) { head = Buffer.alloc(4); head[0] = 0x81; head[1] = 126; head.writeUInt16BE(n, 2); }
  else { head = Buffer.alloc(10); head[0] = 0x81; head[1] = 127; head.writeBigUInt64BE(BigInt(n), 2); }
  try { c.sock.write(Buffer.concat([head, data])); } catch (e) { drop(c); }
}

const rq = new Map();       // raid queues: "size:boss" -> waiting clients
function unqueue(c) { for (const k in queues) { const i = queues[k].indexOf(c); if (i >= 0) queues[k].splice(i, 1); } for (const q of rq.values()) { const i = q.indexOf(c); if (i >= 0) q.splice(i, 1); } }
function leaveRoom(c) { const r = c.room; if (!r) return; c.room = null; const i = r.indexOf(c); if (i >= 0) r[i] = null; for (const o of r) if (o) send(o, { t: 'x', fr: c.slot }); }
function startRoom(list, size) {
  const hr = Math.floor(Date.now() / 3600000), stage = Math.floor(Math.random() * 1000000);
  list.forEach((c, i) => { c.room = list; c.slot = i; });
  const ps = list.map(c => ({ prof: c.prof, ci: c.team[0] | 0 }));
  list.slice().forEach((c, i) => send(c, { t: 'm', raid: 1, slot: i, size, stage, hr, ps }));
}
function unpair(c) { if (c.peer) { const p = c.peer; c.peer = null; p.peer = null; send(p, { t: 'x' }); } }

function drop(c) {
  if (c.closed) return;
  c.closed = true; online--;
  unqueue(c); unpair(c); leaveRoom(c);
  if (c.key && users.get(c.key) === c) users.delete(c.key);
  try { c.sock.destroy(); } catch (e) {}
}

const int = (v, a, b) => Math.min(b, Math.max(a, Number.isFinite(+v) ? Math.floor(+v) : a));
function cleanName(v) { return String(v == null ? '' : v).replace(/[^A-Za-z0-9_ \-]/g, '').trim().slice(0, 14); }
function cleanProf(p, name) { p = p && typeof p === 'object' ? p : {}; return { name, icon: int(p.icon, 0, 8191), banner: int(p.banner, 0, 8191), lvl: int(p.lvl, 1, 999), rank: int(p.rank, 0, 9999), border: int(p.border, 0, 29) }; }
function cleanTeam(t) {
  const out = [];
  if (Array.isArray(t)) for (const v of t.slice(0, 3)) if (Number.isInteger(v) && v >= 0 && v < 8192) out.push(v);
  while (out.length < 3) out.push(out.length);
  return out;
}

function hello(c, m) {
  let name = cleanName(m.prof && m.prof.name) || 'Player';
  const pid = String(m.pid || '').slice(0, 40);
  let key = name.toLowerCase();
  const holder = users.get(key);
  if (holder && holder !== c) {
    if (holder.pid && holder.pid === pid) drop(holder);            // same player reconnecting
    else { name = (name.slice(0, 10) + (100 + Math.floor(Math.random() * 900))); key = name.toLowerCase(); }
  }
  if (c.key && c.key !== key && users.get(c.key) === c) users.delete(c.key);
  c.name = name; c.key = key; c.pid = pid; c.prof = cleanProf(m.prof, name);
  users.set(key, c);
  const pend = pending.get(key) || [];
  pending.delete(key);
  send(c, { t: 'hi', name, online: users.size, pend });
}

function onMessage(c, text) {
  const now = Date.now();
  if (now - c.rt > 1000) { c.rt = now; c.rate = 0; }
  if (++c.rate > 240) return drop(c);
  let m;
  try { m = JSON.parse(text); } catch (e) { return; }
  if (!m || typeof m !== 'object') return;
  if (RELAY.has(m.t)) {
    if (c.peer) send(c.peer, text);
    else if (c.room) { m.fr = c.slot; const t = JSON.stringify(m); for (const o of c.room) if (o && o !== c) send(o, t); }
    return;
  }
  switch (m.t) {
    case 'hi': return hello(c, m);
    case 'p': return send(c, { t: 'on', n: users.size });
    case 'q': {
      if (c.peer || c.room || !c.name) return;
      unqueue(c);
      if (m.mode === 'raid') {
        const size = m.size === 4 ? 4 : 2, key = size + ':' + int(m.b, 0, 2);
        c.team = cleanTeam(m.team); c.rk = key; c.rs = size;
        const q = (rq.get(key) || []).filter(o => !o.closed && o !== c); q.push(c);
        if (q.length >= size) startRoom(q.splice(0, size), size);
        rq.set(key, q);
        return;
      }
      const q = queues[m.mode === 'ranked' ? 'ranked' : m.mode === 'raid' ? 'raid' : 'casual'];
      c.team = cleanTeam(m.team);
      let other = q.shift();
      while (other && (other.closed || other === c)) other = q.shift();
      if (other) {
        c.peer = other; other.peer = c;
        const hr = Math.floor(Date.now() / 3600000);   // both raid partners fight the same hourly boss
        const stage = Math.floor(Math.random() * 1000000);   // seed both players use to pick the stage vote options
        send(other, { t: 'm', side: 0, stage, hr, opp: { team: c.team, prof: c.prof } });
        send(c, { t: 'm', side: 1, stage, hr, opp: { team: other.team, prof: other.prof } });
      } else q.push(c);
      return;
    }
    case 'uq': return unqueue(c);
    case 'bot': {
      if (c.peer || c.room) return;
      const q = c.rk && rq.get(c.rk);
      if (q && q.includes(c) && q.length >= 2) return startRoom(q.splice(0, q.length), c.rs);   // start the raid with whoever is waiting; bots fill the rest
      unqueue(c); return send(c, { t: 'botok' });
    }   // only hand out a bot if no player was found
    case 'done': leaveRoom(c); return unpair(c);
  }
  if (!c.name) return;
  switch (m.t) {
    case 'find': {
      const q = cleanName(m.q).toLowerCase(), list = [];
      if (q) for (const [k, u] of users) { if (u !== c && k.includes(q)) { list.push(u.prof); if (list.length >= 6) break; } }
      return send(c, { t: 'found', list });
    }
    case 'fr': {
      const key = cleanName(m.to).toLowerCase();
      if (!key || key === c.key) return;
      const u = users.get(key);
      if (u) send(u, { t: 'fr', prof: c.prof });
      else if (pending.size < 5000 || pending.has(key)) { const l = pending.get(key) || []; if (l.length < 6 && !l.some(p => p.name === c.name)) l.push(c.prof); pending.set(key, l); }
      return send(c, { t: 'frs', on: !!u });
    }
    case 'fa': { const u = users.get(cleanName(m.to).toLowerCase()); if (u) send(u, { t: 'fa', prof: c.prof }); return; }
    case 'pres': {
      const on = {};
      if (Array.isArray(m.names)) for (const n of m.names.slice(0, 50)) { const u = users.get(cleanName(n).toLowerCase()); if (u) on[u.name] = u.prof; }
      return send(c, { t: 'pres', on });
    }
    case 'dm': {
      const u = users.get(cleanName(m.to).toLowerCase()), msg = String(m.msg == null ? '' : m.msg).replace(/[\u0000-\u001f]/g, ' ').slice(0, 140);
      if (!msg) return;
      if (u) send(u, { t: 'dm', from: c.name, msg }); else send(c, { t: 'dmx' });
      return;
    }
  }
}

server.on('upgrade', (req, sock) => {
  const key = req.headers['sec-websocket-key'];
  if (!key || (req.headers.upgrade || '').toLowerCase() !== 'websocket') return sock.destroy();
  const accept = crypto.createHash('sha1').update(key + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11').digest('base64');
  sock.write('HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Accept: ' + accept + '\r\n\r\n');
  sock.setNoDelay(true);
  const c = { sock, buf: Buffer.alloc(0), peer: null, closed: false, team: [0, 1, 2], name: '', key: '', pid: '', prof: null, rate: 0, rt: 0 };
  online++;
  sock.on('data', chunk => {
    c.buf = Buffer.concat([c.buf, chunk]);
    if (c.buf.length > MAX_MSG * 4) return drop(c);
    for (;;) {
      if (c.buf.length < 2) return;
      const op = c.buf[0] & 0x0f, masked = c.buf[1] & 0x80;
      let len = c.buf[1] & 0x7f, off = 2;
      if (len === 126) { if (c.buf.length < 4) return; len = c.buf.readUInt16BE(2); off = 4; }
      else if (len === 127) { if (c.buf.length < 10) return; const big = c.buf.readBigUInt64BE(2); if (big > BigInt(MAX_MSG)) return drop(c); len = Number(big); off = 10; }
      if (len > MAX_MSG || !masked) return drop(c);
      if (c.buf.length < off + 4 + len) return;
      const mask = c.buf.subarray(off, off + 4), payload = Buffer.from(c.buf.subarray(off + 4, off + 4 + len));
      for (let i = 0; i < len; i++) payload[i] ^= mask[i & 3];
      c.buf = c.buf.subarray(off + 4 + len);
      if (op === 8) return drop(c);
      if (op === 9) { try { sock.write(Buffer.concat([Buffer.from([0x8a, payload.length]), payload])); } catch (e) {} continue; }
      if (op === 1) onMessage(c, payload.toString('utf8'));
    }
  });
  sock.on('close', () => drop(c));
  sock.on('error', () => drop(c));
});

server.listen(PORT, () => console.log('Combo server listening on ' + PORT));
