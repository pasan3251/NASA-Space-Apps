# Expedition asset provenance

All three exploration scenes are illustrative reconstructions in a fictional future expedition. Local arrangement, pose, lighting, debris condition, terrain and inspection-marker placement are authored for the demonstration, not georeferenced observations. No simulated future visit is NASA footage or a prediction.

## Pioneer 10

- Asset: `/models/pioneer.glb` (2,049,840 bytes).
- Verified source page: https://science.nasa.gov/3d-resources/pioneer/
- Download: https://assets.science.nasa.gov/content/dam/science/cds/3d/resources/model/pioneer-10/Pioneer%2010.glb
- Source credit: NASA/JPL/Eyes on the Solar System.
- Acquired: 2026-11-13, for an educational NASA Space Apps demonstration.
- Runtime transformations: cloned geometry hierarchy; scene centered and display span normalized to 8 scene units; replacement cel-shaded materials preserve original diffuse textures. Display scale and orientation are illustrative. Original downloaded file is unchanged.
- If model decoding fails, a visibly simplified schematic dish/booms/body/plaque reconstruction remains available. Neither pose nor present physical condition is claimed as an observation.

## Curiosity

- Asset: existing `/models/curiosity.glb` (5,285,116 bytes), already in the supplied project.
- The supplied project labels its model NASA-derived; original download and checksum have not yet been verified. Do not claim provenance verification from its filename.
- Reference model page: https://science.nasa.gov/resource/curiosity-rover-3d-model/
- Runtime transformations: clone hierarchy and replace only cloned materials; center and ground model, normalize displayed maximum dimension to 3.3 scene units. Source geometry and embedded textures remain unchanged.
- Heat-shield exhibit and drill-target rock are authored schematic geometry. They are isolated educational exhibits, not an accurately co-located reconstruction of landing debris and Yellowknife Bay.
- Light dashed lines near the rover are illustrative navigation overlays, not an imported historical traverse or a measured wheel-track dataset.

## Surveyor 3 and Apollo 12

- No official detailed Surveyor model was verified or downloaded.
- Surveyor, sampling mechanism and Apollo descent stage are original simplified geometry assembled for the educational demonstration.
- Reference photographs: https://science.nasa.gov/resource/view-of-surveyor-iii-in-its-crater/ and https://science.nasa.gov/resource/apollo-12-and-surveyor-3/
- Recovery evidence: https://ntrs.nasa.gov/citations/19710024418
- Camera and recovered sampling scoop are intentionally absent; a HUD marker opens records rather than displaying a camera still attached in the fictional future.
- Relative locations are a schematic inspection layout, not the documented full lunar traverse or surveyed distances.

## Terrain and stars

- Authored deterministic low-poly meshes, seeded rock locations and seeded star points; no remote imagery or AI-generated bitmap assets.
- The new scene does not use the incumbent Mars Trek height map because its precise location, scale and transformations require further verification.
- Ground is level within the inspection area for accessible movement. Terrain is illustrative rather than topographic data.

## Draco decoder

- Local runtime files in `/vendor/draco/` were copied from the installed `three/examples/jsm/libs/draco/gltf` package to avoid a runtime external CDN dependency.
- Upstream decoder project: https://github.com/google/draco
- Draco is distributed under the Apache License 2.0: https://github.com/google/draco/blob/main/LICENSE
- Files: `draco_decoder.js`, `draco_wasm_wrapper.js`, `draco_decoder.wasm`.

NASA educational media guidance: https://www.nasa.gov/nasa-brand-center/images-and-media/ . Preserve asset-specific credits and inspect any third-party rights before expanding reuse. Scene code and schematic geometry were created with AI assistance; no AI-generated historical imagery is represented as evidence.
