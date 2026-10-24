import { OG_CONTENT_TYPE, OG_SIZE, tunerOgImage } from "@/lib/og/images";
import { TRANSLATED_PAGES, type TranslatedLocale } from "@/lib/i18n/pages";

/** Rendered at build time for every page app/[lang]/[slug] prerenders. */
export function generateStaticParams() {
  return (["pt", "fr", "de"] as const).flatMap((lang) =>
    TRANSLATED_PAGES.filter((page) => page.en !== "/").map((page) => ({
      lang,
      slug: page[lang].split("/")[2],
    })),
  );
}

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "GuitarTunePro";

export default async function Image({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const locale = lang as TranslatedLocale;
  const page = TRANSLATED_PAGES.find((p) => p[locale] === `/${lang}/${slug}`);
  return tunerOgImage(page?.en ?? "/", locale);
}
