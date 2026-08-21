import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Offline",
  description: "You are offline. The tuner, metronome, and chords still work.",
  robots: { index: false, follow: false },
};

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-canvas text-ink flex items-center justify-center px-5">
      <div className="max-w-md text-center">
        <h1 className="text-3xl font-bold text-ink mb-3">You&apos;re offline</h1>
        <p className="text-ink-muted leading-relaxed mb-8">
          This page isn&apos;t cached yet. The tools below were saved the last
          time you visited and work without a connection — the tuner and
          metronome run entirely on your device.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-full bg-brass px-6 py-3 text-sm font-bold text-brass-contrast hover:bg-brass-hover transition-colors"
          >
            Guitar Tuner
          </Link>
          <Link
            href="/metronome"
            className="rounded-full border border-line-strong bg-surface/60 px-6 py-3 text-sm font-bold text-ink hover:border-brass/50 hover:text-brass transition-colors"
          >
            Metronome
          </Link>
          <Link
            href="/chords"
            className="rounded-full border border-line-strong bg-surface/60 px-6 py-3 text-sm font-bold text-ink hover:border-brass/50 hover:text-brass transition-colors"
          >
            Chords
          </Link>
        </div>
      </div>
    </div>
  );
}
