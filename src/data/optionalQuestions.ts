import type { LearningTask, MissionId } from "../types/expedition";
export const OPTIONAL_QUESTIONS: Record<MissionId, LearningTask> = {
  surveyor: {
    question:
      "Which record best supports an explanation of how the camera’s materials changed?",
    options: [
      "Laboratory tests of the returned hardware.",
      "An imagined painting of its future condition.",
      "The decorative completion seal.",
    ],
    correctIndex: 0,
    explanation:
      "Returned hardware can be measured and tested. A reconstruction helps explain form, but its painted wear is not evidence.",
  },
  curiosity: {
    question:
      "Why did the powered descent stage fly away after Curiosity touched down?",
    options: [
      "To return to Earth.",
      "To carry itself away from the rover after delivery.",
      "To bring back living microbes.",
    ],
    correctIndex: 1,
    explanation:
      "The descent stage had completed its delivery job. It flew away from the rover and impacted separately, leaving the laboratory ready for surface work.",
  },
  pioneer: {
    question:
      "What does a hypothetical 22h40m round trip at the 2003 distance describe?",
    options: [
      "Proof that Pioneer successfully replied in 2003.",
      "How long a controller waited for live video.",
      "Signal propagation in both directions at a fixed distance.",
    ],
    correctIndex: 2,
    explanation:
      "It doubles the one-way propagation delay. It excludes processing and moving endpoints, and does not establish a successful two-way communication event.",
  },
};
