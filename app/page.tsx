import type { Metadata } from "next";
import { ProfessionalTuner } from '@/components/Tuner/ProfessionalTuner';
import { HomepageContent, faqs } from '@/components/HomepageContent';

export const metadata: Metadata = {
  title: "GuitarTunePro | Free Online Chromatic Guitar Tuner — High Accuracy",
  description:
    "Tune your guitar with a microphone — free, online, no download required. GuitarTunePro is a high accuracy chromatic guitar tuner supporting Standard, Drop D, Open G, Half-Step Down, and 10+ tuning presets. Works on any device.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "GuitarTunePro | Free Online Chromatic Guitar Tuner — High Accuracy",
    description:
      "Free online chromatic guitar tuner. Tune guitar with microphone on any device. Supports Standard, Drop D, Open G, Half-Step Down, and more — no download needed.",
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
    title: "GuitarTunePro | Free Online Chromatic Guitar Tuner",
    description:
      "Tune your guitar with a microphone — free, high accuracy, no download required.",
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
