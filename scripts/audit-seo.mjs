/** SEO audit: titles, descriptions, canonicals, H1s, JSON-LD, duplicates.
 *  Needs: npm run build && npm run start, then: npm run audit:seo
 */
const sitemap = await (await fetch('http://localhost:3000/sitemap.xml')).text();
const routes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map(m => m[1].replace(/^https?:\/\/[^/]+/, '') || '/');
const BASE='http://localhost:3000';
const get = async u => (await fetch(BASE+u)).text();

const pick = (h,re) => { const m = h.match(re); return m ? m[1].trim() : null; };
const rows = [];
for (const r of routes) {
  const h = await get(r);
  const title = pick(h,/<title>([^<]*)<\/title>/);
  const desc  = pick(h,/<meta name="description" content="([^"]*)"/);
  const canon = pick(h,/<link rel="canonical" href="([^"]*)"/);
  const h1s   = [...h.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map(m=>m[1].replace(/<[^>]+>/g,'').trim());
  const og    = pick(h,/<meta property="og:title" content="([^"]*)"/);
  const ld    = [...h.matchAll(/type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
  let ldTypes=[], ldBad=0;
  for (const j of ld) { try { const o=JSON.parse(j.replace(/&quot;/g,'"')); ldTypes.push(o['@type']); } catch { ldBad++; } }
  rows.push({ r, title, desc, canon, h1s, og, ldTypes, ldBad,
              tLen:(title||'').length, dLen:(desc||'').length });
}

const bad = {
  noTitle: rows.filter(x=>!x.title),
  noDesc: rows.filter(x=>!x.desc),
  noCanon: rows.filter(x=>!x.canon),
  h1count: rows.filter(x=>x.h1s.length!==1),
  emptyH1: rows.filter(x=>x.h1s.length===1 && x.h1s[0].length<3),
  longTitle: rows.filter(x=>x.tLen>62),
  shortTitle: rows.filter(x=>x.tLen>0 && x.tLen<25),
  longDesc: rows.filter(x=>x.dLen>165),
  shortDesc: rows.filter(x=>x.dLen>0 && x.dLen<70),
  ldBad: rows.filter(x=>x.ldBad>0),
};
const dupe = (key) => {
  const m=new Map(); rows.forEach(x=>{ const v=x[key]; if(!v) return; m.set(v,(m.get(v)||[]).concat(x.r)); });
  return [...m.entries()].filter(([,v])=>v.length>1);
};

console.log(`audited ${rows.length} pages\n`);
for (const [k,v] of Object.entries(bad)) {
  console.log(`${k.padEnd(12)} ${v.length}`);
  v.slice(0,5).forEach(x=>console.log(`    ${x.r}  ${k.includes('Title')?`(${x.tLen}) ${x.title}`:k.includes('Desc')?`(${x.dLen})`:k.includes('h1')?JSON.stringify(x.h1s):''}`));
  if (v.length>5) console.log(`    … ${v.length-5} more`);
}
console.log(`\nduplicate titles      : ${dupe('title').length}`);
dupe('title').slice(0,4).forEach(([t,u])=>console.log(`    "${t.slice(0,55)}" × ${u.length}  ${u.slice(0,3).join(' ')}`));
console.log(`duplicate descriptions: ${dupe('desc').length}`);
dupe('desc').slice(0,4).forEach(([t,u])=>console.log(`    "${t.slice(0,55)}…" × ${u.length}  ${u.slice(0,3).join(' ')}`));
console.log(`duplicate canonicals  : ${dupe('canon').length}`);
dupe('canon').slice(0,4).forEach(([t,u])=>console.log(`    ${t} × ${u.length}  ${u.slice(0,3).join(' ')}`));
