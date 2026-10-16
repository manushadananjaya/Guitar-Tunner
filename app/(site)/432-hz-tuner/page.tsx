import { Metadata } from "next";
import { languageAlternates } from "@/lib/i18n/pages";
import Link from "next/link";
import TunerPageLayout from "@/components/TunerPageLayout";
import { otherTunersFor } from "@/lib/tunerPages";

export const metadata: Metadata = {
  title: "432 Hz Tuner — Free Online Tuner at A = 432",
  description:
    "Free online 432 Hz tuner. Tune your guitar to A = 432 Hz with your microphone, right on this page — every string retargeted automatically. No download.",
  alternates: {
    canonical: "/432-hz-tuner",
    languages: languageAlternates("/432-hz-tuner"),
  },
  openGraph: {
    title: "432 Hz Tuner — Free Online Tuner at A = 432",
    description:
      "Tune your guitar to A = 432 Hz using your device's microphone.",
  },
};

export default function Tuner432Page() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "432 Hz Tuner - GuitarTunePro",
    url: "https://www.guitartunepro.com/432-hz-tuner",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Free online 432 Hz tuner. Tune any instrument to A = 432 Hz instantly.",
    browserRequirements: "Requires microphone access",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <TunerPageLayout
        title="432 Hz Tuner"
        description="Tune to A = 432 Hz using your microphone. The tuner below is already set to 432 — press Start Recording and pluck a string. Every target is recalculated for you."
        canonicalPath="/432-hz-tuner"
        initialReference={432}
        otherTuners={otherTunersFor("/432-hz-tuner")}
        faqs={[
          {
            question: "What does tuning to 432 Hz mean?",
            answer:
              "It means the A above middle C is set to 432 vibrations per second instead of the standard 440. Every other note moves down by the same proportion — about 31.8 cents, just under a third of a semitone — so chords, scales, and tab all work exactly as before.",
          },
          {
            question: "Can I use this for bass, ukulele, or violin?",
            answer:
              "Yes. Open the settings panel under the tuner and pick your instrument; the reference stays at 432 and every string is retargeted. You can also set any other reference pitch there, from 415 to 466 Hz.",
          },
          {
            question: "Is 432 Hz better than 440 Hz?",
            answer:
              "It is a matter of taste. Claims that 432 is healthier or more natural have not held up in blind listening tests — most people cannot tell the two apart without a reference. Some players do prefer how their instrument feels and sounds a little lower, and that is a perfectly good reason to use it.",
          },
          {
            question: "Will I be in tune with other musicians?",
            answer:
              "Only if they also tune to 432. Recordings, backing tracks, keyboards, and most other players use 440, and against them a 432-tuned guitar sounds noticeably flat.",
          },
          {
            question: "Does 432 Hz change string tension or my setup?",
            answer:
              "Very slightly. Dropping about a third of a semitone lowers the tension on each string by roughly 3.6%, far less than tuning a half step down. Action and intonation are effectively unchanged.",
          },
        ]}
        relatedArticles={[
          {
            title: "432 Hz vs 440 Hz Tuning",
            slug: "432-hz-vs-440-hz-tuning",
            description:
              "Where 440 came from, what 432 changes, and which claims hold up.",
          },
          {
            title: "Standard Tuning Explained",
            slug: "standard-tuning-explained",
            description:
              "Why the guitar is tuned E A D G B E in the first place.",
          },
          {
            title: "How to Use a Chromatic Tuner",
            slug: "how-to-use-a-chromatic-tuner",
            description:
              "Reading cents, needles, and note names on any chromatic tuner.",
          },
        ]}
      >
        <h2>How to Tune to 432 Hz</h2>
        <ol>
          <li>
            Press <strong>Start Recording</strong> on the tuner above and allow
            microphone access.
          </li>
          <li>
            The reference pitch is already set to <strong>A4 = 432 Hz</strong>
            , shown next to the target frequency.
          </li>
          <li>
            Pluck the low E string. Its 432 target is 80.91&nbsp;Hz rather than
            82.41&nbsp;Hz. Tune until the needle centres at 0 cents.
          </li>
          <li>
            Work across the remaining strings. The tuner still names them E A D
            G B E — only the frequencies have moved.
          </li>
          <li>
            Run a second pass. Lowering six strings changes the pull on the
            neck, and the first strings will have shifted slightly.
          </li>
        </ol>
        <p>
          If your guitar was at 440 a moment ago, every string is about 32
          cents sharp of its new target. That is a small turn of each peg —
          less than a third of the way to the next semitone down.
        </p>

        <h2>What Changes at 432 Hz</h2>
        <p>
          Concert pitch is the frequency everything else is measured from. At
          the modern standard, A4 is 440&nbsp;Hz; at 432 it is 8&nbsp;Hz lower.
          Because tuning is proportional, every note on the instrument drops by
          the same ratio — 432/440, or about 31.8 cents.
        </p>
        <ul>
          <li>
            <strong>Intervals are untouched.</strong> An octave is still an
            octave and a fifth is still a fifth, so every chord shape and scale
            works exactly as it did.
          </li>
          <li>
            <strong>The sound is a little lower and slacker.</strong> Many
            players describe it as warmer. The difference is subtle, and much of
            it is the slightly lower string tension.
          </li>
          <li>
            <strong>You leave the standard grid.</strong> Play along with a
            440 recording and you will sound flat by about a third of a
            semitone.
          </li>
        </ul>

        <h2>The 432 Hz Frequencies</h2>
        <p>
          The chart above shows every string&rsquo;s target at 432. For
          comparison with standard pitch:
        </p>
        <ul>
          <li>Low E: 80.91&nbsp;Hz (440: 82.41&nbsp;Hz)</li>
          <li>A: 108.00&nbsp;Hz (440: 110.00&nbsp;Hz)</li>
          <li>D: 144.16&nbsp;Hz (440: 146.83&nbsp;Hz)</li>
          <li>G: 192.43&nbsp;Hz (440: 196.00&nbsp;Hz)</li>
          <li>B: 242.45&nbsp;Hz (440: 246.94&nbsp;Hz)</li>
          <li>High E: 323.63&nbsp;Hz (440: 329.63&nbsp;Hz)</li>
        </ul>

        <h2>Other Reference Pitches</h2>
        <p>
          432 is not the only alternative. The settings panel under the tuner
          lets you set A4 anywhere from 415 to 466&nbsp;Hz:
        </p>
        <ul>
          <li>
            <strong>442 or 443 Hz</strong> — common in European orchestras,
            for a slightly brighter sound.
          </li>
          <li>
            <strong>415 Hz</strong> — the usual pitch for baroque ensembles
            playing period instruments, a semitone below 440.
          </li>
          <li>
            <strong>Matching a recording</strong> — older recordings and some
            pianos sit a few hertz away from 440. Nudge the reference until the
            open strings agree with the track.
          </li>
        </ul>
        <p>
          The tuner remembers the reference pitch you choose on this device,
          so the other tuner pages open at your last setting. This page always
          opens at 432.
        </p>

        <p>
          Want the full background? Read{" "}
          <Link href="/articles/432-hz-vs-440-hz-tuning">
            432 Hz vs 440 Hz Tuning
          </Link>
          , or go back to the{" "}
          <Link href="/">standard 440 Hz guitar tuner</Link>.
        </p>
      </TunerPageLayout>
    </>
  );
}
