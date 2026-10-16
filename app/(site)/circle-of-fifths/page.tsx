import { Metadata } from "next";
import Link from "next/link";
import ToolPageLayout from "@/components/ToolPageLayout";
import { CircleOfFifths } from "@/components/CircleOfFifths/CircleOfFifths";
import { otherToolLinks } from "@/lib/toolPages";
import { CIRCLE_MAJOR_PCS, diatonicChords, keyName, keySignature } from "@/lib/music/scales";

export const metadata: Metadata = {
  title: "Interactive Circle of Fifths for Guitar",
  description:
    "Click any key on the circle of fifths to see its key signature, scale, relative minor and chords, then hear them. Includes a table of all twelve keys.",
  alternates: { canonical: "/circle-of-fifths" },
  openGraph: {
    title: "Interactive Circle of Fifths",
    description:
      "Every major and minor key with its signature, scale and diatonic chords, plus playback and links to chord diagrams.",
  },
};

export default function CircleOfFifthsPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Interactive Circle of Fifths - GuitarTunePro",
    url: "https://www.guitartunepro.com/circle-of-fifths",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Clickable circle of fifths showing key signatures, scales, relative keys, and diatonic chords for all major and minor keys.",
    featureList: [
      "All 12 major keys and their relative minors",
      "Key signature with the sharps or flats named",
      "Scale notes, correctly spelled",
      "The seven chords of each key with Roman numerals",
      "Hear the I–IV–V–I cadence of any key",
      "Links to chord diagrams and the progression builder",
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <ToolPageLayout
        title="Circle of Fifths"
        description="Every key on one page. Click a key to see its signature, its scale, and the chords that belong to it, then hear them on a guitar tone."
        canonicalPath="/circle-of-fifths"
        tool={<CircleOfFifths />}
        otherTools={otherToolLinks("/circle-of-fifths")}
        faqs={[
          {
            question: "What is the circle of fifths?",
            answer:
              "A diagram of the twelve keys arranged so that each one is a perfect fifth above the one before it, going clockwise: C, G, D, A, and so on. Each step clockwise adds one sharp to the key signature; each step anticlockwise adds one flat. Relative minor keys, which share the same signature, sit on the inner ring.",
          },
          {
            question: "How do I find the chords in a key with the circle?",
            answer:
              "Take the key and its two neighbours on the outer ring: those are the I, IV and V chords, all major. The three minor keys directly inside them are the ii, iii and vi chords. In G, that gives G, C and D on the outside and Am, Em and Bm on the inside, six of the seven chords in the key. The seventh, the diminished chord, is the only one not shown.",
          },
          {
            question: "What is a relative minor?",
            answer:
              "The minor key that uses exactly the same notes as a major key. It starts on the 6th note of the major scale: A minor for C major, E minor for G major. Relative keys share a key signature and all their chords, which is why so many songs move easily between them.",
          },
          {
            question: "Why are F♯ and G♭ in the same spot?",
            answer:
              "They are the same pitch with two names, and the keys meet at the bottom of the circle. F♯ major is written with six sharps and G♭ major with six flats; both are correct and they sound identical. Past that point, the sharp keys would need double sharps, so the circle continues with flat keys instead.",
          },
          {
            question: "Why should a guitarist care about the circle of fifths?",
            answer:
              "Because it tells you which chords go together in any key, which key a song is in from its chords, and what to expect when a song changes key. It also explains everyday guitar patterns: the I–IV–V of blues and rock is three neighbours on the circle, and moving a power chord shape up a string is moving a fourth along it.",
          },
        ]}
        relatedArticles={[
          {
            title: "Beginner Guitar Chord Progressions",
            slug: "beginner-guitar-chord-progressions",
            description: "The progressions you can read straight off the circle.",
          },
          {
            title: "Standard Tuning Explained",
            slug: "standard-tuning-explained",
            description: "Strings tuned in fourths — the circle of fifths, read backwards.",
          },
          {
            title: "Guitar Fretboard Notes Map",
            slug: "guitar-fretboard-notes-map",
            description: "Know where the roots are, and every key on the circle is playable.",
          },
        ]}
      >
        <h2>How to Use the Circle</h2>
        <ol>
          <li>
            Click a key on the <strong>outer ring</strong> for a major key, or the <strong>inner ring</strong> for
            its relative minor. The centre shows how many sharps or flats the key has.
          </li>
          <li>
            The six shaded segments are the major and minor chords that belong to the selected key. The panel
            lists all seven chords with their Roman numerals; click a name to see its diagram.
          </li>
          <li>
            Press <strong>Hear I–IV–V–I</strong> to hear the cadence that defines the key. In minor keys it plays
            i–iv–V–i, with the major V that minor-key songs usually borrow.
          </li>
          <li>
            Use <strong>Build a progression</strong> to loop chords from the key as a backing track, or{" "}
            <strong>See the scale</strong> to view it on the fretboard.
          </li>
        </ol>

        <h2>All Twelve Major Keys</h2>
        <div className="not-prose overflow-x-auto rounded-xl border border-line">
          <table className="w-full text-sm">
            <thead className="bg-surface-sunken/50 text-left text-2xs uppercase tracking-wider text-ink-subtle">
              <tr>
                <th className="px-3 py-2.5 font-semibold">Key</th>
                <th className="px-3 py-2.5 font-semibold">Signature</th>
                <th className="px-3 py-2.5 font-semibold">Relative minor</th>
                <th className="px-3 py-2.5 font-semibold">Chords (I ii iii IV V vi vii°)</th>
              </tr>
            </thead>
            <tbody>
              {CIRCLE_MAJOR_PCS.map((pc) => {
                const sig = keySignature(pc, "major");
                return (
                  <tr key={pc} className="border-t border-line/60">
                    <td className="px-3 py-2 font-semibold text-ink whitespace-nowrap">{keyName(pc, "major")}</td>
                    <td className="px-3 py-2 text-ink-muted whitespace-nowrap">
                      {sig.count === 0 ? "none" : `${sig.count}${sig.type === "sharps" ? "♯" : "♭"} (${sig.notes.join(" ")})`}
                    </td>
                    <td className="px-3 py-2 text-ink-muted whitespace-nowrap">{keyName((pc + 9) % 12, "minor")}</td>
                    <td className="px-3 py-2 text-ink-muted whitespace-nowrap">
                      {diatonicChords(pc, "major").map((c) => c.name).join("  ")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <h2>Why It Is Built From Fifths</h2>
        <p>
          A perfect fifth is seven semitones, the distance from C to G, the two notes of a C power chord. Keep
          stepping up by fifths from C and you visit every one of the twelve notes once before arriving back at
          C: C, G, D, A, E, B, F♯, C♯, and so on. No other interval except the fourth does that, so it gives a
          single loop through every key.
        </p>
        <p>
          It also turns out that each step changes the key by exactly one note. G major is C major with F raised
          to F♯. D major is G major with C raised to C♯. That is why the sharps pile up in the same order every
          time: F♯, C♯, G♯, D♯, A♯, E♯, B♯. Go the other way, down by fifths, and you add flats in the reverse
          order: B♭, E♭, A♭, D♭, G♭, C♭, F♭.
        </p>

        <h2>Neighbours Sound Good Together</h2>
        <p>
          Because neighbouring keys differ by only one note, chords and keys that sit close on the circle sound
          related, and those far apart sound distant. That is the circle&apos;s most practical use:
        </p>
        <ul>
          <li>
            <strong>The three primary chords</strong> of any key, I, IV and V, are the key and its two neighbours.
            This is why blues and rock lean so heavily on them. In E, they are E, A and B. In A, they are A, D and
            E.
          </li>
          <li>
            <strong>Moving anticlockwise</strong> is the strongest resolution in Western harmony. V goes to I, and
            the ii–V–I of jazz is two steps anticlockwise in a row. Long chains of these, such as E7–A7–D7–G7–C, are
            behind countless turnarounds.
          </li>
          <li>
            <strong>Key changes</strong> to a neighbour, such as going up a fifth for a bridge, feel smooth. Jumps
            across the circle feel dramatic, which is exactly why songs use them for a final chorus.
          </li>
        </ul>

        <h2>The Circle on the Guitar Neck</h2>
        <p>
          Guitarists have the circle built into their instrument. Standard tuning is mostly perfect fourths, and
          a fourth up is a fifth down: one step anticlockwise. So the low E, A, D and G strings are four
          consecutive keys on the circle, read backwards. Move a barre chord shape from the 6th string root to the
          5th string at the same fret and you have moved it one step anticlockwise, from the V to the I. In
          practice, the I, IV and V chords of any key always sit within a fret or two of each other across the
          bottom strings.
        </p>
        <p>
          Guitar-friendly keys cluster on the sharp side of the circle, around E, A, D and G, because they suit
          the open strings. Flat keys are common in horn and piano music and usually mean barre chords. A{" "}
          <Link href="/capo-calculator">capo</Link> or the{" "}
          <Link href="/chord-transposer">chord transposer</Link> can move those songs to the sharp side.
        </p>

        <h2>Reading a Song&apos;s Key</h2>
        <p>
          Given a list of chords, look for the three neighbouring segments on the outer ring that cover most of the
          major chords, and check that the minor chords are inside them. A song with G, C, D and Em is in G, or E
          minor if it keeps coming home to Em. That is the method the transposer uses to detect keys, and with a
          little practice you can do it at a glance.
        </p>
      </ToolPageLayout>
    </>
  );
}
