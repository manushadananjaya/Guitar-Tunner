import { OG_CONTENT_TYPE, OG_SIZE, tunerOgAlt, tunerOgImage } from "@/lib/og/images";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = tunerOgAlt("/low-g-ukulele-tuner");

export default function Image() {
  return tunerOgImage("/low-g-ukulele-tuner");
}
