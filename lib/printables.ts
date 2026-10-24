/** Registry of the printable sheets: drives the hub page, each sheet's
 *  route and metadata, the sitemap, and the cross-links between sheets. */

export interface PrintableSheet {
  slug: string;
  /** Card and breadcrumb label. */
  label: string;
  /** H1. */
  title: string;
  /** ≤ 46 characters — the layout appends " | GuitarTunePro". */
  metaTitle: string;
  /** ≤ 160 characters. */
  metaDescription: string;
  /** One line for the hub card. */
  blurb: string;
  orientation: "portrait" | "landscape";
  /** Sections under the sheet; paragraphs may contain plain text only. */
  sections: { heading: string; paragraphs: string[] }[];
  /** Tool or article that goes with the sheet. */
  related: { label: string; href: string }[];
}

export const PRINTABLE_SHEETS: PrintableSheet[] = [
  {
    slug: "guitar-chord-chart",
    label: "Guitar chord chart",
    title: "Printable Guitar Chord Chart",
    metaTitle: "Printable Guitar Chord Chart (24 Chords)",
    metaDescription:
      "Free printable guitar chord chart: 24 essential chords — major, minor, 7th, maj7 and sus — on one page, with the notes in each. A4 and US Letter.",
    blurb: "24 essential open chords on one page: major, minor, 7th, maj7 and sus.",
    orientation: "portrait",
    sections: [
      {
        heading: "What's on the Chart",
        paragraphs: [
          "Four rows of six: the six major chords most songs use (C, D, E, F, G, A), six minor and minor-seventh chords, six dominant sevenths for blues and country, and six major-seventh and suspended chords for colour. Every diagram is the easiest common shape — open position wherever one exists — and the notes of the chord are printed underneath.",
          "Read each diagram as the guitar faces you: the thickest string on the left, the nut at the top. An x above a string means do not play it, an o means play it open, and a number beside the diagram is the fret it starts on.",
        ],
      },
      {
        heading: "How to Use It",
        paragraphs: [
          "Pin it where you practise and learn one row at a time. Within a row, practise changing between pairs of chords that share fingers — Am and C, E and Em, D and A — before chords that move every finger. F is the only full barre chord on the sheet; if it will not ring yet, use Fmaj7 from the bottom row in its place.",
          "Every chord on the chart has its own page in the chord library with more voicings and audio, so you can hear what it should sound like before you print.",
        ],
      },
    ],
    related: [
      { label: "Chord library", href: "/chords" },
      { label: "30-day beginner course", href: "/beginner-guitar-course" },
      { label: "Chord finder", href: "/chord-finder" },
    ],
  },
  {
    slug: "major-minor-chords",
    label: "Major & minor chords, every key",
    title: "Printable Major and Minor Chords in Every Key",
    metaTitle: "Major and Minor Guitar Chords, Every Key",
    metaDescription:
      "Free printable chart of all 24 major and minor guitar chords, one for every key, in the easiest common shape. Fits A4 and US Letter.",
    blurb: "All 12 major and 12 minor chords, one sheet, easiest shape for each.",
    orientation: "portrait",
    sections: [
      {
        heading: "Every Key on One Page",
        paragraphs: [
          "The top half has the twelve major chords, from C through B; the bottom half has their twelve minors. Where an open shape exists it is used. The rest are barre chords, and the number beside the diagram tells you which fret the shape starts on.",
          "Chords with two names — C♯ and D♭, F♯ and G♭ — are listed under the name most songs use. A G♯ minor is the same chord as an A♭ minor, so if a chord sheet uses the other name, the diagram is still right.",
        ],
      },
      {
        heading: "Learning the Barre Shapes",
        paragraphs: [
          "Most of the non-open chords here are one of two movable shapes: the E-shape barre with its root on the 6th string, or the A-shape barre with its root on the 5th. Learn F and B♭, and Fm and B♭m, and you have the patterns for nearly every chord on the sheet. The fretboard notes chart shows where each root note sits.",
        ],
      },
    ],
    related: [
      { label: "Chord library", href: "/chords" },
      { label: "Capo calculator", href: "/capo-calculator" },
      { label: "Circle of fifths", href: "/circle-of-fifths" },
    ],
  },
  {
    slug: "fretboard-notes-chart",
    label: "Fretboard notes chart",
    title: "Printable Guitar Fretboard Notes Chart",
    metaTitle: "Printable Guitar Fretboard Notes Chart",
    metaDescription:
      "Free printable guitar fretboard chart: every note on every string from the open position to the 12th fret, in standard tuning. Landscape, A4 or Letter.",
    blurb: "Every note on all six strings, frets 0–12, in standard tuning.",
    orientation: "landscape",
    sections: [
      {
        heading: "Reading the Chart",
        paragraphs: [
          "The chart shows the neck as you see it looking down at the guitar while you play: the high E string at the top, the low E at the bottom, and the frets numbered along the bottom edge. Natural notes are in black; sharps and flats, which have two names each, are in white.",
          "Above the 12th fret the whole pattern repeats an octave higher, so fret 13 is fret 1 again, fret 15 is fret 3, and so on.",
        ],
      },
      {
        heading: "How to Learn It",
        paragraphs: [
          "Do not try to memorise all 72 positions at once. Start with the natural notes on the low E and A strings — they are the root notes of every power chord and barre chord — then use the octave shapes printed on the sheet to find the same notes on the higher strings. Five minutes a day with the fretboard trainer, quizzing yourself against this sheet, is enough to know the neck within a few weeks.",
        ],
      },
    ],
    related: [
      { label: "Fretboard trainer", href: "/fretboard-trainer" },
      { label: "Fretboard notes guide", href: "/articles/guitar-fretboard-notes-map" },
      { label: "Guitar tunings chart", href: "/tunings" },
    ],
  },
  {
    slug: "pentatonic-scale-chart",
    label: "Pentatonic scale chart",
    title: "Printable Minor Pentatonic Scale Chart",
    metaTitle: "Printable Pentatonic Scale Guitar Chart",
    metaDescription:
      "Free printable minor pentatonic scale chart for guitar: A minor pentatonic across the whole neck, the five box positions, and how to move it to any key.",
    blurb: "A minor pentatonic across the whole neck, with its five boxes.",
    orientation: "landscape",
    sections: [
      {
        heading: "One Scale, Five Boxes",
        paragraphs: [
          "The minor pentatonic is the scale behind most rock and blues solos: five notes, no awkward half-steps, and patterns that sit comfortably under the fingers. The chart shows A minor pentatonic — A, C, D, E and G — everywhere it falls from the open strings to the 17th fret, with every A marked in black so you can see where each pattern is anchored.",
          "Players learn it as five overlapping boxes. Box 1, starting at the 5th fret, is the one nearly everyone learns first; the other four join it into a map of the whole neck.",
        ],
      },
      {
        heading: "Using It in Other Keys",
        paragraphs: [
          "The pattern is movable. Slide everything so a root sits on your key's note on the low E string and the boxes come with it — the sheet lists where the common keys start. The same five notes are also C major pentatonic, so the chart doubles as a major-scale reference for brighter, country-style lines.",
        ],
      },
    ],
    related: [
      { label: "Scale explorer", href: "/scales?root=a&scale=minor-pentatonic" },
      { label: "Backing loops", href: "/chord-progressions" },
      { label: "30-day beginner course", href: "/beginner-guitar-course" },
    ],
  },
  {
    slug: "blank-guitar-tab",
    label: "Blank guitar tab paper",
    title: "Printable Blank Guitar Tab Paper",
    metaTitle: "Printable Blank Guitar Tab Sheets",
    metaDescription:
      "Free printable blank guitar tab paper: nine six-line tab staves per page, with space for the song, artist and tuning. A4 and US Letter.",
    blurb: "Nine six-line staves per page, with song, artist and tuning lines.",
    orientation: "portrait",
    sections: [
      {
        heading: "Writing Tab",
        paragraphs: [
          "Each staff has six lines, one per string, with the thinnest string (high e) at the top — the same as every tab you will read online. Write the fret number on the line for the string you play it on; a 0 means the open string. Numbers stacked vertically are played together, as a chord.",
          "Tab does not show rhythm on its own, so it helps to space numbers by how long each note lasts, or to write the count (1 & 2 &) above the staff. The tuning line at the top is worth filling in — a riff written in Drop D makes no sense played in standard.",
        ],
      },
    ],
    related: [
      { label: "How to read guitar tabs", href: "/articles/how-to-read-guitar-tabs" },
      { label: "Guitar tunings chart", href: "/tunings" },
      { label: "Chord transposer", href: "/chord-transposer" },
    ],
  },
  {
    slug: "blank-chord-diagrams",
    label: "Blank chord diagrams",
    title: "Printable Blank Guitar Chord Diagrams",
    metaTitle: "Printable Blank Guitar Chord Charts",
    metaDescription:
      "Free printable blank guitar chord diagram sheet: 30 empty chord boxes with name lines, for writing down chords, shapes and songs. A4 and US Letter.",
    blurb: "30 empty chord boxes with name lines, for songs and lessons.",
    orientation: "portrait",
    sections: [
      {
        heading: "Filling In a Chord Box",
        paragraphs: [
          "Each box is six strings (thickest on the left) by five frets, with the nut drawn as the thick top line. Write the chord name on the line above, draw a dot where each finger goes, an x above any string you should not play, and an o above open strings. For a shape higher up the neck, write the starting fret number beside the top fret.",
          "Teachers use these to hand students the chords for a song; players use them to write down shapes they find with the chord finder or in an alternate tuning.",
        ],
      },
    ],
    related: [
      { label: "Chord finder", href: "/chord-finder" },
      { label: "Chord library", href: "/chords" },
      { label: "Chord progressions", href: "/chord-progressions" },
    ],
  },
];

export const getPrintableSheet = (slug: string) => PRINTABLE_SHEETS.find((s) => s.slug === slug);
