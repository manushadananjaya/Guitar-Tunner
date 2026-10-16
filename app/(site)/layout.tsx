import { RootShell } from "@/components/RootShell";
import { siteMetadata, siteViewport } from "@/lib/siteMetadata";

export const metadata = siteMetadata;
export const viewport = siteViewport;

/** Root layout for the English site. */
export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <RootShell lang="en">{children}</RootShell>;
}
