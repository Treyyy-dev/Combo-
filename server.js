// Combo game server: serves the game and pairs players for online matches.
// No dependencies: plain Node http + a small WebSocket implementation.
const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = process.env.PORT || 10000;
const ROOT = __dirname;
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.svg': 'image/svg+xml', '.json': 'application/json' };
const MAX_MSG = 16 * 1024;
const RELAY = new Set(['i', 's', 'k']);

const queues = { casual: [], ranked: [] };
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
  if (c.closed) return;
  const data = Buffer.from(typeof obj === 'string' ? obj : JSON.stringify(obj));
  const n = data.length;
  let head;
  if (n < 126) head = Buffer.from([0x81, n]);
  else if (n < 65536) { head = Buffer.alloc(4); head[0] = 0x81; head[1] = 126; head.writeUInt16BE(n, 2); }
  else { head = Buffer.alloc(10); head[0] = 0x81; head[1] = 127; head.writeBigUInt64BE(BigInt(n), 2); }
  try { c.sock.write(Buffer.concat([head, data])); } catch (e) { drop(c); }
}

function unqueue(c) { for (const k in queues) { const i = queues[k].indexOf(c); if (i >= 0) queues[k].splice(i, 1); } }

function drop(c) {
  if (c.closed) return;
  c.closed = true; online--;
  unqueue(c);
  if (c.peer) { const p = c.peer; c.peer = null; p.peer = null; send(p, { t: 'x' }); }
  try { c.sock.destroy(); } catch (e) {}
}

function cleanTeam(t) {
  const out = [];
  if (Array.isArray(t)) for (const v of t.slice(0, 3)) if (Number.isInteger(v) && v >= 0 && v < 64) out.push(v);
  while (out.length < 3) out.push(out.length);
  return out;
}

function onMessage(c, text) {
  let m;
  try { m = JSON.parse(text); } catch (e) { return; }
  if (!m || typeof m !== 'object') return;
  if (m.t === 'q') {
    if (c.peer) return;
    unqueue(c);
    const q = queues[m.mode === 'ranked' ? 'ranked' : 'casual'];
    c.team = cleanTeam(m.team);
    const other = q.shift();
    if (other && !other.closed && other !== c) {
      c.peer = other; other.peer = c;
      const stage = Math.floor(Math.random() * 5);
      send(other, { t: 'm', side: 0, stage, opp: { team: c.team } });
      send(c, { t: 'm', side: 1, stage, opp: { team: other.team } });
    } else q.push(c);
  } else if (RELAY.has(m.t) && c.peer) {
    send(c.peer, text);
  }
}

server.on('upgrade', (req, sock) => {
  const key = req.headers['sec-websocket-key'];
  if (!key || (req.headers.upgrade || '').toLowerCase() !== 'websocket') return sock.destroy();
  const accept = crypto.createHash('sha1').update(key + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11').digest('base64');
  sock.write('HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Accept: ' + accept + '\r\n\r\n');
  sock.setNoDelay(true);
  const c = { sock, buf: Buffer.alloc(0), peer: null, closed: false, team: [0, 1, 2] };
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
