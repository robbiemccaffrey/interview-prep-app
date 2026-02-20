import { useEffect, useRef, useState } from 'react';

type PyodideStatus = 'idle' | 'loading' | 'ready' | 'error';

interface PyodideInstance {
  runPythonAsync: (code: string) => Promise<unknown>;
  loadPackagesFromImports: (code: string) => Promise<void>;
}

// Singleton — only one instance across the app
let pyodideInstance: PyodideInstance | null = null;
let loadingPromise: Promise<PyodideInstance> | null = null;

async function loadPyodide(): Promise<PyodideInstance> {
  if (pyodideInstance) return pyodideInstance;
  if (loadingPromise) return loadingPromise;

  loadingPromise = (async () => {
    // @ts-ignore — Pyodide loaded via CDN script
    const pyodide = await (window as any).loadPyodide({
      indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/',
    });
    pyodideInstance = pyodide;
    return pyodide;
  })();

  return loadingPromise;
}

export interface RunResult {
  stdout: string;
  stderr: string;
  error: string | null;
}

export function usePyodide() {
  const [status, setStatus] = useState<PyodideStatus>('idle');
  const pyRef = useRef<PyodideInstance | null>(null);

  useEffect(() => {
    setStatus('loading');

    // Inject Pyodide CDN script once
    if (!(window as any).loadPyodide) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js';
      script.onload = () => {
        loadPyodide()
          .then((py) => {
            pyRef.current = py;
            setStatus('ready');
          })
          .catch(() => setStatus('error'));
      };
      script.onerror = () => setStatus('error');
      document.head.appendChild(script);
    } else {
      loadPyodide()
        .then((py) => {
          pyRef.current = py;
          setStatus('ready');
        })
        .catch(() => setStatus('error'));
    }
  }, []);

  const runCode = async (code: string): Promise<RunResult> => {
    const py = pyRef.current;
    if (!py) {
      return { stdout: '', stderr: '', error: 'Pyodide not loaded yet.' };
    }

    // Capture stdout/stderr
    const captureCode = `
import sys
import io

_stdout_capture = io.StringIO()
_stderr_capture = io.StringIO()
_old_stdout = sys.stdout
_old_stderr = sys.stderr
sys.stdout = _stdout_capture
sys.stderr = _stderr_capture

_exec_error = None
try:
${code
  .split('\n')
  .map((line) => '    ' + line)
  .join('\n')}
except Exception as _e:
    _exec_error = str(_e)
finally:
    sys.stdout = _old_stdout
    sys.stderr = _old_stderr

(_stdout_capture.getvalue(), _stderr_capture.getvalue(), _exec_error)
`;

    try {
      const result = await py.runPythonAsync(captureCode);
      const [stdout, stderr, error] = result as [string, string, string | null];
      return { stdout, stderr, error };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      return { stdout: '', stderr: '', error: msg };
    }
  };

  return { status, runCode };
}
