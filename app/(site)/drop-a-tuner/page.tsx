import { Metadata } from "next";
import Link from "next/link";
import TunerPageLayout from "@/components/TunerPageLayout";
import { otherTunersFor } from "@/lib/tunerPages";

export const metadata: Metadata = {
  title: "Drop A Tuner — Free Online 7-String Tuner",
  description:
    "Free online Drop A tuner for 7-string guitar. Tune to A E A D G B E with your microphone, right on this page — the low A at 55 Hz included. No download.",
  alternates: { canonical: "/drop-a-tuner" },
  openGraph: {
    title: "Drop A Tuner — 7-String Guitar",
    description:
      "Tune your 7-string guitar to Drop A using your device's microphone.",
  },
};

export default function DropATunerPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Drop A Tuner - GuitarTunePro",
    url: "https://www.guitartunepro.com/drop-a-tuner",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Free online Drop A tuner for 7-string guitar. Tune to A E A D G B E instantly.",
    browserRequirements: "Requires microphone access",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <TunerPageLayout
        title="Drop A Tuner (7-String)"
        description="Tune your 7-string guitar to Drop A (A E A D G B E) using your microphone. The tuner below is already set to 7-string Drop A — press Start Recording and pluck your low string."
        canonicalPath="/drop-a-tuner"
        initialGuitarType="sevenString"
        initialTuning="dropA"
        chartCaption="These are the exact target frequencies this tuner listens for, at A4 = 440 Hz equal temperament. String 7 is the low A; strings 6 to 1 are the same as standard tuning."
        otherTuners={otherTunersFor("/drop-a-tuner")}
        faqs={[
          {
            question: "What are the notes in Drop A tuning?",
            answer:
              "On a 7-string guitar, Drop A is A E A D G B E from the lowest string to the highest. Only string 7 changes: it drops a whole step from B to A. The other six strings stay in standard tuning.",
          },
          {
            question: "Can I play Drop A on a 6-string?",
            answer:
              "Yes, but it is a different tuning: A E A D F♯ B, which is B standard with the low string dropped a further whole step. It needs a baritone guitar or very heavy strings, around .014–.070. This page is set up for the far more common 7-string version.",
          },
          {
            question: "What gauge should the low A string be?",
            answer:
              "Most 7-string sets come with a .059 to .064 low B, which feels loose a whole step lower. For Drop A, players usually fit a .064 to .070 on a 25.5\" scale, or use a 26.5\" or 27\" scale guitar, which gets a firm low A from a lighter string.",
          },
          {
            question: "Why is the tuner slow to read the low A?",
            answer:
              "A1 is 55 Hz, two octaves below concert A and close to the bottom of what a phone microphone hears well. Pluck firmly over the neck pickup, mute the other strings, and hold the note for a second. Playing through an amp with the phone nearby helps.",
          },
          {
            question: "How do I play a power chord in Drop A?",
            answer:
              "Bar strings 7, 6 and 5 at the same fret with one finger. Because string 7 is a fifth below string 6, those three notes are a root, fifth and octave — exactly as in Drop D on a 6-string, only a fourth lower.",
          },
        ]}
        relatedArticles={[
          {
            title: "7 and 8-String Guitar Tuning",
            slug: "7-and-8-string-guitar-tuning",
            description: "Standard, drop and lowered tunings for extended-range guitars.",
          },
          {
            title: "Drop D Tuning Guide for Rock and Metal",
            slug: "drop-d-tuning-guide",
            description: "The six-string version of the same idea.",
          },
          {
            title: "Best Guitar Strings for Tuning Stability",
            slug: "best-guitar-strings-for-tuning-stability",
            description: "Picking a low string that holds pitch.",
          },
        ]}
      >
        <h2>How to Use This Drop A Tuner</h2>
        <ol>
          <li>
            Press <strong>Start Recording</strong> on the tuner above and allow
            microphone access.
          </li>
          <li>
            The tuner is already on <strong>7-String Guitar</strong> with the{" "}
            <strong>Drop A</strong> tuning selected.
          </li>
          <li>
            Check strings 6 to 1 first — they stay at standard E A D G B E.
          </li>
          <li>
            Lower string 7 a whole step from B (61.74&nbsp;Hz) to A
            (55.00&nbsp;Hz). Tune down past the note, then come back up to it so
            the string settles under tension.
          </li>
          <li>
            Recheck everything once. One string dropping a whole step barely
            moves the neck, so one pass is usually enough.
          </li>
        </ol>
        <p>
          A quick check by ear: the 7th fret of string 7 is an E, and it should
          match the open 6th string exactly. Any wobble in volume between the
          two means the low A is slightly off.
        </p>

        <h2>What is Drop A Tuning?</h2>
        <p>
          <strong>Drop A</strong> is the 7-string guitar&apos;s version of Drop D.
          Standard 7-string tuning is B E A D G B E, with every string a fourth
          apart except the major third between G and B. Dropping string 7 a
          whole step to A makes the gap between strings 7 and 6 a fifth instead
          of a fourth — and that one change turns the bottom three strings into
          a one-finger power chord.
        </p>
        <p>
          The low A is A1 at 55&nbsp;Hz, only a fourth above a 4-string bass&apos;s
          low E. That depth, with a fast, simple fingering for riffs, is why the
          tuning is so common in modern metal, djent and progressive music.
        </p>

        <h2>Setting Up a 7-String for Drop A</h2>
        <ul>
          <li>
            <strong>String 7 gauge:</strong> go up to a .064–.070. The others
            can stay as they are, because they do not change pitch.
          </li>
          <li>
            <strong>Nut slot:</strong> check the heavier string drops into the
            slot cleanly. A binding string jumps in pitch as you tune and
            refuses to come back to zero.
          </li>
          <li>
            <strong>Intonation:</strong> move string 7&apos;s saddle back a little
            for the heavier gauge. The other saddles stay put.
          </li>
          <li>
            <strong>Floating bridge:</strong> a single string changing does
            unbalance a Floyd Rose slightly. If you switch tunings often, a
            fixed bridge or a tremolo stopper saves time.
          </li>
        </ul>

        <h2>Going Lower</h2>
        <p>
          Many 7-string players go further: <strong>Drop G♯</strong> (Drop A
          tuned a semitone down) and <strong>Drop G</strong> are common, as is
          tuning the whole guitar down a whole step to A standard, A D G C F A
          D. All of them keep the same relationship between the strings, so a
          riff learned in Drop A plays in every one of them. Use the
          tuner&apos;s chromatic display to reach any of those notes, and the{" "}
          <Link href="/string-tension-calculator">string tension calculator</Link>{" "}
          to choose gauges that keep the feel.
        </p>

        <p>
          Related: <Link href="/7-string-guitar-tuner">7-string standard tuner</Link>,{" "}
          <Link href="/drop-b-tuner">Drop B tuner</Link> for 6-string, and the{" "}
          <Link href="/tunings">full tunings chart</Link>.
        </p>
      </TunerPageLayout>
    </>
  );
}
