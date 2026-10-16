import { Metadata } from "next";
import { languageAlternates } from "@/lib/i18n/pages";
import Link from "next/link";
import TunerPageLayout from "@/components/TunerPageLayout";
import { otherInstrumentsFor } from "@/lib/instrumentPages";

export const metadata: Metadata = {
  title: "Viola Tuner — Free Online C G D A Tuner",
  description:
    "Free online viola tuner. Tune your viola to C G D A with your microphone, right on this page. Works for any viola size — no download required.",
  alternates: {
    canonical: "/viola-tuner",
    languages: languageAlternates("/viola-tuner"),
  },
  openGraph: {
    title: "Viola Tuner — Free Online C G D A Tuner",
    description:
      "Tune your viola quickly and accurately using your device's microphone.",
  },
};

export default function ViolaTunerPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Viola Tuner - GuitarTunePro",
    url: "https://www.guitartunepro.com/viola-tuner",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Free online viola tuner. Tune your viola to standard C G D A instantly.",
    browserRequirements: "Requires microphone access",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <TunerPageLayout
        title="Viola Tuner"
        description="Tune your viola to C G D A using your microphone. The tuner below is already set for viola — press Start Recording and bow or pluck an open string."
        canonicalPath="/viola-tuner"
        initialGuitarType="viola"
        chartCaption="These are the exact target frequencies this tuner listens for, at A4 = 440 Hz equal temperament. String 1 is the A, the highest string."
        otherTuners={otherInstrumentsFor("/viola-tuner")}
        faqs={[
          {
            question: "What are the notes of the viola strings?",
            answer:
              "From lowest to highest: C3, G3, D4, and A4. The strings are tuned in perfect fifths, a fifth lower than the violin. The top three strings — G, D, and A — are exactly the same pitches as the violin's bottom three.",
          },
          {
            question: "Can I use a violin tuner for a viola?",
            answer:
              "For the G, D, and A strings, yes — they are identical pitches. But a violin tuner will look for an E5 on string 1 and has no C3 at all, so the auto-detection will be wrong. This page is set to the viola's C G D A so every string is detected correctly.",
          },
          {
            question: "Why is my C string hard for the tuner to read?",
            answer:
              "At 130.81 Hz it is the lowest note on the instrument, and many phone and laptop microphones are less sensitive down there. Bow with a full, steady stroke, hold the phone a little closer to the instrument, and keep the room quiet. Plucking it firmly also works.",
          },
          {
            question: "Does viola size affect the tuning?",
            answer:
              "No. Violas are sized by body length in inches — roughly 15 to 17½ inches for adults, smaller for children — but every size tunes to the same C G D A.",
          },
          {
            question: "My orchestra tunes to A = 442. How do I use this tuner?",
            answer:
              "This tuner measures against A = 440 Hz. A = 442 is about 8 cents higher, so tune each string to roughly +8 cents instead of 0. Moving every string by the same amount keeps the fifths between them pure.",
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
        <h2>How to Use This Viola Tuner</h2>
        <ol>
          <li>
            Press <strong>Start Recording</strong> on the tuner above and allow
            microphone access.
          </li>
          <li>
            The <strong>Viola</strong> instrument is already selected.
          </li>
          <li>
            Start with the A string (440.00&nbsp;Hz). Bow a long, even note and
            adjust until the needle centres at 0 cents.
          </li>
          <li>
            Tune the D (293.66&nbsp;Hz), then the G (196.00&nbsp;Hz), then the C
            (130.81&nbsp;Hz).
          </li>
          <li>
            Check the A once more. Bringing the lower strings up to pitch adds
            pressure on the bridge and can pull the A down slightly.
          </li>
        </ol>
        <p>
          Use the fine tuners for small corrections and the pegs only when a
          string is a long way out. Push each peg gently into the pegbox as you
          turn it, so it holds when you let go.
        </p>

        <h2>How the Viola Relates to the Violin and Cello</h2>
        <p>
          The three main bowed string instruments share a simple family
          relationship, which is handy when you are reading the chart above:
        </p>
        <ul>
          <li>
            <strong>Violin:</strong> G3 D4 A4 E5
          </li>
          <li>
            <strong>Viola:</strong> C3 G3 D4 A4 — a fifth below the violin
          </li>
          <li>
            <strong>Cello:</strong> C2 G2 D3 A3 — an octave below the viola
          </li>
        </ul>
        <p>
          So the viola drops the violin&rsquo;s E and adds a C underneath. That
          C string is what gives the viola its darker, warmer voice, and it is
          also the string that most often needs attention — thick strings take
          longer to settle after a change and react more to temperature.
        </p>

        <h2>Tuning in Fifths by Ear</h2>
        <p>
          With the A set, play the A and D strings together as a double stop
          and listen. A perfect fifth that is in tune sounds still and
          resonant. If you hear a slow pulsing, one string is off — adjust the
          D until the pulsing slows and disappears. Repeat for D–G and G–C.
        </p>
        <p>
          The low C–G fifth is the hardest to hear because the beating is
          slower in the low register. The tuner is especially useful here: set
          the C with it, then play the C–G fifth to learn what &ldquo;pure&rdquo;
          sounds like at that depth.
        </p>

        <h2>Watch the Bridge</h2>
        <p>
          Like a violin bridge, a viola bridge is held only by string pressure.
          Repeated tightening with the pegs drags the top of it towards the
          fingerboard. After changing strings, look from the side: the back of
          the bridge should stand roughly at a right angle to the top. A bridge
          that leans forward can warp or fall. If it needs straightening and you
          have not done it before, ask a teacher or luthier.
        </p>

        <h2>Troubleshooting</h2>
        <p>
          <strong>The tuner shows the C as a G.</strong> It is picking up the
          G harmonic that sits a twelfth above the C. Bow a little closer to the
          fingerboard with a heavier, slower stroke, or pluck the string.
        </p>
        <p>
          <strong>The A string fine tuner has run out of thread.</strong> Turn
          it back to the middle, then raise the pitch with the peg to make up the
          difference.
        </p>
        <p>
          <strong>All four strings are flat every day.</strong> Normal for a
          week or so after new strings. If not, the cause is usually the room —
          heating and dry air shrink the wood and the pitch drops.
        </p>

        <p>
          Also available: our <Link href="/violin-tuner">violin tuner</Link>,{" "}
          <Link href="/cello-tuner">cello tuner</Link>, and the{" "}
          <Link href="/metronome">online metronome</Link>.
        </p>
      </TunerPageLayout>
    </>
  );
}
