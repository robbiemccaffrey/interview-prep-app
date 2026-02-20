import { RunResult } from '../../hooks/usePyodide';

interface Props {
  result: RunResult | null;
  isRunning: boolean;
}

export default function TestResults({ result, isRunning }: Props) {
  if (isRunning) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-gray-400 text-sm">Running tests...</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center text-gray-600">
          <p className="text-4xl mb-3">▶</p>
          <p className="text-sm">Click "Run Tests" to execute your code</p>
        </div>
      </div>
    );
  }

  const lines = result.stdout.split('\n').filter((l) => l.trim());
  const passCount = lines.filter((l) => l.startsWith('[PASS]')).length;
  const failCount = lines.filter((l) => l.startsWith('[FAIL]')).length;
  const hasError = !!result.error;

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Summary bar */}
      {!hasError && (passCount > 0 || failCount > 0) && (
        <div
          className={`px-4 py-2 text-sm font-medium border-b ${
            failCount === 0
              ? 'bg-emerald-900/30 border-emerald-800 text-emerald-400'
              : 'bg-red-900/30 border-red-800 text-red-400'
          }`}
        >
          {failCount === 0
            ? `All ${passCount} tests passed`
            : `${failCount} failed, ${passCount} passed`}
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4 font-mono text-xs space-y-1">
        {hasError && (
          <div className="bg-red-900/20 border border-red-800 rounded-lg p-3 mb-3">
            <p className="text-red-400 font-semibold mb-1">Error</p>
            <pre className="text-red-300 whitespace-pre-wrap">{result.error}</pre>
          </div>
        )}

        {lines.map((line, i) => {
          const isPass = line.startsWith('[PASS]');
          const isFail = line.startsWith('[FAIL]');
          const isInfo = line.startsWith('[INFO]') || line.startsWith('Running') || line.startsWith('===');

          return (
            <div
              key={i}
              className={`px-2 py-0.5 rounded ${
                isPass
                  ? 'text-emerald-400'
                  : isFail
                  ? 'text-red-400 bg-red-900/10'
                  : isInfo
                  ? 'text-blue-400'
                  : 'text-gray-300'
              }`}
            >
              {line}
            </div>
          );
        })}

        {result.stderr && (
          <div className="mt-2 text-yellow-500 text-xs">
            <p className="font-semibold mb-1">stderr:</p>
            <pre className="whitespace-pre-wrap">{result.stderr}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
