import { useState } from 'react';
import { Link } from 'react-router-dom';
import { debugExercises, debugProjects, debugCategories, PROJECT_LABELS } from '../data/debugExercises';
import { useProgress } from '../hooks/useProgress';

const DIFFICULTY_ORDER = { easy: 0, medium: 1, hard: 2 };

const DIFFICULTY_COLORS = {
  easy: 'text-emerald-400 bg-emerald-900/30 border-emerald-800',
  medium: 'text-yellow-400 bg-yellow-900/30 border-yellow-800',
  hard: 'text-red-400 bg-red-900/30 border-red-800',
};

const LANGUAGE_COLORS = {
  typescript: 'text-blue-400 bg-blue-900/30 border-blue-800',
  python: 'text-yellow-400 bg-yellow-900/30 border-yellow-800',
};

export default function Debug() {
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [projectFilter, setProjectFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [languageFilter, setLanguageFilter] = useState<string>('all');
  const { completedProblems, isComplete } = useProgress();

  const filtered = debugExercises
    .filter((e) => difficultyFilter === 'all' || e.difficulty === difficultyFilter)
    .filter((e) => projectFilter === 'all' || e.project === projectFilter)
    .filter((e) => categoryFilter === 'all' || e.category === categoryFilter)
    .filter((e) => languageFilter === 'all' || e.language === languageFilter)
    .sort((a, b) => DIFFICULTY_ORDER[a.difficulty] - DIFFICULTY_ORDER[b.difficulty]);

  const completedDebug = completedProblems.filter((id) =>
    debugExercises.some((e) => e.id === id)
  );
  const pct = Math.round((completedDebug.length / debugExercises.length) * 100);

  // Group by project
  const grouped = new Map<string, typeof filtered>();
  for (const exercise of filtered) {
    const list = grouped.get(exercise.project) ?? [];
    list.push(exercise);
    grouped.set(exercise.project, list);
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Debug</h1>
        <p className="text-gray-400 mb-3">
          Debugging sessions are an increasingly common part of the software engineering interview
          process. Companies use them to evaluate how you navigate unfamiliar codebases, reason about
          unexpected behavior, and isolate root causes under time pressure — skills that are hard to
          assess with traditional algorithmic questions.
        </p>
        <p className="text-gray-400">
          Practice with {debugExercises.length} real-world bugs across TypeScript and Python. Each
          exercise drops you into a buggy codebase with a symptom description and failing tests. Find
          the bug, fix it, and run the tests to verify.
        </p>
      </div>

      {/* Progress bar */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-400">Debug Progress</span>
          <span className="text-sm font-mono text-emerald-400">
            {completedDebug.length} / {debugExercises.length} fixed
          </span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-2">
          <div
            className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="flex gap-4 mt-3 text-xs text-gray-500">
          {(['easy', 'medium', 'hard'] as const).map((d) => {
            const total = debugExercises.filter((e) => e.difficulty === d).length;
            const done = debugExercises.filter((e) => e.difficulty === d && isComplete(e.id)).length;
            return (
              <span key={d}>
                <span className={DIFFICULTY_COLORS[d].split(' ')[0]}>{d}</span>: {done}/{total}
              </span>
            );
          })}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="flex gap-1 bg-gray-900 border border-gray-800 rounded-lg p-1">
          {['all', 'easy', 'medium', 'hard'].map((d) => (
            <button
              key={d}
              onClick={() => setDifficultyFilter(d)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors capitalize ${
                difficultyFilter === d
                  ? 'bg-gray-700 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        <select
          value={projectFilter}
          onChange={(e) => setProjectFilter(e.target.value)}
          className="bg-gray-900 border border-gray-800 rounded-lg px-3 py-1.5 text-sm text-gray-300 focus:outline-none focus:border-emerald-500"
        >
          <option value="all">All Projects</option>
          {debugProjects.map((p) => (
            <option key={p} value={p}>
              {PROJECT_LABELS[p]}
            </option>
          ))}
        </select>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="bg-gray-900 border border-gray-800 rounded-lg px-3 py-1.5 text-sm text-gray-300 focus:outline-none focus:border-emerald-500"
        >
          <option value="all">All Categories</option>
          {debugCategories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <div className="flex gap-1 bg-gray-900 border border-gray-800 rounded-lg p-1">
          {['all', 'typescript', 'python'].map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguageFilter(lang)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors capitalize ${
                languageFilter === lang
                  ? 'bg-gray-700 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {lang === 'all' ? 'All' : lang === 'typescript' ? 'TS' : 'PY'}
            </button>
          ))}
        </div>
      </div>

      {/* Exercise list grouped by project */}
      <div className="space-y-8">
        {[...grouped.entries()].map(([project, exercises]) => (
          <div key={project}>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              {PROJECT_LABELS[project as keyof typeof PROJECT_LABELS] ?? project}
            </h2>
            <div className="space-y-2">
              {exercises.map((exercise) => {
                const done = isComplete(exercise.id);
                return (
                  <Link
                    key={exercise.id}
                    to={`/debug/${exercise.id}`}
                    className="flex items-center justify-between bg-gray-900 border border-gray-800 rounded-xl px-4 sm:px-5 py-3 sm:py-4 hover:border-emerald-500 transition-all group gap-3"
                  >
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          done
                            ? 'bg-emerald-500 border-emerald-500'
                            : 'border-gray-600 group-hover:border-emerald-600'
                        }`}
                      >
                        {done && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                      <div className="min-w-0">
                        <span className="text-white font-medium group-hover:text-emerald-400 transition-colors text-sm sm:text-base">
                          Bug {exercise.bugNumber}: {exercise.title}
                        </span>
                        <span className="text-gray-500 text-xs sm:text-sm ml-0 sm:ml-2 block sm:inline">
                          {exercise.category}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className={`text-[10px] font-medium px-2 py-0.5 rounded-full border uppercase ${
                          LANGUAGE_COLORS[exercise.language]
                        }`}
                      >
                        {exercise.language === 'typescript' ? 'TS' : 'PY'}
                      </span>
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full border capitalize ${
                          DIFFICULTY_COLORS[exercise.difficulty]
                        }`}
                      >
                        {exercise.difficulty}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No exercises match the selected filters.
        </div>
      )}
    </div>
  );
}
