"use client";

import { usePathname } from "next/navigation";
import { NotFoundContent } from "@/components/NotFoundContent";
import { localeOfPath } from "@/lib/i18n/pages";

// not-found.tsx receives no params, so read the language from the URL.
export default function NotFound() {
  return <NotFoundContent locale={localeOfPath(usePathname() ?? "/")} />;
}
