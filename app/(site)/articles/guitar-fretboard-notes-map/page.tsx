import { Metadata } from "next";
import Link from "next/link";
import ArticleLayout from "@/components/ArticleLayout";

export const metadata: Metadata = {
  title: "The Guitar Fretboard Notes Map",
  description:
    "Every note on every string in standard tuning, plus the octave shapes and reference frets that let you find any note without memorising all 72 positions.",
  alternates: { canonical: "/articles/guitar-fretboard-notes-map" },
  openGraph: {
    title: "The Guitar Fretboard Notes Map",
    description:
      "A complete note map for standard tuning, and a method for learning it that is faster than brute force.",
    images: [
      {
        url: "https://www.guitartunepro.com/Logo.png",
        alt: "GuitarTunePro — free online guitar tuner",
      },
    ],
  },
};

const ROW = (label: string, notes: string[]) => ({ label, notes });

const STRINGS = [
  ROW("E (1st)", ["F", "F♯", "G", "G♯", "A", "A♯", "B", "C", "C♯", "D", "D♯", "E"]),
  ROW("B (2nd)", ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"]),
  ROW("G (3rd)", ["G♯", "A", "A♯", "B", "C", "C♯", "D", "D♯", "E", "F", "F♯", "G"]),
  ROW("D (4th)", ["D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B", "C", "C♯", "D"]),
  ROW("A (5th)", ["A♯", "B", "C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A"]),
  ROW("E (6th)", ["F", "F♯", "G", "G♯", "A", "A♯", "B", "C", "C♯", "D", "D♯", "E"]),
];

export default function ArticlePage() {
  return (
    <>
      <ArticleLayout
        slug="guitar-fretboard-notes-map"
        title="The Guitar Fretboard Notes Map"
        description="There are 72 note positions in the first twelve frets. You do not have to memorise them one by one — a handful of anchors and two shapes get you to any note quickly."
        datePublished="2026-09-02"
        dateModified="2026-09-02"
        readingTimeMinutes={10}
        faqs={[
          {
            question: "How many notes are on a guitar fretboard?",
            answer:
              "There are only twelve note names, but they repeat. On a 22-fret guitar in standard tuning there are 138 fretted positions plus 6 open strings. Everything above the 12th fret is a repeat of the notes below it, one octave higher, so learning the first twelve frets covers the whole neck.",
          },
          {
            question: "What are the note names on the low E string?",
            answer:
              "From the open string upward: E, F, F♯, G, G♯, A, A♯, B, C, C♯, D, D♯, and E again at the 12th fret. The high E string (1st string) is identical, two octaves higher.",
          },
          {
            question: "Do I need to memorise every note on the fretboard?",
            answer:
              "Not by rote. Learn the natural notes on the E and A strings first, because those anchor most barre chords and root positions. Then use octave shapes to jump to the same note on other strings. The rest fills in with playing.",
          },
          {
            question: "Why are there no sharps between B–C and E–F?",
            answer:
              "Those pairs are naturally one semitone apart, so there is no note between them. On the guitar that means B is at one fret and C is at the very next fret, with nothing in between — the same for E and F.",
          },
          {
            question: "Where are the fretboard dots and what do they mark?",
            answer:
              "The inlay dots sit at frets 3, 5, 7, 9, and a double dot at 12, then the pattern repeats. They are navigation markers. Frets 5 and 7 in particular are worth knowing cold, because the notes there line up with open strings.",
          },
        ]}
        relatedArticles={[
          {
            title: "Standard Tuning Explained",
            slug: "standard-tuning-explained",
            description:
              "Why the strings are E-A-D-G-B-E, which is the reason the map looks the way it does.",
          },
          {
            title: "Beginner Guitar Chord Progressions",
            slug: "beginner-guitar-chord-progressions",
            description:
              "Knowing your root notes turns a progression into something you can play in any key.",
          },
          {
            title: "How to Tune a Guitar by Ear",
            slug: "how-to-tune-a-guitar-by-ear",
            description:
              "The 5th-fret method is really just the note map in action.",
          },
        ]}
      >
        <p>
          The fretboard can feel like a wall of possibilities, but the
          underlying pattern is small. There are twelve note names. They go up
          one semitone — one fret — at a time, and after twelve frets they start
          over an octave higher. That is the entire system.
        </p>
        <p>
          The two quirks worth burning in now: there is no sharp between{" "}
          <strong>B and C</strong>, and none between <strong>E and F</strong>.
          Those notes are already a single fret apart. Every other natural note
          has a sharp between it and the next.
        </p>

        <h2>The Full Map, Frets 1–12</h2>
        <p>
          Standard tuning, open strings on the left, the 12th-fret octave on the
          right. Read across a row to walk up one string.
        </p>
        <div className="my-6 overflow-x-auto rounded-xl border border-line">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-surface/60 text-ink-muted">
              <tr>
                <th className="px-3 py-2 text-left font-semibold">String</th>
                {Array.from({ length: 12 }, (_, i) => (
                  <th key={i} className="px-2 py-2 text-center font-semibold">
                    {i + 1}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {STRINGS.map((string) => (
                <tr key={string.label} className="bg-surface/20">
                  <td className="px-3 py-2 font-semibold text-brass whitespace-nowrap">
                    {string.label}
                  </td>
                  {string.notes.map((note, i) => (
                    <td
                      key={i}
                      className="px-2 py-2 text-center font-mono text-ink"
                    >
                      {note}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Above the 12th fret, every note repeats: the 13th fret matches the
          1st, the 14th matches the 2nd, and so on. Learn this grid and you know
          the whole neck.
        </p>

        <h2>Don't Memorise It Row by Row</h2>
        <p>
          Brute-force memorisation is slow and it does not stick. Learn the map
          in layers instead.
        </p>

        <h3>Layer 1: the natural notes on strings 6 and 5</h3>
        <p>
          These two strings are where barre-chord and scale roots live, so they
          pay off first. On the low E string the natural notes fall at:
        </p>
        <div className="bg-surface/60 p-5 rounded-xl border border-line my-5 font-mono text-sm text-ink overflow-x-auto">
          E(0) · F(1) · G(3) · A(5) · B(7) · C(8) · D(10) · E(12)
        </div>
        <p>
          And on the A string:
        </p>
        <div className="bg-surface/60 p-5 rounded-xl border border-line my-5 font-mono text-sm text-ink overflow-x-auto">
          A(0) · B(2) · C(3) · D(5) · E(7) · F(8) · G(10) · A(12)
        </div>
        <p>
          Notice the shape is the same on both strings, just starting from a
          different letter — because both strings are tuned in the same
          intervals. Say the notes out loud as you play up each string, a few
          minutes a day.
        </p>

        <h3>Layer 2: the octave shapes</h3>
        <p>
          Once you can find a note on the 6th string, you can reach the same
          note elsewhere on the neck using fixed shapes:
        </p>
        <ul>
          <li>
            <strong>6th string to 4th string:</strong> same note, up two
            strings and <strong>two frets higher</strong>. A on the 6th string
            (5th fret) is also A on the 4th string (7th fret).
          </li>
          <li>
            <strong>5th string to 3rd string:</strong> the same shape — up two
            strings, two frets higher.
          </li>
          <li>
            <strong>4th string to 2nd string:</strong> up two strings, but{" "}
            <strong>three frets higher</strong>, because of the major third
            between the G and B strings.
          </li>
        </ul>
        <p>
          These shapes mean you never really memorise the D, G, B, and high E
          strings separately. You find a root on string 6 or 5 and hop to it.
        </p>

        <h3>Layer 3: the reference frets</h3>
        <p>
          Frets 5 and 7 are worth knowing cold, because they connect to open
          strings — this is exactly the relationship behind{" "}
          <Link href="/articles/how-to-tune-a-guitar-by-ear">
            tuning by ear
          </Link>
          :
        </p>
        <ul>
          <li>5th fret of any string (except the G string) = the next open string up.</li>
          <li>7th fret of a string = the open string two above it (a fifth).</li>
          <li>12th fret = the open string, one octave up. This is your halfway mirror.</li>
        </ul>

        <h2>A Five-Minute Daily Drill</h2>
        <ol>
          <li>
            Name a random note. Find it on the 6th string, then the 5th, then
            use octave shapes to find it on the other four. Say each one aloud.
          </li>
          <li>
            Pick a fret number. Name the note on all six strings at that fret,
            top to bottom, without looking at the map.
          </li>
          <li>
            Play the natural notes up the 6th string and back down, in time with
            a <Link href="/metronome">metronome</Link> at 60 BPM, saying each
            note.
          </li>
        </ol>
        <p>
          Do this for a couple of weeks and the fretboard stops being a maze.
          You will start seeing chord and scale roots as note names rather than
          finger positions, which is the point where theory and the guitar
          finally line up. Keep the guitar{" "}
          <Link href="/">in tune</Link> while you drill, or you will be
          training your ear against the wrong pitches.
        </p>
      </ArticleLayout>
    </>
  );
}
