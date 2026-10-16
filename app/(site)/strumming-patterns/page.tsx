import { Metadata } from "next";
import Link from "next/link";
import ToolPageLayout from "@/components/ToolPageLayout";
import { StrummingTrainer } from "@/components/StrummingTrainer/StrummingTrainer";
import { otherToolLinks } from "@/lib/toolPages";
import { PATTERNS } from "@/lib/strumming";

export const metadata: Metadata = {
  title: "Guitar Strumming Patterns With Play-Along",
  description:
    "Twelve guitar strumming patterns from beginner to advanced, shown as down and up strokes and played along over real chords at any tempo. Free trainer.",
  alternates: { canonical: "/strumming-patterns" },
  openGraph: {
    title: "Guitar Strumming Pattern Trainer",
    description:
      "See the pattern, hear it strummed over a chord progression, and play along with an adjustable tempo.",
  },
};

const arrows = (slots: string) =>
  slots.replace(/-/g, "·").replace(/D/g, "↓").replace(/U/g, "↑").replace(/x/g, "✕").split("").join(" ");

export default function StrummingPatternsPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Strumming Pattern Trainer - GuitarTunePro",
    url: "https://www.guitartunepro.com/strumming-patterns",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Interactive strumming pattern trainer with twelve patterns, synthesised guitar strums over chord progressions, adjustable tempo, and a beat-by-beat highlight.",
    featureList: [
      "12 strumming patterns, beginner to advanced",
      "Eighth-note and sixteenth-note grids, 4/4 and 3/4",
      "Down, up, missed, and muted strokes",
      "Plays real chord voicings over a progression",
      "Tempo from 40 to 160 BPM",
      "Optional click on the beat",
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <ToolPageLayout
        title="Guitar Strumming Patterns"
        description="Choose a pattern, hear it strummed over real chords, and play along. Every stroke is shown as you count it, so you can see exactly where the hand should be."
        canonicalPath="/strumming-patterns"
        tool={<StrummingTrainer />}
        otherTools={otherToolLinks("/strumming-patterns")}
        faqs={[
          {
            question: "What is the most common guitar strumming pattern?",
            answer:
              "Down, down-up, up-down-up, the one this page calls the folk or campfire strum. It works for a huge range of acoustic songs in 4/4 at moderate tempos, which is why it is usually the first pattern taught after straight down-strums.",
          },
          {
            question: "Why does my strumming sound uneven?",
            answer:
              "Usually because the hand stops between strokes. Keep it moving down and up in a steady rhythm all the time, eighth notes or sixteenths, and make the pattern by choosing which strokes hit the strings. The dots in the pattern grid are where the hand moves but misses. Practising slowly with the click on is the fix.",
          },
          {
            question: "Should I strum with a pick or my fingers?",
            answer:
              "Either works. A thin pick (around 0.5 to 0.7 mm) is the easiest way to get even down and up strokes on an acoustic. Strumming with the nail of the index finger gives a softer sound. Use whichever you are more comfortable with; the patterns are the same.",
          },
          {
            question: "What does the X stroke mean?",
            answer:
              "A muted strum, often called a chuck or a slap. You strum normally while the fretting hand relaxes its pressure, or the side of the strumming hand lands on the strings, so you hear a percussive click instead of a chord. It works like a snare drum on beats 2 and 4.",
          },
          {
            question: "How fast should I practise?",
            answer:
              "Start at a tempo where you can play the pattern and change chords without a gap, even if that is 60 BPM. Raise the tempo by about 5 BPM only after several clean repetitions. Each pattern loads with a sensible starting tempo; lower it if you need to.",
          },
        ]}
        relatedArticles={[
          {
            title: "How to Use a Metronome for Guitar Practice",
            slug: "how-to-use-a-metronome-for-guitar-practice",
            description: "Timing is the whole game with strumming. Here is how to build it.",
          },
          {
            title: "Beginner Guitar Chord Progressions",
            slug: "beginner-guitar-chord-progressions",
            description: "The progressions these patterns are usually played over.",
          },
          {
            title: "How to Read Guitar Tabs",
            slug: "how-to-read-guitar-tabs",
            description: "How rhythm and strum directions are written in tab.",
          },
        ]}
      >
        <h2>How to Use the Strumming Trainer</h2>
        <ol>
          <li>
            Pick a <strong>pattern</strong>. Each loads at a tempo suited to it. The grid shows one bar: ↓ is a
            down-strum, ↑ an up-strum, ✕ a muted chuck, and a dot is a stroke where the hand moves but misses
            the strings.
          </li>
          <li>
            Pick a <strong>chord progression</strong>, or <em>Just G</em> to focus on your strumming hand alone.
          </li>
          <li>
            Press <strong>Play along</strong> (or the space bar). The current stroke lights up and the count
            underneath shows where you are in the bar. Listen for a few bars, then join in.
          </li>
          <li>
            Use <strong>Change every 2 bars</strong> while chord changes are still slow, and the{" "}
            <strong>tempo</strong> slider to slow it down until it is clean.
          </li>
        </ol>

        <h2>The One Rule: Keep the Hand Moving</h2>
        <p>
          Almost every strumming problem comes from the same habit: the strumming hand stops and starts. Good
          rhythm players keep the hand moving like a pendulum: down on every beat, up on every &quot;and&quot;,
          whether or not it touches the strings. A pattern is just a choice of which of those strokes connect.
        </p>
        <p>
          That is why the grid shows the missed strokes. In the folk strum, beat 3 is a dot: your hand still
          travels down past the strings, it just does not hit them, so it is in position to catch the up-strum
          that follows. If you stop your hand instead, the up-strum lands early or late, and the pattern falls
          apart as soon as you change chords. Every pattern here follows the rule. Downs fall on the beats and
          on the eighth- or sixteenth-note downbeats, ups on the offbeats.
        </p>

        <h2>All Twelve Patterns</h2>
        <div className="not-prose overflow-x-auto rounded-xl border border-line">
          <table className="w-full text-sm">
            <thead className="bg-surface-sunken/50 text-left text-2xs uppercase tracking-wider text-ink-subtle">
              <tr>
                <th className="px-4 py-2.5 font-semibold">Pattern</th>
                <th className="px-4 py-2.5 font-semibold">Strokes</th>
                <th className="px-4 py-2.5 font-semibold">Level</th>
              </tr>
            </thead>
            <tbody>
              {PATTERNS.map((p) => (
                <tr key={p.id} className="border-t border-line/60">
                  <td className="px-4 py-2 font-semibold text-ink">
                    <Link href={`/strumming-patterns?pattern=${p.id}`} className="hover:text-brass">
                      {p.name}
                    </Link>
                  </td>
                  <td className="px-4 py-2 font-mono text-ink-muted whitespace-nowrap">{arrows(p.slots)}</td>
                  <td className="px-4 py-2 text-ink-muted">{p.level}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>A Learning Order That Works</h2>
        <p>
          Start with <strong>four downs</strong>, one strum per beat, and use it to practise chord changes. At
          this stage the hard part is the fretting hand, and a simple strum takes the pressure off. When you can
          change chords without the beat stopping, move to <strong>straight down-ups</strong> to train the
          pendulum motion.
        </p>
        <p>
          Next is the <strong>folk strum</strong>. The first time the hand has to miss on purpose, it will feel
          awkward. Play it slowly over <em>Just G</em> until you no longer have to think about it, then add chord
          changes. <strong>Two downs, then down-ups</strong> is a good stepping stone if the folk strum keeps
          tripping you up.
        </p>
        <p>
          The intermediate patterns each add one idea. The <strong>syncopated push</strong> puts accents on the
          offbeats. The <strong>chuck</strong> adds percussion. The <strong>offbeat</strong> pattern removes the
          beat entirely, and the <strong>waltz</strong> changes the meter to three. The advanced patterns move to
          a sixteenth-note grid: the hand moves twice as fast and the wrist does most of the work.
        </p>

        <h2>Counting Out Loud</h2>
        <p>
          The count under the grid is not decoration. Saying &quot;one and two and three and four and&quot; out
          loud while you strum feels silly for about a day, and then it becomes the most reliable way to keep
          your place. For sixteenths, the count is &quot;one e and a, two e and a&quot;. If you lose the pattern,
          keep counting and keep the hand moving, and you will find it again on the next &quot;one&quot;.
        </p>

        <h2>Changing Chords Without Losing the Beat</h2>
        <p>
          Most strumming trouble is really chord-change trouble. Two tricks help. First, let the last up-strum
          before a change ring on open strings. Lift your fretting fingers early and start moving to the next
          shape, and nobody will hear the open strings at normal speed. Second, practise the change itself away
          from the strumming. One-minute changes, part of the{" "}
          <Link href="/practice-routine">daily practice routine</Link>, are the quickest way to speed it up.
        </p>
        <p>
          Once a pattern is comfortable over the preset progressions, build your own in the{" "}
          <Link href="/chord-progressions">progression builder</Link>, or look up the shapes in the{" "}
          <Link href="/chords">chord library</Link>. And tune before you start with the{" "}
          <Link href="/">tuner</Link>, because strumming exposes an out-of-tune string more than anything else.
        </p>
      </ToolPageLayout>
    </>
  );
}
