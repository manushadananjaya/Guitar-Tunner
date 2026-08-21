import { Metadata } from "next";
import Link from "next/link";
import TunerPageLayout from "@/components/TunerPageLayout";
import { otherInstrumentsFor } from "@/lib/instrumentPages";

export const metadata: Metadata = {
  title: "Ukulele Tuner — Free Online GCEA Ukulele Tuner",
  description:
    "Free online ukulele tuner. Tune your uke to standard GCEA with your microphone, right on this page. Works for soprano, concert, and tenor — no download.",
  alternates: { canonical: "/ukulele-tuner" },
  openGraph: {
    title: "Ukulele Tuner — Free Online GCEA Ukulele Tuner",
    description:
      "Tune your ukulele quickly and accurately using your device's microphone.",
  },
};

export default function UkuleleTunerPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Ukulele Tuner - GuitarTunePro",
    url: "https://www.guitartunepro.com/ukulele-tuner",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Free online ukulele tuner. Tune your ukulele to standard GCEA instantly.",
    browserRequirements: "Requires microphone access",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <TunerPageLayout
        title="Ukulele Tuner"
        description="Tune your ukulele to standard GCEA using your microphone. The tuner below is already set for ukulele — press Start Recording and pluck a string."
        canonicalPath="/ukulele-tuner"
        initialGuitarType="ukulele"
        chartCaption="These are the exact target frequencies this tuner listens for, at A4 = 440 Hz equal temperament. Note that string 4 (G) is not the lowest note — standard ukulele tuning is reentrant, so the G sits above the C and E."
        otherTuners={otherInstrumentsFor("/ukulele-tuner")}
        faqs={[
          {
            question: "What is standard ukulele tuning?",
            answer:
              "Standard ukulele tuning is G C E A, written from string 4 to string 1. The pitches are G4, C4, E4, and A4. It applies to soprano, concert, and tenor ukuleles alike.",
          },
          {
            question: "Why is the 4th string higher than the 3rd?",
            answer:
              "This is called reentrant tuning, and it is the defining feature of the ukulele's sound. The G string is tuned above the C and E rather than below them, so the strings do not run low to high in order. It is what gives the instrument its bright, jangly character rather than a small-guitar sound.",
          },
          {
            question: "What is low-G ukulele tuning?",
            answer:
              "Low G tunes the 4th string down an octave to G3 (196.00 Hz), making the ukulele linear rather than reentrant. It adds five semitones of low range and a fuller, more guitar-like tone, at the cost of the traditional bright uke sound. It needs a specific low-G string — retuning a standard G string down an octave will leave it unplayably slack.",
          },
          {
            question: "Do baritone ukuleles use GCEA?",
            answer:
              "No. Baritone ukuleles tune D G B E, the same as the top four strings of a guitar. This page tunes standard GCEA, so it does not apply to baritones — though you can switch the instrument selector above to a guitar and tune the D, G, B, and E strings.",
          },
          {
            question: "Why does my new ukulele keep going out of tune?",
            answer:
              "Nylon strings stretch far more than steel, and a new set can take several days to a week of regular playing to settle. This is entirely normal. Speed it up by gently stretching each string along its length after tuning, then retuning, and repeating a few times.",
          },
        ]}
        relatedArticles={[
          {
            title: "How to Use a Chromatic Tuner",
            slug: "how-to-use-a-chromatic-tuner",
            description:
              "Reading cents, needles, and note names on any chromatic tuner.",
          },
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
        ]}
      >
        <h2>How to Use This Ukulele Tuner</h2>
        <ol>
          <li>
            Press <strong>Start Recording</strong> on the tuner above and allow
            microphone access.
          </li>
          <li>
            The <strong>Ukulele</strong> instrument is already selected.
          </li>
          <li>
            Pluck string 4 (G, 392.00&nbsp;Hz) and turn its peg until the needle
            centres at 0 cents.
          </li>
          <li>
            Work across to string 3 (C, 261.63&nbsp;Hz), string 2 (E,
            329.63&nbsp;Hz), and string 1 (A, 440.00&nbsp;Hz).
          </li>
          <li>
            Run a second pass. Nylon strings settle quickly after adjustment,
            and the first strings you tuned will have moved.
          </li>
        </ol>
        <p>
          Ukuleles are much easier for a microphone to read than a bass or a
          down-tuned guitar — all four strings sit in the range where phone
          microphones are most sensitive. If a reading is unstable, it is
          usually background noise rather than the instrument.
        </p>

        <h2>Understanding Reentrant Tuning</h2>
        <p>
          The most confusing thing about ukulele tuning, and the thing that
          catches out every guitarist who picks one up, is that{" "}
          <strong>the strings are not ordered from low to high</strong>.
        </p>
        <p>
          On a guitar or bass, string 6 is the lowest and string 1 the highest,
          in strict order. On a standard ukulele, the pitches run{" "}
          <strong>G4 (392&nbsp;Hz), C4 (262&nbsp;Hz), E4 (330&nbsp;Hz), A4
          (440&nbsp;Hz)</strong>. The 4th string is the second highest note on
          the instrument, not the lowest. Only the C string is lower than the G
          above it.
        </p>
        <p>
          This is called <strong>reentrant tuning</strong>, and it is deliberate.
          Because all four strings sit within a single octave, strummed chords
          have no clear bass note and every string contributes roughly equally.
          That is the source of the ukulele's characteristic bright, chiming,
          slightly ambiguous sound. Tune it linearly and it starts to sound like
          a very small guitar instead.
        </p>
        <p>
          It also has a practical consequence for playing: because the pitches
          are not in order, chord voicings on a uke are not simply
          transpositions of guitar shapes, and melody played across strings
          moves in unexpected directions.
        </p>

        <h2>Does Ukulele Size Change the Tuning?</h2>
        <p>Mostly no. The three common sizes all use standard GCEA:</p>
        <ul>
          <li>
            <strong>Soprano</strong> (about 21 inches) — the original size, and
            the brightest.
          </li>
          <li>
            <strong>Concert</strong> (about 23 inches) — slightly larger body
            and longer scale, a little more volume and sustain.
          </li>
          <li>
            <strong>Tenor</strong> (about 26 inches) — fuller tone, more room
            between frets, popular with fingerstyle players.
          </li>
        </ul>
        <p>
          The exception is the <strong>baritone</strong> (about 30 inches), which
          tunes <strong>D G B E</strong> — identical to the top four strings of
          a guitar. If you have a baritone, this page's preset will not fit it.
        </p>

        <h2>High G vs. Low G</h2>
        <p>
          The one real choice in ukulele tuning is what to do with the 4th
          string:
        </p>
        <ul>
          <li>
            <strong>High G (standard, reentrant):</strong> G4 at 392&nbsp;Hz.
            Bright, traditional, and what this tuner is set to. Best for
            strumming and classic ukulele repertoire.
          </li>
          <li>
            <strong>Low G (linear):</strong> G3 at 196&nbsp;Hz, an octave down.
            Adds range below the C string and gives a fuller sound suited to
            fingerstyle and solo arrangement.
          </li>
        </ul>
        <p>
          Switching to low G requires a dedicated low-G string, usually wound
          rather than plain nylon. You cannot simply tune a standard G string
          down an octave — it would be far too slack to sound. Some ukuleles
          also need the nut slot widened to take the thicker string.
        </p>

        <h2>Troubleshooting</h2>
        <p>
          <strong>My ukulele will not hold its tuning.</strong> If the strings
          are new, this is expected and will resolve within a week. Nylon
          stretches substantially before it stabilises.
        </p>
        <p>
          <strong>Chords sound wrong even when every string reads 0 cents.</strong>{" "}
          Check the intonation by comparing the 12th-fret harmonic against the
          fretted 12th-fret note. Inexpensive ukuleles frequently have
          intonation problems, and no amount of tuning corrects them.
        </p>
        <p>
          <strong>The tuner shows the G as higher than the C, and I think
          that's wrong.</strong> It is correct — see the reentrant tuning section
          above. This is the single most common ukulele tuning confusion.
        </p>

        <p>
          Also available: our <Link href="/bass-tuner">bass tuner</Link>,{" "}
          <Link href="/12-string-guitar-tuner">12-string guitar tuner</Link>,
          and the <Link href="/">free chromatic guitar tuner</Link>.
        </p>
      </TunerPageLayout>
    </>
  );
}
