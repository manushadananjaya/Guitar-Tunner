import { Metadata } from "next";
import Link from "next/link";
import ToolPageLayout from "@/components/ToolPageLayout";
import { FretboardTrainer } from "@/components/FretboardTrainer/FretboardTrainer";
import { otherToolLinks } from "@/lib/toolPages";

export const metadata: Metadata = {
  title: "Fretboard Note Trainer for Guitar",
  description:
    "Free guitar fretboard quiz: name the note at a fret or find a note on a string, with streaks, answer times and per-string accuracy. Learn the neck fast.",
  alternates: { canonical: "/fretboard-trainer" },
  openGraph: {
    title: "Guitar Fretboard Note Trainer",
    description:
      "Two quiz modes, adjustable fret range and strings, and progress tracked per string on your device.",
  },
};

export default function FretboardTrainerPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Fretboard Note Trainer - GuitarTunePro",
    url: "https://www.guitartunepro.com/fretboard-trainer",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Quiz for memorising the notes on the guitar fretboard: name the note at a fret, or find a named note on a string.",
    featureList: [
      "Name the note and find the note modes",
      "Choose strings and fret range",
      "Natural notes only, or all twelve",
      "Average answer time and streaks",
      "Accuracy per string, stored on your device",
      "Keyboard answers with the letters A to G",
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <ToolPageLayout
        title="Fretboard Note Trainer"
        description="Learn the notes on the neck the way you learn anything else: short quizzes, one string at a time, with a running score. Name a lit-up fret, or find a note on a string."
        canonicalPath="/fretboard-trainer"
        tool={<FretboardTrainer />}
        otherTools={otherToolLinks("/fretboard-trainer")}
        faqs={[
          {
            question: "How long does it take to learn the fretboard?",
            answer:
              "Natural notes on the low E and A strings, the ones you need for barre chord roots, take most people a week or two at five minutes a day. The whole neck, to the point where you name any note without counting, is more like two to three months of short daily sessions. Speed of recall is the goal, not just correctness.",
          },
          {
            question: "Should I learn sharps and flats too?",
            answer:
              "Learn the natural notes first. The sharps and flats sit between them, so once you know that G is at the 3rd fret of the low E string, G♯ is the 4th and G♭ the 2nd without memorising anything new. Untick 'natural notes only' once your natural-note accuracy is above 90%.",
          },
          {
            question: "Which strings should I start with?",
            answer:
              "The low E and the A. Root notes for nearly every barre chord and power chord live there, so knowing them pays off immediately. The high E string has the same notes as the low E, so once you know one you know both. Then the D and G strings, and the B last, because it is tuned differently from the rest.",
          },
          {
            question: "What is the difference between the two modes?",
            answer:
              "'Name the note' shows you a fret and asks what it is, which is reading the neck. 'Find the note' gives you a note and a string and asks where it is, which is what you need when a chart says play an A♭ chord. Both directions need practice; most people are noticeably slower at one.",
          },
          {
            question: "Is my progress saved?",
            answer:
              "Your best streak and accuracy per string are saved in your browser on this device. Nothing is sent to a server and there is no sign-in. Using the trainer also counts toward your streak on the practice routine page.",
          },
        ]}
        relatedArticles={[
          {
            title: "Guitar Fretboard Notes Map",
            slug: "guitar-fretboard-notes-map",
            description: "The full map of notes, and the landmarks that make it learnable.",
          },
          {
            title: "Standard Tuning Explained",
            slug: "standard-tuning-explained",
            description: "Why the B string breaks the pattern, and how that affects every shape.",
          },
          {
            title: "How to Read Guitar Tabs",
            slug: "how-to-read-guitar-tabs",
            description: "Tab tells you the fret; knowing the note tells you why.",
          },
        ]}
      >
        <h2>How to Use the Trainer</h2>
        <ol>
          <li>
            Choose a mode. <strong>Name the note</strong> lights up a fret and gives you answer buttons.{" "}
            <strong>Find the note</strong> names a note and a string, and you tap the fret.
          </li>
          <li>
            Set the <strong>fret range</strong> and the <strong>strings</strong>. Start small: frets 0–5 on the
            low E string alone is a good first session. Dimmed frets are outside the range and never asked.
          </li>
          <li>
            Leave <strong>natural notes only</strong> ticked until you are fast. Leave <strong>sound</strong> on,
            so you hear the note you are naming.
          </li>
          <li>
            Press <strong>Start</strong>. In &quot;name the note&quot; you can answer from the keyboard with the
            letters A to G, and press N or Enter for the next question.
          </li>
        </ol>
        <p>
          The scoreboard tracks your score, your average answer time, and your streak. Once you have answered
          on a string, its accuracy appears under the board. That is where to look for your weak strings.
        </p>

        <h2>Why Memorise the Notes at All?</h2>
        <p>
          You can play a lot of guitar from shapes and tab without knowing a single note name, and many people do.
          The cost shows up later. A chord chart says B♭; a bandmate says &quot;it&apos;s in F♯&quot;; a lesson
          tells you to move a shape so its root is on C. If finding those notes means counting up from the open
          string, every one of those moments slows you down.
        </p>
        <p>
          Knowing the neck also makes the theory on this site usable. A{" "}
          <Link href="/scales">scale shape</Link> only becomes a key when you know where its root is, and a{" "}
          <Link href="/chords">barre chord</Link> becomes any chord you want when you can put its root on the
          right fret straight away.
        </p>

        <h2>Landmarks That Make It Easier</h2>
        <p>
          Nobody memorises 90-odd positions one by one. Instead you learn a handful of anchors and work outward:
        </p>
        <ul>
          <li><strong>The open strings</strong>, E A D G B E, are the first six answers.</li>
          <li><strong>The 12th fret</strong> repeats the open strings an octave up. Everything above it is the same as everything below.</li>
          <li><strong>The 5th fret</strong> of each string (except the G) gives the next string&apos;s open note. This is the basis of tuning by ear, and it means frets 5 and 0 share names across neighbouring strings.</li>
          <li><strong>E–F and B–C</strong> are the only natural notes with no sharp between them. So F is always one fret above E, and C one fret above B. Everything else is two frets apart.</li>
          <li><strong>Octave shapes</strong>: a note on the low E string reappears two strings up and two frets higher (low E 3rd fret G, D string 5th fret G). The B string shifts this pattern by one fret.</li>
        </ul>
        <p>
          The <Link href="/articles/guitar-fretboard-notes-map">fretboard notes map</Link> covers these in detail.
          Use it to understand the neck, then use this trainer to make recall automatic.
        </p>

        <h2>A Four-Week Plan</h2>
        <p>Five to ten minutes a day is enough. Move on when you are above 90% with an average under two seconds.</p>
        <ul>
          <li><strong>Week 1:</strong> low E string, frets 0–12, natural notes. Both modes.</li>
          <li><strong>Week 2:</strong> add the A string. Then low E and A together. These two give you every barre chord root.</li>
          <li><strong>Week 3:</strong> the D and G strings. Octave shapes from the E and A strings will start helping.</li>
          <li><strong>Week 4:</strong> the B and high E strings, then all six strings with sharps and flats.</li>
        </ul>
        <p>
          After that, switch the range to <strong>whole neck</strong> for a minute or two a day to keep it fresh.
          This trainer is a step in the <Link href="/practice-routine">daily practice routine</Link>, so it is
          easy to keep up.
        </p>

        <h2>Say It, Hear It, Play It</h2>
        <p>
          Recognition in a quiz is not the same as knowing a note while you play. Bridge the gap away from the
          screen. Pick a note, say G, and play every G on the neck from low to high, saying the name each time.
          Then do it on one string at a time. Keep the trainer&apos;s sound on so the note name and its pitch get
          linked. The <Link href="/ear-training">ear trainer</Link> builds the same link from the other direction.
        </p>
      </ToolPageLayout>
    </>
  );
}
