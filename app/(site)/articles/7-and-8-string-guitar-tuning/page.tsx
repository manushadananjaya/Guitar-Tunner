import { Metadata } from "next";
import Link from "next/link";
import ArticleLayout from "@/components/ArticleLayout";

export const metadata: Metadata = {
  title: "7 and 8-String Guitar Tuning",
  description:
    "Standard tunings for 7 and 8-string guitars, the string gauges that make a low B or F# playable, common drop and extended tunings, and how to tune one accurately.",
  alternates: { canonical: "/articles/7-and-8-string-guitar-tuning" },
  openGraph: {
    title: "7 and 8-String Guitar Tuning",
    description:
      "Standard and drop tunings for extended-range guitars, plus the gauges and setup that make them work.",
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
        slug="7-and-8-string-guitar-tuning"
        title="7 and 8-String Guitar Tuning"
        description="Extended-range guitars add low strings below the standard six. The tuning logic is simple, but the string gauges and setup need thought. Here is the full picture."
        datePublished="2026-09-02"
        dateModified="2026-09-02"
        readingTimeMinutes={9}
        faqs={[
          {
            question: "What is standard 7-string guitar tuning?",
            answer:
              "B-E-A-D-G-B-E, low to high. It is standard six-string tuning with a low B string added below the low E. Every chord shape and scale you know still works; you just have an extra fifth of range at the bottom.",
          },
          {
            question: "What is standard 8-string guitar tuning?",
            answer:
              "F♯-B-E-A-D-G-B-E, low to high. It adds a low F♯ below the 7-string's low B. Some players tune the 8th string to E instead (a full octave below the 6th string) for a more consonant low end, especially in drop tunings.",
          },
          {
            question: "What string gauge do I need for a low B or F#?",
            answer:
              "For a low B on a 25.5-inch scale, .059 to .064 is typical. For a low F♯, you generally want a longer scale (26.5 to 28 inches or a multiscale) and a gauge of .070 or heavier. Too light a string at that pitch is floppy, buzzes, and will not intonate.",
          },
          {
            question: "Why do extended-range guitars have longer scale lengths?",
            answer:
              "A longer scale means more tension at the same pitch and gauge, which keeps the low strings tight and clear instead of loose and muddy. Many 7-strings use 25.5 or 26.5 inches; 8-strings often use 27 to 28 inches or a fanned-fret design that lengthens only the low strings.",
          },
          {
            question: "Can I tune a 7-string to drop A?",
            answer:
              "Yes. Drop A on a 7-string is A-E-A-D-G-B-E — you drop the low B down to A, exactly like drop D on a six-string. It gives one-finger power chords on the bottom three strings and is very common in modern metal.",
          },
        ]}
        relatedArticles={[
          {
            title: "Drop D Tuning Guide for Rock and Metal",
            slug: "drop-d-tuning-guide",
            description:
              "The drop-tuning logic that extended-range players apply to the low string.",
          },
          {
            title: "Best Guitar Strings for Tuning Stability",
            slug: "best-guitar-strings-for-tuning-stability",
            description:
              "Gauge and construction matter even more once you are dealing with very low strings.",
          },
          {
            title: "Alternate Guitar Tunings You Should Try",
            slug: "alternate-guitar-tunings",
            description: "The six-string tunings the extended-range ones extend.",
          },
        ]}
      >
        <p>
          A 7 or 8-string guitar is not a different instrument. It is a normal
          guitar with one or two extra strings added below the low E, tuned to
          continue the same pattern of fourths. Everything you already know
          about chords, scales, and{" "}
          <Link href="/articles/standard-tuning-explained">
            standard tuning
          </Link>{" "}
          still applies — you just have more room at the bottom.
        </p>
        <p>
          Where it gets interesting is the physics. Notes that low need the
          right string, the right scale length, and a setup that accounts for
          them. Get any of those wrong and the low string sounds like a rubber
          band.
        </p>

        <h2>Standard Tunings</h2>
        <div className="my-6 overflow-x-auto rounded-xl border border-line">
          <table className="w-full text-sm">
            <thead className="bg-surface/60 text-ink-muted">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Guitar</th>
                <th className="px-4 py-3 text-left font-semibold">
                  Tuning (low → high)
                </th>
                <th className="px-4 py-3 text-left font-semibold">Added note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              <tr className="bg-surface/20">
                <td className="px-4 py-3 font-semibold text-ink">6-string</td>
                <td className="px-4 py-3 font-mono">E A D G B E</td>
                <td className="px-4 py-3 text-ink-muted">—</td>
              </tr>
              <tr className="bg-surface/20">
                <td className="px-4 py-3 font-semibold text-ink">7-string</td>
                <td className="px-4 py-3 font-mono">B E A D G B E</td>
                <td className="px-4 py-3 text-ink-muted">low B (B1, ~61.7 Hz)</td>
              </tr>
              <tr className="bg-surface/20">
                <td className="px-4 py-3 font-semibold text-ink">8-string</td>
                <td className="px-4 py-3 font-mono">F♯ B E A D G B E</td>
                <td className="px-4 py-3 text-ink-muted">
                  low F♯ (F♯1, ~46.2 Hz)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          The low B on a 7-string is the same pitch as the lowest string on a
          5-string bass. The low F♯ on an 8-string is lower than a 4-string
          bass's open E. These are genuinely low notes, which is why gauge and
          scale length stop being optional.
        </p>

        <h2>Common Alternate and Drop Tunings</h2>
        <ul>
          <li>
            <strong>Drop A (7-string):</strong> A E A D G B E. The low B drops to
            A for one-finger power chords, the extended-range equivalent of drop
            D.
          </li>
          <li>
            <strong>Drop E (8-string):</strong> E B E A D G B E. The low F♯ drops
            to E, one octave below the 6th string. Very common because it makes
            the lowest string consonant with the rest.
          </li>
          <li>
            <strong>Whole-step down (7-string):</strong> A D G C F A D. The
            entire guitar down a tone for a darker, heavier standard.
          </li>
          <li>
            <strong>All-fourths (7-string):</strong> B E A D G C F. Replaces the
            major third between the top two strings with another fourth, which
            makes scale and arpeggio shapes fully symmetrical at the cost of
            familiar chord grips.
          </li>
        </ul>

        <h2>String Gauges That Actually Work</h2>
        <p>
          The number one mistake with extended-range guitars is a low string
          that is too light. It will feel floppy, buzz against the frets, sound
          muddy, and refuse to{" "}
          <Link href="/articles/how-to-intonate-your-guitar">intonate</Link>. As
          a starting point:
        </p>
        <ul>
          <li>
            <strong>Low B, 25.5" scale:</strong> .059–.064
          </li>
          <li>
            <strong>Low B, 26.5–27" scale:</strong> .056–.060
          </li>
          <li>
            <strong>Low F♯, 27–28" scale or multiscale:</strong> .070–.080
          </li>
        </ul>
        <p>
          Longer scale lengths let you use a slightly lighter gauge at the same
          pitch because the extra length adds tension. If you are tuning even
          lower than standard, go heavier again, or move to a baritone or
          multiscale instrument built for it.
        </p>

        <h2>Tuning One Accurately</h2>
        <p>
          Very low strings are the hardest thing for any tuner to read,
          including this one. The fundamental frequency is weak, the harmonics
          are strong, and cheap tuners often lock onto an overtone and show you
          a note an octave too high.
        </p>
        <ol>
          <li>
            Use the{" "}
            <Link href="/7-string-guitar-tuner">7-string tuner</Link> or{" "}
            <Link href="/">chromatic tuner</Link>, which are set up to track the
            low range.
          </li>
          <li>
            Pluck the low string softly, closer to the neck than the bridge, and
            let it ring for a full second before reading. A hard pick attack
            near the bridge feeds the tuner harmonics.
          </li>
          <li>
            Mute the other strings with your palm so nothing sympathetic
            confuses the reading.
          </li>
          <li>
            Check the octave number if your tuner shows one. The low B on a
            7-string should read B1, not B2.
          </li>
          <li>
            Tune up to the note, not down to it, so the string settles under
            tension.
          </li>
        </ol>
        <p>
          Once the low string is stable, tune the remaining six exactly as you
          would a standard guitar — they have not changed. The whole appeal of
          extended range is that everything above the new string stays
          completely familiar.
        </p>
      </ArticleLayout>
    </>
  );
}
