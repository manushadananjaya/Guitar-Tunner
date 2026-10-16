import { RootShell } from "@/components/RootShell";
import { siteMetadata, siteViewport } from "@/lib/siteMetadata";

export const metadata = siteMetadata;
export const viewport = siteViewport;

/** Root layout for the Spanish pages, so they render <html lang="es">. */
export default function SpanishLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <RootShell lang="es">{children}</RootShell>;
}
