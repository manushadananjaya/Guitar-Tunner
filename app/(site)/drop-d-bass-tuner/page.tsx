import { Metadata } from "next";
import Link from "next/link";
import TunerPageLayout from "@/components/TunerPageLayout";
import { otherTunersFor } from "@/lib/tunerPages";

export const metadata: Metadata = {
  title: "Drop D Bass Tuner — Free Online D A D G Tuner",
  description:
    "Free online Drop D bass tuner. Tune your 4-string bass to D A D G with your microphone, right on this page — accurate on the low D at 36.7 Hz. No download.",
  alternates: { canonical: "/drop-d-bass-tuner" },
  openGraph: {
    title: "Drop D Bass Tuner — Free Online Bass Tuner",
    description:
      "Tune your bass to Drop D (D A D G) using your device's microphone.",
  },
};

export default function DropDBassTunerPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Drop D Bass Tuner - GuitarTunePro",
    url: "https://www.guitartunepro.com/drop-d-bass-tuner",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Free online Drop D bass tuner. Tune a 4-string bass to D A D G instantly.",
    browserRequirements: "Requires microphone access",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <TunerPageLayout
        title="Drop D Bass Tuner"
        description="Tune your bass to Drop D (D A D G) using your microphone. The tuner below is already set to bass in Drop D — press Start Recording and pluck your low string."
        canonicalPath="/drop-d-bass-tuner"
        initialGuitarType="bass"
        initialTuning="bassDropD"
        chartCaption="These are the exact target frequencies this tuner listens for, at A4 = 440 Hz equal temperament. String 4 is the low D; strings 3 to 1 are the same as standard bass tuning."
        otherTuners={otherTunersFor("/drop-d-bass-tuner")}
        faqs={[
          {
            question: "What are the notes in Drop D bass tuning?",
            answer:
              "D A D G, from the lowest string to the highest: D1, A1, D2 and G2. Only the E string changes, dropping a whole step to D. The low D is 36.71 Hz.",
          },
          {
            question: "Do I need different strings for Drop D on bass?",
            answer:
              "Usually not. A standard .045–.105 or .045–.100 set handles one string dropping a whole step. If the low D feels floppy or buzzes, a .110 E string firms it up without changing the rest of the set.",
          },
          {
            question: "Why can't my phone hear the low D properly?",
            answer:
              "36.71 Hz is below what most phone microphones and laptop speakers reproduce, so the tuner hears the string's overtones more than its fundamental. It recognises the octave above and folds it back down, but the steadiest reading comes from playing the 12th-fret harmonic, which sounds D2 at 73.42 Hz. Plugging in and holding the phone near the amp helps too.",
          },
          {
            question: "Should my bass be in Drop D if the guitarist is?",
            answer:
              "Usually, yes. A guitar riff in Drop D leans on the low D, and the bass normally doubles it an octave below. In standard tuning that note is out of the bass's range on a 4-string. If you play a 5-string, you already have notes below D and can stay in standard.",
          },
          {
            question: "What is a D-tuner?",
            answer:
              "A replacement tuning key for the E string with a lever that drops it to D and back in one movement, stopping exactly at preset pitches. It lets bassists switch tunings mid-song. Set the stops with this tuner so both positions are accurate.",
          },
        ]}
        relatedArticles={[
          {
            title: "Drop D Tuning Guide for Rock and Metal",
            slug: "drop-d-tuning-guide",
            description: "What the guitarist is doing above you.",
          },
          {
            title: "Why Your Guitar Goes Out of Tune",
            slug: "why-your-guitar-goes-out-of-tune",
            description: "The causes are the same on bass.",
          },
          {
            title: "How to Use a Chromatic Tuner",
            slug: "how-to-use-a-chromatic-tuner",
            description: "Reading the display, cents and octaves.",
          },
        ]}
      >
        <h2>How to Use This Drop D Bass Tuner</h2>
        <ol>
          <li>
            Press <strong>Start Recording</strong> on the tuner above and allow
            microphone access.
          </li>
          <li>
            The tuner is already on <strong>Bass Guitar</strong> with{" "}
            <strong>Drop D</strong> selected.
          </li>
          <li>
            Check the A, D and G strings — they stay at standard pitch.
          </li>
          <li>
            Lower the E string a whole step to D. Tune slightly below, then
            bring it up to the note.
          </li>
          <li>
            For a steadier reading on the low D, play the harmonic at the 12th
            fret. It is the same note an octave up, and much easier for a phone
            microphone to hear.
          </li>
        </ol>
        <p>
          A check by ear: the open low D should match the open D string an
          octave below, and the 7th fret of the low D should match the open A
          string exactly.
        </p>

        <h2>What is Drop D on Bass?</h2>
        <p>
          <strong>Drop D</strong> on a 4-string bass is <strong>D A D G</strong>:
          standard bass tuning with the E string lowered a whole step. It gives
          the bass two semitones of extra range — the low D and E♭ that a
          4-string normally cannot reach — and puts the open low string on D,
          the most common key for down-tuned rock riffs.
        </p>
        <p>
          It also changes the shape of the bottom two strings. With D and A a
          fifth apart, one finger across the same fret on both strings plays a
          root and fifth, the bass equivalent of a power chord, and octave
          shapes on the low string move too.
        </p>

        <h2>When to Use Drop D</h2>
        <ul>
          <li>
            <strong>Playing with a Drop D guitarist.</strong> Riffs built on the
            guitar&apos;s open low D need a bass D below them, and only a dropped
            or 5-string bass has one.
          </li>
          <li>
            <strong>Songs in D or D minor.</strong> An open low D rings under
            everything and frees your fretting hand.
          </li>
          <li>
            <strong>A bigger low end.</strong> Two extra semitones is a
            noticeable difference in weight.
          </li>
        </ul>
        <p>
          If you need to go lower than D regularly, a 5-string bass with a low
          B is the better tool: see the{" "}
          <Link href="/5-string-bass-tuner">5-string bass tuner</Link>.
        </p>

        <h2>Fingering Changes to Watch</h2>
        <p>
          Every note on the low string moves up two frets: the F you used to
          play at fret 1 is now at fret 3, and G is at fret 5. Lines that cross
          between the E and A strings will need new fingerings, so practise the
          parts of a song that use the low string before you play it live. The{" "}
          <Link href="/fretboard-trainer">fretboard trainer</Link> helps relearn
          the notes on the dropped string.
        </p>

        <p>
          Related: <Link href="/bass-tuner">standard bass tuner</Link>,{" "}
          <Link href="/drop-d-tuner">Drop D guitar tuner</Link>, and the{" "}
          <Link href="/tunings">full tunings chart</Link>.
        </p>
      </TunerPageLayout>
    </>
  );
}
