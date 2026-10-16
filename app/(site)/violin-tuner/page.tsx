import { Metadata } from "next";
import { languageAlternates } from "@/lib/i18n/pages";
import Link from "next/link";
import TunerPageLayout from "@/components/TunerPageLayout";
import { otherInstrumentsFor } from "@/lib/instrumentPages";

export const metadata: Metadata = {
  title: "Violin Tuner — Free Online G D A E Tuner",
  description:
    "Free online violin tuner. Tune your violin to G D A E with your microphone, right on this page. Works for every size from 1/16 to 4/4 — no download.",
  alternates: {
    canonical: "/violin-tuner",
    languages: languageAlternates("/violin-tuner"),
  },
  openGraph: {
    title: "Violin Tuner — Free Online G D A E Tuner",
    description:
      "Tune your violin quickly and accurately using your device's microphone.",
  },
};

export default function ViolinTunerPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Violin Tuner - GuitarTunePro",
    url: "https://www.guitartunepro.com/violin-tuner",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Free online violin tuner. Tune your violin to standard G D A E instantly.",
    browserRequirements: "Requires microphone access",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <TunerPageLayout
        title="Violin Tuner"
        description="Tune your violin to G D A E using your microphone. The tuner below is already set for violin — press Start Recording and bow or pluck an open string."
        canonicalPath="/violin-tuner"
        initialGuitarType="violin"
        chartCaption="These are the exact target frequencies this tuner listens for, at A4 = 440 Hz equal temperament. String 1 is the E, the highest and thinnest string."
        otherTuners={otherInstrumentsFor("/violin-tuner")}
        faqs={[
          {
            question: "What are the notes of the violin strings?",
            answer:
              "From lowest to highest: G3, D4, A4, and E5. Each string is a perfect fifth above the one below it. The A string is the same A4 = 440 Hz that orchestras tune to.",
          },
          {
            question: "Which string should I tune first?",
            answer:
              "The A. It is the reference pitch for the whole orchestra, and once it is right the other three can be checked against it. Tune A, then D, then G, then E — and then check the A again, because changing the tension on one string pulls slightly on the others through the bridge.",
          },
          {
            question: "Should I use the pegs or the fine tuners?",
            answer:
              "Use the fine tuners for anything within roughly a quarter-tone, and the pegs only when a string is far out or has just been replaced. Pegs move the pitch a long way for a small turn, so they are hard to land precisely. If a fine tuner is screwed nearly all the way in, back it out to the middle and make up the difference with the peg.",
          },
          {
            question: "My orchestra tunes to A = 442. Can I use this tuner?",
            answer:
              "Yes. This tuner measures against A = 440 Hz. A = 442 is about 8 cents higher, so tune each string until the needle reads roughly +8 cents instead of 0. Every string moves by the same amount, so the fifths between them stay pure.",
          },
          {
            question: "Is the tuning different for smaller violins?",
            answer:
              "No. Fractional violins — 1/16, 1/10, 1/8, 1/4, 1/2, 3/4 — all tune to the same G D A E as a full-size 4/4. The strings are shorter and made for the smaller scale, but the target pitches are identical.",
          },
        ]}
        relatedArticles={[
          {
            title: "432 Hz vs 440 Hz Tuning",
            slug: "432-hz-vs-440-hz-tuning",
            description:
              "Where A = 440 came from, and why some ensembles tune higher.",
          },
          {
            title: "How to Use a Chromatic Tuner",
            slug: "how-to-use-a-chromatic-tuner",
            description:
              "Reading cents, needles, and note names on any chromatic tuner.",
          },
          {
            title: "How Temperature and Humidity Affect Tuning",
            slug: "how-temperature-and-humidity-affect-guitar-tuning",
            description:
              "Why a wooden instrument drifts between rooms and seasons.",
          },
        ]}
      >
        <h2>How to Use This Violin Tuner</h2>
        <ol>
          <li>
            Press <strong>Start Recording</strong> on the tuner above and allow
            microphone access.
          </li>
          <li>
            The <strong>Violin</strong> instrument is already selected.
          </li>
          <li>
            Draw a long, even bow on the open A string (440.00&nbsp;Hz). Adjust
            until the needle settles at 0 cents.
          </li>
          <li>
            Tune the D (293.66&nbsp;Hz), then the G (196.00&nbsp;Hz), then the E
            (659.26&nbsp;Hz).
          </li>
          <li>
            Go back and check the A. Tightening the other three strings presses
            the bridge down harder and can pull it slightly flat.
          </li>
        </ol>
        <p>
          A steady, medium-weight bow stroke gives the clearest reading. A
          scratchy or very light stroke is full of noise and the needle will
          wander. If bowing is awkward while you watch the screen, pluck the
          string <em>pizzicato</em> instead — the tuner reads that just as well,
          though the note dies away faster, so you may need to pluck again.
        </p>

        <h2>Pegs and Fine Tuners</h2>
        <p>
          A violin has two ways to change pitch, and using the right one makes
          tuning far less frustrating.
        </p>
        <p>
          <strong>Fine tuners</strong> are the small screws on the tailpiece.
          Turning one clockwise raises the pitch, anticlockwise lowers it. They
          only move the pitch a little, which is exactly what you want for the
          daily top-up. Most student violins have a fine tuner on all four
          strings; many advanced players keep only the one on the E string,
          where the thin steel string is too sensitive to tune with a peg.
        </p>
        <p>
          <strong>Pegs</strong> are the friction pegs in the scroll. They hold
          by friction alone, so turn them while pushing gently <em>into</em>{" "}
          the pegbox — that is what makes them stay put. A peg that slips back
          is usually not pushed in enough; one that sticks and then jumps needs
          peg compound, which a violin shop can apply in a minute.
        </p>
        <p>
          A useful rule: if the tuner shows a string more than about 30 cents
          out, use the peg to get it close, then finish with the fine tuner.
        </p>

        <h2>Watch the Bridge</h2>
        <p>
          The bridge on a violin is not glued down. It is held in place only by
          the pressure of the strings, and every time you tighten a string with
          a peg, friction drags the top of the bridge a little towards the
          fingerboard.
        </p>
        <p>
          After a big tuning session — or new strings — look at the bridge from
          the side. The back face (towards the tailpiece) should stand roughly
          at a right angle to the top of the violin. If it is leaning forward,
          the bridge can warp or suddenly fall, which is loud, alarming, and can
          crack the top. Small corrections can be made by gently easing the top
          of the bridge back with both thumbs and forefingers while the strings
          are under tension; if you are unsure, ask your teacher or a luthier.
        </p>

        <h2>Tuning in Fifths by Ear</h2>
        <p>
          Once the A is right, experienced players check the other strings by
          playing two adjacent open strings together (a <em>double stop</em>)
          and listening for a perfect fifth. When the fifth is pure it rings
          clearly and steadily; when one string is slightly off, you hear a slow
          wobble or &ldquo;beating&rdquo; in the sound. The faster the wobble,
          the further out it is.
        </p>
        <p>
          This is worth learning alongside the tuner. The tuner gets you close
          and teaches you what &ldquo;in tune&rdquo; sounds like; the double
          stops let you tune quietly in rehearsal, where a phone on the music
          stand is not always welcome.
        </p>

        <h2>Troubleshooting</h2>
        <p>
          <strong>The E string keeps going sharp or snapping.</strong> The E is
          a thin steel string at high tension. Tune it with the fine tuner only,
          and approach the target from below. If a new E string snaps at the
          bridge, a small parchment or plastic protector under it helps.
        </p>
        <p>
          <strong>The needle jumps between two notes.</strong> The tuner is
          hearing a harmonic. Bow nearer the fingerboard with a little less
          pressure, or switch to pizzicato.
        </p>
        <p>
          <strong>Everything goes flat overnight.</strong> Normal for new
          strings — synthetic-core strings take several days of playing to
          stabilise. If the strings are not new, check the room: violins drift
          noticeably with temperature and humidity changes.
        </p>

        <p>
          Also available: our <Link href="/viola-tuner">viola tuner</Link>,{" "}
          <Link href="/cello-tuner">cello tuner</Link>, and the{" "}
          <Link href="/metronome">online metronome</Link>.
        </p>
      </TunerPageLayout>
    </>
  );
}
