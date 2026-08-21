import { Metadata } from "next";
import Link from "next/link";
import TunerPageLayout from "@/components/TunerPageLayout";
import { otherInstrumentsFor } from "@/lib/instrumentPages";

export const metadata: Metadata = {
  title:
    "7-String Guitar Tuner — B E A D G B E",
  description:
    "Free online 7-string guitar tuner. Tune B E A D G B E with your microphone, right on this page. Handles the low B at 61.74 Hz — no download required.",
  alternates: { canonical: "/7-string-guitar-tuner" },
  openGraph: {
    title: "7-String Guitar Tuner — Free Online B E A D G B E Tuner",
    description:
      "Tune your 7-string guitar quickly and accurately using your device's microphone.",
  },
};

export default function SevenStringTunerPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "7-String Guitar Tuner - GuitarTunePro",
    url: "https://www.guitartunepro.com/7-string-guitar-tuner",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Free online 7-string guitar tuner. Tune your guitar to B E A D G B E instantly.",
    browserRequirements: "Requires microphone access",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <TunerPageLayout
        title="7-String Guitar Tuner"
        description="Tune your 7-string guitar (B E A D G B E) using your microphone. The tuner below is already set — press Start Recording and pluck a string."
        canonicalPath="/7-string-guitar-tuner"
        initialGuitarType="sevenString"
        otherTuners={otherInstrumentsFor("/7-string-guitar-tuner")}
        faqs={[
          {
            question: "What is standard 7-string guitar tuning?",
            answer:
              "B E A D G B E from lowest to highest. It is standard 6-string tuning with an extra low B string (B1, 61.74 Hz) added below the low E, a perfect fourth down.",
          },
          {
            question: "Do my 6-string chord shapes still work?",
            answer:
              "Yes, completely. Strings 1 through 6 are tuned exactly as on a 6-string guitar, so every chord, scale, and riff transfers unchanged. The 7th string is purely additional range — you can ignore it entirely and play the instrument as a 6-string.",
          },
          {
            question: "What string gauge do I need for the low B?",
            answer:
              "At least .056, and .059 to .064 is common. A standard 6-string set's .046 tuned down to B1 would be unplayably slack. Dedicated 7-string sets exist and are the simplest option.",
          },
          {
            question: "How is a 7-string different from Drop C on a 6-string?",
            answer:
              "Drop C reaches a low C2 (65.41 Hz) by detuning, which slackens the whole instrument and changes the interval between strings 6 and 5. A 7-string reaches a lower B1 (61.74 Hz) while keeping all six original strings at standard pitch and tension. You get the extended range without giving up standard tuning.",
          },
          {
            question: "What is Drop A on a 7-string?",
            answer:
              "Drop A takes the 7th string down a whole step from B to A (55.00 Hz), applying the Drop D idea to the extra string. It gives one-finger power chords on strings 7, 6, and 5 at a very low pitch, and is common in modern metal.",
          },
        ]}
        relatedArticles={[
          {
            title: "Best Guitar Strings for Tuning Stability",
            slug: "best-guitar-strings-for-tuning-stability",
            description:
              "Gauge, material, and winding choices that hold pitch longer.",
          },
          {
            title: "How to Intonate Your Guitar",
            slug: "how-to-intonate-your-guitar",
            description:
              "Set intonation correctly after a gauge or tuning change.",
          },
          {
            title: "Alternate Guitar Tunings You Should Try",
            slug: "alternate-guitar-tunings",
            description:
              "Explore Open G, DADGAD, half-step down, and more alternate tunings.",
          },
        ]}
      >
        <h2>How to Use This 7-String Tuner</h2>
        <ol>
          <li>
            Press <strong>Start Recording</strong> on the tuner above and allow
            microphone access.
          </li>
          <li>
            The <strong>7-String Guitar</strong> instrument is already selected.
          </li>
          <li>
            Tune strings 6 through 1 first — these are identical to standard
            6-string tuning.
          </li>
          <li>
            Finish with the low B (string 7, 61.74&nbsp;Hz). Pluck firmly over
            the neck pickup and mute the other strings.
          </li>
        </ol>
        <p>
          If the low B reads erratically, fret it at the 12th fret to sound B2
          at 123.47&nbsp;Hz — an octave up and much easier for a microphone to
          resolve. Tune there, then confirm the open string.
        </p>

        <h2>Standard 7-String Tuning</h2>
        <p>
          Standard 7-string tuning is <strong>B E A D G B E</strong>. The six
          highest strings are exactly a standard 6-string guitar; the addition
          is a low B at <strong>B1, 61.74&nbsp;Hz</strong>, a perfect fourth
          below the low E.
        </p>
        <p>
          That choice of interval matters. Adding the string a fourth below
          continues the pattern already used between strings 6-5, 5-4, and 4-3,
          so scale and arpeggio shapes extend onto the 7th string exactly as
          they behave everywhere else on the neck. Nothing about your existing
          fretboard knowledge has to change.
        </p>

        <h2>7-String vs. Down-Tuning a 6-String</h2>
        <p>
          Both routes get you low notes, and they involve a real trade-off:
        </p>
        <ul>
          <li>
            <strong>A 7-string keeps everything at standard tension.</strong>{" "}
            Strings 1-6 stay exactly where they were. You gain range without
            losing the feel, and you can still play in standard tuning any time.
          </li>
          <li>
            <strong>Down-tuning slackens the whole instrument.</strong>{" "}
            <Link href="/drop-c-tuner">Drop C</Link> reaches C2 at
            65.41&nbsp;Hz — slightly higher than a 7-string's B1 — but the whole
            guitar goes loose and needs heavier strings and a setup.
          </li>
          <li>
            <strong>Drop tunings give one-finger power chords.</strong> Standard
            7-string tuning does not, because the interval between strings 7 and
            6 is a fourth, not the fifth that Drop tunings create. This is why
            Drop A on a 7-string is so popular — it adds that back.
          </li>
        </ul>

        <h2>Common 7-String Tunings</h2>
        <ul>
          <li>
            <strong>Standard (B E A D G B E):</strong> The default.
          </li>
          <li>
            <strong>Drop A (A E A D G B E):</strong> 7th string down a whole
            step, giving one-finger power chords on the bottom three strings.
          </li>
          <li>
            <strong>A standard (A D G C F A D):</strong> Everything down a whole
            step from 7-string standard.
          </li>
          <li>
            <strong>Drop G♯ / A♭:</strong> Half-step-down variants of the above,
            common in modern progressive metal.
          </li>
        </ul>

        <h2>Setup for the 7th String</h2>
        <p>
          The extra string needs attention the others do not. Use at least a
          .056 — most 7-string sets ship with .059 or heavier. Check that the
          nut slot is cut wide enough, as a thick string binding in a narrow
          slot is a frequent cause of tuning instability and audible pinging.
        </p>
        <p>
          Set the 7th string's intonation individually.{" "}
          <Link href="/articles/how-to-intonate-your-guitar">
            Intonation errors
          </Link>{" "}
          are proportionally more audible at low frequencies, and a low B that
          is fine open but sharp at the 12th fret will make everything you play
          on it sound wrong.
        </p>

        <h2>Troubleshooting</h2>
        <p>
          <strong>The tuner cannot read the low B.</strong> Use the 12th-fret
          octave method above, or pluck harder over the neck pickup with the
          other strings muted.
        </p>
        <p>
          <strong>The B reads an octave high.</strong> The tuner has locked onto
          the second harmonic — pluck more softly, away from the bridge.
        </p>
        <p>
          <strong>The low B sounds indistinct and floppy.</strong> Gauge, not
          tuning. Fit a heavier 7th string.
        </p>

        <p>
          Also available: our{" "}
          <Link href="/12-string-guitar-tuner">12-string guitar tuner</Link>,{" "}
          <Link href="/5-string-bass-tuner">5-string bass tuner</Link>, and the{" "}
          <Link href="/drop-c-tuner">Drop C tuner</Link> for reaching low notes
          on a 6-string.
        </p>
      </TunerPageLayout>
    </>
  );
}
