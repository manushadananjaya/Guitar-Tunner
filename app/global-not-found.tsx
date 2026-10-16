import type { Metadata } from "next";
import { RootShell } from "@/components/RootShell";
import { NotFoundContent } from "@/components/NotFoundContent";

// The site has three root layouts (English, /es, /[lang]), so a URL that
// matches no route at all has no layout to render inside. This page is that
// fallback; it brings its own document via RootShell.
export const metadata: Metadata = {
  title: "Page Not Found | GuitarTunePro",
  robots: { index: false, follow: true },
};

export default function GlobalNotFound() {
  return (
    <RootShell lang="en">
      <NotFoundContent locale="en" />
    </RootShell>
  );
}
