import { Metadata } from "next";
import Link from "next/link";
import TunerPageLayout from "@/components/TunerPageLayout";
import { otherTunersFor } from "@/lib/tunerPages";

export const metadata: Metadata = {
  title: "C Standard Tuner — Free Online Guitar Tuner",
  description:
    "Free online C standard tuner. Tune your guitar two whole steps down to C F B♭ E♭ G C with your microphone, right on this page. Same chord shapes, no download.",
  alternates: { canonical: "/c-standard-tuner" },
  openGraph: {
    title: "C Standard Tuner — Free Online Guitar Tuner",
    description:
      "Tune every string down two whole steps to C standard using your device's microphone.",
  },
};

export default function CStandardTunerPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "C Standard Tuner - GuitarTunePro",
    url: "https://www.guitartunepro.com/c-standard-tuner",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Free online C standard guitar tuner. Tune your guitar to C F B♭ E♭ G C instantly.",
    browserRequirements: "Requires microphone access",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <TunerPageLayout
        title="C Standard Tuner"
        description="Tune your guitar to C standard (C F B♭ E♭ G C) using your microphone. The tuner below is already set to C standard — press Start Recording and pluck a string."
        canonicalPath="/c-standard-tuner"
        initialTuning="cStandard"
        otherTuners={otherTunersFor("/c-standard-tuner")}
        faqs={[
          {
            question: "What are the notes in C standard tuning?",
            answer:
              "C F B♭ E♭ G C, from the lowest string to the highest. Every string is two whole steps (four semitones) below standard E A D G B E, so the intervals between the strings are exactly the same as standard tuning.",
          },
          {
            question: "Why does the tuner show A♯ and D♯ instead of B♭ and E♭?",
            answer:
              "They are the same pitches. A♯ and B♭ are one note with two names, and so are D♯ and E♭. Guitarists usually write C standard with flats, because it is a flat key, but the tuner names every note with sharps so it reads the same in every tuning.",
          },
          {
            question: "Do chord shapes change in C standard?",
            answer:
              "No. Because every string moves by the same amount, an open E shape still looks like an E chord — it just sounds as a C. Tabs written for C standard use the same fret numbers you would play in standard tuning.",
          },
          {
            question: "What string gauge do I need for C standard?",
            answer:
              "On a 25.5\" scale guitar, a .012–.056 set is the usual starting point, and many players go to .013–.062 for a firmer low C. On a shorter 24.75\" scale, go a step heavier again. A normal .010 set tuned this low will flap, buzz and play out of tune.",
          },
          {
            question: "What is the difference between C standard and Drop C?",
            answer:
              "C standard lowers all six strings by two whole steps: C F B♭ E♭ G C. Drop C is D standard with only the low string dropped to C: C G C F A D. Drop C gives one-finger power chords; C standard keeps normal chord shapes. The low note is the same C in both.",
          },
        ]}
        relatedArticles={[
          {
            title: "Best Guitar Strings for Tuning Stability",
            slug: "best-guitar-strings-for-tuning-stability",
            description: "Gauge, material and winding choices for low tunings.",
          },
          {
            title: "How to Intonate Your Guitar",
            slug: "how-to-intonate-your-guitar",
            description: "Reset intonation after a big gauge or tuning change.",
          },
          {
            title: "Alternate Guitar Tunings You Should Try",
            slug: "alternate-guitar-tunings",
            description: "What each family of tunings is for.",
          },
        ]}
      >
        <h2>How to Use This C Standard Tuner</h2>
        <ol>
          <li>
            Press <strong>Start Recording</strong> on the tuner above and allow
            microphone access.
          </li>
          <li>
            The <strong>C Standard</strong> preset is already selected.
          </li>
          <li>
            Bring every string down four semitones: E→C, A→F, D→B♭, G→E♭,
            B→G and E→C. The tuner shows B♭ as A♯ and E♭ as D♯.
          </li>
          <li>
            Go round all six strings at least three times. Taking this much
            tension off the neck lets it straighten, so the strings you tuned
            first will have drifted flat by the time you finish.
          </li>
        </ol>
        <p>
          The low C is 65.41&nbsp;Hz, the same note as a cello&apos;s lowest
          string. If the needle wanders on it, pluck firmly over the neck
          pickup, mute the other strings and let the note ring for a second
          before you read it.
        </p>

        <h2>What is C Standard Tuning?</h2>
        <p>
          <strong>C standard</strong> is standard tuning moved down two whole
          steps: <strong>C F B♭ E♭ G C</strong>, low to high. Every string keeps
          its relationship to its neighbours — fourths, with a major third
          between the G and B strings — so every scale pattern and chord shape
          you know still works. Only the pitch changes.
        </p>
        <p>
          It sits at the bottom of the lowered-standard family. Above it are{" "}
          <Link href="/half-step-down-tuner">half step down</Link> (E♭),{" "}
          <Link href="/full-step-down-tuner">full step down</Link> (D standard)
          and C♯ standard; below it is{" "}
          <Link href="/b-standard-tuner">B standard</Link>, which is where most
          six-string guitars run out of room and baritones take over.
        </p>

        <h2>Who Uses C Standard</h2>
        <p>
          C standard is the home of stoner rock, sludge and doom, where the
          point is a huge, slow low end rather than speed. Josh Homme has used
          it across much of the Queens of the Stone Age catalogue. It is also
          one semitone below the C♯ standard Tony Iommi used on Black
          Sabbath&apos;s <em>Master of Reality</em>, which is why so many bands
          influenced by that record ended up a step or two lower than standard.
        </p>
        <p>
          It also suits singers. A song that sits uncomfortably high in E can
          drop four semitones without anyone relearning it, which is the same
          reason blues and rock players use half step down.
        </p>

        <h2>Setting Up a Guitar for C Standard</h2>
        <ol>
          <li>
            <strong>Fit heavier strings first.</strong> Tension falls with the
            square of the pitch, so four semitones down costs each string about
            37% of its tension. A .012–.056 or .013–.062 set gets most of it
            back. The{" "}
            <Link href="/string-tension-calculator">
              string tension calculator
            </Link>{" "}
            will show the numbers for your exact gauges.
          </li>
          <li>
            <strong>Check the nut.</strong> A .056 or .062 low string may not fit
            a nut cut for a .046. If it binds, the string will stick and ping
            as you tune; have the slot opened rather than forcing it.
          </li>
          <li>
            <strong>Adjust the truss rod.</strong> Even with heavier strings,
            the pull on the neck changes. Check relief after a day and adjust if
            the neck has moved.
          </li>
          <li>
            <strong>Reset the intonation.</strong> Heavier strings need the
            saddles further back. Use the{" "}
            <Link href="/intonation-checker">intonation checker</Link> to see
            which way each one should move.
          </li>
        </ol>

        <h2>Troubleshooting</h2>
        <p>
          <strong>Chords sound sour above the 7th fret.</strong> The open
          strings are in tune but the intonation is not. That is a setup job,
          not a tuning problem — see step 4 above.
        </p>
        <p>
          <strong>The low string rattles against the frets.</strong> Either the
          string is too light for this pitch or the action is too low for its
          wider swing. Fix the gauge first, then raise the bridge slightly.
        </p>
        <p>
          <strong>It keeps going flat.</strong> New strings stretch, and so
          does a neck that has just lost a lot of tension. Stretch each string
          gently along its length and retune two or three times in the first
          hour.
        </p>

        <p>
          Related: <Link href="/drop-c-tuner">Drop C tuner</Link> (the same low
          C with power-chord tuning on top),{" "}
          <Link href="/b-standard-tuner">B standard tuner</Link>, and the{" "}
          <Link href="/tunings">full tunings chart</Link>.
        </p>
      </TunerPageLayout>
    </>
  );
}
