import { Metadata } from "next";
import Link from "next/link";
import ToolPageLayout from "@/components/ToolPageLayout";
import { BeginnerCourse } from "@/components/BeginnerCourse/BeginnerCourse";
import { otherToolLinks } from "@/lib/toolPages";
import { COURSE, COURSE_DAYS } from "@/lib/course";

export const metadata: Metadata = {
  title: "Free 30-Day Beginner Guitar Course",
  description:
    "Learn guitar in 30 short daily lessons: tuning, timing, 16 chords, strumming, power chords, the blues and your first song. Free, in your browser, no sign-up.",
  alternates: { canonical: "/beginner-guitar-course" },
  openGraph: {
    title: "Learn Guitar in 30 Days — Free Beginner Course",
    description:
      "Fifteen minutes a day for 30 days, from tuning up to playing a whole song, with interactive tools for every lesson.",
  },
};

const totalMinutes = COURSE_DAYS.reduce((sum, d) => sum + d.minutes, 0);

export default function BeginnerCoursePage() {
  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "30-Day Beginner Guitar Course",
    description:
      "A free, self-paced beginner guitar course in 30 daily lessons of 10–20 minutes, covering tuning, timing, open chords, strumming, power chords, the minor pentatonic scale, the 12-bar blues, capo use, fingerpicking and first barre chords.",
    url: "https://www.guitartunepro.com/beginner-guitar-course",
    inLanguage: "en",
    isAccessibleForFree: true,
    educationalLevel: "Beginner",
    provider: {
      "@type": "Organization",
      name: "GuitarTunePro",
      url: "https://www.guitartunepro.com",
    },
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD", category: "Free" },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "Online",
      courseWorkload: "PT15M",
      courseSchedule: {
        "@type": "Schedule",
        repeatFrequency: "Daily",
        repeatCount: COURSE_DAYS.length,
      },
    },
    syllabusSections: COURSE.map((week) => ({
      "@type": "Syllabus",
      name: `Week ${week.week}: ${week.title}`,
      description: week.summary,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />
      <ToolPageLayout
        title="30-Day Beginner Guitar Course"
        description="Fifteen minutes a day, from tuning up on day one to playing a whole song on day thirty. Every lesson opens the tool it needs, already set up."
        canonicalPath="/beginner-guitar-course"
        tool={<BeginnerCourse />}
        otherTools={otherToolLinks("/beginner-guitar-course")}
        otherToolsHeading="Tools Used in the Course"
        faqs={[
          {
            question: "Do I really need only 15 minutes a day?",
            answer: `Yes — the whole course is about ${Math.round(totalMinutes / 60)} hours spread over 30 days. Short daily sessions work better than long weekly ones for a beginner: your fingertips toughen gradually instead of blistering, and the movements are rehearsed every day while they are still fresh. If you have more time, repeat the day rather than rushing ahead.`,
          },
          {
            question: "What if I can't do a day's check in one session?",
            answer:
              "Repeat the day tomorrow. The day numbers are a suggested order, not a deadline, and some days — the G chord, the F barre — take most people several sessions. Mark a day done when you can do its check, not when the date says so.",
          },
          {
            question: "Acoustic or electric?",
            answer:
              "Either works for the whole course. Electric guitars have lighter strings and are easier on the fingers at first; acoustics are louder and need no amplifier. Week three's power chords and palm muting sound best on an electric with a little distortion, but they work on an acoustic too.",
          },
          {
            question: "I'm left-handed. Does the course work for me?",
            answer:
              "Yes. Play a left-handed guitar, or a right-handed one restrung in reverse, and mirror everything: your fretting hand is the right hand and your picking hand is the left. The chord diagrams are drawn as the guitar faces you, so read them as a mirror image.",
          },
          {
            question: "Where is my progress kept?",
            answer:
              "In your browser, on this device. There is no account and nothing is sent to us. Every day you mark done also counts as a practice day on the practice routine page, so your streak keeps going.",
          },
          {
            question: "What comes after day 30?",
            answer:
              "Songs. Pick songs you want to play, learn the chords you do not have yet, and use the daily practice routine to keep your technique moving. Barre chords will keep improving for a few more weeks with a couple of minutes a day.",
          },
        ]}
        relatedArticles={[
          {
            title: "How to Tune a Guitar for Beginners",
            slug: "how-to-tune-a-guitar-for-beginners",
            description: "Day one, in more detail.",
          },
          {
            title: "Beginner Guitar Chord Progressions",
            slug: "beginner-guitar-chord-progressions",
            description: "The progressions weeks two and three are built on.",
          },
          {
            title: "How to Read Guitar Tabs",
            slug: "how-to-read-guitar-tabs",
            description: "For learning songs once the course is done.",
          },
          {
            title: "How to Use a Metronome for Guitar Practice",
            slug: "how-to-use-a-metronome-for-guitar-practice",
            description: "The habit behind every lesson.",
          },
        ]}
      >
        <h2>How the Course Works</h2>
        <p>
          There are 30 lessons in four weeks, each designed to take about 15
          minutes. Every day has a goal, two to four tasks, a tip for the thing
          that most often goes wrong, and a check that tells you when the day
          is done. Most tasks open one of the site&apos;s tools — the tuner,
          the metronome, a chord diagram, a backing loop — already set to what
          the lesson needs, so you spend the time playing rather than setting
          things up.
        </p>
        <p>
          Mark a day done when you can do its check. Your progress is saved in
          your browser, the next day opens automatically, and each completed
          day counts toward the streak on the{" "}
          <Link href="/practice-routine">practice routine</Link>.
        </p>

        <h2>What You Will Learn</h2>
        <ul>
          <li>
            <strong>Week 1:</strong> tuning, holding the guitar and pick,
            playing in time, and the open chords E minor, A minor, E, A and D.
          </li>
          <li>
            <strong>Week 2:</strong> G and C, eighth-note strumming, the
            campfire strum, and the G–C–D and four-chord pop progressions.
          </li>
          <li>
            <strong>Week 3:</strong> the notes on the low strings, power chords,
            palm muting, the A minor pentatonic scale, a minor-key progression
            and the 12-bar blues.
          </li>
          <li>
            <strong>Week 4:</strong> the capo, changing key, a syncopated strum,
            simple fingerpicking, your first barre chords, improvising, and a
            complete song.
          </li>
        </ul>
        <p>
          The chords come in the order that makes them easiest: shapes that
          share fingers are learned together, and nothing needs a barre until
          the last week. By day 30 you will have played sixteen chords,
          counting two power-chord shapes — enough for a large share of popular
          songs.
        </p>

        <h2>What You Need</h2>
        <ul>
          <li>A guitar, acoustic or electric, that stays in tune.</li>
          <li>A pick of medium thickness (around 0.6–0.75 mm) for strumming.</li>
          <li>
            A phone or computer with a microphone for the{" "}
            <Link href="/">tuner</Link>, and headphones or speakers for the
            metronome and backing loops.
          </li>
          <li>
            Optionally, a capo for week four. The{" "}
            <Link href="/capo-calculator">capo calculator</Link> shows what it
            does before you buy one.
          </li>
        </ul>
        <p>
          If the strings are very high off the fretboard, or the guitar will not
          stay in tune, a basic setup at a guitar shop is the best money a
          beginner can spend. It makes every chord in this course easier.
        </p>

        <h2>Getting the Most Out of It</h2>
        <p>
          Tune up at the start of every session, even if the guitar sounded
          fine yesterday. Keep the one-minute change counts from week one in a
          note on your phone; seeing them double is the best motivation there
          is. And play slowly: every tempo in the course is a starting point,
          not a target. Accurate and slow becomes accurate and fast; sloppy and
          fast just stays sloppy.
        </p>
      </ToolPageLayout>
    </>
  );
}
