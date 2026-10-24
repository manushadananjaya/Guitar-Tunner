import { OG_CONTENT_TYPE, OG_SIZE, tuningsOgImage } from "@/lib/og/images";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Guitar tunings chart with notes and frequencies — GuitarTunePro";

export default function Image() {
  return tuningsOgImage();
}
