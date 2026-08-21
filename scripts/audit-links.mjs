/** Internal link graph: orphans, dead ends, inbound counts, click depth.
 *  Needs: npm run build && npm run start, then: npm run audit:links
 */
const sitemap = await (await fetch('http://localhost:3000/sitemap.xml')).text();
const routes = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map(m => m[1].replace(/^https?:\/\/[^/]+/, '') || '/'));
const inbound = new Map([...routes].map(r=>[r,new Set()]));
const outCount = new Map();

for (const r of routes) {
  const h = await (await fetch('http://localhost:3000'+r)).text();
  const hrefs = [...h.matchAll(/href="(\/[^"#?]*)"/g)].map(m=>m[1]);
  let n=0;
  for (let href of hrefs) {
    if (href.length>1 && href.endsWith('/')) href = href.slice(0,-1);
    if (routes.has(href) && href !== r) { inbound.get(href).add(r); n++; }
  }
  outCount.set(r, n);
}

const orphans = [...inbound].filter(([r,s]) => s.size===0 && r!=='/');
console.log('pages crawled       :', routes.size);
console.log('ORPHANS (0 inbound) :', orphans.length);
orphans.slice(0,15).forEach(([r])=>console.log('   ', r));

const thin = [...inbound].filter(([r,s])=>s.size>0 && s.size<2 && r!=='/');
console.log('\nonly 1 inbound link :', thin.length);
thin.slice(0,10).forEach(([r,s])=>console.log('   ', r, '←', [...s][0]));

const noOut = [...outCount].filter(([,n])=>n===0);
console.log('\ndead-end pages (0 internal links out):', noOut.length);
noOut.slice(0,8).forEach(([r])=>console.log('   ', r));

// depth from homepage
const depth=new Map([['/',0]]); let frontier=['/'];
while(frontier.length){
  const next=[];
  for(const cur of frontier) for(const [r,s] of inbound)
    if(s.has(cur)&&!depth.has(r)){depth.set(r,depth.get(cur)+1);next.push(r);}
  frontier=next;
}
const unreachable=[...routes].filter(r=>!depth.has(r));
const byDepth={};[...depth.values()].forEach(d=>byDepth[d]=(byDepth[d]||0)+1);
console.log('\nclick depth from homepage:', JSON.stringify(byDepth));
console.log('unreachable from homepage:', unreachable.length, unreachable.slice(0,6).join(' '));
