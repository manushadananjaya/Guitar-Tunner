import { Metadata } from "next";
import { languageAlternates } from "@/lib/i18n/pages";
import Link from "next/link";
import TunerPageLayout from "@/components/TunerPageLayout";
import { otherInstrumentsFor } from "@/lib/instrumentPages";

export const metadata: Metadata = {
  title:
    "12-String Guitar Tuner — Free Online",
  description:
    "Free online 12-string guitar tuner. Tune all six courses and their octave pairs with your microphone, right on this page. No download required.",
  alternates: {
    canonical: "/12-string-guitar-tuner",
    languages: languageAlternates("/12-string-guitar-tuner"),
  },
  openGraph: {
    title: "12-String Guitar Tuner — Free Online 12-String Tuner",
    description:
      "Tune your 12-string guitar quickly and accurately using your device's microphone.",
  },
};

export default function TwelveStringTunerPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "12-String Guitar Tuner - GuitarTunePro",
    url: "https://www.guitartunepro.com/12-string-guitar-tuner",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Free online 12-string guitar tuner. Tune all six courses and octave pairs instantly.",
    browserRequirements: "Requires microphone access",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <TunerPageLayout
        title="12-String Guitar Tuner"
        description="Tune your 12-string guitar using your microphone. The tuner below is already set for all six courses and their octave pairs — press Start Recording and pluck one string at a time."
        canonicalPath="/12-string-guitar-tuner"
        initialGuitarType="twelveString"
        chartMode="courses"
        chartCaption="A 12-string has six courses of two strings each, not twelve independent strings. The bottom four courses are tuned in octaves; the top two are tuned in unison. These are the exact target frequencies this tuner listens for, at A4 = 440 Hz."
        otherTuners={otherInstrumentsFor("/12-string-guitar-tuner")}
        faqs={[
          {
            question: "How is a 12-string guitar tuned?",
            answer:
              "In six courses of two strings. The bottom four courses (E, A, D, G) pair a standard-pitch string with one tuned an octave higher. The top two courses (B and E) are tuned in unison — both strings to the same pitch. The overall tuning is standard E A D G B E.",
          },
          {
            question: "Why are only four courses in octaves?",
            answer:
              "Because an octave above the high E course would be E5 at 659 Hz on a very thin string, which would be under enormous tension and break constantly. The top two courses are doubled in unison instead, which still thickens the sound without demanding an impossible string.",
          },
          {
            question: "Should I tune a 12-string down a half step?",
            answer:
              "Many players do, and on older or lightly built instruments it is genuinely advisable. Twelve strings put roughly double the tension of a 6-string on the top and neck — often over 250 pounds. Tuning down a semitone or a whole step meaningfully reduces that, and many vintage 12-strings were designed with it in mind.",
          },
          {
            question: "Why does my 12-string never sound quite in tune?",
            answer:
              "Partly physics. Two strings sounding the same note will always beat slightly against each other unless they match perfectly, and small intonation differences between a thick string and a thin one are unavoidable. A small amount of shimmer is the instrument's characteristic sound, not a fault. What you can fix is gross error — tune each of the twelve strings individually rather than by course.",
          },
          {
            question: "Can I use a regular tuner for a 12-string?",
            answer:
              "Yes, as long as you tune one string at a time and mute its partner. A tuner hearing both strings of a course at once will read an average or jump between them. Muting the partner with a finger is the standard technique.",
          },
        ]}
        relatedArticles={[
          {
            title: "Why Your Guitar Goes Out of Tune",
            slug: "why-your-guitar-goes-out-of-tune",
            description:
              "The mechanical causes behind pitch drift, and how to reduce them.",
          },
          {
            title: "How to Intonate Your Guitar",
            slug: "how-to-intonate-your-guitar",
            description:
              "Set intonation correctly — a real challenge on a 12-string.",
          },
          {
            title: "How Temperature and Humidity Affect Tuning",
            slug: "how-temperature-and-humidity-affect-guitar-tuning",
            description:
              "Why your instrument drifts between rooms, seasons, and stages.",
          },
        ]}
      >
        <h2>How to Use This 12-String Tuner</h2>
        <ol>
          <li>
            Press <strong>Start Recording</strong> on the tuner above and allow
            microphone access.
          </li>
          <li>
            The <strong>12-String Guitar</strong> instrument is already
            selected.
          </li>
          <li>
            <strong>Tune one string at a time, muting its partner.</strong> Rest
            a finger on the other string of the course while you pluck. This is
            the single most important technique on this page — a tuner hearing
            both strings at once cannot give a stable reading.
          </li>
          <li>
            Work through the courses from 6 to 1. Within each course, tune the
            thicker main string first, then its octave or unison partner.
          </li>
          <li>
            Run a second and probably a third full pass. Twelve strings means
            twelve tension changes, and the neck moves throughout.
          </li>
        </ol>

        <h2>How 12-String Tuning Works</h2>
        <p>
          A 12-string is not twelve independent strings. It is{" "}
          <strong>six courses of two</strong>, played as though it were a
          6-string — your pick or fingers strike both strings of a course
          together and you fret both at once.
        </p>
        <p>The two strings in each course are not always the same pitch:</p>
        <ul>
          <li>
            <strong>Courses 6, 5, 4, and 3 (E, A, D, G) are octave pairs.</strong>{" "}
            A normal-gauge string at standard pitch is paired with a much
            thinner one tuned a full octave higher. The low E course, for
            example, is E2 at 82.41&nbsp;Hz alongside E3 at 164.81&nbsp;Hz.
          </li>
          <li>
            <strong>Courses 2 and 1 (B and E) are unison pairs.</strong> Both
            strings sound the same pitch.
          </li>
        </ul>
        <p>
          Those four octave pairs are the whole point of the instrument. Every
          note you play sounds simultaneously in two octaves, which produces the
          bright, chiming, chorus-like shimmer that no 6-string can imitate — the
          sound of Hotel California's intro and the opening chord of A Hard
          Day's Night.
        </p>

        <h2>Why the Top Two Courses Are Unison</h2>
        <p>
          A reasonable question: if octave pairs sound so good, why not use them
          everywhere?
        </p>
        <p>
          The answer is tension. Doubling the high E course at the octave would
          require a string tuned to E5 at 659.26&nbsp;Hz. To reach that pitch at
          playable tension the string would need to be extraordinarily thin, and
          it would sit very close to its breaking point. In practice such a
          string snaps constantly. The same problem applies, slightly less
          severely, to the B course.
        </p>
        <p>
          So the top two courses double in unison instead. You still get the
          thickening and the slight natural chorus from two strings never being
          in perfect agreement, without an unusable string.
        </p>

        <h2>The Tension Problem</h2>
        <p>
          Twelve strings exert roughly <strong>double the pull</strong> of a
          6-string — frequently over 250 pounds of force on the top and neck.
          This is the defining practical fact about owning one.
        </p>
        <p>Consequences worth knowing:</p>
        <ul>
          <li>
            <strong>Many players tune down.</strong> A half step or a whole step
            below standard significantly reduces load. A great many vintage
            12-strings were built expecting it, and tuning one to concert pitch
            can damage it over time.
          </li>
          <li>
            <strong>They drift more.</strong> More strings, more tension, more
            interaction — a 12-string simply will not hold pitch as well as a
            6-string, and multiple tuning passes are normal rather than a sign
            of a problem.
          </li>
          <li>
            <strong>Never leave one in a hot car or dry room.</strong> The
            combination of high tension and environmental change is what lifts
            bridges.
          </li>
        </ul>

        <h2>Getting a 12-String to Sound In Tune</h2>
        <p>
          A 12-string will never be as cleanly in tune as a 6-string, and
          chasing perfection is a mistake — a little shimmer between paired
          strings is the instrument's voice. But you can eliminate the errors
          that genuinely sound bad:
        </p>
        <ul>
          <li>
            <strong>Tune each string individually.</strong> Never tune a course
            as a pair.
          </li>
          <li>
            <strong>Tune the octave strings precisely.</strong> The thin octave
            strings are the most audible when wrong, because a mistuned high
            octave beats fast and obviously against its partner.
          </li>
          <li>
            <strong>Retune after playing a few chords.</strong> Twelve strings
            settle against each other.
          </li>
          <li>
            <strong>Change all twelve at once.</strong> Mixing old and new
            strings makes intonation across courses much worse.
          </li>
        </ul>

        <h2>Troubleshooting</h2>
        <p>
          <strong>The needle will not settle on any string.</strong> You are
          almost certainly hearing both strings of the course. Mute the partner
          with a finger.
        </p>
        <p>
          <strong>One course sounds "wobbly" even when both strings read
          0 cents.</strong> Slight beating between two strings at the same
          nominal pitch is normal and desirable. If it is fast and unpleasant
          rather than a slow shimmer, one string is out by more than the tuner's
          display resolution — nudge it by ear until the beating slows.
        </p>
        <p>
          <strong>An octave string keeps breaking.</strong> They are under the
          most tension of any string on the instrument. Check the nut and bridge
          for burrs, and consider tuning the whole guitar down a half step.
        </p>

        <p>
          Also available: our{" "}
          <Link href="/7-string-guitar-tuner">7-string guitar tuner</Link>,{" "}
          <Link href="/ukulele-tuner">ukulele tuner</Link>, and the{" "}
          <Link href="/">free chromatic guitar tuner</Link>.
        </p>
      </TunerPageLayout>
    </>
  );
}
