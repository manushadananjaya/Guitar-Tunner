/** Verifies every shipped chord voicing sounds the chord it claims to.
 *  Run with: npx tsx scripts/validate-chords.ts */
import {
  validateChordLibrary,
  CHORDS,
  ROOTS,
  QUALITIES,
  getChord,
  chordSlug,
} from '../lib/chords/index';
import { UKE_CHORDS, validateUkeLibrary } from '../lib/ukulele/chords';

const issues = validateChordLibrary();
const voicings = CHORDS.reduce((n, c) => n + c.voicings.length, 0);

console.log(`chords:   ${CHORDS.length} / ${ROOTS.length * QUALITIES.length}`);
console.log(`voicings: ${voicings}`);

const missing: string[] = [];
for (const root of ROOTS) {
  for (const quality of QUALITIES) {
    if (!getChord(chordSlug(root, quality))) {
      missing.push(`${root.ascii}${quality.suffix}`);
    }
  }
}

if (missing.length) console.log(`\nmissing (${missing.length}): ${missing.join(' ')}`);

if (issues.length) {
  console.log(`\nISSUES (${issues.length}):`);
  for (const i of issues.slice(0, 40)) {
    console.log(`  ${i.chord} [${i.voicing}] — ${i.reason}`);
    console.log(`     expected ${i.expected.join(',')}  actual ${i.actual.join(',')}`);
  }
  process.exit(1);
}

console.log('\nAll guitar voicings validate against chord theory.');

// Ukulele: same rule, GCEA tuning.
const ukeIssues = validateUkeLibrary();
console.log(`\nukulele chords: ${UKE_CHORDS.length}, voicings: ${UKE_CHORDS.reduce((n, c) => n + c.voicings.length, 0)}`);
if (ukeIssues.length) {
  console.log(`UKULELE ISSUES (${ukeIssues.length}):`);
  for (const i of ukeIssues.slice(0, 40)) console.log(`  ${i}`);
  process.exit(1);
}
console.log('All ukulele voicings validate against chord theory.');
