import { Metadata } from "next";
import { languageAlternates } from "@/lib/i18n/pages";
import Link from "next/link";
import TunerPageLayout from "@/components/TunerPageLayout";
import { otherTunersFor } from "@/lib/tunerPages";

export const metadata: Metadata = {
  title: "Open E Tuner — Free Online Open E Guitar Tuner",
  description:
    "Free online Open E guitar tuner. Tune to Open E (E B E G♯ B E) with your microphone, right on this page. The bright slide tuning of Duane Allman.",
  alternates: {
    canonical: "/open-e-tuner",
    languages: languageAlternates("/open-e-tuner"),
  },
  openGraph: {
    title: "Open E Tuner — Free Online Open E Guitar Tuner",
    description:
      "Tune your guitar to Open E quickly and accurately using your device's microphone.",
  },
};

export default function OpenETunerPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Open E Tuner - GuitarTunePro",
    url: "https://www.guitartunepro.com/open-e-tuner",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Free online Open E guitar tuner. Tune your guitar to Open E (E B E G♯ B E) instantly.",
    browserRequirements: "Requires microphone access",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <TunerPageLayout
        title="Open E Tuner"
        description="Tune your guitar to Open E (E B E G♯ B E) using your microphone. The tuner below is already set to Open E — press Start Recording and strum."
        canonicalPath="/open-e-tuner"
        initialTuning="openE"
        otherTuners={otherTunersFor("/open-e-tuner")}
        faqs={[
          {
            question: "What are the notes in Open E tuning?",
            answer:
              "Open E is E B E G♯ B E from lowest to highest string. Strumming all six open strings sounds an E major chord.",
          },
          {
            question: "Which strings change from standard tuning?",
            answer:
              "Three strings are raised: the 5th string A goes up a whole step to B, the 4th string D goes up a whole step to E, and the 3rd string G goes up a semitone to G♯. Strings 6, 2, and 1 are unchanged.",
          },
          {
            question: "Is Open E dangerous for my guitar?",
            answer:
              "It carries real risk on some instruments, because three strings are tightened rather than loosened — the only common tuning that increases total neck tension. On a vintage or lightly built acoustic, this can stress the top and neck. Many players use Open D with a capo at the 2nd fret instead, which produces the same pitches at safe tension.",
          },
          {
            question: "What is the difference between Open E and Open D?",
            answer:
              "They are the same tuning shape, a whole step apart. Every chord shape, slide position, and riff transfers directly between them. The practical difference is how you get there: Open D loosens four strings, Open E tightens three.",
          },
          {
            question: "Should I use lighter strings for Open E?",
            answer:
              "Yes, if you tune to Open E directly. Going down one gauge offsets the added tension from the three raised strings and brings the total load back near normal. This is the standard precaution for players who keep a guitar in Open E.",
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
            title: "Best Guitar Strings for Tuning Stability",
            slug: "best-guitar-strings-for-tuning-stability",
            description:
              "Gauge, material, and winding choices that hold pitch longer.",
          },
        ]}
      >
        <h2>Read This Before You Tune</h2>
        <p>
          Open E is the one common tuning that{" "}
          <strong>increases tension on your guitar</strong>. Three strings go up
          in pitch, adding perhaps 15–20&nbsp;kg of total pull compared with
          standard tuning. On a solid-body electric this is generally fine. On a
          vintage acoustic, a lightly braced parlour guitar, or anything with a
          questionable neck joint, it is a genuine risk.
        </p>
        <p>
          The safe alternative that professional players use constantly: tune to{" "}
          <Link href="/open-d-tuner">Open D</Link> and put a capo at the 2nd
          fret. The pitches are identical to Open E, the shapes are identical,
          and the guitar is under less tension than standard tuning rather than
          more.
        </p>
        <p>
          If you do tune to Open E directly, drop one string gauge to
          compensate.
        </p>

        <h2>How to Use This Open E Tuner</h2>
        <ol>
          <li>
            Press <strong>Start Recording</strong> on the tuner above and allow
            microphone access.
          </li>
          <li>
            The <strong>Open E</strong> preset is already selected.
          </li>
          <li>
            Leave strings 6, 2, and 1 alone — E, B, and E are already correct.
          </li>
          <li>
            Raise string 5 from A up to B (123.47&nbsp;Hz). Go slowly and watch
            the needle; this is the string most likely to break.
          </li>
          <li>
            Raise string 4 from D up to E (164.81&nbsp;Hz), again slowly.
          </li>
          <li>
            Raise string 3 from G up to G♯ (207.65&nbsp;Hz) — only a semitone,
            but it is the third of the chord, so tune it precisely.
          </li>
          <li>
            Strum all six open strings for a full E major, then run a second
            pass.
          </li>
        </ol>
        <p>
          Raise pitch gradually. A string being tightened past its intended
          pitch has no warning before it snaps, and the 5th string moving a full
          whole step is the most exposed.
        </p>

        <h2>What is Open E Tuning?</h2>
        <p>
          <strong>Open E</strong> tunes the six open strings to an E major
          chord: <strong>E B E G♯ B E</strong>. It is the bright, cutting
          counterpart to Open D — same intervals, higher pitch, more tension,
          and a noticeably more aggressive attack because the strings are
          tighter.
        </p>
        <p>
          That tension is not only a liability. It is also why Open E sounds the
          way it does: tighter strings give a harder, more immediate response
          under a slide, which is exactly what electric slide blues wants.
        </p>

        <h2>Famous Players and Songs in Open E</h2>
        <ul>
          <li>
            <strong>Duane Allman:</strong> The definitive Open E slide player —
            Statesboro Blues and the slide work across the Allman Brothers
            catalogue.
          </li>
          <li>
            <strong>Derek Trucks:</strong> Plays almost exclusively in Open E,
            and is the modern reference point for the tuning.
          </li>
          <li>
            <strong>Jumpin' Jack Flash — Rolling Stones:</strong> Keith
            Richards stepping out of his usual Open G.
          </li>
          <li>
            <strong>Bob Dylan:</strong> Blood on the Tracks was largely written
            and recorded in Open E.
          </li>
        </ul>

        <h2>Slide Positions in Open E</h2>
        <p>
          Because the open strings form E major, a slide barred straight across
          any fret gives the major chord at that position:
        </p>
        <ul>
          <li>
            <strong>Open:</strong> E major
          </li>
          <li>
            <strong>5th fret:</strong> A major (the IV)
          </li>
          <li>
            <strong>7th fret:</strong> B major (the V)
          </li>
          <li>
            <strong>12th fret:</strong> E major, an octave up
          </li>
        </ul>
        <p>
          Three slide positions give you an entire blues in E. That economy is
          the whole reason open tunings exist.
        </p>

        <h2>Troubleshooting</h2>
        <p>
          <strong>A string broke while tuning up.</strong> Almost always the
          5th, going from A to B. Fit a fresh set, go up in small increments,
          and consider dropping a gauge before trying again.
        </p>
        <p>
          <strong>The chord sounds sharp or strained.</strong> Higher tension
          makes any intonation error more audible. Check the G♯ on string 3
          first — as the only third in the chord, it exposes everything.
        </p>
        <p>
          <strong>The action got lower and it buzzes.</strong> Extra tension
          pulls the neck into more forward bow, changing relief. A small truss
          rod adjustment corrects it, but this is another argument for the
          Open D plus capo approach.
        </p>

        <p>
          Safer alternative: <Link href="/open-d-tuner">Open D tuner</Link>. Or
          compare with <Link href="/open-g-tuner">Open G</Link> and read the
          full guide to{" "}
          <Link href="/articles/alternate-guitar-tunings">
            alternate guitar tunings
          </Link>
          .
        </p>
      </TunerPageLayout>
    </>
  );
}
