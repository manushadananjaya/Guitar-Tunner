import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Mic, Music, Globe, ShieldCheck } from "lucide-react";
import { SITE_AUTHOR } from "@/lib/author";

export const metadata: Metadata = {
  title: "About Us — Free Online Guitar Tuner",
  description:
    "GuitarTunePro is a free, browser-based guitar tuner with real-time pitch detection. How it works, who built it, and why.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const aboutJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About GuitarTunePro",
    description:
      "Learn about GuitarTunePro — the free, browser-based guitar tuner with real-time pitch detection.",
    url: "https://www.guitartunepro.com/about",
    publisher: {
      "@type": "Organization",
      name: "GuitarTunePro",
      logo: {
        "@type": "ImageObject",
        url: "https://www.guitartunepro.com/Logo.png",
      },
    },
    ...(SITE_AUTHOR && {
      author: {
        "@type": "Person",
        name: SITE_AUTHOR.name,
        description: SITE_AUTHOR.bio,
      },
    }),
  };

  return (
    <div className="min-h-screen bg-canvas text-ink pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brass/0 dark:bg-brass/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-brass/0 dark:bg-brass/10 blur-[120px]" />
      </div>

      <main className="relative z-10 max-w-3xl mx-auto px-5 pt-10 sm:pt-16 pb-20">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-brass hover:text-brass-hover transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Tuner
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl overflow-hidden">
              <img
                src="/android-chrome-192x192.png"
                alt="GuitarTunePro logo"
                width={192}
                height={192}
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-ink">
              About <span className="text-brass">GuitarTunePro</span>
            </h1>
          </div>
          <p className="text-ink-muted text-lg leading-relaxed">
            A free guitar tuner that works in your browser — no installation,
            no subscription, and accuracy backed by{" "}
            <Link
              href="/accuracy"
              className="text-brass hover:text-brass-hover transition-colors"
            >
              published test data
            </Link>
            , not just a marketing claim.
          </p>
        </header>

        {/* Mission */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-ink mb-4">Our Mission</h2>
          <p className="leading-relaxed mb-4">
            GuitarTunePro was built with one clear goal: to give every guitarist
            — from first-day beginners to touring professionals — access to a
            fast, accurate, and beautifully designed guitar tuner without
            needing to download an app, buy a device, or create an account.
          </p>
          <p className="leading-relaxed mb-4">
            Guitar tuning should never be a barrier to playing. Whether you're
            at home, in a rehearsal room, backstage, or a recording studio,
            GuitarTunePro is ready in seconds on any device with a microphone
            and a modern web browser.
          </p>
          <p className="leading-relaxed">
            We believe good tools should be accessible to everyone. That's why
            GuitarTunePro is completely free — and always will be.
          </p>
        </section>

        {/* How It Works */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-ink mb-6">
            How GuitarTunePro Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="rounded-xl border border-line bg-surface/40 p-5">
              <div className="w-10 h-10 rounded-lg bg-brass/10 border border-brass/20 flex items-center justify-center mb-4">
                <Mic className="w-5 h-5 text-brass" />
              </div>
              <h3 className="font-semibold text-ink mb-2">
                Real-Time Microphone Input
              </h3>
              <p className="text-sm text-ink-muted leading-relaxed">
                GuitarTunePro uses your device's built-in microphone and the Web
                Audio API to capture the sound of your guitar strings in real
                time. No additional hardware or cables are required.
              </p>
            </div>
            <div className="rounded-xl border border-line bg-surface/40 p-5">
              <div className="w-10 h-10 rounded-lg bg-brass/10 border border-brass/20 flex items-center justify-center mb-4">
                <Music className="w-5 h-5 text-brass" />
              </div>
              <h3 className="font-semibold text-ink mb-2">
                High-Accuracy Pitch Detection
              </h3>
              <p className="text-sm text-ink-muted leading-relaxed">
                We use a YIN-inspired autocorrelation algorithm — not an FFT —
                analyzing 4096 audio samples at a 48kHz sample rate to estimate
                pitch across the full guitar frequency range (40Hz–1kHz). See{" "}
                <Link
                  href="/accuracy"
                  className="text-brass hover:text-brass-hover transition-colors"
                >
                  measured accuracy data
                </Link>
                .
              </p>
            </div>
            <div className="rounded-xl border border-line bg-surface/40 p-5">
              <div className="w-10 h-10 rounded-lg bg-brass/10 border border-brass/20 flex items-center justify-center mb-4">
                <Globe className="w-5 h-5 text-brass" />
              </div>
              <h3 className="font-semibold text-ink mb-2">
                Works on Any Device
              </h3>
              <p className="text-sm text-ink-muted leading-relaxed">
                GuitarTunePro runs entirely in your web browser using modern web
                standards. It works on desktop, laptop, smartphone, and tablet —
                no app download, no account, no setup.
              </p>
            </div>
            <div className="rounded-xl border border-line bg-surface/40 p-5">
              <div className="w-10 h-10 rounded-lg bg-brass/10 border border-brass/20 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5 text-brass" />
              </div>
              <h3 className="font-semibold text-ink mb-2">
                Privacy Respecting
              </h3>
              <p className="text-sm text-ink-muted leading-relaxed">
                All audio processing happens entirely on your device. We never
                send audio data to any server. Microphone access is used solely
                for pitch detection and is released when you stop the tuner.
              </p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-ink mb-6">Features</h2>
          <ul className="space-y-3 text-sm leading-relaxed">
            {[
              "Standard, Drop D, Half-Step Down, Full-Step Down, Open G, Open D, Open A, and more tuning presets",
              "6-string, 7-string, 12-string, bass guitar, and ukulele support",
              "Automatic string detection — the tuner identifies which string you're playing",
              "Smooth needle display with real-time cent offset readout",
              "Headstock peg guide showing which direction to turn each peg",
              "Reference tone playback for ear training",
              "Beginner, Standard, and Pro accuracy modes",
              "Works offline after first load (Progressive Web App)",
              "Completely free — no ads on the core tuner experience",
            ].map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-brass mt-0.5 shrink-0">✓</span>
                <span className="text-ink">{feature}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Instruments */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-ink mb-4">Who Is It For?</h2>
          <p className="leading-relaxed mb-4">
            GuitarTunePro is designed for guitarists of all skill levels:
          </p>
          <ul className="space-y-2 text-sm">
            <li>
              <strong className="text-ink">Beginners</strong> — Simple,
              clear interface with visual string selection and peg guidance
            </li>
            <li>
              <strong className="text-ink">Intermediate players</strong> —
              Multiple tuning presets, alternate tunings, and cent-accurate
              display
            </li>
            <li>
              <strong className="text-ink">Advanced / professional</strong>{" "}
              — High-accuracy mode, chromatic detection, fast refresh rate
              suitable for live use
            </li>
            <li>
              <strong className="text-ink">Teachers and students</strong> —
              Free access on any device, no signup required, ideal for music
              classrooms
            </li>
          </ul>
        </section>

        {/* Author */}
        {SITE_AUTHOR && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-ink mb-4">Who Built This</h2>
            <div className="rounded-xl border border-line bg-surface/40 p-6">
              <p className="font-bold text-ink text-lg">{SITE_AUTHOR.name}</p>
              <p className="text-sm text-brass mb-3">{SITE_AUTHOR.role}</p>
              <p className="leading-relaxed text-ink-muted">{SITE_AUTHOR.bio}</p>
            </div>
          </section>
        )}

        {/* Learning Resources */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-ink mb-4">
            Learning Resources
          </h2>
          <p className="leading-relaxed mb-4">
            Beyond the tuner itself, GuitarTunePro publishes comprehensive
            guitar tuning guides written for players at every level. Our
            articles cover everything from basic tuning technique to advanced
            topics like intonation, alternate tunings, and gear selection.
          </p>
          <Link
            href="/articles"
            className="inline-block border border-brass/40 text-brass hover:bg-brass/10 px-5 py-2.5 rounded-full text-sm font-medium transition-colors"
          >
            Browse Guitar Tuning Guides →
          </Link>
        </section>

        {/* Contact */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-ink mb-4">
            Contact & Support
          </h2>
          <p className="leading-relaxed mb-3">
            GuitarTunePro is developed and maintained by{" "}
            {SITE_AUTHOR ? SITE_AUTHOR.name : "a small team"}. We welcome
            feedback, bug reports, and feature suggestions.
          </p>
          <p className="leading-relaxed text-sm text-ink-muted">
            For support inquiries, please visit our{" "}
            <Link
              href="/contact"
              className="text-brass hover:text-brass-hover transition-colors"
            >
              contact page
            </Link>
            .
          </p>
        </section>

        <div className="rounded-2xl border border-brass/20 bg-brass/5 p-6 text-center">
          <p className="text-ink mb-4">Ready to tune your guitar?</p>
          <Link
            href="/"
            className="inline-block bg-brass hover:bg-brass-hover text-brass-contrast font-bold px-6 py-3 rounded-full text-sm transition-colors"
          >
            Open Free Guitar Tuner →
          </Link>
        </div>
      </main>
    </div>
  );
}
