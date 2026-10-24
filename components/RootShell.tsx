import type { Locale } from "@/lib/i18n/tuner";
import { Inter, Lora, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HideOnEmbed } from "@/components/HideOnEmbed";
import { ServiceWorkerRegistrar } from "@/components/ServiceWorkerRegistrar";
import { ThemeProvider } from "@/components/theme-provider";
import "@/app/globals.css";

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

/** The <html> document shared by every root layout. There are three — the
 *  English site, /es, and /[lang] — so each can declare its own <html lang>,
 *  which a single root layout cannot do for statically rendered pages. */
export function RootShell({
  lang,
  children,
}: Readonly<{
  lang: Locale;
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
      lang={lang}
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
        <div className="fixed inset-0 pointer-events-none z-0 print:hidden">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-brass/0 dark:bg-brass/10 blur-[130px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-brass/0 dark:bg-brass/10 blur-[130px]" />
        </div>
        <div className="print:hidden">
          <HideOnEmbed>
            <Navbar />
          </HideOnEmbed>
        </div>
        <div className="flex-1 w-full relative z-10">
          {children}
        </div>
        <div className="print:hidden">
          <HideOnEmbed>
            <Footer />
          </HideOnEmbed>
        </div>
        </ThemeProvider>
        <HideOnEmbed>
          <Script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3345965156522280"
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        </HideOnEmbed>
        <HideOnEmbed>
          <ServiceWorkerRegistrar />
        </HideOnEmbed>
        <Analytics />
        {/* Not on the embedded widget: its pages promise site owners that
            their visitors get no tracking cookies. */}
        <HideOnEmbed>
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
        </HideOnEmbed>
      </body>
    </html>
  );
}
