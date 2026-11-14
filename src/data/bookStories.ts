import type { MissionId } from "../types/expedition";
export const STORY_MEDIA: Record<
  MissionId,
  { src: string; alt: string; caption: string; source: string }
> = {
  surveyor: {
    src: "/images/history/apollo12.webp",
    alt: "Apollo 12 astronaut beside the Surveyor 3 lander on the lunar surface.",
    caption:
      "Historical photograph · AS12-48-7134 / NASA. The photograph documents the visit; laboratory tests document material changes.",
    source: "https://science.nasa.gov/resource/apollo-12-and-surveyor-3/",
  },
  curiosity: {
    src: "/images/history/curiosity-hardware.webp",
    alt: "MRO HiRISE orbital image locating Curiosity and discarded landing hardware.",
    caption:
      "Orbital observation · PIA16001 / NASA/JPL-Caltech/University of Arizona. Taken after landing, not during the descent.",
    source:
      "https://www.jpl.nasa.gov/images/pia16001-scene-of-a-martian-landing/",
  },
  pioneer: {
    src: "/images/history/pioneer-concept.webp",
    alt: "NASA artist’s concept of Pioneer 10 near Jupiter.",
    caption:
      "Artist’s concept / NASA. Not a spacecraft photograph or its position in 2003.",
    source: "https://science.nasa.gov/mission/pioneer-10/",
  },
};
export const EDL_EVENTS = [
  {
    title: "Atmospheric entry",
    time: "05:10:45.7 UTC · T+0",
    equipment: "Heat shield",
    purpose: "Protect the rover from intense entry heating.",
    fate: "The heat shield separates later, once its protective job is done.",
  },
  {
    title: "Parachute deployment",
    time: "05:15:04.9 UTC · T+4m19.2s",
    equipment: "Supersonic parachute",
    purpose: "Use the atmosphere to slow the descending spacecraft.",
    fate: "The back shell and parachute are later discarded before powered descent.",
  },
  {
    title: "Heat-shield separation",
    time: "05:15:24.6 UTC · T+4m38.9s",
    equipment: "Heat shield",
    purpose:
      "Clear the view for landing sensors after protection is no longer needed.",
    fate: "The shield falls separately to the surface.",
  },
  {
    title: "Back shell separates",
    time: "Ordered stage · exact time not specified here",
    equipment: "Back shell and parachute",
    purpose:
      "Release the powered descent stage and rover for controlled descent.",
    fate: "The back shell and attached parachute land separately. This is not rover separation.",
  },
  {
    title: "Rover separation",
    time: "05:17:38.6 UTC · T+6m52.9s",
    equipment: "Descent stage and tethers",
    purpose: "Lower the rover below the powered descent stage on tethers.",
    fate: "The stage continues controlling descent while the rover approaches the ground.",
  },
  {
    title: "Touchdown",
    time: "05:17:57.3 UTC · T+7m11.6s",
    equipment: "Curiosity rover",
    purpose:
      "Place the laboratory on its wheels, ready for surface operations.",
    fate: "Tethers are cut; the powered descent stage flies away and impacts separately.",
  },
];
