import { Metadata } from "next";
import Link from "next/link";
import ToolPageLayout from "@/components/ToolPageLayout";
import { ProgressionBuilder } from "@/components/ProgressionBuilder/ProgressionBuilder";
import { otherToolLinks } from "@/lib/toolPages";
import { PRESETS, resolveStep } from "@/lib/progressions";

export const metadata: Metadata = {
  title: "Chord Progression Builder and Backing Loop",
  description:
    "Build a chord progression in any key or start from a classic — pop, 12-bar blues, ii–V–I — see every chord shape, and loop it as a backing track.",
  alternates: { canonical: "/chord-progressions" },
  openGraph: {
    title: "Chord Progression Builder and Backing Track",
    description:
      "Pick a key, build or choose a progression, and loop it with strummed or picked guitar at any tempo.",
  },
};

export default function ChordProgressionsPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Chord Progression Builder - GuitarTunePro",
    url: "https://www.guitartunepro.com/chord-progressions",
    applicationCategory: "MusicApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Build chord progressions in any major or minor key, see chord diagrams, and loop them as a strummed or picked guitar backing track.",
    featureList: [
      "Any major or minor key",
      "Ten classic progressions as presets",
      "Build your own from the chords of the key",
      "Roman numeral analysis for every chord",
      "Chord diagrams for every chord",
      "Loop as a backing track: strummed, picked, or one chord per bar",
      "Shareable link for every progression",
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <ToolPageLayout
        title="Chord Progression Builder"
        description="Choose a key and a progression, or build your own from the chords that belong to the key. See every shape, then loop it as a backing track to practise over."
        canonicalPath="/chord-progressions"
        tool={<ProgressionBuilder />}
        otherTools={otherToolLinks("/chord-progressions")}
        faqs={[
          {
            question: "What do the Roman numerals mean?",
            answer:
              "Each numeral is the chord's position in the key: I is built on the first note of the scale, IV on the fourth, and so on. Uppercase means major, lowercase minor, and ° diminished. Numerals let you describe a progression without naming a key, so I–V–vi–IV is the same progression whether it is G–D–Em–C or C–G–Am–F.",
          },
          {
            question: "How do I change the key of a progression?",
            answer:
              "Click a different root note. The numerals stay the same and every chord moves with them, the same thing a capo or transposition does. To move a whole chord sheet, including lyrics, use the chord transposer.",
          },
          {
            question: "Can I use this as a backing track?",
            answer:
              "Yes, that is what the loop is for. Press Loop it, set the tempo and feel, and improvise over it with the scale of the key. The link under the builder opens the matching scale on the fretboard. The loop repeats until you stop it.",
          },
          {
            question: "Why is the V chord major in a minor key?",
            answer:
              "In the natural minor scale, the fifth chord is minor, and it sounds weak when it leads back home. Most minor-key music raises one note to make the V major, which gives a strong pull back to the i. The palette offers both, and the minor presets use the major V where songs usually do.",
          },
          {
            question: "Can I share or save a progression?",
            answer:
              "The address bar updates as you build, so copying the URL saves the key, mode and chords. Open the link later, or send it to someone, and the same progression loads.",
          },
        ]}
        relatedArticles={[
          {
            title: "Beginner Guitar Chord Progressions",
            slug: "beginner-guitar-chord-progressions",
            description: "The progressions in more depth, with fingering tips for each.",
          },
          {
            title: "How to Use a Metronome for Guitar Practice",
            slug: "how-to-use-a-metronome-for-guitar-practice",
            description: "Practising changes in time before you play over the loop.",
          },
          {
            title: "Guitar Fretboard Notes Map",
            slug: "guitar-fretboard-notes-map",
            description: "Know your roots so every progression is playable in every key.",
          },
        ]}
      >
        <h2>How to Use the Builder</h2>
        <ol>
          <li>
            Pick a <strong>key</strong> and <strong>major or minor</strong>. Switching mode loads a starter
            progression for that mode.
          </li>
          <li>
            Choose a <strong>preset</strong>, or press <strong>Clear</strong> and build your own by clicking chords
            in the palette. The palette only offers chords that belong to the key, plus the common 7th-chord and
            major-V variations. Click the × on a chord to remove it.
          </li>
          <li>
            Press <strong>Loop it</strong>. The current chord lights up as it plays. Choose a <strong>feel</strong>:
            one strum per bar for a pad to solo over, quarter notes or the folk strum to play along with, or a
            picked arpeggio for something gentler.
          </li>
          <li>
            Set the <strong>tempo</strong>, and change chords every one or two bars.
          </li>
        </ol>

        <h2>The Presets</h2>
        <p>Here is each preset in a guitar-friendly key, G major or E minor, with what makes it work.</p>
        <div className="not-prose overflow-x-auto rounded-xl border border-line">
          <table className="w-full text-sm">
            <thead className="bg-surface-sunken/50 text-left text-2xs uppercase tracking-wider text-ink-subtle">
              <tr>
                <th className="px-4 py-2.5 font-semibold">Progression</th>
                <th className="px-4 py-2.5 font-semibold">In G / E minor</th>
                <th className="px-4 py-2.5 font-semibold">Character</th>
              </tr>
            </thead>
            <tbody>
              {PRESETS.map((p) => {
                const key = p.mode === "major" ? 7 : 4;
                return (
                  <tr key={p.id} className="border-t border-line/60 align-top">
                    <td className="px-4 py-2 font-semibold text-ink whitespace-nowrap">
                      <Link href={`/chord-progressions?key=${p.mode === "major" ? "g" : "e"}&mode=${p.mode}&p=${p.steps.map((s) => (s.quality ? `${s.degree}.${s.quality}` : s.degree)).join(",")}`} className="hover:text-brass">
                        {p.name}
                      </Link>
                    </td>
                    <td className="px-4 py-2 font-mono text-xs text-ink-muted">
                      {p.steps.map((s) => resolveStep(s, key, p.mode).name).join(" ")}
                    </td>
                    <td className="px-4 py-2 text-ink-muted">{p.description}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <h2>Why Numbers Beat Chord Names</h2>
        <p>
          Musicians describe progressions by number because the numbers are what you actually hear. A I–IV–V
          sounds the same in any key: the same lift to the IV, the same pull from the V back home. Learn a
          progression by its numbers and you know it in all twelve keys at once.
        </p>
        <p>
          On the guitar the numbers also become shapes. With barre chords, the I, IV and V of any key are close
          together. The IV is on the next string at the same fret, the V two frets higher. Learn that box once
          and you can play a blues or a three-chord song anywhere on the neck. The{" "}
          <Link href="/circle-of-fifths">circle of fifths</Link> shows the same relationships as a diagram.
        </p>

        <h2>Writing Your Own</h2>
        <p>
          The diatonic chords, the seven in the palette, are guaranteed to fit together, so any combination will
          sound reasonable. Some combinations sound better because of how they move:
        </p>
        <ul>
          <li><strong>End on V to make the loop pull back</strong> to the top. A progression ending on the I sounds finished; ending on the V makes the repeat feel inevitable.</li>
          <li><strong>Use the vi for colour.</strong> It shares two notes with the I, so it makes the progression darker without leaving the key.</li>
          <li><strong>ii and IV are interchangeable</strong> before a V. They share two notes, and ii–V is a little smoother and jazzier.</li>
          <li><strong>Avoid vii° on its own.</strong> It is unstable and wants to go to I. Use it as a passing chord, or use the V7, which contains it.</li>
          <li><strong>Try 7th chords.</strong> Swap the V for a V7 and the pull home gets stronger. Swap the I for an Imaj7 and it softens.</li>
        </ul>

        <h2>Practising Over the Loop</h2>
        <p>
          The loop is a backing track you can play with at any tempo, which is the missing piece in most solo
          practice. Some ways to use it:
        </p>
        <ul>
          <li>
            <strong>Comping.</strong> Play the chords yourself along with the loop, using a pattern from the{" "}
            <Link href="/strumming-patterns">strumming trainer</Link>. Turn the loop down to one strum a bar so it
            is just a guide.
          </li>
          <li>
            <strong>Soloing.</strong> Use the link under the builder to open the key&apos;s scale on the{" "}
            <Link href="/scales">scale explorer</Link>. Start with the pentatonic, then aim for the chord tones:
            land on a G note when the G chord plays, a C when the C plays.
          </li>
          <li>
            <strong>Ear training.</strong> Loop a progression without looking at the names and try to call out the
            numerals. Then check. This is the musical version of the{" "}
            <Link href="/ear-training">ear trainer&apos;s</Link> chord rounds.
          </li>
        </ul>
        <p>
          Every chord in the builder links to its shapes in the <Link href="/chords">chord library</Link>. If a
          shape is hard in one key, try the progression in another. With the numbers fixed, nothing else about it
          changes.
        </p>
      </ToolPageLayout>
    </>
  );
}
