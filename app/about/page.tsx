import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Mic, Music, Globe, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us — Free Online Guitar Tuner",
  description:
    "Learn about GuitarTunePro — the free, browser-based guitar tuner with real-time pitch detection. Our mission, how it works, and what makes it the best online guitar tuning tool.",
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
  };

  return (
    <div className="min-h-screen bg-[#050510] text-zinc-300 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-900/10 blur-[120px]" />
      </div>

      <main className="relative z-10 max-w-3xl mx-auto px-5 pt-10 sm:pt-16 pb-20">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-cyan-400 hover:text-cyan-300 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Tuner
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl overflow-hidden">
              <img
                src="/Logo.png"
                alt="GuitarTunePro logo"
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              About <span className="text-cyan-500">GuitarTunePro</span>
            </h1>
          </div>
          <p className="text-zinc-400 text-lg leading-relaxed">
            A free, professional-grade guitar tuner that works in your browser —
            no installation, no subscription, no compromise on accuracy.
          </p>
        </header>

        {/* Mission */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
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
          <h2 className="text-2xl font-bold text-white mb-6">
            How GuitarTunePro Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4">
                <Mic className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="font-semibold text-zinc-100 mb-2">
                Real-Time Microphone Input
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                GuitarTunePro uses your device's built-in microphone and the Web
                Audio API to capture the sound of your guitar strings in real
                time. No additional hardware or cables are required.
              </p>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4">
                <Music className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="font-semibold text-zinc-100 mb-2">
                High-Accuracy Pitch Detection
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                We use an optimized autocorrelation algorithm (YIN-inspired)
                running at 48kHz sample rate with a 4096-sample FFT to achieve
                high-precision pitch detection across the full guitar frequency
                range (40Hz–1kHz).
              </p>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4">
                <Globe className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="font-semibold text-zinc-100 mb-2">
                Works on Any Device
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                GuitarTunePro runs entirely in your web browser using modern web
                standards. It works on desktop, laptop, smartphone, and tablet —
                no app download, no account, no setup.
              </p>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="font-semibold text-zinc-100 mb-2">
                Privacy Respecting
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                All audio processing happens entirely on your device. We never
                send audio data to any server. Microphone access is used solely
                for pitch detection and is released when you stop the tuner.
              </p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Features</h2>
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
                <span className="text-cyan-400 mt-0.5 shrink-0">✓</span>
                <span className="text-zinc-300">{feature}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Instruments */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Who Is It For?</h2>
          <p className="leading-relaxed mb-4">
            GuitarTunePro is designed for guitarists of all skill levels:
          </p>
          <ul className="space-y-2 text-sm">
            <li>
              <strong className="text-zinc-100">Beginners</strong> — Simple,
              clear interface with visual string selection and peg guidance
            </li>
            <li>
              <strong className="text-zinc-100">Intermediate players</strong> —
              Multiple tuning presets, alternate tunings, and cent-accurate
              display
            </li>
            <li>
              <strong className="text-zinc-100">Advanced / professional</strong>{" "}
              — High-accuracy mode, chromatic detection, fast refresh rate
              suitable for live use
            </li>
            <li>
              <strong className="text-zinc-100">Teachers and students</strong> —
              Free access on any device, no signup required, ideal for music
              classrooms
            </li>
          </ul>
        </section>

        {/* Learning Resources */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">
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
            className="inline-block border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10 px-5 py-2.5 rounded-full text-sm font-medium transition-colors"
          >
            Browse Guitar Tuning Guides →
          </Link>
        </section>

        {/* Contact */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">
            Contact & Support
          </h2>
          <p className="leading-relaxed mb-3">
            GuitarTunePro is developed and maintained by the GuitarTunePro team. We welcome feedback, bug reports, and feature suggestions.
          </p>
          <p className="leading-relaxed text-sm text-zinc-400">
            For support inquiries, please visit our{" "}
            <Link
              href="/contact"
              className="text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              contact page
            </Link>
            .
          </p>
        </section>

        <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6 text-center">
          <p className="text-zinc-300 mb-4">Ready to tune your guitar?</p>
          <Link
            href="/"
            className="inline-block bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold px-6 py-3 rounded-full text-sm transition-colors"
          >
            Open Free Guitar Tuner →
          </Link>
        </div>
      </main>
    </div>
  );
}
