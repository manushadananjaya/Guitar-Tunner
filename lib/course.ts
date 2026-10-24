/** The 30-day beginner course: one short session a day, each built from the
 *  site's own tools with links that open them preset for the lesson.
 *
 *  Chords are introduced in the order most teachers use — the shapes that
 *  share fingers come together (Em→E, Am→C, D↔A) — and nothing needs a barre
 *  until the last week. */

export interface CourseTask {
  text: string;
  /** Tool to open, already set up for the task. */
  href?: string;
  label?: string;
}

export interface CourseDay {
  day: number;
  title: string;
  /** One sentence: what today is for. */
  goal: string;
  minutes: number;
  tasks: CourseTask[];
  /** The one thing that usually goes wrong, and the fix. */
  tip: string;
  /** How you know the day is done. */
  check: string;
}

export interface CourseWeek {
  week: number;
  title: string;
  summary: string;
  days: CourseDay[];
}

const prog = (key: string, mode: 'major' | 'minor', p: string) =>
  `/chord-progressions?key=${key}&mode=${mode}&p=${p}`;

export const COURSE: CourseWeek[] = [
  {
    week: 1,
    title: 'Getting comfortable',
    summary: 'Tuning, holding the guitar, picking in time, and your first five chords.',
    days: [
      {
        day: 1,
        title: 'Tune up and meet the strings',
        goal: 'Get the guitar in tune and learn what each string is called.',
        minutes: 10,
        tasks: [
          { text: 'Tune all six strings with the microphone tuner.', href: '/', label: 'Guitar tuner' },
          { text: 'Learn the open strings from thickest to thinnest: E A D G B E. "Eddie Ate Dynamite, Good Bye Eddie" helps.' },
          { text: 'Pick each open string four times, slowly, from the 6th to the 1st and back.' },
        ],
        tip: 'Sit up with the guitar body resting on your right leg (left if you play left-handed) and the neck tilted slightly up. Slouching over the guitar to see the strings tenses your shoulders.',
        check: 'You can name any string someone points to, and the tuner shows all six in tune.',
      },
      {
        day: 2,
        title: 'Picking in time',
        goal: 'Play steady notes with a metronome, the habit every other day builds on.',
        minutes: 15,
        tasks: [
          { text: 'Set the metronome to 60 BPM and pick the open low E once per click for a minute.', href: '/metronome?bpm=60', label: 'Metronome at 60' },
          { text: 'Repeat on each string. Then alternate: down-stroke on the click, up-stroke halfway between.' },
          { text: 'Tap quarter notes in the rhythm trainer. Calibrate first if you use Bluetooth headphones.', href: '/rhythm-trainer?rhythm=quarters&bpm=60', label: 'Rhythm trainer' },
        ],
        tip: 'Hold the pick between the pad of your thumb and the side of your index finger, with only a few millimetres showing. A pick held too long catches on the strings.',
        check: 'A rhythm trainer score of 70 or more at 60 BPM.',
      },
      {
        day: 3,
        title: 'Your first chord: E minor',
        goal: 'Fret a chord cleanly, with every string ringing.',
        minutes: 15,
        tasks: [
          { text: 'Learn E minor: two fingers on the 2nd fret of the A and D strings.', href: '/chords/e-minor', label: 'E minor chord' },
          { text: 'Play it one string at a time, low to high. Fix any string that buzzes or is muted.' },
          { text: 'Strum it four times per bar along with the strumming trainer.', href: '/strumming-patterns?pattern=quarter-downs', label: 'Four downs' },
        ],
        tip: 'Press with the very tips of your fingers, just behind the fret wire — not on top of it, not in the middle of the space. Keep your thumb behind the neck, roughly opposite your middle finger.',
        check: 'All six strings ring clearly when you pick through the chord slowly.',
      },
      {
        day: 4,
        title: 'A minor, and your first chord change',
        goal: 'Switch between two chords without stopping the rhythm.',
        minutes: 15,
        tasks: [
          { text: 'Learn A minor. Notice it is the E minor shape moved over one string, plus one finger.', href: '/chords/a-minor', label: 'A minor chord' },
          { text: 'One-minute changes: switch Em → Am → Em as many times as you can in 60 seconds. Write the number down.' },
          { text: 'Strum Em for a bar, Am for a bar, at 60 BPM.', href: '/metronome?bpm=60', label: 'Metronome at 60' },
        ],
        tip: 'Move all the fingers at once, as a shape, instead of placing them one by one. It feels slower for a day or two, then much faster.',
        check: 'Your one-minute change count — anything is fine; you will beat it tomorrow.',
      },
      {
        day: 5,
        title: 'E major and A major',
        goal: 'Turn minor chords into major ones and hear the difference.',
        minutes: 15,
        tasks: [
          { text: 'Play E minor, then add your first finger on the 1st fret of the G string: that is E major.', href: '/chords/e', label: 'E major chord' },
          { text: 'Learn A major: three fingers in a row on the 2nd fret of the D, G and B strings.', href: '/chords/a', label: 'A major chord' },
          { text: 'One-minute changes: E → A. Then Em → E and Am → A, listening to how major sounds brighter.' },
        ],
        tip: 'A major is cramped. Many players squeeze fingers 1, 2 and 3 in a row, slightly angled; others use 2, 3 and 4. Pick whichever lets the 1st string ring.',
        check: 'You can hear, without looking, whether a chord you strum is major or minor.',
      },
      {
        day: 6,
        title: 'D major',
        goal: 'Learn a chord that uses only four strings.',
        minutes: 15,
        tasks: [
          { text: 'Learn D major. Strum only from the 4th (D) string down.', href: '/chords/d', label: 'D major chord' },
          { text: 'One-minute changes: D → A. Both chords have a note on the 2nd fret of the G string; finger A with your index there (middle on the D string, ring on the B) and that finger never moves.' },
          { text: 'Play the loop A → D → E → A, one bar each, at 60 BPM.', href: prog('a', 'major', '1,4,5,1'), label: 'A–D–E loop' },
        ],
        tip: 'If the low strings ring on D, aim your strum: start it from the D string. Strumming fewer strings well beats hitting all six.',
        check: 'D rings without the 1st string buzzing against your third finger.',
      },
      {
        day: 7,
        title: 'Week one review',
        goal: 'Consolidate: tuning, timing and five chords.',
        minutes: 15,
        tasks: [
          { text: 'Tune up, then run one-minute changes for Em–Am, E–A and D–A. Compare with your earlier counts.', href: '/', label: 'Tuner' },
          { text: 'Play the A–D–E loop for three minutes without stopping.', href: prog('a', 'major', '1,4,5,1'), label: 'A–D–E loop' },
          { text: 'Try the daily challenge to start training your ear.', href: '/daily-challenge', label: 'Daily challenge' },
        ],
        tip: 'Sore fingertips are normal this week and fade as calluses form. Short daily sessions build them faster — and hurt less — than one long one.',
        check: 'You can play five chords and change between pairs of them without stopping the strum.',
      },
    ],
  },
  {
    week: 2,
    title: 'Chords and strumming',
    summary: 'G and C, the down-up motion, and the progressions behind thousands of songs.',
    days: [
      {
        day: 8,
        title: 'G major',
        goal: 'Learn the most-used chord in folk and pop guitar.',
        minutes: 15,
        tasks: [
          { text: 'Learn G major. Let all six strings ring.', href: '/chords/g', label: 'G major chord' },
          { text: 'One-minute changes: G → D, then G → Em, keeping your first finger on the 2nd fret of the A string for both.' },
          { text: 'Strum G for two bars, D for two bars, at 70 BPM.', href: '/metronome?bpm=70', label: 'Metronome at 70' },
        ],
        tip: 'The stretch from the 6th string to the 1st is wide. Bring your wrist forward under the neck rather than reaching with straight fingers.',
        check: 'G sounds full, with the 5th string not muted by the finger on the 6th.',
      },
      {
        day: 9,
        title: 'C major',
        goal: 'Learn C and its shortcut from A minor.',
        minutes: 15,
        tasks: [
          { text: 'Learn C major. Compare it with A minor: only your third finger moves.', href: '/chords/c', label: 'C major chord' },
          { text: 'One-minute changes: Am → C, then C → G.' },
          { text: 'Start the strum from the 5th string so the low E does not ring.' },
        ],
        tip: 'The usual C problem is the 1st string not sounding because the first finger leans on it. Arch the finger more and come down on its very tip.',
        check: 'You can change Am → C without lifting your first two fingers.',
      },
      {
        day: 10,
        title: 'The down-up motion',
        goal: 'Strum eighth notes: down on the beat, up on the "and".',
        minutes: 15,
        tasks: [
          { text: 'Tap eighth notes in the rhythm trainer — "1 & 2 & 3 & 4 &".', href: '/rhythm-trainer?rhythm=eighths&bpm=70', label: 'Rhythm trainer' },
          { text: 'Strum straight down-ups on G with the strumming trainer.', href: '/strumming-patterns?pattern=down-up', label: 'Down-up pattern' },
          { text: 'Keep your strumming arm moving down and up all the time, like a pendulum.' },
        ],
        tip: 'Strum from the wrist and forearm, not the shoulder, and let the up-strum catch only the top three or four strings.',
        check: 'Down-ups at 70 BPM sound even, with the ups as loud as you mean them to be.',
      },
      {
        day: 11,
        title: 'Three chords: G, C and D',
        goal: 'Play the I–IV–V progression that powers folk, rock and country.',
        minutes: 15,
        tasks: [
          { text: 'Loop G → C → D → G as a backing track and strum along, one bar per chord.', href: prog('g', 'major', '1,4,5,1'), label: 'G–C–D loop' },
          { text: 'When it flows, try two bars per chord at 80 BPM.' },
          { text: 'Read why this progression is everywhere.', href: '/articles/beginner-guitar-chord-progressions', label: 'Chord progressions guide' },
        ],
        tip: 'Change chords a fraction early: let the last strum of a bar be on open strings while your hand moves. Nobody will hear it, and the rhythm stays intact.',
        check: 'Three minutes of G–C–D without the strumming hand stopping.',
      },
      {
        day: 12,
        title: 'The campfire strum',
        goal: 'Learn a strumming pattern you can use on hundreds of songs.',
        minutes: 15,
        tasks: [
          { text: 'Learn the folk pattern: down, down-up, up-down-up. The hand keeps moving through the gap.', href: '/strumming-patterns?pattern=folk', label: 'Folk strum' },
          { text: 'Play it on one chord until it is automatic, then over G–C–D.', href: prog('g', 'major', '1,4,5,1'), label: 'G–C–D loop' },
        ],
        tip: 'The missed down-strum in the middle is the whole trick — your hand still goes down, it just misses the strings. Stop the arm and the pattern falls apart.',
        check: 'The pattern sounds the same on the last bar as the first.',
      },
      {
        day: 13,
        title: 'The four-chord pop progression',
        goal: 'Play I–V–vi–IV, the progression behind a huge amount of pop music.',
        minutes: 15,
        tasks: [
          { text: 'Loop G → D → Em → C with the folk strum.', href: prog('g', 'major', '1,5,6,4'), label: 'G–D–Em–C loop' },
          { text: 'Try the same four chords starting from Em instead: Em → C → G → D.', href: prog('g', 'major', '6,4,1,5'), label: 'Em–C–G–D loop' },
        ],
        tip: 'If one change keeps tripping you up, isolate it with a one-minute drill, then put it back into the loop.',
        check: 'Both orders, two minutes each, without stopping.',
      },
      {
        day: 14,
        title: 'Week two review',
        goal: 'Seven chords, two strumming patterns, and a first look at ear training.',
        minutes: 15,
        tasks: [
          { text: 'One-minute changes for G–C, C–D and Am–C. Compare with day 9.' },
          { text: 'Ear training on beginner intervals for five minutes.', href: '/ear-training', label: 'Ear trainer' },
          { text: 'Record yourself playing G–D–Em–C on your phone and listen back. It is the fastest way to hear rushed changes.' },
        ],
        tip: 'Recording yourself is uncomfortable and extremely useful. You hear timing problems on a recording that you cannot hear while playing.',
        check: 'You can play any of the four-chord loops with a steady strum.',
      },
    ],
  },
  {
    week: 3,
    title: 'Fretboard, riffs and minor keys',
    summary: 'Notes on the neck, power chords, palm muting, your first scale, and the blues.',
    days: [
      {
        day: 15,
        title: 'Notes on the low strings',
        goal: 'Know the notes on the 6th and 5th strings — where every root note of a power or barre chord sits.',
        minutes: 15,
        tasks: [
          { text: 'Read how the notes are laid out, then drill them.', href: '/articles/guitar-fretboard-notes-map', label: 'Fretboard map' },
          { text: 'Fretboard trainer on the low E and A strings for five minutes.', href: '/fretboard-trainer', label: 'Fretboard trainer' },
        ],
        tip: 'Learn landmarks first — open, 3rd, 5th, 7th and 12th frets — and count from them rather than memorising every fret at once.',
        check: 'You can find G, A, C and D on the low E string without counting from the nut.',
      },
      {
        day: 16,
        title: 'Power chords',
        goal: 'Play the two-note chord that rock is built on, anywhere on the neck.',
        minutes: 15,
        tasks: [
          { text: 'Learn E5 and A5, then the movable shape: first finger on a 6th- or 5th-string root, third finger two frets up on the next string.', href: '/chords/e-5', label: 'E5 power chord' },
          { text: 'Slide the shape to G (3rd fret, 6th string) and C (3rd fret, 5th string), using yesterday’s notes.' },
          { text: 'Play eighth notes on each one at 80 BPM.', href: '/metronome?bpm=80', label: 'Metronome at 80' },
        ],
        tip: 'Let the side of your first finger rest lightly on the strings you are not playing. It mutes them, so you can strum hard without the chord turning to mud.',
        check: 'G5–C5–D5 with only two strings sounding each time.',
      },
      {
        day: 17,
        title: 'Palm muting',
        goal: 'Control the length of notes with your picking hand.',
        minutes: 15,
        tasks: [
          { text: 'Rest the edge of your picking hand on the strings right where they meet the bridge, and pick E5. It should thud, not ring.' },
          { text: 'Play eight muted eighth notes, then eight open ones, alternating every bar at 80 BPM.', href: '/metronome?bpm=80', label: 'Metronome at 80' },
          { text: 'Add the gallop once it is steady.', href: '/rhythm-trainer?rhythm=gallop&bpm=70', label: 'Gallop rhythm' },
        ],
        tip: 'Too far from the bridge and the notes die completely; too close and nothing is muted. Move a few millimetres at a time until it chugs.',
        check: 'You can switch between muted and ringing on a beat, cleanly.',
      },
      {
        day: 18,
        title: 'The minor pentatonic scale',
        goal: 'Learn the first box of the scale most rock and blues solos come from.',
        minutes: 15,
        tasks: [
          { text: 'Learn A minor pentatonic, first position (5th fret).', href: '/scales?root=a&scale=minor-pentatonic', label: 'A minor pentatonic' },
          { text: 'Play it up and down with one note per click at 60 BPM, alternate picking.', href: '/metronome?bpm=60', label: 'Metronome at 60' },
        ],
        tip: 'Use one finger per fret: first finger on the 5th fret, third or fourth on the 7th or 8th. Stay in position rather than sliding your hand around.',
        check: 'Up and down twice without a wrong note at 60 BPM.',
      },
      {
        day: 19,
        title: 'D minor and a minor key',
        goal: 'Play in A minor with i–iv–V.',
        minutes: 15,
        tasks: [
          { text: 'Learn D minor.', href: '/chords/d-minor', label: 'D minor chord' },
          { text: 'Loop Am → Dm → E → Am. The major E gives the strong pull home.', href: prog('a', 'minor', '1,4,5.major,1'), label: 'Am–Dm–E loop' },
          { text: 'Swap E for E7 and hear it pull even harder.', href: '/chords/e-7', label: 'E7 chord' },
        ],
        tip: 'D minor puts your first finger on the 1st fret of the high E string, which is exactly where the F barre chord starts in week four — getting it clean now pays off.',
        check: 'The loop for two minutes with clean Dm changes.',
      },
      {
        day: 20,
        title: 'The 12-bar blues',
        goal: 'Play the most important chord pattern in popular music.',
        minutes: 15,
        tasks: [
          { text: 'Learn A7, D7 and E7.', href: '/chords/a-7', label: 'A7 chord' },
          { text: 'Play the 12-bar in A: four bars of A7, two of D7, two of A7, then E7, D7, A7, E7.', href: prog('a', 'major', '1.7,1.7,1.7,1.7,4.7,4.7,1.7,1.7,5.7,4.7,1.7,5.7'), label: '12-bar blues loop' },
          { text: 'Then solo over it with yesterday’s A minor pentatonic.', href: '/scales?root=a&scale=minor-pentatonic', label: 'A minor pentatonic' },
        ],
        tip: 'Count the bars out loud the first few times. Losing your place in a 12-bar is normal; counting fixes it.',
        check: 'Two times through the 12 bars without losing your place.',
      },
      {
        day: 21,
        title: 'Week three review',
        goal: 'Timing check and a fretboard check.',
        minutes: 15,
        tasks: [
          { text: 'Rhythm trainer: off-beat eighths, then dotted quarter + eighth.', href: '/rhythm-trainer?rhythm=offbeats&bpm=70', label: 'Off-beats' },
          { text: 'Fretboard trainer: low E and A strings, aiming to beat your accuracy from day 15.', href: '/fretboard-trainer', label: 'Fretboard trainer' },
          { text: 'Today’s daily challenge.', href: '/daily-challenge', label: 'Daily challenge' },
        ],
        tip: 'Off-beats are hard because there is nothing on the beat to lean on. Tap your foot on the click and play between taps.',
        check: 'A rhythm trainer score of 80 or more on off-beat eighths.',
      },
    ],
  },
  {
    week: 4,
    title: 'Putting it together',
    summary: 'Capo, a new strum, fingerpicking, your first barre chords, and a whole song.',
    days: [
      {
        day: 22,
        title: 'Using a capo',
        goal: 'Play songs in any key with the shapes you already know.',
        minutes: 15,
        tasks: [
          { text: 'Read what a capo actually does.', href: '/articles/does-a-capo-affect-guitar-tuning', label: 'Capo guide' },
          { text: 'Enter a song’s chords and find the capo position that turns them into open shapes.', href: '/capo-calculator', label: 'Capo calculator' },
          { text: 'Play G–C–D with a capo on the 2nd fret. It now sounds in A.' },
        ],
        tip: 'Put the capo just behind the fret, not on it, and check your tuning afterwards — a capo can pull strings slightly sharp.',
        check: 'You can explain why G shapes with capo 2 sound in A.',
      },
      {
        day: 23,
        title: 'Changing a song’s key',
        goal: 'Move a chord sheet to a key that suits your voice or your hands.',
        minutes: 15,
        tasks: [
          { text: 'Paste a chord sheet into the transposer and try it in a few keys.', href: '/chord-transposer', label: 'Chord transposer' },
          { text: 'Find the key where the song uses the most chords you know from this course.' },
        ],
        tip: 'If a song has an F or B♭ you cannot play yet, try moving it to G or D — or use the capo calculator to keep the original key.',
        check: 'A song you want to play, written out in chords you can play.',
      },
      {
        day: 24,
        title: 'A syncopated strum',
        goal: 'Add the "push" that makes strumming sound like a record.',
        minutes: 15,
        tasks: [
          { text: 'Tap the 3-3-2 rhythm until it feels natural.', href: '/rhythm-trainer?rhythm=tresillo&bpm=80', label: '3-3-2 rhythm' },
          { text: 'Learn the syncopated strumming pattern and play it over G–D–Em–C.', href: '/strumming-patterns?pattern=syncopated', label: 'Syncopated push' },
        ],
        tip: 'Syncopation means accenting the "and". Strum the up-strums slightly harder than you think you need to.',
        check: 'The pattern over four chords without the push disappearing on the changes.',
      },
      {
        day: 25,
        title: 'Simple fingerpicking',
        goal: 'Pick a chord one string at a time with your fingers.',
        minutes: 15,
        tasks: [
          { text: 'Hold C. Thumb plays the 5th string, then index, middle and ring play the 3rd, 2nd and 1st strings in turn. Repeat.' },
          { text: 'On G, move the thumb to the 6th string. Alternate C and G, one bar each, at 60 BPM.', href: '/metronome?bpm=60', label: 'Metronome at 60' },
        ],
        tip: 'Assign one finger to each string and keep it there. The thumb handles the bass strings; the fingers never do.',
        check: 'C to G fingerpicked for a minute without a gap at the change.',
      },
      {
        day: 26,
        title: 'Getting ready for barre chords',
        goal: 'Build up to F without the frustration.',
        minutes: 15,
        tasks: [
          { text: 'Play Fmaj7 — F without a barre — and change to C.', href: '/chords/f-maj7', label: 'Fmaj7 chord' },
          { text: 'Lay your first finger flat across the 1st and 2nd strings at the 1st fret (a mini barre) and pick both until they ring.' },
          { text: 'Then add fingers 2 and 3 for the small four-string F.' },
        ],
        tip: 'Barre with the side of the finger nearest your thumb, which is bonier and firmer, and pull back with your arm rather than squeezing harder with your thumb.',
        check: 'Fmaj7 ↔ C at 60 BPM, two bars each.',
      },
      {
        day: 27,
        title: 'Full barre chords: F and Bm',
        goal: 'Start the chords that unlock every key — knowing they take weeks, not a day.',
        minutes: 15,
        tasks: [
          { text: 'Learn the full F barre chord. Check every string, one at a time.', href: '/chords/f', label: 'F chord' },
          { text: 'Learn B minor, the A-shape barre at the 2nd fret.', href: '/chords/b-minor', label: 'B minor chord' },
          { text: 'Play C → F → G → C, using Fmaj7 whenever the full F is not ready.', href: prog('c', 'major', '1,4,5,1'), label: 'C–F–G loop' },
        ],
        tip: 'Two minutes a day on barre chords beats twenty minutes once. Stop if your hand hurts — strength comes from repetition, not force.',
        check: 'F with at least five of six strings ringing. The sixth will come.',
      },
      {
        day: 28,
        title: 'Improvise over a loop',
        goal: 'Make something up — the scale and the chords working together.',
        minutes: 15,
        tasks: [
          { text: 'Start the Am–Dm–E backing loop.', href: prog('a', 'minor', '1,4,5.major,1'), label: 'Am–Dm–E loop' },
          { text: 'Improvise with A minor pentatonic. Play short phrases, leave gaps, end phrases on the note A.', href: '/scales?root=a&scale=minor-pentatonic', label: 'A minor pentatonic' },
        ],
        tip: 'Fewer notes sound better. Play three or four, stop, listen, answer yourself.',
        check: 'Two minutes of improvising without stopping the loop.',
      },
      {
        day: 29,
        title: 'Learn a whole song',
        goal: 'Play a complete song from start to finish.',
        minutes: 20,
        tasks: [
          { text: 'Choose a song that uses the chords from this course. Day 23’s transposer and day 22’s capo can bring most songs within reach.', href: '/chord-transposer', label: 'Chord transposer' },
          { text: 'Learn it section by section: verse, then chorus, then how they join.' },
          { text: 'Play along with the recording, or with the metronome at the song’s tempo.', href: '/metronome', label: 'Metronome' },
        ],
        tip: 'Do not stop for mistakes on a run-through. Keep the strumming hand going and come back in on the next chord, the way you would on stage.',
        check: 'One complete play-through without stopping.',
      },
      {
        day: 30,
        title: 'Day 30: the full run-through',
        goal: 'See how far you have come, and set up what comes next.',
        minutes: 20,
        tasks: [
          { text: 'Tune up by ear, then check with the tuner.', href: '/articles/how-to-tune-a-guitar-by-ear', label: 'Tuning by ear' },
          { text: 'One-minute changes for Em–Am (day 4) and G–C (day 9). Compare with your first counts.' },
          { text: 'Rhythm trainer on eighth notes at 90 BPM.', href: '/rhythm-trainer?rhythm=eighths&bpm=90', label: 'Rhythm trainer' },
          { text: 'Play your song from day 29. Then switch to the daily practice routine to keep going.', href: '/practice-routine', label: 'Practice routine' },
        ],
        tip: 'From here, progress comes from songs you want to play. Pick the next one, find the chords you do not know yet, and learn those.',
        check: 'Thirty days done. You play guitar.',
      },
    ],
  },
];

export const COURSE_DAYS: CourseDay[] = COURSE.flatMap((week) => week.days);
