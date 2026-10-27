/** Registry of the translated tuner pages: for each English tuner page, its
 *  URL in every other language. Drives hreflang alternates, the sitemap, the
 *  navbar language selector, and the cross-links between pages of one
 *  language. Page *content* lives in lib/i18n/content/<lang>.ts. */

import { TUNER_PAGES } from "@/lib/tunerPages";
import { INSTRUMENT_PAGES } from "@/lib/instrumentPages";
import type { Locale } from "@/lib/i18n/tuner";

export type TranslatedLocale = Exclude<Locale, "en">;

export const TRANSLATED_LOCALES: TranslatedLocale[] = ["es", "pt", "fr", "de"];

export interface TranslatedPage {
  /** The English page's path; also the key into each content file. */
  en: string;
  es: string;
  pt: string;
  fr: string;
  de: string;
}

export const TRANSLATED_PAGES: TranslatedPage[] = [
  { en: "/", es: "/es", pt: "/pt", fr: "/fr", de: "/de" },
  {
    en: "/drop-d-tuner",
    es: "/es/afinador-drop-d",
    pt: "/pt/afinador-drop-d",
    fr: "/fr/accordeur-drop-d",
    de: "/de/drop-d-stimmung",
  },
  {
    en: "/drop-c-tuner",
    es: "/es/afinador-drop-c",
    pt: "/pt/afinador-drop-c",
    fr: "/fr/accordeur-drop-c",
    de: "/de/drop-c-stimmung",
  },
  {
    en: "/drop-c-sharp-tuner",
    es: "/es/afinador-drop-c-sostenido",
    pt: "/pt/afinador-drop-c-sustenido",
    fr: "/fr/accordeur-drop-c-diese",
    de: "/de/drop-cis-stimmung",
  },
  {
    // German calls this note H; a German "B" is B♭.
    en: "/drop-b-tuner",
    es: "/es/afinador-drop-b",
    pt: "/pt/afinador-drop-b",
    fr: "/fr/accordeur-drop-b",
    de: "/de/drop-h-stimmung",
  },
  {
    en: "/dadgad-tuner",
    es: "/es/afinador-dadgad",
    pt: "/pt/afinador-dadgad",
    fr: "/fr/accordeur-dadgad",
    de: "/de/dadgad-stimmung",
  },
  {
    en: "/open-g-tuner",
    es: "/es/afinador-sol-abierto",
    pt: "/pt/afinador-sol-aberto",
    fr: "/fr/accordeur-open-g",
    de: "/de/open-g-stimmung",
  },
  {
    en: "/open-d-tuner",
    es: "/es/afinador-re-abierto",
    pt: "/pt/afinador-re-aberto",
    fr: "/fr/accordeur-open-d",
    de: "/de/open-d-stimmung",
  },
  {
    en: "/open-e-tuner",
    es: "/es/afinador-mi-abierto",
    pt: "/pt/afinador-mi-aberto",
    fr: "/fr/accordeur-open-e",
    de: "/de/open-e-stimmung",
  },
  {
    en: "/open-c-tuner",
    es: "/es/afinador-do-abierto",
    pt: "/pt/afinador-do-aberto",
    fr: "/fr/accordeur-open-c",
    de: "/de/open-c-stimmung",
  },
  {
    en: "/open-a-tuner",
    es: "/es/afinador-la-abierto",
    pt: "/pt/afinador-la-aberto",
    fr: "/fr/accordeur-open-a",
    de: "/de/open-a-stimmung",
  },
  {
    en: "/half-step-down-tuner",
    es: "/es/afinador-medio-tono-abajo",
    pt: "/pt/afinador-meio-tom-abaixo",
    fr: "/fr/accordeur-demi-ton-plus-bas",
    de: "/de/halbton-tiefer-stimmen",
  },
  {
    en: "/full-step-down-tuner",
    es: "/es/afinador-un-tono-abajo",
    pt: "/pt/afinador-um-tom-abaixo",
    fr: "/fr/accordeur-un-ton-plus-bas",
    de: "/de/ganzton-tiefer-stimmen",
  },
  {
    en: "/432-hz-tuner",
    es: "/es/afinador-432-hz",
    pt: "/pt/afinador-432-hz",
    fr: "/fr/accordeur-432-hz",
    de: "/de/stimmgeraet-432-hz",
  },
  {
    en: "/bass-tuner",
    es: "/es/afinador-de-bajo",
    pt: "/pt/afinador-de-baixo",
    fr: "/fr/accordeur-basse",
    de: "/de/bass-stimmen",
  },
  {
    en: "/5-string-bass-tuner",
    es: "/es/afinador-de-bajo-5-cuerdas",
    pt: "/pt/afinador-de-baixo-5-cordas",
    fr: "/fr/accordeur-basse-5-cordes",
    de: "/de/5-saiter-bass-stimmen",
  },
  {
    en: "/ukulele-tuner",
    es: "/es/afinador-de-ukelele",
    pt: "/pt/afinador-de-ukulele",
    fr: "/fr/accordeur-ukulele",
    de: "/de/ukulele-stimmen",
  },
  {
    en: "/baritone-ukulele-tuner",
    es: "/es/afinador-de-ukelele-baritono",
    pt: "/pt/afinador-de-ukulele-baritono",
    fr: "/fr/accordeur-ukulele-baryton",
    de: "/de/bariton-ukulele-stimmen",
  },
  {
    en: "/7-string-guitar-tuner",
    es: "/es/afinador-guitarra-7-cuerdas",
    pt: "/pt/afinador-guitarra-7-cordas",
    fr: "/fr/accordeur-guitare-7-cordes",
    de: "/de/7-saitige-gitarre-stimmen",
  },
  {
    en: "/12-string-guitar-tuner",
    es: "/es/afinador-guitarra-12-cuerdas",
    pt: "/pt/afinador-violao-12-cordas",
    fr: "/fr/accordeur-guitare-12-cordes",
    de: "/de/12-saitige-gitarre-stimmen",
  },
  {
    en: "/mandolin-tuner",
    es: "/es/afinador-de-mandolina",
    pt: "/pt/afinador-de-bandolim",
    fr: "/fr/accordeur-mandoline",
    de: "/de/mandoline-stimmen",
  },
  {
    en: "/banjo-tuner",
    es: "/es/afinador-de-banjo",
    pt: "/pt/afinador-de-banjo",
    fr: "/fr/accordeur-banjo",
    de: "/de/banjo-stimmen",
  },
  {
    en: "/violin-tuner",
    es: "/es/afinador-de-violin",
    pt: "/pt/afinador-de-violino",
    fr: "/fr/accordeur-violon",
    de: "/de/geige-stimmen",
  },
  {
    en: "/viola-tuner",
    es: "/es/afinador-de-viola",
    pt: "/pt/afinador-de-viola-de-arco",
    fr: "/fr/accordeur-alto",
    de: "/de/bratsche-stimmen",
  },
  {
    en: "/cello-tuner",
    es: "/es/afinador-de-violonchelo",
    pt: "/pt/afinador-de-violoncelo",
    fr: "/fr/accordeur-violoncelle",
    de: "/de/cello-stimmen",
  },
  {
    en: "/cavaquinho-tuner",
    es: "/es/afinador-de-cavaquinho",
    pt: "/pt/afinador-de-cavaquinho",
    fr: "/fr/accordeur-cavaquinho",
    de: "/de/cavaquinho-stimmen",
  },
];

/** Spanish pages written by hand as their own routes under app/es, before
 *  this registry existed. The generic renderer skips them. */
export const HANDWRITTEN_PAGES = new Set([
  "/es",
  "/es/afinador-de-bajo",
  "/es/afinador-de-ukelele",
  "/es/afinador-de-violin",
]);

function entryFor(path: string) {
  return TRANSLATED_PAGES.find((page) =>
    (["en", ...TRANSLATED_LOCALES] as Locale[]).some((l) => page[l] === path),
  );
}

/** Every language version of the page at `path`, or undefined if the page
 *  is not translated. */
export function versionsOf(path: string): TranslatedPage | undefined {
  return entryFor(path);
}

/** The language a path is in, judged by its prefix. */
export function localeOfPath(path: string): Locale {
  const first = path.split("/")[1];
  return (TRANSLATED_LOCALES as string[]).includes(first)
    ? (first as Locale)
    : "en";
}

/** `alternates.languages` for any version of a translated page. English is
 *  the x-default, the version for searchers in any other language. */
export function languageAlternates(path: string) {
  const entry = entryFor(path);
  if (!entry) return undefined;
  return {
    en: entry.en,
    es: entry.es,
    pt: entry.pt,
    fr: entry.fr,
    de: entry.de,
    "x-default": entry.en,
  };
}

/** The tuner configuration behind an English tuner page. */
export function tunerConfigFor(enPath: string) {
  const tuner = TUNER_PAGES.find((page) => page.href === enPath);
  if (tuner) {
    return {
      guitarType: tuner.guitarType ?? "sixString",
      tuning: tuner.tuning,
      reference: tuner.reference,
    };
  }
  const instrument = INSTRUMENT_PAGES.find((page) => page.href === enPath);
  if (instrument) {
    return { guitarType: instrument.guitarType, tuning: "standard" };
  }
  return { guitarType: "sixString", tuning: "standard" };
}
