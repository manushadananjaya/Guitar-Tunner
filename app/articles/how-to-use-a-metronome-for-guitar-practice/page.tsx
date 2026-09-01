import { Metadata } from "next";
import Link from "next/link";
import ArticleLayout from "@/components/ArticleLayout";

export const metadata: Metadata = {
  title: "How to Use a Metronome for Guitar Practice",
  description:
    "How to actually practise with a click: counting subdivisions, where to place the beat, tempo ladders, and the habits that make metronome practice pay off.",
  alternates: {
    canonical: "/articles/how-to-use-a-metronome-for-guitar-practice",
  },
  openGraph: {
    title: "How to Use a Metronome for Guitar Practice",
    description:
      "Subdivisions, tempo ladders, and the mistakes that make practising with a click feel pointless.",
    images: [
      {
        url: "https://www.guitartunepro.com/Logo.png",
        alt: "GuitarTunePro — free online guitar tuner",
      },
    ],
  },
};

export default function ArticlePage() {
  return (
    <>
      <ArticleLayout
        slug="how-to-use-a-metronome-for-guitar-practice"
        title="How to Use a Metronome for Guitar Practice"
        description="A metronome is the most useful practice tool after the guitar itself, and the most commonly misused. Here is how to get real timing improvement from it."
        datePublished="2026-09-02"
        dateModified="2026-09-02"
        readingTimeMinutes={9}
        faqs={[
          {
            question: "What tempo should a beginner start a metronome at?",
            answer:
              "Slow enough that you can play the passage with zero mistakes — often 50 to 70 BPM for chord changes or simple riffs. The number is not the point. The point is finding the fastest tempo at which you are still perfectly clean, then working up from there in small steps.",
          },
          {
            question: "Should the metronome click on every beat or just some?",
            answer:
              "Start with every beat. As your timing improves, move the click to beats 2 and 4 only, then to beat 1 of each bar. Fewer clicks force you to keep time internally, which is the actual skill you are building.",
          },
          {
            question: "Why do I speed up and slow down even with a metronome on?",
            answer:
              "Usually because you are listening past the click instead of locking to it, or because the hard parts of a passage drag and the easy parts rush. Slow the tempo until the whole passage is even, and consciously place each note right on top of the click rather than near it.",
          },
          {
            question: "How much should I increase the tempo each session?",
            answer:
              "Small amounts. Three to five BPM once a passage is clean and comfortable at the current speed. If accuracy drops when you speed up, go back down. Progress in timing practice is slow and cumulative, not dramatic.",
          },
          {
            question: "Is it bad to always practise with a metronome?",
            answer:
              "It should not be the only way you play. Use it to build and check timing, then also practise without it to develop your internal clock and your feel. Both matter. Musicians who only ever play to a click can sound stiff.",
          },
        ]}
        relatedArticles={[
          {
            title: "Beginner Guitar Chord Progressions",
            slug: "beginner-guitar-chord-progressions",
            description:
              "Chord-change drills are the best first exercise to put a metronome behind.",
          },
          {
            title: "How to Read Guitar Tabs",
            slug: "how-to-read-guitar-tabs",
            description: "Get the notes down first, then bring in the click.",
          },
          {
            title: "How to Tune a Guitar for Beginners",
            slug: "how-to-tune-a-guitar-for-beginners",
            description: "Tune up before every practice session.",
          },
        ]}
      >
        <p>
          Most people use a metronome by switching it on, playing along until it
          gets annoying, and switching it off having learned nothing. Used
          properly it is the fastest way to fix the single biggest weakness in
          amateur playing, which is not speed or technique but timing.
        </p>
        <p>
          Everything below assumes you have a metronome running. The{" "}
          <Link href="/metronome">one on this site</Link> is free and lets you
          set the tempo and time signature, but a cheap clip-on or any phone app
          works just as well.
        </p>

        <h2>First, Understand What the Click Is</h2>
        <p>
          The metronome marks the beat — the steady pulse you would tap your
          foot to. Tempo is measured in beats per minute (BPM). A ballad might
          sit at 70 BPM, a lot of pop and rock lands around 110 to 130, and fast
          punk or metal runs 180 and up.
        </p>
        <p>
          Between the clicks, you subdivide. If the click is a quarter note, you
          might play two eighth notes per beat, or four sixteenths, or a triplet
          of three. Counting those subdivisions out loud — "one and two and", or
          "one-e-and-a" — is the habit that makes the metronome useful. Silent
          counting drifts; spoken counting does not.
        </p>

        <h2>Place Notes On the Click, Not Near It</h2>
        <p>
          When you first play with a metronome, aim to make the click disappear.
          If your note lands exactly on the beat, the two sounds fuse and you
          stop hearing the click as a separate thing. If you hear a flam — a
          little "d-dum" — you are early or late.
        </p>
        <p>
          This is a listening exercise as much as a playing one. Slow the tempo
          right down, play a single repeated note, and chase that fused sound
          until you can hold it for a minute straight. It is less boring than it
          sounds once you realise how often you are slightly off.
        </p>

        <h2>The Tempo Ladder</h2>
        <p>
          This is the core routine and it works for scales, riffs, chord
          changes, solos, anything.
        </p>
        <ol>
          <li>
            Set the tempo where you can play the passage <strong>perfectly</strong>
            — every note clean, in time, no tension. This is usually slower than
            your ego wants.
          </li>
          <li>
            Play it correctly five times in a row. A mistake resets the count.
          </li>
          <li>
            Raise the tempo by 3 to 5 BPM. Repeat the five clean reps.
          </li>
          <li>
            When you hit a wall — accuracy falls apart — drop back 10 to 15 BPM
            and stay there for the rest of the session. You have found today's
            ceiling.
          </li>
          <li>
            Next session, start a few BPM below where you stopped and climb
            again. Over weeks the ceiling rises on its own.
          </li>
        </ol>
        <p>
          The discipline is in step 1 and step 2. Practising a passage fast and
          sloppy just teaches your hands to play it fast and sloppy.
        </p>

        <h2>Make It Harder by Removing Clicks</h2>
        <p>
          Once a passage is solid with a click on every beat, thin the clicks
          out:
        </p>
        <ul>
          <li>
            <strong>Beats 2 and 4 only.</strong> Now the metronome is playing
            the backbeat, like a snare drum, and you keep beats 1 and 3
            yourself.
          </li>
          <li>
            <strong>Beat 1 only.</strong> One click per bar. You are keeping
            time almost entirely on your own and checking in once a bar.
          </li>
          <li>
            <strong>One click every two bars.</strong> Brutal, and revealing.
          </li>
        </ul>
        <p>
          Each step forces more of the timekeeping onto your internal clock,
          which is the thing you are actually trying to develop.
        </p>

        <h2>Common Mistakes</h2>
        <ul>
          <li>
            <strong>Starting too fast.</strong> If you cannot play it perfectly,
            the tempo is wrong. Slow down until you can.
          </li>
          <li>
            <strong>Not counting.</strong> Say the subdivisions out loud. It
            feels silly and it works.
          </li>
          <li>
            <strong>Rushing the easy bars.</strong> People slow down for hard
            passages and speed up for easy ones. The metronome exposes this
            immediately — listen for where you drift.
          </li>
          <li>
            <strong>Only ever using the click.</strong> Spend some practice time
            without it, playing to a drum track or nothing, so you build feel as
            well as precision.
          </li>
          <li>
            <strong>Chasing a number.</strong> Hitting 160 BPM sloppily is worse
            than owning 120 BPM completely. Speed is a by-product of accurate,
            relaxed repetition.
          </li>
        </ul>

        <h2>A Simple Weekly Routine</h2>
        <p>
          Ten minutes at the start of a practice session is plenty:
        </p>
        <ul>
          <li>
            <strong>2 minutes:</strong> single repeated note, slow, chasing the
            fused-click sound.
          </li>
          <li>
            <strong>4 minutes:</strong> tempo ladder on whatever you are
            currently learning — a scale, a riff, or a{" "}
            <Link href="/articles/beginner-guitar-chord-progressions">
              chord progression
            </Link>
            .
          </li>
          <li>
            <strong>4 minutes:</strong> the same material with the click on
            beats 2 and 4 only.
          </li>
        </ul>
        <p>
          Do that four or five days a week and your timing will be noticeably
          steadier within a month — the kind of improvement other people hear
          before you do.
        </p>
      </ArticleLayout>
    </>
  );
}
