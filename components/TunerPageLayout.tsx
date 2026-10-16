import ToolPageLayout from "@/components/ToolPageLayout";
import { ProfessionalTuner } from "@/components/Tuner/ProfessionalTuner";
import { getTuningForGuitar, scaleTuning } from "@/lib/tuningPresets";
import { frequencyToNote } from "@/lib/noteMap";
import type { FAQItem, RelatedArticle } from "@/components/ArticleLayout";
import { localDecimal, localNote, type Locale } from "@/lib/i18n/tuner";

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
  locale?: Locale;
  /** Concert pitch for this page, e.g. 432. The chart and the tuner both use
   *  it; omitted means 440 and the player's saved preference. */
  initialReference?: number;
  children: React.ReactNode;
}

const CHART_TEXT = {
  en: {
    caption: (a4: number) =>
      `These are the exact target frequencies this tuner listens for, at A4 = ${a4} Hz equal temperament. String 1 is the thinnest (highest) string.`,
    courseHeading: "Course-by-Course Frequency Chart",
    stringHeading: "String-by-String Frequency Chart",
    course: "Course",
    string: "String",
    main: "Main String",
    pair: "Paired String",
    note: "Note",
    frequency: "Frequency",
    otherTunings: "Other Tunings",
  },
  es: {
    caption: (a4: number) =>
      `Estas son las frecuencias exactas que busca el afinador, con La4 = ${a4} Hz y temperamento igual. La cuerda 1 es la más fina (la más aguda).`,
    courseHeading: "Frecuencias por orden",
    stringHeading: "Frecuencias cuerda por cuerda",
    course: "Orden",
    string: "Cuerda",
    main: "Cuerda principal",
    pair: "Cuerda doble",
    note: "Nota",
    frequency: "Frecuencia",
    otherTunings: "Otros afinadores",
  },
  pt: {
    caption: (a4: number) =>
      `Estas são as frequências exatas que o afinador procura, com Lá4 = ${a4} Hz e temperamento igual. A corda 1 é a mais fina (a mais aguda).`,
    courseHeading: "Frequências por par de cordas",
    stringHeading: "Frequências corda por corda",
    course: "Par",
    string: "Corda",
    main: "Corda principal",
    pair: "Corda dupla",
    note: "Nota",
    frequency: "Frequência",
    otherTunings: "Outros afinadores",
  },
  fr: {
    caption: (a4: number) =>
      `Voici les fréquences exactes que l’accordeur recherche, avec La4 = ${a4} Hz en tempérament égal. La corde 1 est la plus fine (la plus aiguë).`,
    courseHeading: "Fréquences par chœur",
    stringHeading: "Fréquences corde par corde",
    course: "Chœur",
    string: "Corde",
    main: "Corde principale",
    pair: "Corde doublée",
    note: "Note",
    frequency: "Fréquence",
    otherTunings: "Autres accordeurs",
  },
  de: {
    caption: (a4: number) =>
      `Das sind die genauen Zielfrequenzen dieses Stimmgeräts bei A4 = ${a4} Hz in gleichstufiger Stimmung. Saite 1 ist die dünnste (höchste) Saite.`,
    courseHeading: "Frequenzen pro Saitenpaar",
    stringHeading: "Frequenzen Saite für Saite",
    course: "Paar",
    string: "Saite",
    main: "Hauptsaite",
    pair: "Paarsaite",
    note: "Ton",
    frequency: "Frequenz",
    otherTunings: "Weitere Stimmgeräte",
  },
} as const;

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
  locale = "en",
  initialReference,
  children,
}: TunerPageLayoutProps) {
  const text = CHART_TEXT[locale];
  // Derive the chart from the same source the tuner listens against, so the
  // published frequencies can never drift from what the tool actually targets.
  const tuning = scaleTuning(
    getTuningForGuitar(initialGuitarType, initialTuning),
    initialReference ?? 440,
  );
  const label = (frequency: number) => {
    // Name on the 440 grid: at A = 432 the A string is still "A".
    const note = frequencyToNote((frequency * 440) / (initialReference ?? 440));
    const name = `${note.name}${note.octave}`;
    // Local name first, with the letter name chord charts and tabs use
    // alongside it when they differ: "Mi2 (E2)", "H3 (B3)", but just "E2".
    const local = localNote(name, locale);
    return local === name ? name : `${local} (${name})`;
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
            main: { note: label(main), frequency: localDecimal(main, 2, locale) },
            pair: { note: label(pair), frequency: localDecimal(pair, 2, locale) },
          };
        })
      : [];

  const stringChart =
    chartMode === "strings"
      ? tuning.frequencies.map((frequency, i) => ({
          number: tuning.frequencies.length - i,
          note: label(frequency),
          frequency: localDecimal(frequency, 2, locale),
        }))
      : [];

  const chart = (
    <section className="mb-12" aria-labelledby="string-chart-heading">
      <h2
        id="string-chart-heading"
        className="text-2xl font-bold text-ink mb-4"
      >
        {chartMode === "courses" ? text.courseHeading : text.stringHeading}
      </h2>
      <p className="text-ink-muted leading-relaxed mb-5">
        {chartCaption ?? text.caption(initialReference ?? 440)}
      </p>
      <div className="overflow-x-auto rounded-xl border border-line">
        <table className="w-full text-sm">
          <thead className="bg-surface/60 text-ink-muted">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">
                {chartMode === "courses" ? text.course : text.string}
              </th>
              {chartMode === "courses" ? (
                <>
                  <th className="px-4 py-3 text-left font-semibold">
                    {text.main}
                  </th>
                  <th className="px-4 py-3 text-left font-semibold">
                    {text.pair}
                  </th>
                </>
              ) : (
                <>
                  <th className="px-4 py-3 text-left font-semibold">
                    {text.note}
                  </th>
                  <th className="px-4 py-3 text-left font-semibold">
                    {text.frequency}
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
          locale={locale}
          initialReference={initialReference}
        />
      }
      afterTool={chart}
      faqs={faqs}
      relatedArticles={relatedArticles}
      otherTools={otherTuners}
      otherToolsHeading={text.otherTunings}
      locale={locale}
    >
      {children}
    </ToolPageLayout>
  );
}
