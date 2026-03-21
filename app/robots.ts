import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/private'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
    ],
    host: 'https://guitar-tuner.app',
    sitemap: 'https://guitar-tuner.app/sitemap.xml',
  };
}
