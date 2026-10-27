import { OG_CONTENT_TYPE, OG_SIZE, artistTuningsOgImage } from "@/lib/og/images";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Guitar tunings by band and artist — GuitarTunePro";

export default function Image() {
  return artistTuningsOgImage();
}
