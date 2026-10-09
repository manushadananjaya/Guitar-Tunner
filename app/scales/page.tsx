import { Metadata } from "next";
import Link from "next/link";
import ToolPageLayout from "@/components/ToolPageLayout";
import { ScaleExplorer } from "@/components/ScaleExplorer/ScaleExplorer";
import { otherToolLinks } from "@/lib/toolPages";
import { SCALES, spellScaleFrom } from "@/lib/music/scales";

export const metadata: Metadata = {
  title: "Guitar Scales on an Interactive Fretboard",
  description:
    "See any guitar scale on the whole neck: pentatonic, blues, major, minor and the modes, in every key and tuning. Hear it and improvise over a drone. Free.",
  alternates: { canonical: "/scales" },
  openGraph: {
    title: "Interactive Guitar Scale Charts",
    description:
      "Twelve scales in every key on a full fretboard, with note names or intervals, five-fret positions, audio playback, and a drone to improvise over.",
  },
};

/** Reference table, spelled from A so every scale is easy to compare. */
const A = { letter: "A", accidental: 0 };

export default function ScalesPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Guitar Scale Explorer - GuitarTunePro",
    url: "https://www.guitartunepro.com/scales",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Interactive fretboard showing twelve scales and modes in every key and in alternate tunings, with interval labels, positions, playback, and a drone.",
    featureList: [
      "12 scales: pentatonics, blues, major, three minors, and the modes",
      "Every key, correctly spelled (F♯ major has an E♯, not an F)",
      "Note names or interval labels on the fretboard",
      "Five-fret position view",
      "Works in drop D, open G, DADGAD and other six-string tunings",
      "Play the scale, tap any fret to hear it",
      "Root-and-fifth drone for improvising",
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <ToolPageLayout
        title="Guitar Scales on the Fretboard"
        description="Pick a key and a scale and see every note on the neck — as note names or as intervals. Hear it, isolate one position at a time, and improvise over a drone."
        canonicalPath="/scales"
        tool={<ScaleExplorer />}
        otherTools={otherToolLinks("/scales")}
        faqs={[
          {
            question: "Which guitar scale should I learn first?",
            answer:
              "The minor pentatonic, in position 1. It has five notes, no awkward stretches, and it works over most rock, blues, and pop. Once position 1 is automatic, learn position 2 and practise joining the two. Then the major scale, because every other scale on this page is described as a change to it.",
          },
          {
            question: "What is the difference between note names and intervals?",
            answer:
              "Note names tell you what a fret is (C, E♭). Intervals tell you what it does in the scale: R is the root, ♭3 the minor third, 5 the fifth, and so on. Intervals are the more useful view once you start improvising, because a ♭3 sounds like a ♭3 in any key. Switch between the two views until the shapes make sense both ways.",
          },
          {
            question: "Why does the explorer write E♯ instead of F in F♯ major?",
            answer:
              "Because every scale here uses each letter once. F♯ major needs a seventh note one letter above D♯, which is E, raised to E♯. Writing F would give the scale two F-letter notes and no E, which is wrong on paper and confusing when you read chord charts. The sound is the same; the spelling is what makes the theory readable.",
          },
          {
            question: "What are positions?",
            answer:
              "A position is a five-fret window you can play without shifting your hand. The explorer starts one at each scale note on the low E string, so a pentatonic scale has five positions and a seven-note scale has seven. Position 1 is the lowest. Learn them one at a time, then practise sliding between neighbours.",
          },
          {
            question: "What is the drone for?",
            answer:
              "A drone holds the root and fifth underneath you, so you can hear how each scale note sits against the key. The ♭3 sounds dark, the 4 wants to move, the 7 pulls up to the root. Improvising over a drone is the fastest way to learn what each note sounds like rather than just where it is.",
          },
          {
            question: "Does it work in alternate tunings?",
            answer:
              "Yes. Choose drop D, DADGAD, open G or any other six-string tuning from the tuning menu and the whole fretboard is recalculated. Patterns you know from standard tuning move on the strings that changed, which is a good way to see why alternate tunings feel different.",
          },
        ]}
        relatedArticles={[
          {
            title: "Guitar Fretboard Notes Map",
            slug: "guitar-fretboard-notes-map",
            description: "Learn where every note is — the foundation every scale sits on.",
          },
          {
            title: "Beginner Guitar Chord Progressions",
            slug: "beginner-guitar-chord-progressions",
            description: "The chords that come from the major scale, and how they are used.",
          },
          {
            title: "Alternate Guitar Tunings",
            slug: "alternate-guitar-tunings",
            description: "Why scale shapes move when you retune, and which tunings are worth it.",
          },
        ]}
      >
        <h2>How to Use the Scale Explorer</h2>
        <ol>
          <li>
            Choose a <strong>root note</strong> from the row of keys, and a <strong>scale</strong> from the menu.
            The fretboard fills in every note of that scale from the open strings to the 15th fret.
          </li>
          <li>
            Gold dots are the root. Use <strong>Intervals</strong> to replace the note names with scale degrees,
            which shows you the job each note does.
          </li>
          <li>
            Click a <strong>position</strong> to dim everything outside one five-fret window. That is the shape to
            practise; the rest of the neck is the same notes, repeated.
          </li>
          <li>
            Press <strong>Play scale</strong> to hear it up and back down from the lowest root (or from the root
            inside the selected position). Tap any fret to hear just that note.
          </li>
          <li>
            Turn on the <strong>drone</strong> and improvise. Start and end phrases on a gold dot.
          </li>
        </ol>
        <p>
          The URL updates as you go, so a link like <code>/scales?root=e&amp;scale=blues</code> opens straight to the
          E blues scale. Bookmark the ones you are working on.
        </p>

        <h2>The Twelve Scales, Side by Side</h2>
        <p>
          Here is every scale in the explorer spelled from A, so you can compare them directly. Read across a row
          and see which notes change. Each scale differs from its neighbours by one or two notes, and those notes
          give it its character.
        </p>
        <div className="not-prose overflow-x-auto rounded-xl border border-line">
          <table className="w-full text-sm">
            <thead className="bg-surface-sunken/50 text-left text-2xs uppercase tracking-wider text-ink-subtle">
              <tr>
                <th className="px-4 py-2.5 font-semibold">Scale</th>
                <th className="px-4 py-2.5 font-semibold">Formula</th>
                <th className="px-4 py-2.5 font-semibold">From A</th>
              </tr>
            </thead>
            <tbody>
              {SCALES.map((scale) => {
                const notes = spellScaleFrom(A, scale);
                return (
                  <tr key={scale.slug} className="border-t border-line/60">
                    <td className="px-4 py-2 font-semibold text-ink">
                      <Link href={`/scales?root=a&scale=${scale.slug}`} className="hover:text-brass">
                        {scale.name}
                      </Link>
                    </td>
                    <td className="px-4 py-2 font-mono text-xs text-ink-muted">
                      {notes.map((n) => (n.interval === "R" ? "1" : n.interval)).join(" ")}
                    </td>
                    <td className="px-4 py-2 text-ink-muted">{notes.map((n) => n.name).join(" ")}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <h2>Start With the Pentatonic</h2>
        <p>
          Almost everyone starts with the minor pentatonic, and for good reason. It has five notes instead of
          seven, and the two it leaves out (the 2nd and the ♭6) are the ones most likely to clash with the chords
          underneath. With those gone, it is hard to hit a wrong note. Position 1 fits under four fingers with
          two notes per string. It is the first lead-guitar shape most players learn.
        </p>
        <p>
          The major pentatonic uses exactly the same five shapes as the minor pentatonic three frets lower. G major
          pentatonic and E minor pentatonic are the same notes. What changes is which note you treat as home. Play
          the shape over a G chord and land on G, and it sounds bright. Play it over E minor and land on E, and it
          sounds dark. Try it: select each scale in the explorer and switch the drone root between them.
        </p>
        <p>
          The blues scale adds a single note to the minor pentatonic, the ♭5. It is a passing note. Slide or
          bend through it on the way to the 4th or the 5th rather than resting on it. Resting on it sounds like a
          mistake; moving through it sounds like the blues.
        </p>

        <h2>The Major Scale and Its Modes</h2>
        <p>
          The major scale is the reference point for everything else. Its formula, 1 2 3 4 5 6 7, is the yardstick
          the interval labels measure against. That is why a minor scale shows a ♭3 and a Lydian scale shows a
          ♯4: they are being compared with major.
        </p>
        <p>
          The modes are the major scale started from a different note, and on the guitar that is a useful way to
          see them. A Dorian uses the same notes as G major, but A is home. Seen against A major, though, each
          mode is one or two changed notes, and those notes are what you hear:
        </p>
        <ul>
          <li><strong>Dorian</strong> is natural minor with a raised 6th. Brighter, and good over a minor chord that lasts a while.</li>
          <li><strong>Phrygian</strong> is natural minor with a ♭2. That half step above the root is the whole sound.</li>
          <li><strong>Lydian</strong> is major with a ♯4. Avoid the plain 4 and the scale floats.</li>
          <li><strong>Mixolydian</strong> is major with a ♭7, the scale of a dominant 7th chord.</li>
          <li><strong>Locrian</strong> has a ♭5, so its root chord is diminished and never sounds settled.</li>
        </ul>
        <p>
          The quickest way to hear a mode is to keep the drone on one root and switch between modes. The notes that
          change are the ones to emphasise when you play it.
        </p>

        <h2>Chords From a Scale</h2>
        <p>
          For seven-note scales, the explorer lists the chord built on each degree by stacking every other note. In
          a major key that gives the familiar pattern of major, minor, minor, major, major, minor, diminished: in G,
          that is G, Am, Bm, C, D, Em, and F♯dim. These are the chords that sound like they belong together. They
          are why so many songs in G use G, C, D, and Em, and why a solo over those chords can use the G major
          scale throughout. The chord names link to diagrams in the{" "}
          <Link href="/chords">chord library</Link>. To hear the scale over real chords rather than a drone, loop a
          progression in the same key with the <Link href="/chord-progressions">progression builder</Link>.
        </p>

        <h2>How to Practise a Scale So It Sticks</h2>
        <p>
          Playing a scale up and down is necessary but not enough. Muscle memory for the shape comes quickly; knowing
          what the notes sound like takes longer. A routine that works:
        </p>
        <ol>
          <li>
            Play one position up and down with the <Link href="/metronome">metronome</Link> at a tempo where every note
            is clean. Speed comes later.
          </li>
          <li>Play it again in groups of three: 1-2-3, 2-3-4, 3-4-5, and so on. This breaks the habit of running the scale only in order.</li>
          <li>Turn on the drone and play four-note phrases that end on the root. Then end them on the 5th, then the 3rd. Each landing note has a different feel.</li>
          <li>Find the same notes in the next position up, and practise the shift between the two.</li>
        </ol>
        <p>
          Do this for five minutes a day rather than an hour once a week. The{" "}
          <Link href="/practice-routine">daily practice routine</Link> picks a different scale for you each day.
        </p>
      </ToolPageLayout>
    </>
  );
}
