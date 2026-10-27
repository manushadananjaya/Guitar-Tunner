import { Metadata } from "next";
import Link from "next/link";
import TunerPageLayout from "@/components/TunerPageLayout";
import { otherTunersFor } from "@/lib/tunerPages";

export const metadata: Metadata = {
  title: "Low G Ukulele Tuner — Free Linear GCEA Tuner",
  description:
    "Free online low G ukulele tuner. Tune to linear G3 C4 E4 A4 with your microphone — the tuner listens for the low G, not the high one. No download.",
  alternates: { canonical: "/low-g-ukulele-tuner" },
  openGraph: {
    title: "Low G Ukulele Tuner — Linear GCEA",
    description:
      "Tune a low G ukulele to G3 C4 E4 A4 using your device's microphone.",
  },
};

export default function LowGUkuleleTunerPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Low G Ukulele Tuner - GuitarTunePro",
    url: "https://www.guitartunepro.com/low-g-ukulele-tuner",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Free online low G ukulele tuner. Tune to linear GCEA (G3 C4 E4 A4) instantly.",
    browserRequirements: "Requires microphone access",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <TunerPageLayout
        title="Low G Ukulele Tuner"
        description="Tune a low G ukulele to G3 C4 E4 A4 using your microphone. The tuner below is already set to low G — press Start Recording and pluck a string."
        canonicalPath="/low-g-ukulele-tuner"
        initialGuitarType="ukulele"
        initialTuning="lowG"
        chartCaption="These are the exact target frequencies this tuner listens for, at A4 = 440 Hz equal temperament. In low G tuning string 4 really is the lowest note: G3, an octave below standard ukulele's G4."
        otherTuners={otherTunersFor("/low-g-ukulele-tuner")}
        faqs={[
          {
            question: "What is low G ukulele tuning?",
            answer:
              "GCEA with the G string an octave lower: G3, C4, E4, A4. Standard ukulele tuning puts the G above the C (G4), which is called reentrant tuning. Low G makes the strings run from lowest to highest, like a guitar, which is called linear tuning.",
          },
          {
            question: "Can I tune my normal G string down an octave?",
            answer:
              "No. The standard G string would be so slack an octave down that it would barely sound. You need a string made for low G — usually a wound string, or a thick unwound fluorocarbon one. They are sold singly or in low G sets.",
          },
          {
            question: "Do I need to change my chord shapes?",
            answer:
              "No. The note names are the same, so every chord shape and every chord chart works unchanged. What changes is the sound: chords gain a bass note, and melodies can go five semitones lower.",
          },
          {
            question: "Which ukuleles suit low G?",
            answer:
              "Tenor ukuleles most of all — the longer scale gives the low string enough tension to sound full. Concert ukuleles work well with the right string. On a soprano the low G tends to be weak and floppy, and most players keep sopranos in standard high G.",
          },
          {
            question: "Why does my tuner say my low G is in tune when it sounds wrong?",
            answer:
              "Many tuners only read the note name, so a G3 and a G4 both show as G. This page listens for G3 specifically. If you put a low G string on and tune it to G4, it will be dangerously tight — and if you tune a high G string to G3, it will be floppy.",
          },
        ]}
        relatedArticles={[
          {
            title: "How to Tune a Guitar for Beginners",
            slug: "how-to-tune-a-guitar-for-beginners",
            description: "The same tuning habits apply on ukulele.",
          },
          {
            title: "How to Use a Chromatic Tuner",
            slug: "how-to-use-a-chromatic-tuner",
            description: "Why octaves matter on a tuner display.",
          },
          {
            title: "How to Read Guitar Tabs",
            slug: "how-to-read-guitar-tabs",
            description: "Ukulele tab works the same way.",
          },
        ]}
      >
        <h2>How to Use This Low G Ukulele Tuner</h2>
        <ol>
          <li>
            Fit a low G string first. A standard G string cannot be tuned an
            octave down.
          </li>
          <li>
            Press <strong>Start Recording</strong> on the tuner above and allow
            microphone access. The tuner is already on{" "}
            <strong>Ukulele</strong> with <strong>Low G</strong> selected.
          </li>
          <li>
            Tune the G string to G3 (196.00&nbsp;Hz), then C, E and A as normal.
          </li>
          <li>
            A new wound low G stretches a lot. Retune it several times over the
            first day.
          </li>
        </ol>
        <p>
          A check by ear: the 5th fret of the low G is C4 and should match the
          open C string. On a standard high G ukulele, that check does not
          work, because the G is above the C.
        </p>

        <h2>High G or Low G?</h2>
        <p>
          Standard ukulele tuning is <strong>reentrant</strong>: the G string
          is tuned to G4, above the C and E, so the open strings go up, down,
          and up again. That is what gives the ukulele its bright, tight strum
          and lets scales ring across strings like a harp — a sound often
          called <em>campanella</em>.
        </p>
        <p>
          <strong>Low G</strong> tuning is <strong>linear</strong>: the G is
          G3, an octave lower, and the strings run low to high. You lose some
          of the classic sparkle and gain a lower range and a fuller chord.
          Fingerstyle players, jazz chord players and singers who accompany
          themselves often prefer it, because the ukulele can play a bass line
          under the melody.
        </p>
        <ul>
          <li>
            <strong>Choose high G</strong> for traditional Hawaiian music,
            bright strumming, and most beginner songbooks, which assume it.
          </li>
          <li>
            <strong>Choose low G</strong> for fingerstyle arrangements,
            accompanying a voice, and anything with a bass line.
          </li>
        </ul>

        <h2>Fitting a Low G String</h2>
        <p>
          Low G strings are thicker than the rest. If the string does not seat
          in the nut slot, or buzzes in it, the slot needs to be widened very
          slightly — a quick job for a technician, and a delicate one to do
          yourself. Wound strings can also squeak under your fingers; unwound
          fluorocarbon low G strings avoid that at the cost of being very thick.
        </p>

        <p>
          Related: <Link href="/ukulele-tuner">standard ukulele tuner</Link>,{" "}
          <Link href="/baritone-ukulele-tuner">baritone ukulele tuner</Link>,
          and the <Link href="/ukulele-chords">ukulele chord library</Link>,
          whose shapes all work in low G.
        </p>
      </TunerPageLayout>
    </>
  );
}
