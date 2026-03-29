import Link from "next/link";

export const faqs = [
  {
    question: "Does this work without downloading anything?",
    answer:
      "Yes. GuitarTunePro is a completely browser-based free online guitar tuner — no app download, no installation, and no account required. Open the site on any device with a modern web browser and a microphone, and you're ready to tune.",
  },
  {
    question: "How accurate is the tuner?",
    answer:
      "GuitarTunePro uses a high-accuracy pitch detection algorithm running at a 48 kHz sample rate with a 4096-sample FFT window. This gives ±1 cent precision — accurate enough for professional use, live performance, and studio recording.",
  },
  {
    question: "Does this work on mobile?",
    answer:
      "Yes. The tuner works on iPhone, Android, tablets, laptops, and desktops. Simply allow microphone access when prompted by your browser, and the tuner will detect your guitar's pitch in real time — no cables or adapters needed.",
  },
  {
    question: "What guitar tunings are supported?",
    answer:
      "GuitarTunePro supports Standard (E A D G B E), Drop D, Half-Step Down (Eb), Full-Step Down (D), Open G, Open D, Open A, DADGAD, and many more. You can also use it as a chromatic tuner to detect any note freely.",
  },
  {
    question: "What instruments can I tune?",
    answer:
      "The tuner supports 6-string guitar, 7-string guitar, 12-string guitar, bass guitar (4-string and 5-string), and ukulele. Switch between instrument types from the selector above the string display.",
  },
  {
    question: "Is the tuner completely free?",
    answer:
      "Yes, GuitarTunePro is 100% free with no hidden fees, subscriptions, or paywalls. The core tuner experience is advertisement-free and will remain free for all players.",
  },
];

export function HomepageContent() {
  return (
    <div className="w-full bg-[#050510]">
      {/* About Section */}
      <section className="max-w-4xl mx-auto px-5 py-14 sm:py-20">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-4 border border-cyan-500/30 bg-cyan-500/5 px-3 py-1.5 rounded-full">
            About GuitarTunePro
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
            The Free Online{" "}
            <span className="text-cyan-500">Chromatic Guitar Tuner</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Professional-grade pitch detection in your browser. No download, no
            subscription, no compromise.
          </p>
        </div>

        <div className="prose prose-invert max-w-none text-zinc-300 leading-relaxed space-y-4 text-base">
          <p>
            <strong className="text-white">GuitarTunePro</strong> is a{" "}
            <strong className="text-white">
              free online chromatic guitar tuner
            </strong>{" "}
            built for players of all skill levels — from first-time beginners to
            touring professionals. It runs entirely in your web browser using
            the Web Audio API, which means you can{" "}
            <strong className="text-white">tune your guitar with a microphone</strong>{" "}
            on any device without installing anything.
          </p>
          <p>
            Unlike many tuners that rely on simple frequency estimation,
            GuitarTunePro uses an optimized YIN-inspired autocorrelation
            algorithm operating at a 48 kHz sample rate with a 4096-sample
            processing window. This delivers{" "}
            <strong className="text-white">
              high accuracy pitch detection
            </strong>{" "}
            to within ±1 cent — precise enough for studio recording, live
            performance, and critical ear training.
          </p>
          <p>
            The tuner supports{" "}
            <strong className="text-white">
              6-string, 7-string, 12-string, bass, and ukulele
            </strong>
            , with presets for Standard (E A D G B E), Drop D, Half-Step Down,
            Open G, Open D, DADGAD, and more. Automatic string detection
            identifies which string you're playing so you can tune all six
            strings without touching the screen. A smooth needle display with a
            real-time cent offset readout tells you exactly how far each string
            is from its target note.
          </p>
          <p>
            GuitarTunePro is developed and maintained by{" "}
            <a
              href="https://helixios.com"
              className="text-cyan-400 hover:text-cyan-300 transition-colors"
              rel="noopener noreferrer"
            >
              Helixios
            </a>
            . All audio processing happens locally on your device — no audio
            data is ever sent to a server. The tuner is completely free and
            always will be.
          </p>
        </div>

        {/* Feature pills */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {[
            "No Download Required",
            "Works on Mobile",
            "±1 Cent Accuracy",
            "Auto String Detection",
            "10+ Tuning Presets",
            "Bass & Ukulele Support",
            "100% Free",
          ].map((f) => (
            <span
              key={f}
              className="text-xs font-medium text-zinc-300 border border-zinc-700 bg-zinc-900/50 px-3.5 py-1.5 rounded-full"
            >
              {f}
            </span>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section
        className="max-w-4xl mx-auto px-5 pb-16 sm:pb-24"
        aria-labelledby="faq-heading"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-4 border border-cyan-500/30 bg-cyan-500/5 px-3 py-1.5 rounded-full">
            FAQ
          </div>
          <h2
            id="faq-heading"
            className="text-3xl sm:text-4xl font-bold text-white mb-3"
          >
            Frequently Asked Questions
          </h2>
          <p className="text-zinc-400 text-base max-w-xl mx-auto">
            Everything you need to know about using GuitarTunePro.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {faqs.map((faq) => (
            <div
              key={faq.question}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6"
            >
              <h3 className="font-semibold text-white mb-2 leading-snug">
                {faq.question}
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Alternate tuner pages */}
      <section className="max-w-4xl mx-auto px-5 pb-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-4 border border-cyan-500/30 bg-cyan-500/5 px-3 py-1.5 rounded-full">
            Alternate Tuning Tools
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Dedicated Alternate Tuners
          </h2>
          <p className="text-zinc-400 text-base max-w-xl mx-auto">
            Each alternate tuner is pre-loaded with the correct target notes so you can switch tunings in seconds.
          </p>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          <Link
            href="/drop-d-tuner"
            className="group rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 hover:border-cyan-500/40 hover:bg-zinc-800/50 transition-all"
          >
            <div className="font-mono text-lg font-bold text-cyan-400 mb-2 tracking-wider">
              D·A·D·G·B·E
            </div>
            <p className="font-semibold text-white mb-1 group-hover:text-cyan-400 transition-colors">
              Free Drop D Tuner
            </p>
            <p className="text-xs text-zinc-500">
              Lower your 6th string to D for one-finger power chords — perfect for rock and metal.
            </p>
          </Link>
          <Link
            href="/open-g-tuner"
            className="group rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 hover:border-cyan-500/40 hover:bg-zinc-800/50 transition-all"
          >
            <div className="font-mono text-lg font-bold text-cyan-400 mb-2 tracking-wider">
              D·G·D·G·B·D
            </div>
            <p className="font-semibold text-white mb-1 group-hover:text-cyan-400 transition-colors">
              Free Open G Tuner
            </p>
            <p className="text-xs text-zinc-500">
              Tune to Open G — the Keith Richards signature tuning for blues, folk, and slide guitar.
            </p>
          </Link>
          <Link
            href="/half-step-down-tuner"
            className="group rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 hover:border-cyan-500/40 hover:bg-zinc-800/50 transition-all"
          >
            <div className="font-mono text-lg font-bold text-cyan-400 mb-2 tracking-wider">
              Eb·Ab·Db·Gb·Bb·Eb
            </div>
            <p className="font-semibold text-white mb-1 group-hover:text-cyan-400 transition-colors">
              Free Half Step Down Tuner
            </p>
            <p className="text-xs text-zinc-500">
              Tune every string down one semitone — used by Hendrix, Guns N&apos; Roses, and Megadeth.
            </p>
          </Link>
        </div>
      </section>

      {/* Internal links to articles */}
      <section className="max-w-4xl mx-auto px-5 pb-20 text-center">
        <p className="text-zinc-500 text-sm mb-4">
          New to guitar tuning? Explore our free guides:
        </p>
        <div className="flex flex-wrap justify-center gap-3 text-sm">
          <Link
            href="/articles/how-to-tune-a-guitar-for-beginners"
            className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4 transition-colors"
          >
            How to Tune a Guitar for Beginners
          </Link>
          <span className="text-zinc-700">·</span>
          <Link
            href="/articles/standard-tuning-explained"
            className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4 transition-colors"
          >
            Standard Tuning Explained
          </Link>
          <span className="text-zinc-700">·</span>
          <Link
            href="/articles/alternate-guitar-tunings"
            className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4 transition-colors"
          >
            Alternate Guitar Tunings
          </Link>
          <span className="text-zinc-700">·</span>
          <Link
            href="/articles/why-your-guitar-goes-out-of-tune"
            className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4 transition-colors"
          >
            Why Your Guitar Goes Out of Tune
          </Link>
          <span className="text-zinc-700">·</span>
          <Link
            href="/articles/how-to-use-a-chromatic-tuner"
            className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4 transition-colors"
          >
            How to Use a Chromatic Tuner
          </Link>
          <span className="text-zinc-700">·</span>
          <Link
            href="/articles/drop-d-tuning-guide"
            className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4 transition-colors"
          >
            Drop D Tuning Guide
          </Link>
        </div>
      </section>
    </div>
  );
}
