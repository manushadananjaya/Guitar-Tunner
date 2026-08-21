/** WCAG AA contrast audit across both themes.
 *  Requires the production server running: npm run build && npm run start
 *  Then: npm run audit:contrast
 *
 *  Colours are resolved through a canvas rather than parsed: Tailwind v4
 *  emits oklab()/lab()/color-mix(), which a regex silently mangles into
 *  near-black and produces a page full of false failures.
 */
import { chromium } from 'playwright';

// Resolve colours via canvas: Tailwind v4 emits oklab()/lab()/color-mix(),
// which a regex cannot parse. Canvas fillStyle understands all of them and
// getImageData hands back plain sRGB + alpha.
const AUDIT = `(() => {
  const cv = document.createElement('canvas'); cv.width = cv.height = 1;
  const cx = cv.getContext('2d', { willReadFrequently: true });
  const cache = new Map();
  function rgba(str) {
    if (cache.has(str)) return cache.get(str);
    cx.clearRect(0,0,1,1);
    cx.fillStyle = '#000';
    try { cx.fillStyle = str; } catch { cache.set(str,null); return null; }
    cx.clearRect(0,0,1,1); cx.fillRect(0,0,1,1);
    const d = cx.getImageData(0,0,1,1).data;
    const v = [d[0], d[1], d[2], d[3]/255];
    cache.set(str, v); return v;
  }
  const srgb = c => { c/=255; return c<=0.03928 ? c/12.92 : Math.pow((c+0.055)/1.055,2.4); };
  const lum = ([r,g,b]) => 0.2126*srgb(r)+0.7152*srgb(g)+0.0722*srgb(b);
  const over = (fg, bg, a) => [0,1,2].map(i => fg[i]*a + bg[i]*(1-a));

  function effectiveBg(el) {
    const layers = [];
    let node = el;
    while (node) {
      const c = rgba(getComputedStyle(node).backgroundColor);
      if (c && c[3] > 0) { layers.push(c); if (c[3] >= 0.999) break; }
      node = node.parentElement;
    }
    let base = [255,255,255];
    for (let i = layers.length - 1; i >= 0; i--) base = over(layers[i], base, layers[i][3]);
    return base;
  }

  const out = [], seen = new Set();
  for (const el of document.querySelectorAll('p,span,a,h1,h2,h3,h4,li,button,td,th,div,summary,label')) {
    const txt = [...el.childNodes].filter(n=>n.nodeType===3).map(n=>n.textContent.trim()).join('').trim();
    if (!txt || txt.length < 2) continue;
    const r = el.getBoundingClientRect();
    if (r.width < 4 || r.height < 4) continue;
    const cs = getComputedStyle(el);
    if (cs.visibility==='hidden'||cs.display==='none'||Number(cs.opacity)<0.3) continue;
    const fg = rgba(cs.color);
    if (!fg || fg[3] < 0.5) continue;            // gradient/clipped text: skip
    if (/[\\u{1F300}-\\u{1FAFF}\\u{2600}-\\u{27BF}]/u.test(txt)) continue; // emoji aren't text
    const bg = effectiveBg(el);
    const fgc = fg[3] < 1 ? over(fg, bg, fg[3]) : fg;
    const L1 = lum(fgc), L2 = lum(bg);
    const ratio = (Math.max(L1,L2)+0.05)/(Math.min(L1,L2)+0.05);
    const size = parseFloat(cs.fontSize), bold = Number(cs.fontWeight) >= 700;
    const need = (size >= 24 || (bold && size >= 18.66)) ? 3 : 4.5;
    const key = cs.color+'|'+bg.map(Math.round).join(',')+'|'+Math.round(size)+'|'+need;
    if (seen.has(key)) continue; seen.add(key);
    if (ratio < need) out.push({ ratio:+ratio.toFixed(2), need, size:Math.round(size),
      fg:'rgb('+fgc.map(Math.round).join(',')+')', bg:'rgb('+bg.map(Math.round).join(',')+')',
      sample:txt.slice(0,38), cls:(el.getAttribute('class')||'').slice(0,60) });
  }
  return out.sort((a,b)=>a.ratio-b.ratio);
})()`;

const b = await chromium.launch();
const pages = ['/', '/chords/c', '/articles/drop-d-tuning-guide', '/metronome', '/drop-d-tuner'];
for (const theme of ['dark','light']) {
  console.log(`\n═══ ${theme.toUpperCase()} ═══`);
  const ctx = await b.newContext({ viewport:{width:1280,height:1000} });
  const p = await ctx.newPage();
  await p.goto('http://localhost:3000/');
  await p.evaluate(t=>localStorage.setItem('theme',t), theme);
  let total = 0;
  for (const url of pages) {
    await p.goto('http://localhost:3000'+url, {waitUntil:'networkidle'});
    await p.waitForTimeout(400);
    const fails = await p.evaluate(AUDIT);
    total += fails.length;
    if (!fails.length) { console.log(`  ${url.padEnd(34)} ok`); continue; }
    console.log(`  ${url}`);
    for (const f of fails.slice(0,8))
      console.log(`     ${String(f.ratio).padStart(5)}/${f.need}  ${String(f.size).padStart(2)}px  ${f.fg} on ${f.bg}  "${f.sample}"  .${f.cls.split(' ').find(c=>/text-|bg-/.test(c))||''}`);
    if (fails.length>8) console.log(`     … ${fails.length-8} more`);
  }
  console.log(`  TOTAL FAILURES: ${total}`);
  await ctx.close();
}
await b.close();
