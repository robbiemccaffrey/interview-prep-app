import { Link } from 'react-router-dom';
import { realWorldProblems } from '../data/problems';
import { useProgress } from '../hooks/useProgress';

const DIFFICULTY_COLORS = {
  easy: 'text-emerald-400 bg-emerald-900/30 border-emerald-800',
  medium: 'text-yellow-400 bg-yellow-900/30 border-yellow-800',
  hard: 'text-red-400 bg-red-900/30 border-red-800',
};

const TAGS: Record<string, string[]> = {
  'event-log-analyzer': ['Data Processing', 'Hash Maps', 'Datetime'],
  'rate-limiter': ['System Design', 'Sliding Window', 'Concurrency'],
  'agent-workflow': ['Graphs', 'Topological Sort', 'DAG'],
};

export default function RealWorld() {
  const { completedProblems, isComplete } = useProgress();

  const completedRw = completedProblems.filter((id) =>
    realWorldProblems.some((p) => p.id === id)
  );
  const pct = Math.round((completedRw.length / realWorldProblems.length) * 100);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">🏭</span>
          <h1 className="text-3xl font-bold text-white">Real World Problems</h1>
        </div>
        <p className="text-gray-400 max-w-2xl">
          Apply your DS&amp;A skills to realistic engineering problems. These are open-ended
          challenges based on systems you'd actually build — event pipelines, rate limiters,
          workflow schedulers, and more.
        </p>
      </div>

      {/* What's different callout */}
      <div className="bg-amber-900/20 border border-amber-800/50 rounded-xl p-5 mb-8">
        <h2 className="text-amber-300 font-semibold mb-2 flex items-center gap-2">
          <span>⚡</span> How Real World Problems are Different
        </h2>
        <ul className="text-sm text-amber-200/80 space-y-1.5 list-none">
          <li>• Problems have multiple parts that build on each other</li>
          <li>• No single "right" algorithm — design decisions matter</li>
          <li>• Edge cases are intentionally left for you to discover</li>
          <li>• Focus on clean, production-quality Python code</li>
        </ul>
      </div>

      {/* Progress bar */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-400">Real World Progress</span>
          <span className="text-sm font-mono text-emerald-400">
            {completedRw.length} / {realWorldProblems.length} solved
          </span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-2">
          <div
            className="bg-amber-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Problem list */}
      <div className="space-y-4">
        {realWorldProblems.map((problem, i) => {
          const done = isComplete(problem.id);
          const tags = TAGS[problem.id] ?? [];
          return (
            <Link
              key={problem.id}
              to={`/practice/${problem.id}`}
              className="block bg-gray-900 border border-gray-800 rounded-xl px-6 py-5 hover:border-amber-600 transition-all group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  {/* Number + check */}
                  <div
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 text-sm font-mono ${
                      done
                        ? 'bg-emerald-500 border-emerald-500 text-white'
                        : 'border-gray-600 text-gray-500 group-hover:border-amber-600'
                    }`}
                  >
                    {done ? (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      i + 1
                    )}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg group-hover:text-amber-400 transition-colors">
                      {problem.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full border capitalize ${
                          DIFFICULTY_COLORS[problem.difficulty]
                        }`}
                      >
                        {problem.difficulty}
                      </span>
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2.5 py-1 rounded-full bg-gray-800 border border-gray-700 text-gray-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <span className="text-gray-600 group-hover:text-amber-600 transition-colors shrink-0 mt-1">
                  →
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Back link */}
      <div className="mt-10 pt-6 border-t border-gray-800">
        <Link to="/practice" className="text-sm text-gray-500 hover:text-emerald-400 transition-colors">
          ← Back to DS&amp;A Practice
        </Link>
      </div>
    </div>
  );
}
