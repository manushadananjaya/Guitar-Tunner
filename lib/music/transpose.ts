/** Chord-symbol parsing, transposition, key guessing, and capo scoring —
 *  shared by the chord transposer and the capo calculator. */

import {
  diatonicChords,
  keyScale,
  spellingsFor,
  spellingName,
  spellingAscii,
  type KeyMode,
  type Spelling,
} from './scales';

const LETTER_PITCH: Record<string, number> = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
const mod12 = (n: number) => ((n % 12) + 12) % 12;

const ACCIDENTAL_VALUE: Record<string, number> = { '#': 1, '♯': 1, b: -1, '♭': -1, '##': 2, bb: -2 };

/** Everything that may follow a root in a chord symbol. Deliberately strict:
 *  a lyric word such as "Be" or "Am I" must not parse as a chord. */
const SUFFIX_RE = /^(?:maj|min|dim|aug|sus|add|m|M|°|ø|\+|-|\d|\(|\)|#|b|♯|♭|,|Δ|alt)*$/;
const CHORD_RE = /^([A-G])(##|bb|#|b|♯|♭)?([^/\s]*)(?:\/([A-G])(#|b|♯|♭)?)?$/;

export interface ParsedChord {
  rootPitch: number;
  /** Everything after the root, untouched: "m7", "sus4", "add9" ... */
  suffix: string;
  bassPitch: number | null;
  /** The text as it was written. */
  source: string;
}

export function parseChord(token: string): ParsedChord | null {
  const match = CHORD_RE.exec(token.trim());
  if (!match) return null;
  const [, letter, acc, suffix, bassLetter, bassAcc] = match;
  if (!SUFFIX_RE.test(suffix)) return null;
  return {
    rootPitch: mod12(LETTER_PITCH[letter] + (acc ? ACCIDENTAL_VALUE[acc] : 0)),
    suffix,
    bassPitch: bassLetter
      ? mod12(LETTER_PITCH[bassLetter] + (bassAcc ? ACCIDENTAL_VALUE[bassAcc] : 0))
      : null,
    source: token,
  };
}

/** Major, minor, or diminished — enough to place a chord in a key. */
export function chordFamily(suffix: string): 'major' | 'minor' | 'dim' {
  if (/^(dim|°|m7b5|m7♭5|ø)/.test(suffix)) return 'dim';
  if (/^(m(?!aj)|min|-)/.test(suffix)) return 'minor';
  return 'major';
}

export type AccidentalPreference = 'auto' | 'sharps' | 'flats';

/** Spell a pitch class. Inside a key, use the key's own spelling (F♯ in D,
 *  B♭ in F); outside it, fall back to the preference. */
export function spellPitch(
  pitchClass: number,
  preference: Exclude<AccidentalPreference, 'auto'>,
  key?: { pitchClass: number; mode: KeyMode },
): Spelling {
  if (key) {
    const inKey = keyScale(key.pitchClass, key.mode).find((n) => n.pitchClass === mod12(pitchClass));
    if (inKey && Math.abs(inKey.spelling.accidental) <= 1) return inKey.spelling;
  }
  const options = spellingsFor(pitchClass);
  return options.length === 1 ? options[0] : preference === 'sharps' ? options[0] : options[1];
}

/** Keys written with flats. Used when the preference is "auto". */
export function keyPrefersFlats(pitchClass: number, mode: KeyMode) {
  const relativeMajor = mode === 'major' ? pitchClass : mod12(pitchClass + 3);
  return [5, 10, 3, 8, 1].includes(mod12(relativeMajor));
}

export interface TransposeOptions {
  semitones: number;
  preference: AccidentalPreference;
  /** Key the result is in, for in-key spelling. */
  targetKey?: { pitchClass: number; mode: KeyMode };
  /** ASCII (#, b) or glyphs (♯, ♭). Chord sheets are usually ASCII. */
  ascii?: boolean;
}

export function transposeChord(chord: ParsedChord, options: TransposeOptions): string {
  const preference =
    options.preference === 'auto'
      ? options.targetKey && keyPrefersFlats(options.targetKey.pitchClass, options.targetKey.mode)
        ? 'flats'
        : 'sharps'
      : options.preference;
  const fmt = options.ascii ? spellingAscii : spellingName;
  const root = fmt(spellPitch(chord.rootPitch + options.semitones, preference, options.targetKey));
  const bass =
    chord.bassPitch === null
      ? ''
      : `/${fmt(spellPitch(chord.bassPitch + options.semitones, preference, options.targetKey))}`;
  return `${root}${chord.suffix}${bass}`;
}

/* ───────────────────────────── Chord sheets ───────────────────────────── */

/** Tokens allowed on a chord line that are not chords. */
const NEUTRAL_TOKEN = /^(\|+|\/|-+|%|\.+|…|x\d+|\(x\d+\)|\d+x|N\.?C\.?|:?\|\|?:?|\(|\))$/i;

export function isChordLine(line: string): boolean {
  const tokens = line.trim().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return false;
  let chords = 0;
  for (const token of tokens) {
    if (parseChord(token)) chords++;
    else if (!NEUTRAL_TOKEN.test(token)) return false;
  }
  return chords > 0;
}

export interface SheetSegment {
  text: string;
  /** Set when this segment is a chord symbol. */
  chord?: string;
}

/** Transpose a whole chord sheet. Chord-only lines keep their column
 *  alignment over the lyrics; inline [G] chords are transposed in place.
 *  Returns lines as segments so the UI can highlight chords. */
export function transposeSheet(text: string, options: TransposeOptions): SheetSegment[][] {
  return text.split('\n').map((line) => {
    if (isChordLine(line)) {
      const segments: SheetSegment[] = [];
      let out = '';
      const tokenRe = /\S+/g;
      let match: RegExpExecArray | null;
      while ((match = tokenRe.exec(line))) {
        const token = match[0];
        const parsed = parseChord(token);
        const replacement = parsed ? transposeChord(parsed, options) : token;
        // Keep each chord at its original column where possible, but never
        // let a longer chord run into the next one.
        const column = Math.max(match.index, out.length === 0 ? 0 : out.length + 1);
        const pad = ' '.repeat(column - out.length);
        if (pad) segments.push({ text: pad });
        segments.push(parsed ? { text: replacement, chord: replacement } : { text: replacement });
        out += pad + replacement;
      }
      return segments;
    }

    const segments: SheetSegment[] = [];
    let last = 0;
    const inlineRe = /\[([^\]\s]+)\]/g;
    let match: RegExpExecArray | null;
    while ((match = inlineRe.exec(line))) {
      const parsed = parseChord(match[1]);
      if (!parsed) continue;
      if (match.index > last) segments.push({ text: line.slice(last, match.index) });
      const replacement = transposeChord(parsed, options);
      segments.push({ text: `[${replacement}]`, chord: replacement });
      last = match.index + match[0].length;
    }
    if (last < line.length) segments.push({ text: line.slice(last) });
    return segments;
  });
}

/** Every chord symbol in a sheet, in order of appearance. */
export function extractChords(text: string): ParsedChord[] {
  const out: ParsedChord[] = [];
  for (const line of text.split('\n')) {
    if (isChordLine(line)) {
      for (const token of line.trim().split(/\s+/)) {
        const parsed = parseChord(token);
        if (parsed) out.push(parsed);
      }
    } else {
      for (const match of line.matchAll(/\[([^\]\s]+)\]/g)) {
        const parsed = parseChord(match[1]);
        if (parsed) out.push(parsed);
      }
    }
  }
  return out;
}

/** Parse a loose list such as "G, D/F#, Em  C" — for the capo calculator. */
export function parseChordList(text: string): ParsedChord[] {
  return text
    .split(/[\s,|]+/)
    .map((token) => parseChord(token))
    .filter((c): c is ParsedChord => c !== null);
}

/* ───────────────────────────── Key guessing ───────────────────────────── */

export interface KeyGuess {
  pitchClass: number;
  mode: KeyMode;
  /** Share of chords that are diatonic to this key, 0–1. */
  fit: number;
}

/** Best-fitting key for a list of chords: count diatonic matches, then
 *  break ties with the first and last chord, which are usually the tonic. */
export function guessKey(chords: ParsedChord[]): KeyGuess | null {
  if (chords.length === 0) return null;
  let best: (KeyGuess & { score: number }) | null = null;
  for (const mode of ['major', 'minor'] as KeyMode[]) {
    for (let pc = 0; pc < 12; pc++) {
      const diatonic = diatonicChords(pc, mode);
      let hits = 0;
      for (const chord of chords) {
        const family = chordFamily(chord.suffix);
        // A dominant V in a minor key is borrowed from harmonic minor and
        // is as common as the diatonic v, so accept either.
        const harmonicV =
          mode === 'minor' && family === 'major' && chord.rootPitch === mod12(pc + 7);
        if (harmonicV || diatonic.some((d) => d.rootPitch === chord.rootPitch && d.quality === family)) {
          hits++;
        }
      }
      const tonicFamily = mode === 'major' ? 'major' : 'minor';
      const isTonic = (c: ParsedChord) => c.rootPitch === pc && chordFamily(c.suffix) === tonicFamily;
      const score =
        hits +
        (isTonic(chords[0]) ? 0.6 : 0) +
        (isTonic(chords[chords.length - 1]) ? 0.5 : 0) +
        // Prefer major on a perfect tie; relative keys share every chord.
        (mode === 'major' ? 0.05 : 0);
      if (!best || score > best.score) {
        best = { pitchClass: pc, mode, fit: hits / chords.length, score };
      }
    }
  }
  return best && { pitchClass: best.pitchClass, mode: best.mode, fit: best.fit };
}

/* ─────────────────────────────── Capo ─────────────────────────────── */

/** Shapes a beginner can play in open position without a barre. */
const OPEN_SHAPES = new Set([
  'C', 'D', 'E', 'G', 'A',
  'Am', 'Dm', 'Em',
  'A7', 'B7', 'C7', 'D7', 'E7', 'G7',
  'Am7', 'Dm7', 'Em7',
  'Cmaj7', 'Dmaj7', 'Fmaj7', 'Gmaj7', 'Amaj7', 'Emaj7',
  'Asus2', 'Asus4', 'Dsus2', 'Dsus4', 'Esus4',
  'Cadd9', 'Gadd9', 'Aadd9',
  'A5', 'D5', 'E5', 'G5',
  'C6', 'A6', 'E6', 'G6', 'Am6', 'Em6',
]);

/** Common shapes that need a barre but every intermediate player knows. */
const BARRE_SHAPES = new Set(['F', 'Bm', 'B', 'Fm', 'Cm', 'Gm', 'F#m', 'Bm7', 'F#m7', 'Bb', 'C#m', 'F7', 'Bb7']);

export type ShapeDifficulty = 'open' | 'barre' | 'hard';

export function shapeDifficulty(name: string): ShapeDifficulty {
  const base = name.split('/')[0];
  if (OPEN_SHAPES.has(base)) return 'open';
  if (BARRE_SHAPES.has(base)) return 'barre';
  return 'hard';
}

export interface CapoOption {
  capo: number;
  /** Shape names to play with the capo on, in the song's order, deduplicated. */
  shapes: { name: string; difficulty: ShapeDifficulty; sounds: string }[];
  /** 0–100: open shapes count fully, barre shapes half. */
  score: number;
}

/** Rank capo positions 0..maxCapo by how many of the song's chords become
 *  open shapes. Ties go to the lower fret — less capo, less tuning drift. */
export function capoOptions(chords: ParsedChord[], maxCapo = 9): CapoOption[] {
  const unique = chords.filter(
    (chord, i) =>
      chords.findIndex((c) => c.rootPitch === chord.rootPitch && c.suffix === chord.suffix && c.bassPitch === chord.bassPitch) === i,
  );
  if (unique.length === 0) return [];

  const options: CapoOption[] = [];
  for (let capo = 0; capo <= maxCapo; capo++) {
    const shapes = unique.map((chord) => {
      // Open shapes are named with sharps (F#m, not Gbm).
      const name = transposeChord(chord, { semitones: -capo, preference: 'sharps', ascii: true });
      return {
        name,
        difficulty: shapeDifficulty(name),
        sounds: chord.source,
      };
    });
    const points = shapes.reduce(
      (sum, s) => sum + (s.difficulty === 'open' ? 2 : s.difficulty === 'barre' ? 1 : 0),
      0,
    );
    options.push({ capo, shapes, score: Math.round((100 * points) / (2 * shapes.length)) });
  }
  return [...options].sort((a, b) => b.score - a.score || a.capo - b.capo);
}

/** Pitch class → readable key name, e.g. 3 → "E♭". */
export const pitchName = (pitchClass: number, mode: KeyMode = 'major') =>
  spellingName(spellPitch(pitchClass, keyPrefersFlats(pitchClass, mode) ? 'flats' : 'sharps'));

/** Open-position keys people actually play from. */
export const SHAPE_KEYS: { label: string; pitch: number; mode: KeyMode }[] = [
  { label: 'C', pitch: 0, mode: 'major' },
  { label: 'G', pitch: 7, mode: 'major' },
  { label: 'D', pitch: 2, mode: 'major' },
  { label: 'A', pitch: 9, mode: 'major' },
  { label: 'E', pitch: 4, mode: 'major' },
  { label: 'Am', pitch: 9, mode: 'minor' },
  { label: 'Em', pitch: 4, mode: 'minor' },
  { label: 'Dm', pitch: 2, mode: 'minor' },
];

