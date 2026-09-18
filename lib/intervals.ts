/** Interval names, shared by the chord finder and the ear trainer. */

export interface Interval {
  semitones: number;
  /** e.g. "Perfect 5th". */
  name: string;
  /** e.g. "P5". */
  short: string;
  /** A tune whose first two notes are this interval, ascending. A well-worn
   *  ear-training crutch, and it works. */
  ascendingCue: string;
  descendingCue: string;
}

export const INTERVALS: Interval[] = [
  { semitones: 0, name: "Unison", short: "P1", ascendingCue: "the same note twice", descendingCue: "the same note twice" },
  { semitones: 1, name: "Minor 2nd", short: "m2", ascendingCue: "Jaws theme", descendingCue: "Für Elise (opening)" },
  { semitones: 2, name: "Major 2nd", short: "M2", ascendingCue: "Happy Birthday", descendingCue: "Mary Had a Little Lamb" },
  { semitones: 3, name: "Minor 3rd", short: "m3", ascendingCue: "Greensleeves", descendingCue: "Hey Jude" },
  { semitones: 4, name: "Major 3rd", short: "M3", ascendingCue: "When the Saints Go Marching In", descendingCue: "Swing Low, Sweet Chariot" },
  { semitones: 5, name: "Perfect 4th", short: "P4", ascendingCue: "Here Comes the Bride", descendingCue: "Eine kleine Nachtmusik" },
  { semitones: 6, name: "Tritone", short: "TT", ascendingCue: "The Simpsons theme", descendingCue: "the same, falling" },
  { semitones: 7, name: "Perfect 5th", short: "P5", ascendingCue: "Twinkle, Twinkle / Star Wars", descendingCue: "Flintstones theme" },
  { semitones: 8, name: "Minor 6th", short: "m6", ascendingCue: "The Entertainer (3rd–4th notes)", descendingCue: "Love Story theme" },
  { semitones: 9, name: "Major 6th", short: "M6", ascendingCue: "My Bonnie Lies Over the Ocean", descendingCue: "Nobody Knows the Trouble I've Seen" },
  { semitones: 10, name: "Minor 7th", short: "m7", ascendingCue: "Somewhere (West Side Story)", descendingCue: "Watermelon Man" },
  { semitones: 11, name: "Major 7th", short: "M7", ascendingCue: "Take On Me (chorus)", descendingCue: "I Love You (Cole Porter)" },
  { semitones: 12, name: "Octave", short: "P8", ascendingCue: "Somewhere Over the Rainbow", descendingCue: "Willow Weep for Me" },
];

export const intervalBySemitones = (semitones: number) =>
  INTERVALS.find((interval) => interval.semitones === semitones);
