/** Which chords are promoted, indexed, and listed in the sitemap.
 *
 *  The library builds a chord page for every root × quality combination, which
 *  is ~156 pages. Most of them are legitimate — every shape is theory-checked —
 *  but a search engine crawling 156 near-identically structured pages reads the
 *  set as programmatically generated thin content, which is exactly the profile
 *  that gets a site rejected from ad networks and buried in search.
 *
 *  So we curate: the chords a guitarist actually looks up stay indexed and are
 *  featured on /chords; the long tail (augmented triads, minor 6ths, and
 *  extended chords in the less-used keys) still renders and is still linked,
 *  but carries `noindex` and is kept out of the sitemap.
 *
 *  This is deliberately reversible. Once the domain has standing, individual
 *  pages that prove they draw real search interest can be promoted by adding
 *  their slug to `ALWAYS_INDEXED` below — nothing else needs to change. */

import { CHORDS, type Chord } from './index';

/** Chord qualities a typical player searches for by name. */
const EVERYDAY_QUALITIES = new Set([
  'major',
  'minor',
  '7',
  'm7',
  'maj7',
  'sus4',
  'add9',
  '5',
]);

/** Natural-letter roots — the open-position and first-choice keys. */
const NATURAL_ROOTS = new Set(['c', 'd', 'e', 'f', 'g', 'a', 'b']);

/** Accidental-root chords common enough to keep indexed on their own merit —
 *  the barre-chord keys that turn up constantly in real songs. */
const ALWAYS_INDEXED = new Set([
  'b-flat',
  'e-flat',
  'a-flat',
  'f-sharp',
  'c-sharp',
  'b-flat-minor',
  'f-sharp-minor',
  'c-sharp-minor',
  'e-flat-minor',
  'b-flat-7',
  'f-sharp-7',
  'c-sharp-7',
]);

/** Slugs that should stay out of the index even though the rule would keep
 *  them. Empty for now — here so the intent is obvious. */
const NEVER_INDEXED = new Set<string>();

export function isChordIndexed(slug: string): boolean {
  if (NEVER_INDEXED.has(slug)) return false;
  if (ALWAYS_INDEXED.has(slug)) return true;

  const chord = CHORDS.find((c) => c.slug === slug);
  if (!chord) return false;

  return (
    NATURAL_ROOTS.has(chord.root.slug) &&
    EVERYDAY_QUALITIES.has(chord.quality.slug)
  );
}

/** Chords that are featured, indexed, and in the sitemap. */
export const INDEXED_CHORDS: Chord[] = CHORDS.filter((chord) =>
  isChordIndexed(chord.slug),
);

/** Chords that still render and are still linked, but carry noindex. */
export const NONINDEXED_CHORDS: Chord[] = CHORDS.filter(
  (chord) => !isChordIndexed(chord.slug),
);
