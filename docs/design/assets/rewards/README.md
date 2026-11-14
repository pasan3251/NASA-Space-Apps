# Reward artwork — design sources

Prepared 14 November 2026 using the built-in ImageGen tool. These are source assets for the Figma/design review, outside application code. Optimize derivatives after approval; do not ship these full-resolution PNGs unchanged by default.

Only artwork is rasterized. Card text, facts, foil borders, seals, accomplishments, status and controls are separate native Figma/React layers. The closed/open Backpack shells have alpha transparency; the wordmark, navigation and book patches are separate layers.

## Files

| File | Size | Mode | Role |
| --- | --- | --- | --- |
| [curiosity-sky-crane-illustration.png](curiosity-sky-crane-illustration.png) | 1536 × 1024 / 2.16 MiB | RGB | Illustrated reconstruction |
| [offworld-backpack-open-shell.png](offworld-backpack-open-shell.png) | 1024 × 1536 / 3.14 MiB | RGBA | Physical gear shell |
| [offworld-backpack-shell.png](offworld-backpack-shell.png) | 1024 × 1536 / 3.30 MiB | RGBA | Physical gear shell |
| [pioneer-10-illustration.png](pioneer-10-illustration.png) | 1536 × 1024 / 1.86 MiB | RGB | Illustrated reconstruction |
| [surveyor-camera-illustration.png](surveyor-camera-illustration.png) | 1536 × 1024 / 2.27 MiB | RGB | Illustrated reconstruction |

The five source files total approximately 12.73 MiB. The two gear PNGs include alpha. Production derivatives should use measured responsive dimensions and retain transparency.

## Provenance and scientific use

- Surveyor camera form: [NASA Apollo 12 history article and camera museum photograph](https://www.nasa.gov/history/55-years-ago-apollo-12-makes-a-pinpoint-landing-on-the-moon/). The cylindrical camera and scanning-mirror hood informed the new artwork. The reference photograph is not redistributed here.
- Curiosity descent geometry and tethers: [NASA/JPL-Caltech PIA14839](https://www.jpl.nasa.gov/images/pia14839-curiositys-sky-crane-maneuver-artists-concept/). The delivered image is a new illustrative reconstruction, not a flight photograph.
- Pioneer equipment form: [NASA Pioneer 10 mission page](https://science.nasa.gov/mission/pioneer-10/) and its official artist concept. The delivered image is a new illustrative reconstruction with symbolic deep-space scenery.
- Backpack: original fictional exploration equipment inspired by the user's material/atmosphere reference; no NASA logo or claim of authentic flight hardware.
- Open Backpack: matching edit of the closed original; only the upper flap/opening changes. The central pocket remains clear for live controls.

NASA/JPL source records support the separate written facts. The generated pictures are not scientific evidence, engineering drawings, measured terrain, real-time positions or NASA-endorsed artwork. Fine hardware details require the team's final science/art review before production.

## Generation prompts

All prompts below used the built-in ImageGen tool. The three mission images used their factual hardware references; the open Backpack used the closed original. No complete UI screenshot was generated or imported as a flattened screen.

### surveyor-camera-illustration.png

Create an original premium digital painting asset for an educational space collectible card, artwork ONLY, no card frame, no typography, no symbols or seals, no watermark. Subject: the actual recovered Surveyor 3 television camera, use the supplied museum photograph ONLY as factual hardware geometry reference. Preserve its characteristic tall white cylindrical lower electronics body, circular metallic bands, upper scanning-mirror assembly with open rounded black sun hood, pale cream metal brackets, subtle gold fittings and cables. It is not a square box camera and has no tripod legs. New original 3/4 composition, the camera occupies about 70% of image height, fully visible with some breathing room, detailed tactile painted metal, crisp editorial museum illustration with cinematic rim lighting in lunar silver and warm gold. Stylized collage backdrop of a low lunar grey ridge fading into almost-black space, no giant Earth, no astronauts; this is a symbolic reconstruction of recovered hardware, not a historical photograph of equipment still on the Moon. Sophisticated, collectible-worthy for ages 12–16, no cartoon, no fighting/game elements. Landscape 3:2 composition suitable for a 320x230 art window; keep the subject centrally readable at small size and dark clear edges for separate native labels.

### curiosity-sky-crane-illustration.png

Create an original detailed digital painting of Curiosity's sky-crane landing, artwork asset ONLY for an educational collectible, no card border, no lettering, logos, UI, badges, statistics, watermark or numbers. Use the supplied NASA/JPL artist concept ONLY as factual geometry and event reference, create a different 3/4 composition. Curiosity has its recognisable six wheels (three per side), rocker-bogie suspension, white science deck, rectangular mast head with paired cameras and dark radioisotope power unit at rear. Show the powered descent stage hovering above, connected by three nylon tethers plus a thinner umbilical, lowering the rover feet above the ground. Stage's outward-directed active rocket plumes must not hit the rover. No parachute, no balloons, no airbags, no extra rover, no people. Ground in lower quarter: textured rusty Gale-crater-like rocks, stylized distant low ridges, atmospheric copper haze; symbolic reconstruction rather than measured terrain. Warm copper, burnt orange and gold, dark charcoal at edges, dramatic but restrained lighting, high craftsmanship, painterly scientific museum illustration for 12–16-year-olds. Both hardware forms fully readable, no cropped wheels or stage. Landscape 3:2 artwork with subject centered and generous dark margins; fills a 320x246 art window.

### pioneer-10-illustration.png

Create an original premium scientific digital painting of Pioneer 10 for an educational collectible card. Artwork only, no frame, labels, badges, symbols, UI, lettering, numbers, logo or watermark. Use the supplied NASA artwork as factual spacecraft shape reference only: large circular high-gain parabolic dish, compact gold-and-silver hexagonal equipment body, antenna feed supports, long slender magnetometer boom, and radioisotope generator assemblies mounted in pairs on two booms. No solar panels, no engines firing, no Voyager spacecraft, no huge nearby Earth, no astronaut. Different 3/4 viewpoint showing the front concave dish and slender booms, all major hardware fitting fully within frame. Place against elegant midnight navy deep space with subtle tiny stars and a faint cool blue dust band; warm gold rim light and luminous silver dish, detailed materials, sophisticated painted museum illustration, cinematic depth, tactile craftsmanship. This is a symbolic reconstruction rather than a specific measured location. Leave generous dark margins and quiet dark edges. Landscape 3:2, centered readable silhouette for a small 320x246 image window. Communication wave motifs will be added separately as native vectors, do not bake them into the image.

### offworld-backpack-shell.png

Create one original beautiful physical exploration backpack asset for Off-world, a sophisticated educational space expedition journal for ages 12–16. Isolated full backpack on a genuinely transparent background; no scene, no floor, no text, no UI, no readable words, no NASA logo or insignia. Almost straight frontal view with tiny depth at right edge, entire handle and base visible and generous transparent margin. Tall rugged expedition backpack in charcoal green canvas and weathered warm tobacco-brown fabric, precise visible stitching, leather trim, brushed brass buckles, dark webbing straps, multiple practical compartments, side utility loops, small amber illuminated tube at the left side, restrained tiny cyan status light near right buckle. A large plain dark front pocket gives a clean rectangular mounting area for separately rendered native navigation labels; keep this main front face visually quiet. Top padded flap has a blank rectangular stitched patch for separately added Off-world wordmark. Lower pocket has three empty circular patch fields (no illustrations) for separate mission-theme patches. Premium realistic digital painting with tactile woven fabric, cinematic warm gold rim light, museum adventure equipment, convincing construction, neither childish nor military. Closed backpack, front flap shut, buckles fastened. Portrait 2:3 composition, high detail, alpha transparency.

### offworld-backpack-open-shell.png

Edit this original backpack asset to create the matching OPEN state for an interface transition. Preserve the same entire backpack identity, frontal viewpoint, proportions, canvas texture, brown leather, brass buckles, side amber light and cyan light, blank front pocket and three empty lower circular patch fields. Change only the upper flap: unfasten its two brass clips and lift/fold the top flap upward to reveal a dark fabric-lined mouth with a subtle warm gold inner lining; the empty brand patch can stay on the folded flap. Keep the handle visible behind it. Do not add cards, text, hands, logos or UI. Keep the front pocket quiet for native navigation overlays. Ensure the complete open backpack remains fully in frame with some margin. The result must have a genuinely transparent background with preserved alpha, no opaque brown rectangular background. Same premium realistic painted product-asset style, same lighting, portrait 2:3.


## Integrity manifest

See [manifest.json](manifest.json) for SHA-256 checksums, dimensions, alpha metadata and the intended role of each source.
