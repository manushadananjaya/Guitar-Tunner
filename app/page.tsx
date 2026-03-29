import type { Metadata } from "next";
import { ProfessionalTuner } from '@/components/Tuner/ProfessionalTuner';
import { HomepageContent } from '@/components/HomepageContent';

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
  return (
    <main className="min-h-screen bg-background">
      <ProfessionalTuner />
      <HomepageContent />
    </main>
  );
}
