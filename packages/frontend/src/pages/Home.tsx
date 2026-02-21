import { Link } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress';
import { problems } from '../data/problems';

export default function Home() {
  const { completedProblems } = useProgress();
  const pct = Math.round((completedProblems.length / problems.length) * 100);

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <div className="mb-8">
        <span className="text-6xl font-mono text-emerald-400">{'</>'}</span>
      </div>
      <h1 className="text-4xl font-bold text-white mb-4">SWE Interview Prep</h1>
      <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto">
        Master data structures, algorithms, and real-world coding problems. Run Python code
        directly in your browser.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <Link
          to="/learn"
          className="bg-gray-900 border border-gray-700 rounded-xl p-8 hover:border-emerald-500 transition-colors group"
        >
          <div className="text-3xl mb-4">📚</div>
          <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors">
            Learn
          </h2>
          <p className="text-gray-400 text-sm">
            10 topics — Hash Tables, Trees, Graphs, DP, and more. Complexity tables and annotated
            code examples.
          </p>
        </Link>

        <Link
          to="/practice"
          className="bg-gray-900 border border-gray-700 rounded-xl p-8 hover:border-emerald-500 transition-colors group"
        >
          <div className="text-3xl mb-4">⚡</div>
          <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors">
            DS&amp;A Practice
          </h2>
          <p className="text-gray-400 text-sm">
            {problems.filter((p) => p.category !== 'Real World').length} coding problems with a
            live Python runner. Easy, medium, and hard.
          </p>
        </Link>

        <Link
          to="/real-world"
          className="bg-gray-900 border border-gray-700 rounded-xl p-8 hover:border-amber-600 transition-colors group"
        >
          <div className="text-3xl mb-4">🏭</div>
          <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-amber-400 transition-colors">
            Real World
          </h2>
          <p className="text-gray-400 text-sm">
            Apply DS&amp;A to realistic engineering problems — event pipelines, rate limiters,
            workflow schedulers.
          </p>
        </Link>

        <Link
          to="/big-o"
          className="bg-gray-900 border border-gray-700 rounded-xl p-8 hover:border-purple-600 transition-colors group"
        >
          <div className="text-3xl mb-4">⏱</div>
          <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">
            Big O Quiz
          </h2>
          <p className="text-gray-400 text-sm">
            30 code examples — identify the time and space complexity. Instant right/wrong
            feedback with explanations.
          </p>
        </Link>
      </div>

      {completedProblems.length > 0 && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 max-w-md mx-auto">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-gray-400">Your Progress</span>
            <span className="text-sm font-mono text-emerald-400">
              {completedProblems.length} / {problems.length}
            </span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div
              className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">{pct}% complete</p>
        </div>
      )}

      <div className="mt-16 grid grid-cols-3 gap-8 text-center">
        {[
          { label: 'Topics', value: '10' },
          { label: 'Problems', value: String(problems.length) },
          { label: 'In-Browser Python', value: '✓' },
        ].map(({ label, value }) => (
          <div key={label}>
            <div className="text-2xl font-bold text-emerald-400 font-mono">{value}</div>
            <div className="text-sm text-gray-500 mt-1">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
