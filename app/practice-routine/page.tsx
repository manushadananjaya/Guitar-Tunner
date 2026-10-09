import { Metadata } from "next";
import Link from "next/link";
import ToolPageLayout from "@/components/ToolPageLayout";
import { PracticeRoutine } from "@/components/PracticeRoutine/PracticeRoutine";
import { otherToolLinks } from "@/lib/toolPages";
import { ROUTINES } from "@/lib/practiceRoutines";

export const metadata: Metadata = {
  title: "Daily Guitar Practice Routine With Streaks",
  description:
    "A free, guided guitar practice routine: timed 10, 20 or 30 minute plans, a new chord pair, scale and strumming pattern each day, and a streak. No sign-up.",
  alternates: { canonical: "/practice-routine" },
  openGraph: {
    title: "Daily Guitar Practice Routine with Streaks",
    description:
      "Timed 10, 20 and 30 minute routines, daily picks that change every day, and a practice calendar stored on your device.",
  },
};

export default function PracticeRoutinePage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Daily Guitar Practice Routine - GuitarTunePro",
    url: "https://www.guitartunepro.com/practice-routine",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Guided, timed guitar practice routines with a daily chord pair, scale, and strumming pattern, plus a streak and practice calendar.",
    featureList: [
      "10, 20 and 30 minute routines",
      "Timer for every step",
      "New chord pair, scale, and strumming pattern each day",
      "Current and best practice streak",
      "Twelve-week practice calendar",
      "Progress stored on your device only",
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <ToolPageLayout
        title="Daily Guitar Practice Routine"
        description="Pick 10, 20, or 30 minutes and follow the steps. Every day brings a new chord pair, scale, and strumming pattern, and your streak keeps count."
        canonicalPath="/practice-routine"
        tool={<PracticeRoutine />}
        otherTools={otherToolLinks("/practice-routine")}
        faqs={[
          {
            question: "How long should I practise guitar each day?",
            answer:
              "Consistency matters more than length. Ten focused minutes every day will move you along faster than an hour on Sunday, because skills consolidate between sessions. Twenty to thirty minutes a day is a solid amount for steady progress. Beyond that, split it into two sessions rather than one long one.",
          },
          {
            question: "How does the streak work?",
            answer:
              "A day counts if you finish at least one routine step or use the ear trainer, fretboard trainer, scale explorer, strumming trainer, or progression builder. The streak is the number of consecutive days. It stays alive until the end of today, so it does not reset in the morning before you have played.",
          },
          {
            question: "Where is my practice history stored?",
            answer:
              "In your browser's local storage on this device. There is no account and nothing is sent to us. That also means it does not sync between your phone and your computer, and clearing site data will reset it.",
          },
          {
            question: "Why do the tools open in a new tab?",
            answer:
              "So the step timer keeps running while you use the metronome, the scale explorer, or the strumming trainer. Switch back to this tab when the step is done, or wait for the chime.",
          },
          {
            question: "How are the daily chord, scale and pattern chosen?",
            answer:
              "They rotate by date through a set of open chords, common scales, and beginner-to-intermediate strumming patterns, so everyone gets the same picks on the same day and tomorrow brings different ones. Chord pairs are chosen with different rotations so the same two chords do not keep turning up together.",
          },
          {
            question: "I'm a complete beginner. Is this for me?",
            answer:
              "Yes. Start with the 10-minute routine. The tuning step and chord-change step are the core of early progress, and the rest is short. If a step is beyond you today, skip it. A skipped step does not count toward the streak, but the rest of the routine still does.",
          },
        ]}
        relatedArticles={[
          {
            title: "How to Use a Metronome for Guitar Practice",
            slug: "how-to-use-a-metronome-for-guitar-practice",
            description: "The warm-up step depends on it. Here is how to practise with one properly.",
          },
          {
            title: "Beginner Guitar Chord Progressions",
            slug: "beginner-guitar-chord-progressions",
            description: "Where today's chord changes are heading.",
          },
          {
            title: "How Often Should You Tune Your Guitar?",
            slug: "how-often-should-you-tune-your-guitar",
            description: "Why every routine starts with a tuning step.",
          },
        ]}
      >
        <h2>How the Routine Works</h2>
        <ol>
          <li>
            Choose a length: <strong>10</strong>, <strong>20</strong>, or <strong>30 minutes</strong>. Your choice
            is remembered next time.
          </li>
          <li>
            The current step is open. Read what to do, press <strong>Start</strong>, and play. Most steps link to
            the tool they use, and the tool opens in a new tab so the timer keeps going.
          </li>
          <li>
            When the time is up you hear a chord and the routine moves to the next step. Press{" "}
            <strong>Done</strong> to finish a step early or <strong>Skip</strong> to pass over one.
          </li>
          <li>
            Finish the last step and the day is logged. The streak, the calendar, and the time totals at the top
            all update.
          </li>
        </ol>

        <h2>What Is in Each Routine</h2>
        <div className="not-prose grid gap-4 sm:grid-cols-3">
          {ROUTINES.map((routine) => (
            <div key={routine.id} className="rounded-xl border border-line bg-surface/40 p-4">
              <p className="font-bold text-ink mb-2">{routine.name}</p>
              <ol className="space-y-1 text-sm text-ink-muted">
                {routine.steps.map((step) => (
                  <li key={step.id} className="flex justify-between gap-2">
                    <span>{step.title}</span>
                    <span className="tabular-nums text-ink-subtle">{step.minutes}m</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>

        <h2>Why This Order?</h2>
        <p>
          Every routine starts by <strong>tuning</strong>. It takes a minute, and an out-of-tune guitar quietly
          teaches your ear the wrong pitches. Then a <strong>chromatic warm-up</strong> with the{" "}
          <Link href="/metronome">metronome</Link>: four fingers, four frets, every string, slowly. It wakes up
          the fretting hand and gets both hands moving together before anything difficult.
        </p>
        <p>
          <strong>Chord changes</strong> come next, while you are fresh, because they are the biggest hurdle for
          most players. The exercise is the classic one-minute change: two chords, one strum each, as many clean
          switches as you can in sixty seconds. Write the number down. It is a concrete measure of progress, and
          it goes up faster than you expect.
        </p>
        <p>
          The longer routines add a <strong>scale</strong> from the{" "}
          <Link href="/scales">scale explorer</Link> and a <strong>strumming pattern</strong> from the{" "}
          <Link href="/strumming-patterns">strumming trainer</Link>. The 30-minute routine adds{" "}
          <strong>improvising over a backing loop</strong>, built in the{" "}
          <Link href="/chord-progressions">progression builder</Link>. It is the step where the separate skills
          start working together.
        </p>
        <p>
          Every routine ends with short <strong>ear training</strong> and <strong>fretboard</strong> drills. They
          are mental rather than physical, so they suit the end of a session, and they are the skills people
          most often neglect.
        </p>

        <h2>Making a Habit Stick</h2>
        <p>
          The routine is short on purpose. Players rarely stall because they practise too little on a good day;
          they stall because whole weeks go by without picking up the guitar. A ten-minute plan you follow
          every day beats an ambitious hour you skip. Some things that help:
        </p>
        <ul>
          <li>
            <strong>Attach it to something you already do.</strong> After dinner, before checking your phone in the
            evening. A fixed moment needs less willpower than a fixed time.
          </li>
          <li>
            <strong>Leave the guitar out.</strong> A guitar on a stand gets played; a guitar in a case under the
            bed does not.
          </li>
          <li>
            <strong>Protect the streak, not the length.</strong> On a busy day, do the 10-minute routine, or just
            one step. The calendar fills in either way, and showing up is the habit you are building.
          </li>
          <li>
            <strong>Keep the numbers.</strong> One-minute change counts, metronome tempos, and fretboard accuracy
            are proof that the work is paying off, which matters on days when it does not feel like it.
          </li>
        </ul>

        <h2>When to Change the Routine</h2>
        <p>
          After a few weeks, you will find steps that feel easy. That is the signal to push them: raise the
          metronome speed on the warm-up, move the fretboard trainer to the whole neck, or switch the ear trainer
          to the next level. If one area is clearly behind, such as chord changes still under 30 a minute, spend
          extra time there and less on what is already comfortable. The routine is a default, not a rule.
        </p>
      </ToolPageLayout>
    </>
  );
}
