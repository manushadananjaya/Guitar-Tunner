import { Metadata } from "next";
import Link from "next/link";
import { languageAlternates } from "@/lib/i18n/pages";
import TunerPageLayout from "@/components/TunerPageLayout";
import { otherInstrumentsFor } from "@/lib/instrumentPages";

export const metadata: Metadata = {
  title: "Cavaquinho Tuner — Free Online D G B D Tuner",
  description:
    "Free online cavaquinho tuner. Tune your cavaquinho to the standard Brazilian D G B D with your microphone, right on this page. No download.",
  alternates: {
    canonical: "/cavaquinho-tuner",
    languages: languageAlternates("/cavaquinho-tuner"),
  },
  openGraph: {
    title: "Cavaquinho Tuner — Free Online D G B D Tuner",
    description:
      "Tune your cavaquinho quickly and accurately using your device's microphone.",
  },
};

export default function CavaquinhoTunerPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Cavaquinho Tuner - GuitarTunePro",
    url: "https://www.guitartunepro.com/cavaquinho-tuner",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Free online cavaquinho tuner. Tune to standard D G B D instantly.",
    browserRequirements: "Requires microphone access",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <TunerPageLayout
        title="Cavaquinho Tuner"
        description="Tune your cavaquinho to D G B D using your microphone. The tuner below is already set for cavaquinho — press Start Recording and pluck a string."
        canonicalPath="/cavaquinho-tuner"
        initialGuitarType="cavaquinho"
        chartCaption="These are the exact target frequencies this tuner listens for, at A4 = 440 Hz equal temperament. String 1 is the high D, an octave above string 4."
        otherTuners={otherInstrumentsFor("/cavaquinho-tuner")}
        faqs={[
          {
            question: "What is the standard cavaquinho tuning?",
            answer:
              "D G B D, from string 4 to string 1: D4, G4, B4 and D5. The open strings make a G major chord, and they are the same notes as the top four strings of a guitar in open G, an octave higher.",
          },
          {
            question: "Is a cavaquinho the same as a ukulele?",
            answer:
              "They are relatives — the ukulele descends from small Portuguese guitars like the cavaquinho, carried to Hawaii by Madeiran immigrants. But a cavaquinho has steel strings, a different tuning and a sharper, brighter sound, and it is played mainly with a pick.",
          },
          {
            question: "Can I tune a cavaquinho like the top four strings of a guitar?",
            answer:
              "Yes. D G B E is a common alternative, and it lets guitarists use chord shapes they already know. Only string 1 changes, a whole step up from D to E. Select the string on the tuner and use the chromatic display to reach E5.",
          },
          {
            question: "Why do my cavaquinho strings break so often?",
            answer:
              "They are thin steel strings at high tension: string 1 sits at D5, 587 Hz, higher than any guitar or ukulele string. Tune up slowly, approach the note from below, and check the bridge and nut for sharp edges that cut strings.",
          },
          {
            question: "Can I use this tuner for a samba banjo?",
            answer:
              "Yes. The four-string banjo used in samba and pagode is tuned exactly like a cavaquinho, D G B D, so this tuner works for it as it is.",
          },
        ]}
        relatedArticles={[
          {
            title: "How to Use a Chromatic Tuner",
            slug: "how-to-use-a-chromatic-tuner",
            description: "Reading notes, cents and octaves on the display.",
          },
          {
            title: "Why Your Guitar Goes Out of Tune",
            slug: "why-your-guitar-goes-out-of-tune",
            description: "The same causes apply to any steel-string instrument.",
          },
          {
            title: "Beginner Guitar Chord Progressions",
            slug: "beginner-guitar-chord-progressions",
            description: "Progressions that work on cavaquinho too.",
          },
        ]}
      >
        <h2>How to Use This Cavaquinho Tuner</h2>
        <ol>
          <li>
            Press <strong>Start Recording</strong> on the tuner above and allow
            microphone access.
          </li>
          <li>
            The tuner is already on <strong>Cavaquinho</strong> in D G B D.
          </li>
          <li>
            Pluck one string at a time and turn its peg until the needle
            settles in the centre. The tuner detects which string you are
            playing.
          </li>
          <li>
            Check all four again. Steel strings on a small body pull the neck
            and top noticeably, so the first strings you tune move when you
            tune the last.
          </li>
        </ol>
        <p>
          A check by ear: the 5th fret of string 4 is G and should match open
          string 3; the 4th fret of string 3 is B and should match string 2;
          and the 3rd fret of string 2 is D, an exact match for string 1.
        </p>

        <h2>The Cavaquinho in Brazilian Music</h2>
        <p>
          The <strong>cavaquinho</strong> is a small four-string instrument that
          came to Brazil from Portugal and became central to its popular music.
          In <strong>samba</strong> and <strong>pagode</strong> it plays the
          rhythmic chords — the <em>centro</em> — that drive the groove, with
          fast, syncopated strumming. In <strong>choro</strong> it does that
          and also plays melodies, alongside the flute, the{" "}
          <Link href="/mandolin-tuner">bandolim</Link> and the 7-string guitar.
          Waldir Azevedo&apos;s &quot;Brasileirinho&quot; made it a solo instrument
          and remains one of the best-known choro pieces.
        </p>
        <p>
          Because it sits so high — string 1 is D5, 587&nbsp;Hz — it cuts
          through a whole percussion section. That also means small tuning
          errors are easy to hear, so it pays to check it often during a long
          roda.
        </p>

        <h2>Other Cavaquinho Tunings</h2>
        <ul>
          <li>
            <strong>D G B D</strong> — standard in Brazil, and the tuning
            samba and choro music is written for.
          </li>
          <li>
            <strong>D G B E</strong> — the top four strings of a guitar, an
            octave higher. Easier for guitarists, since chord shapes carry
            straight over. Only string 1 changes.
          </li>
          <li>
            <strong>G D A E</strong> — tuned in fifths like the mandolin, used
            by some players to share fingerings with the bandolim.
          </li>
        </ul>
        <p>
          The tuner is set to D G B D. For the others, select a string and
          tune to the new note on the chromatic display.
        </p>

        <h2>Keeping a Cavaquinho in Tune</h2>
        <ul>
          <li>
            <strong>Stretch new strings.</strong> Pull each one gently away from
            the fretboard along its length and retune. Repeat until it stops
            going flat.
          </li>
          <li>
            <strong>Watch the bridge.</strong> On many cavaquinhos the bridge is
            glued, but the saddle is not. After a string change, check the
            12th fret sounds exactly an octave above the open string.
          </li>
          <li>
            <strong>Mind the heat.</strong> A thin, small body reacts quickly to
            sun and humidity. Let it settle in the room before you tune.
          </li>
        </ul>

        <p>
          Related: <Link href="/ukulele-tuner">ukulele tuner</Link>,{" "}
          <Link href="/mandolin-tuner">mandolin tuner</Link>,{" "}
          <Link href="/banjo-tuner">banjo tuner</Link>, and the{" "}
          <Link href="/tunings">full tunings chart</Link>.
        </p>
      </TunerPageLayout>
    </>
  );
}
