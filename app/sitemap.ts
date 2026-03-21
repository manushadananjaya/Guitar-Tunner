import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: 'https://guitar-tuner.app',
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1,
      images: ['https://guitar-tuner.app/placeholder-logo.png'],
    },
  ];
}
