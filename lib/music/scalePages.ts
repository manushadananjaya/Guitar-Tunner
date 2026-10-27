/** The individual scale pages under /scales/[slug]: a short, hand-picked
 *  list of the scales guitarists actually search for, each with its own
 *  written explanation. Deliberately not every scale in every key — twelve
 *  keys × twelve scales of near-identical pages is exactly the scaled
 *  content search engines discount. The notes, positions and chords on each
 *  page are generated from lib/music/scales, so they always match the
 *  explorer above them.
 *
 *  Prose strings may use **bold** and [links](/path). */

import { ROOTS, CHORD_BY_SLUG } from '@/lib/chords';
import {
  getScale,
  spellScale,
  QUALITY_SUFFIX,
  type SpelledScaleNote,
} from '@/lib/music/scales';

export interface ScalePageEntry {
  slug: string;
  /** ROOTS slug. */
  root: string;
  /** SCALES slug. */
  scale: string;
  /** "A Minor Pentatonic Scale". */
  name: string;
  /** Meta description, ≤ 155 characters. */
  metaDescription: string;
  /** One sentence under the H1. */
  lede: string;
  intro: string[];
  practice: string[];
  usageHeading: string;
  usage: string[];
  faqs: { question: string; answer: string }[];
}

export const SCALE_PAGES: ScalePageEntry[] = [
  {
    slug: 'a-minor-pentatonic-scale',
    root: 'a',
    scale: 'minor-pentatonic',
    name: 'A Minor Pentatonic Scale',
    metaDescription:
      'The A minor pentatonic scale on guitar: notes A C D E G, all five positions on the fretboard, the chords it fits, and how to practise it. Interactive.',
    lede: 'A C D E G — the first scale most guitarists learn, and the one most rock and blues solos are built on.',
    intro: [
      'The **A minor pentatonic** has five notes: **A, C, D, E and G**. There are no semitones between them, so no note clashes hard with the chords underneath, and almost anything you play sounds musical. That forgiving quality is why it is the standard first scale for lead guitar.',
      'It is usually learned as a box at the **5th fret**, with the root on the 6th string under your first finger. That box is one of five shapes that tile the whole neck; the explorer above shows each one, and the table below lists where they sit.',
    ],
    practice: [
      'Learn the 5th-fret box first, ascending and descending, until you can play it without looking. Start and end every run on an A.',
      'Bend the D on the 3rd string (7th fret) up a whole step to E. That single bend is in an enormous number of rock solos.',
      'Turn on the drone on A and play only three notes — A, C and E — for a minute. Then add D and G. Hearing what each note does is worth more than speed.',
      'Learn the next box up, starting at the 7th fret, and practise sliding between the two on the 3rd string.',
    ],
    usageHeading: 'Where You Hear It',
    usage: [
      'Over almost any song in A minor, over a 12-bar blues in A (where the minor third rubbing against the A major chord is the blues sound), and in a great deal of classic rock. Jimmy Page\'s solo in "Stairway to Heaven" is the textbook example of how far five notes can go.',
      'The same five notes, starting from C, make the [C major pentatonic](/scales?root=c&scale=major-pentatonic) — the relative major. Play the A minor shapes over a song in C and they sound bright rather than bluesy.',
    ],
    faqs: [
      {
        question: 'What are the notes of the A minor pentatonic scale?',
        answer:
          'A, C, D, E and G. As intervals from A: root, minor third, perfect fourth, perfect fifth and minor seventh. It is the A natural minor scale with the 2nd (B) and 6th (F) removed.',
      },
      {
        question: 'Is A minor pentatonic the same as C major pentatonic?',
        answer:
          'They contain the same five notes, so the fingerings are identical. The difference is which note is home. Over an A minor chord, A is the root and the scale sounds minor; over a C major chord, C is the root and it sounds major.',
      },
      {
        question: 'Which position of A minor pentatonic should I learn first?',
        answer:
          'The box starting at the 5th fret, with the root under your first finger on the low E string. It is the shape most lessons call "position 1" and the one most solos start from. Then learn the box above it.',
      },
    ],
  },
  {
    slug: 'e-minor-pentatonic-scale',
    root: 'e',
    scale: 'minor-pentatonic',
    name: 'E Minor Pentatonic Scale',
    metaDescription:
      'The E minor pentatonic scale on guitar: notes E G A B D in open position and up the neck, with every position, the chords it fits and practice ideas.',
    lede: 'E G A B D — the guitar\'s home key, with open strings in every shape.',
    intro: [
      'The **E minor pentatonic** is **E, G, A, B and D**. Every one of the guitar\'s open strings — E, A, D, G, B and E — is a note of the scale. That makes it the easiest pentatonic to play in open position: every string rings open and only frets 2 and 3 are needed.',
      'Because the open position is just the 12th-fret shape with the nut standing in for your first finger, everything you learn here moves an octave up unchanged.',
    ],
    practice: [
      'Play the open-position shape: open string, then fret 2 or 3 on each string. Let the open strings ring into each other.',
      'Practise hammer-ons and pull-offs between each open string and its fretted note. Fast licks in E are built on exactly this.',
      'Play the same shape at the 12th fret and compare. Then fill the gap with the positions listed below, which connect the two.',
      'Write a riff that uses the open low E as a pedal note between scale notes on the 5th and 4th strings — the shape of countless rock and metal riffs.',
    ],
    usageHeading: 'Where You Hear It',
    usage: [
      'Riffs and solos in E minor dominate rock and metal on guitar, because the open low E is the lowest note available in standard tuning. Over a blues in E, the E minor pentatonic against E7 chords gives the classic Texas-blues sound.',
      'Its relative major is [G major pentatonic](/scales/g-major-pentatonic-scale): the same five notes and shapes, centred on G.',
    ],
    faqs: [
      {
        question: 'What are the notes of the E minor pentatonic scale?',
        answer:
          'E, G, A, B and D: root, minor third, perfect fourth, perfect fifth and minor seventh. All five are also open strings of the guitar.',
      },
      {
        question: 'Why is E minor pentatonic so common on guitar?',
        answer:
          'Because it fits the open strings. Riffs can use the open low E as a drone, open-position licks need almost no fretting, and the same shape repeats at the 12th fret.',
      },
      {
        question: 'Does E minor pentatonic work in Drop D?',
        answer:
          'Yes, but the shapes on the low string shift because it is tuned down a whole step. Switch the explorer\'s tuning to Drop D to see the adjusted positions.',
      },
    ],
  },
  {
    slug: 'g-major-pentatonic-scale',
    root: 'g',
    scale: 'major-pentatonic',
    name: 'G Major Pentatonic Scale',
    metaDescription:
      'The G major pentatonic scale on guitar: notes G A B D E, five positions, the chords it fits and how to make it sound major rather than minor. Interactive.',
    lede: 'G A B D E — the bright, open sound of country, folk and melodic rock.',
    intro: [
      'The **G major pentatonic** is **G, A, B, D and E**: the G major scale without its 4th (C) and 7th (F♯). Like every pentatonic it has no semitones, so it is easy to sound good with, but its major third gives it a sunny, open character instead of the minor pentatonic\'s grit.',
      'It uses exactly the same notes — and therefore exactly the same shapes — as E minor pentatonic. What makes it sound major is where you start, stop and linger: on G and B rather than E and G.',
    ],
    practice: [
      'Play the shape whose root is on the 6th string at the 3rd fret. Start and end every phrase on G.',
      'Target the B, the major third, on strong beats. It is the note that tells the listener "major".',
      'Slide between the 2nd and 4th fret on the 3rd string (A to B) — the classic country move into the third.',
      'Play the same shapes over a G chord and then over an Em chord, and listen to the mood change with the root.',
    ],
    usageHeading: 'Where You Hear It',
    usage: [
      'Country lead guitar, bluegrass runs, folk melodies and the sweeter side of rock soloing all lean on the major pentatonic. It fits a whole song in G — over G, C and D chords — without a wrong note.',
      'Blues players mix it with the minor pentatonic over the same chord: the major pentatonic\'s third against the minor pentatonic\'s flat third is a large part of the B.B. King sound. Its relative minor is [E minor pentatonic](/scales/e-minor-pentatonic-scale).',
    ],
    faqs: [
      {
        question: 'What are the notes of the G major pentatonic scale?',
        answer:
          'G, A, B, D and E: root, major second, major third, perfect fifth and major sixth.',
      },
      {
        question: 'Why does my G major pentatonic sound minor?',
        answer:
          'Probably because you are resolving to E. The shapes are the same as E minor pentatonic, so if your phrases start and end on E over an E minor chord, the ear hears minor. Land on G and B over a G chord instead.',
      },
      {
        question: 'Can I play G major pentatonic over a blues in G?',
        answer:
          'Yes, especially over the G chord. Many players switch to the minor pentatonic over the IV chord (C) or mix the two.',
      },
    ],
  },
  {
    slug: 'a-blues-scale',
    root: 'a',
    scale: 'blues',
    name: 'A Blues Scale',
    metaDescription:
      'The A blues scale on guitar: notes A C D E♭ E G, with the blue note explained, every position on the neck, and how to use it over a 12-bar blues in A.',
    lede: 'A C D E♭ E G — the minor pentatonic plus one note that makes it the blues.',
    intro: [
      'The **A blues scale** is **A, C, D, E♭, E and G**: the [A minor pentatonic](/scales/a-minor-pentatonic-scale) with one extra note, the **flat fifth (E♭)**, often called the blue note. It sits between the 4th and 5th and creates a moment of tension that resolves as soon as you move off it.',
      'Use the E♭ as a passing note, not a destination. Sliding or hammering through it — D to E♭ to E, or the reverse — is the sound. Landing and holding on it sounds like a mistake.',
    ],
    practice: [
      'Take the 5th-fret A minor pentatonic box and add the blue note: 6th fret on the 5th string, and 8th fret on the 3rd string.',
      'Play D–E♭–E on the 3rd string (frets 7, 8, 9) as a quick chromatic run, then reverse it.',
      'Bend the D on the 3rd string up a half step to E♭, then on up to E, in one motion.',
      'Loop a 12-bar blues in A in the [chord progression builder](/chord-progressions) and solo through all three chords with the scale.',
    ],
    usageHeading: 'Playing It Over a 12-Bar Blues',
    usage: [
      'A 12-bar blues in A uses A7, D7 and E7. The A blues scale works over all three — its minor third against the A7 chord\'s major third is the bittersweet blues sound. The blue note works best as a quick passing note over A7. Over D7 it is a flat ninth against the chord and clashes if held, so slide through it there or leave it out.',
      'Many players also mix in the major third, C♯, sliding up from C. That combination of minor and major thirds over the same chord is central to blues phrasing.',
    ],
    faqs: [
      {
        question: 'What are the notes of the A blues scale?',
        answer:
          'A, C, D, E♭, E and G: root, minor third, perfect fourth, flat fifth, perfect fifth and minor seventh. E♭ is sometimes written D♯; it is the same pitch.',
      },
      {
        question: 'What is the difference between the blues scale and the minor pentatonic?',
        answer:
          'One note. The blues scale adds the flat fifth to the five notes of the minor pentatonic. Everything else — the shapes, the chords it fits — is the same.',
      },
      {
        question: 'Is there a major blues scale?',
        answer:
          'Yes: the major pentatonic with an added flat third. In A it is A B C C♯ E F♯. It is used for brighter, more country-flavoured blues, and many solos switch between the major and minor versions.',
      },
    ],
  },
  {
    slug: 'e-blues-scale',
    root: 'e',
    scale: 'blues',
    name: 'E Blues Scale',
    metaDescription:
      'The E blues scale on guitar: notes E G A B♭ B D, in open position and up the neck, with every position and practice ideas for blues in E.',
    lede: 'E G A B♭ B D — open-position blues, built around the guitar\'s lowest string.',
    intro: [
      'The **E blues scale** is **E, G, A, B♭, B and D**: the [E minor pentatonic](/scales/e-minor-pentatonic-scale) plus the flat fifth, B♭. In open position the blue note falls at the 1st fret of the 5th string and the 3rd fret of the 3rd string, right next to open strings — which makes chromatic blues licks almost effortless.',
      'E is one of the two great guitar blues keys (A is the other), because the open low E can ring under everything you play.',
    ],
    practice: [
      'In open position, play open A string, 1st fret (B♭), 2nd fret (B) as a quick ascending line, then back down.',
      'Practise a turnaround: the last two bars of a 12-bar blues, walking down to the B7 chord.',
      'Play the same scale at the 12th fret and compare the feel; the shapes are identical an octave up.',
      'Alternate an open low E with blues-scale notes on the 5th and 4th strings to build a shuffle riff.',
    ],
    usageHeading: 'Where You Hear It',
    usage: [
      'Texas and Chicago blues lean heavily on E: open-string riffs, a ringing low E under the solo, and string bends near the 12th fret. Rock players use the same vocabulary for riffs in E.',
      'Over a 12-bar blues in E (E7, A7, B7), the scale fits throughout. Over the A7 chord, the B♭ is a flat ninth against the chord, so pass through it quickly there rather than holding it.',
    ],
    faqs: [
      {
        question: 'What are the notes of the E blues scale?',
        answer:
          'E, G, A, B♭, B and D: root, minor third, perfect fourth, flat fifth, perfect fifth and minor seventh. B♭ is also written A♯.',
      },
      {
        question: 'Where is the blue note in open position?',
        answer:
          'At the 1st fret of the 5th (A) string and the 3rd fret of the 3rd (G) string. Both sit between notes of the pentatonic, which is why they work as quick passing notes.',
      },
      {
        question: 'Should I learn the E or the A blues scale first?',
        answer:
          'The shapes are the same, so learn whichever key you play in most. Many players start with A because its main box sits mid-neck, then learn E for open-position licks.',
      },
    ],
  },
  {
    slug: 'c-major-scale',
    root: 'c',
    scale: 'major',
    name: 'C Major Scale',
    metaDescription:
      'The C major scale on guitar: notes C D E F G A B with no sharps or flats, every position on the neck, its seven chords and how to practise it.',
    lede: 'C D E F G A B — no sharps, no flats, and the reference every other scale is described against.',
    intro: [
      'The **C major scale** is **C, D, E, F, G, A and B** — the white keys of a piano. It is the only major scale with no sharps or flats, which makes it the key for learning music theory: every other major scale is the same pattern of whole and half steps, W W H W W W H, started on a different note.',
      'On guitar there is nothing special about C\'s fingering: the major-scale shapes move to any key. But because every note in it is a natural, learning C major is the same as learning where all the natural notes are on the neck.',
    ],
    practice: [
      'Play C major in open position: it uses open strings and frets 1 to 3, and contains the notes of every open chord in the key.',
      'Find every C on the neck, then play the scale from each one. That is the fastest way to connect the positions.',
      'Sing the scale as you play it — do, re, mi — to tie the shapes to the sound.',
      'Play it in thirds: C–E, D–F, E–G and so on. It is a classic exercise that makes scale runs sound like melodies.',
    ],
    usageHeading: 'The Chords of C Major',
    usage: [
      'Building a triad on each note of the scale gives the seven chords of the key: C, Dm, Em, F, G, Am and B°. Most songs in C use three or four of them, very often C, F, G and Am. The [circle of fifths](/circle-of-fifths) shows the same pattern for every key.',
      'The relative minor of C major is [A minor](/scales/a-minor-scale): the same seven notes, with A as home.',
    ],
    faqs: [
      {
        question: 'What are the notes of the C major scale?',
        answer: 'C, D, E, F, G, A and B. It has no sharps or flats.',
      },
      {
        question: 'What is the pattern of the major scale?',
        answer:
          'Whole, whole, half, whole, whole, whole, half. On one guitar string, that is 2, 2, 1, 2, 2, 2 and 1 frets. Start it on any note to get that note\'s major scale.',
      },
      {
        question: 'Is C major the same as A minor?',
        answer:
          'They share all seven notes, so the fingerings are identical. The difference is the home note: a song in C major resolves to C, one in A minor to A.',
      },
    ],
  },
  {
    slug: 'g-major-scale',
    root: 'g',
    scale: 'major',
    name: 'G Major Scale',
    metaDescription:
      'The G major scale on guitar: notes G A B C D E F♯, one sharp, every position on the neck, its chords and the open-position fingering. Interactive.',
    lede: 'G A B C D E F♯ — one sharp, and the most guitar-friendly key there is.',
    intro: [
      'The **G major scale** is **G, A, B, C, D, E and F♯**. It has one sharp, F♯. G is arguably the guitar\'s favourite key: its main chords — G, C, D and Em — are all easy open shapes, and the open strings D, G, B and E are all notes of the scale.',
      'In open position the scale starts on the 3rd fret of the low E string and uses only frets 0 to 4. Up the neck, the same major-scale shapes as every other key apply.',
    ],
    practice: [
      'Learn the open-position G major scale across all six strings, letting the open strings ring.',
      'Play the scale over a G drone and listen for the F♯: it pulls strongly up to G. That pull is what makes it major.',
      'Practise the shape that starts with the root under your second finger at the 3rd fret; it moves to any key.',
      'Combine it with strumming G–C–D–Em, and play short scale runs between chords.',
    ],
    usageHeading: 'The Chords of G Major',
    usage: [
      'The seven chords of G major are G, Am, Bm, C, D, Em and F♯°. The I–IV–V (G, C, D) and I–V–vi–IV (G, D, Em, C) progressions in this key are behind a huge number of folk, country and pop songs.',
      'Its relative minor is [E minor](/scales/e-minor-scale), and its pentatonic cousin is [G major pentatonic](/scales/g-major-pentatonic-scale) — the same scale with C and F♯ removed.',
    ],
    faqs: [
      {
        question: 'What are the notes of the G major scale?',
        answer: 'G, A, B, C, D, E and F♯. It has one sharp: F♯.',
      },
      {
        question: 'Why is G a popular key for guitar?',
        answer:
          'Its main chords — G, C, D and Em — are all open shapes beginners learn first, and most of its notes are open strings, so it rings and resonates.',
      },
      {
        question: 'What is the relative minor of G major?',
        answer:
          'E minor. It uses the same seven notes, starting from E.',
      },
    ],
  },
  {
    slug: 'd-major-scale',
    root: 'd',
    scale: 'major',
    name: 'D Major Scale',
    metaDescription:
      'The D major scale on guitar: notes D E F♯ G A B C♯, two sharps, every position on the neck, its seven chords and how it works in Drop D and DADGAD.',
    lede: 'D E F♯ G A B C♯ — two sharps, the fiddle-tune key, and a natural fit for Drop D and DADGAD.',
    intro: [
      'The **D major scale** is **D, E, F♯, G, A, B and C♯**, with two sharps. It is a bright, resonant key on guitar: the open D, G, A, B and E strings are all in the scale, so open-position melodies ring freely.',
      'D is also the home key of the most popular alternate tunings. In [Drop D](/drop-d-tuner) and [DADGAD](/dadgad-tuner) the low string is a D, so D major songs gain a deep open root to play against.',
    ],
    practice: [
      'Play the scale in open position, starting on the open D string. The first octave and a half need only the first four frets.',
      'Switch the explorer\'s tuning to Drop D and play the scale with the open low D as a drone.',
      'Practise the scale in sixths on adjacent pairs of strings — a sound common in country and Celtic playing.',
      'Learn a simple fiddle tune in D by ear over the [drone generator](/drone-generator?key=d).',
    ],
    usageHeading: 'The Chords of D Major',
    usage: [
      'The chords of D major are D, Em, F♯m, G, A, Bm and C♯°. D, G and A are all open chords, which is why so many folk and bluegrass songs live here, and why the key is a favourite of fiddle players.',
      'Its relative minor is B minor: the same notes, centred on B.',
    ],
    faqs: [
      {
        question: 'What are the notes of the D major scale?',
        answer: 'D, E, F♯, G, A, B and C♯. It has two sharps: F♯ and C♯.',
      },
      {
        question: 'What chords are in the key of D?',
        answer: 'D, Em, F♯m, G, A, Bm and C♯ diminished.',
      },
      {
        question: 'Is D major good for Drop D tuning?',
        answer:
          'Very. In Drop D the low string is the root, so you can play D major melodies and chords with a deep open D ringing underneath.',
      },
    ],
  },
  {
    slug: 'a-minor-scale',
    root: 'a',
    scale: 'natural-minor',
    name: 'A Minor Scale',
    metaDescription:
      'The A natural minor scale on guitar: notes A B C D E F G, every position on the fretboard, its chords, and how it relates to C major and the pentatonic.',
    lede: 'A B C D E F G — the natural minor scale with no sharps or flats.',
    intro: [
      'The **A minor scale** — the A natural minor, or Aeolian mode — is **A, B, C, D, E, F and G**. Like [C major](/scales/c-major-scale) it has no sharps or flats; it is the same seven notes with A as home. That is what "relative minor" means.',
      'Compared with the [A minor pentatonic](/scales/a-minor-pentatonic-scale), it adds two notes: B, the 2nd, and F, the flat 6th. The F in particular gives natural minor its darker, more sorrowful colour.',
    ],
    practice: [
      'Start from the 5th-fret A minor pentatonic box you already know and add B and F. You have the natural minor in the same position.',
      'Play the scale over an A drone and hold the F. Listen to it lean down towards E — that is the flat 6th\'s pull.',
      'Practise the chord progression Am–F–C–G, then improvise over it using the scale.',
      'Compare with A Dorian, which raises the F to F♯, and hear how much brighter one note makes it.',
    ],
    usageHeading: 'The Chords of A Minor',
    usage: [
      'The chords of A minor are Am, B°, C, Dm, Em, F and G. Many songs swap the Em for an E or E7 chord, borrowed from the [harmonic minor](/scales/a-harmonic-minor-scale), to make a stronger pull back to Am.',
      'Am–F–C–G and Am–G–F–E are two of the most common minor progressions in rock and pop.',
    ],
    faqs: [
      {
        question: 'What are the notes of the A minor scale?',
        answer: 'A, B, C, D, E, F and G. It has no sharps or flats.',
      },
      {
        question: 'What is the difference between natural, harmonic and melodic minor?',
        answer:
          'Natural minor is the plain scale. Harmonic minor raises the 7th (G to G♯ in A) to give a stronger pull to the root. Melodic minor raises both the 6th and the 7th (F♯ and G♯ in A).',
      },
      {
        question: 'Is the A minor scale the same as the Aeolian mode?',
        answer:
          'Yes. Aeolian is the modal name for the natural minor scale: the major scale played from its 6th note.',
      },
    ],
  },
  {
    slug: 'e-minor-scale',
    root: 'e',
    scale: 'natural-minor',
    name: 'E Minor Scale',
    metaDescription:
      'The E natural minor scale on guitar: notes E F♯ G A B C D, one sharp, open position and every position up the neck, plus its chords and uses.',
    lede: 'E F♯ G A B C D — one sharp, and the key of a vast amount of guitar music.',
    intro: [
      'The **E minor scale** is **E, F♯, G, A, B, C and D**, with one sharp, F♯. It is the relative minor of [G major](/scales/g-major-scale) and shares all its notes. Every open string on the guitar is in it, so it is the most natural minor key on the instrument.',
      'In open position you can play two full octaves using only frets 0 to 3, and the open low E is available as a bass note and drone throughout.',
    ],
    practice: [
      'Play the open-position E minor scale with all the open strings ringing.',
      'Use the open low E as a pedal: alternate it with each scale note on the 5th and 4th strings to build riffs.',
      'Practise the progression Em–C–G–D, then improvise over it.',
      'Learn the same scale at the 12th fret and connect it to the open position through the 7th-fret shape.',
    ],
    usageHeading: 'Where You Hear It',
    usage: [
      'Rock and metal riffs, acoustic ballads and folk songs in minor all gravitate to E minor because of the open low E. The chords of the key — Em, F♯°, G, Am, Bm, C and D — include five easy open shapes.',
      'For lead playing, start with the [E minor pentatonic](/scales/e-minor-pentatonic-scale) and add F♯ and C to get the full scale.',
    ],
    faqs: [
      {
        question: 'What are the notes of the E minor scale?',
        answer: 'E, F♯, G, A, B, C and D. It has one sharp, F♯.',
      },
      {
        question: 'What is the relative major of E minor?',
        answer: 'G major. The two keys share the same seven notes.',
      },
      {
        question: 'What chords are in the key of E minor?',
        answer:
          'Em, F♯°, G, Am, Bm, C and D. B or B7 often replaces Bm, borrowed from E harmonic minor.',
      },
    ],
  },
  {
    slug: 'a-harmonic-minor-scale',
    root: 'a',
    scale: 'harmonic-minor',
    name: 'A Harmonic Minor Scale',
    metaDescription:
      'The A harmonic minor scale on guitar: notes A B C D E F G♯, every position on the neck, its chords, and its exotic, neoclassical sound explained.',
    lede: 'A B C D E F G♯ — natural minor with a raised 7th, and an unmistakably dramatic sound.',
    intro: [
      'The **A harmonic minor scale** is **A, B, C, D, E, F and G♯**: the [A natural minor](/scales/a-minor-scale) with its 7th raised from G to G♯. That one change gives the scale a **leading tone** a semitone below the root, which pulls hard back to A, and turns the chord on the 5th degree into E major — the E or E7 that classical and pop composers use to end minor-key phrases.',
      'It also opens a gap of three semitones between F and G♯, an augmented second. That leap is responsible for the scale\'s exotic, Middle Eastern and neoclassical flavour.',
    ],
    practice: [
      'Play the scale slowly over an A drone and dwell on the F–G♯–A at the top. Listen to how insistently G♯ wants to resolve.',
      'Loop Am–E7 and improvise. Over the E7, the G♯ is its major third; over the Am, resolve it to A.',
      'Practise the scale in three notes per string, the fingering neoclassical players use for speed.',
      'Play the same notes starting from E to hear the Phrygian dominant mode, a staple of metal riffs.',
    ],
    usageHeading: 'Where You Hear It',
    usage: [
      'Classical music in minor keys, flamenco, klezmer and neoclassical metal all draw on it. Yngwie Malmsteen and many of the shred players who followed built their style on harmonic minor and its modes.',
      'Most minor-key pop and rock songs use it only for a moment: an E or E7 chord before returning to Am. Over that chord, switch from natural to harmonic minor.',
    ],
    faqs: [
      {
        question: 'What are the notes of the A harmonic minor scale?',
        answer: 'A, B, C, D, E, F and G♯: the natural minor with a raised seventh.',
      },
      {
        question: 'Why is it called harmonic minor?',
        answer:
          'Because the raised seventh exists for the harmony: it makes the V chord major (E instead of Em in A minor), which gives a much stronger resolution back to the tonic.',
      },
      {
        question: 'What is Phrygian dominant?',
        answer:
          'The fifth mode of harmonic minor. Starting A harmonic minor from E gives E F G♯ A B C D, used over an E major chord for a dark, Spanish or Middle Eastern sound.',
      },
    ],
  },
  {
    slug: 'a-dorian-scale',
    root: 'a',
    scale: 'dorian',
    name: 'A Dorian Scale',
    metaDescription:
      'The A Dorian mode on guitar: notes A B C D E F♯ G, every position, how it differs from natural minor, and the funk, jazz and rock songs that use it.',
    lede: 'A B C D E F♯ G — minor with a raised 6th: the funky, soulful minor.',
    intro: [
      'The **A Dorian mode** is **A, B, C, D, E, F♯ and G**. It is a minor scale — it has the minor third, C — but its 6th is natural (F♯) rather than flat. That one note lifts the mood: Dorian sounds minor but not sad, which is why it suits funk, soul, jazz and jam-band soloing.',
      'A Dorian uses the same notes as G major; it is G major played from its second note. You can find every Dorian shape by playing a major scale shape from its 2nd degree.',
    ],
    practice: [
      'Play A Dorian over an A drone and compare it with [A natural minor](/scales/a-minor-scale). Only the F♯ differs; listen for it.',
      'Loop Am7 to D7 — the classic Dorian vamp — and solo, landing on F♯ over the D7.',
      'Start from the A minor pentatonic box and add B and F♯. That is the most common way rock players reach for Dorian.',
      'Try the same idea in D Dorian (all naturals, D to D) and E Dorian.',
    ],
    usageHeading: 'Where You Hear It',
    usage: [
      'Santana\'s "Oye Como Va" vamps between Am7 and D9, the defining Dorian chords. Miles Davis\'s "So What" is built on D Dorian. Funk grooves on a single minor-seventh chord very often call for Dorian rather than natural minor.',
      'Whenever a minor-key song uses a major IV chord — Am to D — Dorian is the scale that fits both chords.',
    ],
    faqs: [
      {
        question: 'What are the notes of the A Dorian scale?',
        answer: 'A, B, C, D, E, F♯ and G: root, 2, ♭3, 4, 5, 6 and ♭7.',
      },
      {
        question: 'What is the difference between Dorian and natural minor?',
        answer:
          'The 6th. Dorian has a major sixth (F♯ in A); natural minor has a minor sixth (F). Everything else is the same.',
      },
      {
        question: 'Which major scale has the same notes as A Dorian?',
        answer:
          'G major. Dorian is the second mode of the major scale, so A Dorian is G major played from A.',
      },
    ],
  },
];

export const getScalePage = (slug: string) => SCALE_PAGES.find((page) => page.slug === slug);

/** The page for a root + scale pair, if there is one. */
export const scalePageFor = (rootPc: number, scaleSlug: string) =>
  SCALE_PAGES.find(
    (page) => page.scale === scaleSlug && ROOTS.find((r) => r.slug === page.root)?.pitchClass === rootPc,
  );

const INTERVAL_NAMES: Record<string, string> = {
  R: 'Root',
  '♭2': 'Minor 2nd',
  '2': 'Major 2nd',
  '♭3': 'Minor 3rd',
  '3': 'Major 3rd',
  '4': 'Perfect 4th',
  '♯4': 'Augmented 4th',
  '♭5': 'Diminished 5th',
  '5': 'Perfect 5th',
  '♯5': 'Augmented 5th',
  '♭6': 'Minor 6th',
  '6': 'Major 6th',
  '♭7': 'Minor 7th',
  '7': 'Major 7th',
};

export const intervalName = (label: string) => INTERVAL_NAMES[label] ?? label;

const mod12 = (n: number) => ((n % 12) + 12) % 12;
const LOW_E = 40;

/** Everything generated for a scale page: spelled notes, the five-fret
 *  positions on the low E string (the same windows the explorer offers),
 *  and the triads of seven-note scales. */
export function scalePageData(entry: ScalePageEntry) {
  const root = ROOTS.find((r) => r.slug === entry.root)!;
  const scale = getScale(entry.scale);
  const { notes } = spellScale(root.pitchClass, scale);

  const positions = notes
    .map((note) => ({ note, fret: mod12(note.pitchClass - LOW_E) }))
    .sort((a, b) => a.fret - b.fret)
    .map(({ note, fret }, i) => {
      const start = fret === 0 ? 0 : fret - 1;
      return { number: i + 1, from: start, to: start + 4, startsOn: note.name, isRoot: note.step === 0 };
    });

  const chords =
    notes.length === 7
      ? notes.map((note, i) => {
          const third = mod12(notes[(i + 2) % 7].pitchClass - note.pitchClass);
          const fifth = mod12(notes[(i + 4) % 7].pitchClass - note.pitchClass);
          const quality =
            third === 4 && fifth === 7
              ? 'major'
              : third === 3 && fifth === 7
                ? 'minor'
                : third === 3 && fifth === 6
                  ? 'dim'
                  : third === 4 && fifth === 8
                    ? 'aug'
                    : null;
          const chordRoot = ROOTS.find((r) => r.pitchClass === note.pitchClass)!;
          const slug = quality === 'major' ? chordRoot.slug : quality ? `${chordRoot.slug}-${quality}` : null;
          return {
            name: quality ? `${note.name}${QUALITY_SUFFIX[quality]}` : note.name,
            degree: i + 1,
            href: slug && CHORD_BY_SLUG.has(slug) ? `/chords/${slug}` : null,
          };
        })
      : [];

  return { root, scale, notes: notes as SpelledScaleNote[], positions, chords };
}
