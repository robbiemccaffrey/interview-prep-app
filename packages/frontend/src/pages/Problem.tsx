import { useParams, Link } from 'react-router-dom';
import { useRef, useState, useCallback, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import { problems } from '../data/problems';
import { useProgress } from '../hooks/useProgress';
import { RunResult } from '../hooks/usePyodide';
import CodeEditor from '../components/practice/CodeEditor';
import TestRunner from '../components/practice/TestRunner';
import TestResults from '../components/practice/TestResults';
import 'highlight.js/styles/github-dark.css';

const DIFFICULTY_COLORS = {
  easy: 'text-emerald-400 bg-emerald-900/30 border-emerald-800',
  medium: 'text-yellow-400 bg-yellow-900/30 border-yellow-800',
  hard: 'text-red-400 bg-red-900/30 border-red-800',
};

export default function Problem() {
  const { problemId } = useParams<{ problemId: string }>();
  const problem = problems.find((p) => p.id === problemId);
  const { isComplete, markComplete, saveCode, getSavedCode } = useProgress();

  const [code, setCode] = useState('');
  const [testResult, setTestResult] = useState<RunResult | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  const [openHint, setOpenHint] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'description' | 'editor' | 'tests'>('editor');
  const getCodeRef = useRef<(() => string) | null>(null);

  useEffect(() => {
    if (!problem) return;
    const saved = getSavedCode(problem.id);
    setCode(saved ?? problem.starterCode);
    setTestResult(null);
    setShowSolution(false);
    setOpenHint(null);
  }, [problemId]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleCodeChange = useCallback(
    (val: string) => {
      setCode(val);
      if (problem) saveCode(problem.id, val);
    },
    [problem, saveCode]
  );

  const handleAllPassed = useCallback(() => {
    if (problem) markComplete(problem.id);
  }, [problem, markComplete]);

  if (!problem) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10 text-center">
        <p className="text-gray-400">Problem not found.</p>
        <Link to="/practice" className="text-emerald-400 hover:underline mt-4 inline-block">
          Back to Practice
        </Link>
      </div>
    );
  }

  const done = isComplete(problem.id);

  return (
    <div className="h-[calc(100vh-3.5rem)] flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-800 bg-gray-950 shrink-0 min-w-0">
        <div className="flex items-center gap-2 md:gap-3 min-w-0">
          <Link
            to="/practice"
            className="text-gray-400 hover:text-white transition-colors text-sm shrink-0"
          >
            ←<span className="hidden sm:inline"> Practice</span>
          </Link>
          <span className="text-gray-700 shrink-0">/</span>
          <span className="text-white font-medium text-sm truncate">{problem.title}</span>
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full border capitalize shrink-0 ${
              DIFFICULTY_COLORS[problem.difficulty]
            }`}
          >
            {problem.difficulty}
          </span>
          <span className="text-xs text-gray-500 hidden md:inline shrink-0">{problem.category}</span>
        </div>
        {done && (
          <div className="flex items-center gap-1.5 text-emerald-400 text-sm shrink-0 ml-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="hidden sm:inline">Solved</span>
          </div>
        )}
      </div>

      {/* Mobile tab bar */}
      <div className="flex md:hidden border-b border-gray-800 bg-gray-900 shrink-0">
        {(['description', 'editor', 'tests'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 px-3 py-2.5 text-sm font-medium transition-colors ${
              activeTab === tab
                ? 'text-emerald-400 border-b-2 border-emerald-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab === 'description' ? 'Problem' : tab === 'editor' ? 'Code' : 'Tests'}
          </button>
        ))}
      </div>

      {/* 3-pane layout (desktop) / tabbed layout (mobile) */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left pane — Problem description */}
        <div className={`${activeTab === 'description' ? 'flex' : 'hidden'} md:flex md:w-[340px] md:shrink-0 flex-col md:border-r border-gray-800 overflow-y-auto bg-gray-950`}>
          <div className="p-5 flex-1">
            <ReactMarkdown
              className="prose-dark text-sm"
              rehypePlugins={[rehypeHighlight]}
              components={{
                code: ({ className, children, ...props }) => {
                  const isInline = !className;
                  if (isInline) {
                    return (
                      <code
                        className="bg-gray-800 text-emerald-400 px-1 py-0.5 rounded text-xs font-mono"
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  }
                  return (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {problem.description}
            </ReactMarkdown>

            {/* Hints */}
            {problem.hints.length > 0 && (
              <div className="mt-6">
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-2">
                  Hints
                </p>
                <div className="space-y-2">
                  {problem.hints.map((hint, i) => (
                    <div key={i} className="border border-gray-800 rounded-lg overflow-hidden">
                      <button
                        onClick={() => setOpenHint(openHint === i ? null : i)}
                        className="w-full flex items-center justify-between px-3 py-2 text-xs text-gray-400 hover:text-white transition-colors"
                      >
                        <span>Hint {i + 1}</span>
                        <span>{openHint === i ? '▲' : '▼'}</span>
                      </button>
                      {openHint === i && (
                        <div className="px-3 pb-3 text-xs text-gray-300 border-t border-gray-800 pt-2">
                          {hint}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Middle pane — Editor */}
        <div className={`${activeTab === 'editor' ? 'flex' : 'hidden'} md:flex md:flex-1 flex-col overflow-hidden md:border-r border-gray-800`}>
          <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800 bg-gray-900 shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              <span className="text-xs text-gray-500 ml-2 font-mono">solution.py</span>
            </div>
            <button
              onClick={() => handleCodeChange(problem.starterCode)}
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
            >
              Reset
            </button>
          </div>

          <div className="flex-1 overflow-hidden">
            <CodeEditor
              value={code}
              onChange={handleCodeChange}
              onEditorMount={(getCode) => {
                getCodeRef.current = getCode;
              }}
            />
          </div>

          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-800 bg-gray-900 shrink-0">
            <TestRunner
              getCode={() => getCodeRef.current?.() ?? code}
              testCode={problem.testCode}
              onResult={setTestResult}
              onAllPassed={handleAllPassed}
            />

            <button
              onClick={() => setShowSolution(!showSolution)}
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
            >
              {showSolution ? 'Hide Solution' : 'Show Solution'}
            </button>
          </div>

          {showSolution && (
            <div className="border-t border-gray-800 bg-gray-950 p-4 max-h-64 overflow-y-auto">
              <p className="text-xs text-yellow-500 mb-2 font-semibold">Solution</p>
              <pre className="text-xs font-mono text-gray-300 whitespace-pre-wrap">
                {problem.solution}
              </pre>
            </div>
          )}
        </div>

        {/* Right pane — Test output */}
        <div className={`${activeTab === 'tests' ? 'flex' : 'hidden'} md:flex md:w-[320px] md:shrink-0 flex-col bg-gray-950`}>
          <div className="px-4 py-2 border-b border-gray-800 bg-gray-900 shrink-0">
            <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
              Test Output
            </span>
          </div>
          <div className="flex-1 overflow-hidden">
            <TestResults result={testResult} isRunning={false} />
          </div>
        </div>
      </div>
    </div>
  );
}
