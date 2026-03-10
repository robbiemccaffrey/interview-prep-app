import { Link } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress';
import { problems } from '../data/problems';
import { debugExercises } from '../data/debugExercises';
import { gotchas } from '../data/gotchas';
import SEO from '../components/SEO';

export default function Home() {
  const { completedProblems } = useProgress();
  const pct = Math.round((completedProblems.length / problems.length) * 100);

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <SEO
        title="Coding Interview Guide — Free DSA Practice & Learning"
        description="Free software engineering interview prep. Learn data structures & algorithms, practice 24 coding problems with a live Python runner, debug real-world bugs, and master Big O notation."
        path="/"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Coding Interview Guide',
          url: 'https://codinginterviewguide.com',
          description: 'Free software engineering interview prep with interactive coding problems, DSA learning, and debugging exercises.',
        }}
      />
      {/* Hero */}
      <div className="text-center mb-16">
        <div className="mb-8">
          <span className="text-6xl font-mono text-emerald-400">{'</>'}</span>
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">SWE Interview Prep</h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          A typical software engineering interview loop has a few distinct stages. This app is
          built around that structure so you can prepare for each one.
        </p>
      </div>

      {/* Stage 1 — Recruiter / Intro Call */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-800 text-sm font-bold text-gray-400 border border-gray-700">1</span>
          <h2 className="text-lg font-semibold text-white">The Recruiter Call</h2>
        </div>
        <p className="text-gray-400 text-sm ml-11 mb-4">
          The first stage is usually a 30-minute call with a recruiter. Be ready to walk through
          your resume, explain what you've worked on, why you're looking, and what you're interested
          in. Nothing technical — just clear, concise communication about your experience and
          motivation.
        </p>
      </div>

      {/* Stage 2 — Coding Challenge */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-900/50 text-sm font-bold text-emerald-400 border border-emerald-800">2</span>
          <h2 className="text-lg font-semibold text-white">The Coding Challenge</h2>
        </div>
        <p className="text-gray-400 text-sm ml-11 mb-5">
          Next is a technical round — either a take-home exercise or a live coding session. You'll
          be asked to solve algorithmic problems, implement data structures, or build a small
          feature. Understanding time and space complexity is essential.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-11">
          <Link
            to="/learn"
            className="bg-gray-900 border border-gray-700 rounded-xl p-6 hover:border-emerald-500 transition-colors group"
          >
            <div className="text-2xl mb-3">📚</div>
            <h3 className="text-base font-semibold text-white mb-1 group-hover:text-emerald-400 transition-colors">
              Learn
            </h3>
            <p className="text-gray-400 text-sm">
              10 topics — Hash Tables, Trees, Graphs, DP, and more. Complexity tables and annotated
              code examples.
            </p>
          </Link>

          <Link
            to="/practice"
            className="bg-gray-900 border border-gray-700 rounded-xl p-6 hover:border-emerald-500 transition-colors group"
          >
            <div className="text-2xl mb-3">⚡</div>
            <h3 className="text-base font-semibold text-white mb-1 group-hover:text-emerald-400 transition-colors">
              DS&amp;A Practice
            </h3>
            <p className="text-gray-400 text-sm">
              {problems.filter((p) => p.category !== 'Real World').length} coding problems with a
              live Python runner. Easy, medium, and hard.
            </p>
          </Link>

          <Link
            to="/real-world"
            className="bg-gray-900 border border-gray-700 rounded-xl p-6 hover:border-amber-600 transition-colors group"
          >
            <div className="text-2xl mb-3">🏭</div>
            <h3 className="text-base font-semibold text-white mb-1 group-hover:text-amber-400 transition-colors">
              Real World
            </h3>
            <p className="text-gray-400 text-sm">
              Apply DS&amp;A to realistic engineering problems — event pipelines, rate limiters,
              workflow schedulers.
            </p>
          </Link>

          <Link
            to="/big-o"
            className="bg-gray-900 border border-gray-700 rounded-xl p-6 hover:border-purple-600 transition-colors group"
          >
            <div className="text-2xl mb-3">⏱</div>
            <h3 className="text-base font-semibold text-white mb-1 group-hover:text-purple-400 transition-colors">
              Big O Quiz
            </h3>
            <p className="text-gray-400 text-sm">
              30 code examples — identify the time and space complexity. Instant feedback with
              explanations.
            </p>
          </Link>

          <Link
            to="/gotchas"
            className="bg-gray-900 border border-gray-700 rounded-xl p-6 hover:border-rose-600 transition-colors group"
          >
            <div className="text-2xl mb-3">🚩</div>
            <h3 className="text-base font-semibold text-white mb-1 group-hover:text-rose-400 transition-colors">
              Gotchas
            </h3>
            <p className="text-gray-400 text-sm">
              {gotchas.length} topics — the most common pitfalls in Python, TypeScript, and React
              that trip people up.
            </p>
          </Link>
        </div>
      </div>

      {/* Stage 3 — Debugging Session */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-900/50 text-sm font-bold text-orange-400 border border-orange-800">3</span>
          <h2 className="text-lg font-semibold text-white">The Debugging Session</h2>
        </div>
        <p className="text-gray-400 text-sm ml-11 mb-5">
          Increasingly common in interview loops, debugging rounds test how you navigate unfamiliar
          code, reason about unexpected behavior, and isolate root causes under pressure. You're
          dropped into a buggy codebase and asked to find and fix the problem.
        </p>
        <div className="ml-11">
          <Link
            to="/debug"
            className="bg-gray-900 border border-gray-700 rounded-xl p-6 hover:border-orange-600 transition-colors group block"
          >
            <div className="text-2xl mb-3">🐛</div>
            <h3 className="text-base font-semibold text-white mb-1 group-hover:text-orange-400 transition-colors">
              Debug
            </h3>
            <p className="text-gray-400 text-sm">
              {debugExercises.length} real-world bugs in TypeScript &amp; Python across 7 projects.
              Find the bug, fix it, run tests.
            </p>
          </Link>
        </div>
      </div>

      {/* Stage 4 — System Design */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-4">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-800 text-sm font-bold text-gray-400 border border-gray-700">4</span>
          <h2 className="text-lg font-semibold text-white">System Design</h2>
        </div>
        <p className="text-gray-400 text-sm ml-11 mb-5">
          For mid-level and senior roles, you'll face a system design round. You'll be asked to
          architect a system end-to-end — databases, APIs, caching, scaling. This section is coming
          soon. In the meantime, these are the two books worth reading:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-11">
          <a
            href="https://www.crackingthecodinginterview.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-900 border border-gray-700 rounded-xl p-6 hover:border-gray-500 transition-colors group"
          >
            <div className="text-2xl mb-3">📖</div>
            <h3 className="text-base font-semibold text-white mb-1 group-hover:text-gray-300 transition-colors">
              Cracking the Coding Interview
            </h3>
            <p className="text-gray-500 text-sm">
              Gayle Laakmann McDowell — the classic guide covering data structures, algorithms,
              and the interview process itself.
            </p>
          </a>

          <a
            href="https://dataintensive.net/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-900 border border-gray-700 rounded-xl p-6 hover:border-gray-500 transition-colors group"
          >
            <div className="text-2xl mb-3">📖</div>
            <h3 className="text-base font-semibold text-white mb-1 group-hover:text-gray-300 transition-colors">
              Designing Data-Intensive Applications
            </h3>
            <p className="text-gray-500 text-sm">
              Martin Kleppmann — the definitive guide to distributed systems, replication,
              partitioning, and the trade-offs behind real architectures.
            </p>
          </a>
        </div>
        <p className="text-gray-600 text-xs ml-11 mt-3 italic">
          Interactive system design exercises coming soon.
        </p>
      </div>

      {/* Progress */}
      {completedProblems.length > 0 && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 max-w-md mx-auto mb-12">
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

      {/* Stats */}
      <div className="grid grid-cols-4 gap-8 text-center">
        {[
          { label: 'Topics', value: '10' },
          { label: 'Problems', value: String(problems.length) },
          { label: 'Debug Exercises', value: String(debugExercises.length) },
          { label: 'In-Browser TS + PY', value: '✓' },
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
