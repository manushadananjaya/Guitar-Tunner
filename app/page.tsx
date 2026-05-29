import type { Metadata } from "next";
import { ProfessionalTuner } from '@/components/Tuner/ProfessionalTuner';
import { HomepageContent, faqs } from '@/components/HomepageContent';

export const metadata: Metadata = {
  title: "Free Online Chromatic Guitar Tuner | GuitarTunePro",
  description:
    "Tune your guitar with a microphone—free, no app download. High accuracy chromatic tuner with Standard, Drop D, Open G, and 10+ tuning presets.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Free Online Chromatic Guitar Tuner | GuitarTunePro",
    description:
      "Tune your guitar with a microphone—free, no app download. High accuracy chromatic tuner with Standard, Drop D, Open G, and 10+ tuning presets.",
    type: "website",
    url: "https://www.guitartunepro.com",
    siteName: "GuitarTunePro",
    images: [
      {
        url: "/Logo.png",
        width: 1200,
        height: 630,
        alt: "GuitarTunePro — Free Online Chromatic Guitar Tuner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Chromatic Guitar Tuner | GuitarTunePro",
    description:
      "Tune your guitar with a microphone—free, no app download. High accuracy chromatic tuner with Standard, Drop D, Open G, and 10+ tuning presets.",
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
    description: "Free online chromatic guitar tuner. Tune your guitar with a microphone on any device. Supports Standard, Drop D, Open G, Half-Step Down, and more — no download required.",
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
    }
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
        <ProfessionalTuner />
        <HomepageContent />
      </main>
    </>
  );
}
