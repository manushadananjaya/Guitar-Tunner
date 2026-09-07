import { Metadata } from "next";
import Link from "next/link";
import ToolPageLayout from "@/components/ToolPageLayout";
import { VocalTuner } from "@/components/VocalTuner/VocalTuner";

export const metadata: Metadata = {
  title: "Vocal Pitch Detector & Singing Tuner",
  description:
    "Free online vocal pitch detector and singing tuner. See the note, frequency and cents you sing in real time, find your vocal range, and train pitch in the browser.",
  alternates: { canonical: "/vocal-pitch-detector" },
  openGraph: {
    title: "Vocal Pitch Detector & Online Singing Tuner",
    description:
      "Live pitch detection for your voice: note, frequency, cents, a scrolling pitch graph, a vocal range finder, and a note-matching trainer.",
  },
};

export default function VocalPitchDetectorPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Vocal Pitch Detector - GuitarTunePro",
    url: "https://www.guitartunepro.com/vocal-pitch-detector",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Free live vocal pitch detector and singing tuner. Real-time note, frequency and cents readout, a scrolling pitch trail, a vocal range finder, and a note-matching ear trainer.",
    browserRequirements: "Requires microphone access",
    featureList: [
      "Real-time pitch detection for the singing voice (C2 to C#6)",
      "Note name, octave, frequency in Hz and cents offset",
      "Scrolling pitch-trail graph over the last 12 seconds",
      "Vocal range finder — lowest note, highest note, range in semitones",
      "Reference-tone note matching for pitch training",
      "Runs entirely in the browser; audio is never uploaded",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <ToolPageLayout
        title="Vocal Pitch Detector"
        description="A live pitch detector for your voice. Sing or hum and see the note, how many cents sharp or flat you are, a scrolling pitch graph, and your vocal range — all in the browser."
        canonicalPath="/vocal-pitch-detector"
        tool={<VocalTuner />}
        otherToolsHeading="Other Tools"
        otherTools={[
          { label: "Guitar Tuner", href: "/" },
          { label: "Metronome", href: "/metronome" },
          { label: "Ukulele Tuner", href: "/ukulele-tuner" },
          { label: "Chord Library", href: "/chords" },
        ]}
        faqs={[
          {
            question: "Is this accurate enough for singing practice?",
            answer:
              "Yes. For a sustained note it reads within a few cents, which is well inside what the ear can hear — around 5 to 10 cents for most people. It is less certain on very quiet notes, breathy tone, or the first fraction of a second before a note settles, and it is not a substitute for a trained teacher's ear for tone and technique. But for checking whether you are landing on the right pitch, it is more than precise enough.",
          },
          {
            question: "What note range does it detect?",
            answer:
              "Roughly C2 (65 Hz) to C#6 (1100 Hz). That covers the full singing range from a low bass to a high soprano, including the fundamental of almost every note you can sing. Whistle register and very high soprano overtones sit above the range and may read an octave low or not at all.",
          },
          {
            question: "Why does the note jump around when I sing?",
            answer:
              "A few reasons, and most are normal. The voice has natural vibrato — a gentle pitch wobble of 40 to 100 cents several times a second — so a sustained note is never perfectly still. Breathy or unsupported tone gives the detector less to lock onto. Consonants, sliding into a note, and background noise all add jitter too. Hum a steady 'mmm' or sing an open 'ah' and the reading settles quickly.",
          },
          {
            question: "Can it tell me my voice type?",
            answer:
              "The range finder gives a rough guess based on your lowest comfortable note, but treat it as a starting point only. Voice type — bass, tenor, alto, soprano and the rest — depends more on where your voice sits comfortably for long stretches (the tessitura) and on its tone and weight than on the extremes you can reach for a second. A choir director or voice teacher classifies by listening, not by measuring.",
          },
          {
            question: "Does it work on a phone?",
            answer:
              "Yes, on any modern phone browser that can use the microphone. Hold the phone a short distance away rather than right at your mouth, so breath noise does not overwhelm the signal, and use it somewhere reasonably quiet.",
          },
          {
            question: "Do I need to allow the microphone? Is my voice recorded?",
            answer:
              "You need to grant microphone access so the page can hear you, but nothing is recorded or sent anywhere. All pitch analysis happens live, in your browser, and the audio is discarded frame by frame. Closing the tab ends it completely.",
          },
        ]}
        relatedArticles={[
          {
            title: "How to Find Your Vocal Range",
            slug: "how-to-find-your-vocal-range",
            description:
              "Measure your range properly, understand voice types, and extend it safely.",
          },
          {
            title: "How to Use a Chromatic Tuner",
            slug: "how-to-use-a-chromatic-tuner",
            description:
              "Reading cents and note names — the same skills apply to this vocal tuner.",
          },
          {
            title: "How to Use a Metronome for Guitar Practice",
            slug: "how-to-use-a-metronome-for-guitar-practice",
            description:
              "Pair pitch practice with steady time for the two fundamentals of musicianship.",
          },
        ]}
      >
        <h2>How the Vocal Pitch Detector Works</h2>
        <p>
          When you sing a note, your vocal folds open and close at a steady rate
          — around 220 times a second for the A below middle C. That rate is the
          fundamental frequency, and it is what your ear hears as pitch. This
          tool listens through your microphone, measures that frequency many
          times a second, and converts it into the nearest musical note plus how
          far off you are in cents.
        </p>
        <p>
          The measurement uses autocorrelation: the page compares the incoming
          waveform against delayed copies of itself and finds the delay at which
          the sound repeats most exactly. That delay is one vocal-fold cycle, and
          its reciprocal is your pitch. The same technique drives our{" "}
          <Link href="/">chromatic guitar tuner</Link>; the vocal version widens
          the search to the singing range and smooths the result more heavily,
          because a voice is less steady than a plucked string.
        </p>

        <h2>How to Use It</h2>
        <ol>
          <li>
            Press <strong>Start microphone</strong> and allow access when the
            browser asks.
          </li>
          <li>
            Sing or hum a steady note, about an arm&apos;s length from your
            device. A closed <em>mmm</em> or an open <em>ah</em> gives the
            cleanest reading.
          </li>
          <li>
            Read the big note name and the needle. The needle sits centre when
            you are in tune, drifts left when you are flat, and right when you
            are sharp.
          </li>
          <li>
            Switch between the three panels below the readout:{" "}
            <strong>Pitch trail</strong> draws your pitch over time,{" "}
            <strong>Range finder</strong> records your lowest and highest notes,
            and <strong>Match a note</strong> plays a target for you to sing
            back.
          </li>
        </ol>

        <h2>Reading the Cents and the Needle</h2>
        <p>
          A cent is one hundredth of a semitone. The gap between two adjacent
          piano keys is 100 cents, so a reading of +30 cents means you are just
          under a third of the way to the next note up. Most listeners start to
          notice that a note is out of tune somewhere around 10 to 20 cents, and
          a trained ear hears less. The tool treats anything within 15 cents as
          in tune, which is a realistic target for a sung note with vibrato.
        </p>
        <p>
          Do not chase a dead-centre reading on every note. A voice that is
          rigidly locked to zero cents sounds lifeless. Aim instead for the
          centre of your vibrato to sit on the note — the wobble either side is
          musical, as long as it is even and it averages out in the right place.
        </p>

        <h2>Finding Your Vocal Range</h2>
        <p>
          Open the <strong>Range finder</strong> panel and sing down a scale to
          the lowest note you can hold cleanly — not a creaky note you can barely
          produce, but one with real tone. Then sing up to your highest
          comfortable note. The panel records both and shows the distance between
          them in semitones and octaves.
        </p>
        <p>
          Most untrained adult voices span around one and a half to two octaves.
          Trained singers often reach three or more. The tool also offers a rough
          voice-type guess from your lowest note, but that is only a hint — see{" "}
          <Link href="/articles/how-to-find-your-vocal-range">
            our guide to finding your vocal range
          </Link>{" "}
          for how classification actually works and how to extend your range
          without strain.
        </p>

        <h2>Practising Pitch Accuracy</h2>
        <p>
          The <strong>Match a note</strong> panel is a simple ear-training loop.
          Pick a note, listen to the reference tone, then sing it back. The meter
          fills as you get closer, and locks when you hold the pitch within 20
          cents for about a second. The <strong>Random</strong> button picks a
          note for you, which stops you anticipating the interval.
        </p>
        <p>
          Two habits make this pay off. First, sing the note in your head before
          you make a sound — hearing it internally is the skill you are
          building. Second, when you are consistently sharp or flat on the same
          interval, that is useful information: singers very often flatten
          descending leaps and reach sharp for ascending ones.
        </p>

        <h2>Why Your Voice Reads as &ldquo;Unstable&rdquo;</h2>
        <p>
          If the number will not settle, the cause is usually one of these:
        </p>
        <ul>
          <li>
            <strong>Vibrato.</strong> Healthy singing has it. It is a feature,
            not a tuning error, and you can see it clearly on the pitch trail as
            an even ripple.
          </li>
          <li>
            <strong>Breathy or unsupported tone.</strong> Air escaping past the
            vocal folds masks the pitch. More breath support and a firmer
            (not harder) tone give a cleaner signal.
          </li>
          <li>
            <strong>The onset of the note.</strong> The first tenth of a second,
            as you slide or scoop onto a pitch, is genuinely unstable. Listen for
            where the note lands, not where it starts.
          </li>
          <li>
            <strong>Microphone and room.</strong> A noisy room, a fan, or a
            laptop mic pointing away from you all add jitter. Get somewhere quiet
            and face the mic.
          </li>
        </ul>

        <h2>Accuracy and Limitations</h2>
        <p>
          On a clean, sustained note in a quiet room this tool is accurate to
          within a few cents — good enough that the limiting factor is your voice
          and your ear, not the measurement. It is deliberately conservative
          about what it reports: quiet, breathy, or very brief notes are held or
          ignored rather than guessed at, so the readout stays trustworthy.
        </p>
        <p>
          What it does not do: it cannot judge tone, vowel, resonance, or
          technique, and it will not stop you straining for a note that is bad
          for your voice. It measures pitch, nothing more. For everything else,
          there is no substitute for a teacher. Our approach to measurement
          accuracy across the site is described on the{" "}
          <Link href="/accuracy">accuracy page</Link>.
        </p>

        <h2>Privacy</h2>
        <p>
          Everything happens on your device. The page asks for microphone access
          so it can analyse the sound as it arrives, but no audio is recorded,
          stored, or sent to any server — each frame is measured and thrown away.
          There is no account, and closing the tab ends the session entirely.
        </p>

        <p>
          Other tools on the site: the{" "}
          <Link href="/">chromatic guitar tuner</Link>, the{" "}
          <Link href="/bass-tuner">bass tuner</Link>, the{" "}
          <Link href="/ukulele-tuner">ukulele tuner</Link>, a{" "}
          <Link href="/metronome">metronome</Link>, and a{" "}
          <Link href="/chords">chord library</Link>.
        </p>
      </ToolPageLayout>
    </>
  );
}
