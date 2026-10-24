import { Metadata } from "next";
import Link from "next/link";
import ToolPageLayout from "@/components/ToolPageLayout";
import { RhythmTrainer } from "@/components/RhythmTrainer/RhythmTrainer";
import { otherToolLinks } from "@/lib/toolPages";
import { RHYTHMS, countLabel } from "@/lib/rhythms";

export const metadata: Metadata = {
  title: "Rhythm Trainer — Test Your Timing Online",
  description:
    "Tap along to a click and see your timing in milliseconds: early or late, how consistent, and which notes you missed. Ten rhythms from quarter notes to clave.",
  alternates: { canonical: "/rhythm-trainer" },
  openGraph: {
    title: "Rhythm Trainer — How Good Is Your Timing?",
    description:
      "Tap along to ten rhythms and get your timing back in milliseconds, with latency calibration for your device.",
  },
};

export default function RhythmTrainerPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Rhythm Trainer - GuitarTunePro",
    url: "https://www.guitartunepro.com/rhythm-trainer",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Tap-along rhythm and timing trainer: ten rhythms from quarter notes to son clave, scored per note in milliseconds, with rushing/dragging feedback and device latency calibration.",
    featureList: [
      "Ten rhythms across three levels, including triplets, gallops and clave",
      "40–200 BPM with a one-bar count-in",
      "Per-note timing error in milliseconds",
      "Average lean (rushing or dragging) and spread",
      "Optional rhythm guide, or click only",
      "Latency calibration for speakers and Bluetooth headphones",
      "Best score per rhythm, stored on your device",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <ToolPageLayout
        title="Rhythm Trainer"
        description="Tap along with the click and find out exactly how good your timing is — in milliseconds, note by note."
        canonicalPath="/rhythm-trainer"
        tool={<RhythmTrainer />}
        otherTools={otherToolLinks("/rhythm-trainer")}
        faqs={[
          {
            question: "Why calibrate latency?",
            answer:
              "Every device plays sound a little after it is told to — a few milliseconds through wired headphones, and often 150 to 250 milliseconds through Bluetooth. You tap to what you hear, so without correction you look late by that much. Calibration plays eight clicks, measures how far behind them your taps land, and subtracts that from every round. Do it again if you switch speakers or headphones.",
          },
          {
            question: "What is a good score?",
            answer:
              "Above 90 means nearly every note landed within about 25 milliseconds — tight enough that a listener would hear it as locked to the click. 70 to 90 is solid playing with some drift. Below 70, slow the tempo down; timing improves fastest at a speed where you can be accurate.",
          },
          {
            question: "What do the average and spread mean?",
            answer:
              "The average tells you which way you lean: negative means you are ahead of the beat (rushing), positive means behind it (dragging). The spread is how much your taps vary around that average. A player can be on the beat on average but uneven, or consistently 20 milliseconds late but very steady; the two numbers tell those apart.",
          },
          {
            question: "Should I keep the rhythm guide on?",
            answer:
              "Use it to learn a new rhythm, then turn it off. With the guide on you can follow the sound; with only the click you have to hold the rhythm yourself, which is the skill you need when playing with other people.",
          },
          {
            question: "Is tapping a button really like playing guitar?",
            answer:
              "It is the same timing skill without the technique getting in the way. Once a rhythm scores well tapped, play it on the guitar with the metronome or the strumming trainer — any remaining unevenness is then down to your picking hand, not your sense of time.",
          },
          {
            question: "Why does tapping on a phone feel less accurate?",
            answer:
              "Touch screens add their own small, variable delay, and some phones process audio in large blocks. Calibrating helps with the fixed part. For the most precise results use a laptop keyboard with wired headphones.",
          },
        ]}
        relatedArticles={[
          {
            title: "How to Use a Metronome for Guitar Practice",
            slug: "how-to-use-a-metronome-for-guitar-practice",
            description: "Practice methods that build timing, step by step.",
          },
          {
            title: "Beginner Guitar Chord Progressions",
            slug: "beginner-guitar-chord-progressions",
            description: "Put your rhythm to work over real changes.",
          },
          {
            title: "How to Read Guitar Tabs",
            slug: "how-to-read-guitar-tabs",
            description: "Including how rhythm is (and isn't) shown in tab.",
          },
        ]}
      >
        <h2>How a Round Works</h2>
        <ol>
          <li>Pick a rhythm and a tempo. Each rhythm starts at a sensible speed.</li>
          <li>
            Press <strong>Start</strong>. Four clicks count you in, with the
            first one accented.
          </li>
          <li>
            Tap the pad — or press <strong>Space</strong> — on every note for
            four bars. Tap in time with the rhythm, not just the click.
          </li>
          <li>
            Read the results. Each note on the timeline turns green, amber or
            red depending on how close your tap was, and you get your score,
            your average lean and your spread.
          </li>
        </ol>
        <p>
          Taps are timed from the moment your browser received them, not from
          when the page got round to handling them, and measured against the
          audio clock that the clicks are scheduled on. After calibration, the
          remaining error is mostly yours — which is the point.
        </p>

        <h2>The Rhythms</h2>
        <p>
          They are ordered roughly by difficulty. The counts below are what
          to say out loud while you tap — counting is the most reliable way to
          keep your place.
        </p>
        <div className="not-prose my-6 overflow-x-auto rounded-xl border border-line bg-surface/40">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line text-left text-2xs uppercase tracking-widest text-ink-subtle">
                <th scope="col" className="px-4 py-2.5 font-bold">Rhythm</th>
                <th scope="col" className="px-4 py-2.5 font-bold">Level</th>
                <th scope="col" className="px-4 py-2.5 font-bold">Count</th>
              </tr>
            </thead>
            <tbody>
              {RHYTHMS.map((r) => (
                <tr key={r.id} className="border-b border-line last:border-0">
                  <td className="px-4 py-2.5 font-semibold text-ink">{r.name}</td>
                  <td className="px-4 py-2.5 text-ink-muted">{r.level}</td>
                  <td className="px-4 py-2.5 font-mono text-xs text-ink-muted">
                    {r.onsets.map(countLabel).join(" ")}
                    {r.beats > 4 ? " (2 bars)" : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Rushing, Dragging, and How to Fix Them</h2>
        <p>
          <strong>Rushing</strong> — arriving before the beat — is the most
          common timing problem, especially on notes that follow a rest or a
          long note, and on the &ldquo;&amp;&rdquo; of a beat. It usually
          comes from tension: the hand wants to get the next note over with.
          Breathing out, relaxing the shoulder, and deliberately
          &ldquo;waiting&rdquo; for each note fixes most of it.
        </p>
        <p>
          <strong>Dragging</strong> — arriving after the beat — often means you
          are reacting to the click instead of anticipating it. The motion of a
          strum or pick stroke has to start before the beat for the sound to
          land on it. Try feeling the click as the moment your pick hits the
          string, not the moment you decide to move.
        </p>
        <p>
          A large <strong>spread</strong> with a small average means your
          timing is uneven rather than biased. That is a tempo problem: slow
          down until every note scores green, then raise the tempo 5&nbsp;BPM at
          a time. The &ldquo;Try faster&rdquo; button appears after a round of
          90 or more for exactly this reason.
        </p>

        <h2>From Tapping to Playing</h2>
        <p>
          Once a rhythm is reliable here, put it on the guitar. Play it on one
          muted string with the <Link href="/metronome">metronome</Link>, then
          on chords with the{" "}
          <Link href="/strumming-patterns">strumming trainer</Link>, then over
          a backing loop from the{" "}
          <Link href="/chord-progressions">chord progression builder</Link>.
          Every completed round counts as a practice day on the{" "}
          <Link href="/practice-routine">practice routine</Link>, so a few
          minutes here keeps your streak going.
        </p>
      </ToolPageLayout>
    </>
  );
}
