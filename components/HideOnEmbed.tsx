"use client";

import { usePathname } from "next/navigation";

/** Renders its children everywhere except the bare /embed/* widget pages,
 *  which live inside other people's sites. The navbar and footer would
 *  crowd a small iframe, and AdSense does not allow ads to be served inside
 *  a frame on someone else's page. */
export function HideOnEmbed({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/embed/")) return null;
  return <>{children}</>;
}
