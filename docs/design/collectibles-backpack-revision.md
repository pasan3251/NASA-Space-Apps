# Collectible rewards and Space Backpack — revised implementation contract

Design revision completed 14 November 2026 and subsequently approved by the user for implementation. This contract extends the existing Off-world system and supersedes the earlier minimal reward treatment. See the [application implementation record](../implementation-2026-11-14.md) for actual components, validation and remaining production checks.

[Updated Figma file](https://www.figma.com/design/SLXKYkJoQ1VipdH1vGLdJ6) · [Open Backpack prototype](https://www.figma.com/proto/SLXKYkJoQ1VipdH1vGLdJ6?node-id=42-4000&starting-point-node-id=42%3A4000) · [Mission reward prototype](https://www.figma.com/proto/SLXKYkJoQ1VipdH1vGLdJ6?node-id=12-462&starting-point-node-id=12%3A462) · [Mobile collection](https://www.figma.com/proto/SLXKYkJoQ1VipdH1vGLdJ6?node-id=51-6870&starting-point-node-id=51%3A6870)

## Inspection and redesign decision

The previous CollectibleCard family had six variants: three volumes × locked/unlocked, 280 × 380. It reused the book's small line drawings, with title and status but no scientific fact, completion seal, reverse or card-detail experience. Backpack screens were three-card rows; existing empty/partial/complete states and incoming completion links were useful.

Retained: the file, original CollectibleCard set ID **8:145**, original six variant IDs, mission IDs, three-card limit, DM Serif Display / DM Sans, dark museum backgrounds, gold, volume variables, source/evidence rules and the existing completion/progress architecture. Book covers and scientific experiences are outside this visual redesign.

Changed: collectible composition, illustration, foil treatment, achievement seal, interaction states, enlarged details, physical Backpack, persistent launchers, collection navigation and reward sequence. Native prototype links and affected screens are updated in the same file. New artwork is a separate raster layer; type, facts, frames, seals, indicators and controls remain editable native elements.

The two user references informed materials and excitement, not their scientific claims, ratings, six-slot inventory or UI layout. The actual Surveyor camera's cylindrical body and mirror hood replace the reference's box-camera form.

## Three rewards, tied to the existing mission IDs

| Mission ID | Stable proposed card ID | Display title | Editorial collection category |
| --- | --- | --- | --- |
| surveyor | surveyor-camera | Moon — Recovered Camera | Returned hardware |
| curiosity | curiosity-skycrane | Mars — Sky-Crane Trailblazer | Landing system |
| pioneer | pioneer-messenger | Outer Space — Deep Space Messenger | Deep-space probe |

Categories describe the equipment story; they are not formal NASA mission classifications or quality ratings. Expedition 01/02/03 are identifiers, not rarity ranks.

Verified front facts:

- Surveyor: Apollo 12 returned the camera so engineers could test effects of about 2½ years on the Moon. Basis: [NASA-CR-121796](https://ntrs.nasa.gov/citations/19710024418).
- Curiosity: the descent stage lowered the rover on tethers, then flew away after touchdown. Basis: [JPL PIA14839](https://www.jpl.nasa.gov/images/pia14839-curiositys-sky-crane-maneuver-artists-concept/) and [observed landing hardware, PIA16001](https://www.jpl.nasa.gov/images/pia16001-scene-of-a-martian-landing/).
- Pioneer: the final faint signal reached Earth on 23 January 2003 with no telemetry. Basis: [NASA last-signal record](https://science.nasa.gov/missions/pioneer/pioneer-10-sends-last-signal/).

No unsupported “first camera,” spacecraft rating, terrain rating, rarity, power, XP or reward multiplier is introduced. The front's two accomplishment indicators mean **all four existing records inspected** and **required evidence task concluded**. The seal means the learner's fictional expedition is complete, not the operational end of a NASA mission. The reverse explains the equipment's scientific legacy and links the source.

The three patches on the Backpack identify the books. They are decorative identity marks, not additional earnable badges. There is no Badges & Patches section in this release.

## Native Figma component contract

| Component | Variants / properties | Intended React role |
| --- | --- | --- |
| CollectibleCard | Volume: Moon/Mars/Outer Space; State: Locked, Unlocked, Newly earned, Shine, Selected, Hover, Focus, Mission complete, Back — 27 variants. Show seal / Show accomplishments booleans. | MissionCollectibleCard |
| CollectionCardTile | Volume × Locked/Unlocked/Selected/Hover/Focus/Newly earned — 18 variants | CollectionCardTile |
| MissionCompleteSeal | Complete/Locked | MissionCompleteSeal |
| AchievementIndicator | Pending/Complete; editable Label | LearningAccomplishment |
| SpaceBackpack | Closed/Opening/Open/Reduced motion | BackpackGear |
| BackpackNavItem | Default/Selected/Focus; Label and Icon swap | BackpackSectionLink |
| BackpackLauncher | Default/Hover/Focus/New reward/Open | BackpackLauncher, desktop |
| BackpackLauncherCompact | Same states, visible text label | BackpackLauncher, mobile |
| BackpackProgress | Collected 0/1/2/3; three segments and explicit count | CollectionProgress |
| CollectionGrid | Empty, each one-card profile, two-card sample, complete | CollectionGrid |
| CardDetailPanel | Volume × Front/Back; native source and flip actions | CardDetailView |
| CardUnlockPanel | Three volumes; exact unlock conditions and book route | CardUnlockRequirements |

The full card is 360 × 600; the compact tile is 280 × 430. The compact grid omits dense facts so the title/status remain readable. Enlarged details present the verified fact and scientific explanation as ordinary readable text.

Figma folds independent presentation states into one axis for review. React should keep ownership, selection, focus, face and celebration stage separate. Hover or card flipping must never mutate ownership.

## React architecture and component mapping

No new state framework, backend or authentication is required for three local mission cards.

| Current source | Required evolution after approval |
| --- | --- |
| src/App.tsx | Own collection view/return context; render persistent BackpackLauncher; preserve current book/mission location when opening and closing the collection. |
| src/utils/expeditionProgress.ts | Add v1 → v2 migration and a derived collection selector; remove global editorial-hash resets from normal v2 reading. Preserve valid mission IDs/discoveries/completion. |
| src/types/expedition.ts | Extend versioned save metadata and define card IDs, definitions and ownership/presentation types. |
| src/data/expeditionMissions.ts | Keep existing mission/discovery IDs and required tasks. Reference card IDs without replacing working Curiosity content. |
| src/features/exploration/ExplorationExperience.tsx | Invoke the idempotent completion/reward action after the current required task. Pause movement and release pointer capture when opening Backpack. Optional questions never gate ownership. |
| src/features/book/BookExperience.tsx | Route card “Open book” back to the correct volume/mission and saved reading location. Preserve the book's visual identity. |
| Proposed src/features/collection/ | BackpackExperience, BackpackGear, BackpackLauncher, CollectionGrid, CollectionCardTile, CollectionProgress, CardDetailView, CardUnlockRequirements. |
| Proposed src/features/rewards/ | MissionRewardExperience, MissionCollectibleCard, MissionCompleteSeal, LearningAccomplishment. |
| Proposed src/data/collectibleCards.ts | Three static definitions, source IDs, original illustration references and alt text. |

These are proposed component/file names, not implemented files or published Code Connect bindings.

Keep the existing lazy 3D boundary. Opening Backpack must pause exploration input, release pointer capture and suspend unnecessary rendering. Preserve the active mission and reading location. Return to a paused exploration state with an explicit resume gesture; do not silently recapture the pointer.

## Data and persistence

Proposed static definition (TypeScript specification only):

~~~ts
type MissionId = 'surveyor' | 'curiosity' | 'pioneer';
type CardId = 'surveyor-camera' | 'curiosity-skycrane' | 'pioneer-messenger';

interface CollectibleDefinition {
  id: CardId;
  missionId: MissionId;
  expeditionNumber: '01' | '02' | '03';
  title: string;
  spacecraft: string;
  collectionCategory: string;
  verifiedFact: string;
  scientificExplanation: string;
  sourceIds: string[];
  artwork: { src: string; alt: string; evidence: 'Reconstruction' };
  presentationVersion: number;
}

interface CollectionMetadata {
  earnedAt: string | null;       // null when an old completion has no timestamp
  firstViewedAt: string | null;
  origin: 'mission-completion' | 'legacy-completion';
}
~~~

Authoritative ownership is derived from persistent mission completion. The metadata map is keyed by CardId; it is never an append-only array of award events. A mission can contribute only its one registered card.

Rules:

1. Inspecting records alone does not award a card. Use the existing required evidence task and valid completed flag.
2. On successful mission completion, save completion and ensure the corresponding keyed metadata record exists. Repeated calls return the same record.
3. A replay opens “Already collected,” preserves the count and does not restart a new-card celebration.
4. Save ownership before cosmetic reveal work. Closing, refreshing, skipping animation, asset failure or navigation during reveal must not lose the reward.
5. Optional-question skip or wrong answers do not revoke or delay a card.
6. Collection count is the number of completed registered missions, capped by the three definitions. Ignore unknown card IDs in the current release count.
7. Infer cards for existing valid v1 completions. Do not invent historical earn dates: use earnedAt: null and legacy-completion. No automatic queue of three celebrations on migration.
8. firstViewedAt controls a textual new-card marker; it is independent of whether an animation ran. Do not persist the shine playhead, hover, focus or selected face.
9. Keep reading positions and optional attempts in separate v2 fields. Changing art or prose must not erase mission progress or cards.
10. Corrupt/denied storage must fall back to the current in-memory experience with a visible saving notice.

Migration must read the v1 envelope before the old strict contentRevision check can discard it, validate known mission/discovery IDs, carry valid completed missions, derive their cards, and write v2 only after successful conversion. Keep the original record until conversion succeeds. Material future evidence changes need a deliberate per-mission review policy; they must not silently reset unrelated missions or previously earned collections.

## Interaction and motion

Reward sequence: successful evidence conclusion → completion message → user-controlled card reveal → one foil shine → inspect/flip → collection confirmation → open collection or continue. A skip control and reduced-motion entry reach the stable earned state immediately.

Target motion tokens extend the existing Dimensions collection: reveal 560ms, shine 650ms, Backpack opening 420ms, card flip 280ms; reuse the existing 0ms reduced-motion token. The prototype uses a short native reveal/shine sequence; its exact timing is presentation intent, not an application clock.

Use layered DOM/CSS: static foil gradients and inset rules, one clipped shine layer, a separate image, SVG seal/icons and live text. A card flip can use a brief transform in the app; reduced motion swaps the face instantly and preserves the full explanation. No continuous pulsing, repeated sparkles, random reward particles or compulsory waiting.

Backpack uses matching closed/open alpha assets with a short crossfade and collection reveal. It needs no extra Canvas, physics or 3D backpack model. Navigation and source access remain usable during cosmetic effects.

## Assets and visual limits

[Source artwork and prompts](assets/rewards/README.md) are design assets, outside the application asset pipeline. There are three original AI-assisted spacecraft/equipment illustrations plus closed/open Backpack shells. Camera references were checked against actual cylindrical camera geometry; Mars/Pioneer references use NASA/JPL material. All three card artworks are labelled **illustrated reconstruction**, not archival photography or measured terrain.

Before production: create optimized WebP/AVIF derivatives, preserve PNG alpha for the Backpack, choose responsive image sizes, retain the provenance manifest and have the team's 3D/science reviewer inspect fine spacecraft details. Generated decorative geometry is not a technical drawing or evidence.

Reuse the existing colors and fonts. Added variables cover foil/holographic accents, cloth surfaces, reward radius and four motion durations; new paint/text/effect styles belong to Offworld. Bright treatment is concentrated on rewards. Book covers, story pages, science visualizations and working 3D missions retain their identity.

## Responsive and accessibility requirements

- Desktop: physical gear sidebar and three readable compact cards; a larger detail view presents full science text.
- Tablet: smaller gear illustration with normal-sized native navigation and two card columns; the third card appears below.
- Mobile: one card per row, scrollable collection/detail content and a compact fixed gear rail with safe-area clearance. Essential text must not shrink merely to fit.
- Reserve space for the persistent launcher; it must not obscure book navigation, equipment controls or the final card's action.
- Launcher: real button, visible label, Open Space Backpack accessible name, aria-controls/expanded where appropriate, keyboard activation and visible focus.
- Full-page collection/detail routes move focus to their heading and restore focus to the launcher/selected card on return. If implementation uses a modal instead, add proper dialog semantics, focus containment and Escape handling.
- Every locked card exposes its title, status, associated mission and unlock requirements. No hover-only science, color-only lock state or drag-only action.
- Decorative foil, patches and seal ornament are hidden from assistive technology; completion and accomplishment text remain accessible.
- Announce a newly earned card once. Do not announce every shine frame or replay an award announcement.
- Honor reduced motion automatically, with instant/static equivalents and no automatic shine. Source facts and ownership are identical.
- Missing artwork keeps text and controls usable. No-WebGL mode earns the same cards through the existing record/evidence route.

## Acceptance criteria after approved implementation

1. Exactly the three registered missions can award exactly three unique cards.
2. Four inspected records plus the current correct evidence task establish completion; optional attempts do not change ownership.
3. Existing v1 completions migrate without replay; valid discoveries and reading/progress data survive.
4. Reload, closing during reveal, skipping animation and denied storage behave as specified.
5. Completing/replaying the same mission repeatedly leaves one keyed card and an unchanged count.
6. Empty, one-card, two-card and complete collections show correct locked/unlocked states; “Open book” uses the right mission ID.
7. Selection, enlarged detail, reverse, source links, return and launcher navigation work with keyboard and pointer.
8. New markers clear on viewing without revoking ownership. The 0/3–3/3 segments agree with the card states.
9. 390px mobile, 1024px tablet, desktop, 200% text zoom, focus and reduced-motion checks pass.
10. Native tests, meaningful migration/award tests, final browser flows and production build pass; measure target-laptop behavior. No additional animation Canvas or permanent render loop is introduced.

## Prototype coverage and limits

The active review flows live on page 10. Collection/rewards/progress profiles show 0/3, each 1/3, an illustrative 2/3 and 3/3. Detail flipping uses an interactive component so it does not add navigation history. Back returns to the originating profile. Replay variants preserve the originating profile's count.

The Figma profiles are representative fixtures, not a live persistence simulation. Exiting to the earlier book/mission prototype returns to its initial fixture. Mobile/tablet collection/detail layouts are demonstrated; book links reuse the existing journal prototype rather than introducing an unrelated mobile book redesign. Actual localStorage, focus semantics, pointer control and duplicate-award prevention remain implementation acceptance work.

The file includes source links and native transitions. Browser-runtime performance and accessibility have not been claimed from Figma render checks. See the [validation record](collectibles-backpack-validation.md) for checked layouts, native navigation coverage, asset integrity and unchanged-application tests.

## Review decisions remaining

Review the richer card/material treatment, the physical Backpack and the minimum release cut. Fine hardware-art review and web-asset optimization are production gates. No six-card inventory, separate badge system, rarity economy, trading or additional missions are proposed.
