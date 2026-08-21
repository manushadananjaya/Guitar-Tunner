import { Metadata } from "next";
import Link from "next/link";
import TunerPageLayout from "@/components/TunerPageLayout";
import { otherTunersFor } from "@/lib/tunerPages";

export const metadata: Metadata = {
  title: "Open C Tuner — Free Online Open C Guitar Tuner",
  description:
    "Free online Open C guitar tuner. Tune to Open C (C G C G C E) with your microphone, right on this page. The deep, resonant fingerstyle tuning.",
  alternates: { canonical: "/open-c-tuner" },
  openGraph: {
    title: "Open C Tuner — Free Online Open C Guitar Tuner",
    description:
      "Tune your guitar to Open C quickly and accurately using your device's microphone.",
  },
};

export default function OpenCTunerPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Open C Tuner - GuitarTunePro",
    url: "https://www.guitartunepro.com/open-c-tuner",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Free online Open C guitar tuner. Tune your guitar to Open C (C G C G C E) instantly.",
    browserRequirements: "Requires microphone access",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <TunerPageLayout
        title="Open C Tuner"
        description="Tune your guitar to Open C (C G C G C E) using your microphone. The tuner below is already set to Open C — press Start Recording and strum."
        canonicalPath="/open-c-tuner"
        initialTuning="openC"
        otherTuners={otherTunersFor("/open-c-tuner")}
        faqs={[
          {
            question: "What are the notes in Open C tuning?",
            answer:
              "Open C is C G C G C E from lowest to highest string. Strumming all six open strings sounds a C major chord spread across three octaves.",
          },
          {
            question: "Which strings change from standard tuning?",
            answer:
              "Five of six change. The 6th string E drops two whole steps to C, the 5th string A drops to G, the 4th string D drops to C, the 3rd string G stays, the 2nd string B rises a semitone to C, and the 1st string E stays. Only strings 3 and 1 are untouched.",
          },
          {
            question: "Do I need heavier strings for Open C?",
            answer:
              "For the low strings, yes. The 6th string drops a full fourth from E2 to C2, which leaves a standard .046 far too slack. A heavy-bottom set, or a custom set with a .056 or heavier 6th string, is close to essential if you want the low C to speak cleanly rather than buzz.",
          },
          {
            question: "Is Open C good for beginners?",
            answer:
              "It is rewarding but not a good first alternate tuning. Five strings move, the low C needs a heavier gauge to work properly, and almost no standard-tuning shape transfers. Start with Drop D or Open G and come to Open C once you are comfortable retuning.",
          },
          {
            question: "Who uses Open C tuning?",
            answer:
              "It is strongly associated with modern acoustic fingerstyle — John Butler, Devin Townsend for heavy work, Ben Howard, and Jimmy Page on Friends and Bron-Yr-Aur. Soundgarden also used it on several tracks.",
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
            title: "Best Guitar Strings for Tuning Stability",
            slug: "best-guitar-strings-for-tuning-stability",
            description:
              "Gauge, material, and winding choices that hold pitch longer.",
          },
          {
            title: "How to Intonate Your Guitar",
            slug: "how-to-intonate-your-guitar",
            description:
              "Set intonation correctly after a gauge or tuning change.",
          },
        ]}
      >
        <h2>How to Use This Open C Tuner</h2>
        <ol>
          <li>
            Press <strong>Start Recording</strong> on the tuner above and allow
            microphone access.
          </li>
          <li>
            The <strong>Open C</strong> preset is already selected.
          </li>
          <li>
            Drop string 6 from E all the way down to C (65.41&nbsp;Hz) — two
            whole steps, the largest move of any tuning on this site.
          </li>
          <li>
            Drop string 5 from A to G (98.00&nbsp;Hz) and string 4 from D to C
            (130.81&nbsp;Hz).
          </li>
          <li>Leave string 3 alone — G is already correct.</li>
          <li>
            Raise string 2 from B to C (261.63&nbsp;Hz) — a semitone up, the
            only string that tightens.
          </li>
          <li>Leave string 1 alone — E is already correct.</li>
          <li>
            Strum, then run <strong>two or three</strong> more passes. Five
            strings moving, three of them a long way, means substantial tension
            change and a lot of settling.
          </li>
        </ol>

        <h2>What is Open C Tuning?</h2>
        <p>
          <strong>Open C</strong> tunes the strings to{" "}
          <strong>C G C G C E</strong>, sounding a C major chord across the full
          range of the instrument. It is the deepest of the common open tunings:
          the low C at 65.41&nbsp;Hz sits a full fourth below standard tuning's
          low E, close to the range of a baritone guitar.
        </p>
        <p>
          The voicing stacks three C's — C2, C3, and C4 — with two G's between
          them and a single E on top. That triple root over a doubled fifth is
          what gives Open C its enormous, piano-like resonance, and why it is so
          popular for solo acoustic arrangements that have to fill space on
          their own.
        </p>

        <h2>Why Guitarists Use Open C</h2>
        <ul>
          <li>
            <strong>Sheer depth.</strong> Nothing else in standard six-string
            territory sounds this big. For solo fingerstyle, the extra low end
            replaces a bass player.
          </li>
          <li>
            <strong>Sustained drones.</strong> Three C's and two G's ringing
            open means you can hold a pedal tone under almost anything.
          </li>
          <li>
            <strong>Simple shapes, huge sound.</strong> As with all open
            tunings, one or two fingers produce full chords, leaving your other
            fingers free for melody.
          </li>
          <li>
            <strong>Percussive playing.</strong> The slack low strings respond
            well to slapping and body percussion, which is why modern
            percussive fingerstyle players gravitate to it.
          </li>
        </ul>

        <h2>Famous Songs in Open C</h2>
        <ul>
          <li>
            <strong>Friends — Led Zeppelin:</strong> Jimmy Page's Open C
            arrangement, one of the earliest prominent uses in rock.
          </li>
          <li>
            <strong>Ocean — John Butler:</strong> A landmark of modern
            percussive fingerstyle, built on Open C's resonance.
          </li>
          <li>
            <strong>Burden of Tomorrow — The Tallest Man on Earth:</strong> Open
            C used for folk songwriting rather than instrumental display.
          </li>
          <li>
            <strong>Pretty Noose — Soundgarden:</strong> Chris Cornell applying
            Open C to heavy rock.
          </li>
        </ul>

        <h2>Starter Shapes</h2>
        <ul>
          <li>
            <strong>C major:</strong> all strings open.
          </li>
          <li>
            <strong>F major:</strong> barre the 5th fret.
          </li>
          <li>
            <strong>G major:</strong> barre the 7th fret.
          </li>
          <li>
            <strong>A minor:</strong> barre the 9th fret.
          </li>
          <li>
            <strong>Csus2:</strong> all open, but lift the 1st string — the E is
            the only third in the tuning, so muting it removes the tonality.
          </li>
        </ul>

        <h2>The String Gauge Problem</h2>
        <p>
          Open C asks more of your strings than any other tuning here. Dropping
          the 6th string from E2 to C2 removes roughly 40% of its tension. A
          standard .046 at that pitch is genuinely floppy — it will buzz against
          the frets, intonate unpredictably, and sound indistinct rather than
          deep.
        </p>
        <p>
          The fix is a heavier low end. Many Open C players use a custom set
          with a .056 to .060 on the 6th string while keeping normal gauges on
          top, which is why "heavy bottom" sets exist. After fitting them,
          expect to check neck relief and{" "}
          <Link href="/articles/how-to-intonate-your-guitar">
            reset the intonation
          </Link>
          .
        </p>

        <h2>Troubleshooting</h2>
        <p>
          <strong>The tuner cannot detect my low C.</strong> At 65.41&nbsp;Hz
          this is at the edge of what a laptop or phone microphone reproduces.
          Pluck firmly over the soundhole or neck pickup, mute the other
          strings, and let it ring for a full second.
        </p>
        <p>
          <strong>The low C sounds dull and buzzy rather than deep.</strong>{" "}
          Gauge problem, not tuning. See above.
        </p>
        <p>
          <strong>It will not settle.</strong> Three strings moving a long way
          shifts the neck substantially. Three full passes with hard strumming
          in between is normal for Open C, not excessive.
        </p>

        <p>
          If Open C is too much for your current strings, try{" "}
          <Link href="/open-d-tuner">Open D</Link> or{" "}
          <Link href="/open-g-tuner">Open G</Link> first — both give you the
          open-tuning experience with far less setup. Or read the full guide to{" "}
          <Link href="/articles/alternate-guitar-tunings">
            alternate guitar tunings
          </Link>
          .
        </p>
      </TunerPageLayout>
    </>
  );
}
