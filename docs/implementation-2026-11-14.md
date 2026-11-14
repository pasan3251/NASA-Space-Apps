# Off-world implementation handoff — 14 November 2026

The user approved application development after reviewing the existing Figma file and design contracts. This record supersedes design-only status statements for the implemented initial release. Development and verification used NASA-Space-Apps; hosting deployment and GitHub publication are separate delivery steps. Both Visual-Testing references remain unchanged.

## Delivered experience

| Milestone | Implementation | Verification |
| --- | --- | --- |
| Three-book library | Layered grey/rust/navy hardcover components, exact approved local SVG art, hover/focus/selected states, animated left selection, themed background and explicit Open action | All three selections, keyboard arrows and open/return paths exercised; rendered desktop and narrow layouts inspected |
| Independent reading | Shared four-page introduction/story/science/briefing per book, saved locations, verified NASA images, credits, sources and mission entry | Each book read independently; reading locations survive reload; no duplicated mission/discovery records |
| Existing missions | Same surveyor/curiosity/pioneer IDs, models, walking/EVA, orbit, record list, evidence questions and WebGL fallback | All three actual UI journeys completed through four records and correct required evidence answers; wrong answer/retry checked |
| Collectible cards | Three stable definitions, rich original art, conic foil/enamel/inset/seal layers, classifications, scientific facts, accomplishments, locked/unlocked/new/focus/detail/reverse | All three earned through mission UI; details, reverse, sources and locked guidance exercised |
| Space Backpack | Matching open/closed alpha gear, separate live navigation/brand/patches, Collection/Rewards/Progress, filters, exact count, detail/book return and persistent launcher | 0/3 through 3/3, filters, replay, reload, Escape, focus return and mobile/tablet reflow exercised |
| Debrief and saving | One optional sourced reinforcement question per mission, explanations, retry/skip, v1 migration, unique keyed card metadata and preservation across editorial changes | Unit checks and browser migration fixture; Moon optional wrong/correct paths; denied-storage session still earns its card |
| Scientific interactive | Pioneer signal play/pause/reset/scrub, historical anchor, one-way and hypothetical round-trip modes, Moon/1 AU comparisons, computed values, reduced-motion arrival | Numerical tests; browser animation progressed to 10%, held at 10% while paused; reset and comparison values agree; reduced-motion arrival reached 100% |
| Additional book science | Moon photograph/report/reconstruction comparison; Curiosity six-event landing stepper, UTC event labels, equipment purpose/fate and Earth reception explanation | Evidence views and event selection operated in browser; sources retained |

## Source map

- App.tsx: one versioned save, book/mission context, collection/reward overlays; retains the lazy exploration import.
- data/books.ts and data/bookStories.ts: volume registry, cover metadata, verified image credits and EDL events.
- features/library/ExpeditionLibrary.tsx: BookCover, Brand and three-book selection.
- features/book/BookReader.tsx: independent reader and page navigation. The old BookExperience.tsx remains unused reference code.
- features/science/BookInvestigation.tsx: Moon comparison and Mars event sequence.
- features/science/PioneerLightTime.tsx and utils/lightTime.ts: one scientific calculation/clock, direction, values and playback.
- features/rewards/MissionCollectibleCard.tsx: full and compact layered card rendering.
- features/rewards/MissionRewardExperience.tsx: completion, optional question, sealed/revealed card, single shine and replay.
- features/collection/BackpackExperience.tsx: BackpackLauncher, CollectionProgress, physical gear, filters, sections and detail.
- components/ModalFrame.tsx: native dialog, focus containment, Escape and restoration.
- utils/expeditionProgress.ts and types/expedition.ts: v2 schema, validation, migration and idempotent completion.
- data/collectibleCards.ts and data/optionalQuestions.ts: separate reward science and reinforcement content.
- styles/offworld.css and styles/rewards.css: approved visual patterns and responsive states.
- ExplorationExperience.tsx: overlay suspension, explicit resume and reward integration. Existing scene geometry is retained.

## Save contract implemented

Current key is offworld-expedition:v2. Reading attempts the v2 envelope first, then validates a legacy offworld-expedition:v1 envelope. The original legacy key is not removed. Known discovery IDs are de-duplicated; unknown IDs and future reward records are excluded from this release’s count.

An old valid completion infers its registered card with an unknown earn date (null) and legacy origin. It does not queue celebrations. Version 2 preserves established completion across ordinary content/art changes; a future material evidence change requires an explicit migration policy.

All four records and the existing correct evidence task establish new completion. Completion is saved before cosmetic reveal. Card metadata is keyed by stable CardId; replay returns the same record and timestamp. Ownership/count derive from completed registered missions, never from a reveal animation or optional answer. Closing, skipping or reloading during reveal cannot revoke the card. Optional attempts and book positions share the same envelope.

Denied storage leaves a usable in-memory session and a visible saving notice. Corrupt v2 can recover a valid legacy backup. No server sync, account, trading, rarity, arbitrary scientific ratings or additional rewards are introduced.

## Figma adaptations

The same approved Figma file remains the reference; no duplicate file was created or redesigned.

- Native same-page fixtures became actual state-driven React views and native modal dialogs. The existing page/mission remains mounted underneath so returning preserves context.
- The desktop composition follows Figma. Responsive grids use three/two/one columns as available; the initial release has only three cards.
- Mobile reserves a fixed 72px gear rail and scrolls its reading viewport above it. Card-detail science stays in live text as well as the card reverse.
- Backpack opening uses a short alpha-shell crossfade and live control reveal rather than a 3D bag or physical cloth simulation.
- Reward foil uses lightweight CSS gradients and one clipped shine. Seals/icons/art are separate assets; no entire card or screen is flattened.
- The Pioneer diagram uses original lightweight SVG and the approved schematic spacecraft artwork. A readable DOM distance/date and text explanation supplement scaled diagram labels. Each one-way deep-space demonstration lasts 12 seconds; a hypothetical round trip lasts 24 seconds at the same compression. The mean Moon preset runs near real time. Values all derive from distance / 299,792.458 km/s.
- System reduced motion supplies static/instant alternatives. A separate manual motion preference is not added.
- Published Code Connect bindings remain absent; the table above maps the actual source components.

## Verification

npm test passes: three missions, 12 sourced discoveries, source/answer integrity, denied/corrupt storage, v1 migration, v2 roundtrip, content resilience, three unique repeat-safe awards, local card artwork, optional questions and numerical light-time checks.

npm run build passes, including TypeScript. No lint script is configured. The main bundle is approximately 215 kB minified / 68.5 kB gzip. The existing lazy exploration bundle remains approximately 957 kB minified / 260 kB gzip and produces the existing Vite size warning. 3D is not fetched for library/reading alone.

Browser checks used isolated Playwright contexts:
- All three mission journeys, record sources, wrong answer/retry, reward reveal/reverse and 3/3 after reload.
- Both actual mission replay and collected-reward replay keep three cards and omit new-card shine.
- Locked guidance, associated book routes, filtering and profile counts.
- Native-dialog heading focus, Tab containment, Escape return to launcher, detail return to selected tile.
- Opening Backpack during exploration releases mouse lock, preserves context and requires explicit resume. Scientific signal playback also pauses when collection opens.
- 390px mobile, 1024px tablet and 1440px desktop; rendered library, collection, reward, reading/science and Curiosity HUD inspected. No horizontal overflow was observed in checked mobile/tablet views.
- Reduced-motion static signal arrival and no reward shine.
- Forced unavailable WebGL plus denied storage: all records and the required question remained usable and the session earned 1/3. The deliberately failed renderer emits its expected WebGL-context diagnostic; normal journeys had no console errors.

Screenshots and browser tooling artifacts remain outside publishable source. The implementation was compared against the Figma library, story, rewards, Backpack and signal renders.

Final production-preview check at port 4173 also passed in a fresh isolated context: no exploration/GLB request before mission entry; verified interior image loaded; signal advanced to 5% and paused; Pioneer completed through the actual records/question UI; skipping animation produced no shine; reverse inspection worked; reload retained 1/3 cards; zero page errors. Eight optimized runtime image checksums and local handoff links passed, and source contains no temporary Figma asset URLs. `git diff --check` passed.

## Remaining work and practical limits

Detailed DEM integration is deliberately deferred. Read-only inspection reconfirmed that the older terrain paths use different relief scales and synthetic pads/depressions. The original raster/STL has no verified location/reference frame/vertical datum. Candidate LROC Apollo 12 and HiRISE Gale products in the source ledger still need crop, projection, nodata, orientation and sampler verification. No Martian data is used as lunar terrain.

High-detail camera inspection, cinematic 3D EDL, a free-form evidence board, additional playable missions and a separate badge economy are outside this initial release. The new Moon/Mars scientific experiences are sourced DOM/SVG investigations, not new detailed 3D simulations.

A representative integrated-graphics laptop benchmark, a full assistive-technology audit and dedicated 200% browser text-zoom validation remain release QA. Actual mouse capture depends on browser/device policy; existing drag/orbit/list alternatives are retained. The pre-existing Curiosity model origin and generated illustrations’ fine hardware details still need team art/science signoff. Illustrations are visibly marked reconstruction.

No exact competition cutoff was independently confirmed; November 15 remains provisional. There is no hosted submission URL from this work.

## Run

Use Node.js 22+ from the repository root:

~~~sh
npm ci
npm run dev
~~~

Vite prints the local address. For production verification: npm test, npm run build, npm run preview. Browser progress belongs to that origin; switching ports uses a different localStorage origin.
