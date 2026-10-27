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
    href: "/beginner-guitar-course",
    label: "30-Day Beginner Course",
    tagline: "15 minutes a day",
    blurb:
      "From tuning up to playing a whole song in 30 short lessons — chords, strumming, power chords and the blues, with every tool preset for the lesson.",
  },
  {
    href: "/daily-challenge",
    label: "Daily Challenge",
    tagline: "5 questions a day",
    blurb:
      "Two intervals, two chord types and a fretboard note — the same five for everyone today, one try each. Keep a streak and share your score.",
  },
  {
    href: "/practice-routine",
    label: "Practice Routine",
    tagline: "Daily plan & streaks",
    blurb:
      "A timed 10, 20 or 30 minute routine with a new chord pair, scale and strumming pattern every day — and a streak and calendar to keep you coming back.",
  },
  {
    href: "/chords",
    label: "Chord Library",
    tagline: "Diagrams & audio",
    blurb:
      "Diagrams and audio for major, minor, 7th, sus, diminished and augmented chords in every key — every shape checked against chord theory before it ships.",
  },
  {
    href: "/ukulele-chords",
    label: "Ukulele Chords",
    tagline: "GCEA, every key",
    blurb:
      "Major, minor, 7th, sus and more on ukulele in every key — the easiest shape first, with audio and the baritone shape for each.",
  },
  {
    href: "/chord-finder",
    label: "Chord Finder",
    tagline: "Name any shape",
    blurb:
      "Tap the frets you are holding and find out what chord it is — in standard or any alternate tuning, with slash chords and inversions named correctly.",
  },
  {
    href: "/chord-transposer",
    label: "Chord Transposer",
    tagline: "Change a song's key",
    blurb:
      "Paste a chord sheet and move it to any key. Chords stay lined up over the lyrics, sharps and flats follow the new key, and every chord comes with a diagram.",
  },
  {
    href: "/capo-calculator",
    label: "Capo Calculator",
    tagline: "Easiest capo fret",
    blurb:
      "Type a song's chords and see which capo position turns them into open shapes — or work out what key you are really in with the capo on.",
  },
  {
    href: "/chord-progressions",
    label: "Chord Progressions",
    tagline: "Build & loop a backing track",
    blurb:
      "Build a progression in any key or start from a classic — pop, 12-bar blues, ii–V–I — then loop it as a backing track to practise over.",
  },
  {
    href: "/scales",
    label: "Scale Explorer",
    tagline: "Every scale, every key",
    blurb:
      "Pentatonic, blues, major, minor and the modes on the whole fretboard, in any key and tuning — with positions, playback, and a drone to improvise over.",
  },
  {
    href: "/key-finder",
    label: "Key Finder",
    tagline: "What key is this song in?",
    blurb:
      "Play or sing a song into the microphone, or type its chords, and see the key it is in — with the relative key and the scale to solo over.",
  },
  {
    href: "/circle-of-fifths",
    label: "Circle of Fifths",
    tagline: "Keys & their chords",
    blurb:
      "Click any key to see its signature, scale, relative minor and the chords that belong to it — and hear them on a guitar tone.",
  },
  {
    href: "/fretboard-trainer",
    label: "Fretboard Trainer",
    tagline: "Learn the neck",
    blurb:
      "Name the note at a fret or find a note on a string. Short quizzes with streaks, answer times, and accuracy tracked for each string.",
  },
  {
    href: "/ear-training",
    label: "Ear Training",
    tagline: "Intervals & chords",
    blurb:
      "Hear an interval or a chord, name it, and track your streak. Short rounds you can do every day, played on a guitar-like tone rather than a beep.",
  },
  {
    href: "/rhythm-trainer",
    label: "Rhythm Trainer",
    tagline: "Timing, in milliseconds",
    blurb:
      "Tap along to ten rhythms, from quarter notes to clave, and see how early or late every note was — with calibration for your speakers or headphones.",
  },
  {
    href: "/strumming-patterns",
    label: "Strumming Patterns",
    tagline: "Play-along trainer",
    blurb:
      "Twelve strumming patterns from four downs to sixteenth-note funk, strummed over real chords at any tempo with every stroke highlighted as it lands.",
  },
  {
    href: "/metronome",
    label: "Metronome",
    tagline: "Tap tempo, 30–300 BPM",
    blurb:
      "Set a tempo from 30 to 300 BPM, tap the beat you want, and practise against sample-accurate timing — with time signatures, subdivisions, and an accented downbeat.",
  },
  {
    href: "/tone-generator",
    label: "Tone Generator",
    tagline: "Any frequency, any note",
    blurb:
      "Play a steady sine, square, triangle or sawtooth tone from 20 Hz to 20 kHz, or pick a note at any concert pitch — and share a link to it.",
  },
  {
    href: "/drone-generator",
    label: "Drone Generator",
    tagline: "A drone in any key",
    blurb:
      "A steady drone or a tanpura-style plucked cycle in any key, at any concert pitch — to practise intonation, scales and improvisation against.",
  },
  {
    href: "/note-frequency-chart",
    label: "Note Frequency Chart",
    tagline: "Every note in Hz",
    blurb:
      "The frequency of every note from C0 to B8, at 440 Hz or any concert pitch. Tap a note to hear it, or type a frequency to name the note.",
  },
  {
    href: "/vocal-pitch-detector",
    label: "Vocal Pitch Detector",
    tagline: "Sing, see the note",
    blurb:
      "Sing or hum and see the note, the frequency, and how many cents sharp or flat you are — in real time. Includes a scrolling pitch graph and a vocal range finder.",
  },
  {
    href: "/strobe-tuner",
    label: "Strobe Tuner",
    tagline: "Bands stop when in tune",
    blurb:
      "A chromatic strobe-style display: bands drift left when you are flat, right when you are sharp, and stand still when the note is right.",
  },
  {
    href: "/intonation-checker",
    label: "Intonation Checker",
    tagline: "Set up your saddles",
    blurb:
      "Compare the 12th-fret harmonic with the fretted note on each string through your mic, and find out which way to move each saddle.",
  },
  {
    href: "/string-tension-calculator",
    label: "String Tension",
    tagline: "Gauge & tuning",
    blurb:
      "See how much tension each string carries in any tuning and scale length, and which gauges would restore normal feel when you tune down.",
  },
  {
    href: "/fret-calculator",
    label: "Fret Calculator",
    tagline: "Fret positions for any scale",
    blurb:
      "Exact fret positions for any scale length, in inches or millimetres — from the nut, between frets and to the bridge, ready to copy for a build.",
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
