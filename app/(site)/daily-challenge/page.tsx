import { Metadata } from "next";
import Link from "next/link";
import ToolPageLayout from "@/components/ToolPageLayout";
import { DailyChallenge } from "@/components/DailyChallenge/DailyChallenge";
import { otherToolLinks } from "@/lib/toolPages";

export const metadata: Metadata = {
  title: "Daily Guitar Ear Training Challenge",
  description:
    "Five quick questions a day — intervals, chord types and a fretboard note — the same for everyone. One try each, a streak to keep, and a result to share.",
  alternates: { canonical: "/daily-challenge" },
  openGraph: {
    title: "Daily Guitar Ear Training Challenge — 5 Questions a Day",
    description:
      "Two intervals, two chords and a fretboard note. Same five for everyone, one try each. How many can you get?",
  },
};

export default function DailyChallengePage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Daily Ear Training Challenge - GuitarTunePro",
    url: "https://www.guitartunepro.com/daily-challenge",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "A daily five-question musicianship quiz for guitarists: interval recognition, chord-type recognition and fretboard note naming, identical for every player each day.",
    featureList: [
      "Five new questions every day, the same for every player",
      "Interval, chord-type and fretboard rounds, easiest first",
      "One attempt per question",
      "Daily streak, best streak and score distribution",
      "Shareable result grid",
      "Guitar-like plucked tone",
      "Results stored on your device only",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <ToolPageLayout
        title="Daily Ear Training Challenge"
        description="Five questions, once a day, the same for every guitarist. Two intervals, two chord types and one fretboard note — one try at each."
        canonicalPath="/daily-challenge"
        tool={<DailyChallenge />}
        otherTools={otherToolLinks("/daily-challenge")}
        faqs={[
          {
            question: "Is the challenge really the same for everyone?",
            answer:
              "Yes. The five questions are generated from the date, so every player who opens the page on the same calendar day gets the same intervals, the same chords, and the same fretboard note. That is what makes comparing scores with a friend or a band-mate meaningful.",
          },
          {
            question: "When does a new challenge start?",
            answer:
              "At midnight on your own device's clock. Like a daily word puzzle, that means someone in another time zone may be a challenge ahead of or behind you for a few hours.",
          },
          {
            question: "Can I retry a question I got wrong?",
            answer:
              "No — each answer is saved the moment you give it, and leaving the page halfway does not reset anything. One attempt is the point: it measures what you can hear today, not what you can guess on the second try. For unlimited practice, use the ear trainer.",
          },
          {
            question: "How is the streak counted?",
            answer:
              "Your streak is the number of consecutive daily challenges you have finished, whatever the score. Missing a day resets it. Finishing the challenge also counts as a practice day on the practice routine page.",
          },
          {
            question: "What does the share button send?",
            answer:
              "Only text: the challenge number, your score, a coloured square for each question, and a link. It does not reveal the answers, so you can post it without spoiling the day for anyone else. Nothing is sent to us.",
          },
          {
            question: "Can I play without sound?",
            answer:
              "The fretboard question works silently, but the interval and chord questions are listening tests and need audio. Headphones help with the harmonic interval on harder days, where both notes ring at once.",
          },
        ]}
        relatedArticles={[
          {
            title: "How to Tune a Guitar by Ear",
            slug: "how-to-tune-a-guitar-by-ear",
            description: "The same interval-hearing skill, applied to your strings.",
          },
          {
            title: "The Guitar Fretboard Notes Map",
            slug: "guitar-fretboard-notes-map",
            description: "Patterns that make the fretboard question easy.",
          },
          {
            title: "Beginner Guitar Chord Progressions",
            slug: "beginner-guitar-chord-progressions",
            description: "Where major, minor and seventh chords show up in real songs.",
          },
        ]}
      >
        <h2>How the Daily Challenge Works</h2>
        <p>
          Every day there are five new questions, and they run from easiest to
          hardest. Question one is an ascending interval from the set every
          guitarist already knows from tuning and power chords: thirds, the
          fourth, the fifth and the octave. Question two is a strummed chord,
          major, minor, diminished, augmented or suspended. Question three is
          silent: a dot on the fretboard, and you name the note. Question four
          is a descending interval from a wider set, and question five
          alternates between two notes played at once and a seventh chord.
        </p>
        <p>
          You get one try at each, and the answer is saved as soon as you tap
          it. When you finish, you see your score, a streak, and how your
          scores have spread out over time. The share button copies a result
          grid like this one, which shows how you did without giving the
          answers away:
        </p>
        <pre className="not-prose rounded-xl border border-line bg-surface/40 px-5 py-4 text-sm leading-relaxed text-ink font-mono whitespace-pre-wrap">
          {"GuitarTunePro Daily #12 — 4/5\n🎵🟩 🎸🟩 🎯🟥 🎵🟩 🎸🟩\n🔥 5-day streak"}
        </pre>

        <h2>Why Five Questions a Day Works</h2>
        <p>
          Ear training is a memory skill, and memory is built by spacing, not by
          volume. Twenty minutes of intervals once a week does less than three
          minutes a day, because each day&apos;s short session makes you recall
          the sounds you half-forgot since the last one. The daily challenge is
          deliberately small enough that there is never a reason to skip it.
        </p>
        <p>
          The single attempt matters too. In an unlimited trainer it is easy to
          click through, half-listening, and let a correct guess on the second
          go feel like progress. Knowing you only get one answer makes you
          listen properly the first time, which is the habit you need when a
          band-mate calls out a chord or you are trying to work out a song.
        </p>

        <h2>Tips for Each Question Type</h2>
        <h3>Intervals</h3>
        <p>
          Sing or hum the two notes back before you answer. If you can sing it,
          you can usually name it. Most people learn intervals through the
          opening notes of a familiar tune — a rising fourth is the start of
          &ldquo;Here Comes the Bride&rdquo;, a rising fifth is
          &ldquo;Twinkle, Twinkle&rdquo;. The{" "}
          <Link href="/ear-training">ear trainer</Link> shows the song cue for
          every interval you miss.
        </p>
        <h3>Chord types</h3>
        <p>
          Listen for colour before detail. Major sounds settled and bright;
          minor, darker; diminished, tense and unstable; augmented, as if it is
          floating and needs to resolve somewhere. A suspended chord sounds open
          and unresolved because it has no third at all. On the seventh-chord
          days, a major 7th sounds soft and dreamy, a dominant 7th bluesy, and a
          minor 7th mellow.
        </p>
        <h3>The fretboard note</h3>
        <p>
          You do not need to have memorised all 72 positions. Use landmarks: the
          5th and 7th frets on the low E string are A and B, the 12th fret is
          the open note again, and the same note sits two strings up and two
          frets along (three frets when you cross onto or past the B string).
          The <Link href="/fretboard-trainer">fretboard trainer</Link> drills
          exactly this, and the{" "}
          <Link href="/articles/guitar-fretboard-notes-map">fretboard notes map</Link>{" "}
          lays out the patterns.
        </p>

        <h2>Make It Part of a Routine</h2>
        <p>
          The challenge takes about two minutes, which makes it a good warm-up
          after you tune. Finishing it counts as a practice day on the{" "}
          <Link href="/practice-routine">practice routine</Link> page, so it
          keeps that streak alive on days when you only have a few minutes.
          Your results are stored in your browser and never leave your device;
          clearing your site data resets them.
        </p>
      </ToolPageLayout>
    </>
  );
}
