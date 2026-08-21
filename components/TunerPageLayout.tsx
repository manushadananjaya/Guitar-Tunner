import ToolPageLayout from "@/components/ToolPageLayout";
import { ProfessionalTuner } from "@/components/Tuner/ProfessionalTuner";
import { getTuningForGuitar } from "@/lib/tuningPresets";
import { frequencyToNote } from "@/lib/noteMap";
import type { FAQItem, RelatedArticle } from "@/components/ArticleLayout";

export interface TunerPageLayoutProps {
  title: string;
  description: string;
  canonicalPath: string;
  /** Preset key from TUNING_PRESETS, preselected when the tuner mounts. */
  initialTuning?: string;
  /** Instrument key from GUITAR_TYPES, preselected when the tuner mounts. */
  initialGuitarType?: string;
  /** Overrides the sentence under the chart heading. Needed for instruments
   *  where "string 1 is the highest" is untrue — e.g. reentrant ukulele. */
  chartCaption?: string;
  /** 12-string guitars are 6 courses of 2, not 12 independent strings. */
  chartMode?: "strings" | "courses";
  faqs?: FAQItem[];
  relatedArticles?: RelatedArticle[];
  /** Sibling tuner pages, for crawlable lateral links. */
  otherTuners?: { label: string; href: string }[];
  children: React.ReactNode;
}

const DEFAULT_CAPTION =
  "These are the exact target frequencies this tuner listens for, at A4 = 440 Hz equal temperament. String 1 is the thinnest (highest) string.";

export default function TunerPageLayout({
  title,
  description,
  canonicalPath,
  initialTuning = "standard",
  initialGuitarType = "sixString",
  chartCaption,
  chartMode = "strings",
  faqs,
  relatedArticles,
  otherTuners,
  children,
}: TunerPageLayoutProps) {
  // Derive the chart from the same source the tuner listens against, so the
  // published frequencies can never drift from what the tool actually targets.
  const tuning = getTuningForGuitar(initialGuitarType, initialTuning);
  const label = (frequency: number) => {
    const note = frequencyToNote(frequency);
    return `${note.name}${note.octave}`;
  };

  // "courses" pairs adjacent entries: a 12-string is 6 courses of 2 strings,
  // stored as [main, pair, main, pair, ...].
  const courseCount = Math.floor(tuning.frequencies.length / 2);
  const courseChart =
    chartMode === "courses"
      ? Array.from({ length: courseCount }, (_, c) => {
          const main = tuning.frequencies[c * 2];
          const pair = tuning.frequencies[c * 2 + 1];
          return {
            number: courseCount - c,
            main: { note: label(main), frequency: main.toFixed(2) },
            pair: { note: label(pair), frequency: pair.toFixed(2) },
          };
        })
      : [];

  const stringChart =
    chartMode === "strings"
      ? tuning.frequencies.map((frequency, i) => ({
          number: tuning.frequencies.length - i,
          note: label(frequency),
          frequency: frequency.toFixed(2),
        }))
      : [];

  const chart = (
    <section className="mb-12" aria-labelledby="string-chart-heading">
      <h2
        id="string-chart-heading"
        className="text-2xl font-bold text-ink mb-4"
      >
        {chartMode === "courses"
          ? "Course-by-Course Frequency Chart"
          : "String-by-String Frequency Chart"}
      </h2>
      <p className="text-ink-muted leading-relaxed mb-5">
        {chartCaption ?? DEFAULT_CAPTION}
      </p>
      <div className="overflow-x-auto rounded-xl border border-line">
        <table className="w-full text-sm">
          <thead className="bg-surface/60 text-ink-muted">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">
                {chartMode === "courses" ? "Course" : "String"}
              </th>
              {chartMode === "courses" ? (
                <>
                  <th className="px-4 py-3 text-left font-semibold">
                    Main String
                  </th>
                  <th className="px-4 py-3 text-left font-semibold">
                    Paired String
                  </th>
                </>
              ) : (
                <>
                  <th className="px-4 py-3 text-left font-semibold">Note</th>
                  <th className="px-4 py-3 text-left font-semibold">
                    Frequency
                  </th>
                </>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {chartMode === "courses"
              ? courseChart.map((row) => (
                  <tr key={row.number} className="bg-surface/20">
                    <td className="px-4 py-3 text-ink-muted">{row.number}</td>
                    <td className="px-4 py-3">
                      <span className="font-semibold text-ink">
                        {row.main.note}
                      </span>{" "}
                      <span className="font-mono text-brass">
                        {row.main.frequency} Hz
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-semibold text-ink">
                        {row.pair.note}
                      </span>{" "}
                      <span className="font-mono text-brass">
                        {row.pair.frequency} Hz
                      </span>
                    </td>
                  </tr>
                ))
              : stringChart.map((row) => (
                  <tr key={row.number} className="bg-surface/20">
                    <td className="px-4 py-3 text-ink-muted">{row.number}</td>
                    <td className="px-4 py-3 font-semibold text-ink">
                      {row.note}
                    </td>
                    <td className="px-4 py-3 font-mono text-brass">
                      {row.frequency} Hz
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </section>
  );

  return (
    <ToolPageLayout
      title={title}
      description={description}
      canonicalPath={canonicalPath}
      tool={
        <ProfessionalTuner
          initialTuning={initialTuning}
          initialGuitarType={initialGuitarType}
        />
      }
      afterTool={chart}
      faqs={faqs}
      relatedArticles={relatedArticles}
      otherTools={otherTuners}
      otherToolsHeading="Other Tunings"
    >
      {children}
    </ToolPageLayout>
  );
}
