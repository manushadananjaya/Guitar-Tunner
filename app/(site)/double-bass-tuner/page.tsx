import { Metadata } from "next";
import Link from "next/link";
import TunerPageLayout from "@/components/TunerPageLayout";
import { otherInstrumentsFor } from "@/lib/instrumentPages";

export const metadata: Metadata = {
  title: "Double Bass Tuner — Free Upright Bass Tuner",
  description:
    "Free online double bass tuner. Tune your upright bass to E A D G with your microphone, right on this page — with harmonics for a clean read. No download.",
  alternates: { canonical: "/double-bass-tuner" },
  openGraph: {
    title: "Double Bass Tuner — Free Online Upright Bass Tuner",
    description:
      "Tune your double bass to orchestral E A D G using your device's microphone.",
  },
};

export default function DoubleBassTunerPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Double Bass Tuner - GuitarTunePro",
    url: "https://www.guitartunepro.com/double-bass-tuner",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Free online double bass tuner. Tune an upright bass to orchestral E A D G instantly.",
    browserRequirements: "Requires microphone access",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <TunerPageLayout
        title="Double Bass Tuner"
        description="Tune your double bass to E A D G using your microphone. The tuner below is already set for upright bass — press Start Recording and bow, pluck, or play a harmonic."
        canonicalPath="/double-bass-tuner"
        initialGuitarType="doubleBass"
        chartCaption="These are the exact target frequencies this tuner listens for, at A4 = 440 Hz equal temperament. The double bass sounds an octave lower than it is written, so its low E, written as E2, sounds as E1."
        otherTuners={otherInstrumentsFor("/double-bass-tuner")}
        faqs={[
          {
            question: "What are the notes of the double bass strings?",
            answer:
              "From lowest to highest: E1, A1, D2 and G2 — 41.20, 55.00, 73.42 and 98.00 Hz. The strings are tuned in fourths, unlike the violin, viola and cello, which are tuned in fifths. These are the same pitches as a 4-string bass guitar.",
          },
          {
            question: "Why tune a double bass with harmonics?",
            answer:
              "The open strings are so low that phone microphones, and many people's ears, struggle to judge them. Harmonics are one or two octaves higher, ring for a long time, and are easy to compare. The tuner recognises an octave harmonic and reads it against the string you selected.",
          },
          {
            question: "What is solo tuning?",
            answer:
              "Solo tuning raises every string a whole step, to F♯1 B1 E2 A2, using thinner solo strings. It makes the bass brighter and more resonant for solo repertoire, and the music is written a whole step lower so the fingering stays the same. This tuner is set to orchestral tuning; use the chromatic display to tune to solo pitches.",
          },
          {
            question: "My bass has a low C extension. Can I tune it here?",
            answer:
              "The four main strings, yes. A C extension lowers the E string to C1 (32.70 Hz), which is below what nearly any phone microphone can capture. Tune it by playing the harmonic at the middle of the string, C2, and matching that.",
          },
          {
            question: "How often should I tune an upright bass?",
            answer:
              "Every time you play. A double bass is a big wooden box that reacts to temperature and humidity, and the strings can move noticeably between a cold car and a warm hall. Let the instrument settle in the room for a few minutes, then tune.",
          },
        ]}
        relatedArticles={[
          {
            title: "How Temperature and Humidity Affect Tuning",
            slug: "how-temperature-and-humidity-affect-guitar-tuning",
            description: "A wooden instrument moves with the weather — basses most of all.",
          },
          {
            title: "How to Tune a Guitar by Ear",
            slug: "how-to-tune-a-guitar-by-ear",
            description: "The harmonics method, explained in detail.",
          },
          {
            title: "How to Use a Chromatic Tuner",
            slug: "how-to-use-a-chromatic-tuner",
            description: "Cents, octaves and reading the display.",
          },
        ]}
      >
        <h2>How to Use This Double Bass Tuner</h2>
        <ol>
          <li>
            Press <strong>Start Recording</strong> on the tuner above and allow
            microphone access. Place the phone near the f-holes or the bridge.
          </li>
          <li>
            Start with the A string. Orchestras tune to A, and if you are
            joining one, match its A first.
          </li>
          <li>
            Bow or pluck firmly and let the note ring. Short, light plucks give
            the microphone almost nothing to work with on a string this low.
          </li>
          <li>
            If the reading jumps around, play the harmonic halfway along the
            string instead. It is the same note an octave up and gives a far
            steadier reading.
          </li>
          <li>
            Tune D, then G, then E, and check A again at the end.
          </li>
        </ol>

        <h2>Tuning With Harmonics</h2>
        <p>
          Double bassists tune with harmonics because they are clear, long and
          high enough to hear properly. Because the strings are a fourth apart,
          a neat pair of harmonics on neighbouring strings are the same note:
        </p>
        <ul>
          <li>
            The harmonic a quarter of the way along the <strong>lower</strong>{" "}
            string — two octaves above it — and
          </li>
          <li>
            the harmonic a third of the way along the <strong>higher</strong>{" "}
            string — an octave and a fifth above it.
          </li>
        </ul>
        <p>
          Sound them together and listen for beats, a slow wobble in volume.
          Adjust the higher string until the wobble stops. Do this for E–A, A–D
          and D–G, starting from an A you have set with the tuner. It is the
          same method guitarists use with the 5th- and 7th-fret harmonics, and
          our <Link href="/articles/how-to-tune-a-guitar-by-ear">guide to tuning
          by ear</Link> walks through it.
        </p>

        <h2>Why the Double Bass Is Tuned in Fourths</h2>
        <p>
          Every other bowed string instrument is tuned in fifths. The double
          bass is so large that fifths would put the notes too far apart for
          the hand to reach: on a bass, even a whole tone can need a full
          stretch. Fourths keep scales playable across strings without
          shifting position constantly. It is also the reason the bass guitar,
          invented as a portable replacement for the upright, uses exactly the
          same tuning.
        </p>

        <h2>Machine Heads, Not Pegs</h2>
        <p>
          Unlike the violin, viola and cello, the double bass uses geared
          machine heads, so tuning is more like a guitar than a violin: small,
          controlled turns and no fine tuners. Turn slowly. The strings are
          heavy and under a lot of tension, and a big move takes the bridge
          with it — check that it is still standing straight, leaning neither
          towards the fingerboard nor the tailpiece, after any large retune.
        </p>

        <p>
          Related: <Link href="/cello-tuner">cello tuner</Link>,{" "}
          <Link href="/bass-tuner">bass guitar tuner</Link>, and the{" "}
          <Link href="/tunings">full tunings chart</Link>.
        </p>
      </TunerPageLayout>
    </>
  );
}
