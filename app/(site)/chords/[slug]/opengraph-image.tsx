import { OG_CONTENT_TYPE, OG_SIZE, chordOgImage } from "@/lib/og/images";
import { CHORDS } from "@/lib/chords";

/** Rendered at build time, one per chord, like the pages themselves. */
export function generateStaticParams() {
  return CHORDS.map((chord) => ({ slug: chord.slug }));
}

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Guitar chord diagram — GuitarTunePro";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  return chordOgImage((await params).slug);
}
