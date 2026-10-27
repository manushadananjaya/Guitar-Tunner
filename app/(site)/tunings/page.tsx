import { Metadata } from "next";
import Link from "next/link";
import ToolPageLayout from "@/components/ToolPageLayout";
import { TUNER_PAGES } from "@/lib/tunerPages";
import { INSTRUMENT_PAGES } from "@/lib/instrumentPages";
import { otherToolLinks } from "@/lib/toolPages";
import { TUNING_PRESETS, getTuningForGuitar } from "@/lib/tuningPresets";
import { frequencyToMidi } from "@/lib/tuningMidi";

export const metadata: Metadata = {
  title: "Guitar Tunings Chart: Notes & Frequencies",
  description:
    "Every common guitar tuning in one chart — standard, drop, open and DADGAD — with the note and exact frequency of each string, and how much tension each one loses.",
  alternates: { canonical: "/tunings" },
  openGraph: {
    title: "Guitar Tunings Chart — Notes and Frequencies for Every Tuning",
    description:
      "Standard, drop, open and modal tunings side by side, with exact string frequencies and a tuner for each.",
  },
};

/** Six-string tunings grouped the way players think of them. Keys are
 *  TUNING_PRESETS keys, so the chart shows exactly what the tuner uses. */
const FAMILIES: { heading: string; blurb: string; keys: string[] }[] = [
  {
    heading: "Standard and lowered standard",
    blurb: "Every string moves by the same amount, so every chord shape stays the same.",
    keys: ["standard", "halfStepDown", "fullStepDown", "cStandard", "bStandard"],
  },
  {
    heading: "Drop tunings",
    blurb: "The 6th string sits a fifth below the 5th instead of a fourth, so the bottom three strings make a one-finger power chord.",
    keys: ["dropD", "dropCSharp", "dropC", "dropB"],
  },
  {
    heading: "Open tunings",
    blurb: "The open strings sound a major chord. A straight barre — or a slide — plays a chord at any fret.",
    keys: ["openG", "openD", "openE", "openA", "openC"],
  },
  {
    heading: "Modal tunings",
    blurb: "Open strings that are neither major nor minor, for drones and ringing melodies.",
    keys: ["dadgad"],
  },
  {
    heading: "High-strung tuning",
    blurb: "Standard note names with the four lowest strings an octave up — so the tension column means thinner strings, not tighter ones.",
    keys: ["nashville"],
  },
];

const STANDARD = TUNING_PRESETS.standard.frequencies;

const pageFor = (key: string) =>
  TUNER_PAGES.find((page) => page.tuning === key && !page.reference);

/** Note names for display: the tuner page's spelling where there is one
 *  (E♭ for half step down, not D♯), otherwise the preset's. */
function noteNames(key: string) {
  const page = pageFor(key);
  // Octave numbers ("E3" on the Nashville page) are drawn separately below.
  return page ? page.notes.split(" ").map((n) => n.replace(/\d+$/, "")) : TUNING_PRESETS[key].notes;
}

const octave = (hz: number) => Math.floor(frequencyToMidi(hz) / 12) - 1;

/** Tension relative to standard, assuming the same strings: tension scales
 *  with frequency squared, averaged across the six strings. */
const relativeTension = (frequencies: number[]) =>
  frequencies.reduce((sum, f, i) => sum + (f / STANDARD[i]) ** 2, 0) / frequencies.length;

/** Semitones each string moves from standard, low to high. */
const offsets = (frequencies: number[]) =>
  frequencies.map((f, i) => Math.round(12 * Math.log2(f / STANDARD[i])));

const fmtOffset = (n: number) => (n === 0 ? "0" : n > 0 ? `+${n}` : `−${-n}`);

function TuningsChart() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col gap-10">
      {FAMILIES.map((family) => (
        <section key={family.heading} aria-labelledby={`family-${family.keys[0]}`}>
          <h2 id={`family-${family.keys[0]}`} className="text-xl font-bold text-ink">
            {family.heading}
          </h2>
          <p className="mt-1 mb-4 text-sm text-ink-muted">{family.blurb}</p>
          <div className="overflow-x-auto rounded-2xl border border-line bg-surface/40">
            <table className="w-full min-w-[46rem] text-sm">
              <thead>
                <tr className="border-b border-line text-left text-2xs uppercase tracking-widest text-ink-subtle">
                  <th scope="col" className="sticky left-0 z-10 bg-surface px-4 py-3 font-bold">Tuning</th>
                  {[6, 5, 4, 3, 2, 1].map((n) => (
                    <th key={n} scope="col" className="px-2 py-3 font-bold text-center">
                      String {n}
                    </th>
                  ))}
                  <th scope="col" className="px-4 py-3 font-bold text-right">Tension</th>
                </tr>
              </thead>
              <tbody>
                {family.keys.map((key) => {
                  const tuning = TUNING_PRESETS[key];
                  const names = noteNames(key);
                  const page = key === "standard" ? { href: "/" } : pageFor(key);
                  const moves = offsets(tuning.frequencies);
                  return (
                    <tr key={key} className="border-b border-line last:border-0 align-top">
                      {/* Pinned so the tuning stays named while the strings scroll on a phone. */}
                      <th scope="row" className="sticky left-0 z-10 bg-surface px-4 py-3 text-left font-semibold text-ink">
                        {page ? (
                          <Link href={page.href} className="text-brass hover:text-brass-hover">
                            {tuning.name === "Standard" ? "Standard (E)" : tuning.name}
                          </Link>
                        ) : (
                          tuning.name
                        )}
                        <span className="block font-mono text-2xs font-normal text-ink-subtle mt-0.5">
                          {moves.map(fmtOffset).join(" ")}
                        </span>
                      </th>
                      {tuning.frequencies.map((hz, i) => (
                        <td key={i} className="px-2 py-3 text-center">
                          <span className="block font-mono font-bold text-ink">
                            {names[i]}
                            <sub className="text-ink-subtle font-normal">{octave(hz)}</sub>
                          </span>
                          <span className="block font-mono text-2xs text-ink-muted tabular-nums">
                            {hz.toFixed(2)}
                          </span>
                        </td>
                      ))}
                      <td className="px-4 py-3 text-right font-mono tabular-nums text-ink-muted">
                        {Math.round(100 * relativeTension(tuning.frequencies))}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      ))}

      <section aria-labelledby="family-instruments">
        <h2 id="family-instruments" className="text-xl font-bold text-ink">
          Other instruments
        </h2>
        <p className="mt-1 mb-4 text-sm text-ink-muted">
          Standard tuning for each instrument, then alternate tunings of those instruments, in string order as tuned. Paired courses are shown once.
        </p>
        <div className="overflow-x-auto rounded-2xl border border-line bg-surface/40">
          <table className="w-full min-w-[34rem] text-sm">
            <thead>
              <tr className="border-b border-line text-left text-2xs uppercase tracking-widest text-ink-subtle">
                <th scope="col" className="px-4 py-3 font-bold">Instrument</th>
                <th scope="col" className="px-4 py-3 font-bold">Notes and frequencies (Hz)</th>
              </tr>
            </thead>
            <tbody>
              {[
                ...INSTRUMENT_PAGES.map((page) => ({ ...page, tuning: "standard" })),
                ...TUNER_PAGES.filter(
                  (page): page is typeof page & { guitarType: string } => !!page.guitarType,
                ),
              ].map((page) => {
                const tuning = getTuningForGuitar(page.guitarType, page.tuning);
                // 12-string and mandolin courses repeat a pitch or an octave;
                // listing each note once keeps the row readable.
                const seen = new Set<string>();
                const notes = tuning.frequencies
                  .map((hz, i) => ({ name: tuning.notes[i], hz }))
                  .filter(({ hz }) => {
                    const id = hz.toFixed(2);
                    if (seen.has(id)) return false;
                    seen.add(id);
                    return true;
                  });
                return (
                  <tr key={page.href} className="border-b border-line last:border-0">
                    <th scope="row" className="px-4 py-3 text-left font-semibold">
                      <Link href={page.href} className="text-brass hover:text-brass-hover">
                        {page.label}
                      </Link>
                    </th>
                    <td className="px-4 py-3">
                      <span className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs">
                        {notes.map(({ name, hz }, i) => (
                          <span key={i} className="whitespace-nowrap">
                            <span className="font-bold text-ink">
                              {name}
                              <sub className="text-ink-subtle font-normal">{octave(hz)}</sub>
                            </span>{" "}
                            <span className="text-ink-muted tabular-nums">{hz.toFixed(2)}</span>
                          </span>
                        ))}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default function TuningsPage() {
  return (
    <ToolPageLayout
      title="Guitar Tunings Chart"
      description="Every tuning the tuner knows, with the note and exact frequency of each string. Click a tuning to open a tuner already set to it."
      canonicalPath="/tunings"
      tool={<TuningsChart />}
      otherTools={otherToolLinks("/tunings")}
      otherToolsHeading="Guitar Tools"
      faqs={[
        {
          question: "Where do these frequencies come from?",
          answer:
            "They are equal-tempered pitches at A4 = 440 Hz, worked out from each note's distance to A4. They are the same numbers the tuner on each linked page listens for, generated from one table, so the chart and the tuner cannot disagree.",
        },
        {
          question: "What does the row of numbers under each tuning mean?",
          answer:
            "How many semitones each string moves from standard tuning, from string 6 to string 1. Drop D is −2 0 0 0 0 0: only the low string changes, by a whole step. Open G is −2 −2 0 0 0 −2.",
        },
        {
          question: "How is the tension column worked out?",
          answer:
            "String tension rises and falls with the square of the pitch. The column assumes you keep the same strings and averages each string's tension against standard tuning. It is a guide to how slack a tuning will feel, not a measurement — use the string tension calculator for figures in pounds or kilograms for your actual gauges.",
        },
        {
          question: "Why are the octave numbers written after the notes?",
          answer:
            "Scientific pitch notation tells two notes with the same name apart. Middle C is C4, the low E string is E2, and the high E string is E4, two octaves above it. The number changes at each C, which is why the low B in Drop B is B1 while the D above it is D2.",
        },
        {
          question: "Which tuning should I learn after standard?",
          answer:
            "Drop D for rock and metal, half step down if you play along with records from the 1960s to the 1990s, and open G or DADGAD if you play acoustic or slide. Each one changes few strings and opens a lot of new music.",
        },
      ]}
      relatedArticles={[
        {
          title: "Alternate Guitar Tunings You Should Try",
          slug: "alternate-guitar-tunings",
          description: "What each family of tunings is for, with songs to learn in them.",
        },
        {
          title: "Standard Tuning Explained",
          slug: "standard-tuning-explained",
          description: "Why the guitar is tuned E A D G B E in the first place.",
        },
        {
          title: "Drop D Tuning Guide for Rock and Metal",
          slug: "drop-d-tuning-guide",
          description: "The most-used alternate tuning, in depth.",
        },
        {
          title: "7 and 8-String Guitar Tuning",
          slug: "7-and-8-string-guitar-tuning",
          description: "Extended-range tunings and how they relate to the drop family.",
        },
      ]}
    >
      <h2>Reading the Chart</h2>
      <p>
        Each row is one tuning, with the strings in the order they sit on the
        guitar: string 6, the thickest, on the left, and string 1 on the right.
        Every cell gives the note, its octave, and its frequency in hertz. Under
        each tuning&apos;s name is the move from standard for every string, in
        semitones, which is the quickest way to see how much work a retune is.
        Drop D changes one string; open C changes four, raising one of them and
        taking the low string down four semitones.
      </p>
      <p>
        The tension column answers the question that matters once you have
        retuned: how will it feel? Lowering a string a semitone takes about 11%
        of its tension away. A whole step takes 21%. That is why Drop D feels
        almost the same as standard, while <Link href="/drop-b-tuner">Drop B</Link>{" "}
        on the same strings feels like rubber bands.
      </p>

      <h2>The Main Families</h2>
      <h3>Lowered standard</h3>
      <p>
        <Link href="/half-step-down-tuner">Half step down</Link> and{" "}
        <Link href="/full-step-down-tuner">full step down</Link> keep the shape
        of standard tuning and move everything lower. You play exactly the same
        chords and they come out lower, which suits singers and gives the
        looser, heavier feel heard on a lot of blues-rock and grunge. Go
        further and you reach <Link href="/c-standard-tuner">C standard</Link>{" "}
        and <Link href="/b-standard-tuner">B standard</Link>, where the same
        shapes need much heavier strings.
      </p>
      <h3>Drop tunings</h3>
      <p>
        A drop tuning lowers the 6th string a whole step below the matching
        lowered standard, so the three lowest strings become a root, fifth and
        octave. <Link href="/drop-d-tuner">Drop D</Link>,{" "}
        <Link href="/drop-c-sharp-tuner">Drop C♯</Link>,{" "}
        <Link href="/drop-c-tuner">Drop C</Link> and Drop B all have that
        identical shape at different depths, so a riff learned in one plays in
        all of them.
      </p>
      <h3>Open tunings</h3>
      <p>
        <Link href="/open-g-tuner">Open G</Link>,{" "}
        <Link href="/open-d-tuner">open D</Link>,{" "}
        <Link href="/open-e-tuner">open E</Link>,{" "}
        <Link href="/open-a-tuner">open A</Link> and{" "}
        <Link href="/open-c-tuner">open C</Link> are tuned so the open strings
        sound a major chord. Barring a single fret then plays a major chord in
        another key, which is what makes them the slide guitarist&apos;s
        tunings. Open E and open A get there by raising strings, adding
        tension; the others mostly lower them.
      </p>
      <h3>Modal tunings</h3>
      <p>
        <Link href="/dadgad-tuner">DADGAD</Link> is the best-known: its open
        strings make a suspended chord with no third, so they ring under melodies
        in both major and minor keys. It is the standard tuning of Celtic
        guitar and widely used in acoustic fingerstyle.
      </p>
      <h3>High-strung tuning</h3>
      <p>
        <Link href="/nashville-tuner">Nashville tuning</Link> keeps the note
        names of standard but puts the four lowest strings up an octave, using
        the thin octave strings from a 12-string set. It is a recording trick:
        doubled with a normal guitar, it gives a 12-string shimmer that is
        easier to play.
      </p>

      <h2>Which Tuning Did That Band Use?</h2>
      <p>
        If you are trying to play along with a record and nothing lines up, the
        song is probably in one of these tunings. The{" "}
        <Link href="/tunings/by-artist">guitar tunings by band</Link> guide
        lists the tunings well-known artists are documented as using, each
        linked to a tuner already set to it.
      </p>

      <h2>Retuning Without Breaking Strings</h2>
      <p>
        Tune <em>down</em> to a note where you can, then up to it, so the string
        settles against tension rather than slipping. When a tuning lowers
        several strings a long way, do the biggest move last and go round all
        six strings two or three times: taking tension off the neck lets it
        straighten slightly, and the strings you tuned first will drift flat.
        Tunings that raise strings — open E and open A — are the ones that break
        them. Raise them slowly, and if you use either often, consider a
        lighter set.
      </p>
      <p>
        For the tunings that take a lot of tension away, the{" "}
        <Link href="/string-tension-calculator">string tension calculator</Link>{" "}
        will tell you which gauges bring the feel back to normal, and the{" "}
        <Link href="/chord-finder">chord finder</Link> names any shape you find
        in an unfamiliar tuning.
      </p>
    </ToolPageLayout>
  );
}
