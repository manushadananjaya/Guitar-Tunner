# GuitarTunePro — Growth & SEO Roadmap

Goal: more organic traffic and higher session depth, without tripping Google's
low-value-content / scaled-content policies.

---

## Context: the "low value content" flag

Diagnosed 2026-08-21. Four contributing causes, in severity order:

1. **Doorway pages.** `/drop-d-tuner`, `/open-g-tuner`, `/half-step-down-tuner`
   are titled as tuners but contain no tuner — just prose and a CTA to `/`.
   This matches Google's doorway-page definition almost word for word.
2. **Fabricated `aggregateRating`** in the homepage JSON-LD (4.9 / 312 ratings
   that exist nowhere on the site). Structured-data spam.
3. **Templated-bulk fingerprints.** All 12 articles share `dateModified`
   `2026-03-29`; several have future `datePublished` values.
4. **No E-E-A-T or original media.** Every hero is a hotlinked Unsplash stock
   photo; author is an Organization with no named person or bio; no original
   screenshots of our own tuner.

AI authorship itself is not the problem. Templated bulk with no first-hand
value is.

---

## Step 1 — Make every tuner landing page a real tool  ✅ DONE

Fixed causes #1 and #2 above, and captures per-tuning search terms.

- [x] Add `initialTuning` / `initialGuitarType` props to `ProfessionalTuner`
- [x] Add presets: DADGAD, Drop C, Drop C#, Drop B, Open E, Open C
- [x] Fix 7-string low-B bug (`-35` semitones is Bb1, should be `-34`)
- [x] New `TunerPageLayout` that embeds the live tuner above the prose, and
      derives its frequency chart from `getTuningForGuitar` so the published
      numbers can never drift from what the tool listens for
- [x] Convert the 3 existing landing pages to it
- [x] New pages: open-d, open-a, open-e, open-c, dadgad, drop-c,
      full-step-down — 10 tuner pages total
- [x] Remove the fake `aggregateRating`
- [x] `lib/tunerPages.ts` registry drives sitemap, navbar, homepage grid, and
      the cross-links on each tuner page
- [x] Navbar "Tunings" dropdown; homepage grid now lists all 10

Known follow-up, not blocking: `ProfessionalTuner` returns `null` until mount
(hydration guard), so the tool is absent from the server-rendered HTML.
Googlebot renders JS so it will see it, but a skeleton placeholder during SSR
would be safer and better for CLS.

## Step 2 — Instrument tuner pages  ✅ DONE

- [x] `/bass-tuner`, `/5-string-bass-tuner`, `/ukulele-tuner`,
      `/7-string-guitar-tuner`, `/12-string-guitar-tuner`
- [x] `lib/instrumentPages.ts` registry, mirroring `lib/tunerPages.ts`
- [x] Added 5-string bass (B0 E1 A1 D2 G2) — the homepage FAQ already claimed
      5-string support that did not exist
- [x] `TunerPageLayout` gained `chartMode="courses"` for the 12-string and
      `chartCaption` for the reentrant ukulele
- [x] Navbar generalised to two dropdowns (Tunings, Instruments); homepage
      gained an instruments grid; sitemap covers all 15 tool pages

### Three real bugs found and fixed along the way

1. **7-string low B was a semitone flat.** `-35` semitones from A4 is B♭1
   (58.27 Hz); B1 is `-34` (61.74 Hz).
2. **Ukulele A string was untunable.** Its target frequency was a literal `0`
   instead of `freqFromSemitones(0)`. `detectPlayingString` skips targets
   `<= 0` and `centsFromFrequency` returns 0 for them, so the string the GCEA
   tuning is named for could never be tuned.
3. **12-string top two courses were octave pairs, not unison.** The data asked
   for B4 (493.88 Hz) and E5 (659.26 Hz) octave strings. Real 12-strings tune
   the B and E courses in unison precisely because those octave strings sit at
   their breaking point. Anyone following the old chart would have snapped
   strings.

All 13 six-string presets plus every instrument tuning were verified
note-by-note against A4 = 440 equal temperament.

## Step 3 — Metronome  ✅ DONE

- [x] `/metronome` — 30-300 BPM, 2-7 beats per measure, eighth/triplet/
      sixteenth subdivisions, accented downbeat, tap tempo, volume
- [x] Keyboard shortcuts: space, arrows, T
- [x] Cross-linked from navbar, homepage, and the tuner pages

**Did not reuse `useAudioTone`.** Its `playSequence` chains `setTimeout`,
which is unusable for a metronome — browser timers are clamped, queue behind
main-thread work, and get throttled hard in background tabs, so beats drift
audibly within a minute. `hooks/useMetronome.ts` instead uses the
lookahead-scheduler pattern: a 25 ms interval that never plays anything
itself, only schedules beats falling in the next 100 ms onto the
sample-accurate Web Audio clock. Verified zero cumulative drift over a
simulated 60 s.

Also extracted `components/ToolPageLayout.tsx` — the generic shell (header,
tool slot, prose, FAQ, links) now shared by the metronome page and
`TunerPageLayout`, rather than duplicated.

Verified in a real browser (Playwright): beat dots advance in sequence
(1000 → 0100 → 0010 → 0001), meter switching redraws the dots, transport
starts and stops cleanly, tap tempo returns exactly 120 BPM from 500 ms taps,
no console errors.

Note: unlike `ProfessionalTuner`, the metronome renders a skeleton during SSR
instead of `null` — the better pattern, and worth backporting to the tuner.

## Step 4 — Chord library  ✅ DONE

- [x] `/chords` index (hand-written long-form guidance) and 156
      `/chords/[slug]` pages — 12 roots × 13 qualities, 281 voicings
- [x] `ChordDiagram` is a **server** component, so the diagrams are in the
      server-rendered HTML rather than appearing only after hydration
- [x] `ChordPlayer` strums the voicing with per-string delay and stacked
      harmonics (a bare sine sounds nothing like a guitar)
- [x] Sitemap, navbar, homepage cross-links

### Correctness by construction

Chord charts on the web are frequently wrong because they were copied by hand.
This library is generated and then verified:

- Barre voicings are transposed programmatically from a small set of movable
  shapes; open positions are entered individually.
- `validateChordLibrary()` recomputes the pitch classes each fingering actually
  sounds and compares them against the chord formula. A voicing that does not
  match is dropped rather than published.
- Enharmonic spelling is derived from scale degrees, so C♯ major is spelled
  C♯ E♯ G♯, not C♯ F G♯.
- Run it with `npm run validate:chords`.

The validator caught two genuine bugs during the build: `buildMovable`
rejected root fret 0 (which silently dropped Adim and Aaug entirely), and the
duplicate-voicing check compared `String(null) → Number("null") → NaN`, so it
never matched anything.

### Site-wide title bug fixed along the way

The root layout sets `title.template = "%s | GuitarTunePro"`, but 22 pages also
hardcoded the brand, so their `<title>` rendered
`... | GuitarTunePro | GuitarTunePro`. This predated Steps 1-4 (the homepage,
contact, privacy policy, and the original tuner pages all had it). All page
titles now omit the brand and let the template add it.

The one exception is `app/page.tsx`: Next applies `title.template` only to
*child* segments, and the homepage shares the root segment with the layout, so
it spells the brand out itself. That is commented in the file — stripping it
there is a regression, and it is an easy one to make.

---

## Deferred (agreed to do later)

## Step 5 — Scale up articles

Currently 12. Competitors in this niche run 50-100+. Target long-tail
"how to tune X to Y" queries.

- [ ] Fix the uniform/future dates on the existing 12 first — otherwise new
      articles inherit the same templated fingerprint
- [ ] Replace Unsplash heroes with original screenshots of our tuner
- [ ] Add a named author with a real bio (E-E-A-T)
- [ ] Then expand the corpus, steadily rather than in one bulk drop

## Step 6 — PWA / installable + offline

- [ ] Service worker, offline tuner
- [ ] Richer `site.webmanifest`, install prompt
- [ ] Improves retention and captures app-intent searches
