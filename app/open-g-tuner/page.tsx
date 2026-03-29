import { Metadata } from "next";
import Link from "next/link";
import ArticleLayout from "@/components/ArticleLayout";

export const metadata: Metadata = {
  title: "Open G Tuner — Free Online Open G Guitar Tuner | GuitarTunePro",
  description:
    "Free online Open G guitar tuner. Tune your guitar to Open G (D G D G B D) instantly with your microphone. No download needed. Works on any device.",
  alternates: { canonical: "/open-g-tuner" },
  openGraph: {
    title: "Open G Tuner — Free Online Open G Guitar Tuner",
    description:
      "Quickly tune your guitar to Open G using your device's microphone. No app required.",
  },
};

export default function OpenGTunerPage() {
  return (
    <ArticleLayout
      slug="open-g-tuner"
      canonicalPath="/open-g-tuner"
      title="Open G Tuner"
      description="Free online Open G tuner — tune your guitar to D G D G B D using your microphone. Loved by blues and slide guitarists."
      datePublished="2025-03-01"
      dateModified="2026-03-29"
      readingTimeMinutes={6}
      heroImage={{
        src: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=900&q=80",
        alt: "Guitar being played in Open G tuning",
        credit: "Photo: Unsplash",
      }}
      faqs={[
        {
          question: "What are the notes in Open G tuning?",
          answer:
            "Open G tuning is D G D G B D from the lowest to highest string. Strings 6, 5, and 1 change from standard tuning — the 6th string drops from E to D, the 5th string drops from A to G, and the 1st string drops from E to D.",
        },
        {
          question: "Why is Open G tuning popular for slide guitar?",
          answer:
            "In Open G, strumming all six open strings produces a G major chord. This means you can move a slide straight across all six strings at any fret and produce a major chord — ideal for the fluid, flowing phrasing of slide guitar.",
        },
        {
          question: "What famous artists use Open G?",
          answer:
            "Open G is the signature tuning of Keith Richards (Rolling Stones), who often removed the 6th string entirely. Robert Johnson, Ry Cooder, and Bonnie Raitt are also known for playing in Open G.",
        },
        {
          question: "How many strings change when going to Open G?",
          answer:
            "Three strings change: the 6th string drops from E to D (one whole step), the 5th string drops from A to G (one whole step), and the 1st string drops from E to D (one whole step). Strings 2, 3, and 4 (B, G, D) stay the same.",
        },
      ]}
      relatedArticles={[
        {
          title: "Alternate Guitar Tunings You Should Try",
          slug: "alternate-guitar-tunings",
          description:
            "Open G, Drop D, DADGAD, Open D and more — all explained.",
        },
        {
          title: "How to Tune a Guitar by Ear",
          slug: "how-to-tune-a-guitar-by-ear",
          description:
            "Develop your ear for pitch using the 5th fret method and harmonics.",
        },
        {
          title: "Standard Tuning Explained",
          slug: "standard-tuning-explained",
          description:
            "Understand the notes and intervals behind E A D G B E.",
        },
      ]}
    >
      <h2>What is Open G Tuning?</h2>
      <p>
        <strong>Open G tuning</strong> is one of the most beloved and
        expressive alternate guitar tunings, with deep roots in blues, folk,
        country, and rock music. The tuning is{" "}
        <strong>D G D G B D</strong> from the lowest to highest string,
        meaning that when you strum all six open strings, you hear a full G
        major chord. This property makes Open G incredibly powerful for slide
        guitar, fingerpicking, and open chord voicings.
      </p>
      <p>
        Compared to standard tuning (E A D G B E), three strings change in Open
        G: the 6th string drops from E to D, the 5th string drops from A to G,
        and the 1st string drops from E to D. Strings 2, 3, and 4 (B, G, D)
        remain unchanged.
      </p>

      <h2>How to Use This Open G Tuner</h2>
      <ol>
        <li>
          Open GuitarTunePro by clicking the tuner button and allow microphone
          access.
        </li>
        <li>
          Select <strong>Open G</strong> from the tuning preset dropdown.
        </li>
        <li>
          Tune string 6 down from E to D — pluck and watch the needle as you
          slowly loosen the peg.
        </li>
        <li>
          Tune string 5 down from A to G using the same process.
        </li>
        <li>
          Tune string 1 down from E to D — a smaller adjustment but just as
          important.
        </li>
        <li>
          Strings 2, 3, and 4 remain the same — verify them quickly and you're
          in Open G.
        </li>
      </ol>

      <h2>Why Learn Open G?</h2>
      <p>
        Open G opens up an entirely different musical vocabulary compared to
        standard tuning:
      </p>
      <ul>
        <li>
          <strong>Slide guitar:</strong> A straight bar or glass slide across
          all strings at any fret produces a major chord, making fluid slide
          playing far easier than in standard tuning.
        </li>
        <li>
          <strong>Beautiful open chord voicings:</strong> Chords like G, Cadd9,
          and Dsus2 ring out with rich, resonant voicings unique to Open G.
        </li>
        <li>
          <strong>Unique fingerpicking patterns:</strong> The open G and D bass
          strings allow melodic bass lines while freely picking treble strings.
        </li>
        <li>
          <strong>Keith Richards' 5-string style:</strong> Richards often
          removed the 6th string entirely in Open G, giving his rhythm guitar a
          distinctive cutting tone on many classic Rolling Stones tracks.
        </li>
      </ul>

      <h2>Famous Songs in Open G Tuning</h2>
      <ul>
        <li>
          <strong>Brown Sugar — Rolling Stones:</strong> Keith Richards' iconic
          riff is built in Open G.
        </li>
        <li>
          <strong>Start Me Up — Rolling Stones:</strong> Another Open G classic
          from Richards.
        </li>
        <li>
          <strong>Little Lion Man — Mumford &amp; Sons:</strong> Uses Open G for
          its distinctive banjo-like guitar tone.
        </li>
        <li>
          <strong>Dust My Broom — Robert Johnson / Elmore James:</strong> A
          blues slide standard played in Open G.
        </li>
      </ul>

      <p>
        Want to explore other alternate tunings?{" "}
        <Link href="/articles/alternate-guitar-tunings">
          Read our complete guide to alternate guitar tunings
        </Link>
        . Or return to{" "}
        <Link href="/">
          use our free chromatic guitar tuner
        </Link>{" "}
        in standard or any other tuning preset.
      </p>
    </ArticleLayout>
  );
}
