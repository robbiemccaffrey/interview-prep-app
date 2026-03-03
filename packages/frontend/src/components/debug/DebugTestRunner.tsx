import { useState, useCallback } from 'react';
import { useTypeScript } from '../../hooks/useTypeScript';
import { usePyodide, RunResult } from '../../hooks/usePyodide';

interface Props {
  language: 'typescript' | 'python';
  getFiles: () => Record<string, string>;
  onResult: (result: RunResult) => void;
  onAllPassed: () => void;
}

export default function DebugTestRunner({ language, getFiles, onResult, onAllPassed }: Props) {
  const ts = useTypeScript();
  const py = usePyodide();
  const [isRunning, setIsRunning] = useState(false);

  const status = language === 'typescript' ? ts.status : py.status;
  const runtimeLabel = language === 'typescript' ? 'TypeScript' : 'Python';

  const handleRun = useCallback(async () => {
    if (status !== 'ready' || isRunning) return;

    setIsRunning(true);
    const files = getFiles();

    let result: RunResult;
    if (language === 'typescript') {
      result = await ts.runCode(files);
    } else {
      // For Python: concatenate all files (source + test) into one script
      const combined = Object.values(files).join('\n\n');
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
  }, [status, isRunning, language, getFiles, ts, py, onResult, onAllPassed]);

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleRun}
        disabled={status !== 'ready' || isRunning}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
          status === 'ready' && !isRunning
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

      {status === 'loading' && (
        <span className="text-xs text-gray-500 animate-pulse">Loading {runtimeLabel} runtime...</span>
      )}
      {status === 'error' && (
        <span className="text-xs text-red-400">Failed to load {runtimeLabel} runtime</span>
      )}
      {status === 'ready' && (
        <span className="text-xs text-gray-600">{runtimeLabel} ready</span>
      )}
    </div>
  );
}
