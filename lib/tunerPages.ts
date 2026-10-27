/** Registry of the dedicated tuner landing pages.
 *  Single source of truth for the sitemap, the nav, and the cross-links each
 *  tuner page renders, so those three can never drift apart. */

export interface TunerPageEntry {
  /** URL path, also the sitemap entry. */
  href: string;
  /** Short label for nav chips and cross-links. */
  label: string;
  /** Preset key in TUNING_PRESETS, or in INSTRUMENT_TUNINGS when
   *  `guitarType` is set. */
  tuning: string;
  /** Key in GUITAR_TYPES, for a tuning of another instrument (Drop A on a
   *  7-string, Drop D on bass). Omitted means 6-string guitar. */
  guitarType?: string;
  /** Notes low to high, for menu subtitles. */
  notes: string;
  /** One-line description for homepage cards. */
  blurb: string;
  /** Concert pitch, when the page is about pitch rather than tuning. */
  reference?: number;
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
    href: "/drop-c-sharp-tuner",
    label: "Drop C♯",
    tuning: "dropCSharp",
    notes: "C♯ G♯ C♯ F♯ A♯ D♯",
    blurb:
      "Drop D a half step down — the drop tuning for bands that play in E♭. Also called Drop D♭.",
  },
  {
    href: "/drop-b-tuner",
    label: "Drop B",
    tuning: "dropB",
    notes: "B F♯ B E G♯ C♯",
    blurb:
      "The low-tuned metal standard on six strings: Drop D's shape, three semitones lower.",
  },
  {
    href: "/drop-a-tuner",
    label: "Drop A",
    tuning: "dropA",
    guitarType: "sevenString",
    notes: "A E A D G B E",
    blurb:
      "The 7-string drop tuning: low B down to A for one-finger power chords at the bottom of the range.",
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
  {
    href: "/c-standard-tuner",
    label: "C Standard",
    tuning: "cStandard",
    notes: "C F B♭ E♭ G C",
    blurb:
      "Every string down two whole steps. Standard shapes, a low C, and a much heavier sound.",
  },
  {
    href: "/b-standard-tuner",
    label: "B Standard",
    tuning: "bStandard",
    notes: "B E A D F♯ B",
    blurb:
      "Standard tuning a fourth lower — the usual tuning of a baritone guitar, with every chord shape unchanged.",
  },
  {
    href: "/nashville-tuner",
    label: "Nashville",
    tuning: "nashville",
    notes: "E3 A3 D4 G4 B3 E4",
    blurb:
      "High-strung tuning: the 12-string's octave strings on a six-string, for a bright, shimmering layer.",
  },
  {
    href: "/432-hz-tuner",
    label: "432 Hz",
    tuning: "standard",
    notes: "A = 432 Hz",
    reference: 432,
    blurb:
      "Standard tuning about a third of a semitone lower, with A at 432 Hz instead of 440.",
  },
  {
    href: "/drop-d-bass-tuner",
    label: "Drop D Bass",
    tuning: "bassDropD",
    guitarType: "bass",
    notes: "D A D G",
    blurb:
      "Bass E string down to D1 — the bass half of every Drop D riff, and a lower note on a 4-string.",
  },
  {
    href: "/low-g-ukulele-tuner",
    label: "Low G Ukulele",
    tuning: "lowG",
    guitarType: "ukulele",
    notes: "G3 C4 E4 A4",
    blurb:
      "Linear GCEA with the G an octave down — a fuller, deeper ukulele with a real bass note.",
  },
];

/** Cross-links for one tuner page: every sibling except itself. */
export function otherTunersFor(href: string) {
  return TUNER_PAGES.filter((page) => page.href !== href).map((page) => ({
    label: `${page.label} Tuner`,
    href: page.href,
  }));
}
