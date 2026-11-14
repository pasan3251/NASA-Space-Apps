import type { MissionId } from "../types/expedition";

export interface BookDefinition {
  id: MissionId;
  volume: string;
  number: string;
  spacecraft: string;
  title: string;
  subtitle: string;
  cover: string;
  theme: string;
}
export const BOOKS: BookDefinition[] = [
  {
    id: "surveyor",
    volume: "Moon",
    number: "01",
    spacecraft: "Surveyor 3 / Apollo 12",
    title: "The camera that came back",
    subtitle: "Returned equipment",
    cover: "/images/covers/moon.svg",
    theme: "#454a48",
  },
  {
    id: "curiosity",
    volume: "Mars",
    number: "02",
    spacecraft: "Curiosity",
    title: "The journey to the surface",
    subtitle: "A landing in stages",
    cover: "/images/covers/mars.svg",
    theme: "#783d2c",
  },
  {
    id: "pioneer",
    volume: "Outer Space",
    number: "03",
    spacecraft: "Pioneer 10",
    title: "A message from humanity",
    subtitle: "A signal through space",
    cover: "/images/covers/outer-space.svg",
    theme: "#172b43",
  },
];
export const getBook = (id: MissionId) => BOOKS.find((book) => book.id === id)!;
