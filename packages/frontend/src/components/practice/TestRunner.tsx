import { useState, useCallback } from 'react';
import { usePyodide, RunResult } from '../../hooks/usePyodide';
import { useTypeScript } from '../../hooks/useTypeScript';

interface Props {
  getCode: () => string;
  testCode: string;
  onResult: (result: RunResult) => void;
  onAllPassed: () => void;
  language?: 'python' | 'typescript';
}

export default function TestRunner({ getCode, testCode, onResult, onAllPassed, language = 'python' }: Props) {
  const py = usePyodide();
  const ts = useTypeScript();
  const [isRunning, setIsRunning] = useState(false);

  const runtime = language === 'typescript' ? ts : py;

  const handleRun = useCallback(async () => {
    if (runtime.status !== 'ready' || isRunning) return;

    setIsRunning(true);

    let result: RunResult;
    if (language === 'typescript') {
      const userCode = getCode();
      result = await ts.runCode({
        'solution.ts': userCode,
        'solution.test.ts': testCode,
      });
    } else {
      const userCode = getCode();
      const combined = userCode + '\n\n' + testCode;
      result = await py.runCode(combined);
    }

    onResult(result);

    // Check if all tests passed
    if (!result.error && result.stdout) {
      const lines = result.stdout.split('\n');
      const hasFail = lines.some((l) => l.startsWith('[FAIL]'));
      const hasPass = lines.some((l) => l.startsWith('[PASS]'));
      if (hasPass && !hasFail) {
        onAllPassed();
      }
    }

    setIsRunning(false);
  }, [runtime.status, isRunning, getCode, testCode, language, ts, py, onResult, onAllPassed]);

  const runtimeLabel = language === 'typescript' ? 'TypeScript' : 'Python';

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleRun}
        disabled={runtime.status !== 'ready' || isRunning}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
          runtime.status === 'ready' && !isRunning
            ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
            : 'bg-gray-700 text-gray-400 cursor-not-allowed'
        }`}
      >
        {isRunning ? (
          <>
            <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Running...
          </>
        ) : (
          <>
            <span>▶</span>
            Run Tests
          </>
        )}
      </button>

      {runtime.status === 'loading' && (
        <span className="text-xs text-gray-500 animate-pulse">Loading {runtimeLabel} runtime...</span>
      )}
      {runtime.status === 'error' && (
        <span className="text-xs text-red-400">Failed to load {runtimeLabel} runtime</span>
      )}
      {runtime.status === 'ready' && (
        <span className="text-xs text-gray-600">{runtimeLabel} ready</span>
      )}
    </div>
  );
}
