// Combo game server: serves the game, pairs players for online matches,
// and relays friend requests and chat between players who are online.
// Nothing is stored on disk: friend lists live in each player's browser.
// No dependencies: plain Node http + a small WebSocket implementation.
const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = process.env.PORT || 10000;
const ROOT = __dirname;
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.svg': 'image/svg+xml', '.json': 'application/json' };
const MAX_MSG = 16 * 1024;
const RELAY = new Set(['i', 's', 'k', 'h', 'v', 'map', 'tg']);

const queues = { casual: [], ranked: [] };
const users = new Map();    // lowercase name -> client
const pending = new Map();  // lowercase name -> [profile of people who sent a friend request while they were offline]
let online = 0;

const server = http.createServer((req, res) => {
  const url = (req.url || '/').split('?')[0];
  if (url === '/health') { res.writeHead(200, { 'content-type': 'application/json' }); return res.end(JSON.stringify({ ok: true, online })); }
  const rel = url === '/' ? 'index.html' : path.normalize(url).replace(/^([/\\]|\.\.)+/, '');
  const file = path.join(ROOT, rel);
  if (!file.startsWith(ROOT) || !TYPES[path.extname(file)] || path.basename(file) === 'server.js' || path.basename(file) === 'package.json') { res.writeHead(404); return res.end('Not found'); }
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

function unqueue(c) { for (const k in queues) { const i = queues[k].indexOf(c); if (i >= 0) queues[k].splice(i, 1); } }
function unpair(c) { if (c.peer) { const p = c.peer; c.peer = null; p.peer = null; send(p, { t: 'x' }); } }

function drop(c) {
  if (c.closed) return;
  c.closed = true; online--;
  unqueue(c); unpair(c);
  if (c.key && users.get(c.key) === c) users.delete(c.key);
  try { c.sock.destroy(); } catch (e) {}
}

const int = (v, a, b) => Math.min(b, Math.max(a, Number.isFinite(+v) ? Math.floor(+v) : a));
function cleanName(v) { return String(v == null ? '' : v).replace(/[^A-Za-z0-9_ \-]/g, '').trim().slice(0, 14); }
function cleanProf(p, name) { p = p && typeof p === 'object' ? p : {}; return { name, icon: int(p.icon, 0, 511), banner: int(p.banner, 0, 511), lvl: int(p.lvl, 1, 999), rank: int(p.rank, 0, 9999) }; }
function cleanTeam(t) {
  const out = [];
  if (Array.isArray(t)) for (const v of t.slice(0, 3)) if (Number.isInteger(v) && v >= 0 && v < 512) out.push(v);
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
  if (RELAY.has(m.t)) { if (c.peer) send(c.peer, text); return; }
  switch (m.t) {
    case 'hi': return hello(c, m);
    case 'p': return send(c, { t: 'on', n: users.size });
    case 'q': {
      if (c.peer || !c.name) return;
      unqueue(c);
      const q = queues[m.mode === 'ranked' ? 'ranked' : 'casual'];
      c.team = cleanTeam(m.team);
      let other = q.shift();
      while (other && (other.closed || other === c)) other = q.shift();
      if (other) {
        c.peer = other; other.peer = c;
        const stage = Math.floor(Math.random() * 5);
        send(other, { t: 'm', side: 0, stage, opp: { team: c.team, prof: c.prof } });
        send(c, { t: 'm', side: 1, stage, opp: { team: other.team, prof: other.prof } });
      } else q.push(c);
      return;
    }
    case 'uq': return unqueue(c);
    case 'bot': if (c.peer) return; unqueue(c); return send(c, { t: 'botok' });   // only hand out a bot if no player was found
    case 'done': return unpair(c);
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
