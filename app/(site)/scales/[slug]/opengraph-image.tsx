import { OG_CONTENT_TYPE, OG_SIZE, scaleOgImage } from "@/lib/og/images";
import { SCALE_PAGES } from "@/lib/music/scalePages";

/** Rendered at build time, one per scale page, like the pages themselves. */
export function generateStaticParams() {
  return SCALE_PAGES.map((page) => ({ slug: page.slug }));
}

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Guitar scale chart — GuitarTunePro";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  return scaleOgImage((await params).slug);
}
