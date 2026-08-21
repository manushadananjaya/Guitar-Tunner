/** Registry of the dedicated instrument tuner landing pages.
 *  Companion to TUNER_PAGES (which covers 6-string guitar tunings). Drives the
 *  sitemap, the navbar, the homepage grid, and each page's cross-links. */

export interface InstrumentPageEntry {
  href: string;
  label: string;
  /** Key in GUITAR_TYPES. */
  guitarType: string;
  /** Notes low to high, for menu subtitles. */
  notes: string;
  /** One-line description for homepage cards. */
  blurb: string;
}

export const INSTRUMENT_PAGES: InstrumentPageEntry[] = [
  {
    href: "/bass-tuner",
    label: "Bass",
    guitarType: "bass",
    notes: "E A D G",
    blurb:
      "Standard 4-string bass tuning, an octave below the guitar's bottom four strings.",
  },
  {
    href: "/5-string-bass-tuner",
    label: "5-String Bass",
    guitarType: "fiveStringBass",
    notes: "B E A D G",
    blurb:
      "Adds a low B below standard bass tuning, down to 30.87 Hz.",
  },
  {
    href: "/ukulele-tuner",
    label: "Ukulele",
    guitarType: "ukulele",
    notes: "G C E A",
    blurb:
      "Standard reentrant GCEA tuning for soprano, concert, and tenor ukulele.",
  },
  {
    href: "/7-string-guitar-tuner",
    label: "7-String Guitar",
    guitarType: "sevenString",
    notes: "B E A D G B E",
    blurb:
      "Standard tuning plus a low B string — the extended-range metal standard.",
  },
  {
    href: "/12-string-guitar-tuner",
    label: "12-String Guitar",
    guitarType: "twelveString",
    notes: "EE AA DD GG BB EE",
    blurb:
      "Six courses of paired strings, four of them tuned in octaves. Chiming and full.",
  },
];

/** Cross-links for one instrument page: every sibling except itself. */
export function otherInstrumentsFor(href: string) {
  return INSTRUMENT_PAGES.filter((page) => page.href !== href).map((page) => ({
    label: `${page.label} Tuner`,
    href: page.href,
  }));
}
