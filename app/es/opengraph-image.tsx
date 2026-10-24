import { OG_CONTENT_TYPE, OG_SIZE, tunerOgImage } from "@/lib/og/images";

/** Spanish home page card, and the fallback for Spanish pages without one. */
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "GuitarTunePro — afinador de guitarra online";

export default function Image() {
  return tunerOgImage("/", "es");
}
