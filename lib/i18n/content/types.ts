/** Shape of one translated tuner page's prose. Text may use **bold**. */

export type Block = string | { list: string[] };

export interface Section {
  heading: string;
  body: Block[];
}

export interface PageCopy {
  /** ≤ 45 characters — the layout appends " | GuitarTunePro". */
  metaTitle: string;
  /** ≤ 155 characters. */
  metaDescription: string;
  /** H1. */
  title: string;
  /** One or two sentences under the H1. */
  intro: string;
  /** Replaces the default chart caption — for reentrant or paired strings. */
  chartCaption?: string;
  sections: Section[];
  faqs: { question: string; answer: string }[];
}

export interface LanguageContent {
  /** Cross-link label for every translated page in this language, keyed by
   *  the English path — including pages written as their own routes. */
  labels: Record<string, string>;
  /** Pages rendered by LocalizedTunerPage, keyed by the English path. */
  pages: Record<string, PageCopy>;
}
