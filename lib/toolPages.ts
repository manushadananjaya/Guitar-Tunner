/** Registry of the standalone tools that are not tuners.
 *  Drives the navbar "Tools" menu, the footer, the sitemap, and the
 *  cross-links each tool page renders — one list, so they cannot drift. */

export interface ToolPageEntry {
  href: string;
  label: string;
  /** Short subtitle for menus. */
  tagline: string;
  /** One-paragraph description for homepage cards. */
  blurb: string;
}

export const TOOL_PAGES: ToolPageEntry[] = [
  {
    href: "/chords",
    label: "Chord Library",
    tagline: "Diagrams & audio",
    blurb:
      "Diagrams and audio for major, minor, 7th, sus, diminished and augmented chords in every key — every shape checked against chord theory before it ships.",
  },
  {
    href: "/chord-finder",
    label: "Chord Finder",
    tagline: "Name any shape",
    blurb:
      "Tap the frets you are holding and find out what chord it is — in standard or any alternate tuning, with slash chords and inversions named correctly.",
  },
  {
    href: "/ear-training",
    label: "Ear Training",
    tagline: "Intervals & chords",
    blurb:
      "Hear an interval or a chord, name it, and track your streak. Short rounds you can do every day, played on a guitar-like tone rather than a beep.",
  },
  {
    href: "/string-tension-calculator",
    label: "String Tension",
    tagline: "Gauge & tuning",
    blurb:
      "See how much tension each string carries in any tuning and scale length, and which gauges would restore normal feel when you tune down.",
  },
  {
    href: "/metronome",
    label: "Metronome",
    tagline: "Tap tempo, 30–300 BPM",
    blurb:
      "Set a tempo from 30 to 300 BPM, tap the beat you want, and practise against sample-accurate timing — with time signatures, subdivisions, and an accented downbeat.",
  },
  {
    href: "/vocal-pitch-detector",
    label: "Vocal Pitch Detector",
    tagline: "Sing, see the note",
    blurb:
      "Sing or hum and see the note, the frequency, and how many cents sharp or flat you are — in real time. Includes a scrolling pitch graph and a vocal range finder.",
  },
];

/** Cross-links for a tool page: every other tool, plus the main tuner. */
export const otherToolLinks = (currentHref: string) => [
  { label: "Guitar Tuner", href: "/" },
  ...TOOL_PAGES.filter((tool) => tool.href !== currentHref).map((tool) => ({
    label: tool.label,
    href: tool.href,
  })),
];
