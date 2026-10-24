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

## Step 5 — Article credibility groundwork  ✅ (corpus expansion still to do)

### Fabricated publication dates — fixed

The articles claimed `datePublished` spread across Nov–Dec 2024. The repo's
first commit is **2026-03-21** and the article files were added **2026-03-23**,
so those dates predated the project by over a year. Backdating provenance in
JSON-LD is exactly the kind of signal that feeds a low-value assessment.

- [x] `datePublished` set to 2026-03-23 (when the files actually appeared)
- [x] `dateModified` set to 2026-08-21 (a genuine edit — this work)
- [x] Sitemap `lastModified` aligned
- [x] Removed a duplicate hand-written Article JSON-LD block from
      `does-a-capo-affect-guitar-tuning` that conflicted with the one
      `ArticleLayout` already emits

### Original media

- [x] Captured real screenshots of our own tools into `public/screenshots/`
- [x] Used on the four articles where a screenshot genuinely beats a photo:
      chromatic-tuner, beginners, alternate-tunings, drop-d-guide
- [x] `ArticleLayout` heroes gained `fit: "contain"` so UI screenshots are not
      cropped like photographs

### Named author — WAITING ON YOU

`lib/author.ts` exports `SITE_AUTHOR`, currently `null`. While it is null,
articles are attributed to the organisation exactly as before. Set it to a
real person and the Person JSON-LD, the byline, and the author box all switch
on together.

**Nothing is rendered until you supply a real name and bio.** A fabricated
author is worse than none — it is deceptive, and Google treats invented author
credentials as a spam signal in its own right. Only write what is true.

### Still to do

- [ ] Expand the corpus beyond 12 articles, steadily rather than in one drop
- [ ] Eight articles still hotlink heroes from `images.unsplash.com`
      (agreed to leave for now). Two open questions: whether the Unsplash
      licence suits an ad-supported site, and that hotlinking leaves you
      dependent on their CDN.

## Step 6 — PWA / installable + offline  ✅ DONE

- [x] `public/site.webmanifest` rewritten. It previously had **empty `name`
      and `short_name`**, white theme colours on a dark site, and was **never
      referenced from the layout** — so the app was not installable at all.
      Now has name, description, dark theme colours, three icons, and app
      shortcuts to Tuner / Metronome / Chords.
- [x] `manifest` + `appleWebApp` in layout metadata; `themeColor` in viewport
- [x] `public/sw.js` — navigations network-first (a stale cache can never mask
      a deploy), hashed `/_next/static/*` cache-first, images
      stale-while-revalidate, and **cross-origin requests untouched** so ad and
      analytics traffic is never cached
- [x] `/offline` fallback page, `noindex`
- [x] Versioned caches, cleaned on activate; `SKIP_WAITING` so a deploy is
      picked up on the next navigation

Verified in a real browser: worker registers and takes control, tuner /
metronome / chords all load with the network off, the metronome keeps correct
beat sequencing offline, an uncached URL falls back to `/offline`, and
reconnecting serves fresh content rather than cache.

**Bug found and fixed during verification:** registration was gated on
`window.load`. That event waits for every subresource including the AdSense
and Google Analytics scripts, so on this site it fires very late — and if
those requests hang, never. Registration now happens directly in the effect,
which already runs after hydration.

Note for future debugging: the registrar is intentionally a no-op in
development, so a stray `next dev` on port 3000 will look like a broken
service worker. Test against `npm run build && npm run start`.

## Step 7 — Design system, warm palette, light/dark  ✅ (pass one)

The site read as generic because of specific, findable faults — not vibes:

- **The homepage had no real `<h1>`.** Its only H1 was the tuner's note
  readout, which renders as `-` when idle. No headline, nothing for a screen
  reader, nothing keyword-bearing on the money page.
- **The tuner card was 682 px tall and mostly empty**, because the note area
  was reserved at `text-9xl` but blank while idle. On mobile that pushed the
  gauge entirely off-screen.
- **Three components all announced "not started"** — a STANDBY pill, a
  full-width banner, and an "Action Required" panel.
- **`next-themes` and a `ThemeProvider` were installed but never imported**,
  and `globals.css` defined tokens that nothing consumed. ~755 colour
  usages were hardcoded `zinc`/`cyan`/hex across 34 files.

Fixed:

- [x] Warm token system in `globals.css` — espresso/brass in dark, warm paper
      in light, with a real elevation ladder (canvas → surface → raised)
      instead of one flat colour and faint borders
- [x] Migrated all ~755 hardcoded colour usages to semantic tokens
      (`bg-canvas`, `text-ink-muted`, `border-line`, `text-brass`, …)
- [x] `ThemeProvider` wired up; `ThemeToggle` in desktop and mobile nav
- [x] Real `<h1>` + subtitle on the homepage; note readout is now a
      `role="status"` live region, not a heading
- [x] Idle tuner shows the **target** note and frequency (e.g. "E2 / target
      82.41 Hz") instead of a giant placeholder dash
- [x] Removed the redundant standby banner
- [x] Gauge fixed for light mode — it used `rgba(255,255,255,…)` strokes that
      were invisible on a light ground, and the idle needle rotated to −90°,
      jutting out sideways as if broken. Now `currentColor` and centred.
- [x] Chord diagram SVG themed — hardcoded cyan/zinc fills survived the class
      migration because they are SVG attributes, not classes
- [x] Ambient background glows warmed and made dark-only (cold blue blurs
      turned into a dirty smear on cream)
- [x] Fixed a text bug: "x**means** don't play that string"

## Step 8 — Pass two: contrast, type scale, spacing  ✅ DONE

### WCAG AA contrast — 73 failures → 0

`npm run audit:contrast` (needs `npm run build && npm run start` first) walks
five representative pages in both themes, composites each element's real
background through its ancestors, and reports anything under AA.

Colours are resolved via a **canvas**, not a regex. The first version of this
audit parsed `getComputedStyle().color` directly and reported nonsense —
Tailwind v4 emits `oklab()`/`lab()`/`color-mix()`, which a regex silently
mangles into near-black. It claimed 30+ failures on pages that were fine, and
missed real ones. Worth remembering if the script is ever extended.

Real failures it then found and that were fixed:

- `--foreground-subtle` failed in **both** themes — 2.9:1 on light (most
  captions, labels, and footer text) and 4.43:1 on dark, just under.
- Light `--accent` measured 3.55:1, failing for links and labels at body size.
- Light `--in-tune` measured 4.12:1.
- Leftover `emerald`/`rose`/`blue` state colours the token migration missed,
  because they are semantic states rather than surface colours.

### Type scale

- [x] 21 ad-hoc `text-[10px]`/`text-[11px]` values consolidated onto a defined
      `text-2xs` (11px) step — 0 off-scale sizes remain
- [x] Two competing tracking values normalised to one; added an `.eyebrow`
      component class so the repeated uppercase-label pattern is defined once

### Spacing and layout

- [x] Tuner card padding and section gaps tightened; the gauge now scales up
      on desktop instead of sitting small in a tall, mostly empty panel

### Other

- [x] Gauge gradient driven by the state tokens, so the arc and the note
      readout can no longer disagree
- [x] Manifest `theme_color` was a stale `#050510` matching neither theme;
      now `#17120e`, with media-query `theme-color` tags plus a
      `ThemeToggle` effect that syncs the tag to an explicit user choice
      (media queries alone follow the OS, not the in-app selection)
- [x] Fixed stale copy: the tuner guidance still called the selected-note
      indicator "cyan" after the accent became brass
- [x] 0 hardcoded colour classes remain outside `components/ui/`

### Still open

- [ ] The logo PNG is still cyan and clashes with the brass accent — you said
      you'd redraw it.
- [ ] Contrast audit covers five representative pages, not all 191.
- [ ] `components/ui/*` (shadcn primitives) still use the shadcn token names.
      They inherit the palette correctly but were not reviewed individually.

## Step 9 — SEO audit  ✅ DONE

Three repeatable audits, all requiring `npm run build && npm run start` first:

- `npm run audit:seo` — titles, descriptions, canonicals, H1 counts, JSON-LD
  validity, and duplicates across every sitemap URL
- `npm run audit:links` — orphans, dead ends, inbound counts, click depth
- `npm run audit:contrast` — WCAG AA in both themes

### Sitemap

Complete. Every prerendered route appears except `/_global-error` (internal)
and `/offline` (intentionally `noindex`), and nothing in the sitemap 404s.
191 URLs, generated from the page registries so it cannot drift.

### Fixed

- **19 titles over 62 chars and 14 descriptions over 165** — all were being
  truncated in search results. Rewritten; 0 remain over the limit.
- **56 chord pages had only one inbound link.** `relatedChords` always sliced
  from index 0, so all 156 pages linked to the same handful of siblings and
  the qualities late in the array (6, m6, add9, dim, aug, 5) got no sibling
  links at all. Now rotates to start after the chord's own position, forming
  a ring — every chord links forward and therefore receives links back.
  0 pages now have fewer than 2 inbound links.
- **157 pages under 300 words of server-rendered text**, 156 of them chord
  pages. On a site already flagged for low-value content this was the biggest
  remaining risk. Fixed with *computed* per-chord content rather than padding:
  diatonic key membership with roman numerals and matching progressions, plus
  note-set relationships (C6 ≡ Am7, Csus4 ≡ Fsus2, and the three-way symmetry
  of augmented triads). Down to 22, and those sit at 283–293 words with
  diagrams, audio, and a notes table — legitimate reference pages.

### Clean

0 missing or duplicate titles / descriptions / canonicals · exactly one H1 per
page · 0 invalid JSON-LD · 0 images without alt text · 0 orphans · 0 dead ends
· max click depth 2 · robots.txt points at the sitemap.

### Not covered

- Off-page factors: backlinks, Search Console submission, Core Web Vitals
  under real network conditions.
- `ProfessionalTuner` still renders `null` before mount, so tool pages carry
  less server-rendered content than they appear to. Googlebot renders JS, but
  a skeleton would be safer — same note as Step 1.

---

## Step 10 — Three tools that only this site has  ✅ DONE

AdSense's "low value content" wording asks for *unique* tools and *sustained
user interest*. The tuner, metronome and chord library are good but every
competitor has them. These three are not commodity pages, and one of them is
built to bring people back daily.

### `/chord-finder` — reverse chord lookup

Tap frets on a 15-fret board, get the chord name. `lib/chords/identify.ts` is
`validateChordLibrary` run backwards: it computes the pitch classes the
fingering actually sounds and searches every root × quality formula. Because
both directions share the formulas, anything this names is under that name in
`/chords`, and vice versa.

- Works in all 13 six-string tunings. `lib/tuningMidi.ts` derives MIDI numbers
  from `TUNING_PRESETS` frequencies so the tuner and the finder can never
  disagree about what a tuning is.
- Names slash chords / inversions (C/E), recognises omitted 5ths on 4-note
  chords, ranks complete > slash > simpler, and spells notes from the
  winning chord (C♯ E♯ G♯, not C♯ F G♯).
- URL carries state (`?t=dadgad&f=0-0-0-0-0-0`) — every shape is a link.

### `/ear-training` — interval & chord-type trainer

Intervals (13, three levels, up/down/harmonic) and chord types (9, three
levels, strummed/arpeggio). Song cue on every miss. Session score, streak,
best streak and per-answer accuracy in localStorage — the "weak spots" list
only appears after 4+ attempts and under 80%. Keyboard: R / N / 1–9.

This is the return-visit feature. Everything else on the site is one-and-done.

### `/string-tension-calculator`

Per-string tension from gauge, scale and pitch using the standard
`T = UW·(2LF)²/386.4`. Plain steel is exact from geometry; wound unit weight
is a fitted quadratic (`d²·(0.196 − 0.3d)`) — verified against published
10–46 figures: 17.6/19.5/18.5/16.6/15.4/16.3 lb vs 17.5/19.5/18.4/16.6/15.4/16.2,
total 104.0 vs 103.6. The genuinely useful part is the recommendation: for
each string, the *stocked* single gauge whose tension in the chosen tuning
matches the chosen set in standard. Reference is anchored to the chosen set
(`baseline`), so loading the suggestions is judged against the original feel
rather than against itself.

### Shared plumbing

- `lib/synth.ts` — the plucked-string synth extracted from `ChordPlayer`, with
  one page-wide `AudioContext`. All three tools and the chord pages now sound
  like the same instrument.
- `lib/toolPages.ts` — registry driving the navbar **Tools** menu, the footer,
  the sitemap and each tool's cross-links. Navbar bar is now Tuner + four
  menus; Chords/Metronome/Vocal moved into Tools.
- `lib/intervals.ts` — interval names and song cues, used by both the finder
  (two-note shapes) and the trainer.
- Homepage gained a "Practice & Setup" grid for the three new tools.

Verified in a real browser (Playwright, production build): C → C/E when the
low E is opened, E5 named as a power chord (not "Octave" — a bug caught and
fixed in the interval measure), E shape in Drop D → E7/D, DADGAD open strings
→ Dsus4 from a shared URL; trainer answers via keyboard and persists stats;
10–46 in Drop C reads 77% and the suggested 11–59 set lands at 103%; Tools
menu lists all six; no horizontal overflow at 390 px; zero console errors
(the only 404 is Vercel's analytics script, absent locally).

### Bug found along the way

The fretboard's `aria-label`s and the notes table numbered strings backwards
(state index 5 is the high E — string **1**). Visual layout was right, labels
were not. Caught because the Playwright test clicked "String 6, fret 0" and
the URL showed string 1 muting.

### Not done

- No ESLint config exists in the repo (`npm run lint` fails on ESLint 10), so
  the new files are type-checked but not linted. Pre-existing.
- Wound-string unit weight is one fit for nickel-wound; bronze acoustic sets
  reuse it with a stated ±3%. A per-material table would tighten this.
- The ear trainer's stats are per device. Accounts would let streaks follow a
  user, but that needs a backend the site does not have.

---

## Step 11 — Practice tools and return visits  ✅ DONE (2026-10-09)

GSC at the time: ~82 clicks / ~1,000 impressions, CTR ~8% — people click when
they see the site, but it is shown for too few queries. So each new tool
targets a query the site did not cover, and several are built to bring people
back daily rather than once.

### Nine new tools (all in `lib/toolPages.ts`, so nav/footer/sitemap follow)

| Route | What it does |
|---|---|
| `/practice-routine` | Timed 10/20/30-min routines, daily chord pair + scale + strum pattern, streak, 12-week calendar |
| `/scales` | 12 scales × 12 keys × every 6-string tuning on a fretboard; positions, intervals, playback, drone |
| `/fretboard-trainer` | Name-the-note / find-the-note quiz, per-string accuracy, answer times |
| `/chord-transposer` | Paste a chord sheet, transpose with alignment kept, key detection, diagrams, capo hint |
| `/capo-calculator` | Ranks capo frets by open-shape score; shapes ↔ capo ↔ sounding key; server-rendered capo chart |
| `/strumming-patterns` | 12 patterns, sequenced strums over real voicings, beat highlight |
| `/chord-progressions` | Roman-numeral builder, 10 presets, loops as a backing track, shareable URL |
| `/circle-of-fifths` | Clickable SVG circle, signatures, diatonic chords, cadence playback |
| `/intonation-checker` | Mic: 12th-fret harmonic vs fretted 12th per string, saddle direction |

### Shared plumbing

- `lib/music/scales.ts` — scales, letter-based spelling (F♯ major has E♯),
  keys, signatures, diatonic chords. `lib/music/transpose.ts` — chord-symbol
  parser (strict, so lyric words like "Be" do not parse), sheet transposition,
  key guessing, capo scoring. `lib/music/libraryChord.ts` maps a symbol onto
  the chord library for diagrams/audio.
- `hooks/useLoopScheduler.ts` — the metronome's lookahead scheduler,
  generalised to a looping step grid (strumming trainer + progression player).
- `lib/synth.ts` — `strumAt`, `mutedStrumAt`, `clickAt`, `startDrone`.
- `lib/practiceLog.ts` — on-device practice log. The ear trainer, fretboard
  trainer, scales, strumming trainer and progression builder all call
  `logPractice`, so using any of them keeps the streak alive.
- `components/Fretboard/Fretboard.tsx`, `components/Segmented.tsx` — shared UI.
- Strumming patterns are checked by `validatePattern` (down on even slots, up
  on odd — the hand never stops), not trusted.

### Engagement hooks in existing pages

- Tuner (`ProfessionalTuner`): strings that hold in tune for 0.6 s light up;
  once all are tuned, a "now play something" panel links to the routine,
  strumming, scales and the backing loop.
- Homepage "More Than a Tuner" grid now features six tools, led by the routine.
- Navbar Tools menu is two columns (15 entries).

### Bug fixed along the way: `prose` never worked

The layouts use `prose prose-h2:…` classes from `@tailwindcss/typography`,
which was never installed — so every article and tool page rendered h2s at
body size and lists with no markers. Rather than add the dependency (both
`package-lock.json` and `pnpm-lock.yaml` exist, and changing one risks the
deploy), `app/globals.css` now defines zero-specificity `:where(.prose)` rules
for headings, lists, links, code and blockquotes. Existing utilities still win.

### Verified

`tsc` clean, `npm run build` clean, `validate:chords` passes, `audit:links`
126 pages / 0 orphans / 0 dead ends / depth ≤ 2. `audit:seo` — all new pages
within title/description limits; 3 long titles remain on pre-existing pages
(chord-finder, ear-training, string-tension-calculator), left alone since they
may already rank. Playwright against the production build: 65 checks covering
every tool's main interaction, URL deep links, 375 px overflow, and both mic
tools with Chromium fake audio (E3 tone → intonation "Good"; flat E2 → tuner
marks string 6).

### Not done

- Practice history is per device (no backend), so streaks do not sync.
- Intonation checker is six-string only, like the other tuning-aware tools.

## Step 12 — Six more instrument tuners  ✅ DONE

Reach beyond guitarists: each is a real tuner page, not a doorway.

- [x] `/violin-tuner`, `/viola-tuner`, `/cello-tuner`, `/mandolin-tuner`,
      `/banjo-tuner` (5-string, open G), `/baritone-ukulele-tuner`
- [x] Tunings in `lib/tuningPresets.ts`, entries in `lib/instrumentPages.ts`
      (navbar, footer, homepage grid and sitemap pick them up); Instruments
      menu is now two columns
- [x] Banjo stored 5th-string-first like the reentrant ukulele; mandolin
      courses are unison so each course is one target
- [x] Bowed instruments (`BOWED_INSTRUMENTS`) get metronome / ear-training
      links in the post-tuning prompt instead of guitar practice tools
- [x] All 25 new string targets verified against A4 = 440 equal temperament;
      `tsc`, build, `audit:seo`, `audit:links` clean

### Known, not fixed

- The 5-string bass low B (30.87 Hz) sits below the detector's 40 Hz floor
  in `lib/pitchDetection.ts`; it only reads via harmonics.
- The tuner is fixed at A = 440. String pages tell orchestral players to aim
  for +8 cents at A = 442 rather than offering a reference-pitch setting.

## Step 13 — Spanish tuner pages  ✅ DONE (pass one)

Spanish searches ("afinador de guitarra", "afinador de bajo"…) are a large,
less contested market. Started with four tool pages rather than a bulk
translation, to stay clear of scaled-content signals.

- [x] `/es`, `/es/afinador-de-bajo`, `/es/afinador-de-ukelele`,
      `/es/afinador-de-violin` — hand-written Spanish prose and FAQ, not a
      line-by-line translation (adds a solfège ↔ letter-name section)
- [x] Whole tuner UI translatable via `lib/i18n/tuner.tsx` (`locale` prop on
      `ProfessionalTuner`, `TunerPageLayout`, `ToolPageLayout`); Spanish shows
      notes in solfège (Mi, La, Re…), chart shows "Mi2 (E2)"
- [x] `lib/i18n/esPages.ts` registry drives hreflang (both sides +
      x-default), sitemap `xhtml:link` alternates, the English/Español switch
      on paired pages, and Spanish cross-links
- [x] Verified: build, `audit:seo`, `audit:links`, hreflang in served HTML,
      Playwright with a fake-mic E2 tone on `/es` → "Mi, +3 cents · Afinada"

### Not done

- Navbar and footer stay English on Spanish pages; `<html lang>` is "en"
  site-wide (the root layout is shared), so Spanish content carries
  `lang="es"` on its wrapper instead. A proper fix is a `(es)` route group
  with its own root layout.
- Practice tools, chords and articles are English only; post-tuning links
  from Spanish pages point at them.
- Superseded by Step 16 (all tuner pages in four languages, html lang fixed).

## Step 14 — Tuner upgrades: reference tone, reference pitch, low-note fixes  ✅ DONE

- [x] **Play the target note** under the gauge (`playReferenceNote` in
      `lib/synth.ts`). Detection is ignored while it sounds, or the mic would
      hear the speaker and mark the string tuned.
- [x] **Reference pitch** 415–466 Hz with 432/440/442/443 shortcuts in the
      settings panel, saved per device. `scaleTuning` retargets every string;
      notes are still named on the 440 grid so A = 432 reads "A".
- [x] **`/432-hz-tuner`** page (in the Tunings registry); the 432 article now
      links to it.
- [x] **Octave folding**: phone mics often hear a bass string's 2nd harmonic.
      String detection already tolerated octaves, but cents did not, so a bass
      low E could read +1200 and say "loosen". `foldOctave` fixes the reading
      unless another string matches better.
- [x] **5-string low B**: detector floor drops below 40 Hz only for
      instruments that need it (`minFrequency` on `usePitchDetector`).
- [x] **Detector accuracy**: normalised ACF + parabolic interpolation around
      the chosen peak (selection unchanged, so no new octave errors). Quiet
      mean error 2.0 → 1.0 cents across six strings; high E 4.54 → 0.17.
      `/accuracy` table re-run and updated. ACF now stops at the largest lag
      it can use — about half the per-frame work for guitar.

### Known

- Low B (30.87 Hz) still reads roughly +4 to +13 cents on a synthetic tone:
  a 4096-sample window holds only ~2.6 periods. A bigger window would fix it
  but quadruples the O(n²) autocorrelation cost.

## Step 15 — Embeddable tuner widget  ✅ DONE

For links from teachers, lesson blogs and clubs.

- [x] `/embed/tuner` — compact `ProfessionalTuner` (`compact` prop: gauge,
      play button, string chips), options from the query string
      (`instrument`, `tuning`, `lang`, `a4`, `theme`); unknown values fall
      back to defaults. `noindex, follow`, canonical to the builder.
- [x] `HideOnEmbed` drops the navbar, footer, AdSense, GA and the service
      worker on `/embed/*` — AdSense must not serve inside someone else's
      frame, and the builder page promises no tracking cookies.
- [x] `?theme=` uses next-themes `forcedTheme`, never `setTheme`: the
      builder's preview frame is same-origin, and a saved theme would have
      flipped the whole site for that visitor (caught in testing).
- [x] `/embed-tuner` builder: options, live preview, copy button. Credit
      link uses the brand as anchor text and points at the matching
      instrument page — keyword-rich widget links count as a link scheme.
- [x] Verified cross-origin from a page on another port with a fake mic:
      Spanish, dark, bass → "Mi, +0 cents · Afinada"; zero ad/GA/SW requests.

## Step 16 — Every tuner page in Spanish, Portuguese, French and German  ✅ DONE

23 tuner pages × 4 languages (88 new, plus the 4 hand-written Spanish ones).
Scope chosen by the user: tuner pages only — tools, chords and articles stay
English, which keeps clear of scaled-content risk.

- [x] `lib/i18n/pages.ts` registry: every language's URL for each English
      tuner page (localized slugs: /pt/afinador-de-bandolim,
      /fr/accordeur-alto, /de/geige-stimmen …). Drives hreflang, sitemap,
      navbar selector, cross-links.
- [x] `lib/i18n/content/{es,pt,fr,de}.ts`: each page's own intro, sections
      and FAQ — written per language with local context (violão vs guitarra,
      bandolim/choro, viola de arco vs caipira, Bensusan/DADGAD, German H and
      Es/As/Des, 443 Hz orchestras), not machine-templated.
- [x] `LocalizedTunerPage` renders them; the how-to steps are generated from
      the tuning data, so every note and frequency matches what the tuner
      listens for. Decimal comma in pt/fr/de; French non-breaking spaces.
- [x] Tuner UI in all five languages; note names Do/Dó/Do solfège, German
      letters with **H** (a German B is B♭ — showing B would mistune string 2).
- [x] Navbar language selector (desktop dropdown, mobile row) linking to the
      same page in each language; links stay in the DOM for crawlers. Footer
      links every language home. Logo and "Tuner" link go to the language home.

### SEO

- [x] hreflang en/es/pt/fr/de + x-default on all 115 tuner URLs, in page
      metadata and as sitemap `xhtml:link` alternates (690 links).
- [x] Self-referencing canonicals; localized titles/descriptions within
      limits (`audit:seo`: 0 duplicates, 0 new long titles); `og:locale` +
      `alternateLocale`; WebApplication JSON-LD with `inLanguage`; localized
      FAQPage and BreadcrumbList.
- [x] **`<html lang>` is now correct per language.** Routes moved into
      `app/(site)` (English), `app/es` and `app/[lang]`, each a root layout
      sharing `RootShell` — a single root layout can't vary `lang` on static
      pages. URLs unchanged.
- [x] Multiple root layouts left unmatched URLs with Next's bare 404, so
      `app/global-not-found.tsx` (experimental `globalNotFound` flag) gives a
      styled 404 with real 404 status; localized `not-found` per root layout.
- [x] Verified: all 115 URLs 200, unknown paths 404, `audit:links` no
      orphans or dead ends, Playwright language switching, German fake-mic B
      string reads "H, −1 cents".

### Not done

- Navbar menus and footer columns stay English on translated pages.
- Translated pages are new; expect weeks before they rank. Submit the
  sitemap in Search Console.

## Step 17 — Daily challenge, share images, Drop B / C♯, tunings chart  ✅ DONE (2026-10-25)

Return visits and shareability, plus two missing tunings.

- [x] **`/daily-challenge`** — five questions a day (interval, chord type,
      fretboard note, descending interval, then a harmonic interval or
      seventh chord on alternating days), identical for everyone, one try
      each. Seeded from the date in `lib/dailyChallenge.ts`, so no server and
      no puzzle list. Answers save as they are given, so leaving does not
      grant a retry. Streak, best streak, score distribution, midnight
      countdown, and a Wordle-style text share (🎵🟩 🎸🟥 …) that gives
      nothing away. Counts as a practice day via `logPractice`. In
      `TOOL_PAGES` (first), on the homepage grid, and in the post-tuning
      prompt. Checked over 400 days: every answer correct and in range.
- [x] **Per-page share images** with `next/og`: tuner pages (gauge + note
      chips, in all five languages with local note names), chord pages (the
      first voicing's diagram), tool pages, tunings, daily challenge.
      Shared frame in `lib/og/card.tsx`; builders in `lib/og/images.tsx`;
      each route's `opengraph-image.tsx` is a one-line call. Inter is
      vendored in `lib/og/fonts` (OFL) so builds never fetch fonts; ♯/♭ are
      drawn as SVG because neither Inter nor the next/og font has them.
      Dynamic routes export `generateStaticParams`, so all 300+ images are
      built at deploy time.
- [x] **Metadata bug fixed:** a page's `openGraph` replaces the layout's
      whole, so tuner/tool/chord pages had *no* `og:image`, and every
      Twitter card carried the homepage title. The layout now sets only
      `type`/`siteName`/`locale` and `twitter.card`; Next fills the rest per
      page. `/Logo.png` (4000×4000, declared as 1200×630) is no longer used
      as a share image.
- [x] **Streak share card** — `/share/streak?d=&b=&m=` (noindex,
      self-canonical) with a generated image at `/share/streak/image`.
      Numbers come from the URL and are clamped; there is no account to
      check them against. "Share your streak" / "Save image" on the practice
      routine once a streak reaches two days, and on the routine-done panel.
- [x] **`/drop-b-tuner`, `/drop-c-sharp-tuner`** — presets already existed
      with no page. Hand-written English pages plus es/pt/fr/de copy
      (German: Drop H and Drop Cis, since a German B is B♭).
- [x] **`/tunings`** — server-rendered chart of every six-string tuning
      (notes, octaves, Hz, semitone moves, tension vs standard) and every
      instrument, from `TUNING_PRESETS`. In the navbar Tunings menu, the
      footer and the sitemap.
- [x] `tsc`, build, `audit:seo` (238 pages; only the 3 known long titles),
      `audit:links` (0 orphans, depth ≤ 2), Playwright: full challenge,
      resume after reload, share text, streak share link, no mobile
      overflow, new tuners load their presets.

### Not done

- The daily challenge is English only.
- Shared streak numbers are self-reported by design.
- Articles keep their screenshot share images; `/about`, `/contact` and
  the legal pages use the homepage card.
