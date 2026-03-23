import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const siteUrl = 'https://guitar-tuner.app';

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1,
      images: [`${siteUrl}/Logo.png`],
    },
    {
      url: `${siteUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
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
      images: ['https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=1200&q=80'],
    },
    {
      url: `${siteUrl}/articles/how-to-tune-a-guitar-for-beginners`,
      lastModified: new Date('2025-03-01'),
      changeFrequency: 'monthly',
      priority: 0.85,
      images: ['https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=1200&q=80'],
    },
    {
      url: `${siteUrl}/articles/standard-tuning-explained`,
      lastModified: new Date('2025-03-01'),
      changeFrequency: 'monthly',
      priority: 0.8,
      images: ['https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=1200&q=80'],
    },
    {
      url: `${siteUrl}/articles/why-your-guitar-goes-out-of-tune`,
      lastModified: new Date('2025-03-01'),
      changeFrequency: 'monthly',
      priority: 0.8,
      images: ['https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=1200&q=80'],
    },
    {
      url: `${siteUrl}/articles/best-guitar-strings-for-tuning-stability`,
      lastModified: new Date('2025-03-01'),
      changeFrequency: 'monthly',
      priority: 0.8,
      images: ['https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&q=80'],
    },
    {
      url: `${siteUrl}/articles/how-to-use-a-chromatic-tuner`,
      lastModified: new Date('2025-03-01'),
      changeFrequency: 'monthly',
      priority: 0.8,
      images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80'],
    },
    {
      url: `${siteUrl}/articles/alternate-guitar-tunings`,
      lastModified: new Date('2025-03-01'),
      changeFrequency: 'monthly',
      priority: 0.8,
      images: ['https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=1200&q=80'],
    },
    {
      url: `${siteUrl}/articles/how-to-tune-a-guitar-by-ear`,
      lastModified: new Date('2025-03-01'),
      changeFrequency: 'monthly',
      priority: 0.8,
      images: ['https://images.unsplash.com/photo-1605020420620-20c943cc4669?w=1200&q=80'],
    },
    {
      url: `${siteUrl}/articles/acoustic-vs-electric-guitar-tuning`,
      lastModified: new Date('2025-03-01'),
      changeFrequency: 'monthly',
      priority: 0.8,
      images: ['https://images.unsplash.com/photo-1501612780327-45045538702b?w=1200&q=80'],
    },
    {
      url: `${siteUrl}/articles/how-temperature-and-humidity-affect-guitar-tuning`,
      lastModified: new Date('2025-03-01'),
      changeFrequency: 'monthly',
      priority: 0.8,
      images: ['https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=1200&q=80'],
    },
    {
      url: `${siteUrl}/articles/does-a-capo-affect-guitar-tuning`,
      lastModified: new Date('2025-03-01'),
      changeFrequency: 'monthly',
      priority: 0.8,
      images: ['https://images.unsplash.com/photo-1557935728-e6d1eaabe558?w=1200&q=80'],
    },
    {
      url: `${siteUrl}/articles/how-to-intonate-your-guitar`,
      lastModified: new Date('2025-03-01'),
      changeFrequency: 'monthly',
      priority: 0.8,
      images: ['https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?w=1200&q=80'],
    },
    {
      url: `${siteUrl}/articles/drop-d-tuning-guide`,
      lastModified: new Date('2025-03-01'),
      changeFrequency: 'monthly',
      priority: 0.8,
      images: ['https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=80'],
    },
  ];
}
