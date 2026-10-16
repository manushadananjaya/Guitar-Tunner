/** Registry of the Spanish tuner pages and the English page each translates.
 *  Drives hreflang alternates on both sides, the sitemap, the language
 *  switch link, and the cross-links between Spanish pages. */

export interface EsPageEntry {
  /** Spanish URL. */
  es: string;
  /** English equivalent. */
  en: string;
  /** Link text for cross-links between Spanish pages. */
  label: string;
}

export const ES_PAGES: EsPageEntry[] = [
  { es: "/es", en: "/", label: "Afinador de guitarra" },
  { es: "/es/afinador-de-bajo", en: "/bass-tuner", label: "Afinador de bajo" },
  {
    es: "/es/afinador-de-ukelele",
    en: "/ukulele-tuner",
    label: "Afinador de ukelele",
  },
  {
    es: "/es/afinador-de-violin",
    en: "/violin-tuner",
    label: "Afinador de violín",
  },
];

/** The page in the other language, or undefined if there is none. */
export function counterpartOf(path: string) {
  const entry = ES_PAGES.find((page) => page.es === path || page.en === path);
  if (!entry) return undefined;
  return entry.es === path
    ? { href: entry.en, label: "English", lang: "en" }
    : { href: entry.es, label: "Español", lang: "es" };
}

/** `alternates.languages` for either side of a translated pair. English is
 *  the x-default, the version for searchers in any other language. */
export function languageAlternates(path: string) {
  const entry = ES_PAGES.find((page) => page.es === path || page.en === path);
  if (!entry) return undefined;
  return { en: entry.en, es: entry.es, "x-default": entry.en };
}

/** Cross-links for one Spanish page: every sibling except itself. */
export function otherEsPagesFor(path: string) {
  return ES_PAGES.filter((page) => page.es !== path).map((page) => ({
    label: page.label,
    href: page.es,
  }));
}
