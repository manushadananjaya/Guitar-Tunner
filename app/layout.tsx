import type { Metadata, Viewport } from "next";
import { Inter, Lora, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import { Navbar } from "@/components/Navbar";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});
const siteUrl = "https://www.guitartunepro.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "GuitarTunePro | Free Online High Accuracy Guitar Tuner",
    template: "%s | GuitarTunePro",
  },
  description:
    "Professional guitar tuner with real-time pitch detection and high accuracy. Supports 6-string, 7-string, 12-string guitars, bass, and ukulele. Multiple tuning modes including Standard, Drop D, Open G, and more. Works on any device with a microphone.",
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
    title: "GuitarTunePro | Free Online High Accuracy Guitar Tuner",
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
    title: "GuitarTunePro | Free Online High Accuracy Guitar Tuner",
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
  other: {
    "google-adsense-account": "ca-pub-3345965156522280",
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
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "GuitarTunePro",
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/Logo.png`,
      width: 512,
      height: 512,
    },
    sameAs: ["https://www.guitartunepro.com"],
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: "GuitarTunePro",
    url: siteUrl,
    publisher: { "@id": `${siteUrl}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/articles?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "GuitarTunePro",
    description:
      "Free online chromatic guitar tuner with high accuracy pitch detection. Tune your guitar with a microphone on any device — no download required. Supports standard, drop D, open G, and 10+ tuning presets.",
    url: siteUrl,
    applicationCategory: "MusicApplication",
    operatingSystem: "Web",
    browserRequirements: "Requires modern browser with Web Audio API support",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Real-time chromatic pitch detection",
      "6-string, 7-string, 12-string, bass, and ukulele support",
      "Standard, Drop D, Open G, Open D, Half-Step Down, and 10+ tuning presets",
      "Auto string detection",
      "±1 cent accuracy",
      "Works on mobile devices",
      "No download required",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "312",
    },
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${lora.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
        />
      </head>
      <body
        className="font-sans antialiased tracking-[-0.01em]"
        suppressHydrationWarning
      >
        <Navbar />
        {children}
        <Analytics />
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9097007689207633"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-B97Q2JFSRP"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-B97Q2JFSRP');
            `,
          }}
        />
      </body>
    </html>
  );
}
