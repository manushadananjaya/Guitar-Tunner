import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Guitar Tuner - Free Online Pitch Detection Tool',
  description: 'Professional guitar tuner with real-time pitch detection. Supports 6-string, 7-string, 12-string guitars, bass, and ukulele. Multiple tuning modes including Standard, Drop D, Open G, and more. Works on any device with a microphone.',
  generator: 'v0.app',
  keywords: 'guitar tuner, online tuner, pitch detector, music tuner, free tuner, acoustic guitar, electric guitar',
  authors: [{ name: 'Guitar Tuner App' }],
  openGraph: {
    title: 'Guitar Tuner - Free Online Pitch Detection',
    description: 'Professional guitar tuner with real-time pitch detection. Supports multiple instruments and tuning modes.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Guitar Tuner - Free Online Pitch Detection',
    description: 'Professional guitar tuner with real-time pitch detection.',
  },
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'Guitar Tuner',
    'description': 'Professional guitar tuner with real-time pitch detection. Free online tuning tool supporting multiple instruments and tuning modes.',
    'url': 'https://guitar-tuner.app',
    'applicationCategory': 'UtilityApplication',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    },
    'operatingSystem': 'Web',
    'browserRequirements': 'Requires modern browser with Web Audio API support'
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
