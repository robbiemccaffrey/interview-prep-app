// ---------------------------------------------------------------------------
// Debug Exercise shared types
// ---------------------------------------------------------------------------

export type DebugProject =
  | 'dispatch'
  | 'support-agent'
  | 'course-catalog'
  | 'expense-tracker'
  | 'react-fitness'
  | 'issue-triage'
  | 'music-streamer';

export interface DebugFile {
  filename: string;
  language: 'typescript' | 'python';
  buggyCode: string;
  solutionCode: string;
}

export interface DebugTestFile {
  filename: string;
  language: 'typescript' | 'python';
  code: string;
}

export interface DebugExercise {
  id: string;
  project: DebugProject;
  projectLabel: string;
  bugNumber: number | string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  language: 'typescript' | 'python';
  symptom: string;
  context?: string;
  hints: string[];
  files: DebugFile[];
  testFiles: DebugTestFile[];
  solutionExplanation: string;
}
