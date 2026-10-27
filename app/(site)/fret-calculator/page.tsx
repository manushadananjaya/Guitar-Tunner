import { Metadata } from "next";
import Link from "next/link";
import ToolPageLayout from "@/components/ToolPageLayout";
import { FretCalculator } from "@/components/FretCalculator/FretCalculator";
import { fretPosition } from "@/lib/fretPositions";
import { otherToolLinks } from "@/lib/toolPages";

export const metadata: Metadata = {
  title: "Fret Calculator — Fret Positions for Any Scale",
  description:
    "Free fret calculator for guitar, bass, ukulele and mandolin builders. Exact fret positions for any scale length, in inches or mm, from the nut and between frets.",
  alternates: { canonical: "/fret-calculator" },
  openGraph: {
    title: "Fret Position Calculator for Luthiers",
    description:
      "Exact equal-tempered fret positions for any scale length and fret count, ready to copy as CSV.",
  },
};

/** Worked example rows for the prose, so the numbers match the tool. */
const EXAMPLE = [1, 5, 7, 12, 24].map((n) => ({ n, inches: fretPosition(25.5, n) }));

export default function FretCalculatorPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Fret Calculator - GuitarTunePro",
    url: "https://www.guitartunepro.com/fret-calculator",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Calculate equal-tempered fret positions for any scale length in inches or millimetres.",
    featureList: [
      "Any scale length, inches or millimetres",
      "12 to 36 frets",
      "Distance from the nut, from the previous fret and to the bridge",
      "Presets for guitar, bass, ukulele and mandolin",
      "Copy the table as CSV",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <ToolPageLayout
        title="Fret Calculator"
        description="Enter a scale length to get the exact position of every fret, measured from the nut. For building, refretting, or checking an instrument."
        canonicalPath="/fret-calculator"
        tool={<FretCalculator />}
        otherTools={otherToolLinks("/fret-calculator")}
        faqs={[
          {
            question: "How are fret positions calculated?",
            answer:
              "Each fret shortens the vibrating string by the same ratio, the twelfth root of two, so each semitone up is the same pitch step. The distance from the nut to fret n is L − L ÷ 2^(n/12), where L is the scale length. Fret 12 lands at exactly half the scale length, an octave above the open string.",
          },
          {
            question: "What is the rule of 18?",
            answer:
              "An old luthier's shortcut: divide the remaining string length by 18 to find the next fret. It is close but slightly short, and the error adds up along the neck, so frets drift flat. The precise constant is about 17.817, which is what this calculator effectively uses — it computes each fret directly from the scale length, so errors never accumulate.",
          },
          {
            question: "How do I measure my scale length?",
            answer:
              "Measure from the front edge of the nut to the centre of the 12th fret wire, then double it. Measuring nut to saddle gives a slightly longer number, because saddles are set back for intonation compensation.",
          },
          {
            question: "Where should the bridge go?",
            answer:
              "At the scale length from the nut, plus compensation: the saddle sits a little further back, more so for thicker strings. On electric guitars with adjustable saddles that is set during intonation. On acoustic guitars a typical starting point is about 2–3 mm extra on the treble side and 4–5 mm on the bass, refined for the strings and action you use.",
          },
          {
            question: "Does this work for multiscale (fanned-fret) necks?",
            answer:
              "Calculate the bass-side scale and the treble-side scale separately, then join the matching frets with a straight line. Choose where along the neck the frets are perpendicular — often around the 7th to 9th fret — and align both tables there.",
          },
        ]}
        relatedArticles={[
          {
            title: "How to Intonate Your Guitar",
            slug: "how-to-intonate-your-guitar",
            description: "Set the compensation after the frets are in.",
          },
          {
            title: "Guitar Fretboard Notes Map",
            slug: "guitar-fretboard-notes-map",
            description: "Every note those frets produce.",
          },
          {
            title: "Best Guitar Strings for Tuning Stability",
            slug: "best-guitar-strings-for-tuning-stability",
            description: "Scale length, gauge and tension together.",
          },
        ]}
      >
        <h2>Why Frets Get Closer Together</h2>
        <p>
          A fret raises a string&apos;s pitch by shortening the part that
          vibrates. To go up a semitone, the vibrating length must shrink by a
          fixed ratio — to about 94.4% of what it was — not by a fixed
          distance. As the remaining string gets shorter, 5.6% of it is a
          smaller distance, so each fret sits closer to the last. By fret 12
          the string is half its open length and an octave higher; the next
          twelve frets then fit into half the space of the first twelve.
        </p>
        <p>On a 25.5&quot; Fender-scale neck:</p>
        <div className="not-prose my-6 overflow-x-auto rounded-xl border border-line bg-surface/40">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line text-left text-2xs uppercase tracking-widest text-ink-subtle">
                <th scope="col" className="px-4 py-2.5 font-bold">Fret</th>
                <th scope="col" className="px-4 py-2.5 font-bold text-right">From nut</th>
                <th scope="col" className="px-4 py-2.5 font-bold text-right">Millimetres</th>
              </tr>
            </thead>
            <tbody>
              {EXAMPLE.map((row) => (
                <tr key={row.n} className="border-b border-line last:border-0">
                  <td className="px-4 py-2.5 text-ink">{row.n}</td>
                  <td className="px-4 py-2.5 text-right font-mono tabular-nums text-ink">
                    {row.inches.toFixed(3)}&quot;
                  </td>
                  <td className="px-4 py-2.5 text-right font-mono tabular-nums text-ink-muted">
                    {(row.inches * 25.4).toFixed(2)} mm
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Using the Numbers on a Build</h2>
        <ol>
          <li>
            <strong>Measure every fret from the nut,</strong> not from the
            previous fret. Measuring fret to fret adds each small error to the
            next; measuring from one fixed point keeps every slot within the
            accuracy of your rule.
          </li>
          <li>
            <strong>Mark the nut edge precisely.</strong> All positions are
            from the face of the nut where the string leaves it. A 0.5&nbsp;mm
            error there moves every fret.
          </li>
          <li>
            <strong>Cut to the centre of the line.</strong> The position is the
            centre of the fret wire&apos;s crown, so the slot is centred on the
            mark.
          </li>
          <li>
            <strong>Check the 12th.</strong> It must be exactly half the scale
            length. If it is not, re-measure before cutting the rest.
          </li>
        </ol>

        <h2>Common Scale Lengths</h2>
        <ul>
          <li>
            <strong>25.5&quot;</strong> — Fender Stratocaster and Telecaster,
            many acoustics and most superstrats. Bright and tight.
          </li>
          <li>
            <strong>24.75&quot;</strong> — Gibson Les Paul, SG and many Gibson
            acoustics. Slightly slinkier for bends, warmer in tone.
          </li>
          <li>
            <strong>25&quot;</strong> — PRS and others, between the two.
          </li>
          <li>
            <strong>650&nbsp;mm</strong> — the classical guitar standard.
          </li>
          <li>
            <strong>34&quot;</strong> — standard bass; 30&quot; for short-scale
            basses.
          </li>
          <li>
            <strong>13&quot;, 15&quot;, 17&quot;</strong> — soprano, concert and
            tenor ukulele.
          </li>
        </ul>
        <p>
          Scale length also sets string tension: a longer scale needs more
          tension to reach the same pitch. The{" "}
          <Link href="/string-tension-calculator">string tension calculator</Link>{" "}
          shows how much for any gauge, and once the instrument is strung, the{" "}
          <Link href="/intonation-checker">intonation checker</Link> tells you
          whether the saddles need to move.
        </p>
      </ToolPageLayout>
    </>
  );
}
