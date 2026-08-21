import { Metadata } from "next";
import Link from "next/link";
import TunerPageLayout from "@/components/TunerPageLayout";
import { otherTunersFor } from "@/lib/tunerPages";

export const metadata: Metadata = {
  title: "Open D Tuner — Free Online Open D Guitar Tuner",
  description:
    "Free online Open D guitar tuner. Tune to Open D (D A D F♯ A D) with your microphone, right on this page. The classic slide and fingerstyle tuning.",
  alternates: { canonical: "/open-d-tuner" },
  openGraph: {
    title: "Open D Tuner — Free Online Open D Guitar Tuner",
    description:
      "Tune your guitar to Open D quickly and accurately using your device's microphone.",
  },
};

export default function OpenDTunerPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Open D Tuner - GuitarTunePro",
    url: "https://www.guitartunepro.com/open-d-tuner",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Free online Open D guitar tuner. Tune your guitar to Open D (D A D F♯ A D) instantly.",
    browserRequirements: "Requires microphone access",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <TunerPageLayout
        title="Open D Tuner"
        description="Tune your guitar to Open D (D A D F♯ A D) using your microphone. The tuner below is already set to Open D — press Start Recording and strum."
        canonicalPath="/open-d-tuner"
        initialTuning="openD"
        otherTuners={otherTunersFor("/open-d-tuner")}
        faqs={[
          {
            question: "What are the notes in Open D tuning?",
            answer:
              "Open D is D A D F♯ A D from lowest to highest string. Strumming all six open strings sounds a D major chord.",
          },
          {
            question: "Which strings change from standard tuning?",
            answer:
              "Four of six change, all downward: the 6th string E drops to D, the 3rd string G drops to F♯, the 2nd string B drops to A, and the 1st string E drops to D. Only the 5th string (A) and 4th string (D) stay where they are.",
          },
          {
            question: "What is the difference between Open D and Open E?",
            answer:
              "They are the same interval pattern, two semitones apart. Open E is Open D moved up a whole step, so every shape transfers directly between them. Open D is reached by loosening strings, Open E by tightening them — which is why most players prefer Open D and use a capo at the 2nd fret when they need the pitch of Open E.",
          },
          {
            question: "Is Open D the same as Vestapol tuning?",
            answer:
              "Yes. Vestapol is the traditional blues and folk name for Open D, taken from the 19th-century parlour piece Sebastopol that popularised it. You may also see it called D major tuning.",
          },
          {
            question: "Why does Open D suit slide guitar so well?",
            answer:
              "Because the open strings already form a major chord, a slide laid flat across any fret produces a clean major chord at that position. You get the whole I-IV-V of a blues from three slide positions — open, 5th fret, and 7th fret — with no fretting shapes at all.",
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
            title: "How to Tune a Guitar by Ear",
            slug: "how-to-tune-a-guitar-by-ear",
            description:
              "Train your ear with relative tuning and harmonic methods.",
          },
          {
            title: "Best Guitar Strings for Tuning Stability",
            slug: "best-guitar-strings-for-tuning-stability",
            description:
              "Gauge, material, and winding choices that hold pitch longer.",
          },
        ]}
      >
        <h2>How to Use This Open D Tuner</h2>
        <ol>
          <li>
            Press <strong>Start Recording</strong> on the tuner above and allow
            microphone access.
          </li>
          <li>
            The <strong>Open D</strong> preset is already selected.
          </li>
          <li>
            Drop string 6 from E to D (73.42&nbsp;Hz) — a full whole step, the
            largest single move on this page.
          </li>
          <li>
            Leave strings 5 and 4 alone. They are already A and D.
          </li>
          <li>
            Drop string 3 from G to F♯ (185.00&nbsp;Hz) — only a semitone. This
            is the string that makes the chord major rather than suspended, so
            get it exact.
          </li>
          <li>
            Drop string 2 from B to A (220.00&nbsp;Hz) and string 1 from E to D
            (293.66&nbsp;Hz).
          </li>
          <li>
            Strum all six open strings. You should hear a full, ringing D major.
            Then run a second pass — four loosened strings release enough
            tension that the neck shifts.
          </li>
        </ol>

        <h2>What is Open D Tuning?</h2>
        <p>
          <strong>Open D tuning</strong> tunes the guitar so that the six open
          strings sound a D major chord: <strong>D A D F♯ A D</strong>. It is
          the deepest and most resonant of the common open tunings, and along
          with Open G it forms the backbone of acoustic blues and slide
          playing.
        </p>
        <p>
          The tuning stacks three D's across the range of the instrument — D2,
          D3, and D4 — which is why it sounds so much bigger than standard
          tuning. That tripled root is doing the work; the A's supply the fifth
          and the lone F♯ on string 3 supplies the major third.
        </p>

        <h2>Open D vs. Open G — Which Should You Learn?</h2>
        <p>
          They are the two standard slide tunings and they suit different
          material:
        </p>
        <ul>
          <li>
            <strong>Open D is darker and heavier.</strong> With the root on the
            lowest string it has a deep, cavernous quality — the sound of
            Delta blues and of Joni Mitchell's open-tuned writing.
          </li>
          <li>
            <strong>Open G is brighter and more rhythmic.</strong> Its lowest
            note is the fifth, not the root, which gives it a lighter, more
            propulsive feel — the Rolling Stones sound.
          </li>
          <li>
            <strong>Open D loosens more strings.</strong> Four strings drop in
            Open D versus three in Open G, so Open D goes slacker and is more
            prone to buzzing on a light string set.
          </li>
        </ul>
        <p>
          Most slide players eventually learn both. If you only learn one and
          you play acoustic blues or fingerstyle, start with Open D.
        </p>

        <h2>Famous Songs in Open D</h2>
        <ul>
          <li>
            <strong>Big Yellow Taxi — Joni Mitchell:</strong> Mitchell built
            much of her catalogue on open tunings; this one is Open D with a
            capo.
          </li>
          <li>
            <strong>Little Martha — The Allman Brothers Band:</strong> Duane
            Allman's fingerpicked instrumental, one of the most beautiful pieces
            written in Open D.
          </li>
          <li>
            <strong>Street Fighting Man — Rolling Stones:</strong> Keith
            Richards in Open D rather than his usual Open G.
          </li>
          <li>
            <strong>Death Letter — Son House:</strong> Delta blues slide
            playing, and a direct line back to where this tuning came from.
          </li>
        </ul>

        <h2>Chord Shapes in Open D</h2>
        <p>
          The reason Open D is worth learning is how little you have to do to
          get a lot:
        </p>
        <ul>
          <li>
            <strong>D major:</strong> all strings open.
          </li>
          <li>
            <strong>G major:</strong> barre the 5th fret.
          </li>
          <li>
            <strong>A major:</strong> barre the 7th fret.
          </li>
          <li>
            <strong>B minor:</strong> barre the 9th fret.
          </li>
        </ul>
        <p>
          That gives you the I, IV, V, and vi of the key of D from four bar
          positions, which is enough for a very large number of songs.
        </p>

        <h2>Troubleshooting</h2>
        <p>
          <strong>The chord sounds slightly sour when strummed.</strong> The F♯
          on string 3 is almost always the culprit. It is the only third in the
          chord, so any error in it is exposed across the whole voicing. Retune
          that string to exactly 0 cents.
        </p>
        <p>
          <strong>Buzzing on the low D.</strong> Open D drops four strings, so a
          light gauge set can end up slapping the frets. A medium set, or a
          slightly higher action, solves it on a guitar kept in Open D.
        </p>
        <p>
          <strong>It will not stay in tune.</strong> Give it two full passes and
          a few hard strums to settle. If it still drifts, the strings are
          binding in the nut slots — a common issue after a large retune.
        </p>

        <p>
          Related tunings worth trying:{" "}
          <Link href="/open-e-tuner">Open E</Link> (the same shapes a whole step
          higher),{" "}
          <Link href="/dadgad-tuner">DADGAD</Link> (Open D's suspended cousin),
          and <Link href="/open-g-tuner">Open G</Link>. Or read the full guide to{" "}
          <Link href="/articles/alternate-guitar-tunings">
            alternate guitar tunings
          </Link>
          .
        </p>
      </TunerPageLayout>
    </>
  );
}
