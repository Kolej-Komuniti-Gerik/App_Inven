
export interface SubBlock {
  name: string;
  description: string;
  example: string;
}

export interface BlockInfo {
  id: string;
  name: string;
  category: string;
  description: string;
  color: string;
  example: string;
  subBlocks?: SubBlock[];
}

export interface InterfacePart {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface PaletteComponent {
  name: string;
  description: string;
  usage: string;
}

export interface QuizResult {
  id: string;
  studentName: string;
  score: number;
  total: number;
  category: 'designer' | 'blocks';
  date: string;
}

export type AppSection = 'home' | 'interface' | 'blocks' | 'quiz' | 'tutor' | 'tutorial' | 'leaderboard';
