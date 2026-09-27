// Records short vertical clips (1080×1920 MP4) of the essay's own animations,
// for sharing on social media. Frames come from the Chrome DevTools screencast
// with their timestamps; ffmpeg turns them into constant-30fps H.264.
//
// Usage (with the site running, e.g. `npm run build && npm run preview`):
//   node scripts/record-clips.mjs <out-dir> <path-to-ffmpeg> [clip] [base-url]
// Needs Playwright (with Chromium) and an ffmpeg build with libx264.
// Clips: love, stick, laps, rugby, coda. Only the essay's own graphics are
// recorded: no photographs or embedded films.
import { createRequire } from 'module';
import fs from 'fs';
import { execFileSync } from 'child_process';
const require = createRequire(import.meta.url);
let playwright;
try {
  playwright = require('playwright');
} catch {
  playwright = require(require('child_process').execSync('npm root -g').toString().trim() + '/playwright');
}
const { chromium } = playwright;

const OUT = process.argv[2];
const FFMPEG = process.argv[3];
const ONLY = process.argv[4];
const BASE = process.argv[5] || 'http://localhost:3000/';
if (!OUT || !FFMPEG) {
  console.error('Usage: node scripts/record-clips.mjs <out-dir> <path-to-ffmpeg> [clip] [base-url]');
  process.exit(1);
}
fs.mkdirSync(OUT, { recursive: true });

const OVERLAY_CSS = `
  :root, :root:not([data-theme="light"]) { --bar-h: 100px !important; }
  .topbar, .resume, .routebar, .chapter-card__share, .skip-link { display: none !important; }
  html { scroll-behavior: smooth; }
  #rec-top { position: fixed; z-index: 100; inset: 0 0 auto 0; height: 100px; padding: 14px 18px 0;
    background: var(--board); color: var(--board-ink); box-shadow: inset 0 -3px 0 var(--board-edge); }
  #rec-top .k { font: 500 11px "IBM Plex Mono", monospace; letter-spacing: .16em; text-transform: uppercase; color: var(--amber); }
  #rec-top .t { margin-top: 6px; font: italic 400 24px/1.08 "Newsreader Variable", Georgia, serif; }
  #rec-bottom { position: fixed; z-index: 100; inset: auto 0 0 0; padding: 12px 22px 16px; text-align: center;
    background: var(--board); color: var(--board-ink-2); font: 500 13px "IBM Plex Mono", monospace; letter-spacing: .08em; }
  #rec-card { position: fixed; z-index: 200; inset: 0; display: grid; place-content: center; gap: 22px; padding: 40px;
    text-align: center; background: var(--board); color: var(--board-ink); transition: opacity .6s ease; }
  #rec-card.out { opacity: 0; }
  #rec-card .k { font: 500 13px "IBM Plex Mono", monospace; letter-spacing: .16em; text-transform: uppercase; color: var(--amber); }
  #rec-card .t { font: italic 400 40px/1.05 "Newsreader Variable", Georgia, serif; }
  #rec-card .u { font: 500 16px "IBM Plex Mono", monospace; letter-spacing: .06em; color: var(--board-ink-2); }
  #rec-card .p { display: inline-flex; gap: 8px; justify-content: center; }
  #rec-card .p .d { align-self: center; font: 800 44px/1 "Big Shoulders Display Variable", sans-serif; }
  #rec-card .p span:not(.d) { display: grid; place-items: center; width: 52px; height: 72px; background: var(--plate); color: var(--plate-ink);
    font: 800 64px/1 "Big Shoulders Display Variable", sans-serif; box-shadow: 0 3px 0 rgba(0,0,0,.4); }
`;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function setup(page, title) {
  await page.addStyleTag({ content: OVERLAY_CSS });
  await page.evaluate((title) => {
    const top = document.createElement('div');
    top.id = 'rec-top';
    top.innerHTML = '<div class="k">The Archaeology of Sports Scores</div><div class="t"></div>';
    top.querySelector('.t').textContent = title;
    const bottom = document.createElement('div');
    bottom.id = 'rec-bottom';
    bottom.textContent = 'sportscores-history.vercel.app';
    document.body.append(top, bottom);
  }, title);
}

async function card(page, { kicker, title, plates, url }, hold, fade = true) {
  await page.evaluate(({ kicker, title, plates, url }) => {
    document.getElementById('rec-card')?.remove();
    const c = document.createElement('div');
    c.id = 'rec-card';
    const k = document.createElement('div'); k.className = 'k'; k.textContent = kicker;
    c.append(k);
    if (plates) {
      const p = document.createElement('div'); p.className = 'p';
      for (const ch of plates) { const s = document.createElement('span'); s.textContent = ch; if (ch === '–') s.className = 'd'; p.append(s); }
      c.append(p);
    }
    const t = document.createElement('div'); t.className = 't'; t.textContent = title; c.append(t);
    if (url) { const u = document.createElement('div'); u.className = 'u'; u.textContent = url; c.append(u); }
    document.body.append(c);
  }, { kicker, title, plates, url });
  await sleep(hold);
  if (fade) {
    await page.evaluate(() => document.getElementById('rec-card').classList.add('out'));
    await sleep(650);
    await page.evaluate(() => document.getElementById('rec-card')?.remove());
  }
}

// Scroll so an element sits just below the top band, then let the smooth scroll settle.
async function bring(page, selector, offset = 150) {
  await page.evaluate(({ selector, offset }) => {
    const el = document.querySelector(selector);
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: 'instant' });
  }, { selector, offset });
  await sleep(400);
}

async function scrollStep(page, root, i) {
  // On a phone a scrolly step is active in the band 62–74% down the screen.
  await page.evaluate(({ root, i }) => {
    const el = document.querySelector(`${root} .scrolly__step[data-step="${i}"]`);
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top - window.innerHeight * 0.64, behavior: 'smooth' });
  }, { root, i });
}

const END = { kicker: 'Read the whole story', title: 'The Archaeology of Sports Scores', plates: ['3', '0', '–', '0'], url: 'sportscores-history.vercel.app' };

const CLIPS = {
  love: {
    title: 'Why is zero called “love”?',
    async run(page) {
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
      await sleep(300);
      await card(page, { kicker: 'Clip 1 · Tennis', title: 'Why is zero called “love”?' }, 1600);
      const holds = [1800, 2600, 3000, 3200, 5400, 2200, 2800];
      for (let i = 0; i < holds.length; i++) {
        await scrollStep(page, '.scrolly--opening', i);
        await sleep(holds[i]);
      }
    },
  },
  stick: {
    title: 'In early cricket, a score was a cut in a stick',
    async run(page) {
      await bring(page, '#tally-stick', 130);
      await card(page, { kicker: 'Clip 2 · Cricket', title: 'In early cricket, a score was a cut in a stick' }, 1600);
      await page.getByRole('button', { name: 'New stick' }).click();
      await sleep(700);
      for (let i = 0; i < 9; i++) { await page.getByRole('button', { name: 'Cut a notch' }).click(); await sleep(380); }
      for (let i = 0; i < 3; i++) { await page.getByRole('button', { name: 'Cut four' }).click(); await sleep(650); }
      await sleep(600);
      await page.getByRole('button', { name: /Read it as a number/ }).click();
      await sleep(3200);
    },
  },
  laps: {
    title: 'A Roman scoreboard without a single numeral',
    async run(page) {
      await bring(page, '#lap-counter', 120);
      await card(page, { kicker: 'Clip 3 · Chariot racing', title: 'A Roman scoreboard without a single numeral' }, 1600);
      for (let i = 0; i < 7; i++) {
        // Playwright waits until the button is back (enabled, named "Complete a lap") before each click.
        await page.getByRole('button', { name: 'Complete a lap' }).click({ timeout: 10000 });
        await sleep(300);
      }
      await page.getByRole('button', { name: 'Race over' }).waitFor({ timeout: 10000 });
      await sleep(2600);
    },
  },
  rugby: {
    title: 'How rugby made the try worth trying for',
    async run(page) {
      await bring(page, '#rugby-chart', 120);
      await card(page, { kicker: 'Clip 4 · Rugby union', title: 'How rugby made the try worth trying for' }, 1600);
      const years = [];
      for (let y = 1890; y <= 2026; y += 2) years.push(y);
      years.push(2026);
      for (const y of years) {
        await page.evaluate((y) => {
          const r = document.querySelector('#rugby-chart input[type=range]');
          const set = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
          set.call(r, String(y));
          r.dispatchEvent(new Event('input', { bubbles: true }));
        }, y);
        await sleep([1891, 1893, 1948, 1971, 1992].some((k) => Math.abs(k - y) <= 1) ? 900 : 70);
      }
      await sleep(2200);
    },
  },
  coda: {
    title: 'Two cuts in a stick',
    async run(page) {
      await page.evaluate(() => {
        const el = document.querySelector('.scrolly--coda');
        window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 400, behavior: 'instant' });
      });
      await sleep(500);
      await card(page, { kicker: 'Clip 5 · The coda', title: 'What is a score, really?' }, 1600);
      const holds = [2400, 2400, 2600, 2800, 3200];
      for (let i = 0; i < holds.length; i++) {
        await scrollStep(page, '.scrolly--coda', i);
        await sleep(holds[i]);
      }
    },
  },
};

const browser = await chromium.launch();
for (const [name, clip] of Object.entries(CLIPS)) {
  if (ONLY && ONLY !== 'all' && ONLY !== name) continue;
  const ctx = await browser.newContext({ viewport: { width: 432, height: 768 }, deviceScaleFactor: 2.5, reducedMotion: 'no-preference' });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await setup(page, clip.title);
  await sleep(500);

  const dir = `${OUT}/frames-${name}`;
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir);
  const frames = [];
  const cdp = await ctx.newCDPSession(page);
  cdp.on('Page.screencastFrame', async (f) => {
    const file = `${dir}/${String(frames.length).padStart(5, '0')}.jpg`;
    fs.writeFileSync(file, Buffer.from(f.data, 'base64'));
    frames.push({ file, t: f.metadata.timestamp });
    await cdp.send('Page.screencastFrameAck', { sessionId: f.sessionId }).catch(() => {});
  });
  await cdp.send('Page.startScreencast', { format: 'jpeg', quality: 92, maxWidth: 1080, maxHeight: 1920, everyNthFrame: 1 });

  await clip.run(page);
  await card(page, END, 2600, false);
  await sleep(200);
  const tEnd = Date.now() / 1000;
  await cdp.send('Page.stopScreencast');
  await sleep(300);

  // A concat list with each frame shown until the next one arrived.
  const lines = [];
  for (let i = 0; i < frames.length; i++) {
    const next = i + 1 < frames.length ? frames[i + 1].t : Math.max(frames[i].t + 0.04, tEnd);
    lines.push(`file '${frames[i].file}'`, `duration ${Math.max(0.001, next - frames[i].t).toFixed(4)}`);
  }
  lines.push(`file '${frames[frames.length - 1].file}'`);
  fs.writeFileSync(`${dir}/list.txt`, lines.join('\n'));
  const out = `${OUT}/${name}.mp4`;
  execFileSync(FFMPEG, ['-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', `${dir}/list.txt`,
    '-vf', 'fps=30,scale=1080:1920:flags=lanczos,format=yuv420p', '-c:v', 'libx264', '-preset', 'slow', '-crf', '18',
    '-movflags', '+faststart', out]);
  const secs = frames.length ? (tEnd - frames[0].t).toFixed(1) : 0;
  console.log(name, 'frames', frames.length, 'seconds', secs, 'bytes', fs.statSync(out).size);
  fs.rmSync(dir, { recursive: true, force: true });
  await ctx.close();
}
await browser.close();
