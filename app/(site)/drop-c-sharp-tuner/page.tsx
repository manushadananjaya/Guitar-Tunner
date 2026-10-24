import { Metadata } from "next";
import { languageAlternates } from "@/lib/i18n/pages";
import Link from "next/link";
import TunerPageLayout from "@/components/TunerPageLayout";
import { otherTunersFor } from "@/lib/tunerPages";

export const metadata: Metadata = {
  title: "Drop C# Tuner — Free Online Drop C Sharp Tuner",
  description:
    "Free online Drop C# guitar tuner. Tune to Drop C sharp (C# G# C# F# A# D#), also called Drop Db, with your microphone — right on this page, no download.",
  alternates: {
    canonical: "/drop-c-sharp-tuner",
    languages: languageAlternates("/drop-c-sharp-tuner"),
  },
  openGraph: {
    title: "Drop C# Tuner — Free Online Drop C Sharp Tuner",
    description:
      "Tune your guitar to Drop C# (Drop D♭) with your microphone. Exact frequencies for every string.",
  },
};

export default function DropCSharpTunerPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Drop C# Tuner - GuitarTunePro",
    url: "https://www.guitartunepro.com/drop-c-sharp-tuner",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Free online Drop C# guitar tuner. Tune your guitar to Drop C sharp (C# G# C# F# A# D#) using your microphone.",
    browserRequirements: "Requires microphone access",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <TunerPageLayout
        title="Drop C♯ Tuner"
        description="Tune your guitar to Drop C♯ (C♯ G♯ C♯ F♯ A♯ D♯) using your microphone. The tuner below is already set — press Start Recording and pluck a string."
        canonicalPath="/drop-c-sharp-tuner"
        initialTuning="dropCSharp"
        otherTuners={otherTunersFor("/drop-c-sharp-tuner")}
        faqs={[
          {
            question: "What are the notes in Drop C# tuning?",
            answer:
              "C# G# C# F# A# D#, from the lowest string to the highest. Written with flats it is Db Ab Db Gb Bb Eb, which is why the same tuning is also called Drop Db. The notes and frequencies are identical; only the spelling differs.",
          },
          {
            question: "Is Drop C# the same as Drop D tuned down a half step?",
            answer:
              "Yes. Every string is a semitone lower than Drop D, so the intervals between strings are the same and every Drop D riff and chord shape works unchanged. It is also half step down tuning (Eb standard) with the 6th string dropped one more whole step.",
          },
          {
            question: "Do I need new strings for Drop C#?",
            answer:
              "Usually not a whole new set, but a slightly heavier one helps. Five strings lose only about 11% of their tension, which a .010 set handles well. The 6th string loses about 29%, and that is the one that starts to flop. A .010–.052 heavy-bottom set is the most common fix.",
          },
          {
            question: "Why does the tuner struggle with my low C#?",
            answer:
              "C#2 vibrates at 69.30 Hz, low enough that small phone and laptop microphones pick up its overtones more strongly than the note itself. Pluck firmly with the neck pickup or over the soundhole, mute the other strings, and let the note ring for a second before reading the needle.",
          },
          {
            question: "Should I write it as C# or Db?",
            answer:
              "Either is correct. Guitarists and tab sites mostly say Drop C#; players coming from Eb standard often say Drop Db because their other strings are already named with flats. This tuner shows sharps, matching how the tuning is most often searched for and written in tabs.",
          },
        ]}
        relatedArticles={[
          {
            title: "Drop D Tuning Guide for Rock and Metal",
            slug: "drop-d-tuning-guide",
            description:
              "Every Drop D shape works in Drop C# — start here for power chords and riffs.",
          },
          {
            title: "Best Guitar Strings for Tuning Stability",
            slug: "best-guitar-strings-for-tuning-stability",
            description:
              "Gauge and material choices that keep lower tunings in pitch.",
          },
          {
            title: "Alternate Guitar Tunings You Should Try",
            slug: "alternate-guitar-tunings",
            description:
              "How drop, open and lowered-standard tunings compare.",
          },
        ]}
      >
        <h2>How to Use This Drop C♯ Tuner</h2>
        <ol>
          <li>
            Press <strong>Start Recording</strong> on the tuner above and allow
            microphone access.
          </li>
          <li>
            The <strong>Drop C♯</strong> preset is already selected, so the
            tuner listens for C♯ G♯ C♯ F♯ A♯ D♯.
          </li>
          <li>
            Bring strings 5 to 1 down one semitone each: A→G♯, D→C♯, G→F♯,
            B→A♯, E→D♯.
          </li>
          <li>
            Then lower string 6 by three semitones, from E to C♯ (69.30&nbsp;Hz).
          </li>
          <li>
            Go round all six strings a second time. Lowering six strings at once
            takes tension off the neck, and the first ones you tuned will have
            drifted slightly.
          </li>
        </ol>
        <p>
          <strong>Already in half step down?</strong> Then you only need to move
          one string. Lower the 6th string from E♭ to C♯ — exactly one whole
          step — and you are in Drop C♯. That is the same move as going from
          standard tuning to Drop D, which is why this tuning is so popular
          with bands that already play in E♭.
        </p>

        <h2>What is Drop C♯ Tuning?</h2>
        <p>
          <strong>Drop C♯</strong> is <strong>C♯ G♯ C♯ F♯ A♯ D♯</strong>, low to
          high: Drop D with every string lowered by a semitone. The top five
          strings sit in the same intervals as standard tuning, so chord shapes
          on them do not change, while the bottom three form a C♯ power chord
          when played open.
        </p>
        <p>
          It sits between <Link href="/drop-d-tuner">Drop D</Link> and{" "}
          <Link href="/drop-c-tuner">Drop C</Link>. Compared with Drop D it is a
          little darker and looser; compared with Drop C it keeps more tension
          and stays playable on the strings most guitarists already have on.
        </p>

        <h2>Why Players Choose Drop C♯</h2>
        <ul>
          <li>
            <strong>It pairs with half step down.</strong> A lot of rock is
            recorded in E♭ standard to suit the singer. If the band is already
            tuned down a half step, Drop C♯ is the natural drop tuning: one
            string to change, and every song in E♭ still works on the top five
            strings.
          </li>
          <li>
            <strong>One-finger power chords.</strong> With the low three
            strings in a fifth and an octave, a single finger barred across
            them at any fret gives a power chord — the riffing style Drop D is
            known for, a semitone lower.
          </li>
          <li>
            <strong>Easier on the voice.</strong> Taking the whole guitar down a
            semitone takes the songs down with it. For a singer working at the
            top of their range, that semitone can be the difference between
            reaching a chorus note and straining for it.
          </li>
          <li>
            <strong>Low setup cost.</strong> Unlike Drop C or Drop B, most
            guitars handle Drop C♯ on their existing strings with at most a
            heavier 6th string.
          </li>
        </ul>

        <h2>Strings and Setup</h2>
        <p>
          String tension rises and falls with the square of the pitch, so
          small changes in tuning add up. In Drop C♯, strings 1 to 5 are one
          semitone down and keep about <strong>89%</strong> of their standard
          tension. The 6th string drops three semitones and keeps only about{" "}
          <strong>71%</strong> — that is where you will feel the difference.
        </p>
        <ul>
          <li>
            <strong>.010–.046 sets</strong> play fine on the top five strings
            but the low C♯ can feel loose and fret out when you dig in.
          </li>
          <li>
            <strong>.010–.052 heavy-bottom</strong> sets are the common choice:
            standard feel on top, a firm low string.
          </li>
          <li>
            <strong>.011–.052 or .011–.054</strong> suit players who pick hard
            or play shorter-scale guitars such as a 24.75&Prime; Les Paul, where
            the same note has less tension than on a 25.5&Prime; Strat-style
            neck.
          </li>
        </ul>
        <p>
          The <Link href="/string-tension-calculator">string tension calculator</Link>{" "}
          shows the exact tension of your current set in Drop C♯ and suggests
          gauges that restore the feel of standard tuning. If you change gauges,
          check{" "}
          <Link href="/articles/how-to-intonate-your-guitar">intonation</Link>{" "}
          afterwards; a floating tremolo will also need its springs rebalancing.
        </p>

        <h2>Checking Drop C♯ by Ear</h2>
        <p>
          Once one string is right, you can check the rest against each other.
          Fret the 6th string at the <strong>7th</strong> fret and compare it
          with the open 5th string — in a drop tuning it is the 7th fret, not
          the 5th. After that, the usual pattern applies: 5th fret of the 5th
          string matches the open 4th, 5th fret of the 4th matches the open 3rd,{" "}
          <strong>4th</strong> fret of the 3rd matches the open 2nd, and 5th
          fret of the 2nd matches the open 1st. A quicker check for the low
          string alone: its 12th-fret harmonic should match the open 4th string
          exactly, since both are C♯3.
        </p>

        <h2>Troubleshooting</h2>
        <p>
          <strong>The low string reads an octave high.</strong> The microphone
          is hearing the second harmonic louder than the fundamental. Pluck
          with the flesh of your thumb rather than a pick and move the phone a
          little closer to the body of the guitar.
        </p>
        <p>
          <strong>Chords sound fine open but sour higher up.</strong> That is
          intonation, not tuning. A heavier 6th string or the change in tension
          moves the point where the string plays in tune at the 12th fret.
        </p>
        <p>
          <strong>Songs in tabs are marked &ldquo;Drop D♭&rdquo;.</strong> Same
          tuning. Use this page as it is.
        </p>

        <p>
          Related: <Link href="/half-step-down-tuner">half step down tuner</Link>{" "}
          (the same tuning with the 6th string at E♭),{" "}
          <Link href="/drop-d-tuner">Drop D tuner</Link>, and{" "}
          <Link href="/drop-b-tuner">Drop B tuner</Link> for going lower still.
          Every tuning in one table: the{" "}
          <Link href="/tunings">guitar tunings chart</Link>.
        </p>
      </TunerPageLayout>
    </>
  );
}
