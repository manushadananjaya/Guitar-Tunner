import { Metadata } from "next";
import { languageAlternates } from "@/lib/i18n/pages";
import Link from "next/link";
import TunerPageLayout from "@/components/TunerPageLayout";
import { otherInstrumentsFor } from "@/lib/instrumentPages";

export const metadata: Metadata = {
  title: "Baritone Ukulele Tuner — Free DGBE Tuner",
  description:
    "Free online baritone ukulele tuner. Tune your baritone uke to standard D G B E with your microphone, right on this page — no download required.",
  alternates: {
    canonical: "/baritone-ukulele-tuner",
    languages: languageAlternates("/baritone-ukulele-tuner"),
  },
  openGraph: {
    title: "Baritone Ukulele Tuner — Free DGBE Tuner",
    description:
      "Tune your baritone ukulele quickly and accurately using your device's microphone.",
  },
};

export default function BaritoneUkuleleTunerPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Baritone Ukulele Tuner - GuitarTunePro",
    url: "https://www.guitartunepro.com/baritone-ukulele-tuner",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Free online baritone ukulele tuner. Tune to standard D G B E instantly.",
    browserRequirements: "Requires microphone access",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <TunerPageLayout
        title="Baritone Ukulele Tuner"
        description="Tune your baritone ukulele to D G B E using your microphone. The tuner below is already set for baritone uke — press Start Recording and pluck a string."
        canonicalPath="/baritone-ukulele-tuner"
        initialGuitarType="baritoneUkulele"
        chartCaption="These are the exact target frequencies this tuner listens for, at A4 = 440 Hz equal temperament. Unlike a standard ukulele, the baritone is tuned in order: string 4 (D) is the lowest and string 1 (E) the highest."
        otherTuners={otherInstrumentsFor("/baritone-ukulele-tuner")}
        faqs={[
          {
            question: "What is baritone ukulele tuning?",
            answer:
              "D G B E, from string 4 to string 1 — D3, G3, B3, E4. These are exactly the same pitches as the top four strings of a guitar.",
          },
          {
            question: "Can I tune a baritone ukulele to GCEA?",
            answer:
              "Only with strings made for it. Some makers sell GCEA sets for the baritone scale, but standard baritone strings tuned up to GCEA would be under too much tension and risk breaking or damaging the bridge. With normal baritone strings, stay in DGBE.",
          },
          {
            question: "Do soprano ukulele chord charts work on a baritone?",
            answer:
              "The finger shapes work, but they make different chords. Every shape sounds a perfect fourth lower on a baritone: the shape that makes C on a soprano, concert, or tenor uke makes G on a baritone. Guitar chord charts for the top four strings work exactly as written.",
          },
          {
            question: "Why are two of my strings wound?",
            answer:
              "The D and G strings on most baritone sets are metal-wound to get enough mass for the low pitch on a short scale. They sound warmer and slightly louder than the plain nylon B and E. That is normal, not a mistake in the string set.",
          },
          {
            question: "Is the baritone ukulele tuning linear or reentrant?",
            answer:
              "Linear — the strings run from lowest to highest in order. A few players use a reentrant high D on string 4, but standard baritone tuning, and this tuner, use the low D3.",
          },
        ]}
        relatedArticles={[
          {
            title: "Standard Tuning Explained",
            slug: "standard-tuning-explained",
            description:
              "Why the guitar's top four strings — and the baritone — are D G B E.",
          },
          {
            title: "How to Use a Chromatic Tuner",
            slug: "how-to-use-a-chromatic-tuner",
            description:
              "Reading cents, needles, and note names on any chromatic tuner.",
          },
          {
            title: "Why Your Guitar Goes Out of Tune",
            slug: "why-your-guitar-goes-out-of-tune",
            description:
              "The mechanical causes of pitch drift on any stringed instrument.",
          },
        ]}
      >
        <h2>How to Use This Baritone Ukulele Tuner</h2>
        <ol>
          <li>
            Press <strong>Start Recording</strong> on the tuner above and allow
            microphone access.
          </li>
          <li>
            The <strong>Baritone Ukulele</strong> instrument is already
            selected.
          </li>
          <li>
            Pluck string 4 (D, 146.83&nbsp;Hz) and turn its peg until the needle
            centres at 0 cents.
          </li>
          <li>
            Work across to string 3 (G, 196.00&nbsp;Hz), string 2 (B,
            246.94&nbsp;Hz), and string 1 (E, 329.63&nbsp;Hz).
          </li>
          <li>
            Run a second pass. Nylon strings stretch, and the first strings you
            tuned will have moved.
          </li>
        </ol>

        <h2>Baritone vs. Standard Ukulele Tuning</h2>
        <p>
          The baritone is the largest common ukulele, at around 30 inches, and
          it is the odd one out in tuning:
        </p>
        <ul>
          <li>
            <strong>Soprano, concert, tenor:</strong> G C E A, reentrant — the
            G is a high G4, so the strings are not in pitch order.
          </li>
          <li>
            <strong>Baritone:</strong> D G B E, linear — string 4 is the lowest
            and string 1 the highest, just like a guitar.
          </li>
        </ul>
        <p>
          The top three strings of a baritone (G B E) are a perfect fourth
          below the top three of a standard uke (C E A). The 4th string is a
          different story: a standard uke&rsquo;s high G4 becomes a low D3,
          more than an octave lower. That low D is what gives the baritone its
          deeper, more guitar-like sound.
        </p>
        <p>
          If you came here with a soprano, concert, or tenor uke, use the{" "}
          <Link href="/ukulele-tuner">standard GCEA ukulele tuner</Link>{" "}
          instead.
        </p>

        <h2>Coming From Guitar?</h2>
        <p>
          A baritone ukulele is tuned like the top four strings of a guitar,
          so every chord shape you know on those strings works and keeps its
          name. A G-shape on the top four guitar strings is a G on the baritone.
          The only thing missing is the two bass strings, so stick to the
          four-string voicings.
        </p>

        <h2>Troubleshooting</h2>
        <p>
          <strong>The D string reads an octave high.</strong> The tuner is
          catching the second harmonic of the wound string. Pluck over the
          soundhole rather than near the bridge, and let the note ring.
        </p>
        <p>
          <strong>New strings won&rsquo;t hold pitch.</strong> Normal for the
          first several days. Stretch each string gently along its length, then
          retune; repeat a few times.
        </p>

        <p>
          Also available: our <Link href="/ukulele-tuner">ukulele tuner</Link>,{" "}
          <Link href="/">guitar tuner</Link>, and the{" "}
          <Link href="/chords">chord library</Link>.
        </p>
      </TunerPageLayout>
    </>
  );
}
