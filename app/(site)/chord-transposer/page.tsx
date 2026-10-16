import { Metadata } from "next";
import Link from "next/link";
import ToolPageLayout from "@/components/ToolPageLayout";
import { ChordTransposer } from "@/components/ChordTransposer/ChordTransposer";
import { otherToolLinks } from "@/lib/toolPages";

export const metadata: Metadata = {
  title: "Chord Transposer — Change a Song's Key",
  description:
    "Paste chords and lyrics, pick a new key, and get the sheet back with chords still lined up over the words. Correct sharps and flats, diagrams, capo tips.",
  alternates: { canonical: "/chord-transposer" },
  openGraph: {
    title: "Guitar Chord Transposer",
    description:
      "Transpose a whole chord sheet to any key, keep the alignment, and see if a capo makes it easier.",
  },
};

const STEPS = [
  { from: "C", to: ["C♯/D♭", "D", "E♭", "E", "F", "F♯/G♭", "G", "A♭", "A", "B♭", "B"] },
];

export default function ChordTransposerPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Chord Transposer - GuitarTunePro",
    url: "https://www.guitartunepro.com/chord-transposer",
    applicationCategory: "MusicApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Transposes chord sheets to any key, keeping chords aligned over lyrics, with key detection, correct accidentals, chord diagrams, and capo suggestions.",
    featureList: [
      "Paste a full chord sheet, chords over lyrics or [inline] chords",
      "Keeps chord alignment over the words",
      "Detects the original key",
      "Spells sharps and flats to suit the new key",
      "Slash chords, sevenths, sus and add chords",
      "Chord diagrams for the new chords, tap to hear",
      "Suggests a capo position when one makes it easier",
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <ToolPageLayout
        title="Chord Transposer"
        description="Paste a chord sheet, choose a new key, and copy the result. Chords stay lined up over the lyrics, and the new chords come with diagrams."
        canonicalPath="/chord-transposer"
        tool={<ChordTransposer />}
        otherTools={otherToolLinks("/chord-transposer")}
        faqs={[
          {
            question: "What formats does the transposer understand?",
            answer:
              "Two common ones. Chords on their own line above the lyrics, where the column position matters, and chords inline in square brackets like [G], as used by ChordPro files. Lines that mix chords with ordinary words are left alone, so a lyric that starts with 'A' is not mistaken for an A chord.",
          },
          {
            question: "How does it decide between sharps and flats?",
            answer:
              "On Auto, it works out the key the song is moving to and spells chords the way that key is written. Moving to F gives B♭, not A♯; moving to E gives G♯m, not A♭m. Notes outside the key follow the same sharp or flat direction. You can force all sharps or all flats with the buttons.",
          },
          {
            question: "How does it know the original key?",
            answer:
              "It tries all 24 major and minor keys and picks the one most of the song's chords belong to, with extra weight on the first and last chord, which are usually the home chord. It is a good guess for most pop, rock, and folk songs. If a song borrows lots of chords from outside its key, it will say the guess is rough.",
          },
          {
            question: "Should I transpose or use a capo?",
            answer:
              "Use a capo to make a song higher while keeping the same easy shapes. Transpose when you need it lower, when the capo would go above the 7th fret, or when you are reading the chords off a sheet for another instrument. The transposer suggests a capo position whenever one would turn the new chords into open shapes.",
          },
          {
            question: "Is my chord sheet uploaded anywhere?",
            answer:
              "No. Transposing happens in your browser, and the sheet is only saved in your browser's local storage so a refresh does not lose it.",
          },
        ]}
        relatedArticles={[
          {
            title: "Does a Capo Affect Guitar Tuning?",
            slug: "does-a-capo-affect-guitar-tuning",
            description: "Why a capo can pull strings sharp, and how to stop it.",
          },
          {
            title: "Beginner Guitar Chord Progressions",
            slug: "beginner-guitar-chord-progressions",
            description: "Progressions that transpose cleanly, and the numbers behind them.",
          },
          {
            title: "How to Find Your Vocal Range",
            slug: "how-to-find-your-vocal-range",
            description: "Know your range before choosing a key to sing in.",
          },
        ]}
      >
        <h2>How to Transpose a Song</h2>
        <ol>
          <li>
            Paste your chord sheet into the left box, replacing the sample. Chords-over-lyrics and{" "}
            <code>[bracketed]</code> chords both work, and so do slash chords like <code>D/F#</code>.
          </li>
          <li>
            Check the detected key under the controls. Then either press <strong>+</strong> and <strong>−</strong>{" "}
            to move a semitone at a time, or pick the new key directly from <strong>To key</strong>.
          </li>
          <li>
            Leave the spelling on <strong>Auto</strong> unless you have a reason not to. Press{" "}
            <strong>Copy</strong> to take the transposed sheet with you.
          </li>
          <li>
            Scroll down for diagrams of every chord in the new version. Tap one to hear it, or follow its name to
            the full page in the <Link href="/chords">chord library</Link>.
          </li>
        </ol>

        <h2>Why Transpose at All?</h2>
        <p>
          The most common reason is singing. A song in its original key may sit perfectly for the person who
          recorded it and be two or three semitones too high or low for you. Moving the whole song keeps the
          melody and the harmony the same and puts them where your voice works. If you do not know where your
          voice is comfortable, the <Link href="/vocal-pitch-detector">vocal range finder</Link> will tell you
          in a minute.
        </p>
        <p>
          Other reasons are practical. A song written in E♭ is full of barre chords on guitar; moved to E or D,
          it is open shapes. A band with a horn player may want B♭ instead of A. And transposing a song you know
          into an unfamiliar key is a good exercise: it makes you think in chord functions, not finger shapes.
        </p>

        <h2>How Transposition Works</h2>
        <p>
          Transposing moves every chord by the same number of semitones. A song in G moved up two semitones is
          in A, and every chord follows: G becomes A, C becomes D, D becomes E, Em becomes F♯m. The chord types
          do not change. A minor chord stays minor, a 7th stays a 7th, and the bass note of a slash chord moves
          with everything else.
        </p>
        <p>
          On a guitar fretboard, one semitone is one fret. That is why a capo works: a capo on fret 2 moves
          everything up two semitones while your hands play the same shapes.
        </p>
        <div className="not-prose overflow-x-auto rounded-xl border border-line">
          <table className="w-full text-sm">
            <thead className="bg-surface-sunken/50 text-left text-2xs uppercase tracking-wider text-ink-subtle">
              <tr>
                <th className="px-3 py-2.5 font-semibold">Semitones up</th>
                {Array.from({ length: 11 }, (_, i) => (
                  <th key={i} className="px-3 py-2.5 font-semibold tabular-nums">+{i + 1}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {STEPS.map((row) => (
                <tr key={row.from} className="border-t border-line/60">
                  <td className="px-3 py-2 font-semibold text-ink">From {row.from}</td>
                  {row.to.map((note) => (
                    <td key={note} className="px-3 py-2 text-ink-muted whitespace-nowrap">{note}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Going down is the same count in the other direction: down three semitones from C is A. Twelve
          semitones brings you back to the same key an octave away, which is why the transposer stops at ±11.
        </p>

        <h2>Sharps, Flats, and Why the Spelling Matters</h2>
        <p>
          Every black-key note has two names. C♯ and D♭ are the same pitch. Which name a chord gets depends
          on the key. In the key of A, the third chord is C♯m. In the key of A♭, the fourth chord is D♭. A sheet
          that writes D♭m in the key of A is not wrong in sound, but it is harder to read, and it hides the
          relationships between chords. Reading a song in A, you expect to see C♯m and F♯m.
        </p>
        <p>
          That is why the transposer works out the new key and spells chords to suit it, rather than defaulting
          to sharps. If you are reading along with a pianist&apos;s chart that uses flats, or want plain sharps
          for a capo chart, switch to <strong>♯ Sharps</strong> or <strong>♭ Flats</strong>.
        </p>

        <h2>Choosing a Better Key for Your Voice</h2>
        <p>
          The quickest method: play the song&apos;s first line and its highest line, and sing along. If the high
          line strains, go down a semitone or two and try again. If the low parts disappear, go up. Most
          people settle within three semitones of the original. Moving five or six can change a song&apos;s
          character, since a bright, open-string strum in G turns murky in D♭, so consider a capo plus
          different shapes instead.
        </p>
        <p>
          When the new key is awkward on guitar, look at the capo suggestion under the result, or open the{" "}
          <Link href="/capo-calculator">capo calculator</Link> to compare every position side by side. For
          the theory behind why some keys use so many sharps, the{" "}
          <Link href="/circle-of-fifths">circle of fifths</Link> lays every key out on one page.
        </p>
      </ToolPageLayout>
    </>
  );
}
