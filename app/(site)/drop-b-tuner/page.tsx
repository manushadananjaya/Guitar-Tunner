import { Metadata } from "next";
import { languageAlternates } from "@/lib/i18n/pages";
import Link from "next/link";
import TunerPageLayout from "@/components/TunerPageLayout";
import { otherTunersFor } from "@/lib/tunerPages";

export const metadata: Metadata = {
  title: "Drop B Tuner — Free Online Drop B Guitar Tuner",
  description:
    "Free online Drop B guitar tuner. Tune to Drop B (B F# B E G# C#) with your microphone, right on this page — plus the strings and setup a six-string needs.",
  alternates: {
    canonical: "/drop-b-tuner",
    languages: languageAlternates("/drop-b-tuner"),
  },
  openGraph: {
    title: "Drop B Tuner — Free Online Drop B Guitar Tuner",
    description:
      "Tune your guitar to Drop B with your microphone. Exact frequencies, string gauges and setup notes.",
  },
};

export default function DropBTunerPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Drop B Tuner - GuitarTunePro",
    url: "https://www.guitartunepro.com/drop-b-tuner",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Free online Drop B guitar tuner. Tune your guitar to Drop B (B F# B E G# C#) using your microphone.",
    browserRequirements: "Requires microphone access",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <TunerPageLayout
        title="Drop B Tuner"
        description="Tune your guitar to Drop B (B F♯ B E G♯ C♯) using your microphone. The tuner below is already set to Drop B — press Start Recording and pluck a string."
        canonicalPath="/drop-b-tuner"
        initialTuning="dropB"
        otherTuners={otherTunersFor("/drop-b-tuner")}
        faqs={[
          {
            question: "What are the notes in Drop B tuning?",
            answer:
              "B F# B E G# C#, from the lowest string to the highest. The low B is B1 at 61.74 Hz — the same note as the lowest string of a standard seven-string guitar.",
          },
          {
            question: "How is Drop B related to Drop D?",
            answer:
              "It is Drop D moved down three semitones. The intervals between the strings are identical, so every Drop D chord shape and riff works in Drop B, just a minor third lower. It is also C# standard (C# F# B E G# C#) with the 6th string dropped a whole step.",
          },
          {
            question: "What string gauge do I need for Drop B?",
            answer:
              "Heavier than most guitars ship with. On a 25.5-inch scale, .012–.056 is a practical minimum and many players use .013–.062 or a dedicated low-tuning set. On a 24.75-inch scale guitar the same strings feel looser, so go a step heavier again. With a standard .010 set the low B will flap and buzz.",
          },
          {
            question: "Is a baritone or seven-string better than a six-string in Drop B?",
            answer:
              "A baritone (around 27 inches or longer) is designed for this range, so the low B stays tight on normal-looking gauges. A seven-string gives you the low B while keeping standard tuning on the other six strings. A six-string in Drop B works well with the right strings and setup and is the cheapest way in.",
          },
          {
            question: "Can a phone microphone hear a low B?",
            answer:
              "Usually, with care. At 61.74 Hz the fundamental is weak on small microphones and the tuner partly reads its overtones. Pluck firmly, mute the other strings, hold the phone close to the guitar, and wait a moment for the reading to settle.",
          },
        ]}
        relatedArticles={[
          {
            title: "7 and 8-String Guitar Tuning",
            slug: "7-and-8-string-guitar-tuning",
            description:
              "The other way to reach a low B — and how drop tunings work on extended-range guitars.",
          },
          {
            title: "Best Guitar Strings for Tuning Stability",
            slug: "best-guitar-strings-for-tuning-stability",
            description:
              "Why heavier, well-stretched strings hold low tunings better.",
          },
          {
            title: "How to Intonate Your Guitar",
            slug: "how-to-intonate-your-guitar",
            description:
              "Essential after moving to heavier strings for Drop B.",
          },
        ]}
      >
        <h2>How to Use This Drop B Tuner</h2>
        <ol>
          <li>
            Press <strong>Start Recording</strong> on the tuner above and allow
            microphone access.
          </li>
          <li>
            The <strong>Drop B</strong> preset is already selected, so the tuner
            listens for B F♯ B E G♯ C♯.
          </li>
          <li>
            Lower strings 5 to 1 by three semitones each: A→F♯, D→B, G→E,
            B→G♯, E→C♯.
          </li>
          <li>
            Lower string 6 by five semitones, from E all the way to B
            (61.74&nbsp;Hz). Do this last — it is the biggest change and the
            one most likely to be pulled sharp again by the others.
          </li>
          <li>
            Make two or three more passes. Removing this much tension lets the
            neck straighten for several minutes, and every string drifts flat as
            it does.
          </li>
        </ol>
        <p>
          New strings stretch, and a big detune makes it worse. After fitting a
          fresh set for Drop B, tune up, pull each string gently away from the
          fretboard along its length, and tune again until it stops going flat.
        </p>

        <h2>What is Drop B Tuning?</h2>
        <p>
          <strong>Drop B</strong> is <strong>B F♯ B E G♯ C♯</strong>, low to
          high. Like every drop tuning, the bottom three strings form a fifth
          and an octave, so a one-finger barre across them makes a power chord
          and the open strings ring as a B5. The top five strings keep standard
          tuning&apos;s shape, three semitones down, so familiar chord shapes on
          them still work.
        </p>
        <p>
          The easiest way to place it: Drop B is to{" "}
          <Link href="/drop-c-tuner">Drop C</Link> what Drop C is to{" "}
          <Link href="/drop-d-tuner">Drop D</Link> — the same tuning, stepped
          further down. Its lowest note matches the B string a seven-string
          guitar adds, which is why it is often the first stop for players who
          want seven-string range without buying a seven-string.
        </p>

        <h2>Why Metal Uses Drop B</h2>
        <ul>
          <li>
            <strong>Range on six strings.</strong> B1 is a fourth below standard
            tuning&apos;s low E and the deepest common tuning a regular-scale
            six-string can hold well.
          </li>
          <li>
            <strong>Riffs from Drop D carry over.</strong> Same shapes, a minor
            third lower. A riff written in Drop D becomes heavier without being
            relearned.
          </li>
          <li>
            <strong>The chug.</strong> Heavy palm-muted low notes have a short,
            percussive attack at this pitch that defines a lot of modern metal
            and metalcore rhythm playing. Slipknot is a well-known example,
            with much of their catalogue in Drop B.
          </li>
        </ul>

        <h2>Strings and Setup for Drop B</h2>
        <p>
          String tension follows the square of the frequency, and Drop B takes
          a lot away. Strings 1 to 5 drop three semitones and keep only about{" "}
          <strong>71%</strong> of their standard tension; the 6th string drops
          five semitones and keeps about <strong>56%</strong>. On the strings a
          guitar left the factory with, that is the difference between a
          tight, focused low note and one that wobbles visibly.
        </p>
        <ol>
          <li>
            <strong>Fit heavier strings first.</strong> .012–.056 is a sensible
            starting point on a 25.5&Prime; scale; .013–.062 for a tighter low
            end. Shorter 24.75&Prime; and 24&Prime; scales need heavier still.
            The <Link href="/string-tension-calculator">string tension calculator</Link>{" "}
            shows what your set will feel like in Drop B and which gauges
            restore standard-tuning tension.
          </li>
          <li>
            <strong>Check the nut.</strong> A .056 or .062 low string may not
            fit a slot cut for a .046. If it sits on top of the slot or binds
            and pings as you tune, the slot needs widening — a job for a
            technician if you have not done it before.
          </li>
          <li>
            <strong>Adjust the truss rod.</strong> Heavier strings at lower
            pitch can leave the neck with a different amount of relief than
            before. Check for buzz in the middle of the neck and adjust slightly.
          </li>
          <li>
            <strong>Raise the action a little</strong> on the bass side. Lower
            tension means a wider vibration, and the low B needs room.
          </li>
          <li>
            <strong>Reset intonation.</strong> Thicker strings need their
            saddles moving back.{" "}
            <Link href="/intonation-checker">Check each string</Link> with the
            tuner, or follow the{" "}
            <Link href="/articles/how-to-intonate-your-guitar">intonation guide</Link>.
          </li>
        </ol>
        <p>
          If you play standard and Drop B in the same set, a second guitar set
          up for each will sound and play better than one guitar retuned
          between songs. Floating tremolos, in particular, need rebalancing
          every time.
        </p>

        <h2>Checking Drop B by Ear</h2>
        <p>
          With one string in tune you can check the rest. Fret the 6th string at
          the <strong>7th</strong> fret to match the open 5th string. Then 5th
          fret of the 5th matches the open 4th, 5th fret of the 4th matches the
          open 3rd, <strong>4th</strong> fret of the 3rd matches the open 2nd,
          and 5th fret of the 2nd matches the open 1st. For the low string on
          its own, its 12th-fret harmonic should match the open 4th string, B2,
          with no beating.
        </p>

        <h2>Troubleshooting</h2>
        <p>
          <strong>The low B buzzes against the frets.</strong> The string is
          too light for the pitch, or the action is too low for its wider swing.
          Go up a gauge before you raise the action.
        </p>
        <p>
          <strong>Every string goes flat a few minutes after tuning.</strong>{" "}
          The neck is still settling after losing tension, or new strings are
          still stretching. Retune a few times over ten minutes; it stops.
        </p>
        <p>
          <strong>The tuner jumps between B and an octave higher.</strong> It is
          hearing the overtone. Pluck nearer the neck, use your thumb, and let
          the note sustain.
        </p>

        <p>
          Related: <Link href="/drop-c-sharp-tuner">Drop C♯ tuner</Link>,{" "}
          <Link href="/drop-c-tuner">Drop C tuner</Link>, and the{" "}
          <Link href="/7-string-guitar-tuner">7-string guitar tuner</Link> for
          the same low B with standard tuning above it. Every tuning side by
          side: the <Link href="/tunings">guitar tunings chart</Link>.
        </p>
      </TunerPageLayout>
    </>
  );
}
