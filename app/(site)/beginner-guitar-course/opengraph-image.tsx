import { OG_CONTENT_TYPE, OG_SIZE, courseOgImage } from "@/lib/og/images";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Free 30-day beginner guitar course — GuitarTunePro";

export default function Image() {
  return courseOgImage();
}
