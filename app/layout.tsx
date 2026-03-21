import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
const siteUrl = "https://guitar-tuner.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "GuitarTunePro | Free Online Guitar Tuner",
    template: "%s | GuitarTunePro",
  },
  description:
    "Professional guitar tuner with real-time pitch detection. Supports 6-string, 7-string, 12-string guitars, bass, and ukulele. Multiple tuning modes including Standard, Drop D, Open G, and more. Works on any device with a microphone.",
  applicationName: "GuitarTunePro",
  generator: "v0.app",
  category: "music",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "guitar tuner",
    "online guitar tuner",
    "free guitar tuner",
    "guitar pitch detector",
    "bass tuner",
    "ukulele tuner",
    "drop d tuning",
    "real-time tuner",
  ],
  authors: [{ name: "GuitarTunePro" }],
  openGraph: {
    title: "GuitarTunePro | Free Online Guitar Tuner",
    description:
      "Professional guitar tuner with real-time pitch detection. Supports multiple instruments and tuning modes.",
    type: "website",
    url: siteUrl,
    siteName: "GuitarTunePro",
    locale: "en_US",
    images: [
      {
        url: "/Logo.png",
        width: 1200,
        height: 630,
        alt: "GuitarTunePro online guitar tuner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GuitarTunePro | Free Online Guitar Tuner",
    description: "Professional guitar tuner with real-time pitch detection.",
    images: ["/Logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      {
        url: "/Logo.png",
        type: "image/png",
      },
      {
        url: "/favicon.ico",
      },
    ],
    apple: "/Logo.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "GuitarTunePro",
    description:
      "Professional guitar tuner with real-time pitch detection. Free online tuning tool supporting multiple instruments and tuning modes.",
    url: siteUrl,
    applicationCategory: "UtilityApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    operatingSystem: "Web",
    browserRequirements: "Requires modern browser with Web Audio API support",
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
