import { Metadata } from "next";
import Link from "next/link";
import ToolPageLayout from "@/components/ToolPageLayout";
import { ChordFinder } from "@/components/ChordFinder/ChordFinder";
import { otherToolLinks } from "@/lib/toolPages";

export const metadata: Metadata = {
  title: "Reverse Chord Finder — Name Any Guitar Chord Shape",
  description:
    "Tap the frets you are holding and find out what chord it is. Works in standard and alternate tunings, names slash chords and inversions, and plays the shape back.",
  alternates: { canonical: "/chord-finder" },
  openGraph: {
    title: "Guitar Chord Finder — Identify a Chord from Its Shape",
    description:
      "Click the frets, get the chord name. Standard and alternate tunings, slash chords, and playback.",
  },
};

export default function ChordFinderPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Reverse Chord Finder - GuitarTunePro",
    url: "https://www.guitartunepro.com/chord-finder",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Identify a guitar chord from the frets you are holding. Supports 13 tunings, slash chords, omitted fifths, and audio playback.",
    featureList: [
      "Interactive 15-fret fretboard",
      "13 tunings including Drop D, DADGAD, and open tunings",
      "Names slash chords and inversions",
      "Recognises shapes with the 5th omitted",
      "Correct enharmonic spelling (C♯ E♯ G♯, not C♯ F G♯)",
      "Strum playback",
      "Shareable link for any shape",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <ToolPageLayout
        title="Reverse Chord Finder"
        description="Hold a shape, tap the same frets here, and see what chord it is. Works in any tuning, and names slash chords and inversions the way a chart would."
        canonicalPath="/chord-finder"
        tool={<ChordFinder />}
        otherTools={otherToolLinks("/chord-finder")}
        faqs={[
          {
            question: "Why does the finder give more than one name for the same shape?",
            answer:
              "Because several chords genuinely share the same notes. A, C, E and G are Am7 if A is the lowest note and C6 if C is — the ear hears the bass note as the root. The finder lists every valid name with the most likely one first, judged by which note is in the bass and how simple the chord is.",
          },
          {
            question: "What does a slash in the name mean, like C/E?",
            answer:
              "The letter after the slash is the lowest note you are playing. C/E is a C major chord with E in the bass rather than C. Musically it is still a C chord — an inversion — but the slash tells another player what to put on the bottom.",
          },
          {
            question: "What does \"5th omitted\" mean?",
            answer:
              "Many four-note chords are played without their 5th because it adds nothing to the chord's character — the 3rd and 7th do all the work. If your shape is one 5th short of a complete 7th, maj7, m7, 6 or add9 chord, the finder still names it, and says so.",
          },
          {
            question: "Why is my chord spelled with E♯ or B♯ instead of F or C?",
            answer:
              "Because that is how the chord is correctly written. C♯ major is C♯–E♯–G♯: every major chord is a root, a third and a fifth, so its notes must sit on three consecutive letter names. F sounds the same as E♯, but calling it F would make the chord C♯–F–G♯, which reads as a completely different structure. The finder spells each note from the chord it belongs to, exactly as our chord library does.",
          },
          {
            question: "Does it work in alternate tunings?",
            answer:
              "Yes. Pick the tuning from the menu — Drop D, DADGAD, open G, open D and the rest — and the fretboard re-labels itself. The same fingers in a different tuning produce a different chord, and the finder works it out from the actual notes, not from a lookup table of standard-tuning shapes.",
          },
          {
            question: "It says \"no standard name\". Is my chord wrong?",
            answer:
              "No. The finder recognises the thirteen chord types a guitarist meets most — major, minor, 7ths, sus, 6ths, add9, dim, aug and power chords. Plenty of useful sounds fall outside those, especially clusters from open tunings. If you want a name, try releasing one string and see what the rest spell.",
          },
        ]}
        relatedArticles={[
          {
            title: "Beginner Guitar Chord Progressions",
            slug: "beginner-guitar-chord-progressions",
            description: "The progressions behind thousands of songs, and why they work.",
          },
          {
            title: "Guitar Fretboard Notes Map",
            slug: "guitar-fretboard-notes-map",
            description: "Learn every note on the neck, with the patterns that make it stick.",
          },
          {
            title: "Alternate Guitar Tunings",
            slug: "alternate-guitar-tunings",
            description: "Drop D to DADGAD — what each tuning gives you and how to get there.",
          },
        ]}
      >
        <h2>How to Use the Chord Finder</h2>
        <ol>
          <li>
            Choose your tuning. Standard is selected by default; the fretboard
            re-labels its open strings for whichever you pick.
          </li>
          <li>
            Tap the fret you are holding on each string. The top row is the
            thin high E string and the bottom row is the thick low E, the same
            way a tab is written. Tap <strong>open</strong> for a string you
            play unfretted.
          </li>
          <li>
            Leave a string alone, or tap its held fret again, to mute it. Muted
            strings show an × on the left.
          </li>
          <li>
            The chord name appears below the neck, with every other valid name
            for the same notes, and a table of exactly which note each string is
            sounding. Press <strong>Strum</strong> to hear it.
          </li>
        </ol>
        <p>
          The link in your address bar updates as you go, so{" "}
          <strong>Share</strong> copies a link that opens straight to the shape
          you built — handy for asking someone what a chord is, or for saving
          one you stumbled on.
        </p>

        <h2>How It Works Out the Name</h2>
        <p>
          Most chord-finder tools on the web work backwards from a list of
          known shapes: if your fingering is in the list, you get a name, and if
          it is not, you get nothing. That fails the moment you play something
          slightly unusual, and it fails completely in alternate tunings.
        </p>
        <p>
          This one works from the notes. It takes the open-string note of each
          string in your chosen tuning, adds the fret you are holding, and gets
          the exact pitch each string is sounding. It then reduces those to
          pitch classes — a C is a C in any octave — and compares that set
          against the formula for every chord type on every root. A major chord
          is a root, a note four semitones up and a note seven semitones up;
          if your notes are exactly that set, starting from any of the twelve
          roots, it is that chord.
        </p>
        <p>
          It is the same check our{" "}
          <Link href="/chords">chord library</Link> runs on every diagram
          before it is published, only in reverse. A shape this page names will
          always be found under that name in the library, and every shape in
          the library will be named correctly here.
        </p>

        <h3>Choosing between valid names</h3>
        <p>
          Sets of notes often have more than one legitimate name, so the finder
          ranks them rather than picking arbitrarily:
        </p>
        <ul>
          <li>
            A complete chord outranks one that is missing its 5th.
          </li>
          <li>
            A chord whose root is the lowest note outranks a slash chord. With
            A in the bass, A–C–E–G is Am7 before it is C6/A.
          </li>
          <li>
            Between chords of equal standing, the simpler one comes first — a
            triad before a seventh, a seventh before an added-note chord.
          </li>
        </ul>
        <p>
          The alternatives are still shown, because sometimes the second name
          is the one that fits the song. If the bass player is holding a C, the
          chord you are playing is C6 no matter which string is lowest under
          your own fingers.
        </p>

        <h3>Spelling</h3>
        <p>
          Note names are spelled from the chord, not from a fixed sharps-only
          table. The third of C♯ major is E♯, not F; the fifth of E♭ minor is
          B♭, not A♯. That is what a chart or a score would say, and it makes
          the interval column in the notes table read correctly — every major
          chord shows root, 3rd and 5th on consecutive letters.
        </p>

        <h2>Common Shapes Worth Trying</h2>
        <p>
          A few fingerings that surprise people, all in standard tuning:
        </p>
        <ul>
          <li>
            <strong>x-0-2-0-1-0</strong> — the open Am7, which is also C6 with
            A in the bass. Two names, one shape.
          </li>
          <li>
            <strong>x-x-0-2-3-2</strong> — D major. Lift the finger on the
            first string and it becomes Dsus2; move it up a fret and it is
            Dsus4. The finder shows each change instantly.
          </li>
          <li>
            <strong>0-2-2-1-0-0</strong> — E major. Now switch the tuning to
            Drop D without moving your fingers, and the low string — now a D,
            the 7th of E — turns the chord into E7/D.
          </li>
          <li>
            <strong>x-3-2-1-1-0</strong> — C augmented, which the finder also
            names E aug and A♭ aug, because an augmented triad divides the
            octave evenly and any of its notes can be the root.
          </li>
        </ul>

        <h2>When You Have a Name and Want the Shape</h2>
        <p>
          This tool goes from fingers to name. For the other direction, every
          chord it can identify has its own page in the{" "}
          <Link href="/chords">chord library</Link> with open and barre
          voicings, audio, the keys it belongs to, and the progressions it
          appears in. The link under each result takes you straight there.
        </p>
        <p>
          And if the chord sounds wrong no matter what the finder says, check
          the tuning first — the{" "}
          <Link href="/">chromatic tuner</Link> takes thirty seconds.
        </p>
      </ToolPageLayout>
    </>
  );
}
