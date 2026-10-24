import { OG_CONTENT_TYPE, OG_SIZE, tunerOgImage } from "@/lib/og/images";
import { HANDWRITTEN_PAGES, TRANSLATED_PAGES } from "@/lib/i18n/pages";

/** Rendered at build time for every page app/es/[slug] prerenders. */
export function generateStaticParams() {
  return TRANSLATED_PAGES.filter(
    (page) => page.en !== "/" && !HANDWRITTEN_PAGES.has(page.es),
  ).map((page) => ({ slug: page.es.split("/")[2] }));
}

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "GuitarTunePro — afinador online";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = TRANSLATED_PAGES.find((p) => p.es === `/es/${slug}`);
  return tunerOgImage(page?.en ?? "/", "es");
}
