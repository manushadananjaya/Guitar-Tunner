"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 rounded-full bg-brass px-6 py-2.5 text-sm font-bold text-brass-contrast hover:bg-brass-hover transition-colors"
    >
      <Printer className="h-4 w-4" />
      Print this sheet
    </button>
  );
}
