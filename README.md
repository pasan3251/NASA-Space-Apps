# Off-world — An Expedition Journal

A desktop-first educational demonstration for NASA Space Apps, designed for ages 12–16. Choose a Moon, Mars or Outer Space book, investigate science, explore NASA hardware through a fictional future expedition, and keep a collectible proof of your discoveries in the Space Backpack.

This is the updated application in **pasan3251/NASA-Space-Apps**. Run commands from this repository's root.

## Getting started

Use Node.js 22 or newer and npm:

```sh
npm ci
npm run dev
```

Open the local address printed by Vite. To verify and preview a production build:

```sh
npm test
npm run build
npm run preview
```

## Project structure

```text
src/
  features/
    book/                  # Cover, page turns, briefings, journal and sources
    exploration/           # Walking/EVA, archive HUD, tasks and 3D worlds
  data/                    # Replaceable mission stories and source references
  types/                   # Shared mission and progress contracts
  utils/                   # Progress persistence and cel-shading helper
  styles/                  # Global styles and recovery states
  App.tsx                  # Application flow and saved progress
  main.tsx                 # React entry point
public/
  models/                  # Required Curiosity and Pioneer runtime models
  fonts/                   # Self-hosted fonts and their licenses
  vendor/draco/            # Local model decoder and its license
scripts/                   # Mission content and progress checks
docs/                      # Development, asset credits and verification notes
.design-rules/             # Apple Design Skill Git submodule (development only)
PRODUCT.md                 # Product requirements and scope
DESIGN.md                  # Implemented design system
```

The original `Visual-Testing/` sandbox is retained locally as a separate, ignored repository. It is not part of this application's source tree or GitHub publication. Dependencies, builds, raw Blender/STL inputs, screenshots and local agent/design artifacts are also excluded.

## Demonstration episodes

- **Moon — Surveyor 3 / Apollo 12:** the camera returned to Earth became scientific evidence.
- **Mars — Curiosity:** discarded landing hardware enabled a laboratory to investigate ancient habitability.
- **Deep space — Pioneer 10:** inspect the spacecraft and distinguish continued travel from communication and scientific legacy.

Mission selections remain provisional until the competition briefing. The future astronaut, encounter conditions, terrain and inspection layouts are fictional or schematic where labeled. Scientific descriptions link directly to NASA/JPL records. No live telemetry or georeferenced reconstruction is claimed.

## Controls

Library: select a book, then choose Open. Tab, Enter and the book-selection arrow/Home/End keys work. Reading: page buttons or left/right arrows; each volume remembers its reading location. System reduced-motion preferences apply to books, scientific playback and rewards.

Exploration: WASD move; drag to look or choose **Capture mouse**; C switches camera; J shows discoveries; F inspects nearby hardware; Escape releases the mouse or closes records. Pioneer jetpack: E/Space up, Q/Control down. Shift moves faster. The discovery list and travel shortcuts offer alternatives to precise movement.

Inspect four records and answer the evidence question to complete a mission. Completion immediately earns its one persistent collectible; optional reinforcement can be retried or skipped. Open the Space Backpack from the screen edge to filter cards, inspect their reverse and sources, or return to a book. Escape closes details/the Backpack; exploration remains paused until you resume.

Progress uses `offworld-expedition:v2` in localStorage and migrates valid `offworld-expedition:v1` saves without deleting the original. Editorial/art changes do not erase completion. Without WebGL, historical records and evidence tasks remain available. Denied storage supports the current session with a visible notice. No audio or account is required.

The Pioneer book contains an original SVG light-time demonstration anchored to 23 January 2003, plus one-way/round-trip and reference-distance comparisons. It explicitly separates hypothetical signal propagation from successful historical contact.

See [implemented features, validation and remaining work](docs/implementation-2026-11-14.md).

## Content, design and attribution

Edit `src/data/expeditionMissions.ts` to update narratives, discoveries, learning tasks and sources. See [development guidance](docs/development.md) before replacing mission IDs or scene geometry.

- [Asset provenance and reconstruction limits](docs/assets.md)
- [Font origins and licenses](docs/fonts.md)
- [Apple design review](docs/quality/apple-design-review.md)
- [Verification notes](docs/quality/verification.md)

The book uses the user-requested Apple Design Skill. To check out its pinned development references:

```sh
git submodule update --init
```

The skill is not needed to install, build or run the application. The application uses AI-assisted code, educational copy and schematic geometry. It does not imply NASA endorsement, and no generated image is presented as historical evidence. Asset-specific credits and licenses are preserved.

## Current boundaries

This demonstration does not include measured historical traverse playback, archival video, narration, realistic collision/jetpack physics or photogrammetric terrain. The supplied Curiosity model's exact original download remains unverified and is disclosed in the asset ledger. Final mission content and challenge-provided source eligibility must be checked after the briefing.
