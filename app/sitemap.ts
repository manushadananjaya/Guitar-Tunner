import { MetadataRoute } from 'next';
import { TUNER_PAGES } from '@/lib/tunerPages';
import { INSTRUMENT_PAGES } from '@/lib/instrumentPages';
import { INDEXED_CHORDS } from '@/lib/chords/curation';
import { ARTICLES } from '@/lib/articles';
import { TOOL_PAGES } from '@/lib/toolPages';
import { PRINTABLE_SHEETS } from '@/lib/printables';
import { UKE_CHORDS, isUkeChordIndexed } from '@/lib/ukulele/chords';
import { SCALE_PAGES } from '@/lib/music/scalePages';
import {
  HANDWRITTEN_PAGES,
  TRANSLATED_LOCALES,
  TRANSLATED_PAGES,
  languageAlternates,
} from '@/lib/i18n/pages';
import { lastModifiedOf, routeDir } from '@/lib/pageDates';

/** <lastmod> is each page's real last change, from `npm run dates`, never
 *  the build time: a date that changes on every deploy is one search
 *  engines learn to ignore. Pages with no recorded date leave it out. */
const dated = (...paths: string[]) => {
  const lastModified = lastModifiedOf(...paths);
  return lastModified ? { lastModified } : {};
};

/** Source files behind a translated page: its own route when it was written
 *  by hand, otherwise the shared renderer and that language's copy. */
function translatedSources(path: string, locale: string) {
  if (path === `/${locale}`) return [`app/${locale === 'es' ? 'es' : '[lang]'}/page.tsx`];
  if (HANDWRITTEN_PAGES.has(path)) return [`app${path}`];
  return ['components/LocalizedTunerPage.tsx', `lib/i18n/content/${locale}.ts`];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = 'https://www.guitartunepro.com';

  // Both sides of each translated pair list each other, per Google's
  // sitemap hreflang guidance.
  const withAlternates = (path: string) => {
    const languages = languageAlternates(path);
    if (!languages) return {};
    return {
      alternates: {
        languages: Object.fromEntries(
          Object.entries(languages).map(([lang, href]) => [
            lang,
            `${siteUrl}${href === '/' ? '' : href}`,
          ]),
        ),
      },
    };
  };

  const toolPages: MetadataRoute.Sitemap = [
    ...TUNER_PAGES,
    ...INSTRUMENT_PAGES,
  ].map((page) => ({
    url: `${siteUrl}${page.href}`,
    ...dated(routeDir(page.href)),
    changeFrequency: 'monthly',
    priority: 0.9,
    ...withAlternates(page.href),
  }));

  const translatedPages: MetadataRoute.Sitemap = TRANSLATED_LOCALES.flatMap(
    (locale) =>
      TRANSLATED_PAGES.map((page) => ({
        url: `${siteUrl}${page[locale]}`,
        ...dated(...translatedSources(page[locale], locale)),
        changeFrequency: 'monthly' as const,
        priority: page.en === '/' ? 0.9 : 0.8,
        ...withAlternates(page[locale]),
      })),
  );

  return [
    {
      url: siteUrl,
      ...withAlternates('/'),
      ...dated(routeDir('/'), 'components/HomepageContent.tsx'),
      changeFrequency: 'daily',
      priority: 1,
      images: [`${siteUrl}/Logo.png`],
    },
    ...toolPages,
    ...translatedPages,
    ...TOOL_PAGES.map((tool) => ({
      url: `${siteUrl}${tool.href}`,
      ...dated(routeDir(tool.href)),
      changeFrequency: tool.href === '/chords' ? ('weekly' as const) : ('monthly' as const),
      priority: 0.9,
    })),
    ...UKE_CHORDS.filter(isUkeChordIndexed).map((chord) => ({
      url: `${siteUrl}/ukulele-chords/${chord.slug}`,
      ...dated('app/(site)/ukulele-chords/[slug]', 'lib/ukulele'),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...INDEXED_CHORDS.map((chord) => ({
      url: `${siteUrl}/chords/${chord.slug}`,
      ...dated('app/(site)/chords/[slug]', 'lib/chords'),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    {
      url: `${siteUrl}/about`,
      ...dated(routeDir('/about')),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/authors/manusha-dananjaya`,
      ...dated(routeDir('/authors/manusha-dananjaya')),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...['', ...PRINTABLE_SHEETS.map((sheet) => `/${sheet.slug}`)].map((suffix) => ({
      url: `${siteUrl}/printable-guitar-charts${suffix}`,
      ...dated('app/(site)/printable-guitar-charts', 'lib/printables.ts'),
      changeFrequency: 'monthly' as const,
      priority: suffix ? 0.7 : 0.8,
    })),
    {
      url: `${siteUrl}/tunings`,
      ...dated(routeDir('/tunings')),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/tunings/by-artist`,
      ...dated(routeDir('/tunings/by-artist')),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...SCALE_PAGES.map((page) => ({
      url: `${siteUrl}/scales/${page.slug}`,
      ...dated('app/(site)/scales/[slug]', 'lib/music/scalePages.ts'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    {
      url: `${siteUrl}/embed-tuner`,
      ...dated(routeDir('/embed-tuner')),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/accuracy`,
      lastModified: new Date('2026-10-25'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${siteUrl}/privacy-policy`,
      ...dated(routeDir('/privacy-policy')),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${siteUrl}/articles`,
      ...dated('lib/articles.ts', routeDir('/articles')),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...ARTICLES.map((article) => ({
      url: `${siteUrl}/articles/${article.slug}`,
      lastModified: new Date(article.dateModified),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    {
      url: `${siteUrl}/contact`,
      ...dated(routeDir('/contact')),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${siteUrl}/terms-of-service`,
      ...dated(routeDir('/terms-of-service')),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
