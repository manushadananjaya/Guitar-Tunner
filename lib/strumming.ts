/** Strumming patterns as a grid of slots.
 *
 *  D = down-strum, U = up-strum, x = muted "chuck" (a down-strum with the
 *  fretting hand damping the strings), - = the hand still moves but misses
 *  the strings. Every pattern obeys the one rule that makes strumming work:
 *  the hand never stops. On the eighth-note grid, even slots are downs and
 *  odd slots are ups; on the sixteenth grid the same holds per sixteenth.
 *  The one exception is a downstroke-only pattern, where the hand strikes on
 *  the way down every time and only travels back up. That is checked by
 *  `validatePattern` rather than trusted. */

export interface StrumPattern {
  id: string;
  name: string;
  /** Slots per beat: 2 = eighth notes, 4 = sixteenths. */
  slotsPerBeat: 2 | 4;
  beatsPerBar: number;
  slots: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  /** Suggested starting tempo. */
  bpm: number;
}

export const PATTERNS: StrumPattern[] = [
  {
    id: 'quarter-downs',
    name: 'Four downs',
    slotsPerBeat: 2,
    beatsPerBar: 4,
    slots: 'D-D-D-D-',
    level: 'Beginner',
    description:
      'One down-strum per beat. Not exciting, but it is how you learn to change chords without the rhythm stopping. Keep the hand moving up between strums even though it does not hit anything.',
    bpm: 70,
  },
  {
    id: 'eighth-downs',
    name: 'Eighth-note downs',
    slotsPerBeat: 2,
    beatsPerBar: 4,
    slots: 'DDDDDDDD',
    level: 'Beginner',
    description:
      'Two down-strums per beat — the driving punk and rock rhythm. Tiring at speed, which is exactly why the next pattern exists.',
    bpm: 80,
  },
  {
    id: 'down-up',
    name: 'Straight down-ups',
    slotsPerBeat: 2,
    beatsPerBar: 4,
    slots: 'DUDUDUDU',
    level: 'Beginner',
    description:
      'Down on the beat, up on the "and". This is the motion every other pattern is carved out of — get it even and relaxed before moving on.',
    bpm: 80,
  },
  {
    id: 'folk',
    name: 'The folk / campfire strum',
    slotsPerBeat: 2,
    beatsPerBar: 4,
    slots: 'D-DU-UDU',
    level: 'Beginner',
    description:
      'Down, down-up, up-down-up. Probably the most-used acoustic strum there is. The missed down on beat 3 is what gives it the lilt — the hand still goes down, it just skips the strings.',
    bpm: 85,
  },
  {
    id: 'two-downs',
    name: 'Two downs, then down-ups',
    slotsPerBeat: 2,
    beatsPerBar: 4,
    slots: 'D-D-DUDU',
    level: 'Beginner',
    description:
      'Steady for two beats, busier for two. A good bridge between straight quarter notes and the folk strum.',
    bpm: 80,
  },
  {
    id: 'syncopated',
    name: 'Syncopated push',
    slotsPerBeat: 2,
    beatsPerBar: 4,
    slots: 'D--U-UDU',
    level: 'Intermediate',
    description:
      'Down on 1, then the accents land on the "ands". Beats 2 and 3 are both missed down-strums, so the hand has to keep time on its own. Count out loud.',
    bpm: 80,
  },
  {
    id: 'chuck',
    name: 'Muted backbeat (chuck)',
    slotsPerBeat: 2,
    beatsPerBar: 4,
    slots: 'D-xU-UxU',
    level: 'Intermediate',
    description:
      'The muted strums on 2 and 4 act as a snare drum. Damp the strings with the side of the strumming hand or by relaxing the fretting fingers, and strum as normal.',
    bpm: 85,
  },
  {
    id: 'offbeat',
    name: 'Offbeat (ska / reggae)',
    slotsPerBeat: 2,
    beatsPerBar: 4,
    slots: '-U-U-U-U',
    level: 'Intermediate',
    description:
      'Nothing on the beat, a short up-strum on every "and". Choke each chord off quickly by releasing pressure with the fretting hand. Every down-stroke is a miss.',
    bpm: 100,
  },
  {
    id: 'waltz',
    name: 'Waltz (3/4)',
    slotsPerBeat: 2,
    beatsPerBar: 3,
    slots: 'D-DUDU',
    level: 'Intermediate',
    description:
      'Three beats to the bar: a strong down on 1, then down-ups. Lean on beat one — that accent is what makes a waltz sound like a waltz.',
    bpm: 90,
  },
  {
    id: 'gallop',
    name: 'Gallop',
    slotsPerBeat: 4,
    beatsPerBar: 4,
    slots: 'D-DUD-DUD-DUD-DU',
    level: 'Advanced',
    description:
      'An eighth note and two sixteenths on every beat — "da da-da". Common in rock and metal rhythm parts, usually palm-muted on the low strings.',
    bpm: 80,
  },
  {
    id: 'sixteenths',
    name: 'Sixteenth down-ups',
    slotsPerBeat: 4,
    beatsPerBar: 4,
    slots: 'DUDUDUDUDUDUDUDU',
    level: 'Advanced',
    description:
      'Four strums per beat. The engine of funk rhythm guitar. Keep the wrist loose and strum only the top three or four strings.',
    bpm: 70,
  },
  {
    id: 'funk',
    name: 'Sixteenth funk',
    slotsPerBeat: 4,
    beatsPerBar: 4,
    slots: 'D-DUx-DU-UDUx-DU',
    level: 'Advanced',
    description:
      'Sixteenth-note motion with muted chucks on beats 2 and 4, and a missed down-stroke on beat 3 so the up-strum just after it pushes. Keep the hand moving in sixteenths the whole time — the pattern is in which strokes connect.',
    bpm: 75,
  },
];

export const getPattern = (id: string) => PATTERNS.find((p) => p.id === id) ?? PATTERNS[0];

/** True when every stroke sits on the right side of the hand's motion. */
export function validatePattern(pattern: StrumPattern): boolean {
  if (pattern.slots.length !== pattern.slotsPerBeat * pattern.beatsPerBar) return false;
  if (/^[D-]+$/.test(pattern.slots)) return true;
  return [...pattern.slots].every((stroke, i) => {
    if (stroke === '-') return true;
    const down = i % 2 === 0;
    return down ? stroke === 'D' || stroke === 'x' : stroke === 'U';
  });
}

/** "1 & 2 &" or "1 e & a" counting labels for a pattern's slots. */
export function countLabels(pattern: StrumPattern): string[] {
  const sub = pattern.slotsPerBeat === 2 ? ['', '&'] : ['', 'e', '&', 'a'];
  return Array.from({ length: pattern.slots.length }, (_, i) => {
    const beat = Math.floor(i / pattern.slotsPerBeat) + 1;
    const part = i % pattern.slotsPerBeat;
    return part === 0 ? String(beat) : sub[part];
  });
}

export const PROGRESSIONS_FOR_STRUMMING: { id: string; label: string; chords: string[] }[] = [
  { id: 'g-c-d', label: 'G – C – D – G', chords: ['g', 'c', 'd', 'g'] },
  { id: 'c-g-am-f', label: 'C – G – Am – F', chords: ['c', 'g', 'a-minor', 'f'] },
  { id: 'em-c-g-d', label: 'Em – C – G – D', chords: ['e-minor', 'c', 'g', 'd'] },
  { id: 'a-d-e', label: 'A – D – E – A', chords: ['a', 'd', 'e', 'a'] },
  { id: 'am-dm-e', label: 'Am – Dm – E – Am', chords: ['a-minor', 'd-minor', 'e', 'a-minor'] },
  { id: 'single-g', label: 'Just G (no changes)', chords: ['g'] },
];
