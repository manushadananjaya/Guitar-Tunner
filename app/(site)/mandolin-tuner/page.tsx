import { Metadata } from "next";
import { languageAlternates } from "@/lib/i18n/pages";
import Link from "next/link";
import TunerPageLayout from "@/components/TunerPageLayout";
import { otherInstrumentsFor } from "@/lib/instrumentPages";

export const metadata: Metadata = {
  title: "Mandolin Tuner — Free Online G D A E Tuner",
  description:
    "Free online mandolin tuner. Tune all eight strings to standard G D A E with your microphone, right on this page. Works for A-style and F-style mandolins.",
  alternates: {
    canonical: "/mandolin-tuner",
    languages: languageAlternates("/mandolin-tuner"),
  },
  openGraph: {
    title: "Mandolin Tuner — Free Online G D A E Tuner",
    description:
      "Tune your mandolin quickly and accurately using your device's microphone.",
  },
};

export default function MandolinTunerPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Mandolin Tuner - GuitarTunePro",
    url: "https://www.guitartunepro.com/mandolin-tuner",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Free online mandolin tuner. Tune your mandolin to standard G D A E instantly.",
    browserRequirements: "Requires microphone access",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <TunerPageLayout
        title="Mandolin Tuner"
        description="Tune your mandolin to G D A E using your microphone. The tuner below is already set for mandolin — press Start Recording and pluck one string at a time."
        canonicalPath="/mandolin-tuner"
        initialGuitarType="mandolin"
        chartCaption="These are the exact target frequencies this tuner listens for, at A4 = 440 Hz equal temperament. Each row is a course of two strings tuned to the same note, so both strings in a pair share one target. Course 1 is the highest."
        otherTuners={otherInstrumentsFor("/mandolin-tuner")}
        faqs={[
          {
            question: "What is standard mandolin tuning?",
            answer:
              "G D A E from lowest to highest — G3, D4, A4, E5. There are eight strings in four pairs, and both strings in each pair are tuned to the same note. These are exactly the same pitches as a violin.",
          },
          {
            question: "How do I tune both strings in a pair?",
            answer:
              "One at a time. Pluck just one string of the pair and tune it to 0 cents, then tune its partner the same way. If you pluck both together, the tuner hears two slightly different pitches at once and the needle will wobble. Once both are set, play the pair together: a clean, steady sound means they match; a fast shimmer or wobble means one is still off.",
          },
          {
            question: "Why does my mandolin go out of tune so quickly?",
            answer:
              "Eight strings at fairly high tension on a small instrument is a lot of load, and the floating bridge can shift slightly. New strings also stretch for the first few days. Check the tuning every time you pick it up, and gently stretch new strings along their length after the first tuning.",
          },
          {
            question: "Is this tuner suitable for a mandola or octave mandolin?",
            answer:
              "No. A mandola tunes C G D A (like a viola), and an octave mandolin tunes G D A E one octave lower than a mandolin. This page targets standard mandolin pitches only. For a mandola, the viola tuner targets the same notes.",
          },
          {
            question: "Can I use violin fingerings on a mandolin?",
            answer:
              "The notes are the same because the tuning is the same, which is why many fiddlers pick up mandolin quickly. The difference is that the mandolin is fretted and plucked, so the left-hand technique and the sound are quite different.",
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
            title: "How to Tune by Ear",
            slug: "how-to-tune-a-guitar-by-ear",
            description:
              "Listening for beats — the same skill that matches a mandolin pair.",
          },
          {
            title: "Why Your Guitar Goes Out of Tune",
            slug: "why-your-guitar-goes-out-of-tune",
            description:
              "The mechanical causes of pitch drift on any stringed instrument.",
          },
        ]}
      >
        <h2>How to Use This Mandolin Tuner</h2>
        <ol>
          <li>
            Press <strong>Start Recording</strong> on the tuner above and allow
            microphone access.
          </li>
          <li>
            The <strong>Mandolin</strong> instrument is already selected.
          </li>
          <li>
            Start with the G course (196.00&nbsp;Hz). Lightly rest a finger on
            one string of the pair to mute it, pluck the other, and tune it to
            0&nbsp;cents. Then swap and tune the second string.
          </li>
          <li>
            Repeat for the D course (293.66&nbsp;Hz), the A course
            (440.00&nbsp;Hz), and the E course (659.26&nbsp;Hz).
          </li>
          <li>
            Strum all four courses and run a second pass. With eight strings on
            a light body, the first strings you tuned will have moved.
          </li>
        </ol>
        <p>
          Muting one string of each pair is the key step. Two strings a few
          cents apart produce a beating sound, and the tuner hears that as an
          unstable pitch. Tune them individually and the needle settles at once.
        </p>

        <h2>Matching the Pairs</h2>
        <p>
          The mandolin&rsquo;s shimmering sound comes from the two strings in
          each course being <em>almost</em> perfectly matched. Once both strings
          of a pair read 0&nbsp;cents, play them together and listen. A clean,
          steady tone means they agree. A slow wobble means they are a cent or
          two apart; a fast shimmer means further. Nudge one string until the
          wobble slows and stops.
        </p>
        <p>
          This is the same &ldquo;listening for beats&rdquo; skill used to tune
          a guitar by ear, and a mandolin is one of the best instruments to
          learn it on, because every pair gives you a built-in reference.
        </p>

        <h2>The Floating Bridge</h2>
        <p>
          Almost every mandolin — A-style (teardrop) and F-style (scroll) alike
          — has a bridge that is not glued down. String pressure holds it in
          place, and its position sets the instrument&rsquo;s intonation. If it
          shifts, the open strings can still read perfectly in tune while notes
          higher up the neck come out sharp or flat.
        </p>
        <p>
          When you change strings, change them one at a time so the bridge
          stays put. If it does move, the correct position puts the 12th-fret
          note exactly one octave above the open string — the tuner above can
          check that for each course.
        </p>

        <h2>Troubleshooting</h2>
        <p>
          <strong>The needle never settles.</strong> You are almost certainly
          hearing both strings of a pair. Mute one and try again.
        </p>
        <p>
          <strong>The E strings keep breaking.</strong> They are thin and at
          high tension. Tune them up slowly, approach the target from below, and
          check the nut and bridge slots for sharp edges.
        </p>
        <p>
          <strong>Open strings are in tune but chords sound wrong.</strong>{" "}
          Check that the bridge has not moved. Compare each course&rsquo;s
          12th-fret note against its open string.
        </p>

        <p>
          Also available: our <Link href="/violin-tuner">violin tuner</Link>,{" "}
          <Link href="/banjo-tuner">banjo tuner</Link>, and the{" "}
          <Link href="/">chromatic guitar tuner</Link>.
        </p>
      </TunerPageLayout>
    </>
  );
}
