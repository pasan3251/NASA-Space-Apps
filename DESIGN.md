---
name: Off-world Expedition Journal
description: A tangible editorial journal opens into fictional expeditions and sourced historical records.
colors:
  paper: "#f3ecd9"
  ink: "#203632"
  secondary: "#556451"
  rust: "#a64b2d"
  rule: "#cec8b4"
  link: "#3c6252"
  desk: "#152826"
  desk-ink: "#efe9d6"
  desk-secondary: "#b8c4b3"
  desk-accent: "#e4b17d"
  action: "#a64b2d"
  action-hover: "#873b24"
  action-ink: "#fff5e5"
  focus: "#a64b2d"
  mark: "#7c8a73"
  found: "#3b6150"
  found-ink: "#f4eddb"
  edge: "#cbbd9d"
  cover: "#d0aa72"
  cover-ink: "#263a31"
  cover-title-accent: "#7e3c26"
  moon-accent: "#819b97"
  mars-accent: "#bb6745"
  deep-space-accent: "#b29255"
  archive-paper: "#f5eedc"
  archive-ink: "#14292d"
  hud-background: "#111d21"
  hud-ink: "#fff8e7"
typography:
  display:
    fontFamily: "JournalDisplay, Georgia, serif"
    fontSize: "3.125rem"
    fontWeight: 400
    lineHeight: 1.03
    letterSpacing: "-.025em"
  headline:
    fontFamily: "JournalDisplay, Georgia, serif"
    fontSize: "clamp(2rem, 3.2vw, 3rem)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-.025em"
  title:
    fontFamily: "JournalDisplay, Georgia, serif"
    fontSize: "1.75rem"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-.025em"
  body:
    fontFamily: "JournalSans, sans-serif"
    fontSize: "1rem"
    lineHeight: 1.7
  secondary:
    fontFamily: "JournalSans, sans-serif"
    fontSize: ".8125rem"
    lineHeight: 1.7
  label:
    fontFamily: "JournalSans, sans-serif"
    fontSize: ".75rem"
    lineHeight: 1.5
rounded:
  schematic: "2px"
  spread: "3px"
  action: ".25rem"
  hud-action: "5px"
  hud-navigation: "6px"
  archive: "7px"
spacing:
  quarter: ".25rem"
  half: ".5rem"
  three-quarter: ".75rem"
  unit: "1rem"
  five-quarter: "1.25rem"
  one-half: "1.5rem"
  seven-quarter: "1.75rem"
  double: "2rem"
  page-horizontal: "2.5rem"
  gutter-side: "2.75rem"
components:
  button-primary:
    backgroundColor: "{colors.action}"
    textColor: "{colors.action-ink}"
    rounded: "{rounded.action}"
    padding: ".75rem 1.25rem"
    height: "2.75rem"
  button-primary-hover:
    backgroundColor: "{colors.action-hover}"
  button-open:
    backgroundColor: "{colors.desk-accent}"
    textColor: "#20332c"
    rounded: "{rounded.action}"
    padding: ".75rem 1.25rem"
  button-text:
    textColor: "{colors.link}"
    padding: ".5rem .125rem"
  chapter-link:
    textColor: "{colors.ink}"
    padding: "1.5rem 0"
  source-disclosure:
    textColor: "{colors.ink}"
    padding: ".5rem .125rem"
  mission-preview:
    backgroundColor: "#203b35"
    textColor: "#d5c79c"
    rounded: "{rounded.schematic}"
    padding: "1rem 1rem 3.5rem"
  archive-record:
    backgroundColor: "{colors.archive-paper}"
    textColor: "{colors.archive-ink}"
    rounded: "{rounded.archive}"
    padding: "24px 26px 28px"
---

# Design System: Off-world Expedition Journal

## Overview

**Creative North Star: "The Expedition Journal"**

A warm-paper expedition journal rests on a dark desk. The physical cover, two-page reading spreads, illustrated hardware schematics, binding, and restrained page-turn gesture carry the user-approved identity. Editorial serif headings invite curiosity; legible sans text makes the historical evidence approachable for space enthusiasts aged 12–16 on desktop web.

The journal opens into first-person future-astronaut exploration, HUD records, and a deep-space jetpack episode. These scenes retain the journal's paper-and-ink relationship without imitating a native operating system. The direction was approved and implemented directly in code; no image comp is the visual authority. Apple foundations inform readability, clear controls, navigation, and restraint, without asserting native Apple compliance.

**Key Characteristics:**

- A tangible cover and one central gutter on desktop spreads.
- Editorial storytelling paired with practical reading and navigation.
- Restrained mission colors, sourced records, and explicit reconstruction labels.
- Optional motion and direct access to records alongside spatial exploration.

This is a scan of the implemented system, not a replacement identity. Source authority: `src/features/book/BookExperience.tsx`, `book.css`, `ExplorationExperience.tsx`, `exploration.css`, and `src/data/expeditionMissions.ts`. Product intent is in `PRODUCT.md`; the development boundaries are documented in `docs/development.md`. The supervisor reports a final SHIP disposition from nine book captures and three worlds with no material findings. Original local evidence is retained in the ignored `Visual-Testing/.impeccable/review/` archive: `desktop.png`, `briefing.png`, `intro.png`, `contents.png`, `book-1280.png`, `book-720.png`, `mobile.png`, `book-dark.png`, `book-contrast.png`, `exploration.png`, `moon.png`, and `pioneer.png`. This document does not independently certify every browser, assistive technology, or scene asset.

## Colors

The palette combines warm reading material, deep green desk neutrals, and a small amount of rust and mission color. Frontmatter records base values; source media queries remain authoritative for adaptive colors. Sidecar theme overrides reproduce those source declarations.

### Primary

- **Field Rust** (`rust`, `action`, `focus`): reading emphasis, primary mission actions, and on-paper focus. Separate semantic keys share the present value so future themes can vary them independently.
- **Warm Desk Accent** (`desk-accent`): the cover-opening action, desk navigation states, and desk focus.
- **Deep Action Rust** (`action-hover`) and **Action Ivory** (`action-ink`): hover depth and readable action labels.

### Secondary

- **Lunar Sage**, **Mars Clay**, and **Deep-space Brass** (`moon-accent`, `mars-accent`, `deep-space-accent`): mission data accents, passed into the world and mission surfaces. They do not recolor all navigation.
- Mission schematic panels have their own source color pairs: lunar green, Mars brown, and deep-space blue-green. These are illustration surfaces, not alternate app themes.

### Neutral

- **Warm Paper**, **Expedition Ink**, **Reading Olive**, and **Paper Rule** (`paper`, `ink`, `secondary`, `rule`): page background, principal text, supporting copy, and dividers.
- **Archive Green** (`link`): historical source links and underlined text actions.
- **Deep Desk**, **Desk Ivory**, and **Desk Sage** (`desk`, `desk-ink`, `desk-secondary`): the surrounding workspace and persistent navigation.
- **Bound Ochre**, **Cover Ink**, and **Cover Title Rust** (`cover`, `cover-ink`, `cover-title-accent`): the cover only. The cover title accent belongs to large display type, not small supporting text.
- **Uninspected Mark**, **Found Green**, **Found Ivory**, and **Page Edge** (`mark`, `found`, `found-ink`, `edge`): record status and the physical book construction.
- **Archive Paper**, **Archive Ink**, **HUD Night**, and **HUD Ivory** (`archive-paper`, `archive-ink`, `hud-background`, `hud-ink`): exploration archive and scene-interface roles. The HUD is a distinct, denser context; book legibility rules do not imply its sizes are identical.

**The Semantic Surface Rule.** Keep paper, desk, cover, actions, and scene records independent; use the source's adaptive reading colors rather than hardcoding base paper colors into new book content.

Dark reading colors, increased contrast, reduced transparency, and forced colors are implemented in the book stylesheet. Increased contrast follows the dark media query and therefore wins when both match. `APPLE-DESIGN-REVIEW.md` records source-value contrast calculations; it is evidence of those specific pairs, not a blanket compliance certificate.

## Typography

**Display Font:** JournalDisplay is the locally hosted DM Serif Display Regular, with Georgia and serif fallbacks. **Body Font:** JournalSans is the locally hosted variable DM Sans, with sans-serif fallback. Font source and OFL records are in `docs/fonts.md` and adjacent license files. Both font faces use `font-display: swap`; the display face is supplied at weight 400.

The display face belongs to narrative headings, chapter names, questions, and the occasional tilted editorial note. Sans text carries controls, explanations, facts, sources, and status. There is no separate monospace label system.

### Hierarchy

- **Display:** the frontmatter display role describes the default cover title; wide, compact, and narrow layouts change its size in the source.
- **Headline:** ordinary page heading; mission headings use the slightly smaller `clamp(2rem, 3vw, 2.75rem)` variant.
- **Title:** page subheadings; chapter names use 1.625rem, and discovery headings use 1.5rem.
- **Body:** book paragraphs use the frontmatter body role. Lead copy is 1.0625rem in the introduction and 1rem in mission briefings. Book supporting facts and links are .875rem; secondary notes and captions use the smaller roles above.
- **HUD:** exploration has a 14px base; archive paragraphs are 13px with 1.75 line height, record summaries 16px with 1.6, record titles 34px with 1.12, and some source credit labels 9px. These are current implementation facts, not a recommended minimum for new reading surfaces.

**The Reading First Rule.** Keep book narrative at 1rem and permit scrolling and reflow when space is tight; do not shrink essential copy to make it fit a fixed page.

## Layout

The book frame is a vertically arranged full-height, scrollable web surface. The toolbar has a 90rem maximum width with fluid horizontal padding; the stage uses the same `clamp(1rem, 4vw, 3.5rem)` inset. The cover and invitation form a centered row up to 70rem wide, with a fluid 3–7rem gap. The cover is 25 × 34rem at the default desktop size and rotated −3 degrees.

The default open book is at most 78rem wide, at least 32rem tall, with height `min(46rem, calc(100dvh - 13rem))`. Two equal minmax columns create exactly two pages and one central gutter. Each page scrolls independently on desktop. Default page padding is 1.75rem vertically at the top, 2.5rem horizontally, and 1rem at the bottom, with 2.75rem on the gutter sides. Folios follow the content and use tabular numerals.

At 94rem and above the book may grow to 80rem. At 75rem and below page insets and cover size tighten; contextual toolbar location disappears while direct navigation remains. Short viewports at 52rem high and below retain reading sizes and use a smaller physical frame. At 56rem and below the cover and invitation stack, the spread becomes one column with both pages in reading order, the gutter disappears, and content grows naturally. At 32rem and below facts and discovery lists stack, toolbar navigation wraps, and page-navigation text gives way to labeled icon controls. The motion action remains visible.

Exploration fills 100dvh with a 600px minimum height (520px below 720px width). A fixed top bar, left discovery list, right paper archive, and bottom camera controls frame the scene. The archive scrolls internally. HUD layout adjusts at 1050px and 720px; at the narrow breakpoint the archive occupies nearly the full width and the mouse-capture button is hidden. This is a basic narrow-screen fallback, not a claim of full mobile spatial-control parity.

The spacing vocabulary is a reused collection rather than a strict universal grid. Preserve the visible reading rhythm and separate major story groups with rules or whitespace rather than adding dashboard cards.

## Elevation & Depth

Depth is structural: the cover casts a desk shadow; offset page edges, a binding shadow, and a subtle gutter make the book tangible. The paper reading surface itself is opaque. Exploration uses dark translucent HUD panels over the world and an opaque paper archive; no decorative glass or native-window framing is part of this identity.

### Shadow Vocabulary

- **Bound cover:** `14px 24px 45px #06141099, 5px 3px 0 #ddc393, 8px 5px 0 #b9a481`.
- **Open journal:** `0 25px 58px #05141080`.
- **Paper stack:** `0 2px 0 #998e72, 0 5px 0 var(--book-edge)`.
- **HUD archive:** `0 18px 45px #04131766`.

The book hides the gutter for reduced-transparency and increased-contrast preferences; forced colors removes book shadows and adds system-color boundaries. These alternatives preserve the hierarchy without relying on simulated material depth.

## Shapes

Keep the form close to a bound volume: near-square schematic corners, a lightly rounded spread, a narrow spine, layered page edges, and an inset cover border. The cover has asymmetric `2px 7px 7px 2px` corners. Small action radii stay restrained; circular marks communicate numbered or inspected discoveries rather than decorating every control. The HUD archive and discovery panel use 7px corners; its small navigation and action controls use 4–6px corners. No app-window traffic lights, title bars, or macOS settings chrome belong to this website.

## Components

### Buttons

Primary actions are compact, readable, and tactile. Book primary buttons have the frontmatter padding and colors, at least 2.75rem height, a background hover transition, and a 1px downward active movement. The cover-opening variant uses the desk accent and a 13.125rem minimum width. The mission preview's full-width bottom action is at least 3.25rem high. Other book buttons start at 2rem minimum; page navigation uses 2.5rem. Disabled book controls use .45 opacity.

Focus is a 3px solid outline with 4px offset, warm on the desk and semantic focus color on paper. Text actions retain a visible bottom rule and a subtle hover wash. The HUD has its own 3px warm focus outline and .94 brightness active feedback. Component implementations live alongside their feature styles; the documented system does not introduce an input field or chip library absent from the product.

### Navigation

Persistent Contents and My journal actions retain icon-plus-text labels, an explicit active state, and `aria-current="page"`. Progress is textual as well as numeric. The return-to-cover wordmark is a real button. Previous/next controls show location and page progress; left/right arrow keys navigate except in editable or reserved controls. A skip link leads to the reading stage. The page heading receives focus after user-triggered page changes, not on initial render.

### Chapter and record rows

Chapter navigation uses full-width ruled rows, serif chapter numbers and names, sans destination and descriptive copy, plus an arrow. Completed chapters add a check and text. Book discovery marks have accessible Inspected/Not yet inspected labels, and status is never conveyed solely by color. Journal entries use section rules and text actions, not independent elevated cards.

### Historical sources

Mission sources are native `details` / `summary` disclosures with title, record count, underlined links, and credits. Source links provide at least 1.75rem line targets in the book. Preserve the connection between claim, source, and credit rather than replacing sources with unlabelled icons.

### Physical book and schematic launch

The closed cover, orbit illustration, ribbon, page edges, running headers, and folios are the signature components. Mission diagrams are inline SVG orthographic schematics with explicit not-to-scale and not-a-photograph labeling. The mission action opens the corresponding world; it is the clear next action on a briefing.

Forward and backward page turns rotate the spread from −2 or +2 degrees to zero under 1800px perspective over 350ms with `cubic-bezier(.16, 1, .3, 1)`. Navigation remains immediate; animation is feedback. The labeled Reduce motion toggle and system reduced-motion preference disable book animation and transitions. HUD button transitions last 150ms and are disabled for reduced motion. This does not imply all spatial movement is removed.

### Exploration archive and evidence task

A dark discovery list offers direct access to every record and navigation shortcuts. Selecting a record releases mouse capture and pauses movement; the paper archive presents historical material over the fictional future scene. Evidence tasks unlock after all records are inspected, show textual correctness feedback, and save a journal conclusion. Without WebGL, archive records and the task remain available. Mouse-capture failure offers drag-to-look or orbit guidance. First-person walking, overhead/orbit inspection, and Pioneer jetpack controls are interface experiences, not measured historical reconstruction.

Keep documented history, reconstruction, and fictional future visits distinct. Mission scene notes remain visible in the interface and fully readable in help/book contexts. Mars is a schematic inspection layout spanning real distances and times; Surveyor uses simplified hardware and an Apollo-stage inspection convenience; Pioneer is an imagined rendezvous without ground, live tracking, visitation, or reactivation claims. Existing model/terrain provenance and scale remain subject to verification as recorded in `PRODUCT.md`. No schematic or scene capture is a mission photograph.

## Do's and Don'ts

### Do:

- **Do** preserve the warm-paper journal, dark desk, editorial serif, and practical sans relationship.
- **Do** keep two pages and one gutter on desktop, then stack both pages in reading order on narrow screens.
- **Do** retain visible focus, textual status, optional page motion, and direct record access.
- **Do** label historical evidence, fictional future visits, and schematic reconstruction separately, with sources and credits.
- **Do** test changed reading layouts with larger text, short desktop heights, narrow reflow, and adaptive color preferences.

### Don't:

- **Don't** replace the approved physical journal with native macOS chrome or decorative glass.
- **Don't** shrink essential book prose to fit a page or remove the motion control at narrow widths.
- **Don't** use the cover's large-title accent for small essential text.
- **Don't** present schematics as photographs, illustrative distances as measured geography, or future scenes as live mission conditions.
- **Don't** treat this source inventory or the retained review captures as untested accessibility or platform-compliance guarantees.
