import { Metadata } from "next";
import Link from "next/link";
import TunerPageLayout from "@/components/TunerPageLayout";
import { otherTunersFor } from "@/lib/tunerPages";

export const metadata: Metadata = {
  title: "Open G Tuner — Free Online Open G Guitar Tuner",
  description:
    "Free online Open G guitar tuner. Tune to Open G (D G D G B D) with your microphone, right on this page. Perfect for slide guitar and blues — no download.",
  alternates: { canonical: "/open-g-tuner" },
  openGraph: {
    title: "Open G Tuner — Free Online Open G Guitar Tuner",
    description:
      "Tune your guitar to Open G quickly and accurately using your device's microphone.",
  },
};

export default function OpenGTunerPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Open G Tuner - GuitarTunePro",
    url: "https://www.guitartunepro.com/open-g-tuner",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Free online Open G guitar tuner. Tune your guitar to Open G (D G D G B D) instantly.",
    browserRequirements: "Requires microphone access",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <TunerPageLayout
        title="Open G Tuner"
        description="Tune your guitar to Open G (D G D G B D) using your microphone. The tuner below is already set to Open G — press Start Recording and strum."
        canonicalPath="/open-g-tuner"
        initialTuning="openG"
        otherTuners={otherTunersFor("/open-g-tuner")}
        faqs={[
          {
            question: "What are the notes in Open G tuning?",
            answer:
              "Open G is D G D G B D from lowest to highest string. Strumming all six open strings sounds a G major chord, which is where the name comes from.",
          },
          {
            question: "Which strings change when going from standard to Open G?",
            answer:
              "Three strings change, all downward: the 6th string drops from E to D, the 5th string drops from A to G, and the 1st string drops from E to D. Strings 2, 3, and 4 (B, G, D) stay exactly as they are in standard tuning.",
          },
          {
            question: "Why did Keith Richards remove his 6th string in Open G?",
            answer:
              "In Open G the low D string is not part of the core G-D-G-B-D voicing and can muddy the chord. Removing it leaves a five-string G-D-G-B-D set where every open string belongs to the chord, giving the cutting, uncluttered rhythm tone heard on Brown Sugar and Start Me Up.",
          },
          {
            question: "Is Open G good for slide guitar?",
            answer:
              "It is one of the two standard slide tunings, alongside Open D. Because the open strings already form a major chord, laying a slide straight across any fret gives you a clean major chord at that position — no fretting-hand shapes required.",
          },
          {
            question: "Do I need heavier strings for Open G?",
            answer:
              "Not necessarily, but three strings lose tension, so a standard light set can feel slack and buzz against the frets. If you keep a guitar in Open G permanently, a medium set or a custom gauge with a heavier 6th and 5th string restores normal feel.",
          },
        ]}
        relatedArticles={[
          {
            title: "Alternate Guitar Tunings You Should Try",
            slug: "alternate-guitar-tunings",
            description:
              "Explore Open G, DADGAD, half-step down, and more alternate tunings.",
          },
          {
            title: "Standard Tuning Explained",
            slug: "standard-tuning-explained",
            description:
              "Understand the notes and intervals behind E A D G B E.",
          },
          {
            title: "How to Tune a Guitar by Ear",
            slug: "how-to-tune-a-guitar-by-ear",
            description:
              "Train your ear with relative tuning and harmonic methods.",
          },
        ]}
      >
        <h2>How to Use This Open G Tuner</h2>
        <ol>
          <li>
            Press <strong>Start Recording</strong> on the tuner above and allow
            microphone access.
          </li>
          <li>
            The <strong>Open G</strong> preset is already selected — no settings
            to change.
          </li>
          <li>
            Tune string 6 down from E to D (73.42&nbsp;Hz). Pluck and loosen the
            peg slowly while watching the needle.
          </li>
          <li>Tune string 5 down from A to G (98.00&nbsp;Hz) the same way.</li>
          <li>
            Tune string 1 down from E to D (293.66&nbsp;Hz) — a smaller
            adjustment, but just as important to the chord.
          </li>
          <li>
            Strings 2, 3, and 4 are unchanged. Verify them, then strum all six
            open strings: you should hear a clean G major.
          </li>
        </ol>
        <p>
          Because three strings drop in pitch, the neck loses a noticeable
          amount of tension, and the strings you already tuned will drift flat
          as it settles. Go through all six strings a second time — the second
          pass is what actually gets you in tune.
        </p>

        <h2>What is Open G Tuning?</h2>
        <p>
          <strong>Open G tuning</strong> is one of the most expressive alternate
          guitar tunings, with deep roots in blues, folk, country, and rock. The
          tuning is <strong>D G D G B D</strong> from lowest to highest, so
          strumming the open strings sounds a full G major chord. That single
          property is what makes Open G so powerful for slide guitar,
          fingerpicking, and ringing open voicings.
        </p>
        <p>
          Compared to standard tuning, you are effectively lowering the two
          outer edges of the guitar into the chord: the low E and high E both
          become D, and the A becomes G. What remains — D, G, and B — was
          already a G major triad hiding inside standard tuning.
        </p>

        <h2>Why Learn Open G?</h2>
        <ul>
          <li>
            <strong>Slide guitar:</strong> A bar or glass slide laid straight
            across all strings at any fret produces a major chord, making fluid
            slide playing far easier than in standard tuning.
          </li>
          <li>
            <strong>One-finger chord changes:</strong> Barring all six strings
            at the 5th fret gives C major, at the 7th fret D major. The entire
            I-IV-V of a blues is three bar positions.
          </li>
          <li>
            <strong>Resonant open voicings:</strong> Chords like G, Cadd9, and
            Dsus2 ring with a fullness that standard tuning can't reproduce,
            because more open strings are consonant with the chord.
          </li>
          <li>
            <strong>Melodic bass lines:</strong> The open G and D bass strings
            let you hold a drone or walk a bass line while fingerpicking the
            treble strings.
          </li>
        </ul>

        <h2>Famous Songs in Open G Tuning</h2>
        <ul>
          <li>
            <strong>Brown Sugar — Rolling Stones:</strong> Keith Richards' iconic
            riff, played on a five-string guitar in Open G.
          </li>
          <li>
            <strong>Start Me Up — Rolling Stones:</strong> Another Richards Open
            G classic built on the same five-string approach.
          </li>
          <li>
            <strong>Little Lion Man — Mumford &amp; Sons:</strong> Uses Open G
            for its bright, banjo-like guitar tone.
          </li>
          <li>
            <strong>Dust My Broom — Robert Johnson / Elmore James:</strong> A
            blues slide standard, and the template for a century of Open G slide
            playing.
          </li>
        </ul>

        <h2>Troubleshooting</h2>
        <p>
          <strong>The open strings sound like a chord but slightly sour.</strong>{" "}
          Open tunings expose intonation errors that standard tuning hides,
          because you hear all six strings sounding together as one chord. Tune
          each string to 0 cents rather than "close enough", and check your{" "}
          <Link href="/articles/how-to-intonate-your-guitar">
            guitar's intonation
          </Link>{" "}
          if it still sounds off.
        </p>
        <p>
          <strong>Strings buzz after retuning.</strong> Three strings at lower
          tension sit closer to the frets. A small truss-rod or action
          adjustment fixes it on a guitar that lives in Open G.
        </p>
        <p>
          <strong>It keeps drifting flat.</strong> Normal for the first few
          minutes after a large retune. Strum hard, stretch each string gently,
          and run one more pass.
        </p>

        <p>
          Want to explore further?{" "}
          <Link href="/articles/alternate-guitar-tunings">
            Read our complete guide to alternate guitar tunings
          </Link>
          , or use the{" "}
          <Link href="/">free chromatic guitar tuner</Link> for standard and
          every other preset.
        </p>
      </TunerPageLayout>
    </>
  );
}
