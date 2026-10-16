import type { Metadata } from "next";
import Link from "next/link";
import { languageAlternates } from "@/lib/i18n/esPages";
import { ProfessionalTuner } from '@/components/Tuner/ProfessionalTuner';
import { HomepageContent, faqs } from '@/components/HomepageContent';

export const metadata: Metadata = {
  // The root layout's title template only applies to CHILD segments, and this
  // page shares the root segment with it — so the brand must be spelled out
  // here. Every other page omits it and lets the template append it.
  title: "Free Online Chromatic Guitar Tuner | GuitarTunePro",
  description:
    "Free online guitar tuner — tune with your microphone, no app download. Chromatic tuner with Standard, Drop D, Open G, and 10+ tuning presets.",
  alternates: {
    canonical: "/",
    languages: languageAlternates("/"),
  },
  openGraph: {
    title: "Free Online Chromatic Guitar Tuner | GuitarTunePro",
    description:
      "Free online guitar tuner — tune with your microphone, no app download. Chromatic tuner with Standard, Drop D, Open G, and 10+ tuning presets.",
    type: "website",
    url: "https://www.guitartunepro.com",
    siteName: "GuitarTunePro",
    images: [
      {
        url: "/Logo.png",
        width: 1200,
        height: 630,
        alt: "GuitarTunePro — Free Online Guitar Tuner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Chromatic Guitar Tuner | GuitarTunePro",
    description:
      "Free online guitar tuner — tune with your microphone, no app download. Chromatic tuner with Standard, Drop D, Open G, and 10+ tuning presets.",
    images: ["/Logo.png"],
  },
};

export default function Home() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "GuitarTunePro",
    url: "https://www.guitartunepro.com",
    applicationCategory: "MusicApplication",
    operatingSystem: "Web",
    browserRequirements: "Requires modern browser with Web Audio API and microphone support",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    },
    description: "Free online guitar tuner. Tune your guitar with a microphone on any device using a chromatic pitch detector. Supports Standard, Drop D, Open G, Half-Step Down, and more — no download required.",
    featureList: [
      "Real-time chromatic pitch detection",
      "6-string, 7-string, 12-string, bass, ukulele, mandolin, banjo, violin, viola, and cello support",
      "Standard, Drop D, Open G, Open D, Half-Step Down, and 10+ tuning presets",
      "Auto string detection",
      "Autocorrelation-based pitch detection, tested and documented at /accuracy",
      "Works on mobile devices",
      "No download required",
    ],
    // No aggregateRating: we don't collect ratings anywhere on the site, and
    // declaring one we can't evidence is structured-data spam.
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <main className="w-full flex flex-col items-center">
        {/* The page needs a real H1. It previously had none — the only H1 was
            the tuner's note readout, which renders as an em-dash when idle. */}
        <header className="w-full max-w-5xl px-4 sm:px-6 pt-8 pb-2 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink">
            Free Online Guitar Tuner
          </h1>
          <p className="mt-2 text-ink-muted text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Tune by microphone in your browser, using a chromatic pitch
            detector. No app, no signup. Works for guitar, bass, ukulele, and more.
          </p>
          <p className="mt-3 text-xs text-ink-subtle">
            <Link
              href="/es"
              hrefLang="es"
              lang="es"
              className="underline underline-offset-2 hover:text-brass"
            >
              Afinador de guitarra en español
            </Link>
          </p>
        </header>
        <ProfessionalTuner />
        <HomepageContent />
      </main>
    </>
  );
}
