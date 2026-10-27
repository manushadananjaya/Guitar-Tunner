import { OG_CONTENT_TYPE, OG_SIZE, toolOgAlt, toolOgImage } from "@/lib/og/images";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = toolOgAlt("/fret-calculator");

export default function Image() {
  return toolOgImage("/fret-calculator");
}
