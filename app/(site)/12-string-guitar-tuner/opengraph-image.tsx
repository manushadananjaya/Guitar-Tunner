import { OG_CONTENT_TYPE, OG_SIZE, tunerOgAlt, tunerOgImage } from "@/lib/og/images";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = tunerOgAlt("/12-string-guitar-tuner");

export default function Image() {
  return tunerOgImage("/12-string-guitar-tuner");
}
