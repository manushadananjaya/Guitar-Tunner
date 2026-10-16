import { Metadata } from "next";
import Link from "next/link";
import ArticleLayout from "@/components/ArticleLayout";

export const metadata: Metadata = {
  title: "Beginner Guitar Chord Progressions",
  description:
    "Five chord progressions that cover a huge amount of popular music, the simple theory behind why they work, and well-known songs built on each one.",
  alternates: { canonical: "/articles/beginner-guitar-chord-progressions" },
  openGraph: {
    title: "Beginner Guitar Chord Progressions",
    description:
      "I–V–vi–IV and four more progressions every guitarist should have under their fingers.",
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
        slug="beginner-guitar-chord-progressions"
        title="Beginner Guitar Chord Progressions"
        description="Learn five progressions and you can play along with an enormous slice of popular music. Here they are, with the theory kept to a minimum and the songs kept front and centre."
        datePublished="2026-09-02"
        dateModified="2026-09-02"
        readingTimeMinutes={10}
        faqs={[
          {
            question: "What is the most common chord progression in pop music?",
            answer:
              "I–V–vi–IV. In the key of C that is C, G, A minor, F. It is behind hundreds of hit songs across decades, to the point that it is sometimes called the 'four-chord song' progression.",
          },
          {
            question: "What do the Roman numerals mean in a chord progression?",
            answer:
              "They number the chords built on each note of the major scale. I is the chord on the first note, IV on the fourth, V on the fifth, and so on. Uppercase means a major chord, lowercase means minor. Writing progressions this way lets you move them to any key.",
          },
          {
            question: "Which progressions should a beginner learn first?",
            answer:
              "Start with I–IV–V and I–V–vi–IV in the keys of G and C, because the chords G, C, D, E minor and A minor are all open shapes with no barre. That covers the two most useful progressions with the five easiest chords.",
          },
          {
            question: "How do I know what key a progression is in?",
            answer:
              "The key is usually the chord the progression resolves to or starts from — the one that sounds like 'home'. If a song uses G, C, D and keeps landing on G, it is in the key of G.",
          },
          {
            question: "Why does the same progression work in different songs?",
            answer:
              "Because a progression is a pattern of tension and release, not a melody. The I chord feels settled, the V chord pulls back toward it, the IV moves away, the vi adds a darker colour. Songwriters reuse the pattern and write different melodies and lyrics over it.",
          },
        ]}
        relatedArticles={[
          {
            title: "How to Read Guitar Tabs",
            slug: "how-to-read-guitar-tabs",
            description:
              "Once you know the progressions, tab shows you the riffs and picking between the chords.",
          },
          {
            title: "The Guitar Fretboard Notes Map",
            slug: "guitar-fretboard-notes-map",
            description:
              "See why the chords in a key are the notes of its scale, stacked up.",
          },
          {
            title: "How to Use a Metronome for Guitar Practice",
            slug: "how-to-use-a-metronome-for-guitar-practice",
            description:
              "Chord-change drills are the single best use of a metronome for beginners.",
          },
        ]}
      >
        <p>
          A chord progression is just an order of chords that a section of a
          song cycles through. A surprisingly small number of them account for
          most of the music you already know, which is good news: get five
          progressions into your hands and you can busk along with the radio.
        </p>
        <p>
          The Roman numerals below number the chords in a key. In the key of C
          major, I is{" "}
          <Link href="/chords/c">C</Link>, ii is{" "}
          <Link href="/chords/d-minor">D minor</Link>, iii is{" "}
          <Link href="/chords/e-minor">E minor</Link>, IV is{" "}
          <Link href="/chords/f">F</Link>, V is{" "}
          <Link href="/chords/g">G</Link>, vi is{" "}
          <Link href="/chords/a-minor">A minor</Link>. Uppercase is major,
          lowercase is minor. Learn the numeral pattern and you can drop the
          progression into any key.
        </p>

        <h2>1. I–IV–V — the backbone of blues and early rock</h2>
        <p>
          Three major chords, and almost every twelve-bar blues, early
          rock-and-roll tune, and country song. In the key of G that is{" "}
          <Link href="/chords/g">G</Link>,{" "}
          <Link href="/chords/c">C</Link>,{" "}
          <Link href="/chords/d">D</Link> — three open chords, no barre.
        </p>
        <ul>
          <li>
            <strong>Feel:</strong> bright, direct, resolved. The V chord (D)
            leans hard back toward the I (G).
          </li>
          <li>
            <strong>Songs:</strong> "Twist and Shout", "La Bamba", "Blitzkrieg
            Bop", nearly any 12-bar blues.
          </li>
          <li>
            <strong>Try:</strong> play each chord for one bar, loop G–C–G–D, and
            you have the skeleton of a thousand songs.
          </li>
        </ul>

        <h2>2. I–V–vi–IV — the four-chord pop progression</h2>
        <p>
          The famous one. In the key of C:{" "}
          <Link href="/chords/c">C</Link> –{" "}
          <Link href="/chords/g">G</Link> –{" "}
          <Link href="/chords/a-minor">A minor</Link> –{" "}
          <Link href="/chords/f">F</Link>. The one tricky shape is F; if the
          barre is not there yet, use a small three-string F or capo up and play
          it in G ({" "}
          <Link href="/chords/g">G</Link> –{" "}
          <Link href="/chords/d">D</Link> –{" "}
          <Link href="/chords/e-minor">E minor</Link> –{" "}
          <Link href="/chords/c">C</Link>).
        </p>
        <ul>
          <li>
            <strong>Feel:</strong> uplifting but with a wistful dip on the vi
            chord.
          </li>
          <li>
            <strong>Songs:</strong> "Let It Be", "With or Without You", "No
            Woman No Cry", "Someone Like You" — the list is long enough to be a
            comedy sketch.
          </li>
        </ul>

        <h2>3. vi–IV–I–V — the same four chords, darker start</h2>
        <p>
          Take the pop progression and begin on the minor chord instead:{" "}
          <Link href="/chords/a-minor">A minor</Link> –{" "}
          <Link href="/chords/f">F</Link> –{" "}
          <Link href="/chords/c">C</Link> –{" "}
          <Link href="/chords/g">G</Link>. Starting on the vi makes the whole
          loop feel moodier even though the chords are identical.
        </p>
        <ul>
          <li>
            <strong>Feel:</strong> emotional, driving, a bit melancholy.
          </li>
          <li>
            <strong>Songs:</strong> "Zombie", "Numb", "Complicated", a lot of
            2000s pop-punk and emo.
          </li>
        </ul>

        <h2>4. ii–V–I — the jazz cadence</h2>
        <p>
          The strongest way to arrive home in tonal music. In C:{" "}
          <Link href="/chords/d-minor">D minor</Link> →{" "}
          <Link href="/chords/g-7">G7</Link> →{" "}
          <Link href="/chords/c-maj7">C major 7</Link>. The ii sets up the V,
          the V7 creates tension, the I releases it. Swap in seventh chords and
          it is instantly jazzy.
        </p>
        <ul>
          <li>
            <strong>Feel:</strong> smooth, conclusive, sophisticated.
          </li>
          <li>
            <strong>Songs:</strong> the turnaround in countless jazz standards;
            also the end of many pop bridges.
          </li>
        </ul>

        <h2>5. I–vi–IV–V — the 50s doo-wop turnaround</h2>
        <p>
          In C:{" "}
          <Link href="/chords/c">C</Link> –{" "}
          <Link href="/chords/a-minor">A minor</Link> –{" "}
          <Link href="/chords/f">F</Link> –{" "}
          <Link href="/chords/g">G</Link>. Instantly evokes the 1950s, and it
          still turns up whenever a songwriter wants that nostalgic sway.
        </p>
        <ul>
          <li>
            <strong>Feel:</strong> gentle, rocking, sentimental.
          </li>
          <li>
            <strong>Songs:</strong> "Stand By Me", "Every Breath You Take"
            (close relative), "I Will Always Love You" (verse).
          </li>
        </ul>

        <h2>How to Practise These</h2>
        <p>
          The chords are the easy part. The hard part is changing between them
          in time without stopping.
        </p>
        <ol>
          <li>
            Pick one progression and one key. Set a{" "}
            <Link href="/metronome">metronome</Link> slow — 50 to 60 BPM.
          </li>
          <li>
            Change chord on beat 1 of each bar. One strum per bar is fine at
            first; the goal is a clean, on-time change, not a rhythm.
          </li>
          <li>
            When the changes are reliable, add a strumming pattern — down, down,
            down-up, down is a good default.
          </li>
          <li>
            Nudge the tempo up 5 BPM. Repeat.
          </li>
          <li>
            Once a progression feels automatic, transpose it. Play I–V–vi–IV in
            G, then in D, then in A. The numerals stay the same; only the shapes
            move.
          </li>
        </ol>
        <p>
          Every chord named here has a diagram, fingering, and audio in the{" "}
          <Link href="/chords">chord library</Link>, and the individual pages
          list which keys each chord belongs to — which is another way of seeing
          why these progressions hang together. And as always, tune up first
          with the <Link href="/">free tuner</Link>; a progression practised on
          an out-of-tune guitar teaches your ear the wrong thing.
        </p>
      </ArticleLayout>
    </>
  );
}
