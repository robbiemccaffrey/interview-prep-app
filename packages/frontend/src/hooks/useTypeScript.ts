import { useEffect, useRef, useState } from 'react';

type TypeScriptStatus = 'idle' | 'loading' | 'ready' | 'error';

export interface RunResult {
  stdout: string;
  stderr: string;
  error: string | null;
}

interface TSCompiler {
  transpileModule: (
    input: string,
    options: {
      compilerOptions: Record<string, unknown>;
      reportDiagnostics?: boolean;
    }
  ) => { outputText: string; diagnostics?: unknown[] };
}

// Singleton — only one TS compiler instance across the app
let tsCompiler: TSCompiler | null = null;
let loadingPromise: Promise<TSCompiler> | null = null;

async function loadTypeScript(): Promise<TSCompiler> {
  if (tsCompiler) return tsCompiler;
  if (loadingPromise) return loadingPromise;

  loadingPromise = (async () => {
    const ts = (window as unknown as Record<string, unknown>).ts as TSCompiler;
    tsCompiler = ts;
    return ts;
  })();

  return loadingPromise;
}

// Vitest-compatible assertion shim that outputs [PASS]/[FAIL] lines
const VITEST_SHIM = `
var __testResults = [];
var __currentDescribe = '';

function describe(name, fn) {
  var prev = __currentDescribe;
  __currentDescribe = __currentDescribe ? __currentDescribe + ' > ' + name : name;
  fn();
  __currentDescribe = prev;
}

function it(name, fn) {
  var fullName = __currentDescribe ? __currentDescribe + ' > ' + name : name;
  try {
    fn();
    __testResults.push('[PASS] ' + fullName);
  } catch (e) {
    __testResults.push('[FAIL] ' + fullName + ' — ' + (e && e.message ? e.message : String(e)));
  }
}

var test = it;

function beforeEach(fn) { /* stored but applied per-describe in simplified shim */ }
function afterEach(fn) { /* stored but applied per-describe in simplified shim */ }

var vi = {
  fn: function(impl) {
    var mock = function() {
      mock.calls.push(Array.prototype.slice.call(arguments));
      mock.callCount++;
      if (impl) return impl.apply(null, arguments);
      return undefined;
    };
    mock.calls = [];
    mock.callCount = 0;
    mock.mockReturnValue = function(val) {
      impl = function() { return val; };
      return mock;
    };
    mock.mockImplementation = function(fn) {
      impl = fn;
      return mock;
    };
    mock.mockClear = function() {
      mock.calls = [];
      mock.callCount = 0;
    };
    return mock;
  },
  spyOn: function() { return vi.fn(); },
  useFakeTimers: function() {},
  useRealTimers: function() {},
  advanceTimersByTime: function() {},
};

function expect(actual) {
  function deepEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return a === b;
    if (typeof a !== typeof b) return false;
    if (typeof a !== 'object') return a === b;
    if (Array.isArray(a) !== Array.isArray(b)) return false;
    var keysA = Object.keys(a);
    var keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;
    for (var i = 0; i < keysA.length; i++) {
      if (!deepEqual(a[keysA[i]], b[keysA[i]])) return false;
    }
    return true;
  }

  function formatValue(v) {
    try { return JSON.stringify(v); } catch(e) { return String(v); }
  }

  var matchers = {
    toBe: function(expected) {
      if (actual !== expected) throw new Error('Expected ' + formatValue(actual) + ' to be ' + formatValue(expected));
    },
    toEqual: function(expected) {
      if (!deepEqual(actual, expected)) throw new Error('Expected ' + formatValue(actual) + ' to equal ' + formatValue(expected));
    },
    toBeTruthy: function() {
      if (!actual) throw new Error('Expected ' + formatValue(actual) + ' to be truthy');
    },
    toBeFalsy: function() {
      if (actual) throw new Error('Expected ' + formatValue(actual) + ' to be falsy');
    },
    toBeNull: function() {
      if (actual !== null) throw new Error('Expected ' + formatValue(actual) + ' to be null');
    },
    toBeUndefined: function() {
      if (actual !== undefined) throw new Error('Expected ' + formatValue(actual) + ' to be undefined');
    },
    toBeDefined: function() {
      if (actual === undefined) throw new Error('Expected value to be defined');
    },
    toBeGreaterThan: function(expected) {
      if (!(actual > expected)) throw new Error('Expected ' + formatValue(actual) + ' to be greater than ' + formatValue(expected));
    },
    toBeGreaterThanOrEqual: function(expected) {
      if (!(actual >= expected)) throw new Error('Expected ' + formatValue(actual) + ' to be >= ' + formatValue(expected));
    },
    toBeLessThan: function(expected) {
      if (!(actual < expected)) throw new Error('Expected ' + formatValue(actual) + ' to be less than ' + formatValue(expected));
    },
    toBeLessThanOrEqual: function(expected) {
      if (!(actual <= expected)) throw new Error('Expected ' + formatValue(actual) + ' to be <= ' + formatValue(expected));
    },
    toContain: function(expected) {
      if (typeof actual === 'string') {
        if (actual.indexOf(expected) === -1) throw new Error('Expected string to contain ' + formatValue(expected));
      } else if (Array.isArray(actual)) {
        if (actual.indexOf(expected) === -1) throw new Error('Expected array to contain ' + formatValue(expected));
      } else {
        throw new Error('toContain requires a string or array');
      }
    },
    toHaveLength: function(expected) {
      if (actual == null || actual.length !== expected) throw new Error('Expected length ' + (actual && actual.length) + ' to be ' + expected);
    },
    toThrow: function(expectedMsg) {
      var threw = false;
      var thrownError;
      try { actual(); } catch(e) { threw = true; thrownError = e; }
      if (!threw) throw new Error('Expected function to throw');
      if (expectedMsg && thrownError && thrownError.message && thrownError.message.indexOf(expectedMsg) === -1) {
        throw new Error('Expected thrown error to contain ' + formatValue(expectedMsg) + ' but got ' + formatValue(thrownError.message));
      }
    },
    toHaveProperty: function(prop) {
      if (actual == null || !(prop in actual)) throw new Error('Expected object to have property ' + formatValue(prop));
    },
    toBeInstanceOf: function(cls) {
      if (!(actual instanceof cls)) throw new Error('Expected value to be instance of ' + (cls.name || cls));
    },
    toMatch: function(pattern) {
      if (typeof pattern === 'string') {
        if (String(actual).indexOf(pattern) === -1) throw new Error('Expected ' + formatValue(actual) + ' to match ' + formatValue(pattern));
      } else {
        if (!pattern.test(String(actual))) throw new Error('Expected ' + formatValue(actual) + ' to match ' + String(pattern));
      }
    },
    toHaveBeenCalled: function() {
      if (!actual || actual.callCount === 0) throw new Error('Expected function to have been called');
    },
    toHaveBeenCalledTimes: function(n) {
      if (!actual || actual.callCount !== n) throw new Error('Expected function to be called ' + n + ' times, got ' + (actual && actual.callCount));
    },
    toBeNaN: function() {
      if (!Number.isNaN(actual)) throw new Error('Expected ' + formatValue(actual) + ' to be NaN');
    },
  };

  var notMatchers = {};
  Object.keys(matchers).forEach(function(key) {
    notMatchers[key] = function() {
      var threw = false;
      try { matchers[key].apply(null, arguments); } catch(e) { threw = true; }
      if (!threw) throw new Error('Expected .not.' + key + ' assertion to fail, but it passed');
    };
  });

  matchers.not = notMatchers;
  return matchers;
}
`;

export function useTypeScript() {
  const [status, setStatus] = useState<TypeScriptStatus>('idle');
  const tsRef = useRef<TSCompiler | null>(null);

  useEffect(() => {
    setStatus('loading');

    if (!(window as unknown as Record<string, unknown>).ts) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/typescript@5.3.3/lib/typescript.min.js';
      script.onload = () => {
        loadTypeScript()
          .then((ts) => {
            tsRef.current = ts;
            setStatus('ready');
          })
          .catch(() => setStatus('error'));
      };
      script.onerror = () => setStatus('error');
      document.head.appendChild(script);
    } else {
      loadTypeScript()
        .then((ts) => {
          tsRef.current = ts;
          setStatus('ready');
        })
        .catch(() => setStatus('error'));
    }
  }, []);

  const runCode = async (files: Record<string, string>): Promise<RunResult> => {
    const ts = tsRef.current;
    if (!ts) {
      return { stdout: '', stderr: '', error: 'TypeScript compiler not loaded yet.' };
    }

    try {
      // Transpile all files from TS to JS (CommonJS)
      const compiledModules: Record<string, string> = {};
      for (const [filename, source] of Object.entries(files)) {
        const result = ts.transpileModule(source, {
          compilerOptions: {
            module: 1, // CommonJS
            target: 2, // ES2015
            strict: true,
            esModuleInterop: true,
            skipLibCheck: true,
            noEmit: false,
            jsx: 2, // React
          },
          reportDiagnostics: true,
        });
        compiledModules[filename] = result.outputText;
      }

      // Build virtual module registry + execute
      const stdout: string[] = [];
      const stderr: string[] = [];

      const moduleCache: Record<string, { exports: Record<string, unknown> }> = {};

      // Resolve module name to filename
      function resolveModule(from: string, request: string): string | null {
        // Strip .js/.ts extensions and leading ./
        const clean = request.replace(/\.(js|ts|tsx)$/, '').replace(/^\.\//, '');
        // Try exact match, then with common extensions
        const candidates = [
          clean,
          clean + '.ts',
          clean + '.tsx',
          clean + '.js',
          clean + '/index.ts',
          clean + '/index.tsx',
        ];
        for (const c of candidates) {
          if (compiledModules[c] !== undefined) return c;
        }
        return null;
      }

      function __require(from: string, request: string): Record<string, unknown> {
        const resolved = resolveModule(from, request);
        if (!resolved) {
          // Return an empty object for unresolvable modules (Node built-ins, etc.)
          return {};
        }
        if (moduleCache[resolved]) return moduleCache[resolved].exports;

        const mod = { exports: {} as Record<string, unknown> };
        moduleCache[resolved] = mod;

        const moduleCode = compiledModules[resolved];
        const wrappedCode = `
${VITEST_SHIM}
var module = { exports: {} };
var exports = module.exports;
var require = function(req) { return __require("${resolved}", req); };
var console = __console;
${moduleCode}
return module.exports;
`;
        try {
          const fn = new Function('__require', '__console', wrappedCode);
          const result = fn(
            (from: string, req: string) => __require(from, req),
            {
              log: (...args: unknown[]) => stdout.push(args.map(String).join(' ')),
              error: (...args: unknown[]) => stderr.push(args.map(String).join(' ')),
              warn: (...args: unknown[]) => stderr.push(args.map(String).join(' ')),
              info: (...args: unknown[]) => stdout.push(args.map(String).join(' ')),
              debug: () => {},
            }
          );
          if (result && typeof result === 'object') {
            Object.assign(mod.exports, result);
          }
        } catch (e) {
          const msg = e instanceof Error ? e.message : String(e);
          return { __error: msg };
        }

        return mod.exports;
      }

      // Find the test file(s) and execute them
      const testFiles = Object.keys(compiledModules).filter(
        (f) => f.includes('.test.') || f.includes('.spec.') || f.includes('__tests__')
      );

      // If no explicit test files, execute all files (the last one is likely the test)
      const filesToRun = testFiles.length > 0 ? testFiles : Object.keys(compiledModules);

      for (const testFile of filesToRun) {
        // Clear any cached test module so it runs fresh
        delete moduleCache[testFile];

        const moduleCode = compiledModules[testFile];
        const wrappedCode = `
${VITEST_SHIM}
var module = { exports: {} };
var exports = module.exports;
var require = function(req) { return __require("${testFile}", req); };
var console = __console;
${moduleCode}

// Collect test results
return __testResults;
`;
        try {
          const fn = new Function('__require', '__console', wrappedCode);
          const results = fn(
            (from: string, req: string) => __require(from, req),
            {
              log: (...args: unknown[]) => stdout.push(args.map(String).join(' ')),
              error: (...args: unknown[]) => stderr.push(args.map(String).join(' ')),
              warn: (...args: unknown[]) => stderr.push(args.map(String).join(' ')),
              info: (...args: unknown[]) => stdout.push(args.map(String).join(' ')),
              debug: () => {},
            }
          );

          if (Array.isArray(results)) {
            for (const line of results) {
              stdout.push(String(line));
            }
          }
        } catch (e) {
          const msg = e instanceof Error ? `${e.message}\n${e.stack}` : String(e);
          return {
            stdout: stdout.join('\n'),
            stderr: stderr.join('\n'),
            error: msg,
          };
        }
      }

      const passCount = stdout.filter((l) => l.startsWith('[PASS]')).length;
      const failCount = stdout.filter((l) => l.startsWith('[FAIL]')).length;
      if (passCount > 0 || failCount > 0) {
        stdout.push('');
        stdout.push(`${passCount + failCount} tests: ${passCount} passed, ${failCount} failed`);
      }

      return {
        stdout: stdout.join('\n'),
        stderr: stderr.join('\n'),
        error: null,
      };
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      return { stdout: '', stderr: '', error: msg };
    }
  };

  return { status, runCode };
}
