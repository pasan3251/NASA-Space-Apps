export type MissionId = 'surveyor' | 'curiosity' | 'pioneer';
export type EvidenceKind = 'Historical record' | 'Reconstruction' | 'Fictional expedition';

export interface MissionSource {
  id: string;
  title: string;
  url: string;
  credit: string;
}

export interface Discovery {
  id: string;
  title: string;
  component: string;
  position: [number, number, number];
  summary: string;
  story: string;
  science: string;
  engineering: string;
  status: string;
  evidence: EvidenceKind;
  sourceIds: string[];
}

export interface LearningTask {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ExpeditionMission {
  id: MissionId;
  chapter: number;
  destination: string;
  name: string;
  title: string;
  subtitle: string;
  question: string;
  introduction: string;
  arrival: string;
  legacy: string;
  dateLabel: string;
  statusLabel: string;
  accent: string;
  coordinatesLabel: string;
  sceneNote: string;
  discoveries: Discovery[];
  task: LearningTask;
  sources: MissionSource[];
}

export interface MissionProgress {
  discovered: string[];
  completed: boolean;
}

export type ExpeditionProgress = Record<MissionId, MissionProgress>;

export interface MissionWorldProps {
  mission: ExpeditionMission;
  selectedId: string | null;
  discoveredIds: string[];
  onSelect: (id: string) => void;
}
