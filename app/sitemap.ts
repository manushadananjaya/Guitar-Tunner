import { MetadataRoute } from 'next';
import { TUNER_PAGES } from '@/lib/tunerPages';
import { INSTRUMENT_PAGES } from '@/lib/instrumentPages';
import { INDEXED_CHORDS } from '@/lib/chords/curation';
import { ARTICLES } from '@/lib/articles';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const siteUrl = 'https://www.guitartunepro.com';

  const toolPages: MetadataRoute.Sitemap = [
    ...TUNER_PAGES,
    ...INSTRUMENT_PAGES,
  ].map((page) => ({
    url: `${siteUrl}${page.href}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1,
      images: [`${siteUrl}/Logo.png`],
    },
    ...toolPages,
    {
      url: `${siteUrl}/metronome`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/chords`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...INDEXED_CHORDS.map((chord) => ({
      url: `${siteUrl}/chords/${chord.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    {
      url: `${siteUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/authors/manusha-dananjaya`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${siteUrl}/accuracy`,
      lastModified: new Date('2026-08-23'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${siteUrl}/privacy-policy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${siteUrl}/articles`,
      lastModified: now,
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
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${siteUrl}/terms-of-service`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
