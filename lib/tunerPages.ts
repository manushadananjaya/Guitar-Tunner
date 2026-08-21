/** Registry of the dedicated tuner landing pages.
 *  Single source of truth for the sitemap, the nav, and the cross-links each
 *  tuner page renders, so those three can never drift apart. */

export interface TunerPageEntry {
  /** URL path, also the sitemap entry. */
  href: string;
  /** Short label for nav chips and cross-links. */
  label: string;
  /** Preset key in TUNING_PRESETS. */
  tuning: string;
  /** Notes low to high, for menu subtitles. */
  notes: string;
  /** One-line description for homepage cards. */
  blurb: string;
}

export const TUNER_PAGES: TunerPageEntry[] = [
  {
    href: "/drop-d-tuner",
    label: "Drop D",
    tuning: "dropD",
    notes: "D A D G B E",
    blurb:
      "Lower your 6th string to D for one-finger power chords — the rock and metal staple.",
  },
  {
    href: "/drop-c-tuner",
    label: "Drop C",
    tuning: "dropC",
    notes: "C G C F A D",
    blurb:
      "Drop D's heavier cousin, two semitones lower. The metalcore and hardcore standard.",
  },
  {
    href: "/dadgad-tuner",
    label: "DADGAD",
    tuning: "dadgad",
    notes: "D A D G A D",
    blurb:
      "The Celtic tuning — an open Dsus4 that suits modal folk and fingerstyle.",
  },
  {
    href: "/open-g-tuner",
    label: "Open G",
    tuning: "openG",
    notes: "D G D G B D",
    blurb:
      "Keith Richards' signature tuning for blues, folk, and slide guitar.",
  },
  {
    href: "/open-d-tuner",
    label: "Open D",
    tuning: "openD",
    notes: "D A D F♯ A D",
    blurb:
      "Deep and resonant — the Delta blues slide tuning, also called Vestapol.",
  },
  {
    href: "/open-e-tuner",
    label: "Open E",
    tuning: "openE",
    notes: "E B E G♯ B E",
    blurb:
      "Bright electric slide tuning used by Duane Allman and Derek Trucks.",
  },
  {
    href: "/open-c-tuner",
    label: "Open C",
    tuning: "openC",
    notes: "C G C G C E",
    blurb:
      "The deepest open tuning — huge, piano-like resonance for solo fingerstyle.",
  },
  {
    href: "/open-a-tuner",
    label: "Open A",
    tuning: "openA",
    notes: "E A E A C♯ E",
    blurb: "Tight, bright slide tuning built around the classic blues key of A.",
  },
  {
    href: "/half-step-down-tuner",
    label: "Half Step Down",
    tuning: "halfStepDown",
    notes: "E♭ A♭ D♭ G♭ B♭ E♭",
    blurb:
      "Every string down a semitone — Hendrix, SRV, and Guns N' Roses. Shapes unchanged.",
  },
  {
    href: "/full-step-down-tuner",
    label: "Full Step Down",
    tuning: "fullStepDown",
    notes: "D G C F A D",
    blurb:
      "D standard — all six strings down a whole step for weight without new shapes.",
  },
];

/** Cross-links for one tuner page: every sibling except itself. */
export function otherTunersFor(href: string) {
  return TUNER_PAGES.filter((page) => page.href !== href).map((page) => ({
    label: `${page.label} Tuner`,
    href: page.href,
  }));
}
