import { OG_CONTENT_TYPE, OG_SIZE, ukeChordOgImage } from "@/lib/og/images";
import { UKE_CHORDS } from "@/lib/ukulele/chords";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Ukulele chord diagram — GuitarTunePro";

/** Rendered at build time, one per chord, like the pages themselves. */
export function generateStaticParams() {
  return UKE_CHORDS.map((chord) => ({ slug: chord.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  return ukeChordOgImage((await params).slug);
}
