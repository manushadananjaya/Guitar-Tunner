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
    host: 'https://www.guitartunepro.com',
    sitemap: 'https://www.guitartunepro.com/sitemap.xml',
  };
}
