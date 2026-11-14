# Off-world: Figma-to-React handoff

Status: design handoff completed 14 November 2026 (Asia/Colombo); subsequently approved for implementation. See the [application implementation record](../implementation-2026-11-14.md) for actual components, tested behavior and documented differences. Proposed names below describe the design contract; they do not all correspond one-to-one with extracted source files.

The [collectible rewards and Space Backpack revision](collectibles-backpack-revision.md) supersedes the original minimal card/collection treatment. It records the current component variants, scientific facts, persistent award model, animations, assets, responsive behavior and acceptance criteria. The same Figma file and CollectibleCard set ID are retained.

[Design file](https://www.figma.com/design/SLXKYkJoQ1VipdH1vGLdJ6) · [Start review prototype](https://www.figma.com/proto/SLXKYkJoQ1VipdH1vGLdJ6?node-id=15-5175&starting-point-node-id=15%3A5175) · [Pioneer science prototype](https://www.figma.com/proto/SLXKYkJoQ1VipdH1vGLdJ6?node-id=15-6038&starting-point-node-id=15%3A6038)

The exact GymMane reference is [GymMane Design System & Component Library](https://www.figma.com/design/LMgJKHmRNWT1DKqe76byif). It was inspected read-only. Its frames supplied organizational/visual reference; there were no native components, variables, Auto Layout or prototypes to reuse.

## File structure and review order

| Page | Purpose |
| --- | --- |
| 00 Overview | Collection direction, release priorities and review guide |
| 01 Foundations | Color modes, volume palette, typography, spacing and motion |
| 02 Core UI | Buttons, icons, evidence labels, progress and recovery states |
| 03 Books & Storytelling | Layered covers, source references and book navigation |
| 04 Science & Inspection | Hotspots, timeline, playback, readouts, inspection, comparisons |
| 05 Mission & Collection | Answers, feedback, discoveries, evidence board and cards |
| 06 Library & Navigation | Desktop selection states, 1024px tablet and 390px mobile |
| 07 Moon | Story, schematic inspection and historical comparison |
| 08 Mars | Story, EDL time machine and hardware inspection |
| 09 Outer Space | Story, signal states, comparisons, mobile reading and science |
| 10 Expedition & Rewards | Same-page connected prototype, questions, rewards and Backpack |
| 11 Handoff & Validation | Existing React mappings, limits and acceptance gates |

The initial native inventory contained 4 variable collections / 59 variables and 21 component sets. The reward revision extends the same four collections to 80 variables, 32 component sets and 208 components. Counts describe Figma assets, not app implementation. Native text/effect styles, editable vectors and separate image layers remain in use; no full UI is flattened into a background.

## Component mapping

“Proposed” means an extraction/addition after approval, not an existing source file. Keep the current React 18 / R3F 8 architecture.

| Figma component | Current React anchor | Proposed implementation / contract |
| --- | --- | --- |
| BookCover: Volume × State | src/features/book/BookExperience.tsx | BookLibrary + BookCover; bookId, selected, progress, onOpen. Keep art, title and UI separate. Volume titles come from book data, not an editable default shared across variants. |
| StoryNavigation | BookExperience | BookReader navigation with reading location per book; previous/next and direct chapter links. |
| SourceReference | SourceLinks in BookExperience; ArchiveRecord in ExplorationExperience | SourceCitation; MissionSource id, title, URL, credit. Use real links; source does not automatically validate adjacent reconstruction. |
| EvidenceLabel | Existing EvidenceKind / ArchiveRecord | Shared explicit text for Historical record, Reconstruction, Fictional expedition; additional UI status labels remain distinct from scientific evidence categories. |
| ActionButton / IconButton | Buttons across BookExperience and ExplorationExperience | Small shared UI controls; tone, disabled, label, icon; browser derives hover/focus. Icon uses currentColor; icon-only buttons require accessible names. |
| ProgressTrack | App.tsx and BookExperience progress | Mission/book progress derived from persisted state; text count remains available without bar. |
| Hotspot | DiscoveryMarker in src/features/exploration/MissionWorld.tsx | Preserve onSelect and discovered IDs. DOM/SVG annotations and R3F markers share data; matching equipment list provides keyboard access. |
| EquipmentPanel | ArchiveRecord in src/features/exploration/ExplorationExperience.tsx | EquipmentInspector panel; selected discovery, sourceIds, evidence type and close callback. Keep current direct record access. |
| InspectorControls | ExplorerCamera / NormalizedModel | Controlled zoom/rotation/reset only for approved inspection mode. Existing exploration camera remains intact. Detailed camera geometry is deferred. |
| RecoveryPanel | NoWebGL and current storage/error handling | Loading / retry / WebGL unavailable / storage unavailable, with equivalent educational path. |
| TimelineSlider | MissionDiagram and mission data | MissionTimeline; ordered events, current event id, onChange; labelled range plus previous/next buttons. Render content from event data. |
| ScientificReadout | New | LightTimeReadout; distanceKm, oneWaySeconds, historical date, approximation label. Format from one calculation rather than unrelated strings. |
| PlaybackControls | New | Play/pause/reset/step; state, elapsedSeconds, timeCompression, reducedMotion. Use a single elapsed-time clock. |
| ComparisonView | New, using existing source/discovery records | EvidenceComparison with photograph/report tabs or stacked views; no drag-only reveal. |
| EvidenceBoard | Current mission task / ArchiveRecord | EvidenceSummary first; equipment → purpose → fate → knowledge. Rich select-to-connect behavior is stretch. |
| AnswerOption / Feedback / QuestionCard | Current task panel in ExplorationExperience | AssessmentPanel; retain each existing required task and correct answer. Optional tasks are a separate branch with explanation, retry and skip. |
| DiscoveryItem | Existing equipment list / discoveries | EquipmentListItem; selected/discovered flags and keyboard activation. |
| CollectibleCard / CollectionCardTile / CardDetailPanel | New, derived from completed mission state | MissionCollectibleCard, CollectionCardTile, CardDetailView; stable IDs, scientific fact/reverse, source link, locked/new/selected/focus states. Ownership is separate from presentation. |
| SpaceBackpack / BackpackLauncher / BackpackProgress / CollectionGrid | App.tsx / src/utils/expeditionProgress.ts | BackpackExperience, BackpackGear, persistent launcher and collection selector; three cards, versioned migration and repeat-safe awards. No account required. |
| Terrain/scene annotations | Surface, ExplorerCamera, DiscoveryMarker positions | Terrain adapter with provenance, one transform and sampleHeightAt used for geometry/camera/equipment. |

These mappings are documented manually in the file and this document. **Published Figma Code Connect templates have not been created**: most target components do not exist yet, and no source implementation is authorized in this phase.

## Tokens and component properties

Collections: Offworld / Primitives; Offworld / Color (Paper, Night, High contrast); Offworld / Volume (Moon, Mars, Outer Space); Offworld / Dimensions. Semantic colors alias palette values. Variables include WEB CSS code syntax. Native fills, strokes, spacing and radii bind to variables; text sizes use native styles.

Use CSS custom properties after approval. Example mapping: color/surface/page → --ow-color-surface-page; volume/cover → --ow-volume-cover; space/24 → --ow-space-24. Confirm exported code syntax when writing the token source; do not maintain a second independent palette.

Typography: DM Serif Display for editorial titles, DM Sans for reading/interface. Reading is 17/27, interface 16/24, caption 13/19; desktop library display 64/70. Mobile uses smaller headings and a single reading column. Motion tokens specify 150ms feedback, 320ms navigation and 0ms reduced-motion transitions.

Buttons have real Label text, Show icon boolean and Icon instance-swap properties, plus Tone/State variants. Other appropriate text properties include source credit/source, equipment title/description, timeline title, answer label, feedback explanation and discovery title. Variant-specific scientific values and volume titles are intentionally fixed to their correct variants rather than merged text defaults.

A 44px minimum hit target and 48px controls are design targets. Figma states do not implement actual browser focus, disabled semantics, screen-reader announcements or keyboard sliders.

## Prototype coverage and limits

The reward revision adds named page-10 flows for physical Backpack opening, a 2/3 collection, mission-card reveal, reduced motion, mobile and tablet. Empty/partial/complete states now have Collection/Rewards/Progress views. Replays preserve their originating count; card flipping uses an interactive component and return uses navigation history. See the revision contract for current links and the distinction between representative fixtures and real application persistence.

Start on page 10 using the named flow “Start here / Three-book expedition.” Book choices switch selection states and open the corresponding story. Source panels link to original records. The detailed Pioneer path includes ready/playing/paused/complete, comparison/round-trip views, a reduced-motion entry, the existing evidence question, optional explanation/retry/skip, card and Backpack. Moon/Mars show abbreviated completion routes to their own cards. Their optional-question layout is represented by the shared pattern and Pioneer example.

The Figma signal states illustrate visual direction. They do not calculate propagation or preserve an exact playhead when paused. The automatic transition is a narrative prototype; implement and test the actual 12-second clock in React/SVG. Round-trip and comparison views are explanatory states, not telemetry or a live ephemeris.

3D viewport frames contain labelled schematic illustrations. They are not working 3D models or promises of a high-detail camera/EDL reconstruction. Covers are original schematic concept artwork pending final spacecraft-detail review. Do not export an entire screen as a flattened React background.

## Responsive behavior

- Desktop: three equal book choices; two-column story/evidence; science context beside diagram.
- Tablet: three smaller covers; stacked scientific layout when controls no longer fit.
- 390px mobile: visible volume controls plus a featured cover, one reading column, stacked science diagram/readout/explanation and full-width primary actions.
- Equipment controls wrap or move below the viewport; list and source access remain visible.
- Avoid simultaneous live Canvas previews, mandatory perspective gestures, drag-only questions and automatic motion.
- The prototype includes 390px, 1024px and 1440px representatives. Continuous breakpoint behavior still needs browser validation.

## Release state and source contracts

See [roadmap](../plans/2026-11-13-offworld-revised-roadmap.md) for v1 migration, stable IDs, completion and terrain rules. Preserve surveyor / curiosity / pioneer IDs and the 12 current discoveries. The required questions remain exactly the existing questions; EDL sequencing and extra light-time questions are optional reinforcement.

[Source ledger](offworld-source-ledger.md) records scientific facts, provenance and caveats. Every new diagram/experience must identify historical record vs reconstruction vs fictional expedition. The supplied concept image is art direction, not engineering evidence.

## Verification performed in this phase

The new file was inspected through native-node inventories, component geometry and prototype destination checks, with rendered screenshots of the library, Moon spread, Mars timeline, Pioneer visualization, mobile library, Backpack and foundations. Layout corrections addressed text auto-height, variant-specific labels, illustration scaling, icon contrast and overflow. The existing npm test suite passed unchanged (3 missions / 12 sourced discoveries / answers / progress and storage validation).

The baseline production build also passed; Vite retains its existing large lazy 3D chunk warning (about 956 kB minified / 260 kB gzip). Numerical checks passed for Pioneer/Moon/1 AU light times, time compression, EDL elapsed times and reception delay. The nine checked primary text/background token pairs range from 5.35:1 to 16.56:1; this is not a complete accessibility audit. Prototype graph validation found no invalid navigation destinations and confirmed all three reward routes, optional retry and Pioneer’s partially collected Backpack are reachable. Final screen-bound checks found no remaining Auto Layout overflow in the representative frames.

No redesign implementation or student-laptop performance measurement has occurred. Full browser acceptance tests and a fresh final production build remain necessary after approved implementation.
