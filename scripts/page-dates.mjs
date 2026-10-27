/** Records when each source file last changed, for the sitemap's <lastmod>.
 *
 *  Run before committing page changes: npm run dates
 *
 *  A lastmod that is always "now" teaches search engines to ignore it, so
 *  the sitemap uses these dates instead. They come from git history — the
 *  date of the last commit touching each file — and files with uncommitted
 *  changes get today's date, since they are about to be committed. The
 *  output is committed too: deploys clone shallow, so git history is not
 *  available at build time. */
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';

const ROOTS = ['app', 'lib', 'components'];
const OUT = 'lib/generated/pageDates.json';
const git = (...args) =>
  execFileSync('git', ['-c', 'core.quotePath=false', ...args], { encoding: 'utf8', maxBuffer: 1 << 28 });

const dates = new Map();

// Newest commits come first, so the first date seen for a file is its latest.
let current;
for (const line of git('log', '--format=@%cs', '--name-only', '--', ...ROOTS).split('\n')) {
  if (line.startsWith('@')) current = line.slice(1);
  else if (line && !dates.has(line)) dates.set(line, current);
}

// Local date, to match git's %cs, which is in the committer's time zone.
const now = new Date();
const pad = (n) => String(n).padStart(2, '0');
const today = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
for (const line of git('status', '--porcelain', '--untracked-files=all', '--', ...ROOTS).split('\n')) {
  if (!line) continue;
  const path = line.slice(3).split(' -> ').pop().replace(/^"|"$/g, '');
  dates.set(path, today);
}

const out = Object.fromEntries(
  [...dates.entries()]
    .filter(([path]) => path !== OUT && existsSync(path))
    .sort(([a], [b]) => a.localeCompare(b)),
);
const json = `${JSON.stringify(out, null, 1)}\n`;
const previous = existsSync(OUT) ? readFileSync(OUT, 'utf8') : '';
if (json !== previous) writeFileSync(OUT, json);
console.log(`${Object.keys(out).length} files dated${json === previous ? ' (unchanged)' : ''} → ${OUT}`);
