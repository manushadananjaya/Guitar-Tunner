import { Metadata } from "next";
import Link from "next/link";
import TunerPageLayout from "@/components/TunerPageLayout";
import { otherTunersFor } from "@/lib/tunerPages";

export const metadata: Metadata = {
  title: "Nashville Tuning Tuner — High-Strung Guitar",
  description:
    "Free online Nashville tuning tuner. Tune a high-strung guitar with your microphone — strings 6 to 3 an octave up, the right octave for every string. No download.",
  alternates: { canonical: "/nashville-tuner" },
  openGraph: {
    title: "Nashville Tuning Tuner — High-Strung Guitar",
    description:
      "Tune a Nashville-strung guitar to the right octave on every string using your device's microphone.",
  },
};

export default function NashvilleTunerPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Nashville Tuning Tuner - GuitarTunePro",
    url: "https://www.guitartunepro.com/nashville-tuner",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Free online tuner for Nashville (high-strung) tuning: E3 A3 D4 G4 B3 E4.",
    browserRequirements: "Requires microphone access",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <TunerPageLayout
        title="Nashville Tuning Tuner"
        description="Tune a high-strung guitar to Nashville tuning (E3 A3 D4 G4 B3 E4) using your microphone. The tuner below listens for the octave strings — press Start Recording and pluck a string."
        canonicalPath="/nashville-tuner"
        initialTuning="nashville"
        chartCaption="These are the exact target frequencies this tuner listens for, at A4 = 440 Hz equal temperament. Strings 6 to 3 sit an octave above standard, so string 3 (G4) is the highest note and string 2 (B3) is lower than it."
        otherTuners={otherTunersFor("/nashville-tuner")}
        faqs={[
          {
            question: "What is Nashville tuning?",
            answer:
              "A six-string guitar strung with the thin octave strings from a 12-string set. The note names are standard — E A D G B E — but strings 6, 5, 4 and 3 sound an octave higher than usual: E3, A3, D4 and G4. Strings 2 and 1 stay at B3 and E4.",
          },
          {
            question: "Can I use a normal set of strings?",
            answer:
              "No. Tuning a normal low E string up an octave would snap it. You need light strings for the bottom four — either a set sold as Nashville or high-strung, or the octave strings taken from a 12-string set. A typical set runs roughly .010 .014 .009 .012 .018 .027 from string 1 to 6.",
          },
          {
            question: "Why does a normal tuner say my strings are in tune when they are not?",
            answer:
              "Most chromatic tuners only read the note name, not the octave, so a low E string tuned to E2 and a Nashville string tuned to E3 both show as E. This page listens for E3, A3, D4 and G4 specifically, so the chart and the targets are right for a high-strung guitar.",
          },
          {
            question: "What is Nashville tuning used for?",
            answer:
              "Mostly recording. Doubling a normal guitar part with a Nashville-tuned guitar gives the shimmer of a 12-string without its playing difficulty, and it lets you pan the two parts left and right. It is also lovely on its own for arpeggiated chords that ring like a harp.",
          },
          {
            question: "Do the chord shapes change?",
            answer:
              "No. Every note name is the same as standard, so every chord shape and tab works unchanged. Only the voicing changes: the bass notes now sit in the middle of the chord.",
          },
        ]}
        relatedArticles={[
          {
            title: "Acoustic vs Electric Guitar Tuning",
            slug: "acoustic-vs-electric-guitar-tuning",
            description: "How string type changes what you hear and how you tune.",
          },
          {
            title: "Standard Tuning Explained",
            slug: "standard-tuning-explained",
            description: "Why the guitar is tuned E A D G B E in the first place.",
          },
          {
            title: "Alternate Guitar Tunings You Should Try",
            slug: "alternate-guitar-tunings",
            description: "What each family of tunings is for.",
          },
        ]}
      >
        <h2>How to Use This Nashville Tuner</h2>
        <ol>
          <li>
            Fit a Nashville or high-strung set first. Do not try to tune
            ordinary strings up to these pitches.
          </li>
          <li>
            Press <strong>Start Recording</strong> on the tuner above and allow
            microphone access. The <strong>Nashville</strong> preset is already
            selected.
          </li>
          <li>
            Tune each string to the octave in the chart: E3, A3, D4, G4, B3,
            E4. The G string is now the highest note on the guitar.
          </li>
          <li>
            Bring the thin strings up slowly. A .009 tuned to G4 is near its
            limit, and overshooting is how it breaks.
          </li>
        </ol>

        <h2>What is Nashville Tuning?</h2>
        <p>
          A 12-string guitar is six pairs of strings. On the bottom four pairs,
          one string is the normal one and the other is a thin string tuned an
          octave higher; on the top two, both strings are the same note. Take a
          12-string set, keep only the octave strings for the bottom four and
          one of each pair for the top two, put them on a six-string — that is
          Nashville tuning, also called <strong>high-strung</strong> tuning.
        </p>
        <p>
          The result keeps every note name of standard tuning and moves the
          bottom four strings up an octave. There is no low end at all, and
          the G string becomes the highest pitch on the guitar. The voicing of
          every chord changes, with the &quot;bass&quot; notes now in the
          middle, which gives open chords a bright, chiming, almost harp-like
          sound.
        </p>

        <h2>Why Studios Use It</h2>
        <p>
          The name comes from the Nashville session scene, where players
          doubled acoustic parts with a high-strung guitar to thicken a track.
          Recorded together, the normal guitar and the Nashville guitar sound
          like a 12-string, but each part can be played cleanly, panned
          separately and mixed to taste. It became a staple of country, folk
          and pop records, and plenty of rock ones: David Gilmour&apos;s acoustic
          part on Pink Floyd&apos;s &quot;Hey You&quot; is usually transcribed in a
          variant of it.
        </p>
        <p>
          Because the octave strings are so light, it is also an easy way to
          make an inexpensive spare acoustic sound special, and many players
          keep one guitar permanently strung this way.
        </p>

        <h2>Tips for a Nashville-Strung Guitar</h2>
        <ul>
          <li>
            <strong>Check the nut slots.</strong> The thin strings can sit
            loosely in slots cut for heavy ones and buzz. A tiny shim or a
            spare nut cut for the set fixes it.
          </li>
          <li>
            <strong>Expect a lighter feel.</strong> Total tension is far lower
            than a normal set, so the neck may need a small truss rod
            adjustment to keep the right relief.
          </li>
          <li>
            <strong>Recheck intonation.</strong> Thin plain strings intonate
            differently from wound ones in the same slot. Use the{" "}
            <Link href="/intonation-checker">intonation checker</Link> on each
            string.
          </li>
          <li>
            <strong>Use a capo for variety.</strong> A capo on a Nashville
            guitar with a normal guitar playing open chords is a classic
            two-guitar arrangement. The{" "}
            <Link href="/capo-calculator">capo calculator</Link> finds shapes
            that match.
          </li>
        </ul>

        <p>
          Related: <Link href="/12-string-guitar-tuner">12-string guitar tuner</Link>,{" "}
          <Link href="/">standard guitar tuner</Link>, and the{" "}
          <Link href="/tunings">full tunings chart</Link>.
        </p>
      </TunerPageLayout>
    </>
  );
}
