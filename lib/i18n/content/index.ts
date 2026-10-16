import type { LanguageContent } from "./types";
import type { TranslatedLocale } from "@/lib/i18n/pages";
import { TRANSLATED_PAGES } from "@/lib/i18n/pages";
import { es } from "./es";
import { pt } from "./pt";
import { fr } from "./fr";
import { de } from "./de";

export const CONTENT: Record<TranslatedLocale, LanguageContent> = {
  es,
  pt,
  fr,
  de,
};

/** Cross-links for a translated page: every other page in its language. */
export function otherPagesFor(path: string, locale: TranslatedLocale) {
  const labels = CONTENT[locale].labels;
  return TRANSLATED_PAGES.filter((page) => page[locale] !== path).map(
    (page) => ({ label: labels[page.en] ?? page[locale], href: page[locale] }),
  );
}
