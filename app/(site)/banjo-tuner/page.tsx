import { Metadata } from "next";
import { languageAlternates } from "@/lib/i18n/pages";
import Link from "next/link";
import TunerPageLayout from "@/components/TunerPageLayout";
import { otherInstrumentsFor } from "@/lib/instrumentPages";

export const metadata: Metadata = {
  title: "Banjo Tuner — Free Online Open G Tuner",
  description:
    "Free online banjo tuner. Tune your 5-string banjo to open G (g D G B D) with your microphone, right on this page — including the short 5th string.",
  alternates: {
    canonical: "/banjo-tuner",
    languages: languageAlternates("/banjo-tuner"),
  },
  openGraph: {
    title: "Banjo Tuner — Free Online Open G Tuner",
    description:
      "Tune your 5-string banjo quickly and accurately using your device's microphone.",
  },
};

export default function BanjoTunerPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Banjo Tuner - GuitarTunePro",
    url: "https://www.guitartunepro.com/banjo-tuner",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Free online 5-string banjo tuner. Tune to open G (g D G B D) instantly.",
    browserRequirements: "Requires microphone access",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <TunerPageLayout
        title="Banjo Tuner"
        description="Tune your 5-string banjo to open G (g D G B D) using your microphone. The tuner below is already set for banjo — press Start Recording and pluck a string."
        canonicalPath="/banjo-tuner"
        initialGuitarType="banjo"
        chartCaption="These are the exact target frequencies this tuner listens for, at A4 = 440 Hz equal temperament. String 5 — the short string with its peg partway up the neck — is not the lowest: it is a high G4, the highest open note on the banjo. String 1 is the D nearest the floor when you play."
        otherTuners={otherInstrumentsFor("/banjo-tuner")}
        faqs={[
          {
            question: "What is standard 5-string banjo tuning?",
            answer:
              "Open G: g D G B D, from the 5th string to the 1st. The pitches are G4, D3, G3, B3, and D4. Strummed open, the strings sound a G major chord, which is why it is called open G.",
          },
          {
            question: "Why is the 5th string so high?",
            answer:
              "The 5th string is a short string that starts at the fifth fret, and it is tuned to G4 — higher than every other open string. It works as a drone: in bluegrass rolls the thumb keeps returning to it, and that high, ringing G is a big part of the banjo's sound. Tunings like this are called reentrant, the same idea as a ukulele's high G.",
          },
          {
            question: "How do I tune to double C?",
            answer:
              "Double C (g C G C D) is open G with the 4th string lowered from D3 to C3 and the 2nd string lowered from B3 to C4. This page targets open G, so tune to open G first, then match the two changed strings by fret: the 2nd string is right when its open note matches the 3rd string at the 5th fret, and the 4th string is right when its 7th fret matches the open 3rd string.",
          },
          {
            question: "Does this work for a 4-string tenor banjo?",
            answer:
              "No. A tenor banjo usually tunes C G D A (like a viola) and an Irish tenor banjo G D A E (like a mandolin, an octave lower). This page is set for the 5-string banjo in open G. A tenor banjo in C G D A uses exactly the same pitches as a viola, so the viola tuner works for it.",
          },
          {
            question: "Does tightening the banjo head change the tuning?",
            answer:
              "It changes the tone more than the pitch, but because the bridge sits on the head, a slack head lets the bridge sink and alters the string height and intonation. If your banjo suddenly sounds dull and won't stay in tune, the head tension is worth checking.",
          },
        ]}
        relatedArticles={[
          {
            title: "Alternate Guitar Tunings You Should Try",
            slug: "alternate-guitar-tunings",
            description:
              "Open G and friends — the guitar side of the banjo's tuning family.",
          },
          {
            title: "Does a Capo Affect Tuning?",
            slug: "does-a-capo-affect-guitar-tuning",
            description:
              "Why capoed strings drift sharp, and how to correct for it.",
          },
          {
            title: "How to Use a Chromatic Tuner",
            slug: "how-to-use-a-chromatic-tuner",
            description:
              "Reading cents, needles, and note names on any chromatic tuner.",
          },
        ]}
      >
        <h2>How to Use This Banjo Tuner</h2>
        <ol>
          <li>
            Press <strong>Start Recording</strong> on the tuner above and allow
            microphone access.
          </li>
          <li>
            The <strong>5-String Banjo</strong> instrument is already selected.
          </li>
          <li>
            Tune the four long strings first: 4th string D (146.83&nbsp;Hz), 3rd
            string G (196.00&nbsp;Hz), 2nd string B (246.94&nbsp;Hz), and 1st
            string D (293.66&nbsp;Hz).
          </li>
          <li>
            Tune the short 5th string last, to G (392.00&nbsp;Hz). Its peg is
            on the side of the neck near the fifth fret.
          </li>
          <li>
            Strum all five open strings. You should hear a clean G major chord.
            Run a second pass if anything sounds sour.
          </li>
        </ol>
        <p>
          Banjo notes decay quickly, so pluck firmly and read the needle in the
          first second or so of each note. If it does not settle before the
          note fades, pluck again rather than waiting.
        </p>

        <h2>The Short 5th String</h2>
        <p>
          The 5th string is the defining feature of the 5-string banjo, and the
          one that confuses most new players. It is shorter than the others,
          starting at the fifth fret rather than at the nut, and it is tuned to
          a high G4 — an octave above the 3rd string.
        </p>
        <p>
          Its tuning peg sits on the side of the neck, which means it is easy to
          knock out of tune when you put the banjo in its case. Check it every
          time you pick the instrument up.
        </p>
        <p>
          <strong>With a capo:</strong> when you capo the four long strings, the
          5th string has to go up by the same amount. Players either retune it
          with the peg or hook it under a small &ldquo;railroad spike&rdquo; at
          the right fret. Capo at the 2nd fret for the key of A and the 5th
          string goes to A4; capo at the 3rd for B♭ and it goes to B♭4.
        </p>

        <h2>Other Common Banjo Tunings</h2>
        <ul>
          <li>
            <strong>Double C</strong> — g C G C D. Lower the 4th and 2nd strings
            a whole step. Popular for old-time clawhammer in C.
          </li>
          <li>
            <strong>G modal (&ldquo;sawmill&rdquo;)</strong> — g D G C D. Raise
            the 2nd string from B to C. A haunting, unresolved sound used in
            old-time music.
          </li>
          <li>
            <strong>Open D</strong> — f♯ D F♯ A D. A bigger retune, used for
            songs in D without a capo.
          </li>
        </ul>
        <p>
          This tuner&rsquo;s preset measures cents against open G only. For the
          other tunings, the display still names the note you are playing, so
          lower or raise a string until the right note name appears, then
          fine-tune it by ear against a fretted note on a neighbouring string.
        </p>

        <h2>Troubleshooting</h2>
        <p>
          <strong>Open strings are in tune but fretted notes are not.</strong>{" "}
          The banjo bridge is not fixed; it is held on the head by string
          pressure and can be knocked out of position. The correct spot puts the
          12th-fret note exactly an octave above the open string.
        </p>
        <p>
          <strong>The 5th string keeps going flat.</strong> Geared 5th-string
          pegs can loosen over time. A small tightening of the screw on the
          peg&rsquo;s end usually fixes it.
        </p>

        <p>
          Also available: our <Link href="/mandolin-tuner">mandolin tuner</Link>
          , <Link href="/open-g-tuner">open G guitar tuner</Link>, and the{" "}
          <Link href="/metronome">online metronome</Link>.
        </p>
      </TunerPageLayout>
    </>
  );
}
