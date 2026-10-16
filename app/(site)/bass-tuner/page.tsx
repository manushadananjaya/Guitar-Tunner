import { Metadata } from "next";
import { languageAlternates } from "@/lib/i18n/pages";
import Link from "next/link";
import TunerPageLayout from "@/components/TunerPageLayout";
import { otherInstrumentsFor } from "@/lib/instrumentPages";

export const metadata: Metadata = {
  title: "Bass Tuner — Free Online Bass Guitar Tuner",
  description:
    "Free online bass guitar tuner. Tune your 4-string bass (E A D G) with your microphone, right on this page. Accurate down to 41 Hz — no download required.",
  alternates: {
    canonical: "/bass-tuner",
    languages: languageAlternates("/bass-tuner"),
  },
  openGraph: {
    title: "Bass Tuner — Free Online Bass Guitar Tuner",
    description:
      "Tune your bass guitar quickly and accurately using your device's microphone.",
  },
};

export default function BassTunerPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Bass Tuner - GuitarTunePro",
    url: "https://www.guitartunepro.com/bass-tuner",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Free online bass guitar tuner. Tune your 4-string bass (E A D G) instantly.",
    browserRequirements: "Requires microphone access",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <TunerPageLayout
        title="Bass Tuner"
        description="Tune your 4-string bass guitar (E A D G) using your microphone. The tuner below is already set for bass — press Start Recording and pluck a string."
        canonicalPath="/bass-tuner"
        initialGuitarType="bass"
        otherTuners={otherInstrumentsFor("/bass-tuner")}
        faqs={[
          {
            question: "What is standard bass tuning?",
            answer:
              "Standard 4-string bass tuning is E A D G from lowest to highest — E1, A1, D2, G2. These are the same note names as the bottom four strings of a guitar, but sounding one octave lower.",
          },
          {
            question: "Why does my phone struggle to hear my bass?",
            answer:
              "The low E on a bass is 41.20 Hz, and most phone and laptop microphones roll off sharply below about 80 Hz — they are tuned for speech. The tuner compensates by locking onto the harmonics, but you will get a far steadier reading if you pluck firmly over the neck pickup and mute the other strings.",
          },
          {
            question: "Should I tune a bass with the amp on or off?",
            answer:
              "This tuner uses your device's microphone, so tune acoustically with the amp off or turned down. Amp noise, hum, and room reflections all add competing frequencies that make low-note detection less reliable.",
          },
          {
            question: "How often should I tune my bass?",
            answer:
              "Check before every session. Bass strings are under enormous tension and hold pitch well once settled, but a fresh set will drift for several days, and temperature swings move the neck on any instrument.",
          },
          {
            question: "Can I tune a 5-string bass here?",
            answer:
              "Use our dedicated 5-string bass tuner, which adds the low B (30.87 Hz) below standard tuning. You can also switch the instrument selector on this page to 5-String Bass.",
          },
        ]}
        relatedArticles={[
          {
            title: "Why Your Guitar Goes Out of Tune",
            slug: "why-your-guitar-goes-out-of-tune",
            description:
              "The mechanical causes behind pitch drift, and how to reduce them.",
          },
          {
            title: "How Temperature and Humidity Affect Tuning",
            slug: "how-temperature-and-humidity-affect-guitar-tuning",
            description:
              "Why your instrument drifts between rooms, seasons, and stages.",
          },
          {
            title: "How to Use a Chromatic Tuner",
            slug: "how-to-use-a-chromatic-tuner",
            description:
              "Reading cents, needles, and note names on any chromatic tuner.",
          },
        ]}
      >
        <h2>How to Use This Bass Tuner</h2>
        <ol>
          <li>
            Press <strong>Start Recording</strong> on the tuner above and allow
            microphone access.
          </li>
          <li>
            The <strong>Bass Guitar</strong> instrument is already selected.
          </li>
          <li>
            Start with the E string (string 4, 41.20&nbsp;Hz). Pluck firmly over
            the neck pickup and let it ring.
          </li>
          <li>
            Mute the strings you are not tuning with your palm. Sympathetic
            vibration from open strings is the most common cause of an unstable
            reading on bass.
          </li>
          <li>
            Work up through A, D, and G, centring the needle at 0 cents on each.
          </li>
        </ol>

        <h2>Standard Bass Tuning Explained</h2>
        <p>
          A 4-string bass in standard tuning is <strong>E A D G</strong>, tuned
          in perfect fourths. The pitches are E1, A1, D2, and G2 — exactly one
          octave below the equivalent strings on a guitar.
        </p>
        <p>
          Tuning entirely in fourths, with no major-third break between the
          G and B strings that guitars have, is what makes bass fingering so
          consistent: a scale or arpeggio shape works identically anywhere on
          the neck, with no adjustment when crossing strings.
        </p>

        <h2>Why Low Notes Are Hard to Detect</h2>
        <p>
          Bass presents a genuine technical problem for any microphone-based
          tuner, and it is worth understanding so you can work around it.
        </p>
        <p>
          The open E string vibrates at <strong>41.20&nbsp;Hz</strong>. Most
          built-in microphones in phones and laptops are optimised for the human
          voice, which sits between roughly 85&nbsp;Hz and 255&nbsp;Hz, and they
          attenuate heavily below that. The fundamental of your low E may barely
          register.
        </p>
        <p>
          What saves the situation is that a plucked string produces a whole
          harmonic series, not just the fundamental. The second harmonic of the
          low E is at 82.40&nbsp;Hz and the third at 123.60&nbsp;Hz, both well
          within microphone range. Our pitch detection uses autocorrelation,
          which recognises the repeating period of the whole waveform, so it can
          resolve the correct fundamental even when the microphone barely
          captures it.
        </p>
        <p>Practical consequences:</p>
        <ul>
          <li>
            <strong>Pluck over the neck pickup, not the bridge.</strong> This
            emphasises the fundamental and lower harmonics.
          </li>
          <li>
            <strong>Use a firm, consistent pluck.</strong> Too soft and there is
            not enough signal; too hard and the initial attack sharpens the
            pitch briefly.
          </li>
          <li>
            <strong>Wait about half a second before reading.</strong> Let the
            attack transient pass and the note settle.
          </li>
          <li>
            <strong>Mute the other three strings.</strong> They will ring
            sympathetically and confuse the reading.
          </li>
        </ul>

        <h2>Common Bass Tunings</h2>
        <ul>
          <li>
            <strong>Standard (E A D G):</strong> The default for virtually all
            genres.
          </li>
          <li>
            <strong>Drop D (D A D G):</strong> The E string lowered a whole
            step, matching guitarists playing{" "}
            <Link href="/drop-d-tuner">Drop D</Link>.
          </li>
          <li>
            <strong>Half step down (E♭ A♭ D♭ G♭):</strong> Everything down a
            semitone to match a guitarist in{" "}
            <Link href="/half-step-down-tuner">E♭</Link>.
          </li>
          <li>
            <strong>5-string (B E A D G):</strong> Adds a low B below standard.
            See our{" "}
            <Link href="/5-string-bass-tuner">5-string bass tuner</Link>.
          </li>
        </ul>
        <p>
          The rule when playing with a band is simple: whatever the guitars are
          tuned to, the bass matches. A bassist in standard against guitars in
          Drop C will clash on every open string.
        </p>

        <h2>Troubleshooting</h2>
        <p>
          <strong>The needle jumps between two notes.</strong> Almost always
          sympathetic ringing from an open string you are not playing. Mute
          everything except the string being tuned.
        </p>
        <p>
          <strong>It reads an octave too high.</strong> The tuner has locked
          onto the second harmonic instead of the fundamental — common when
          plucking hard near the bridge. Pluck more gently over the neck pickup.
        </p>
        <p>
          <strong>It reads sharp immediately after plucking, then settles.</strong>{" "}
          That is real, not an error. A hard pluck stretches the string slightly
          and raises its pitch for a moment. Read the needle after the note
          settles.
        </p>
        <p>
          <strong>Nothing registers at all.</strong> Check that your browser has
          microphone permission, and that no other application is holding the
          microphone open.
        </p>

        <p>
          Also available: our{" "}
          <Link href="/5-string-bass-tuner">5-string bass tuner</Link>,{" "}
          <Link href="/ukulele-tuner">ukulele tuner</Link>, and the{" "}
          <Link href="/">standard chromatic guitar tuner</Link>.
        </p>
      </TunerPageLayout>
    </>
  );
}
