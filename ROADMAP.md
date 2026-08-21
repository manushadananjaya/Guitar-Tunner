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
