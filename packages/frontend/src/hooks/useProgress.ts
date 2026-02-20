import { useState, useEffect, useCallback } from 'react';

interface Progress {
  completedProblems: string[];
  savedCode: Record<string, string>;
}

const STORAGE_KEY = 'interview-prep-progress';

function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  return { completedProblems: [], savedCode: {} };
}

function saveProgress(p: Progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  } catch {
    // ignore
  }
}

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(loadProgress);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const markComplete = useCallback((problemId: string) => {
    setProgress((prev) => {
      if (prev.completedProblems.includes(problemId)) return prev;
      return { ...prev, completedProblems: [...prev.completedProblems, problemId] };
    });
  }, []);

  const saveCode = useCallback((problemId: string, code: string) => {
    setProgress((prev) => ({
      ...prev,
      savedCode: { ...prev.savedCode, [problemId]: code },
    }));
  }, []);

  const isComplete = useCallback(
    (problemId: string) => progress.completedProblems.includes(problemId),
    [progress]
  );

  const getSavedCode = useCallback(
    (problemId: string) => progress.savedCode[problemId] ?? null,
    [progress]
  );

  return {
    completedProblems: progress.completedProblems,
    markComplete,
    saveCode,
    isComplete,
    getSavedCode,
  };
}
