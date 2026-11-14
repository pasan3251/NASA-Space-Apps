# Off-world: revised release plan

Status: **approved by the user for application implementation on 14 November 2026.** The [implementation handoff](../implementation-2026-11-14.md) records the delivered initial release, validation and remaining work. The original estimates and stretch tiers below remain planning context, not completion claims.
Prepared 13 November 2026; review package completed 14 November 2026 (Asia/Colombo). Provisional submission: **15 November 2026**; exact competition cutoff and timezone still require confirmation. Treat the remaining roughly one to two days as a constrained release window, not a commitment that every proposed experience can ship. Reassess available hours immediately after approval.

## Product decision

Build an expedition library for ages 12–16: three related hardcover volumes, each with one complete playable mission. Preserve the working React/R3F application, mission IDs, required evidence task and saved discoveries.

Choose a book → discover its story → interact with science → explore in 3D → investigate equipment and evidence → complete the required evidence task → optionally answer reinforcement questions → receive a collectible → keep it in the Space Backpack.

| Volume | Playable mission | Central investigation |
| --- | --- | --- |
| Moon | Surveyor 3 / Apollo 12 | What can returned equipment reveal about lunar exposure? |
| Mars | Curiosity | Why were useful pieces of landing equipment discarded? |
| Outer Space | Pioneer 10 | What does a long radio delay mean for mission controllers? |

Keep Curiosity. Ingenuity and the other supplied mission dossiers are archival references or later expansions. Add missions through a book/mission registry rather than duplicating navigation or changing the three-volume shell.

## What discovery changes

The current experience has a single cover and seven spreads, three playable missions, four discoveries and one required evidence question per mission. It already has working progress, direct equipment access, lazy-loaded 3D and fallbacks. Those are the release foundation.

The main gaps are structural: books, optional question attempts and collectible cards do not have separate state; the current content-revision hash can reset all progress after content changes; supplied image names are unreliable; and the previous DEM has no verified geographical provenance. Address these gaps before visual replacement or terrain polish. Do not replace working Curiosity logic merely to match the redesign.

Reference baseline: main commit bf80c6bb2fa080495a59a7a2a627f776360359e1. The sibling terrain project was inspected read-only at 01cdbd0891f50386a70b181ecabd9f1c8b8f5b22. The nested Visual-Testing checkout contains pre-existing work and must remain untouched.

## Priorities and feature classification

| Capability | Initial release | Valuable if time permits | Future expansion |
| --- | --- | --- | --- |
| Three-book library | Three consistent covers, selection, continue state, keyboard access | Small opening transition | Elaborate simulated physical bookshelf |
| Three complete missions | Existing Surveyor, Curiosity and Pioneer discoveries, sources, required evidence task | More contextual equipment detail | Additional playable missions / Ingenuity |
| Pioneer: The 11-Hour Message | **One polished SVG scientific visualization**: historical one-way signal, pause/replay, fixed-distance round-trip comparison, explicit time compression, text alternative | Mean Moon / 1 AU comparison presets and timeline integration | Ephemeris-driven 3D solar system |
| Moon: The Camera That Came Back | Sourced story, original photograph and test observations, existing mission inspection | Labelled schematic camera and historical comparison investigation | Verified detailed camera model with full 3D inspection |
| Mars: Seven Minutes of Terror | Sourced ordered EDL diagram, discarded-equipment explanations, direct link into existing Curiosity mission | Shared stepper / timeline and optional sequencing challenge | Cinematic 3D EDL reconstruction with animated separation and camera cuts |
| Mission Time Machine | Shared event data and basic next/previous event interface where needed | Scrubbable synchronized timeline reused by all books | Continuous simulated historical trajectories |
| Spacecraft inspection | Preserve existing selection/inspection and equipment list; label reconstructed geometry | Shared rotate/zoom/reset component for one vetted model | Full configurable inspector for every spacecraft |
| Expedition Evidence Board | Simple four-part evidence summary feeding existing required evidence question | Select-to-connect board with accessible list alternative | Free-form graph, multi-source comparisons and authoring |
| Reinforcement questions | One optional question per mission, explanation, retry, skip; no reward penalty | Second question and sequencing variant | Adaptive assessments and educator analytics |
| Collectibles / Backpack | Three rich illustrated cards; locked/unlocked/new states, scientific reverse/detail, physical Backpack, persistent launcher, Collection/Rewards/Progress views and repeat-safe persistence | Authored foil sweep, richer opening/flip motion and collection filters after functional gates pass | Additional rewards only with a new roadmap decision; trading/accounts/sync remain outside this release |
| Terrain | Truthful schematic terrain; shared sampling contract and source labels | One verified crop only after provenance + alignment + device checks pass | Broad Moon/Mars geography, streaming LOD and multiple mission sites |
| Archive | Small attributed references associated with each book | Browsable archive cards | Separate archive discovery system |

The design system includes patterns for all tiers so later work can reuse the same controls. A pattern in Figma is not a promise to implement it before submission.

## Minimum viable competition submission

The smallest complete revised submission contains:

1. Three selectable illustrated volumes, each opening a short readable story with verified sources.
2. One complete playable mission per volume using existing equipment/discovery functionality.
3. Pioneer light-time experience embedded in its story; user can see a documented one-way delay and understand a hypothetical round trip.
4. Existing required evidence question, feedback/retries, then an optional reinforcement question that can be skipped.
5. One rich collectible per completed mission, readable scientific detail/reverse, a physical Space Backpack with persistent access, and correct 0/3–3/3 collection/reward/progress views. Static and reduced-motion equivalents must be complete even if optional animation polish is cut.
6. Migration that preserves existing completed missions and valid discovery IDs. Existing completed missions must award their card without replay.
7. Responsive reading, keyboard access, reduced-motion behavior, an equipment-list alternative to WebGL and visible source/evidence labels.
8. A tested build, working submission URL/package and a short demonstration of all three journeys.

Do not reduce this to three attractive covers leading to incomplete missions. If the deadline becomes tighter, remove secondary animations and stretch interactions before removing completion, saved progress, scientific honesty or recovery paths.

## Delivery sequence after design approval

Assumes the existing app remains buildable and there are approximately two calendar days available. Estimates are active work, not guarantees; some lanes can overlap if team members are available.

| Order | Work / exit condition | Indicative effort |
| --- | --- | --- |
| 0 · Review gate | Approve this roadmap, cover direction, Pioneer priority and prototype; verify actual deadline | User review |
| 1 · State and content | Book/mission registry, stable IDs, source ledger, migration and repeat-safe reward rules; old saves survive content edits | 3–5 hours |
| 2 · Vertical slice | Outer Space book → light time → existing Pioneer mission → required evidence → optional question → rich card/detail → physical Backpack; reload preserves state and replay cannot duplicate cards | 7–11 hours |
| 2a · Reward assets | Optimize the five prepared card/gear source assets, verify alpha and fine hardware details, preserve credits and image-failure fallback | 1–2 hours |
| 3 · Complete the collection | Apply the same shell to Moon and Mars; verified content and imagery; retain all working discoveries | 3–5 hours |
| 4 · Submission hardening | Integrated graphics / no-WebGL / narrow screen checks; keyboard, reduced motion, wrong answers, migration and asset failure; build and demo | 4–6 hours |
| Stretch gate | Add one optional feature only after all three journeys and regression checks pass | Remaining time only |

These revised estimates total approximately **18–29 active hours after approval**, including the richer reward slice, and excluding major model creation, high-detail terrain work and novel EDL animation. A single developer with limited availability faces a high deadline risk. Ship static rich cards, readable scientific details and a functional persistent Backpack before spending time on foil sweeps, simulated flap motion or extra filters. Detailed 3D camera inspection, cinematic Curiosity EDL, accurate terrain for both planets and a free-form evidence graph together are unrealistic for November 15.

Suggested team lanes, if the existing five-person team is available: state/integration; Pioneer visualization; Moon/Mars content verification; design/assets; QA/demo. This document does not assign people or authorize parallel agents. Keep one integration owner and freeze optional work before the final verification window.

## Architecture and persistence contract

Keep React 18.3.1, R3F 8.18.0, drei 9.122 and Three 0.169 unless a separately justified change is approved. New reading, diagrams, timelines, evidence forms and Backpack should use DOM/SVG. Keep 3D lazy-loaded and mount only one Canvas.

Proposed records:

- BookDefinition: stable book ID, ordered mission IDs, cover-art asset, theme and story sections.
- MissionDefinition: retain surveyor / curiosity / pioneer, discoveries, required task, source IDs; add optional questions, event references and a science-experience key.
- ScienceExperienceDefinition: kind (light-time / EDL / inspection), evidence category, source IDs, event data, units, reconstruction notice and text alternative.
- CollectionItemDefinition: stable card ID, mission ID, title, illustration and evidence summary.
- TerrainDefinition: source product ID, crop bounds, reference frame, units, horizontal/vertical transform, exaggeration and validity mask.

Proposed version-2 save: schemaVersion, mission progress keyed by existing IDs, book reading locations, optional answer attempts, cards keyed by card ID and per-mission content version. Store migration independently of editorial content hashes.

Migration must read offworld-expedition:v1, validate known mission/discovery IDs, preserve valid discovered/completed state, infer earned cards and write v2 only after successful conversion. Keep v1 until the migration succeeds. New missions default empty; removed unknown discovery IDs do not invalidate unrelated missions. A changed answer key must not silently revoke earned cards. Storage failure leaves an in-memory session with an explanatory notice.

Completion order: discoveries + existing required evidence task establish mission completion. Reinforcement follows as an optional branch. The card award is idempotent and independent of optional correctness; skip goes directly to the reward. Back navigation and reload must not duplicate or revoke rewards.

## Scientific experience specifications

### Pioneer 10: release anchor

Use the **23 January 2003 last received signal** as the historical anchor. NASA gives about 12.23 billion km and approximately 11h20m one-way light time. The last faint contacts contained no telemetry; last telemetry was 27 April 2002. Never label the 2003 animation as a returned science-data transmission.

Animate **Pioneer → Earth**. State that positions and sizes are schematic, not a 2003 orbital solution. Distance and historical date stay visible. A 12-second demonstration compresses time by approximately 3,400×; the radio signal still travels at c. Provide play/pause/replay, step states, accessible text and a reduced-motion static alternative.

The round-trip mode is explicitly hypothetical, at the same fixed distance: about 22h40m of propagation, excluding processing time and hardware limits. It is not an actual successful two-way event. Optional comparisons use mean Earth–Moon separation or 1 AU; they are reference distances, not simultaneous ephemeris positions.

Acceptance: displayed values, units and directions agree; reset returns to a known state; comparisons change distance/delay together; no unlabeled “faster light” control; the explanation remains available without animation.

### Moon: recovered camera

Use the Apollo 12 / Surveyor 3 photograph and NASA-CR-121796, NTRS 19710024418. The report describes electrical, optical and mechanical tests after about 2½ years on the Moon. Most parts withstood the environment well; discoloration was associated with dust contamination and radiation damage. Do not turn “very little evidence of micrometeoroid impact” into “no impacts,” or “no significant cold welding evidence” into proof that no such effect is possible.

Release version: compare photograph, documented tests and labelled reconstruction; ask which observation supports a conclusion. A reconstructed model can show camera orientation and components but cannot demonstrate measured wear. A high-detail 3D model needs independent technical geometry verification first. Avoid repeating disputed biological-contamination stories as settled evidence.

### Mars: Curiosity EDL

Use JPL’s 9 August 2012 post-landing timeline. Event occurrence at Mars, converted to UTC on **6 August 2012**:

| Event | UTC at Mars | Elapsed from atmospheric entry |
| --- | --- | --- |
| Atmospheric entry | 05:10:45.7 | T+0 |
| Parachute deployment | 05:15:04.9 | T+4m19.2s |
| Heat-shield separation | 05:15:24.6 | T+4m38.9s |
| Rover separation from descent stage | 05:17:38.6 | T+6m52.9s |
| Touchdown | 05:17:57.3 | T+7m11.6s |

Touchdown reception on Earth was 05:31:45.4 UTC, about 13m48.1s later. Keep spacecraft-event time separate from Earth-reception time. Rover separation is **not** back-shell separation. Back shell / parachute jettison and descent-stage flyaway can appear in the ordered explanation, but do not invent precise timestamps absent a verified source.

Connect each phase to equipment purpose and fate. PIA16001 shows the rover, heat shield, back shell/parachute and descent-stage impact in MRO imagery. A sequencing challenge must be untimed, optional and operable with buttons rather than dragging alone.

## Terrain plan and truthfulness

Reuse the previous project's heightmap conversion, normal-map rendering and bilinear sampling technique after auditing each input. Its raw STL has no verified coordinate system, scale, geographic location or authoritative source. Runtime depressions, ripples and flattened pads are synthetic. Its alternate samplers use different scales. Treat that terrain as a reconstruction, not Gale crater or Apollo 12 geography.

Authoritative candidates investigated:

- Moon: [LROC Apollo 12 NAC DTM](https://data.lroc.im-ldi.com/lroc/view_rdr/NAC_DTM_APOLLO12), 2 m DTM, orthophotos and confidence metadata. [NASA SVS context](https://svs.gsfc.nasa.gov/4767/).
- Mars: [HiRISE Gale crater DTM ESP_018854_1755](https://hirise.lpl.arizona.edu/dtm/ESP_018854_1755), approximately 1.01 m/pixel. Its footprint must be checked against the selected Curiosity scene before adoption.

Neither candidate has been integrated or certified for the game. Verify product metadata, georeferencing, longitude convention, crop coverage, vertical datum/units, nodata mask, map orientation and licensing/credit. Preserve a source manifest with checksums and processing commands.

Use one coordinate transform and one sampleHeightAt(x,z) function for terrain vertices, walking camera, equipment placement and annotations. Do not put a fixed-height walking camera on a displaced surface. Test known sample points, edge behavior, no-data areas and coordinate inversion. Label vertical exaggeration and fictional placement separately.

For the deadline, a truthful stylized reconstruction is acceptable; an unverified dataset portrayed as exact geography is not. Full real-terrain integration is a stretch gate, not a dependency for the three complete missions.

## Visual and accessibility direction

Primary cover reference: supplied three-book concept. Secondary: existing warm-paper expedition journal and **GymMane Design System & Component Library**, exact file LMgJKHmRNWT1DKqe76byif. GymMane supplies reference organization and visual cues; it contains no reusable native component library to import.

Use common binding proportions, foil rules and editorial typography, with lunar grey, rust and midnight-blue cloth. Covers use separate editable title, mission label, illustration, spine and decorative layers. Scientific illustrations are original schematic reconstructions, not verified engineering drawings. Authentic interior NASA imagery retains its source caption. Do not copy the reference's NASA mark or imply NASA endorsement.

Figma uses DM Serif Display + DM Sans, semantic color variables, volume modes, spacing/radius/motion tokens, native components, variants, properties and Auto Layout. Desktop books are equal choices; mobile uses visible volume controls and a featured cover, not an inaccessible perspective carousel. Reading stacks to one column; 3D controls and evidence remain available outside the viewport.

Implementation targets: 44px minimum interactive hit area; visible focus, semantic links/buttons, named hotspots with a matching list, text alternatives for diagrams, no color-only feedback, no drag-only tasks and no autoplay under reduced motion. Use actual WCAG contrast checks on final token pairs. Figma prototypes demonstrate navigation and states; browser keyboard behavior and screen-reader output remain implementation acceptance checks.

## Performance and verification gates

Targets to measure on a representative integrated-graphics student laptop, not claims about current performance:

- DOM/SVG library and story available before 3D finishes loading; no three live Canvas previews.
- One optional Canvas, adaptive DPR capped near 1–1.5, conservative shadows and instanced repeated rocks.
- Start from a small cropped terrain mesh (e.g. 128–256 samples per side), compact textures and on-demand rendering for stationary inspection; profile before raising budgets.
- Aim for sustained 30 fps in the playable scene on the target machine. Reduce DPR/shadows/terrain detail before removing interactions.
- Keep main-thread controls responsive; pause work when hidden or outside the active experience. Preload only the chosen book/mission.
- Display loading, retry, unsupported WebGL and unavailable storage states. Avoid blocking reading on an asset failure.

Required checks after approved implementation: three complete journeys; wrong-answer explanation and retry; optional skip; reward idempotence; v1 migration; content-only edit preserving progress; reload/back; keyboard-only; reduced motion; 390px / tablet / desktop layouts; WebGL failure; missing image/model; storage failure; numerical light-time checks; existing test suite and production build. Repeat browser validation after the final content freeze.

Earlier discovery passed the baseline tests/build and browser mission flows. Those results do not validate the future redesign. This phase changes documentation and Figma only.

## Review package

- [Collectible rewards and Space Backpack revision contract](../design/collectibles-backpack-revision.md) — supersedes the earlier minimal card treatment; retains exactly three mission rewards and the existing IDs.
- [New Figma system and key screens](https://www.figma.com/design/SLXKYkJoQ1VipdH1vGLdJ6)
- [Component-to-React handoff](../design/offworld-figma-handoff.md)
- [Scientific sources and imagery ledger](../design/offworld-source-ledger.md)

Approve the release priorities, cover language, science treatment and representative journey before substantial application work. Deferred features remain explicitly marked in the handoff.
