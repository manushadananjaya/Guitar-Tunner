import { Metadata } from "next";
import Link from "next/link";
import ToolPageLayout from "@/components/ToolPageLayout";
import { StrobeTuner } from "@/components/StrobeTuner/StrobeTuner";
import { otherToolLinks } from "@/lib/toolPages";

export const metadata: Metadata = {
  title: "Online Strobe Tuner — Free Chromatic Strobe",
  description:
    "Free online strobe tuner for guitar and bass. Moving bands show which way you are off and how far, and stop when you are in tune. Chromatic, any tuning.",
  alternates: { canonical: "/strobe-tuner" },
  openGraph: {
    title: "Online Strobe Tuner — Bands Stop When You're in Tune",
    description:
      "A chromatic strobe-style tuner in your browser: drift left for flat, right for sharp, still for in tune.",
  },
};

export default function StrobeTunerPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Online Strobe Tuner - GuitarTunePro",
    url: "https://www.guitartunepro.com/strobe-tuner",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Chromatic strobe-style tuner for guitar and bass that runs in the browser, with moving bands, a cents and hertz readout and adjustable concert pitch.",
    browserRequirements: "Requires microphone access",
    featureList: [
      "Strobe-style display: bands drift with the size and direction of the error",
      "Chromatic, from below a 5-string bass's low B to the top of the guitar",
      "Offset readout in cents and frequency in hertz",
      "Concert pitch 432, 440, 442 or 443 Hz",
      "Audio processed on the device",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <ToolPageLayout
        title="Online Strobe Tuner"
        description="Play a note and watch the bands. They drift left when you are flat, right when you are sharp, and stop when you are in tune."
        canonicalPath="/strobe-tuner"
        tool={<StrobeTuner />}
        otherTools={otherToolLinks("/strobe-tuner")}
        faqs={[
          {
            question: "Is this as accurate as a hardware strobe tuner?",
            answer:
              "No, and we would rather say so. Dedicated strobe tuners are specified to a tenth of a cent. This page uses the same pitch detector as our main tuner, which we measured at under 2 cents of error per reading in quiet conditions. The strobe display makes small errors easier to see and the readout shows tenths of a cent, but it cannot make the microphone or the measurement more precise than that.",
          },
          {
            question: "Why use a strobe display instead of a needle?",
            answer:
              "Because motion is easier to judge than position. A needle a cent or two off centre is hard to see, but a band creeping slowly across the screen is obvious, and so is the moment it stops. Strobe displays are favoured for setup work such as intonation, where you are chasing very small differences.",
          },
          {
            question: "Why are there three bands moving at different speeds?",
            answer:
              "All three show the same error. The finer stripes move past faster for the same offset, so the bottom band picks up the smallest drift and the top band stays readable when you are further off. Mechanical strobe tuners have several rings for a similar reason.",
          },
          {
            question: "The bands never stop completely. Is my guitar out of tune?",
            answer:
              "Not necessarily. A plucked string goes slightly sharp at the attack and settles as it rings, and every reading carries a little measurement noise. If the bands rock gently back and forth around a standstill rather than drifting steadily one way, you are in tune. Let the note ring and judge the steady part, not the pluck.",
          },
          {
            question: "Can it tune a bass?",
            answer:
              "Yes. It listens down to about 38 Hz, below a 4-string bass's low E (41.2 Hz). A 5-string's low B (30.9 Hz) is below that, so the tuner reads it through its harmonics. Phone microphones capture very little at these pitches; play firmly and hold the phone close.",
          },
        ]}
        relatedArticles={[
          {
            title: "How to Intonate Your Guitar",
            slug: "how-to-intonate-your-guitar",
            description: "The job strobe tuners are best at.",
          },
          {
            title: "How to Use a Chromatic Tuner",
            slug: "how-to-use-a-chromatic-tuner",
            description: "Reading any tuner, and tuning up to the note.",
          },
          {
            title: "Why Your Guitar Goes Out of Tune",
            slug: "why-your-guitar-goes-out-of-tune",
            description: "What to fix when strings will not stay put.",
          },
        ]}
      >
        <h2>How to Read a Strobe Tuner</h2>
        <ol>
          <li>
            Press <strong>Start microphone</strong> and allow access. Audio is
            analysed on your device and never uploaded.
          </li>
          <li>
            Play one string and let it ring. The large letter is the nearest
            note — the strobe is chromatic, so it works in any tuning.
          </li>
          <li>
            Watch the direction. Bands drifting <strong>left</strong> mean the
            note is <strong>flat</strong>: tighten the string. Drifting{" "}
            <strong>right</strong> means <strong>sharp</strong>: loosen it.
          </li>
          <li>
            The faster the drift, the further off you are. Make your turns
            smaller as the bands slow down.
          </li>
          <li>
            When the bands stand still and turn green, you are within a cent of
            the note.
          </li>
        </ol>
        <p>
          Tune up to each note rather than down to it: if you overshoot, drop
          below and come back up. Approaching from below leaves the string
          wound tight around the tuning post, so it does not slip flat later.
        </p>

        <h2>What Makes a Strobe Different</h2>
        <p>
          A needle tuner tells you <em>where</em> the pitch is. A strobe tells
          you <em>how fast it is moving away</em> from the target. Real strobe
          tuners date from the 1930s: a disc printed with stripes spun at the
          exact speed of the target note, lit by a lamp flashing at the
          frequency of your string. When the two matched, the stripes appeared
          to freeze. Any difference made them drift, and the drift speed was
          the difference.
        </p>
        <p>
          This page draws the same picture in software. It measures your
          note, works out how many cents it is from the nearest equal-tempered
          pitch, and moves the bands at a speed proportional to that offset.
          One cent off is a slow creep you can watch; ten cents is a brisk
          drift; fifty is a blur, which is when the number above the bands is
          more useful.
        </p>

        <h2>When to Use It</h2>
        <ul>
          <li>
            <strong>Intonation.</strong> Compare the open string, or its
            12th-fret harmonic, with the fretted 12th-fret note. Both should
            hold the bands still. If the fretted note drifts right, move the
            saddle back; if left, move it forward. The{" "}
            <Link href="/intonation-checker">intonation checker</Link> walks
            through this string by string.
          </li>
          <li>
            <strong>Checking a setup</strong> after new strings, a truss rod
            adjustment or a tuning change, when you want more resolution than
            a needle gives.
          </li>
          <li>
            <strong>Any tuning, any instrument.</strong> Because it is
            chromatic, it works for{" "}
            <Link href="/drop-c-tuner">Drop C</Link>,{" "}
            <Link href="/open-g-tuner">open G</Link> or anything else on the{" "}
            <Link href="/tunings">tunings chart</Link>. If you would rather have
            the target strings laid out for you, the{" "}
            <Link href="/">standard guitar tuner</Link> does that.
          </li>
        </ul>

        <h2>Getting a Clean Reading</h2>
        <p>
          The strobe is only as steady as the signal it hears. Mute the strings
          you are not tuning, pluck firmly but not hard — a hard attack pushes
          the pitch sharp for the first fraction of a second — and hold the
          phone or laptop close to the guitar. Judge the bands once the note
          has settled. For the method and measurements behind the detector,
          see <Link href="/accuracy">how accurate is this tuner</Link>.
        </p>
      </ToolPageLayout>
    </>
  );
}
