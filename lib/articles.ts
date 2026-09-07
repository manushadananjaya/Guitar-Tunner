/** Single source of truth for the article catalogue.
 *  Drives the /articles index, the author page, and the sitemap — so titles,
 *  descriptions, categories, and dates can never drift. */

export type ArticleCategory =
  | "Getting Started"
  | "Playing & Practice"
  | "Alternate Tunings"
  | "Maintenance & Setup";

export interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  category: ArticleCategory;
  /** Minutes, matching readingTimeMinutes on the article page. */
  readingTime: number;
  datePublished: string;
  dateModified: string;
}

export const ARTICLES: ArticleMeta[] = [
  {
    slug: "how-to-tune-a-guitar-for-beginners",
    title: "How to Tune a Guitar for Beginners",
    description:
      "Step-by-step guide to tuning for the first time — from string names to reading cents on a tuner.",
    category: "Getting Started",
    readingTime: 8,
    datePublished: "2026-03-23",
    dateModified: "2026-08-23",
  },
  {
    slug: "standard-tuning-explained",
    title: "Standard Tuning Explained",
    description:
      "The notes, intervals, and history behind E-A-D-G-B-E — the universal guitar tuning.",
    category: "Getting Started",
    readingTime: 8,
    datePublished: "2026-03-23",
    dateModified: "2026-08-23",
  },
  {
    slug: "how-to-use-a-chromatic-tuner",
    title: "How to Use a Chromatic Tuner",
    description:
      "Master the needle, cents, and note display on any chromatic guitar tuner.",
    category: "Getting Started",
    readingTime: 8,
    datePublished: "2026-03-23",
    dateModified: "2026-08-23",
  },
  {
    slug: "how-to-tune-a-guitar-by-ear",
    title: "How to Tune a Guitar by Ear",
    description:
      "The 5th fret method, harmonics, and octave matching — develop your musical ear.",
    category: "Getting Started",
    readingTime: 9,
    datePublished: "2026-03-23",
    dateModified: "2026-08-23",
  },
  {
    slug: "how-to-read-guitar-tabs",
    title: "How to Read Guitar Tabs",
    description:
      "Tab explained from scratch: the six lines, fret numbers, chords, and the symbols for bends, slides, hammer-ons, and palm muting.",
    category: "Getting Started",
    readingTime: 9,
    datePublished: "2026-09-02",
    dateModified: "2026-09-02",
  },
  {
    slug: "432-hz-vs-440-hz-tuning",
    title: "432 Hz vs 440 Hz Tuning",
    description:
      "What concert pitch actually is, where A=440 Hz came from, and what happens if you tune to 432 Hz instead.",
    category: "Getting Started",
    readingTime: 8,
    datePublished: "2026-09-02",
    dateModified: "2026-09-02",
  },
  {
    slug: "beginner-guitar-chord-progressions",
    title: "Beginner Guitar Chord Progressions",
    description:
      "Five progressions that cover a huge amount of popular music, the theory behind why they work, and the songs that use them.",
    category: "Playing & Practice",
    readingTime: 10,
    datePublished: "2026-09-02",
    dateModified: "2026-09-02",
  },
  {
    slug: "how-to-use-a-metronome-for-guitar-practice",
    title: "How to Use a Metronome for Guitar Practice",
    description:
      "How to actually practise with a click: subdivisions, where to place the beat, tempo ladders, and the mistakes that make it feel pointless.",
    category: "Playing & Practice",
    readingTime: 9,
    datePublished: "2026-09-02",
    dateModified: "2026-09-02",
  },
  {
    slug: "how-to-find-your-vocal-range",
    title: "How to Find Your Vocal Range",
    description:
      "Measure your range in a few minutes with a pitch detector, read it as note names, and understand what it does and does not say about your voice type.",
    category: "Playing & Practice",
    readingTime: 8,
    datePublished: "2026-09-07",
    dateModified: "2026-09-07",
  },
  {
    slug: "guitar-fretboard-notes-map",
    title: "The Guitar Fretboard Notes Map",
    description:
      "Every note on every string, plus the octave shapes and reference frets that let you find any note without memorising all 72.",
    category: "Playing & Practice",
    readingTime: 10,
    datePublished: "2026-09-02",
    dateModified: "2026-09-02",
  },
  {
    slug: "alternate-guitar-tunings",
    title: "Alternate Guitar Tunings You Should Try",
    description:
      "Drop D, Open G, Open D, DADGAD, half-step down, and more — explained and explored.",
    category: "Alternate Tunings",
    readingTime: 11,
    datePublished: "2026-03-23",
    dateModified: "2026-08-23",
  },
  {
    slug: "drop-d-tuning-guide",
    title: "Drop D Tuning Guide for Rock and Metal",
    description:
      "How to tune to Drop D, one-finger power chords, and famous songs in Drop D.",
    category: "Alternate Tunings",
    readingTime: 9,
    datePublished: "2026-03-23",
    dateModified: "2026-08-23",
  },
  {
    slug: "acoustic-vs-electric-guitar-tuning",
    title: "Acoustic vs Electric Guitar Tuning",
    description:
      "How string gauges, bridges, and materials create different tuning challenges on each guitar type.",
    category: "Alternate Tunings",
    readingTime: 8,
    datePublished: "2026-03-23",
    dateModified: "2026-08-23",
  },
  {
    slug: "does-a-capo-affect-guitar-tuning",
    title: "Does a Capo Affect Guitar Tuning?",
    description:
      "Why capos cause pitch changes and the right way to compensate for them.",
    category: "Alternate Tunings",
    readingTime: 7,
    datePublished: "2026-03-23",
    dateModified: "2026-08-21",
  },
  {
    slug: "7-and-8-string-guitar-tuning",
    title: "7 and 8-String Guitar Tuning",
    description:
      "Standard tunings for extended-range guitars, the string gauges that make a low B or F# playable, and how to tune one accurately.",
    category: "Alternate Tunings",
    readingTime: 9,
    datePublished: "2026-09-02",
    dateModified: "2026-09-02",
  },
  {
    slug: "why-your-guitar-goes-out-of-tune",
    title: "Why Your Guitar Goes Out of Tune",
    description:
      "9 causes of tuning instability — worn nuts, bad stringing, temperature changes — and how to fix each.",
    category: "Maintenance & Setup",
    readingTime: 9,
    datePublished: "2026-03-23",
    dateModified: "2026-08-23",
  },
  {
    slug: "best-guitar-strings-for-tuning-stability",
    title: "Best Guitar Strings for Tuning Stability",
    description:
      "Coated vs uncoated, nickel vs steel, light vs heavy — a complete guide to string selection.",
    category: "Maintenance & Setup",
    readingTime: 10,
    datePublished: "2026-03-23",
    dateModified: "2026-08-23",
  },
  {
    slug: "how-temperature-and-humidity-affect-guitar-tuning",
    title: "How Temperature and Humidity Affect Guitar Tuning",
    description:
      "How wood movement, seasonal humidity, and extreme temperatures affect your guitar's pitch.",
    category: "Maintenance & Setup",
    readingTime: 9,
    datePublished: "2026-03-23",
    dateModified: "2026-08-23",
  },
  {
    slug: "how-to-intonate-your-guitar",
    title: "How to Intonate Your Guitar",
    description:
      "Step-by-step saddle adjustment guide to set perfect intonation across the fretboard.",
    category: "Maintenance & Setup",
    readingTime: 10,
    datePublished: "2026-03-23",
    dateModified: "2026-08-23",
  },
  {
    slug: "how-often-should-you-tune-your-guitar",
    title: "How Often Should You Tune Your Guitar?",
    description:
      "When a guitar actually drifts, why new strings and weather matter more than time, and a simple habit that keeps you in tune.",
    category: "Maintenance & Setup",
    readingTime: 6,
    datePublished: "2026-09-02",
    dateModified: "2026-09-02",
  },
];

export const ARTICLE_CATEGORIES: {
  label: ArticleCategory;
  color: "cyan" | "violet" | "emerald" | "amber";
}[] = [
  { label: "Getting Started", color: "cyan" },
  { label: "Playing & Practice", color: "amber" },
  { label: "Alternate Tunings", color: "violet" },
  { label: "Maintenance & Setup", color: "emerald" },
];

export const articlesInCategory = (category: ArticleCategory) =>
  ARTICLES.filter((article) => article.category === category);
