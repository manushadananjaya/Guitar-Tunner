import type { Metadata, Viewport } from "next";
import { Inter, Lora, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ServiceWorkerRegistrar } from "@/components/ServiceWorkerRegistrar";
import { ThemeProvider } from "@/components/theme-provider";
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
  // Follows the system preference. An explicit in-app theme choice is not a
  // media query, so ThemeToggle also syncs this tag on change.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ede5d7" },
    { media: "(prefers-color-scheme: dark)", color: "#17120e" },
  ],
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
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3345965156522280"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body
        className="font-sans antialiased tracking-[-0.01em] bg-canvas text-ink min-h-screen flex flex-col relative"
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
        {/* Global ambient background glow */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-brass/0 dark:bg-brass/10 blur-[130px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-brass/0 dark:bg-brass/10 blur-[130px]" />
        </div>
        <Navbar />
        <div className="flex-1 w-full relative z-10">
          {children}
        </div>
        <Footer />
        </ThemeProvider>
        <ServiceWorkerRegistrar />
        <Analytics />
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
