import { useState } from 'react';
import { Link } from 'react-router-dom';
import { dsaProblems, dsaCategories } from '../data/problems';
import { useProgress } from '../hooks/useProgress';

const DIFFICULTY_ORDER = { easy: 0, medium: 1, hard: 2 };

const DIFFICULTY_COLORS = {
  easy: 'text-emerald-400 bg-emerald-900/30 border-emerald-800',
  medium: 'text-yellow-400 bg-yellow-900/30 border-yellow-800',
  hard: 'text-red-400 bg-red-900/30 border-red-800',
};

export default function Practice() {
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const { completedProblems, isComplete } = useProgress();

  const filtered = dsaProblems
    .filter((p) => difficultyFilter === 'all' || p.difficulty === difficultyFilter)
    .filter((p) => categoryFilter === 'all' || p.category === categoryFilter)
    .sort((a, b) => DIFFICULTY_ORDER[a.difficulty] - DIFFICULTY_ORDER[b.difficulty]);

  const completedDsa = completedProblems.filter((id) =>
    dsaProblems.some((p) => p.id === id)
  );
  const pct = Math.round((completedDsa.length / dsaProblems.length) * 100);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Practice</h1>
        <p className="text-gray-400">
          {dsaProblems.length} DS&amp;A problems with a live Python code runner. For real-world
          system design problems,{' '}
          <Link to="/real-world" className="text-emerald-400 hover:underline">
            see Real World
          </Link>
          .
        </p>
      </div>

      {/* Progress bar */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-400">DS&amp;A Progress</span>
          <span className="text-sm font-mono text-emerald-400">
            {completedDsa.length} / {dsaProblems.length} solved
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
            const total = dsaProblems.filter((p) => p.difficulty === d).length;
            const done = dsaProblems.filter((p) => p.difficulty === d && isComplete(p.id)).length;
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
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="bg-gray-900 border border-gray-800 rounded-lg px-3 py-1.5 text-sm text-gray-300 focus:outline-none focus:border-emerald-500"
        >
          <option value="all">All Categories</option>
          {dsaCategories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Problem list */}
      <div className="space-y-2">
        {filtered.map((problem) => {
          const done = isComplete(problem.id);
          return (
            <Link
              key={problem.id}
              to={`/practice/${problem.id}`}
              className="flex items-center justify-between bg-gray-900 border border-gray-800 rounded-xl px-5 py-4 hover:border-emerald-500 transition-all group"
            >
              <div className="flex items-center gap-4">
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
                <div>
                  <span className="text-white font-medium group-hover:text-emerald-400 transition-colors">
                    {problem.title}
                  </span>
                  <span className="text-gray-500 text-sm ml-2">{problem.category}</span>
                </div>
              </div>
              <span
                className={`text-xs font-medium px-2.5 py-1 rounded-full border capitalize ${
                  DIFFICULTY_COLORS[problem.difficulty]
                }`}
              >
                {problem.difficulty}
              </span>
            </Link>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No problems match the selected filters.
        </div>
      )}
    </div>
  );
}
