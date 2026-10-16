import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LocalizedTunerPage, {
  localizedMetadata,
} from "@/components/LocalizedTunerPage";
import { TRANSLATED_PAGES, type TranslatedLocale } from "@/lib/i18n/pages";

/** Translated tuner pages for Portuguese, French and German. */
const LANGS = ["pt", "fr", "de"] as const;

export const dynamicParams = false;

export function generateStaticParams() {
  return LANGS.flatMap((lang) =>
    TRANSLATED_PAGES.filter((page) => page.en !== "/").map((page) => ({
      lang,
      slug: page[lang].split("/")[2],
    })),
  );
}

type Props = { params: Promise<{ lang: string; slug: string }> };

function resolve(lang: string, slug: string) {
  if (!(LANGS as readonly string[]).includes(lang)) return undefined;
  const locale = lang as TranslatedLocale;
  return TRANSLATED_PAGES.find((page) => page[locale] === `/${lang}/${slug}`);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const page = resolve(lang, slug);
  return page ? localizedMetadata(lang as TranslatedLocale, page.en) : {};
}

export default async function LocalizedTuner({ params }: Props) {
  const { lang, slug } = await params;
  const page = resolve(lang, slug);
  if (!page) notFound();
  return <LocalizedTunerPage locale={lang as TranslatedLocale} enPath={page.en} />;
}
