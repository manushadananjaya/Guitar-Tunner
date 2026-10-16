import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LocalizedTunerPage, {
  localizedMetadata,
} from "@/components/LocalizedTunerPage";
import { HANDWRITTEN_PAGES, TRANSLATED_PAGES } from "@/lib/i18n/pages";

/** Spanish tuner pages other than the hand-written ones in sibling folders,
 *  which Next resolves first. */
export const dynamicParams = false;

const PAGES = TRANSLATED_PAGES.filter(
  (page) => page.en !== "/" && !HANDWRITTEN_PAGES.has(page.es),
);

export function generateStaticParams() {
  return PAGES.map((page) => ({ slug: page.es.split("/")[2] }));
}

type Props = { params: Promise<{ slug: string }> };

const resolve = (slug: string) =>
  PAGES.find((page) => page.es === `/es/${slug}`);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = resolve((await params).slug);
  return page ? localizedMetadata("es", page.en) : {};
}

export default async function SpanishTuner({ params }: Props) {
  const page = resolve((await params).slug);
  if (!page) notFound();
  return <LocalizedTunerPage locale="es" enPath={page.en} />;
}
