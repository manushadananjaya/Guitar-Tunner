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
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    },
    description: "Free online chromatic guitar tuner. Tune your guitar with a microphone on any device. Supports Standard, Drop D, Open G, Half-Step Down, and more — no download required.",
    browserRequirements: "Requires microphone access"
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
      <main className="min-h-screen bg-background">
        <ProfessionalTuner />
        <HomepageContent />
      </main>
    </>
  );
}
