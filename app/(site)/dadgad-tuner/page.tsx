import { Metadata } from "next";
import { languageAlternates } from "@/lib/i18n/pages";
import Link from "next/link";
import TunerPageLayout from "@/components/TunerPageLayout";
import { otherTunersFor } from "@/lib/tunerPages";

export const metadata: Metadata = {
  title: "DADGAD Tuner — Free Online DADGAD Guitar Tuner",
  description:
    "Free online DADGAD tuner. Tune to D A D G A D with your microphone, right on this page. The Celtic and fingerstyle tuning — no download required.",
  alternates: {
    canonical: "/dadgad-tuner",
    languages: languageAlternates("/dadgad-tuner"),
  },
  openGraph: {
    title: "DADGAD Tuner — Free Online DADGAD Guitar Tuner",
    description:
      "Tune your guitar to DADGAD quickly and accurately using your device's microphone.",
  },
};

export default function DadgadTunerPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "DADGAD Tuner - GuitarTunePro",
    url: "https://www.guitartunepro.com/dadgad-tuner",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Free online DADGAD tuner. Tune your guitar to D A D G A D instantly.",
    browserRequirements: "Requires microphone access",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <TunerPageLayout
        title="DADGAD Tuner"
        description="Tune your guitar to DADGAD (D A D G A D) using your microphone. The tuner below is already set — press Start Recording and pluck each string."
        canonicalPath="/dadgad-tuner"
        initialTuning="dadgad"
        otherTuners={otherTunersFor("/dadgad-tuner")}
        faqs={[
          {
            question: "What is DADGAD tuning?",
            answer:
              "DADGAD is an alternate tuning where the strings are tuned, low to high, D A D G A D. It is named simply by spelling out those six notes. Strummed open it sounds a Dsus4 chord — neither major nor minor.",
          },
          {
            question: "Which strings change from standard tuning?",
            answer:
              "Three strings drop: the 6th string E to D, the 2nd string B to A, and the 1st string E to D. Strings 5, 4, and 3 (A, D, G) are unchanged from standard tuning.",
          },
          {
            question: "Why is DADGAD called the Celtic tuning?",
            answer:
              "Because its open Dsus4 sound has no third, it is neither major nor minor, which lets it accompany the modal melodies of Irish and Scottish traditional music without clashing. Davey Graham brought it back from Morocco in the early 1960s and players like Pierre Bensusan and Martin Carthy established it in the British and Irish folk revival.",
          },
          {
            question: "Is DADGAD hard to learn?",
            answer:
              "It is one of the easier alternate tunings to start in, because simple one- and two-finger shapes produce rich, complete-sounding chords. It is harder to master, because your standard-tuning chord knowledge does not transfer — three strings have moved, so most familiar shapes give unexpected results.",
          },
          {
            question: "What is the difference between DADGAD and Open D?",
            answer:
              "One string. Open D is D A D F♯ A D; DADGAD is D A D G A D. Raising that F♯ to G replaces the major third with a fourth, turning a settled D major chord into an open, unresolved Dsus4. That single semitone is the whole character difference between the two tunings.",
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
            title: "How to Tune a Guitar by Ear",
            slug: "how-to-tune-a-guitar-by-ear",
            description:
              "Train your ear with relative tuning and harmonic methods.",
          },
          {
            title: "Standard Tuning Explained",
            slug: "standard-tuning-explained",
            description:
              "Understand the notes and intervals behind E A D G B E.",
          },
        ]}
      >
        <h2>How to Use This DADGAD Tuner</h2>
        <ol>
          <li>
            Press <strong>Start Recording</strong> on the tuner above and allow
            microphone access.
          </li>
          <li>
            The <strong>DADGAD</strong> preset is already selected.
          </li>
          <li>
            Drop string 6 from E to D (73.42&nbsp;Hz) — one whole step.
          </li>
          <li>
            Leave strings 5, 4, and 3 alone. A, D, and G are already correct.
          </li>
          <li>
            Drop string 2 from B to A (220.00&nbsp;Hz) — one whole step.
          </li>
          <li>
            Drop string 1 from E to D (293.66&nbsp;Hz) — one whole step.
          </li>
          <li>
            Strum all six strings. You should hear an open, unresolved,
            slightly suspended chord. Then run a second pass to catch drift.
          </li>
        </ol>
        <p>
          A useful check: strings 6, 4, and 1 should all sound the note D, an
          octave apart each time. If any of the three sounds out of step with
          the other two, that is the one to fix.
        </p>

        <h2>What Makes DADGAD Different</h2>
        <p>
          Most alternate tunings are named for the chord they produce. DADGAD is
          not, because it does not produce a straightforward chord at all — the
          open strings sound <strong>Dsus4</strong>. There is no third in the
          voicing, so the tuning is neither major nor minor.
        </p>
        <p>
          That ambiguity is the entire point. A tuning without a third does not
          commit to a tonality, which means it will sit comfortably under a
          major melody, a minor melody, or a modal one that is neither. For
          Irish and Scottish traditional tunes — often Mixolydian or Dorian
          rather than plainly major or minor — this is exactly what you want.
        </p>

        <h2>Why Guitarists Love DADGAD</h2>
        <ul>
          <li>
            <strong>Drone strings:</strong> The tripled D and the open A let you
            hold a bagpipe-like drone under a melody, mimicking traditional
            instruments the guitar otherwise cannot.
          </li>
          <li>
            <strong>Easy rich chords:</strong> One finger on the 2nd fret of
            string 3 gives you a full D major. Barring the 5th fret gives Gsus4.
            Very little left-hand work produces very full sound.
          </li>
          <li>
            <strong>Room for the melody:</strong> Because chords need so few
            fingers, your remaining fingers are free to play melody lines on the
            same fretboard — the foundation of modern fingerstyle arrangement.
          </li>
          <li>
            <strong>It suits capos:</strong> DADGAD with a capo at the 2nd fret
            becomes EBEABE, at the 5th GDGCGD. Traditional players move the capo
            constantly to match a tune's key while keeping the same shapes.
          </li>
        </ul>

        <h2>A Short History</h2>
        <p>
          DADGAD is usually credited to English guitarist{" "}
          <strong>Davey Graham</strong>, who devised it in the early 1960s after
          a trip to Morocco, looking for a way to play along with oud players.
          It travelled quickly into the British folk revival through Martin
          Carthy and Bert Jansch, and into Irish music through Mícheál Ó
          Domhnaill and Dónal Lunny.
        </p>
        <p>
          Jimmy Page then carried it into rock, using DADGAD on Led Zeppelin's
          Kashmir and Black Mountain Side — which is how most guitarists outside
          the folk world first heard it.
        </p>

        <h2>Famous Songs in DADGAD</h2>
        <ul>
          <li>
            <strong>Kashmir — Led Zeppelin:</strong> The most famous DADGAD riff
            ever recorded, and a good demonstration of the tuning's drone
            quality.
          </li>
          <li>
            <strong>Black Mountain Side — Led Zeppelin:</strong> Page's
            instrumental, drawn directly from the folk tradition DADGAD came
            from.
          </li>
          <li>
            <strong>She Moved Through the Fair — traditional:</strong> A
            standard test piece for DADGAD players.
          </li>
          <li>
            <strong>Pierre Bensusan's catalogue:</strong> Bensusan has played
            almost exclusively in DADGAD for decades and is the reference point
            for what the tuning can do.
          </li>
        </ul>

        <h2>Starter Shapes</h2>
        <ul>
          <li>
            <strong>Dsus4:</strong> all strings open.
          </li>
          <li>
            <strong>D major:</strong> string 3, 2nd fret.
          </li>
          <li>
            <strong>D minor:</strong> string 3, 1st fret.
          </li>
          <li>
            <strong>G:</strong> barre the 5th fret.
          </li>
          <li>
            <strong>A:</strong> barre the 7th fret.
          </li>
        </ul>
        <p>
          Notice that major and minor differ by a single fret on a single
          string. That is the practical payoff of a tuning with no third built
          in — you choose the tonality one finger at a time.
        </p>

        <h2>Troubleshooting</h2>
        <p>
          <strong>The open strings sound muddy.</strong> Three D's ringing at
          once will do that if any of them is even slightly off. Tune all three
          to exactly 0 cents and the chord clears up immediately.
        </p>
        <p>
          <strong>My usual chord shapes sound wrong.</strong> They will. Strings
          6, 2, and 1 have moved, so any shape touching them produces different
          notes. Start from the shapes above rather than adapting standard ones.
        </p>

        <p>
          Compare with <Link href="/open-d-tuner">Open D</Link>, which differs
          by a single semitone, or read the complete guide to{" "}
          <Link href="/articles/alternate-guitar-tunings">
            alternate guitar tunings
          </Link>
          .
        </p>
      </TunerPageLayout>
    </>
  );
}
