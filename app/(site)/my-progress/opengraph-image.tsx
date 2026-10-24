import { OG_CONTENT_TYPE, OG_SIZE, progressOgImage } from "@/lib/og/images";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Your GuitarTunePro progress — GuitarTunePro";

export default function Image() {
  return progressOgImage();
}
