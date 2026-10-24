/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // Share images read their fonts from disk. The page cards are rendered at
  // build time; the streak card is rendered per request, so its function
  // needs the font files deployed alongside it.
  outputFileTracingIncludes: {
    '/share/streak/image': ['./lib/og/fonts/*.ttf'],
  },
  experimental: {
    // A styled 404 for URLs matching no route. Needed because the site has
    // several root layouts (one per <html lang>), so there is no single
    // layout for Next to render its default 404 inside.
    globalNotFound: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
