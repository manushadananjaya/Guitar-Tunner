import type { Metadata, Viewport } from "next";

const siteUrl = "https://www.guitartunepro.com";

/** Site-wide metadata shared by every root layout (English, /es, /[lang]).
 *  Pages override title, description, canonical and Open Graph. */
export const siteMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "GuitarTunePro | Free Online High Accuracy Guitar Tuner",
    template: "%s | GuitarTunePro",
  },
  description:
    "Professional guitar tuner with real-time pitch detection and high accuracy. Supports 6-string, 7-string, 12-string guitars, bass, ukulele, mandolin, banjo, violin, viola, and cello. Multiple tuning modes including Standard, Drop D, Open G, and more. Works on any device with a microphone.",
  applicationName: "GuitarTunePro",
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    title: "GuitarTunePro",
    statusBarStyle: "black-translucent",
  },
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
    "violin tuner",
    "mandolin tuner",
    "banjo tuner",
    "drop d tuning",
    "real-time tuner",
  ],
  authors: [{ name: "GuitarTunePro" }],
  // No title, description or url here: Next fills those in from each page's
  // own metadata, whereas values set here would label every page that has no
  // openGraph of its own as the homepage. A page's openGraph replaces this
  // object whole, so images come from opengraph-image.tsx files instead.
  openGraph: {
    type: "website",
    siteName: "GuitarTunePro",
    locale: "en_US",
    // Default image: the opengraph-image.tsx beside each root layout.
  },
  // Only the card type: Next copies title, description and image from the
  // page's openGraph when twitter leaves them unset.
  twitter: {
    card: "summary_large_image",
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

export const siteViewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  // Follows the system preference. An explicit in-app theme choice is not a
  // media query, so ThemeToggle also syncs this tag on change.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ede5d7" },
    { media: "(prefers-color-scheme: dark)", color: "#17120e" },
  ],
};

