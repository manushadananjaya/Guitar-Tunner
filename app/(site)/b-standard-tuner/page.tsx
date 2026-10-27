import { Metadata } from "next";
import Link from "next/link";
import TunerPageLayout from "@/components/TunerPageLayout";
import { otherTunersFor } from "@/lib/tunerPages";

export const metadata: Metadata = {
  title: "B Standard Tuner — Free Online Baritone Tuner",
  description:
    "Free online B standard tuner. Tune your guitar or baritone to B E A D F♯ B with your microphone, right on this page. Standard shapes, a fourth lower.",
  alternates: { canonical: "/b-standard-tuner" },
  openGraph: {
    title: "B Standard Tuner — Free Online Guitar Tuner",
    description:
      "Tune a baritone or heavy-gauge guitar to B standard using your device's microphone.",
  },
};

export default function BStandardTunerPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "B Standard Tuner - GuitarTunePro",
    url: "https://www.guitartunepro.com/b-standard-tuner",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Free online B standard tuner for guitar and baritone guitar. Tune to B E A D F♯ B instantly.",
    browserRequirements: "Requires microphone access",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <TunerPageLayout
        title="B Standard Tuner"
        description="Tune your guitar to B standard (B E A D F♯ B) using your microphone. The tuner below is already set to B standard — press Start Recording and pluck a string."
        canonicalPath="/b-standard-tuner"
        initialTuning="bStandard"
        otherTuners={otherTunersFor("/b-standard-tuner")}
        faqs={[
          {
            question: "What are the notes in B standard tuning?",
            answer:
              "B E A D F♯ B, from the lowest string to the highest. It is standard tuning moved down five semitones — a perfect fourth — so string 5 ends up on E, the note string 6 normally plays.",
          },
          {
            question: "Is B standard the same as a 7-string's low strings?",
            answer:
              "No, and the difference catches people out. A 7-string's lowest six strings are B E A D G B; B standard is B E A D F♯ B. The top two strings differ, because B standard keeps the major third between strings 3 and 2 where standard tuning has it. Tabs for one will not quite work in the other.",
          },
          {
            question: "Can I tune a normal guitar to B standard?",
            answer:
              "You can, but it needs strings around .013–.062 or .014–.068 on a 25.5\" scale, and even then the low B feels loose. A baritone guitar, with a 27\" or longer scale, is built for this range and B standard is its most common tuning.",
          },
          {
            question: "Why does the tuner struggle with the low B?",
            answer:
              "B1 is 61.74 Hz, near the bottom of what phone and laptop microphones pick up cleanly. Pluck firmly over the neck pickup, mute the other strings and let the note ring. Plugging in and holding the phone near the amp helps a lot.",
          },
          {
            question: "Do I need to relearn chords in B standard?",
            answer:
              "No. Every string moves down by the same amount, so every shape is unchanged. An open E shape sounds as a B chord, and an A shape sounds as an E.",
          },
        ]}
        relatedArticles={[
          {
            title: "7 and 8-String Guitar Tuning",
            slug: "7-and-8-string-guitar-tuning",
            description: "Extended-range tunings, and how they compare to a tuned-down six.",
          },
          {
            title: "Best Guitar Strings for Tuning Stability",
            slug: "best-guitar-strings-for-tuning-stability",
            description: "What makes a heavy string hold its pitch.",
          },
          {
            title: "How to Intonate Your Guitar",
            slug: "how-to-intonate-your-guitar",
            description: "Essential after a big gauge change.",
          },
        ]}
      >
        <h2>How to Use This B Standard Tuner</h2>
        <ol>
          <li>
            Press <strong>Start Recording</strong> on the tuner above and allow
            microphone access.
          </li>
          <li>
            The <strong>B Standard</strong> preset is already selected.
          </li>
          <li>
            Each string drops five semitones: E→B, A→E, D→A, G→D, B→F♯ and
            E→B. If your guitar is strung for standard, change the strings
            before you start — see below.
          </li>
          <li>
            Tune all six, then go round again two or three more times. A neck
            that has just lost this much tension keeps moving for a while.
          </li>
        </ol>

        <h2>What is B Standard Tuning?</h2>
        <p>
          <strong>B standard</strong> is <strong>B E A D F♯ B</strong>: ordinary
          standard tuning moved down a perfect fourth. It keeps the guitar&apos;s
          usual shape — fourths between the strings, with a major third between
          strings 3 and 2 — so nothing you play changes except its pitch. The
          low B is B1, 61.74&nbsp;Hz, the same note as the low string of a
          standard 7-string guitar.
        </p>
        <p>
          It is the lowest of the lowered-standard tunings most players will
          meet, one step below <Link href="/c-standard-tuner">C standard</Link>.
          Below this, a six-string with normal construction really cannot cope,
          and players move to 7- and 8-string guitars instead.
        </p>

        <h2>Baritone Guitars</h2>
        <p>
          A baritone guitar is a six-string with a longer neck — usually a 27&quot;
          to 30&quot; scale instead of 25.5&quot; — built to sit lower. B standard
          is its most common tuning. The extra length is what makes it work:
          tension rises with the square of the scale length, so a 28&quot;
          baritone gets about 20% more tension from the same string at the same
          pitch. The low B is firm, intonation is easier to set, and the guitar
          still plays like a guitar.
        </p>
        <p>
          That is why baritones turn up in surf, twang and film music as well
          as metal: the sound is a deep guitar, not a bass, and a guitarist can
          pick one up and play it straight away.
        </p>

        <h2>B Standard on a Normal Guitar</h2>
        <p>
          It is possible on a 25.5&quot; or 25.5&quot;-plus scale guitar with the
          right strings, and many heavy bands do it. What to expect:
        </p>
        <ul>
          <li>
            <strong>Strings:</strong> .013–.062 at a minimum, .014–.068 if you
            want the low B to feel tight. Check the{" "}
            <Link href="/string-tension-calculator">string tension calculator</Link>{" "}
            for your gauges and scale.
          </li>
          <li>
            <strong>Nut:</strong> a .062 or .068 will not fit a nut slot cut
            for .046. Have it widened, or the string will bind and jump in
            pitch as you tune.
          </li>
          <li>
            <strong>Tremolo:</strong> a floating bridge will be completely
            unbalanced. Expect to change the spring setup.
          </li>
          <li>
            <strong>Intonation:</strong> the saddles will need to move back,
            possibly further than some bridges allow. The{" "}
            <Link href="/intonation-checker">intonation checker</Link> will
            tell you where each one should go.
          </li>
          <li>
            <strong>Shorter scales:</strong> on a 24.75&quot; guitar B standard
            is a real struggle. Consider C standard or{" "}
            <Link href="/drop-b-tuner">Drop B</Link> instead.
          </li>
        </ul>

        <h2>B Standard or Drop B?</h2>
        <p>
          Both reach the same low B. <Link href="/drop-b-tuner">Drop B</Link>{" "}
          (B F♯ B E G♯ C♯) keeps the top five strings higher, so it is less
          muddy, and gives one-finger power chords. B standard keeps every
          chord shape you know and makes the whole guitar sound low and dark.
          Choose by what you play: riff-based music suits Drop B; chords,
          arpeggios and anything written in standard tuning suit B standard.
        </p>

        <p>
          Related: <Link href="/7-string-guitar-tuner">7-string guitar tuner</Link>,{" "}
          <Link href="/drop-a-tuner">Drop A tuner</Link> for 7-string, and the{" "}
          <Link href="/tunings">full tunings chart</Link>.
        </p>
      </TunerPageLayout>
    </>
  );
}
