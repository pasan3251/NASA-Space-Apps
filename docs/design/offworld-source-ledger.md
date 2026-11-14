# Off-world: scientific and visual source ledger

Verified for planning/design on 13 November 2026. These are source records, not authorization to change application content. Original linked records take precedence over supplied dossier/image labels. Keep asset credits, scientific evidence and reconstructed geometry separate.

Collectible revision verified 14 November 2026: the three front facts and original AI-assisted illustrations are documented in [the reward contract](collectibles-backpack-revision.md) and [asset provenance](assets/rewards/README.md). Generated artwork is reconstruction; it is not NASA photography or evidence.

## Source register

| ID | Primary source | Use / qualification |
| --- | --- | --- |
| pioneer-history | [NASA: Pioneer 10](https://science.nasa.gov/mission/pioneer-10/) | 23 January 2003 last signal received; about 12.23 billion km separation; mission history. Historical distance is rounded. |
| pioneer-last-signal | [NASA: Pioneer 10 Sends Last Signal](https://science.nasa.gov/missions/pioneer/pioneer-10-sends-last-signal/) | Last faint contacts had no telemetry; last telemetry 27 April 2002. Distinguish reception from a successful two-way exchange. |
| eyes-interaction-reference | [NASA Eyes: Voyager one-light-day story](https://eyes.nasa.gov/apps/solar-system/#/story/voyager_one_day_light_time) | Interaction inspiration: guided signal narrative, viewpoints, replay and time controls. Voyager values are not Pioneer values. Original UI/art is not copied. |
| camera-tests | [NASA NTRS 19710024418 / NASA-CR-121796](https://ntrs.nasa.gov/citations/19710024418) | Recovered Surveyor 3 camera tests; electrical/mechanical/optical observations; dust/radiation discoloration; qualify evidence rather than overstate absence of damage. |
| camera-geometry-reference | [NASA: Apollo 12 pinpoint landing / recovered camera](https://www.nasa.gov/history/55-years-ago-apollo-12-makes-a-pinpoint-landing-on-the-moon/) | The displayed camera has a cylindrical body and scanning-mirror hood. Museum photograph used for hardware-form reference only; not republished as the card artwork. |
| curiosity-skycrane-reference | [JPL: Curiosity’s Sky Crane Maneuver / PIA14839](https://www.jpl.nasa.gov/images/pia14839-curiositys-sky-crane-maneuver-artists-concept/) | Artist concept and explanation of tethers, umbilical and descent-stage flyaway. Do not present the illustration as a descent photograph. |
| apollo-photo | [NASA: Apollo 12 and Surveyor 3](https://science.nasa.gov/resource/apollo-12-and-surveyor-3/) | Historical photograph AS12-48-7134; shows the visit, not laboratory test results. Credit NASA. |
| curiosity-actual-edl | [JPL: Timeline of Major Mission Events During Curiosity’s Landing](https://www.jpl.nasa.gov/news/timeline-of-major-mission-events-during-curiositys-landing/) | Published 9 August 2012, post-landing. Separate event time at Mars from Earth reception. Original times PDT; UTC conversion adds seven hours and changes date to 6 August. |
| curiosity-hardware-photo | [JPL: Scene of a Martian Landing / PIA16001](https://www.jpl.nasa.gov/images/pia16001-scene-of-a-martian-landing/) | MRO / HiRISE hardware locations about 24 hours after landing. Credit NASA/JPL-Caltech/University of Arizona. Not a simultaneous photograph of the descent. |
| curiosity-preflight-diagram | [NASA: Final Minutes of Curiosity’s Arrival at Mars](https://science.nasa.gov/resource/final-minutes-of-curiositys-arrival-at-mars/) | Pre-landing illustration. Useful equipment narrative; do not present its estimated timings as the flown timeline. |
| curiosity-required-evidence | [JPL: Conditions Once Suited for Ancient Life on Mars](https://www.jpl.nasa.gov/news/nasa-rover-finds-conditions-once-suited-for-ancient-life-on-mars/) | Existing John Klein evidence question. Ancient habitability does not demonstrate living microbes. |
| moon-dtm | [LROC: NAC_DTM_APOLLO12](https://data.lroc.im-ldi.com/lroc/view_rdr/NAC_DTM_APOLLO12) | Candidate 2m DTM + ortho/confidence products. Verify reference frame, bounds, nodata and transformations before using. [NASA SVS context](https://svs.gsfc.nasa.gov/4767/). |
| mars-dtm | [HiRISE: ESP_018854_1755 DTM](https://hirise.lpl.arizona.edu/dtm/ESP_018854_1755) | Candidate approximately 1.01m/pixel Gale DTM. Confirm actual mission-scene footprint; not yet adopted. |
| media-guidance | [NASA images and media guidance](https://www.nasa.gov/nasa-brand-center/images-and-media/) | Preserve source-specific credit and third-party restrictions; do not imply NASA endorsement. |

## Figma interior imagery actually acquired

Official image bytes were downloaded for design authoring, visually inspected, then uploaded into image-fill slots. No supplied mislabeled image was automatically promoted to an authoritative source.

| Figma use | Asset / origin | Credit / evidence label |
| --- | --- | --- |
| Moon story + comparison | AS12-48-7134, NASA Science asset as12-48-7134_detail.jpg | NASA / historical photograph |
| Mars story | PIA16001, JPL official Download JPG (jpegPIA16001.jpg) | NASA/JPL-Caltech/University of Arizona / orbital observation |
| Pioneer story + mobile | Illustrated_Pioneer_10_at_Jupiter.jpeg from NASA Pioneer 10 page | NASA / artist’s concept; not a flight photograph |

Downloads are retained in the local design-review artifact folder, outside application assets. Production inclusion requires asset-manifest entries, optimized derivatives, alt text and preserved original credit. Do not reuse the supplied galaxy/shoreline/cleanroom mislabels as mission evidence.

## Cover art and reference treatment

The supplied three-book concept is the primary visual-language reference for linen binding, foil rules, volume colors and editorial hierarchy. Its spacecraft details are not authoritative. The new file uses original editable line illustrations, separate title/mission labels, cover structure and states. They are schematic reconstructions pending a final technical art check; they are not exact engineering drawings. No copied NASA logo appears in the UI.

GymMane is the exact visual/organizational reference file LMgJKHmRNWT1DKqe76byif. Its name does not establish native reusable structure. The new file supplies actual native components/variables/Auto Layout instead of claiming inherited library capability.

## Light-time derivation

Assumptions: stationary endpoints during the demonstration; vacuum propagation at c = 299,792.458 km/s; NASA’s rounded historical distance d = 12.23 × 10^9 km. This is an educational fixed-distance approximation, not a numerical reconstruction of the actual radio path.

t_oneway = d / c ≈ 40,794.89 s ≈ 11h19m55s → display **about 11h20m**.

t_roundtrip = 2d / c ≈ 81,589.78 s ≈ 22h39m50s → display **about 22h40m**.

A 12-second one-way demonstration uses t_oneway / 12 ≈ 3,399.57× time compression. Label it approximately 3,400× time; never imply changing the physical speed of radio waves.

Comparison assumptions: mean Earth–Moon distance 384,400 km gives approximately 1.28 s; 1 AU = 149,597,870.7 km gives approximately 499 s / 8m19s. These are reference-distance demonstrations, not dated positions on a common spatial map.

The round-trip demonstration excludes processing delays, Earth/spacecraft motion and hardware availability. It is **not evidence of a successful 2003 round-trip communication event**. The actual final faint signal contained no telemetry.

## EDL derivation

Take the post-landing atmospheric-entry time as T+0. Subtract it from the later JPL event times: parachute 259.2s; shield 278.9s; rover separation 412.9s; touchdown 431.6s. Earth touchdown reception minus touchdown occurrence = 828.1s / 13m48.1s.

Do not reuse rover-separation time for back-shell jettison. The exact sequence can include untimed back-shell separation and descent-stage flyaway, clearly distinguished from the five timed milestones.

## Terrain acceptance record

The previous STL/heightmap is **unverified geography**. Its generic STL metadata does not establish a location or coordinate system; gameplay depressions/pads/ripples are synthetic. The audited conversion technique can be reused. The source data cannot be called an authoritative Apollo or Gale surface without a new provenance record.

For each adopted terrain, record original product URL/ID, license/credit, acquisition date, checksum, raster resolution, coverage, projection/reference frame, vertical datum/units, nodata mask, crop, resampling, map orientation and exaggeration. Validate one transform and sampler against known points before rendering, camera and object placement use it.

This phase has investigated candidate sources only. No new DEM has been integrated.
