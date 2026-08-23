import Link from "next/link";
import { TUNER_PAGES } from "@/lib/tunerPages";
import { INSTRUMENT_PAGES } from "@/lib/instrumentPages";

export const faqs = [
  {
    question: "Does this work without downloading anything?",
    answer:
      "Yes. GuitarTunePro is a completely browser-based free online guitar tuner — no app download, no installation, and no account required. Open the site on any device with a modern web browser and a microphone, and you're ready to tune.",
  },
  {
    question: "How accurate is the tuner?",
    answer:
      "GuitarTunePro uses an autocorrelation, YIN-inspired pitch detection algorithm analyzing 4096 audio samples at a 48 kHz sample rate. In our own synthesized-signal testing, single-reading error stayed under 5 cents per string in quiet conditions and under about 8 cents worst-case with background noise present — see the full methodology and test data at /accuracy.",
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
    <div className="w-full bg-transparent relative">
      {/* Section Divider Decorative Line */}
      <div className="w-full h-px bg-linear-to-r from-transparent via-line to-transparent" />

      {/* About Section */}
      <section className="max-w-5xl mx-auto px-6 py-20 sm:py-28 relative">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-brass uppercase tracking-widest mb-4 border border-brass/25 bg-brass/5 px-4 py-1.5 rounded-full backdrop-blur-sm">
            About GuitarTunePro
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-ink mb-6 tracking-tight leading-tight">
            The Free Online{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brass-hover to-blue-500">
              Chromatic Guitar Tuner
            </span>
          </h2>
          <p className="text-ink-muted text-lg max-w-2xl mx-auto leading-relaxed">
            Autocorrelation-based pitch detection in your browser, with
            measured accuracy data to back it up. No download, no
            subscription, no compromise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-12">
          <div className="bg-surface-sunken/20 border border-line rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl space-y-4 text-ink text-base leading-relaxed">
            <p>
              <strong className="text-ink font-semibold">GuitarTunePro</strong> is a{" "}
              <strong className="text-brass-hover font-semibold">
                free online chromatic guitar tuner
              </strong>{" "}
              built for players of all skill levels — from first-time beginners to
              touring professionals. It runs entirely in your web browser using
              the Web Audio API, which means you can{" "}
              <strong className="text-ink font-semibold">
                tune your guitar with a microphone
              </strong>{" "}
              on any device without installing anything.
            </p>
            <p>
              Unlike many tuners that rely on simple frequency estimation,
              GuitarTunePro uses a YIN-inspired autocorrelation algorithm
              operating at a 48 kHz sample rate with a 4096-sample processing
              window — not an FFT. We've{" "}
              <Link
                href="/accuracy"
                className="text-brass-hover font-semibold hover:text-brass transition-colors"
              >
                tested and published the actual measured accuracy
              </Link>{" "}
              rather than quoting a bare precision figure with nothing behind
              it.
            </p>
          </div>

          <div className="bg-surface-sunken/20 border border-line rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl space-y-4 text-ink text-base leading-relaxed">
            <p>
              The tuner supports{" "}
              <strong className="text-ink font-semibold">
                6-string, 7-string, 12-string, bass, and ukulele
              </strong>
              , with presets for Standard (E A D G B E), Drop D, Half-Step Down,
              Open G, Open D, DADGAD, and more. Automatic string detection
              identifies which string you're playing so you can tune all strings
              without touching the screen.
            </p>
            <p>
              GuitarTunePro is built and maintained by{" "}
              <Link
                href="/about"
                className="text-brass-hover font-semibold hover:text-brass transition-colors"
              >
                Manusha Dananjaya
              </Link>
              . All audio processing happens locally on your device — no audio
              data is ever sent to a server. The tuner is completely free and
              always will be.
            </p>
          </div>
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          {[
            "No Download Required",
            "Works on Mobile",
            "Accuracy Data Published",
            "Auto String Detection",
            "10+ Tuning Presets",
            "Bass & Ukulele Support",
            "100% Free",
          ].map((f) => (
            <span
              key={f}
              className="text-xs font-semibold text-ink border border-line bg-surface/20 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm hover:border-brass/20 transition-smooth"
            >
              {f}
            </span>
          ))}
        </div>
      </section>

      {/* Alternate tuner pages */}
      <section className="max-w-5xl mx-auto px-6 py-12 relative">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-brass uppercase tracking-widest mb-4 border border-brass/25 bg-brass/5 px-4 py-1.5 rounded-full backdrop-blur-sm">
            Alternate Tuning Tools
          </div>
          <h2 className="text-3xl font-extrabold text-ink mb-4 tracking-tight">
            Dedicated Alternate Tuners
          </h2>
          <p className="text-ink-muted text-sm max-w-xl mx-auto">
            Each page below is a full working tuner, pre-loaded with the correct
            target notes so you can switch tunings in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TUNER_PAGES.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="group rounded-3xl border border-line bg-surface-sunken/20 p-6 sm:p-8 hover:border-brass/30 hover:bg-brass/5 hover:shadow-lg hover:shadow-brass/5 transition-smooth flex flex-col justify-between min-h-48"
            >
              <div>
                <div className="font-mono text-base font-bold text-brass mb-3 tracking-wider group-hover:scale-105 origin-left transition-transform duration-300">
                  {page.notes.split(" ").join(" · ")}
                </div>
                <h3 className="font-bold text-lg text-ink mb-2 group-hover:text-brass-hover transition-colors">
                  {page.label} Tuner
                </h3>
                <p className="text-xs text-ink-muted leading-relaxed">
                  {page.blurb}
                </p>
              </div>
              <div className="text-xs text-brass font-bold group-hover:translate-x-1 transition-transform duration-300 pt-4 flex items-center gap-1">
                Open {page.label} Tuner →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Chord library cross-promo */}
      <section className="max-w-5xl mx-auto px-6 pt-12 relative">
        <Link
          href="/chords"
          className="group block rounded-3xl border border-line bg-surface-sunken/20 p-8 sm:p-10 hover:border-brass/30 hover:bg-brass/5 transition-smooth"
        >
          <h2 className="text-2xl sm:text-3xl font-extrabold text-ink mb-2 tracking-tight group-hover:text-brass-hover transition-colors">
            Guitar Chord Library
          </h2>
          <p className="text-sm text-ink-muted leading-relaxed max-w-xl">
            Diagrams and audio for major, minor, 7th, sus, diminished and
            augmented chords in every key — every shape checked against chord
            theory before it ships.
          </p>
          <span className="inline-flex items-center gap-1 text-xs text-brass font-bold pt-4 group-hover:translate-x-1 transition-transform duration-300">
            Browse the Chord Library →
          </span>
        </Link>
      </section>

      {/* Metronome cross-promo */}
      <section className="max-w-5xl mx-auto px-6 py-12 relative">
        <Link
          href="/metronome"
          className="group block rounded-3xl border border-line bg-surface-sunken/20 p-8 sm:p-10 hover:border-brass/30 hover:bg-brass/5 transition-smooth"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10">
            <div className="flex gap-2 shrink-0" aria-hidden="true">
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className={
                    i === 0
                      ? "w-5 h-5 rounded-full bg-brass-hover shadow-[0_0_16px_#22d3ee]"
                      : "w-4 h-4 rounded-full bg-surface-raised self-center"
                  }
                />
              ))}
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink mb-2 tracking-tight group-hover:text-brass-hover transition-colors">
                Free Online Metronome
              </h2>
              <p className="text-sm text-ink-muted leading-relaxed max-w-xl">
                Tuning is half of it. Set a tempo from 30 to 300 BPM, tap the
                beat you want, and practise against sample-accurate timing —
                with time signatures, subdivisions, and an accented downbeat.
              </p>
              <span className="inline-flex items-center gap-1 text-xs text-brass font-bold pt-4 group-hover:translate-x-1 transition-transform duration-300">
                Open the Metronome →
              </span>
            </div>
          </div>
        </Link>
      </section>

      {/* Instrument tuner pages */}
      <section className="max-w-5xl mx-auto px-6 py-12 relative">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-brass uppercase tracking-widest mb-4 border border-brass/25 bg-brass/5 px-4 py-1.5 rounded-full backdrop-blur-sm">
            Other Instruments
          </div>
          <h2 className="text-3xl font-extrabold text-ink mb-4 tracking-tight">
            Not a 6-String?
          </h2>
          <p className="text-ink-muted text-sm max-w-xl mx-auto">
            The same pitch detection engine, pre-configured for bass, ukulele,
            and extended-range guitars.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {INSTRUMENT_PAGES.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="group rounded-3xl border border-line bg-surface-sunken/20 p-6 sm:p-8 hover:border-brass/30 hover:bg-brass/5 hover:shadow-lg hover:shadow-brass/5 transition-smooth flex flex-col justify-between min-h-48"
            >
              <div>
                <div className="font-mono text-base font-bold text-brass mb-3 tracking-wider group-hover:scale-105 origin-left transition-transform duration-300">
                  {page.notes.split(" ").join(" · ")}
                </div>
                <h3 className="font-bold text-lg text-ink mb-2 group-hover:text-brass-hover transition-colors">
                  {page.label} Tuner
                </h3>
                <p className="text-xs text-ink-muted leading-relaxed">
                  {page.blurb}
                </p>
              </div>
              <div className="text-xs text-brass font-bold group-hover:translate-x-1 transition-transform duration-300 pt-4 flex items-center gap-1">
                Open {page.label} Tuner →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Online Guitar Tuner SEO Article Guide */}
      <section className="max-w-5xl mx-auto px-6 py-16 sm:py-24 relative">
        <div className="w-full h-px bg-linear-to-r from-transparent via-line to-transparent mb-16" />
        
        <h2 className="text-3xl font-extrabold text-ink mb-8 tracking-tight">
          Complete Online Guitar Tuner Guide
        </h2>

        <div className="bg-surface-sunken/10 border border-line rounded-3xl p-6 sm:p-10 backdrop-blur-sm shadow-xl">
          <article className="prose prose-invert max-w-none text-ink leading-relaxed space-y-6 text-base">
            <div>
              <h3 className="text-xl font-bold text-ink mb-3">
                How to Tune Your Guitar by Ear or with a Mic
              </h3>
              <p>
                Tuning your guitar is the most important skill you can learn as a
                beginner. An out-of-tune guitar will make even the greatest players
                sound bad. Our <strong className="text-brass font-semibold">online guitar tuner</strong> simplifies this
                process. Simply allow microphone access, pluck a string, and our
                advanced pitch detection algorithm will tell you exactly which note
                you are playing and whether it is too sharp (high) or flat (low).
              </p>
              <p className="mt-3">
                The standard tuning for a 6-string guitar, starting from the
                thickest string (lowest pitch) to the thinnest string (highest
                pitch), is <strong className="text-ink font-semibold">E - A - D - G - B - E</strong>. A helpful
                mnemonic device to remember these notes is: "<strong>E</strong>ddie{" "}
                <strong>A</strong>te <strong>D</strong>ynamite, <strong>G</strong>
                ood <strong>B</strong>ye <strong>E</strong>ddie".
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-ink mb-3">
                Exploring Alternative Tunings
              </h3>
              <p>
                While standard tuning is extremely versatile, exploring alternative
                tunings can unlock entirely new sonic possibilities and make certain
                chords easier to play. Our tuner supports dozens of alternative
                tunings instantly.
              </p>
              <ul className="list-disc list-inside space-y-2 mt-3 ml-2 text-ink-muted text-sm">
                <li>
                  <strong className="text-ink">Drop D (D A D G B E):</strong> Popular in rock and metal
                  for easy, heavy power chords. Lower the thick E string down a
                  whole step to D.
                </li>
                <li>
                  <strong className="text-ink">Open G (D G D G B D):</strong> A favorite of blues players
                  and the Rolling Stones. Strumming all strings open produces a G
                  major chord.
                </li>
                <li>
                  <strong className="text-ink">Half-Step Down (Eb Ab Db Gb Bb Eb):</strong> Lowers the
                  tension on the strings, making bending easier, and creates a
                  darker, heavier tone.
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-line">
              <h3 className="text-lg font-bold text-ink mb-4">
                Frequently Asked Questions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-ink mb-1">
                    Is the online guitar tuner accurate?
                  </h4>
                  <p className="text-sm text-ink-muted leading-relaxed">
                    Yes, GuitarTunePro uses the Web Audio API and highly precise
                    algorithmic pitch detection. It is accurate to within ±1
                    cent, making it suitable for professional stage setup,
                    recording sessions, and daily practice.
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-ink mb-1">
                    Why isn't the tuner hearing my guitar?
                  </h4>
                  <p className="text-sm text-ink-muted leading-relaxed">
                    Ensure that you have granted microphone permissions in your
                    browser. If you are using an electric guitar without an
                    amplifier, the acoustic sound may be too quiet. Try moving your
                    instrument closer to the device's microphone or plugging into a
                    USB interface.
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        className="max-w-5xl mx-auto px-6 py-12 relative"
        aria-labelledby="faq-heading"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-brass uppercase tracking-widest mb-4 border border-brass/25 bg-brass/5 px-4 py-1.5 rounded-full backdrop-blur-sm">
            FAQ
          </div>
          <h2
            id="faq-heading"
            className="text-3xl font-extrabold text-ink mb-3 tracking-tight"
          >
            Frequently Asked Questions
          </h2>
          <p className="text-ink-muted text-sm max-w-xl mx-auto">
            Everything you need to know about using GuitarTunePro.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {faqs.map((faq) => (
            <div
              key={faq.question}
              className="rounded-3xl border border-line bg-surface-sunken/20 p-6 sm:p-8 hover:border-line transition-smooth"
            >
              <h3 className="font-bold text-ink mb-2.5 leading-snug">
                {faq.question}
              </h3>
              <p className="text-sm text-ink-muted leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Internal links to articles */}
      <section className="max-w-5xl mx-auto px-6 py-12 pb-24 text-center relative">
        <div className="w-full h-px bg-linear-to-r from-transparent via-line to-transparent mb-12" />
        
        <p className="text-ink-subtle text-sm mb-6 uppercase tracking-wider font-semibold">
          New to guitar tuning? Explore our free guides:
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-3 text-sm">
          <Link
            href="/articles/how-to-tune-a-guitar-for-beginners"
            className="text-brass hover:text-brass-hover font-semibold transition-colors"
          >
            How to Tune a Guitar for Beginners
          </Link>
          <span className="text-ink-subtle hidden sm:inline">·</span>
          <Link
            href="/articles/standard-tuning-explained"
            className="text-brass hover:text-brass-hover font-semibold transition-colors"
          >
            Standard Tuning Explained
          </Link>
          <span className="text-ink-subtle hidden sm:inline">·</span>
          <Link
            href="/articles/alternate-guitar-tunings"
            className="text-brass hover:text-brass-hover font-semibold transition-colors"
          >
            Alternate Guitar Tunings
          </Link>
          <span className="text-ink-subtle hidden sm:inline">·</span>
          <Link
            href="/articles/why-your-guitar-goes-out-of-tune"
            className="text-brass hover:text-brass-hover font-semibold transition-colors"
          >
            Why Your Guitar Goes Out of Tune
          </Link>
          <span className="text-ink-subtle hidden sm:inline">·</span>
          <Link
            href="/articles/how-to-use-a-chromatic-tuner"
            className="text-brass hover:text-brass-hover font-semibold transition-colors"
          >
            How to Use a Chromatic Tuner
          </Link>
          <span className="text-ink-subtle hidden sm:inline">·</span>
          <Link
            href="/articles/drop-d-tuning-guide"
            className="text-brass hover:text-brass-hover font-semibold transition-colors"
          >
            Drop D Tuning Guide
          </Link>
        </div>
      </section>
    </div>
  );
}
