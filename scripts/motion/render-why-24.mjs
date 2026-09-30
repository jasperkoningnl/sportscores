// Renders "Why 24?" (why-24.html), a vertical motion graphic of chapter 12, to
// MP4 with its synthesised sound. Every frame is drawn by render(t) in the page,
// so the output is identical on every run, whatever the machine's speed.
//
// Usage (after `npm install`; needs Playwright with Chromium and an ffmpeg with libx264):
//   node scripts/motion/render-why-24.mjs <out-dir> <path-to-ffmpeg> video  <en|nl> [fps]
//   node scripts/motion/render-why-24.mjs <out-dir> <path-to-ffmpeg> stills <en|nl> <t1,t2,…>
import http from 'http';
import fs from 'fs';
import path from 'path';
import { spawn, execSync } from 'child_process';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
let playwright;
try {
  playwright = require('playwright');
} catch {
  playwright = require(execSync('npm root -g').toString().trim() + '/playwright');
}
const { chromium } = playwright;

// the page loads its fonts from the repository's node_modules, so serve the repository root
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const [OUT, FFMPEG, mode, lang = 'en', arg] = process.argv.slice(2);
if (!OUT || !FFMPEG || !['video', 'stills'].includes(mode)) {
  console.error('Usage: node scripts/motion/render-why-24.mjs <out-dir> <path-to-ffmpeg> <video|stills> [en|nl] [fps | t1,t2,…]');
  process.exit(1);
}

const types = { '.html': 'text/html', '.woff2': 'font/woff2', '.js': 'text/javascript' };
const server = http.createServer((req, res) => {
  const p = path.join(ROOT, decodeURIComponent(req.url.split('?')[0]));
  if (!p.startsWith(ROOT) || !fs.existsSync(p)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'content-type': types[path.extname(p)] || 'application/octet-stream' });
  fs.createReadStream(p).pipe(res);
}).listen(0);
const port = server.address().port;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
page.on('console', (m) => console.log('[page]', m.text()));
page.on('pageerror', (e) => console.error('[page error]', e));
await page.goto(`http://localhost:${port}/scripts/motion/why-24.html`);
await page.evaluate(() => window.ready);
await page.addStyleTag({ content: 'canvas{width:1080px!important;height:1920px!important}' });

const grab = async (t) => {
  const url = await page.evaluate(([t, lang]) => { window.render(t, lang); return document.getElementById('c').toDataURL('image/png'); }, [t, lang]);
  return Buffer.from(url.split(',')[1], 'base64');
};

if (mode === 'stills') {
  fs.mkdirSync(OUT, { recursive: true });
  for (const t of arg.split(',').map(Number)) fs.writeFileSync(path.join(OUT, `why-24-${lang}-${t}.png`), await grab(t));
} else {
  const fps = Number(arg || 30);
  const total = await page.evaluate(() => window.TOTAL);
  const cues = await page.evaluate((lang) => window.cues(lang), lang);
  fs.mkdirSync(OUT, { recursive: true });
  const wav = path.join(OUT, `why-24-${lang}.wav`);
  fs.writeFileSync(wav, synth(cues, total));
  const out = path.join(OUT, `why-24-${lang}.mp4`);
  const ff = spawn(FFMPEG, ['-y', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'png', '-i', '-', '-i', wav,
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-pix_fmt', 'yuv420p', '-profile:v', 'high',
    '-c:a', 'aac', '-b:a', '192k', '-shortest', '-movflags', '+faststart', out], { stdio: ['pipe', 'inherit', 'inherit'] });
  const n = Math.round(total * fps);
  for (let f = 0; f < n; f++) {
    const buf = await grab(f / fps);
    if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r));
    if (f % 150 === 0) console.log(`frame ${f}/${n}`);
  }
  ff.stdin.end();
  await new Promise((r) => ff.on('close', r));
  console.log('wrote', out);
}
await browser.close();
server.close();

// ---------- sound design: everything synthesised, no samples ----------
function synth(cues, total) {
  const SR = 48000, n = Math.ceil((total + 0.5) * SR);
  const L = new Float32Array(n), R = new Float32Array(n);
  let seed = 12345;
  const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296) * 2 - 1;
  const put = (i, v, pan = 0) => { if (i >= 0 && i < n) { L[i] += v * (1 - pan) ; R[i] += v * (1 + pan); } };

  // bed: a low drone with a slow swell, a fifth above, and a quiet pulse
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const env = Math.min(1, t / 3) * Math.min(1, Math.max(0, (total - t) / 3));
    const lfo = 0.6 + 0.4 * Math.sin(2 * Math.PI * 0.07 * t);
    const tension = 1 + 0.6 * Math.max(0, Math.min(1, (t - 22) / 18)) * (t < 41.5 ? 1 : 0);
    const v = 0.05 * env * lfo * tension * (Math.sin(2 * Math.PI * 55 * t) + 0.5 * Math.sin(2 * Math.PI * 82.4 * t + 0.3) + 0.25 * Math.sin(2 * Math.PI * 110.2 * t));
    L[i] += v; R[i] += v;
  }
  for (const c of cues) {
    const i0 = Math.round(c.t * SR), v = c.v;
    switch (c.type) {
      case 'click': { // a flap turning over
        let lp = 0;
        for (let k = 0; k < SR * 0.03; k++) { const e = Math.exp(-k / (SR * 0.004)); lp += (rnd() - lp) * 0.5; put(i0 + k, 0.25 * v * e * lp, 0.2); }
        break;
      }
      case 'tick': {
        for (let k = 0; k < SR * 0.02; k++) { const e = Math.exp(-k / (SR * 0.003)); put(i0 + k, 0.18 * v * e * Math.sin(2 * Math.PI * 2200 * k / SR), -0.3); }
        break;
      }
      case 'thump': { // ball on hardwood
        for (let k = 0; k < SR * 0.25; k++) { const t = k / SR; const f = 65 + 90 * Math.exp(-t * 40); const e = Math.exp(-t * 22); put(i0 + k, 0.55 * v * e * Math.sin(2 * Math.PI * f * t) + 0.08 * v * Math.exp(-t * 200) * rnd()); }
        break;
      }
      case 'hit': {
        for (let k = 0; k < SR * 0.9; k++) { const t = k / SR; const e = Math.exp(-t * 6); put(i0 + k, 0.45 * v * e * Math.sin(2 * Math.PI * (48 + 40 * Math.exp(-t * 30)) * t) + 0.06 * v * Math.exp(-t * 60) * rnd()); }
        break;
      }
      case 'boom': {
        for (let k = 0; k < SR * 2.2; k++) { const t = k / SR; const e = Math.exp(-t * 2.2); put(i0 + k, 0.5 * v * e * Math.sin(2 * Math.PI * (38 + 30 * Math.exp(-t * 8)) * t)); }
        let lp = 0; for (let k = 0; k < SR * 1.2; k++) { const t = k / SR; lp += (rnd() - lp) * 0.05; put(i0 + k, 0.35 * v * Math.exp(-t * 3) * lp); }
        break;
      }
      case 'beep': { // shot-clock beep
        const d = SR * 0.09;
        for (let k = 0; k < d; k++) { const e = Math.min(1, k / 200) * Math.min(1, (d - k) / 400); put(i0 + k, 0.12 * v * e * (Math.sin(2 * Math.PI * 1320 * k / SR) + 0.3 * Math.sin(2 * Math.PI * 2640 * k / SR)), 0.1); }
        break;
      }
      case 'buzzer': {
        const d = SR * 1.1;
        for (let k = 0; k < d; k++) {
          const t = k / SR, e = Math.min(1, k / 300) * Math.min(1, (d - k) / 2000);
          let s = 0; for (const f of [196, 207.6, 392]) s += Math.sign(Math.sin(2 * Math.PI * f * t)) * 0.33;
          put(i0 + k, 0.2 * v * e * s);
        }
        break;
      }
      case 'swell': case 'riser': case 'whoosh': {
        const d = SR * (c.type === 'riser' ? 2.3 : c.type === 'whoosh' ? 1.8 : 1.2);
        let lp = 0, lp2 = 0;
        for (let k = 0; k < d; k++) {
          const x = k / d;
          const env = c.type === 'riser' ? x * x : Math.sin(Math.PI * x);
          const cut = c.type === 'riser' ? 0.01 + 0.2 * x : 0.03 + 0.08 * Math.sin(Math.PI * x);
          lp += (rnd() - lp) * cut; lp2 += (lp - lp2) * cut;
          put(i0 + k, 0.5 * v * env * lp2, Math.sin(Math.PI * 2 * x) * 0.4);
          if (c.type === 'riser') put(i0 + k, 0.05 * v * env * Math.sin(2 * Math.PI * (110 + 330 * x * x) * k / SR));
        }
        break;
      }
    }
  }
  // gentle limiter and 16-bit stereo WAV
  let peak = 0; for (let i = 0; i < n; i++) peak = Math.max(peak, Math.abs(L[i]), Math.abs(R[i]));
  const g = peak > 0.89 ? 0.89 / peak : 1;
  const buf = Buffer.alloc(44 + n * 4);
  buf.write('RIFF', 0); buf.writeUInt32LE(36 + n * 4, 4); buf.write('WAVE', 8); buf.write('fmt ', 12);
  buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22); buf.writeUInt32LE(SR, 24);
  buf.writeUInt32LE(SR * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34); buf.write('data', 36); buf.writeUInt32LE(n * 4, 40);
  for (let i = 0; i < n; i++) {
    buf.writeInt16LE(Math.round(Math.tanh(L[i] * g * 1.1) * 32000), 44 + i * 4);
    buf.writeInt16LE(Math.round(Math.tanh(R[i] * g * 1.1) * 32000), 46 + i * 4);
  }
  return buf;
}
