import { Metadata } from "next";
import Link from "next/link";
import ToolPageLayout from "@/components/ToolPageLayout";
import { EarTrainer } from "@/components/EarTrainer/EarTrainer";
import { otherToolLinks } from "@/lib/toolPages";
import { INTERVALS } from "@/lib/intervals";

export const metadata: Metadata = {
  title: "Guitar Ear Training — Intervals and Chords",
  description:
    "Free ear trainer for guitarists. Hear an interval or a chord played on a guitar-like tone, name it, and track your streak. Three levels, no sign-up.",
  alternates: { canonical: "/ear-training" },
  openGraph: {
    title: "Guitar Ear Training — Interval and Chord Recognition",
    description:
      "Short daily rounds of interval and chord-type recognition, with song cues for every interval and a weak-spot tracker.",
  },
};

export default function EarTrainingPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Ear Training - GuitarTunePro",
    url: "https://www.guitartunepro.com/ear-training",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Interval and chord-type recognition trainer with three difficulty levels, ascending, descending and harmonic intervals, strummed or arpeggiated chords, streaks, and a per-answer weak-spot tracker.",
    featureList: [
      "Interval recognition: 13 intervals across three levels",
      "Chord type recognition: 9 qualities across three levels",
      "Ascending, descending, and harmonic playback",
      "Guitar-like plucked tone rather than a sine beep",
      "Song cue for every interval you miss",
      "Session score, streak, and best streak",
      "Weak-spot tracking stored on your device",
      "Keyboard shortcuts",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <ToolPageLayout
        title="Ear Training for Guitarists"
        description="Hear it, name it. Short rounds of interval and chord recognition on a guitar-like tone, with a streak to keep and a list of what you keep missing."
        canonicalPath="/ear-training"
        tool={<EarTrainer />}
        otherTools={otherToolLinks("/ear-training")}
        faqs={[
          {
            question: "How long should I practise ear training each day?",
            answer:
              "Five to ten minutes, daily, beats an hour once a week by a wide margin. Recognition is a memory skill, and memory consolidates between sessions, not during them. A round of twenty questions here takes about three minutes.",
          },
          {
            question: "Which level should I start on?",
            answer:
              "Beginner, even if you have played for years. It covers the intervals you already know from tuning and power chords — 3rds, 4ths, 5ths, and the octave — and the point is to attach the name to the sound you already recognise. Move up when you are above 90% for a few days running.",
          },
          {
            question: "What are the song cues for?",
            answer:
              "Every interval is the opening of some tune you know. A rising perfect 4th is the start of Here Comes the Bride; a rising major 6th is My Bonnie Lies Over the Ocean. When you miss an interval, the trainer shows you the cue for it. Use it as a crutch until you no longer need it — most people stop needing it within a couple of weeks.",
          },
          {
            question: "Why is the tone a plucked string instead of a piano or a beep?",
            answer:
              "Because you are training to hear these on a guitar. Overtones differ between instruments and change how an interval feels; the trainer uses the same plucked-string synthesis as our chord library so the sounds match what you will hear from your own instrument.",
          },
          {
            question: "Where is my progress stored?",
            answer:
              "In your browser only. The best streak and per-answer accuracy live in local storage on this device — nothing is sent to us, and there is no account. Clearing site data resets it.",
          },
          {
            question: "What do the keyboard shortcuts do?",
            answer:
              "R replays the question, N or Enter moves to the next one, and the number keys 1 to 9 choose an answer in the order shown. You can do a whole round without touching the mouse.",
          },
        ]}
        relatedArticles={[
          {
            title: "How to Tune a Guitar by Ear",
            slug: "how-to-tune-a-guitar-by-ear",
            description: "The relative-tuning method and the intervals it relies on.",
          },
          {
            title: "Standard Tuning Explained",
            slug: "standard-tuning-explained",
            description: "The intervals between the strings, and why they are what they are.",
          },
          {
            title: "Beginner Guitar Chord Progressions",
            slug: "beginner-guitar-chord-progressions",
            description: "Hearing the difference between major and minor is what unlocks these.",
          },
        ]}
      >
        <h2>How to Use the Ear Trainer</h2>
        <ol>
          <li>
            Pick <strong>Intervals</strong> or <strong>Chord types</strong>, and
            a level. The answer buttons show only the options in that level, so
            beginner rounds are a choice between five sounds, not thirteen.
          </li>
          <li>
            For intervals, choose whether the notes go up, down, or sound
            together. For chords, choose strummed or picked one note at a time.
            <strong> Mixed</strong> draws from all of them.
          </li>
          <li>
            Press <strong>Start</strong>. Listen, then choose. You get the answer
            immediately, and a song cue if you missed an interval.
          </li>
          <li>
            Press <strong>Next</strong> and keep going. The score, streak, and
            your best-ever streak sit above the question.
          </li>
        </ol>

        <h2>Why Intervals First</h2>
        <p>
          An interval is the distance between two notes, and every melody,
          riff, and chord is built from them. If you can hear that a phrase
          rises a perfect 4th and then falls a major 2nd, you can find it on
          the neck without hunting. If you can hear a major 3rd inside a chord,
          you know it is major before your fingers move.
        </p>
        <p>
          Guitarists have a head start here. Standard tuning is four perfect
          4ths and one major 3rd — you hear those intervals every time you tune
          by ear. A power chord is a perfect 5th. The Beginner level starts
          from exactly those sounds and adds names to them.
        </p>

        <h2>Every Interval and Its Song Cue</h2>
        <p>
          These are the cues the trainer shows. Each tune starts with the
          interval in question, so singing the first two notes gives you the
          sound. They are approximate — cues are scaffolding, not the goal.
        </p>
        <div className="not-prose overflow-x-auto rounded-xl border border-line">
          <table className="w-full text-sm">
            <thead className="bg-surface-sunken/50 text-left text-2xs uppercase tracking-wider text-ink-subtle">
              <tr>
                <th className="px-4 py-2.5 font-semibold">Interval</th>
                <th className="px-4 py-2.5 font-semibold">Semitones</th>
                <th className="px-4 py-2.5 font-semibold">Ascending</th>
                <th className="px-4 py-2.5 font-semibold">Descending</th>
              </tr>
            </thead>
            <tbody>
              {INTERVALS.filter((i) => i.semitones > 0).map((interval) => (
                <tr key={interval.semitones} className="border-t border-line/60">
                  <td className="px-4 py-2 font-semibold text-ink">
                    {interval.name}{" "}
                    <span className="font-mono text-2xs text-ink-subtle">{interval.short}</span>
                  </td>
                  <td className="px-4 py-2 tabular-nums text-ink-muted">{interval.semitones}</td>
                  <td className="px-4 py-2 text-ink-muted">{interval.ascendingCue}</td>
                  <td className="px-4 py-2 text-ink-muted">{interval.descendingCue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Hearing Chord Types</h2>
        <p>
          A chord&apos;s type is decided by one or two notes. Major and minor
          differ only in the 3rd — one semitone. That is the whole Beginner
          level, and it is the most useful distinction in music. Intermediate
          adds the two unstable triads, diminished and augmented, plus sus4,
          which has no 3rd at all. Advanced brings in the sevenths: dominant,
          major, and minor.
        </p>
        <p>
          Try both playback modes. A strummed chord is how you will meet it in
          a song; an arpeggio lets you hear each note land, which is how to
          work out <em>why</em> it sounds the way it does. If you miss a chord,
          replay it as an arpeggio and listen for the 3rd.
        </p>

        <h2>Using the Weak-Spot List</h2>
        <p>
          Once you have answered a question type at least four times, the
          trainer starts scoring it, and anything under 80% shows up under the
          game. This is the useful part. Most people have two or three
          intervals they consistently confuse — minor and major 6ths, or the
          tritone and the perfect 5th — and the fix is to drill just those,
          side by side, until they separate.
        </p>
        <p>
          Nothing leaves your browser. There is no account and no server; the
          stats are local storage, like a saved game.
        </p>

        <h2>From Ears to Fingers</h2>
        <p>
          Once an interval is reliably yours, take it to the neck. Play it on
          one string, then across two, then find it inside a chord using the{" "}
          <Link href="/chord-finder">chord finder</Link> to check your work.
          And tune first — the{" "}
          <Link href="/">chromatic tuner</Link> is a click away — because a
          guitar that is ten cents out teaches your ear the wrong thing.
        </p>
      </ToolPageLayout>
    </>
  );
}
