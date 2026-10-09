import { Metadata } from "next";
import Link from "next/link";
import ToolPageLayout from "@/components/ToolPageLayout";
import { CapoCalculator } from "@/components/CapoCalculator/CapoCalculator";
import { otherToolLinks } from "@/lib/toolPages";
import { SHAPE_KEYS, pitchName } from "@/lib/music/transpose";

export const metadata: Metadata = {
  title: "Capo Calculator and Capo Chart for Guitar",
  description:
    "Type a song's chords to find the capo fret that makes them easy open shapes, see what key you're really in with a capo, and use the free capo chart.",
  alternates: { canonical: "/capo-calculator" },
  openGraph: {
    title: "Guitar Capo Calculator and Chart",
    description:
      "Rank every capo position for a song by how easy the chords get, and convert between shapes, capo fret, and sounding key.",
  },
};

const FRETS = Array.from({ length: 10 }, (_, i) => i);

export default function CapoCalculatorPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Capo Calculator - GuitarTunePro",
    url: "https://www.guitartunepro.com/capo-calculator",
    applicationCategory: "MusicApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Finds the capo position that turns a song's chords into the easiest shapes, and converts between capo fret, chord shapes, and sounding key.",
    featureList: [
      "Ranks capo frets 0 to 9 for any list of chords",
      "Marks each shape as open, common barre, or harder",
      "Detects the song's key",
      "Sounding key from shapes plus capo fret",
      "Capo fret needed to play in a given key",
      "Printable capo chart",
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <ToolPageLayout
        title="Capo Calculator"
        description="Type the chords of a song and find the capo position that makes them easiest. Or convert between the shapes you play, the capo fret, and the key you actually sound in."
        canonicalPath="/capo-calculator"
        tool={<CapoCalculator />}
        otherTools={otherToolLinks("/capo-calculator")}
        afterTool={
          <section className="mt-12" aria-labelledby="capo-chart-heading">
            <h2 id="capo-chart-heading" className="text-2xl font-bold text-ink mb-2">
              Capo Chart
            </h2>
            <p className="text-sm text-ink-muted mb-4">
              Find the shapes you are playing in the left column; read across to the capo fret to see the key
              you are really in.
            </p>
            <div className="overflow-x-auto rounded-xl border border-line">
              <table className="w-full text-sm">
                <thead className="bg-surface-sunken/50 text-left text-2xs uppercase tracking-wider text-ink-subtle">
                  <tr>
                    <th className="px-3 py-2.5 font-semibold">Shapes</th>
                    {FRETS.map((f) => (
                      <th key={f} className="px-3 py-2.5 font-semibold tabular-nums whitespace-nowrap">
                        {f === 0 ? "No capo" : `Fret ${f}`}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {SHAPE_KEYS.map((shape) => (
                    <tr key={shape.label} className="border-t border-line/60">
                      <td className="px-3 py-2 font-semibold text-ink">{shape.label}</td>
                      {FRETS.map((f) => (
                        <td key={f} className="px-3 py-2 text-ink-muted whitespace-nowrap">
                          {pitchName(shape.pitch + f, shape.mode)}
                          {shape.mode === "minor" ? "m" : ""}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        }
        faqs={[
          {
            question: "How does the calculator pick the best capo position?",
            answer:
              "For each capo fret from 0 to 9, it works out the shape you would play for every chord in the song, then scores those shapes: full marks for open chords like G, C, D, Em and Am, half for common barre chords like F and Bm, nothing for anything harder. The highest score wins, and ties go to the lower fret.",
          },
          {
            question: "Does a capo change the key of a song?",
            answer:
              "It changes the key you sound in, not the shapes you play. Each fret raises the pitch by one semitone, so G shapes with a capo on fret 2 sound in A. That is why chord sheets write 'Capo 2' above chords that look like they are in G.",
          },
          {
            question: "How high can I put a capo?",
            answer:
              "Physically, as high as the neck allows. Musically, above about the 7th fret the guitar starts to sound thin and the frets get cramped, which is why the calculator stops at 9. If a song needs a capo that high, try a different set of shapes: A shapes at fret 7 and D shapes at fret 2 both sound in E, and the second is much more comfortable.",
          },
          {
            question: "What do the colours mean?",
            answer:
              "Green shapes are open chords a beginner can play. Amber ones are the barre chords most players learn early, such as F, Bm, and F♯m. Red ones are harder: less common barre chords and extended shapes. Hover over a shape to see the chord it actually sounds as.",
          },
          {
            question: "Why does my guitar sound out of tune with a capo on?",
            answer:
              "A capo pulls the strings slightly sharp as it presses them down, especially if it is clamped too tightly or placed in the middle of the fret. Put it just behind the fret wire with the least pressure that stops buzzing, then check your tuning with the capo on.",
          },
        ]}
        relatedArticles={[
          {
            title: "Does a Capo Affect Guitar Tuning?",
            slug: "does-a-capo-affect-guitar-tuning",
            description: "Why capos pull strings sharp and how to place one properly.",
          },
          {
            title: "Beginner Guitar Chord Progressions",
            slug: "beginner-guitar-chord-progressions",
            description: "The open-shape progressions a capo lets you take into any key.",
          },
          {
            title: "How to Tune a Guitar for Beginners",
            slug: "how-to-tune-a-guitar-for-beginners",
            description: "Tune before you clamp the capo on — and check again after.",
          },
        ]}
      >
        <h2>How to Use the Capo Calculator</h2>
        <p>The tool does three related jobs.</p>
        <ul>
          <li>
            <strong>Find the easiest capo position.</strong> Type the song&apos;s chords exactly as the sheet writes
            them, in any order. Every capo fret from none to 9 is ranked by how many chords become open shapes. The
            best is at the top. Expand the list to compare the rest.
          </li>
          <li>
            <strong>What key am I really in?</strong> Choose the shapes you are playing and the fret your capo is on,
            and read off the key the band hears.
          </li>
          <li>
            <strong>Where do I put the capo?</strong> Choose the key you need to sound in and the shapes you want to
            play, and the calculator gives you the fret.
          </li>
        </ul>

        <h2>Why Guitarists Use a Capo</h2>
        <p>
          Open chords are the easiest and best-sounding chords on the guitar, but they only exist in a few keys.
          G, C, D, A, E, Am, Em and Dm are all within reach of a beginner. A song in B♭, E♭ or A♭ is a different
          story: written out, it is mostly barre chords.
        </p>
        <p>
          A capo solves that. Clamped across the neck, it becomes a movable nut, and every shape you play sounds
          that many semitones higher. A song in B♭ with chords B♭, F, Gm and E♭ becomes G, D, Em and C, the first
          four open chords most people learn, with the capo on the 3rd fret. Same pitches, same song, far easier
          to play.
        </p>
        <p>
          Players who can handle barre chords use a capo for the sound too. Open strings ring in a way fretted
          notes do not, and a capo lets you keep that ringing quality in any key. Two guitarists often use it to
          share a song: one plays open shapes with no capo, the other plays different shapes higher up the neck,
          and the combination sounds fuller than two people playing the same chords.
        </p>

        <h2>The Arithmetic Behind It</h2>
        <p>
          Every fret is one semitone. To find what you are really playing, count up from the shape by the capo
          fret: C shapes with a capo on fret 3 are C, C♯, D, E♭, so you are in E♭. To find the shapes you need,
          count down from the song&apos;s key: a song in E♭ with the capo on 3 means counting down E♭, D, C♯, C,
          so you play C shapes.
        </p>
        <p>
          The chart above does that counting for the eight most useful shape keys. The left column is what your
          hands do, and the rest of the row is what the audience hears. If you want to move a whole chord sheet
          rather than look up one key, the <Link href="/chord-transposer">chord transposer</Link> will rewrite
          the sheet for you and suggest a capo position too.
        </p>

        <h2>Choosing Between Several Good Options</h2>
        <p>
          Many songs have two or three capo positions that score well. The calculator breaks ties in favour of the
          lower fret, but there are reasons to choose another:
        </p>
        <ul>
          <li>
            <strong>Sound.</strong> G shapes and C shapes have different characters even in the same key. G shapes
            have the low open E and A strings for a bigger sound; C shapes are brighter and lighter.
          </li>
          <li>
            <strong>The melody or riff.</strong> If the song has a signature riff, pick the position where it falls
            under your fingers naturally.
          </li>
          <li>
            <strong>Tuning stability.</strong> The higher the capo, the more it can pull the strings sharp. Lower
            positions stay in tune better. Retune with the capo on, using the <Link href="/">tuner</Link>.
          </li>
        </ul>

        <h2>Minor Keys and Tricky Chords</h2>
        <p>
          The calculator treats minor-key songs the same way, and Am, Em and Dm shapes are just as useful as their
          major counterparts. Chords it does not recognise as easy, such as a B♭maj7 or an F♯m7♭5, count against a
          position. Sometimes the best answer still leaves you one barre chord. That is normal, and often that chord
          has an easier voicing in the <Link href="/chords">chord library</Link>.
        </p>
      </ToolPageLayout>
    </>
  );
}
