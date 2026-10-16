import { Metadata } from "next";
import { languageAlternates } from "@/lib/i18n/pages";
import Link from "next/link";
import TunerPageLayout from "@/components/TunerPageLayout";
import { otherTunersFor } from "@/lib/tunerPages";

export const metadata: Metadata = {
  title: "Drop C Tuner — Free Online Drop C Guitar Tuner",
  description:
    "Free online Drop C guitar tuner. Tune to Drop C (C G C F A D) with your microphone, right on this page. The metal and hardcore standard — no download.",
  alternates: {
    canonical: "/drop-c-tuner",
    languages: languageAlternates("/drop-c-tuner"),
  },
  openGraph: {
    title: "Drop C Tuner — Free Online Drop C Guitar Tuner",
    description:
      "Tune your guitar to Drop C quickly and accurately using your device's microphone.",
  },
};

export default function DropCTunerPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Drop C Tuner - GuitarTunePro",
    url: "https://www.guitartunepro.com/drop-c-tuner",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Free online Drop C guitar tuner. Tune your guitar to Drop C (C G C F A D) instantly.",
    browserRequirements: "Requires microphone access",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <TunerPageLayout
        title="Drop C Tuner"
        description="Tune your guitar to Drop C (C G C F A D) using your microphone. The tuner below is already set to Drop C — press Start Recording and pluck your low string."
        canonicalPath="/drop-c-tuner"
        initialTuning="dropC"
        otherTuners={otherTunersFor("/drop-c-tuner")}
        faqs={[
          {
            question: "What are the notes in Drop C tuning?",
            answer:
              "Drop C is C G C F A D from lowest to highest. It is full step down tuning (D G C F A D) with the 6th string dropped one further whole step, from D to C.",
          },
          {
            question: "Is Drop C just Drop D tuned lower?",
            answer:
              "Yes, exactly. Drop C has the identical interval pattern to Drop D, moved down a whole step. Every Drop D riff and shape transfers to Drop C unchanged — it just sounds two semitones lower.",
          },
          {
            question: "What string gauge do I need for Drop C?",
            answer:
              "A standard .009 or .010 set will feel unplayably slack. Most Drop C players use .011–.054 or a dedicated heavy bottom set such as .010–.052. Some go to .011–.056 for a tighter low C. Below that, the 6th string will buzz badly and intonate poorly.",
          },
          {
            question: "Will Drop C damage my guitar?",
            answer:
              "Retuning itself will not, but the tension change is significant enough to need setup work. Dropping this far reduces string pull on the neck, which lets the truss rod pull it backwards and lowers the action, causing fret buzz. Heavier strings offset that. Expect to adjust truss rod, action, and intonation.",
          },
          {
            question: "Can a floating tremolo handle Drop C?",
            answer:
              "Only with adjustment. A Floyd Rose or other floating bridge is balanced against spring tension, so changing string tension this much throws it out of level. You will need to loosen the claw screws, and probably remove a spring, to rebalance it.",
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
        <h2>How to Use This Drop C Tuner</h2>
        <ol>
          <li>
            Press <strong>Start Recording</strong> on the tuner above and allow
            microphone access.
          </li>
          <li>
            The <strong>Drop C</strong> preset is already selected.
          </li>
          <li>
            Start with strings 5 through 1 and bring each down one whole step:
            A→G, D→C, G→F, B→A, E→D.
          </li>
          <li>
            Finish with string 6, which drops <strong>two</strong> whole steps
            from E to C (65.41&nbsp;Hz). This is the largest single adjustment
            of any common tuning.
          </li>
          <li>
            Run at least two more full passes. You have removed a large amount
            of tension from the neck, and it will keep moving for several
            minutes.
          </li>
        </ol>
        <p>
          Tuning the low string last matters here. It is the string with the
          most travel, and if you drop it first, tuning the other five will pull
          it out again.
        </p>

        <h2>What is Drop C Tuning?</h2>
        <p>
          <strong>Drop C</strong> is <strong>C G C F A D</strong>, low to high.
          Despite the name, it is not simply standard tuning with the low string
          dropped to C — that would be C A D G B E, an unusable interval. Drop C
          is properly understood as{" "}
          <Link href="/full-step-down-tuner">full step down tuning</Link> with a
          Drop D move applied on top: every string down a whole step, then the
          6th string down a whole step again.
        </p>
        <p>
          The result keeps the defining Drop-tuning feature — the bottom three
          strings tuned in fourths and fifths so a power chord is a single
          finger bar — while putting the lowest note at C2, a full fourth below
          standard tuning's low E.
        </p>

        <h2>Why Metal and Hardcore Use Drop C</h2>
        <ul>
          <li>
            <strong>One-finger power chords, very low down.</strong> Strings 6,
            5, and 4 are a fifth and an octave above the root, so barring them
            at any fret gives a power chord. At this pitch, that is a heavy
            sound available at speed.
          </li>
          <li>
            <strong>Weight without a seven-string.</strong> Drop C's low C2
            (65.41&nbsp;Hz) sits close to the low B of a seven-string
            (61.74&nbsp;Hz), so you get most of the range on a normal guitar.
          </li>
          <li>
            <strong>Slack strings chug.</strong> Lower tension gives palm-muted
            notes a percussive, slightly detuned attack that is central to the
            genre's rhythm sound.
          </li>
          <li>
            <strong>Everything from Drop D transfers.</strong> Same shapes, same
            riffs, two semitones down.
          </li>
        </ul>

        <h2>Bands That Use Drop C</h2>
        <ul>
          <li>
            <strong>System of a Down:</strong> Chop Suey!, Toxicity, and much of
            their catalogue.
          </li>
          <li>
            <strong>Bullet for My Valentine:</strong> Drop C across most of
            their material.
          </li>
          <li>
            <strong>Killswitch Engage:</strong> A defining Drop C metalcore
            guitar sound.
          </li>
          <li>
            <strong>Bring Me the Horizon:</strong> Drop C on their earlier,
            heavier records.
          </li>
        </ul>

        <h2>Setting Up a Guitar for Drop C</h2>
        <p>
          This tuning genuinely needs a setup, not just a retune. Working in
          order:
        </p>
        <ol>
          <li>
            <strong>Strings first.</strong> Fit a heavier set — .011–.054 is the
            common choice. Do this before anything else, since every other
            adjustment depends on the tension.
          </li>
          <li>
            <strong>Truss rod.</strong> Less string pull means the neck may bow
            backwards, causing buzz. Check relief and loosen the rod a small
            amount if needed.
          </li>
          <li>
            <strong>Action.</strong> Slacker strings vibrate in a wider arc, so
            they need more clearance than standard tuning. Raise the bridge
            slightly.
          </li>
          <li>
            <strong>Intonation.</strong> Thicker strings and lower pitch both
            shift the intonation point. Reset it, or every chord above the 7th
            fret will sound wrong.{" "}
            <Link href="/articles/how-to-intonate-your-guitar">
              Full guide here.
            </Link>
          </li>
        </ol>
        <p>
          If you switch between standard and Drop C regularly, the honest answer
          is to keep a second guitar set up for it. A guitar optimised for one
          will always be a compromise in the other.
        </p>

        <h2>Troubleshooting</h2>
        <p>
          <strong>The low C is a floppy, buzzing mess.</strong> Your 6th string
          is too light. A .046 tuned to C2 has roughly half the tension it had
          at E2. You need at least a .054.
        </p>
        <p>
          <strong>The tuner cannot read my low string.</strong> C2 at
          65.41&nbsp;Hz is near the low end of what a phone microphone captures
          cleanly. Pluck firmly over the neck pickup rather than near the
          bridge, mute the other strings, and let the note ring a full second.
        </p>
        <p>
          <strong>Chords sound in tune open but wrong up the neck.</strong>{" "}
          That is an intonation problem, not a tuning problem. See the setup
          steps above.
        </p>

        <p>
          Related: <Link href="/drop-d-tuner">Drop D tuner</Link> (the same
          shapes, two semitones higher),{" "}
          <Link href="/full-step-down-tuner">full step down tuner</Link>, and{" "}
          <Link href="/half-step-down-tuner">half step down tuner</Link>.
        </p>
      </TunerPageLayout>
    </>
  );
}
