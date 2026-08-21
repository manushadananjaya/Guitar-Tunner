import { Metadata } from "next";
import Link from "next/link";
import TunerPageLayout from "@/components/TunerPageLayout";
import { otherTunersFor } from "@/lib/tunerPages";

export const metadata: Metadata = {
  title: "Open A Tuner — Free Online Open A Guitar Tuner",
  description:
    "Free online Open A guitar tuner. Tune to Open A (E A E A C♯ E) with your microphone, right on this page. Bright blues and slide tuning — no download.",
  alternates: { canonical: "/open-a-tuner" },
  openGraph: {
    title: "Open A Tuner — Free Online Open A Guitar Tuner",
    description:
      "Tune your guitar to Open A quickly and accurately using your device's microphone.",
  },
};

export default function OpenATunerPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Open A Tuner - GuitarTunePro",
    url: "https://www.guitartunepro.com/open-a-tuner",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Free online Open A guitar tuner. Tune your guitar to Open A (E A E A C♯ E) instantly.",
    browserRequirements: "Requires microphone access",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <TunerPageLayout
        title="Open A Tuner"
        description="Tune your guitar to Open A (E A E A C♯ E) using your microphone. The tuner below is already set to Open A — press Start Recording and strum."
        canonicalPath="/open-a-tuner"
        initialTuning="openA"
        otherTuners={otherTunersFor("/open-a-tuner")}
        faqs={[
          {
            question: "What are the notes in Open A tuning?",
            answer:
              "This version of Open A is E A E A C♯ E from lowest to highest. Strumming the open strings sounds an A major chord.",
          },
          {
            question: "Which strings change from standard tuning?",
            answer:
              "Three strings are raised: the 4th string D goes up a whole step to E, the 3rd string G goes up a whole step to A, and the 2nd string B goes up a semitone to C♯. Strings 6, 5, and 1 stay as they are.",
          },
          {
            question: "Is there more than one Open A tuning?",
            answer:
              "Yes, and it causes constant confusion. This page uses E A E A C♯ E, the raised form. The other common version is Open G tuned up a whole step — E A E A C♯ E's relative, written A E A C♯ E A. Slide players often mean the second. Check which one a tab intends before you retune.",
          },
          {
            question: "Does Open A put extra tension on my guitar?",
            answer:
              "Yes. Like Open E, this tuning raises three strings rather than lowering them, so total neck tension increases. Tune up gradually, and consider one lighter gauge if you keep a guitar in Open A. The safer route is Open G with a capo at the 2nd fret, which gives the same pitches at lower tension.",
          },
          {
            question: "What is Open A good for?",
            answer:
              "Slide blues, primarily. The raised strings give a bright, tight response that cuts through a band, and as with any open tuning a slide barred across any fret produces a major chord at that position.",
          },
        ]}
        relatedArticles={[
          {
            title: "Alternate Guitar Tunings You Should Try",
            slug: "alternate-guitar-tunings",
            description:
              "Explore Open G, DADGAD, half-step down, and more alternate tunings.",
          },
          {
            title: "Does a Capo Affect Guitar Tuning?",
            slug: "does-a-capo-affect-guitar-tuning",
            description:
              "What a capo does to pitch, intonation, and tuning stability.",
          },
          {
            title: "How to Tune a Guitar by Ear",
            slug: "how-to-tune-a-guitar-by-ear",
            description:
              "Train your ear with relative tuning and harmonic methods.",
          },
        ]}
      >
        <h2>Before You Tune Up</h2>
        <p>
          Open A raises three strings, which means{" "}
          <strong>more tension than standard tuning</strong>, not less. Raise
          each string gradually and stop the moment the needle centres — a
          string being tightened gives no warning before it breaks.
        </p>
        <p>
          If you want Open A's pitches without the added load, tune to{" "}
          <Link href="/open-g-tuner">Open G</Link> and capo the 2nd fret. Same
          notes, same shapes, less strain on the instrument.
        </p>

        <h2>How to Use This Open A Tuner</h2>
        <ol>
          <li>
            Press <strong>Start Recording</strong> on the tuner above and allow
            microphone access.
          </li>
          <li>
            The <strong>Open A</strong> preset is already selected.
          </li>
          <li>
            Leave strings 6, 5, and 1 alone. E, A, and E are already correct.
          </li>
          <li>
            Raise string 4 from D to E (164.81&nbsp;Hz) — a whole step up.
          </li>
          <li>
            Raise string 3 from G to A (220.00&nbsp;Hz) — another whole step.
          </li>
          <li>
            Raise string 2 from B to C♯ (277.18&nbsp;Hz). This is the third of
            the chord, so tune it to exactly 0 cents.
          </li>
          <li>Strum all six for an A major, then run a second pass.</li>
        </ol>

        <h2>What is Open A Tuning?</h2>
        <p>
          <strong>Open A</strong> tunes the open strings to an A major chord.
          The form on this page — <strong>E A E A C♯ E</strong> — keeps the low
          E where it is and raises the middle of the instrument, which produces
          a bright, tightly strung sound well suited to electric slide.
        </p>
        <p>
          Be aware that "Open A" names two different tunings in common use. The
          other is Open G moved up a whole step (A E A C♯ E A), reached by
          raising all the Open G strings. Both sound an A major chord; they
          voice it differently and the shapes are not interchangeable. Older
          blues tabs usually mean the second.
        </p>

        <h2>Why Use Open A?</h2>
        <ul>
          <li>
            <strong>Bright slide tone:</strong> Higher tension gives a harder
            attack and more sustain under a slide than the looser open tunings.
          </li>
          <li>
            <strong>A is a natural blues key.</strong> Much of the blues
            repertoire sits in A, and an open tuning in the song's key means the
            open strings are always consonant.
          </li>
          <li>
            <strong>One-bar chord changes:</strong> Barre the 5th fret for D,
            the 7th for E. The I-IV-V of a blues in A is three positions.
          </li>
          <li>
            <strong>Ringing drones:</strong> Doubled A and E strings let you
            hold open drones under a melody.
          </li>
        </ul>

        <h2>Slide Positions in Open A</h2>
        <ul>
          <li>
            <strong>Open:</strong> A major
          </li>
          <li>
            <strong>5th fret:</strong> D major (the IV)
          </li>
          <li>
            <strong>7th fret:</strong> E major (the V)
          </li>
          <li>
            <strong>12th fret:</strong> A major, an octave up
          </li>
        </ul>

        <h2>Troubleshooting</h2>
        <p>
          <strong>A string broke while tuning up.</strong> Most likely string 3,
          moving a full whole step. Use a fresh set and go up in small
          increments, or drop a gauge.
        </p>
        <p>
          <strong>The chord sounds sour.</strong> Check the C♯ on string 2 — it
          is the only third in the voicing, so any error there colours the whole
          chord.
        </p>
        <p>
          <strong>The neck feels different and it buzzes.</strong> Added tension
          increases forward bow. A small truss rod adjustment fixes it if you
          stay in Open A.
        </p>

        <p>
          Related: <Link href="/open-g-tuner">Open G</Link> (the safer route to
          these pitches with a capo),{" "}
          <Link href="/open-e-tuner">Open E</Link> (the same raised-tension
          idea), and the full guide to{" "}
          <Link href="/articles/alternate-guitar-tunings">
            alternate guitar tunings
          </Link>
          .
        </p>
      </TunerPageLayout>
    </>
  );
}
