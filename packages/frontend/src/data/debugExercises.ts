// ---------------------------------------------------------------------------
// Debug Exercises — aggregated from per-project files
// ---------------------------------------------------------------------------

export type { DebugExercise, DebugFile, DebugTestFile, DebugProject } from './debug/types';
import type { DebugProject, DebugExercise } from './debug/types';

import { dispatchExercises } from './debug/dispatch';
import { supportAgentExercises } from './debug/support-agent';
import { courseCatalogExercises } from './debug/course-catalog';
import { expenseTrackerExercises } from './debug/expense-tracker';
import { reactFitnessExercises } from './debug/react-fitness';
import { issueTriageExercises } from './debug/issue-triage';
import { musicStreamerExercises } from './debug/music-streamer';

// ---------------------------------------------------------------------------
// Helper: all projects with display labels
// ---------------------------------------------------------------------------
export const PROJECT_LABELS: Record<DebugProject, string> = {
  dispatch: 'Dispatch (Webhooks)',
  'support-agent': 'Support Agent (AI)',
  'course-catalog': 'Course Catalog',
  'expense-tracker': 'Expense Tracker',
  'react-fitness': 'React Fitness',
  'issue-triage': 'Issue Triage',
  'music-streamer': 'Music Streamer',
};

// ---------------------------------------------------------------------------
// Combined exercise list
// ---------------------------------------------------------------------------
export const debugExercises: DebugExercise[] = [
  ...dispatchExercises,
  ...supportAgentExercises,
  ...courseCatalogExercises,
  ...expenseTrackerExercises,
  ...reactFitnessExercises,
  ...issueTriageExercises,
  ...musicStreamerExercises,
];

// ---------------------------------------------------------------------------
// Derived helpers
// ---------------------------------------------------------------------------
export const debugProjects = [...new Set(debugExercises.map((e) => e.project))];

export const debugCategories = [...new Set(debugExercises.map((e) => e.category))].sort();
