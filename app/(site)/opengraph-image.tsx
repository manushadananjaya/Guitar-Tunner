import { OG_CONTENT_TYPE, OG_SIZE, tunerOgImage } from "@/lib/og/images";

/** The homepage card, and the fallback for English pages that set no
 *  openGraph of their own. */
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "GuitarTunePro — free online guitar tuner";

export default function Image() {
  return tunerOgImage("/");
}
