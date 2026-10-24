import { OG_CONTENT_TYPE, OG_SIZE, tunerOgImage } from "@/lib/og/images";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "GuitarTunePro — afinador online";

export default function Image() {
  return tunerOgImage("/violin-tuner", "es");
}
