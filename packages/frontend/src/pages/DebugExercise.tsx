import { useParams, Link } from 'react-router-dom';
import { useState, useCallback, useEffect, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import { debugExercises } from '../data/debugExercises';
import { useProgress } from '../hooks/useProgress';
import { RunResult } from '../hooks/usePyodide';
import MultiFileEditor, { EditorFile } from '../components/debug/MultiFileEditor';
import DebugTestRunner from '../components/debug/DebugTestRunner';
import TestResults from '../components/practice/TestResults';
import SEO from '../components/SEO';
import 'highlight.js/styles/github-dark.css';

const DIFFICULTY_COLORS = {
  easy: 'text-emerald-400 bg-emerald-900/30 border-emerald-800',
  medium: 'text-yellow-400 bg-yellow-900/30 border-yellow-800',
  hard: 'text-red-400 bg-red-900/30 border-red-800',
};

export default function DebugExercise() {
  const { exerciseId } = useParams<{ exerciseId: string }>();
  const exercise = debugExercises.find((e) => e.id === exerciseId);
  const { isComplete, markComplete, saveDebugCode, getSavedDebugCode } = useProgress();

  // File states
  const [editableCode, setEditableCode] = useState<Record<string, string>>({});
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const [testResult, setTestResult] = useState<RunResult | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  const [openHint, setOpenHint] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'description' | 'editor' | 'tests'>('editor');

  // Initialize editable code from saved or buggy defaults
  useEffect(() => {
    if (!exercise) return;
    const saved = getSavedDebugCode(exercise.id);
    if (saved) {
      setEditableCode(saved);
    } else {
      const initial: Record<string, string> = {};
      for (const f of exercise.files) {
        initial[f.filename] = f.buggyCode;
      }
      setEditableCode(initial);
    }
    setTestResult(null);
    setShowSolution(false);
    setOpenHint(null);
    setActiveFileIndex(0);
  }, [exerciseId]); // eslint-disable-line react-hooks/exhaustive-deps

  // Build the file list for the editor (editable + read-only test files)
  const editorFiles: EditorFile[] = useMemo(() => {
    if (!exercise) return [];
    const files: EditorFile[] = [];

    // Editable source files
    for (const f of exercise.files) {
      files.push({
        filename: f.filename,
        code: editableCode[f.filename] ?? f.buggyCode,
        language: f.language,
        readOnly: false,
      });
    }

    // Read-only test files
    for (const t of exercise.testFiles) {
      files.push({
        filename: t.filename,
        code: t.code,
        language: t.language,
        readOnly: true,
      });
    }

    return files;
  }, [exercise, editableCode]);

  const handleCodeChange = useCallback(
    (filename: string, code: string) => {
      setEditableCode((prev) => {
        const updated = { ...prev, [filename]: code };
        if (exercise) saveDebugCode(exercise.id, updated);
        return updated;
      });
    },
    [exercise, saveDebugCode]
  );

  const handleAllPassed = useCallback(() => {
    if (exercise) markComplete(exercise.id);
  }, [exercise, markComplete]);

  const handleReset = useCallback(() => {
    if (!exercise) return;
    const initial: Record<string, string> = {};
    for (const f of exercise.files) {
      initial[f.filename] = f.buggyCode;
    }
    setEditableCode(initial);
    if (exercise) saveDebugCode(exercise.id, initial);
  }, [exercise, saveDebugCode]);

  // Build the files map for the test runner (source + test files merged)
  const getFilesForRunner = useCallback(() => {
    if (!exercise) return {};
    const files: Record<string, string> = {};
    for (const f of exercise.files) {
      files[f.filename] = editableCode[f.filename] ?? f.buggyCode;
    }
    for (const t of exercise.testFiles) {
      files[t.filename] = t.code;
    }
    return files;
  }, [exercise, editableCode]);

  if (!exercise) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10 text-center">
        <p className="text-gray-400">Exercise not found.</p>
        <Link to="/debug" className="text-emerald-400 hover:underline mt-4 inline-block">
          Back to Debug
        </Link>
      </div>
    );
  }

  const done = isComplete(exercise.id);

  return (
    <div className="h-[calc(100vh-3.5rem)] flex flex-col">
      <SEO
        title={`${exercise.title} — Debug`}
        description={`Debug exercise: ${exercise.symptom} Find and fix the bug in this ${exercise.difficulty} ${exercise.language} exercise.`}
        path={`/debug/${exercise.id}`}
      />

      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-800 bg-gray-950 shrink-0 min-w-0">
        <div className="flex items-center gap-2 md:gap-3 min-w-0">
          <Link
            to="/debug"
            className="text-gray-400 hover:text-white transition-colors text-sm shrink-0"
          >
            ←<span className="hidden sm:inline"> Debug</span>
          </Link>
          <span className="text-gray-700 shrink-0">/</span>
          <span className="text-white font-medium text-sm truncate">
            Bug {exercise.bugNumber}: {exercise.title}
          </span>
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full border capitalize shrink-0 ${
              DIFFICULTY_COLORS[exercise.difficulty]
            }`}
          >
            {exercise.difficulty}
          </span>
          <span className="text-xs text-gray-500 hidden md:inline shrink-0">
            {exercise.projectLabel}
          </span>
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
            <span className="hidden sm:inline">Fixed</span>
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
            {tab === 'description' ? 'Bug Report' : tab === 'editor' ? 'Code' : 'Tests'}
          </button>
        ))}
      </div>

      {/* 3-pane layout */}
      <div className="flex-1 overflow-hidden min-h-0 relative md:flex md:flex-row">
        {/* Left pane — Bug description */}
        <div
          className={`${
            activeTab === 'description' ? 'absolute inset-0 flex' : 'hidden'
          } md:static md:flex md:w-[340px] md:shrink-0 flex-col md:border-r border-gray-800 overflow-y-auto bg-gray-950`}
        >
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
              {exercise.symptom}
            </ReactMarkdown>

            {/* Context (logs, diagrams) */}
            {exercise.context && (
              <div className="mt-6">
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
                  {exercise.context}
                </ReactMarkdown>
              </div>
            )}

            {/* Hints */}
            {exercise.hints.length > 0 && (
              <div className="mt-6">
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-2">
                  Hints
                </p>
                <div className="space-y-2">
                  {exercise.hints.map((hint, i) => (
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

        {/* Middle pane — Multi-file Editor */}
        <div
          className={`${
            activeTab === 'editor' ? 'absolute inset-0 flex' : 'hidden'
          } md:static md:flex md:flex-1 flex-col overflow-hidden md:border-r border-gray-800`}
        >
          <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800 bg-gray-900 shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              <span className="text-xs text-gray-500 ml-2 font-mono">
                {exercise.language === 'typescript' ? 'TypeScript' : 'Python'}
              </span>
            </div>
            <button
              onClick={handleReset}
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
            >
              Reset
            </button>
          </div>

          <div className="flex-1 overflow-hidden">
            <MultiFileEditor
              files={editorFiles}
              activeFileIndex={activeFileIndex}
              onActiveFileChange={setActiveFileIndex}
              onCodeChange={handleCodeChange}
            />
          </div>

          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-800 bg-gray-900 shrink-0">
            <DebugTestRunner
              language={exercise.language}
              getFiles={getFilesForRunner}
              onResult={(result) => {
                setTestResult(result);
                if (window.innerWidth < 768) setActiveTab('tests');
              }}
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
              <ReactMarkdown
                className="prose-dark text-xs"
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
                {exercise.solutionExplanation}
              </ReactMarkdown>
            </div>
          )}
        </div>

        {/* Right pane — Test output */}
        <div
          className={`${
            activeTab === 'tests' ? 'absolute inset-0 flex' : 'hidden'
          } md:static md:flex md:w-[320px] md:shrink-0 flex-col bg-gray-950`}
        >
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
