/** Last-changed dates for the sitemap, from lib/generated/pageDates.json
 *  (written by `npm run dates` from git history). */

import DATES from '@/lib/generated/pageDates.json';

const ENTRIES = Object.entries(DATES as Record<string, string>).filter(
  // A new share image is not a change to the page's content.
  ([path]) => !path.endsWith('opengraph-image.tsx'),
);

/** The latest date of any file at, or inside, one of `paths` — a route
 *  folder, a content file, a data folder. Undefined when none are known,
 *  so the sitemap omits <lastmod> rather than inventing one. */
export function lastModifiedOf(...paths: string[]): Date | undefined {
  let latest = '';
  for (const [file, date] of ENTRIES) {
    if (paths.some((p) => file === p || file.startsWith(`${p}/`)) && date > latest) latest = date;
  }
  return latest ? new Date(`${latest}T00:00:00Z`) : undefined;
}

/** The route folder of an English page, e.g. "/drop-d-tuner" →
 *  "app/(site)/drop-d-tuner". */
export const routeDir = (href: string) => `app/(site)${href === '/' ? '/page.tsx' : href}`;
