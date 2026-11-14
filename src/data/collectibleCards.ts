import type { CardId, MissionId } from "../types/expedition";
export interface CollectibleDefinition {
  id: CardId;
  missionId: MissionId;
  title: string;
  classification: string;
  fact: string;
  explanation: string;
  source: string;
  sourceLabel: string;
  artwork: string;
  alt: string;
  accent: string;
}
export const COLLECTIBLE_CARDS: CollectibleDefinition[] = [
  {
    id: "surveyor-camera",
    missionId: "surveyor",
    title: "Recovered Camera",
    classification: "Returned hardware",
    fact: "Apollo 12 returned the camera so engineers could test the effects of about 2½ years on the Moon.",
    explanation:
      "The camera became evidence. Optical, electrical and mechanical tests helped engineers investigate how hardware had endured lunar exposure. Discoloration was linked to dust contamination and radiation damage. Most parts withstood the environment well; the report does not prove that equipment never degrades.",
    source: "https://ntrs.nasa.gov/citations/19710024418",
    sourceLabel: "NASA-CR-121796 · NTRS 19710024418",
    artwork: "/images/rewards/surveyor-camera-illustration.webp",
    alt: "Illustrated reconstruction of the cylindrical Surveyor 3 camera and scanning-mirror hood against a symbolic lunar landscape.",
    accent: "#b4bdb5",
  },
  {
    id: "curiosity-skycrane",
    missionId: "curiosity",
    title: "Sky-Crane Trailblazer",
    classification: "Landing system",
    fact: "Curiosity’s descent stage lowered the rover on tethers, then flew away after touchdown.",
    explanation:
      "The heat shield, parachute and powered descent stage each had a different job. Separating equipment allowed the rover to reach the surface ready for science. Orbital observations documented the rover and discarded hardware. This is an illustrated reconstruction, not a landing photograph.",
    source:
      "https://www.jpl.nasa.gov/images/pia14839-curiositys-sky-crane-maneuver-artists-concept/",
    sourceLabel: "NASA/JPL-Caltech · PIA14839",
    artwork: "/images/rewards/curiosity-sky-crane-illustration.webp",
    alt: "Illustrated reconstruction of Curiosity beneath its powered descent stage, suspended on tethers above Mars.",
    accent: "#e5a279",
  },
  {
    id: "pioneer-messenger",
    missionId: "pioneer",
    title: "Deep Space Messenger",
    classification: "Deep-space probe",
    fact: "Pioneer 10’s last faint signal reached Earth on 23 January 2003. It contained no telemetry.",
    explanation:
      "At a documented separation of about 12.23 billion kilometres, one-way light time was about 11 hours 20 minutes. Twice that delay describes a hypothetical fixed-distance round trip, not an actual successful exchange in 2003. Controllers must plan ahead.",
    source:
      "https://science.nasa.gov/missions/pioneer/pioneer-10-sends-last-signal/",
    sourceLabel: "NASA · Pioneer 10 Sends Last Signal",
    artwork: "/images/rewards/pioneer-10-illustration.webp",
    alt: "Illustrated reconstruction of Pioneer 10’s dish, equipment body and booms against symbolic deep space.",
    accent: "#b8c9e0",
  },
];
