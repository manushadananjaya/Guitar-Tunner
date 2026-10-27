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
  {
    href: "/baritone-ukulele-tuner",
    label: "Baritone Ukulele",
    guitarType: "baritoneUkulele",
    notes: "D G B E",
    blurb:
      "Linear DGBE tuning — the same as a guitar's top four strings, not GCEA.",
  },
  {
    href: "/mandolin-tuner",
    label: "Mandolin",
    guitarType: "mandolin",
    notes: "GG DD AA EE",
    blurb:
      "Four unison pairs tuned in fifths, the same notes as a violin.",
  },
  {
    href: "/banjo-tuner",
    label: "Banjo",
    guitarType: "banjo",
    notes: "g D G B D",
    blurb:
      "5-string banjo in open G, with the short high 5th string that drones over everything.",
  },
  {
    href: "/violin-tuner",
    label: "Violin",
    guitarType: "violin",
    notes: "G D A E",
    blurb:
      "Tune in fifths from the A, with pegs for big moves and fine tuners for the last few cents.",
  },
  {
    href: "/viola-tuner",
    label: "Viola",
    guitarType: "viola",
    notes: "C G D A",
    blurb:
      "A fifth below the violin. Shares the violin's top three strings and adds a low C.",
  },
  {
    href: "/cello-tuner",
    label: "Cello",
    guitarType: "cello",
    notes: "C G D A",
    blurb:
      "The viola's strings an octave lower, down to C2 at 65.41 Hz.",
  },
  {
    href: "/double-bass-tuner",
    label: "Double Bass",
    guitarType: "doubleBass",
    notes: "E A D G",
    blurb:
      "Upright bass in orchestral tuning, in fourths down to E1 — tune with harmonics for the cleanest read.",
  },
  {
    href: "/cavaquinho-tuner",
    label: "Cavaquinho",
    guitarType: "cavaquinho",
    notes: "D G B D",
    blurb:
      "The four-string voice of samba, pagode and choro, in the standard Brazilian D G B D.",
  },
];

/** Cross-links for one instrument page: every sibling except itself. */
export function otherInstrumentsFor(href: string) {
  return INSTRUMENT_PAGES.filter((page) => page.href !== href).map((page) => ({
    label: `${page.label} Tuner`,
    href: page.href,
  }));
}
