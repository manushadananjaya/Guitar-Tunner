/** Single source of truth for the article catalogue.
 *  Drives the /articles index, the author page, and anywhere else that needs
 *  the list — so titles, descriptions, and categories can never drift. */

export type ArticleCategory =
  | "Getting Started"
  | "Alternate Tunings"
  | "Maintenance & Setup";

export interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  category: ArticleCategory;
  /** Minutes, matching readingTimeMinutes on the article page. */
  readingTime: number;
  /** Card image. */
  image: string;
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
    image:
      "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=600&q=70",
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
    image:
      "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=600&q=70",
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
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=70",
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
    image:
      "https://images.unsplash.com/photo-1605020420620-20c943cc4669?w=600&q=70",
    datePublished: "2026-03-23",
    dateModified: "2026-08-23",
  },
  {
    slug: "alternate-guitar-tunings",
    title: "Alternate Guitar Tunings You Should Try",
    description:
      "Drop D, Open G, Open D, DADGAD, half-step down, and more — explained and explored.",
    category: "Alternate Tunings",
    readingTime: 11,
    image:
      "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&q=70",
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
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=70",
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
    image:
      "https://images.unsplash.com/photo-1501612780327-45045538702b?w=600&q=70",
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
    image:
      "https://images.unsplash.com/photo-1557935728-e6d1eaabe558?w=600&q=70",
    datePublished: "2026-03-23",
    dateModified: "2026-08-21",
  },
  {
    slug: "why-your-guitar-goes-out-of-tune",
    title: "Why Your Guitar Goes Out of Tune",
    description:
      "9 causes of tuning instability — worn nuts, bad stringing, temperature changes — and how to fix each.",
    category: "Maintenance & Setup",
    readingTime: 9,
    image:
      "https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=600&q=70",
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
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&q=70",
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
    image:
      "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=900&q=80",
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
    image:
      "https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?w=600&q=70",
    datePublished: "2026-03-23",
    dateModified: "2026-08-23",
  },
];

export const ARTICLE_CATEGORIES: {
  label: ArticleCategory;
  color: "cyan" | "violet" | "emerald";
}[] = [
  { label: "Getting Started", color: "cyan" },
  { label: "Alternate Tunings", color: "violet" },
  { label: "Maintenance & Setup", color: "emerald" },
];

export const articlesInCategory = (category: ArticleCategory) =>
  ARTICLES.filter((article) => article.category === category);
