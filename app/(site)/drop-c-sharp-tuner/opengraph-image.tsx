import { OG_CONTENT_TYPE, OG_SIZE, tunerOgAlt, tunerOgImage } from "@/lib/og/images";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = tunerOgAlt("/drop-c-sharp-tuner");

export default function Image() {
  return tunerOgImage("/drop-c-sharp-tuner");
}
