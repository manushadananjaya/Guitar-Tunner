import { Metadata } from "next";
import Link from "next/link";
import ToolPageLayout from "@/components/ToolPageLayout";
import { NoteFrequencyChart } from "@/components/NoteFrequencyChart/NoteFrequencyChart";
import { otherToolLinks } from "@/lib/toolPages";

export const metadata: Metadata = {
  title: "Note Frequency Chart — Every Note in Hz",
  description:
    "Frequency of every musical note from C0 to B8 in hertz, at A4 = 440 Hz or any concert pitch. Tap a note to hear it, or type a frequency to find the note.",
  alternates: { canonical: "/note-frequency-chart" },
  openGraph: {
    title: "Musical Note Frequency Chart (Hz)",
    description:
      "Every note from C0 to B8 in hertz at 440, 432 or any concert pitch — playable, with a frequency-to-note converter.",
  },
};

const hz = (midi: number) => 440 * Math.pow(2, (midi - 69) / 12);

const GUITAR_ROWS = [
  { string: "6 (low E)", note: "E2", midi: 40 },
  { string: "5 (A)", note: "A2", midi: 45 },
  { string: "4 (D)", note: "D3", midi: 50 },
  { string: "3 (G)", note: "G3", midi: 55 },
  { string: "2 (B)", note: "B3", midi: 59 },
  { string: "1 (high E)", note: "E4", midi: 64 },
];

export default function NoteFrequencyChartPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Note Frequency Chart - GuitarTunePro",
    url: "https://www.guitartunepro.com/note-frequency-chart",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Interactive chart of musical note frequencies from C0 to B8 at any concert pitch, with playback and a frequency-to-note converter.",
    featureList: [
      "All 108 notes from C0 to B8",
      "A4 = 440, 432, 442, 443 Hz or any value from 415 to 466",
      "Tap any note to hear it",
      "Frequency to note and cents converter",
      "Sound wavelength for any frequency",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <ToolPageLayout
        title="Note Frequency Chart"
        description="The frequency of every note in hertz, from C0 to B8. Change the concert pitch and every value updates; tap a note to hear it."
        canonicalPath="/note-frequency-chart"
        tool={<NoteFrequencyChart />}
        otherTools={otherToolLinks("/note-frequency-chart")}
        faqs={[
          {
            question: "What is the frequency of middle C?",
            answer:
              "261.63 Hz at standard concert pitch (A4 = 440 Hz). Middle C is C4 in scientific pitch notation. At A4 = 432 Hz it drops to about 256.87 Hz.",
          },
          {
            question: "How do I calculate the frequency of a note?",
            answer:
              "Count the semitones n from A4 (negative below it, positive above) and use f = 440 × 2^(n/12). Each semitone multiplies the frequency by the twelfth root of two, about 1.0595, so twelve semitones exactly double it. C4 is 9 semitones below A4: 440 × 2^(−9/12) = 261.63 Hz.",
          },
          {
            question: "Why is A4 the reference note?",
            answer:
              "It is the note orchestras tune to and the one tuning forks are made for. The value 440 Hz was standardised internationally in the 20th century; before that, A ranged from roughly 415 to over 450 Hz depending on the time and place. Everything in the chart is calculated from whichever A4 you choose.",
          },
          {
            question: "What do the octave numbers mean?",
            answer:
              "Scientific pitch notation numbers each octave from C. C4 is middle C; the B just below it is B3, and the C above B4 is C5. A piano runs from A0 to C8, and a guitar in standard tuning from E2 to about E6 at the top of a 24-fret neck.",
          },
          {
            question: "Are these frequencies exact?",
            answer:
              "They are exact for twelve-tone equal temperament, the tuning used by guitars, pianos and almost all modern instruments, rounded to two decimal places. Other temperaments, such as just intonation, shift some notes by a few cents; real instruments also add overtones above the fundamental listed here.",
          },
          {
            question: "What does the wavelength mean?",
            answer:
              "It is how far one cycle of the sound wave travels in air at 20 °C, where sound moves at 343 metres per second. A low E string's wave is about 4.2 metres long; the A above middle C is about 78 cm. It matters for room acoustics and speaker design more than for playing.",
          },
        ]}
        relatedArticles={[
          {
            title: "Standard Tuning Explained",
            slug: "standard-tuning-explained",
            description: "Where each string's frequency comes from.",
          },
          {
            title: "432 Hz vs 440 Hz Tuning",
            slug: "432-hz-vs-440-hz-tuning",
            description: "What changing concert pitch really does.",
          },
          {
            title: "Guitar Fretboard Notes Map",
            slug: "guitar-fretboard-notes-map",
            description: "Where every note on the chart sits on the neck.",
          },
        ]}
      >
        <h2>How Note Frequencies Work</h2>
        <p>
          A note&apos;s frequency is how many times per second the sound wave
          repeats, measured in hertz (Hz). Modern Western music fixes one
          reference — A4, the A above middle C, at 440&nbsp;Hz — and divides
          every octave into twelve equal semitones. Moving up a semitone
          multiplies the frequency by 2<sup>1/12</sup>, about 1.0595. Twelve
          of those steps exactly double it, which is why A5 is 880&nbsp;Hz, A3
          is 220&nbsp;Hz and A2 is 110&nbsp;Hz.
        </p>
        <p>
          The formula for any note is <strong>f = 440 × 2<sup>n/12</sup></strong>,
          where <em>n</em> is the number of semitones from A4. The chart above
          is generated from exactly that formula, so changing the concert pitch
          moves every value by the same ratio.
        </p>

        <h2>Guitar String Frequencies</h2>
        <p>
          The six open strings of a guitar in standard tuning are underlined in
          the chart. Here they are on their own, at A4 = 440&nbsp;Hz:
        </p>
        <div className="not-prose my-6 overflow-x-auto rounded-xl border border-line bg-surface/40">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line text-left text-2xs uppercase tracking-widest text-ink-subtle">
                <th scope="col" className="px-4 py-2.5 font-bold">String</th>
                <th scope="col" className="px-4 py-2.5 font-bold">Note</th>
                <th scope="col" className="px-4 py-2.5 font-bold text-right">Frequency</th>
              </tr>
            </thead>
            <tbody>
              {GUITAR_ROWS.map((row) => (
                <tr key={row.note} className="border-b border-line last:border-0">
                  <td className="px-4 py-2.5 text-ink">{row.string}</td>
                  <td className="px-4 py-2.5 font-mono text-ink">{row.note}</td>
                  <td className="px-4 py-2.5 text-right font-mono tabular-nums text-ink-muted">
                    {hz(row.midi).toFixed(2)} Hz
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          The high E string is exactly two octaves above the low E — four times
          its frequency. The{" "}
          <Link href="/tunings">guitar tunings chart</Link> lists every string
          in every alternate tuning, and each tuner on this site listens for
          these exact numbers.
        </p>

        <h2>Using the Chart</h2>
        <ul>
          <li>
            <strong>Tuning and reference.</strong> Tap a note to hear it as a
            plucked tone, or open the{" "}
            <Link href="/tone-generator">tone generator</Link> for a steady
            sine wave at any frequency.
          </li>
          <li>
            <strong>Mixing and EQ.</strong> Knowing that a bass guitar&apos;s low
            E is 41&nbsp;Hz and a kick drum&apos;s thump sits nearby tells you
            where the two will fight, and where to cut.
          </li>
          <li>
            <strong>Identifying a frequency.</strong> Type any frequency into
            the converter below the chart to get the nearest note and how many
            cents it is off — useful for reading spectrum analysers or hum.
            Mains hum at 50&nbsp;Hz, for example, sits between G1 and G♯1, and
            60&nbsp;Hz hum almost exactly halfway between A♯1 and B1.
          </li>
          <li>
            <strong>Alternate concert pitches.</strong> Orchestras in Europe
            often tune to 442 or 443&nbsp;Hz, baroque ensembles to around
            415&nbsp;Hz, and some players prefer 432&nbsp;Hz. Pick one above and
            every frequency updates.
          </li>
        </ul>

        <h2>Cents: Measuring Small Differences</h2>
        <p>
          Musicians measure small pitch differences in <strong>cents</strong>:
          one hundredth of a semitone. Because a semitone is a ratio rather
          than a fixed number of hertz, a cent is about 0.05&nbsp;Hz at the low
          E string but about 0.25&nbsp;Hz at A4. That is why tuners show cents
          rather than hertz — a string 5 cents flat sounds equally out of tune
          wherever it is. Most people notice 5 to 10 cents; the{" "}
          <Link href="/">guitar tuner</Link> reads to a fraction of a cent.
        </p>
      </ToolPageLayout>
    </>
  );
}
