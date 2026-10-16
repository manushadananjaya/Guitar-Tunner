import { Metadata } from "next";
import { languageAlternates } from "@/lib/i18n/pages";
import Link from "next/link";
import TunerPageLayout from "@/components/TunerPageLayout";
import { otherTunersFor } from "@/lib/tunerPages";

export const metadata: Metadata = {
  title: "Drop D Tuner — Free Online Drop D Guitar Tuner",
  description:
    "Free online Drop D guitar tuner. Tune to Drop D (D A D G B E) with your microphone, right on this page. Works on any device — no download required.",
  alternates: {
    canonical: "/drop-d-tuner",
    languages: languageAlternates("/drop-d-tuner"),
  },
  openGraph: {
    title: "Drop D Tuner — Free Online Drop D Guitar Tuner",
    description:
      "Tune your guitar to Drop D quickly and accurately using your device's microphone.",
  },
};

export default function DropDTunerPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Drop D Tuner - GuitarTunePro",
    url: "https://www.guitartunepro.com/drop-d-tuner",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Free online Drop D guitar tuner. Tune your guitar to Drop D (D A D G B E) instantly.",
    browserRequirements: "Requires microphone access",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <TunerPageLayout
        title="Drop D Tuner"
        description="Tune your guitar to Drop D (D A D G B E) using your microphone. The tuner below is already set to Drop D — press Start Recording and pluck your low string."
        canonicalPath="/drop-d-tuner"
        initialTuning="dropD"
        otherTuners={otherTunersFor("/drop-d-tuner")}
        faqs={[
          {
            question: "What are the notes in Drop D tuning?",
            answer:
              "Drop D tuning is D A D G B E — identical to standard tuning except the lowest (6th) string is tuned down one whole step from E to D. Only the 6th string changes.",
          },
          {
            question: "How do I quickly switch to Drop D?",
            answer:
              "Play your low E (6th string) and your D string (4th string) together. Slowly loosen the 6th string until the two sound like the same note an octave apart. Confirm with the tuner on this page.",
          },
          {
            question: "What music uses Drop D tuning?",
            answer:
              "Drop D is extremely popular in rock, metal, grunge, and blues. Famous songs in Drop D include Everlong (Foo Fighters), Moby Dick (Led Zeppelin), and Killing In The Name (Rage Against the Machine).",
          },
          {
            question: "Does Drop D work for bass guitar?",
            answer:
              "Yes. Standard 4-string bass is E A D G, so Drop D lowers the E string a whole step to D, giving you D A D G. Switch the instrument selector on the tuner above to Bass Guitar to tune it.",
          },
          {
            question: "Will Drop D damage my guitar or strings?",
            answer:
              "No. Dropping one string a whole step slightly reduces total neck tension, which is well within what any guitar is built to handle. If you stay in Drop D permanently, a slightly heavier 6th string (.056 or .058) will restore normal feel and reduce fret buzz.",
          },
        ]}
        relatedArticles={[
          {
            title: "Drop D Tuning Guide for Rock and Metal",
            slug: "drop-d-tuning-guide",
            description:
              "Deep dive into Drop D — chord shapes, power chords, and famous songs.",
          },
          {
            title: "Alternate Guitar Tunings You Should Try",
            slug: "alternate-guitar-tunings",
            description:
              "Explore Open G, DADGAD, half-step down, and more alternate tunings.",
          },
          {
            title: "How to Tune a Guitar for Beginners",
            slug: "how-to-tune-a-guitar-for-beginners",
            description: "Complete step-by-step guide to tuning your guitar.",
          },
        ]}
      >
        <h2>How to Use This Drop D Tuner</h2>
        <ol>
          <li>
            Press <strong>Start Recording</strong> on the tuner above and allow
            microphone access when your browser asks.
          </li>
          <li>
            The <strong>Drop D</strong> preset is already selected — you don't
            need to change any settings.
          </li>
          <li>
            Start with string 6. Pluck it cleanly and let it ring. The needle
            shows exactly how far you are from D2 (73.42&nbsp;Hz).
          </li>
          <li>
            Loosen the tuning peg — counter-clockwise on most guitars — until
            the needle centers at 0 cents and turns green.
          </li>
          <li>
            Strings 1–5 are unchanged from standard tuning. Pluck each one to
            verify, and you're done.
          </li>
        </ol>
        <p>
          Because the tuner is chromatic and auto-detects which string you're
          playing, you can simply strum down through all six strings and fix
          whichever ones read off-centre.
        </p>

        <h2>What is Drop D Tuning?</h2>
        <p>
          <strong>Drop D tuning</strong> is one of the most widely used alternate
          guitar tunings in modern music. It's achieved by tuning the lowest
          string (the 6th string, low E) down one whole step from E to D, giving
          you <strong>D A D G B E</strong> from low to high.
        </p>
        <p>
          Every other string stays exactly the same as standard tuning. That
          single-string change is why Drop D is the fastest alternate tuning to
          switch into — practical enough to do between songs on stage.
        </p>

        <h2>Why Guitarists Use Drop D</h2>
        <ul>
          <li>
            <strong>One-finger power chords:</strong> With strings 6, 5, and 4
            now a fourth and fifth apart, a root-fifth-octave power chord becomes
            a single bar finger across three strings instead of the two-finger
            stretch standard tuning requires.
          </li>
          <li>
            <strong>Extended low range:</strong> The lowest note drops from E2
            (82.41&nbsp;Hz) to D2 (73.42&nbsp;Hz), giving you two extra
            semitones of bass weight.
          </li>
          <li>
            <strong>An open D drone:</strong> The open 6th string can ring
            underneath chords played higher up the neck — a technique used
            widely in folk, blues, and ambient playing.
          </li>
          <li>
            <strong>Fast switching:</strong> One peg, roughly one full turn, and
            you're there.
          </li>
        </ul>

        <h2>Famous Songs in Drop D</h2>
        <ul>
          <li>
            <strong>Everlong — Foo Fighters:</strong> A defining Drop D song.
            Dave Grohl leans on the open D resonance throughout.
          </li>
          <li>
            <strong>Killing in the Name — Rage Against the Machine:</strong>{" "}
            Heavy Drop D riffing built on the extended low range.
          </li>
          <li>
            <strong>Heart-Shaped Box — Nirvana:</strong> Kurt Cobain used Drop D
            frequently in the studio and live.
          </li>
          <li>
            <strong>Moby Dick — Led Zeppelin:</strong> Jimmy Page's classic riff
            demonstrates Drop D's drone capabilities.
          </li>
        </ul>

        <h2>Drop D vs. Standard Tuning — What Changes?</h2>
        <p>
          Only the pitch of the 6th string changes, from E2 to D2. The intervals
          between strings 1 through 5 are untouched. In practice:
        </p>
        <ul>
          <li>All chord shapes on strings 1–5 still work identically.</li>
          <li>
            Any shape using the 6th string must be fretted{" "}
            <strong>two frets higher</strong> to sound the same pitch as before.
          </li>
          <li>
            Power chords on the bottom three strings become a one-finger bar
            instead of a two-finger shape.
          </li>
        </ul>

        <h2>Troubleshooting</h2>
        <p>
          <strong>The needle jumps around on the low string.</strong> Low
          frequencies need a longer sample. Pluck slightly harder and let the
          note ring for a full second before reading the needle. Muting the
          other five strings with your palm also helps.
        </p>
        <p>
          <strong>The tuner shows D3 instead of D2.</strong> You're likely
          reading the octave harmonic rather than the fundamental. Pluck closer
          to the bridge with a softer touch.
        </p>
        <p>
          <strong>The 6th string buzzes after dropping to D.</strong> Lower
          tension means a wider vibration arc. This is normal; a heavier gauge
          6th string fixes it if you play in Drop D often.
        </p>

        <p>
          Want more depth? Read our full{" "}
          <Link href="/articles/drop-d-tuning-guide">
            Drop D Tuning Guide for Rock and Metal
          </Link>{" "}
          or browse the complete guide to{" "}
          <Link href="/articles/alternate-guitar-tunings">
            alternate guitar tunings
          </Link>
          .
        </p>
      </TunerPageLayout>
    </>
  );
}
