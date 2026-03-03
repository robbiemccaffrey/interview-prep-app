import type { DebugExercise } from './types';

export const reactFitnessExercises: DebugExercise[] = [
  // -----------------------------------------------------------------------
  // Bug 1: useEffect Missing Dependency (Stale Closure)
  // -----------------------------------------------------------------------
  {
    id: 'react-fitness-1',
    project: 'react-fitness',
    projectLabel: 'React Fitness',
    bugNumber: 1,
    title: 'Workout Filter Changes Are Ignored',
    difficulty: 'medium',
    category: 'stale-closure',
    language: 'typescript',
    symptom: `### Symptom

When the user changes the workout filter (e.g. search text, exercise type, date range), the displayed workouts **never update**. The list always shows results matching the initial filter. Only clicking the "Refresh" button re-fetches data — but even then, it uses the old filter.

### Expected

Changing any filter field should trigger a new fetch with the updated filter values.

### What you know

The \`useWorkouts\` hook accepts a \`filter\` object and uses it inside a \`useEffect\` to fetch workouts from an API. The effect has a dependency array, but the workouts never change when the filter changes.`,
    hints: [
      'Look at the dependency array of the `useEffect` that fetches workouts. What variables does it list?',
      'The effect reads `filter` inside its body. Is `filter` included in the dependency array?',
      'The dependency array only contains `[refreshKey]`, so the effect never re-runs when `filter` changes. Add `filter` to the array.',
    ],
    files: [
      {
        filename: 'useWorkouts.ts',
        language: 'typescript',
        buggyCode: `interface WorkoutFilter {
  exerciseType?: string;
  dateFrom?: string;
  dateTo?: string;
  minDuration?: number;
  search?: string;
}

interface WorkoutData {
  id: string;
  name: string;
  duration: number;
  caloriesBurned: number;
}

/**
 * Simulates a React hook that fetches workouts based on a filter.
 * Uses a createState/createEffect pattern to mimic useState/useEffect.
 */
function createState<T>(initial: T): [() => T, (val: T) => void] {
  let current = initial;
  return [() => current, (val: T) => { current = val; }];
}

// Simulates fetching workouts from an API
function fetchWorkouts(filter: WorkoutFilter): WorkoutData[] {
  const allWorkouts: WorkoutData[] = [
    { id: "w1", name: "Morning Strength", duration: 3600, caloriesBurned: 450 },
    { id: "w2", name: "Evening Cardio", duration: 1800, caloriesBurned: 300 },
    { id: "w3", name: "HIIT Session", duration: 2400, caloriesBurned: 500 },
    { id: "w4", name: "Yoga Flow", duration: 2700, caloriesBurned: 200 },
    { id: "w5", name: "Morning Run", duration: 3000, caloriesBurned: 350 },
  ];

  let results = allWorkouts;

  if (filter.search) {
    const term = filter.search.toLowerCase();
    results = results.filter((w) => w.name.toLowerCase().includes(term));
  }
  if (filter.minDuration !== undefined) {
    results = results.filter((w) => w.duration >= filter.minDuration!);
  }
  if (filter.exerciseType) {
    results = results.filter((w) =>
      w.name.toLowerCase().includes(filter.exerciseType!.toLowerCase())
    );
  }
  return results;
}

/**
 * Simulates React's useEffect with a dependency array.
 * The effect only re-runs when a dependency value changes.
 */
function createEffect(deps: () => unknown[]) {
  let lastDeps: unknown[] | null = null;
  let cleanup: (() => void) | undefined;

  return {
    run(effect: () => (() => void) | void) {
      const currentDeps = deps();
      const changed =
        lastDeps === null ||
        currentDeps.some((dep, i) => !Object.is(dep, lastDeps![i]));

      if (changed) {
        if (cleanup) cleanup();
        cleanup = effect() || undefined;
        lastDeps = currentDeps;
      }
    },
  };
}

export function createWorkoutsHook(initialFilter: WorkoutFilter) {
  const [getWorkouts, setWorkouts] = createState<WorkoutData[]>([]);
  const [getLoading, setLoading] = createState(true);
  const [getRefreshKey, setRefreshKey] = createState(0);

  let currentFilter = initialFilter;

  const effect = createEffect(() => [getRefreshKey()]);

  function runEffect() {
    effect.run(() => {
      setLoading(true);
      const data = fetchWorkouts(currentFilter);
      setWorkouts(data);
      setLoading(false);
    });
  }

  function updateFilter(newFilter: WorkoutFilter) {
    currentFilter = newFilter;
    runEffect(); // Effect won't re-run because refreshKey hasn't changed!
  }

  function refresh() {
    setRefreshKey(getRefreshKey() + 1);
    runEffect();
  }

  // Initial run
  runEffect();

  return { getWorkouts, getLoading, updateFilter, refresh };
}`,
        solutionCode: `interface WorkoutFilter {
  exerciseType?: string;
  dateFrom?: string;
  dateTo?: string;
  minDuration?: number;
  search?: string;
}

interface WorkoutData {
  id: string;
  name: string;
  duration: number;
  caloriesBurned: number;
}

/**
 * Simulates a React hook that fetches workouts based on a filter.
 * Uses a createState/createEffect pattern to mimic useState/useEffect.
 */
function createState<T>(initial: T): [() => T, (val: T) => void] {
  let current = initial;
  return [() => current, (val: T) => { current = val; }];
}

// Simulates fetching workouts from an API
function fetchWorkouts(filter: WorkoutFilter): WorkoutData[] {
  const allWorkouts: WorkoutData[] = [
    { id: "w1", name: "Morning Strength", duration: 3600, caloriesBurned: 450 },
    { id: "w2", name: "Evening Cardio", duration: 1800, caloriesBurned: 300 },
    { id: "w3", name: "HIIT Session", duration: 2400, caloriesBurned: 500 },
    { id: "w4", name: "Yoga Flow", duration: 2700, caloriesBurned: 200 },
    { id: "w5", name: "Morning Run", duration: 3000, caloriesBurned: 350 },
  ];

  let results = allWorkouts;

  if (filter.search) {
    const term = filter.search.toLowerCase();
    results = results.filter((w) => w.name.toLowerCase().includes(term));
  }
  if (filter.minDuration !== undefined) {
    results = results.filter((w) => w.duration >= filter.minDuration!);
  }
  if (filter.exerciseType) {
    results = results.filter((w) =>
      w.name.toLowerCase().includes(filter.exerciseType!.toLowerCase())
    );
  }
  return results;
}

/**
 * Simulates React's useEffect with a dependency array.
 * The effect only re-runs when a dependency value changes.
 */
function createEffect(deps: () => unknown[]) {
  let lastDeps: unknown[] | null = null;
  let cleanup: (() => void) | undefined;

  return {
    run(effect: () => (() => void) | void) {
      const currentDeps = deps();
      const changed =
        lastDeps === null ||
        currentDeps.some((dep, i) => !Object.is(dep, lastDeps![i]));

      if (changed) {
        if (cleanup) cleanup();
        cleanup = effect() || undefined;
        lastDeps = currentDeps;
      }
    },
  };
}

export function createWorkoutsHook(initialFilter: WorkoutFilter) {
  const [getWorkouts, setWorkouts] = createState<WorkoutData[]>([]);
  const [getLoading, setLoading] = createState(true);
  const [getRefreshKey, setRefreshKey] = createState(0);

  let currentFilter = initialFilter;

  const effect = createEffect(() => [
    getRefreshKey(),
    currentFilter.search,
    currentFilter.exerciseType,
    currentFilter.dateFrom,
    currentFilter.dateTo,
    currentFilter.minDuration,
  ]);

  function runEffect() {
    effect.run(() => {
      setLoading(true);
      const data = fetchWorkouts(currentFilter);
      setWorkouts(data);
      setLoading(false);
    });
  }

  function updateFilter(newFilter: WorkoutFilter) {
    currentFilter = newFilter;
    runEffect();
  }

  function refresh() {
    setRefreshKey(getRefreshKey() + 1);
    runEffect();
  }

  // Initial run
  runEffect();

  return { getWorkouts, getLoading, updateFilter, refresh };
}`,
      },
    ],
    testFiles: [
      {
        filename: 'useWorkouts.test.ts',
        language: 'typescript',
        code: `import { createWorkoutsHook } from "./useWorkouts";

describe("useWorkouts - filter dependency", () => {
  it("returns all workouts with empty filter", () => {
    const hook = createWorkoutsHook({});
    expect(hook.getWorkouts()).toHaveLength(5);
  });

  it("filters workouts when search is updated", () => {
    const hook = createWorkoutsHook({});
    hook.updateFilter({ search: "Morning" });
    const results = hook.getWorkouts();
    expect(results.length).toBe(2);
    expect(results.every((w) => w.name.includes("Morning"))).toBe(true);
  });

  it("updates results when filter changes to a different search", () => {
    const hook = createWorkoutsHook({ search: "Morning" });
    expect(hook.getWorkouts()).toHaveLength(2);
    hook.updateFilter({ search: "Cardio" });
    expect(hook.getWorkouts()).toHaveLength(1);
    expect(hook.getWorkouts()[0].name).toBe("Evening Cardio");
  });

  it("filters by minDuration when filter is updated", () => {
    const hook = createWorkoutsHook({});
    hook.updateFilter({ minDuration: 2700 });
    const results = hook.getWorkouts();
    expect(results.every((w) => w.duration >= 2700)).toBe(true);
    expect(results.length).toBe(3);
  });

  it("refresh always re-fetches with current filter", () => {
    const hook = createWorkoutsHook({ search: "HIIT" });
    expect(hook.getWorkouts()).toHaveLength(1);
    hook.refresh();
    expect(hook.getWorkouts()).toHaveLength(1);
  });
});`,
      },
    ],
    solutionExplanation: `### Root Cause

The \`useEffect\` that fetches workouts has \`[refreshKey]\` as its only dependency. Even though the effect reads \`filter\` inside its body, \`filter\` is not in the dependency array. When the filter changes, the effect does **not** re-run, so the fetched data never updates.

\`\`\`typescript
const effect = createEffect(() => [getRefreshKey()]);
\`\`\`

### Fix

Add the filter fields to the dependency array so the effect re-runs whenever the filter changes:

\`\`\`typescript
const effect = createEffect(() => [
  getRefreshKey(),
  currentFilter.search,
  currentFilter.exerciseType,
  currentFilter.dateFrom,
  currentFilter.dateTo,
  currentFilter.minDuration,
]);
\`\`\``,
  },

  // -----------------------------------------------------------------------
  // Bug 2: useState Stale Read After setState
  // -----------------------------------------------------------------------
  {
    id: 'react-fitness-2',
    project: 'react-fitness',
    projectLabel: 'React Fitness',
    bugNumber: 2,
    title: '"Add Set" Button Requires Two Clicks',
    difficulty: 'medium',
    category: 'stale-closure',
    language: 'typescript',
    symptom: `### Symptom

When clicking "Add Set", the parent's \`onSetsChange\` callback receives an array that's always **one set behind**. The first click reports 0 sets, the second click reports 1 set, etc.

### Expected

After clicking "Add Set", the parent should immediately receive the updated array including the new set.

### What you know

This is a React component that manages a list of workout sets. When the user clicks "Add Set", the component should:
1. Add a new set to its internal state
2. Notify the parent of the updated set list via \`onSetsChange\`

The bug is in \`handleAddSet\` — the parent always receives a stale array.`,
    hints: [
      'The handler calls both a state setter and a callback. Check what value the callback receives.',
      'After calling `setSets([...sets, newSet])`, what does the variable `sets` still reference in this same function call?',
      'State setters are async — the variable `sets` still holds the old value in this closure. Create the new array in a local variable first, then use it for both `setSets()` and `onSetsChange()`.',
    ],
    files: [
      {
        filename: 'AddSetForm.ts',
        language: 'typescript',
        buggyCode: `interface WorkoutSet {
  exerciseId: string;
  reps: number;
  weight: number;
  completed: boolean;
}

interface AddSetFormState {
  sets: WorkoutSet[];
  reps: number;
  weight: number;
}

/**
 * Simulates React's useState behavior:
 * - setState updates the variable for NEXT render
 * - The current closure still sees the OLD value
 */
function createState<T>(initial: T): [() => T, (val: T) => void] {
  let current = initial;
  return [() => current, (val: T) => { current = val; }];
}

export function createAddSetForm(exerciseId: string) {
  const [getSets, setSets] = createState<WorkoutSet[]>([]);
  const [getReps] = createState(10);
  const [getWeight] = createState(0);

  function handleAddSet(onSetsChange: (sets: WorkoutSet[]) => void) {
    const sets = getSets();
    const newSet: WorkoutSet = {
      exerciseId,
      reps: getReps(),
      weight: getWeight(),
      completed: false,
    };

    setSets([...sets, newSet]);
    onSetsChange(sets);
  }

  return { handleAddSet, getSets };
}`,
        solutionCode: `interface WorkoutSet {
  exerciseId: string;
  reps: number;
  weight: number;
  completed: boolean;
}

interface AddSetFormState {
  sets: WorkoutSet[];
  reps: number;
  weight: number;
}

/**
 * Simulates React's useState behavior:
 * - setState updates the variable for NEXT render
 * - The current closure still sees the OLD value
 */
function createState<T>(initial: T): [() => T, (val: T) => void] {
  let current = initial;
  return [() => current, (val: T) => { current = val; }];
}

export function createAddSetForm(exerciseId: string) {
  const [getSets, setSets] = createState<WorkoutSet[]>([]);
  const [getReps] = createState(10);
  const [getWeight] = createState(0);

  function handleAddSet(onSetsChange: (sets: WorkoutSet[]) => void) {
    const sets = getSets();
    const newSet: WorkoutSet = {
      exerciseId,
      reps: getReps(),
      weight: getWeight(),
      completed: false,
    };

    const updatedSets = [...sets, newSet];
    setSets(updatedSets);
    onSetsChange(updatedSets); // Use the local variable, not stale state
  }

  return { handleAddSet, getSets };
}`,
      },
    ],
    testFiles: [
      {
        filename: 'AddSetForm.test.ts',
        language: 'typescript',
        code: `import { createAddSetForm } from "./AddSetForm";

describe("AddSetForm - handleAddSet", () => {
  it("parent receives array with 1 set after first click", () => {
    const form = createAddSetForm("ex-squat");
    let reportedSets: unknown[] = [];

    form.handleAddSet((sets) => { reportedSets = sets; });

    expect(reportedSets).toHaveLength(1);
  });

  it("parent receives array with 2 sets after second click", () => {
    const form = createAddSetForm("ex-squat");
    let reportedSets: unknown[] = [];

    form.handleAddSet((sets) => { reportedSets = sets; });
    form.handleAddSet((sets) => { reportedSets = sets; });

    expect(reportedSets).toHaveLength(2);
  });

  it("parent receives array with 3 sets after third click", () => {
    const form = createAddSetForm("ex-bench");
    let reportedSets: unknown[] = [];

    form.handleAddSet((sets) => { reportedSets = sets; });
    form.handleAddSet((sets) => { reportedSets = sets; });
    form.handleAddSet((sets) => { reportedSets = sets; });

    expect(reportedSets).toHaveLength(3);
  });

  it("internal state should also have all sets", () => {
    const form = createAddSetForm("ex-deadlift");

    form.handleAddSet(() => {});
    form.handleAddSet(() => {});

    expect(form.getSets()).toHaveLength(2);
  });

  it("each set should have correct exerciseId", () => {
    const form = createAddSetForm("ex-squat");
    let reportedSets: any[] = [];

    form.handleAddSet((sets) => { reportedSets = sets; });

    expect(reportedSets[0].exerciseId).toBe("ex-squat");
    expect(reportedSets[0].completed).toBe(false);
  });
});`,
      },
    ],
    solutionExplanation: `### Root Cause

In \`handleAddSet\`, after calling \`setSets([...sets, newSet])\`, the local variable \`sets\` still holds the **old** array (the pre-update value). React's \`setState\` is asynchronous — it schedules the update for the next render, but the current closure still sees the old value.

\`\`\`typescript
setSets([...sets, newSet]);  // Schedules update
onSetsChange(sets);
\`\`\`

### Fix

Create the new array in a local variable and use it for both:

\`\`\`typescript
const updatedSets = [...sets, newSet];
setSets(updatedSets);
onSetsChange(updatedSets);  // Use the local variable
\`\`\``,
  },

  // -----------------------------------------------------------------------
  // Bug 3: useEffect Missing Cleanup (Interval Leak)
  // -----------------------------------------------------------------------
  {
    id: 'react-fitness-3',
    project: 'react-fitness',
    projectLabel: 'React Fitness',
    bugNumber: 3,
    title: 'Workout Timer Accelerates Over Time',
    difficulty: 'medium',
    category: 'cleanup',
    language: 'typescript',
    symptom: `### Symptom

The workout timer starts counting normally, but after stopping and starting it a few times, the seconds increment **faster and faster**. Instead of ticking once per second, it ticks 2x, 3x, or more times per second.

### Expected

The timer should always tick exactly once per second regardless of how many times it is started and stopped.

### What you know

The \`useTimer\` hook creates a \`setInterval\` when \`isRunning\` becomes true. The interval should increment the seconds counter once per second. Something is causing multiple intervals to run simultaneously.`,
    hints: [
      'What happens to the old interval when `isRunning` changes and the effect re-runs?',
      'When a `useEffect` creates a resource (like an interval), it needs to return a cleanup function to dispose of the old resource before creating a new one.',
      'The effect never returns `() => clearInterval(id)`. Each start creates a new interval without clearing the previous one. Add a cleanup return.',
    ],
    files: [
      {
        filename: 'useTimer.ts',
        language: 'typescript',
        buggyCode: `/**
 * Simulates React's useEffect with cleanup support.
 * When the effect re-runs, it should call the previous cleanup first.
 */
function createEffect(deps: () => unknown[]) {
  let lastDeps: unknown[] | null = null;
  let cleanup: (() => void) | undefined;

  return {
    run(effect: () => (() => void) | void) {
      const currentDeps = deps();
      const changed =
        lastDeps === null ||
        currentDeps.some((dep, i) => !Object.is(dep, lastDeps![i]));

      if (changed) {
        if (cleanup) cleanup();
        cleanup = effect() || undefined;
        lastDeps = currentDeps;
      }
    },
    cleanup() {
      if (cleanup) cleanup();
    },
  };
}

function createState<T>(initial: T): [() => T, (val: T) => void] {
  let current = initial;
  return [() => current, (val: T) => { current = val; }];
}

export function createTimer() {
  const [getSeconds, setSeconds] = createState(0);
  const [getIsRunning, setIsRunning] = createState(false);

  const timerEffect = createEffect(() => [getIsRunning()]);

  function runEffect() {
    timerEffect.run(() => {
      if (!getIsRunning()) return;

      const id = setInterval(() => {
        setSeconds(getSeconds() + 1);
      }, 1000);

    });
  }

  function start() {
    setIsRunning(true);
    runEffect();
  }

  function stop() {
    setIsRunning(false);
    runEffect();
  }

  function reset() {
    setIsRunning(false);
    setSeconds(0);
    runEffect();
  }

  return { getSeconds, getIsRunning, start, stop, reset };
}`,
        solutionCode: `/**
 * Simulates React's useEffect with cleanup support.
 * When the effect re-runs, it should call the previous cleanup first.
 */
function createEffect(deps: () => unknown[]) {
  let lastDeps: unknown[] | null = null;
  let cleanup: (() => void) | undefined;

  return {
    run(effect: () => (() => void) | void) {
      const currentDeps = deps();
      const changed =
        lastDeps === null ||
        currentDeps.some((dep, i) => !Object.is(dep, lastDeps![i]));

      if (changed) {
        if (cleanup) cleanup();
        cleanup = effect() || undefined;
        lastDeps = currentDeps;
      }
    },
    cleanup() {
      if (cleanup) cleanup();
    },
  };
}

function createState<T>(initial: T): [() => T, (val: T) => void] {
  let current = initial;
  return [() => current, (val: T) => { current = val; }];
}

export function createTimer() {
  const [getSeconds, setSeconds] = createState(0);
  const [getIsRunning, setIsRunning] = createState(false);

  const timerEffect = createEffect(() => [getIsRunning()]);

  function runEffect() {
    timerEffect.run(() => {
      if (!getIsRunning()) return;

      const id = setInterval(() => {
        setSeconds(getSeconds() + 1);
      }, 1000);

      return () => clearInterval(id);
    });
  }

  function start() {
    setIsRunning(true);
    runEffect();
  }

  function stop() {
    setIsRunning(false);
    runEffect();
  }

  function reset() {
    setIsRunning(false);
    setSeconds(0);
    runEffect();
  }

  return { getSeconds, getIsRunning, start, stop, reset };
}`,
      },
    ],
    testFiles: [
      {
        filename: 'useTimer.test.ts',
        language: 'typescript',
        code: `import { createTimer } from "./useTimer";

describe("useTimer - interval cleanup", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllTimers();
  });

  it("increments seconds while running", () => {
    const timer = createTimer();
    timer.start();
    vi.advanceTimersByTime(3000);
    expect(timer.getSeconds()).toBe(3);
  });

  it("stops incrementing after stop", () => {
    const timer = createTimer();
    timer.start();
    vi.advanceTimersByTime(2000);
    timer.stop();
    vi.advanceTimersByTime(3000);
    expect(timer.getSeconds()).toBe(2);
  });

  it("does not accelerate after multiple start/stop cycles", () => {
    const timer = createTimer();

    timer.start();
    vi.advanceTimersByTime(1000);
    timer.stop();

    timer.start();
    vi.advanceTimersByTime(1000);
    timer.stop();

    timer.start();
    vi.advanceTimersByTime(1000);
    timer.stop();

    // Should be exactly 3 seconds total, not more
    expect(timer.getSeconds()).toBe(3);
  });

  it("reset sets seconds back to 0", () => {
    const timer = createTimer();
    timer.start();
    vi.advanceTimersByTime(5000);
    timer.reset();
    expect(timer.getSeconds()).toBe(0);
    expect(timer.getIsRunning()).toBe(false);
  });

  it("no active intervals after stop", () => {
    const timer = createTimer();
    timer.start();
    vi.advanceTimersByTime(2000);
    timer.stop();
    const secondsAfterStop = timer.getSeconds();
    vi.advanceTimersByTime(5000);
    expect(timer.getSeconds()).toBe(secondsAfterStop);
  });
});`,
      },
    ],
    solutionExplanation: `### Root Cause

The \`useEffect\` creates a \`setInterval\` when \`isRunning\` becomes true, but it **never returns a cleanup function**. When the user stops and starts the timer, the old interval keeps running. Each start adds another interval, so the counter increments multiple times per second.

\`\`\`typescript
timerEffect.run(() => {
  if (!getIsRunning()) return;
  const id = setInterval(() => { ... }, 1000);
});
\`\`\`

### Fix

Return a cleanup function that clears the interval:

\`\`\`typescript
timerEffect.run(() => {
  if (!getIsRunning()) return;
  const id = setInterval(() => { ... }, 1000);
  return () => clearInterval(id); // Clear old interval on re-run
});
\`\`\``,
  },

  // -----------------------------------------------------------------------
  // Bug 4: useMemo Object Reference Dependency
  // -----------------------------------------------------------------------
  {
    id: 'react-fitness-4',
    project: 'react-fitness',
    projectLabel: 'React Fitness',
    bugNumber: 4,
    title: 'Leaderboard Sorting Recomputes Every Render',
    difficulty: 'medium',
    category: 'reference-equality',
    language: 'typescript',
    symptom: `### Symptom

The leaderboard's expensive sort-and-slice computation runs on **every** render, even when neither the data nor the sort options have changed. Profiling shows \`useMemo\` is not caching at all. Typing in an unrelated input field triggers a full re-sort.

### Expected

The sorted leaderboard should be memoized and only recomputed when \`entries\`, \`sortBy\`, or \`limit\` actually change.

### What you know

The \`useLeaderboard\` hook receives an \`options\` object with \`sortBy\` and \`limit\` and uses \`useMemo\` to cache the sorted result. Despite using \`useMemo\`, the computation runs on every call.`,
    hints: [
      'Check the dependency array of `useMemo`. What is `options`?',
      '`options` is an object. Even if `sortBy` and `limit` are the same strings/numbers, a new object reference `{ sortBy, limit }` is created every render.',
      'Use individual primitive values (`options.sortBy`, `options.limit`) in the dependency array instead of the entire `options` object.',
    ],
    files: [
      {
        filename: 'useLeaderboard.ts',
        language: 'typescript',
        buggyCode: `interface LeaderboardEntry {
  userId: string;
  userName: string;
  totalWorkouts: number;
  totalCalories: number;
  totalDuration: number;
  rank: number;
}

interface LeaderboardOptions {
  sortBy: "calories" | "workouts" | "duration";
  limit: number;
}

/**
 * Simulates React's useMemo: caches a computed value and only
 * recomputes when dependencies change (compared by Object.is).
 */
function createMemo<T>(compute: () => T, deps: () => unknown[]): () => T {
  let cachedValue: T;
  let lastDeps: unknown[] | null = null;
  let computeCount = 0;

  return () => {
    const currentDeps = deps();
    const changed =
      lastDeps === null ||
      currentDeps.length !== lastDeps.length ||
      currentDeps.some((dep, i) => !Object.is(dep, lastDeps![i]));

    if (changed) {
      computeCount++;
      cachedValue = compute();
      lastDeps = currentDeps;
    }

    return cachedValue;
  };
}

export function createLeaderboard(
  entries: LeaderboardEntry[],
  options: LeaderboardOptions
) {
  let currentEntries = entries;
  let currentOptions = options;
  let computeCount = 0;

  // a new object reference each time means memo never caches
  const getSorted = createMemo(
    () => {
      computeCount++;
      const sorted = [...currentEntries];

      switch (currentOptions.sortBy) {
        case "calories":
          sorted.sort((a, b) => b.totalCalories - a.totalCalories);
          break;
        case "workouts":
          sorted.sort((a, b) => b.totalWorkouts - a.totalWorkouts);
          break;
        case "duration":
          sorted.sort((a, b) => b.totalDuration - a.totalDuration);
          break;
      }

      return sorted.slice(0, currentOptions.limit);
    },
    () => [currentEntries, currentOptions] // Object reference changes every time!
  );

  function update(newEntries: LeaderboardEntry[], newOptions: LeaderboardOptions) {
    currentEntries = newEntries;
    currentOptions = newOptions;
  }

  function getComputeCount() {
    return computeCount;
  }

  return { getSorted, update, getComputeCount };
}`,
        solutionCode: `interface LeaderboardEntry {
  userId: string;
  userName: string;
  totalWorkouts: number;
  totalCalories: number;
  totalDuration: number;
  rank: number;
}

interface LeaderboardOptions {
  sortBy: "calories" | "workouts" | "duration";
  limit: number;
}

/**
 * Simulates React's useMemo: caches a computed value and only
 * recomputes when dependencies change (compared by Object.is).
 */
function createMemo<T>(compute: () => T, deps: () => unknown[]): () => T {
  let cachedValue: T;
  let lastDeps: unknown[] | null = null;
  let computeCount = 0;

  return () => {
    const currentDeps = deps();
    const changed =
      lastDeps === null ||
      currentDeps.length !== lastDeps.length ||
      currentDeps.some((dep, i) => !Object.is(dep, lastDeps![i]));

    if (changed) {
      computeCount++;
      cachedValue = compute();
      lastDeps = currentDeps;
    }

    return cachedValue;
  };
}

export function createLeaderboard(
  entries: LeaderboardEntry[],
  options: LeaderboardOptions
) {
  let currentEntries = entries;
  let currentOptions = options;
  let computeCount = 0;

  const getSorted = createMemo(
    () => {
      computeCount++;
      const sorted = [...currentEntries];

      switch (currentOptions.sortBy) {
        case "calories":
          sorted.sort((a, b) => b.totalCalories - a.totalCalories);
          break;
        case "workouts":
          sorted.sort((a, b) => b.totalWorkouts - a.totalWorkouts);
          break;
        case "duration":
          sorted.sort((a, b) => b.totalDuration - a.totalDuration);
          break;
      }

      return sorted.slice(0, currentOptions.limit);
    },
    () => [currentEntries, currentOptions.sortBy, currentOptions.limit]
  );

  function update(newEntries: LeaderboardEntry[], newOptions: LeaderboardOptions) {
    currentEntries = newEntries;
    currentOptions = newOptions;
  }

  function getComputeCount() {
    return computeCount;
  }

  return { getSorted, update, getComputeCount };
}`,
      },
    ],
    testFiles: [
      {
        filename: 'useLeaderboard.test.ts',
        language: 'typescript',
        code: `import { createLeaderboard } from "./useLeaderboard";

const sampleEntries = [
  { userId: "u1", userName: "Alice", totalWorkouts: 50, totalCalories: 25000, totalDuration: 90000, rank: 1 },
  { userId: "u2", userName: "Bob", totalWorkouts: 30, totalCalories: 18000, totalDuration: 72000, rank: 2 },
  { userId: "u3", userName: "Charlie", totalWorkouts: 70, totalCalories: 15000, totalDuration: 108000, rank: 3 },
  { userId: "u4", userName: "Diana", totalWorkouts: 20, totalCalories: 30000, totalDuration: 60000, rank: 4 },
];

describe("useLeaderboard - memoization", () => {
  it("sorts by calories descending", () => {
    const lb = createLeaderboard(sampleEntries, { sortBy: "calories", limit: 10 });
    const sorted = lb.getSorted();
    expect(sorted[0].userName).toBe("Diana");
    expect(sorted[1].userName).toBe("Alice");
  });

  it("sorts by workouts descending", () => {
    const lb = createLeaderboard(sampleEntries, { sortBy: "workouts", limit: 10 });
    const sorted = lb.getSorted();
    expect(sorted[0].userName).toBe("Charlie");
  });

  it("respects the limit parameter", () => {
    const lb = createLeaderboard(sampleEntries, { sortBy: "calories", limit: 2 });
    expect(lb.getSorted()).toHaveLength(2);
  });

  it("does NOT recompute when called with same options object values", () => {
    const lb = createLeaderboard(sampleEntries, { sortBy: "calories", limit: 10 });
    lb.getSorted(); // first compute
    const count1 = lb.getComputeCount();

    // Update with new object reference but same values
    lb.update(sampleEntries, { sortBy: "calories", limit: 10 });
    lb.getSorted();
    const count2 = lb.getComputeCount();

    expect(count2).toBe(count1);
  });

  it("DOES recompute when sortBy actually changes", () => {
    const lb = createLeaderboard(sampleEntries, { sortBy: "calories", limit: 10 });
    lb.getSorted();
    const count1 = lb.getComputeCount();

    lb.update(sampleEntries, { sortBy: "workouts", limit: 10 });
    lb.getSorted();
    const count2 = lb.getComputeCount();

    expect(count2).toBe(count1 + 1);
  });
});`,
      },
    ],
    solutionExplanation: `### Root Cause

The \`useMemo\` dependency array contains \`options\` — the entire object. In React, the parent component creates a new \`{ sortBy, limit }\` object every render. Since \`Object.is(oldObj, newObj)\` is \`false\` for different object references (even with identical contents), the memo thinks dependencies have changed and recomputes.

\`\`\`typescript
() => [currentEntries, currentOptions]
\`\`\`

### Fix

Use individual primitive values as dependencies:

\`\`\`typescript
() => [currentEntries, currentOptions.sortBy, currentOptions.limit]
\`\`\`

Primitives like strings and numbers are compared by value, so the memo correctly detects when nothing has actually changed.`,
  },

  // -----------------------------------------------------------------------
  // Bug 5: `as` Cast Hiding String Dates
  // -----------------------------------------------------------------------
  {
    id: 'react-fitness-5',
    project: 'react-fitness',
    projectLabel: 'React Fitness',
    bugNumber: 5,
    title: 'Workout Dates Crash When Formatted',
    difficulty: 'hard',
    category: 'type-cast',
    language: 'typescript',
    symptom: `### Symptom

Calling \`formatDate(workout.completedAt)\` throws **"date.toLocaleDateString is not a function"** or returns unexpected results like \`"Invalid Date"\`. The \`completedAt\` field is typed as \`Date\` but behaves like a string at runtime.

### Expected

\`completedAt\` should be a real \`Date\` object so that date formatting methods work correctly.

### What you know

The API client fetches workout data from a REST API. The TypeScript type says \`completedAt: Date\`, but JSON responses always contain strings. The API client casts the response with \`as WorkoutData[]\` without converting date fields.`,
    hints: [
      'JSON has no `Date` type. When you `JSON.parse` a response, date fields remain strings.',
      'The API client uses `as WorkoutData[]` which tells TypeScript to trust the shape — but it does not transform the data at runtime.',
      'After fetching, map over the results and convert string date fields to actual `Date` objects: `new Date(w.completedAt)`.',
    ],
    files: [
      {
        filename: 'FitnessApiClient.ts',
        language: 'typescript',
        buggyCode: `interface WorkoutData {
  id: string;
  name: string;
  duration: number;
  completedAt: Date;
  createdAt: Date;
  caloriesBurned: number;
}

interface WorkoutFilter {
  exerciseType?: string;
  search?: string;
}

/**
 * Simulates fetching workout data from a JSON API.
 * JSON.parse returns date fields as ISO strings, not Date objects.
 */
function simulateApiFetch(filter?: WorkoutFilter): unknown[] {
  const rawJson = [
    {
      id: "w1",
      name: "Morning Strength",
      duration: 3600,
      completedAt: "2024-11-15T14:30:00.000Z",
      createdAt: "2024-11-15T08:00:00.000Z",
      caloriesBurned: 450,
    },
    {
      id: "w2",
      name: "Evening Cardio",
      duration: 1800,
      completedAt: "2024-11-16T18:00:00.000Z",
      createdAt: "2024-11-16T17:30:00.000Z",
      caloriesBurned: 300,
    },
    {
      id: "w3",
      name: "HIIT Session",
      duration: 2400,
      completedAt: "2024-11-17T12:00:00.000Z",
      createdAt: "2024-11-17T11:30:00.000Z",
      caloriesBurned: 500,
    },
  ];

  let results = rawJson;
  if (filter?.search) {
    const term = filter.search.toLowerCase();
    results = results.filter((w) => w.name.toLowerCase().includes(term));
  }
  return results;
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

export function getWorkouts(filter?: WorkoutFilter): WorkoutData[] {
  const raw = simulateApiFetch(filter);

  return raw as WorkoutData[];
}

export function isAfterDate(workout: WorkoutData, date: Date): boolean {
  return workout.completedAt > date;
}`,
        solutionCode: `interface WorkoutData {
  id: string;
  name: string;
  duration: number;
  completedAt: Date;
  createdAt: Date;
  caloriesBurned: number;
}

interface WorkoutFilter {
  exerciseType?: string;
  search?: string;
}

/**
 * Simulates fetching workout data from a JSON API.
 * JSON.parse returns date fields as ISO strings, not Date objects.
 */
function simulateApiFetch(filter?: WorkoutFilter): unknown[] {
  const rawJson = [
    {
      id: "w1",
      name: "Morning Strength",
      duration: 3600,
      completedAt: "2024-11-15T14:30:00.000Z",
      createdAt: "2024-11-15T08:00:00.000Z",
      caloriesBurned: 450,
    },
    {
      id: "w2",
      name: "Evening Cardio",
      duration: 1800,
      completedAt: "2024-11-16T18:00:00.000Z",
      createdAt: "2024-11-16T17:30:00.000Z",
      caloriesBurned: 300,
    },
    {
      id: "w3",
      name: "HIIT Session",
      duration: 2400,
      completedAt: "2024-11-17T12:00:00.000Z",
      createdAt: "2024-11-17T11:30:00.000Z",
      caloriesBurned: 500,
    },
  ];

  let results = rawJson;
  if (filter?.search) {
    const term = filter.search.toLowerCase();
    results = results.filter((w) => w.name.toLowerCase().includes(term));
  }
  return results;
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

export function getWorkouts(filter?: WorkoutFilter): WorkoutData[] {
  const raw = simulateApiFetch(filter);

  return (raw as any[]).map((w) => ({
    ...w,
    completedAt: new Date(w.completedAt),
    createdAt: new Date(w.createdAt),
  }));
}

export function isAfterDate(workout: WorkoutData, date: Date): boolean {
  return workout.completedAt > date;
}`,
      },
    ],
    testFiles: [
      {
        filename: 'FitnessApiClient.test.ts',
        language: 'typescript',
        code: `import { getWorkouts, formatDate, isAfterDate } from "./FitnessApiClient";

describe("FitnessApiClient - date handling", () => {
  it("completedAt should be a Date instance", () => {
    const workouts = getWorkouts();
    expect(workouts[0].completedAt).toBeInstanceOf(Date);
  });

  it("createdAt should be a Date instance", () => {
    const workouts = getWorkouts();
    expect(workouts[0].createdAt).toBeInstanceOf(Date);
  });

  it("formatDate should produce a readable string", () => {
    const workouts = getWorkouts();
    const formatted = formatDate(workouts[0].completedAt);
    expect(formatted).toContain("2024");
    expect(formatted).toContain("Nov");
    expect(formatted).toContain("15");
  });

  it("isAfterDate should correctly compare dates", () => {
    const workouts = getWorkouts();
    const earlyDate = new Date("2024-01-01");
    const lateDate = new Date("2025-01-01");

    expect(isAfterDate(workouts[0], earlyDate)).toBe(true);
    expect(isAfterDate(workouts[0], lateDate)).toBe(false);
  });

  it("all workouts should have valid Date objects", () => {
    const workouts = getWorkouts();
    for (const w of workouts) {
      expect(w.completedAt).toBeInstanceOf(Date);
      expect(w.createdAt).toBeInstanceOf(Date);
      expect(isNaN(w.completedAt.getTime())).toBe(false);
    }
  });
});`,
      },
    ],
    solutionExplanation: `### Root Cause

JSON has no \`Date\` type. When the API response is parsed with \`JSON.parse\`, date fields like \`completedAt\` and \`createdAt\` remain as **ISO 8601 strings** (e.g. \`"2024-11-15T14:30:00.000Z"\`). The code uses \`as WorkoutData[]\` to cast the result, which tells TypeScript "trust me, these are Date objects" -- but at **runtime** they are still strings.

\`\`\`typescript
// TypeScript trusts this, but dates are still strings at runtime
return raw as WorkoutData[];
\`\`\`

### Fix

Map over the raw response and explicitly convert string dates to \`Date\` objects:

\`\`\`typescript
return (raw as any[]).map((w) => ({
  ...w,
  completedAt: new Date(w.completedAt),
  createdAt: new Date(w.createdAt),
}));
\`\`\``,
  },

  // -----------------------------------------------------------------------
  // Bug 6: Optional Chaining Without Nullish Coalescing
  // -----------------------------------------------------------------------
  {
    id: 'react-fitness-6',
    project: 'react-fitness',
    projectLabel: 'React Fitness',
    bugNumber: 6,
    title: 'Weight Unit Shows Empty Instead of "kg"',
    difficulty: 'easy',
    category: 'optional-chaining',
    language: 'typescript',
    symptom: `### Symptom

For users who have not set a unit preference, the workout card shows **no unit** next to weights (e.g. "80" instead of "80 kg"). The \`unitSystem\` getter returns \`undefined\` instead of the default \`"metric"\`.

### Expected

When a user has no settings or no \`unitSystem\` set, the getter should default to \`"metric"\`.

### What you know

The \`WorkoutCardModel\` class reads \`this.user?.settings?.unitSystem\` using optional chaining. When the user object has no \`settings\` property, the chain short-circuits to \`undefined\` -- but there is no fallback.`,
    hints: [
      'What does `this.user?.settings?.unitSystem` evaluate to when `settings` is `undefined`?',
      'Optional chaining (`?.`) returns `undefined` when the chain breaks. The code needs a fallback value.',
      'Add `?? "metric"` at the end: `this.user?.settings?.unitSystem ?? "metric"` to provide a default.',
    ],
    files: [
      {
        filename: 'WorkoutCardModel.ts',
        language: 'typescript',
        buggyCode: `interface UserSettings {
  unitSystem?: string;
  theme?: string;
}

interface UserProfile {
  id: string;
  name: string;
  settings?: UserSettings;
}

interface WorkoutData {
  id: string;
  name: string;
  duration: number;
  caloriesBurned: number;
  sets: { exerciseId: string; reps: number; weight: number }[];
  completedAt: Date;
}

export class WorkoutCardModel {
  constructor(
    private workout: WorkoutData,
    private user?: UserProfile
  ) {}

  get id(): string {
    return this.workout.id;
  }

  get title(): string {
    return this.workout.name;
  }

  get userName(): string {
    return this.user?.name ?? "Unknown User";
  }

  get unitSystem(): string | undefined {
    return this.user?.settings?.unitSystem;
  }

  get formattedWeight(): string {
    const unit = this.unitSystem;
    if (unit === "metric") return "kg";
    if (unit === "imperial") return "lbs";
    return "";
  }

  get calories(): number {
    return this.workout.caloriesBurned;
  }

  get setCount(): number {
    return this.workout.sets.length;
  }
}`,
        solutionCode: `interface UserSettings {
  unitSystem?: string;
  theme?: string;
}

interface UserProfile {
  id: string;
  name: string;
  settings?: UserSettings;
}

interface WorkoutData {
  id: string;
  name: string;
  duration: number;
  caloriesBurned: number;
  sets: { exerciseId: string; reps: number; weight: number }[];
  completedAt: Date;
}

export class WorkoutCardModel {
  constructor(
    private workout: WorkoutData,
    private user?: UserProfile
  ) {}

  get id(): string {
    return this.workout.id;
  }

  get title(): string {
    return this.workout.name;
  }

  get userName(): string {
    return this.user?.name ?? "Unknown User";
  }

  get unitSystem(): string {
    return this.user?.settings?.unitSystem ?? "metric";
  }

  get formattedWeight(): string {
    const unit = this.unitSystem;
    if (unit === "metric") return "kg";
    if (unit === "imperial") return "lbs";
    return "";
  }

  get calories(): number {
    return this.workout.caloriesBurned;
  }

  get setCount(): number {
    return this.workout.sets.length;
  }
}`,
      },
    ],
    testFiles: [
      {
        filename: 'WorkoutCardModel.test.ts',
        language: 'typescript',
        code: `import { WorkoutCardModel } from "./WorkoutCardModel";

const sampleWorkout = {
  id: "w1",
  name: "Morning Strength",
  duration: 3600,
  caloriesBurned: 450,
  sets: [
    { exerciseId: "ex1", reps: 10, weight: 80 },
    { exerciseId: "ex2", reps: 8, weight: 100 },
  ],
  completedAt: new Date("2024-11-15"),
};

describe("WorkoutCardModel - unitSystem default", () => {
  it("returns 'metric' when user has no settings", () => {
    const model = new WorkoutCardModel(sampleWorkout, { id: "u1", name: "Alice" });
    expect(model.unitSystem).toBe("metric");
  });

  it("returns 'metric' when user is undefined", () => {
    const model = new WorkoutCardModel(sampleWorkout);
    expect(model.unitSystem).toBe("metric");
  });

  it("returns 'imperial' when user has imperial setting", () => {
    const model = new WorkoutCardModel(sampleWorkout, {
      id: "u2",
      name: "Bob",
      settings: { unitSystem: "imperial" },
    });
    expect(model.unitSystem).toBe("imperial");
  });

  it("formattedWeight returns 'kg' for default metric", () => {
    const model = new WorkoutCardModel(sampleWorkout, { id: "u1", name: "Alice" });
    expect(model.formattedWeight).toBe("kg");
  });

  it("formattedWeight returns 'lbs' for imperial", () => {
    const model = new WorkoutCardModel(sampleWorkout, {
      id: "u2",
      name: "Bob",
      settings: { unitSystem: "imperial" },
    });
    expect(model.formattedWeight).toBe("lbs");
  });

  it("returns 'metric' when settings exist but unitSystem is undefined", () => {
    const model = new WorkoutCardModel(sampleWorkout, {
      id: "u3",
      name: "Charlie",
      settings: { theme: "dark" },
    });
    expect(model.unitSystem).toBe("metric");
  });
});`,
      },
    ],
    solutionExplanation: `### Root Cause

The \`unitSystem\` getter uses optional chaining (\`?.\`) to safely access \`this.user?.settings?.unitSystem\`. When the user has no \`settings\` object, the chain short-circuits and returns \`undefined\`. But there is no fallback value, so \`formattedWeight\` sees \`undefined\` and returns an empty string instead of \`"kg"\`.

\`\`\`typescript
get unitSystem(): string | undefined {
  return this.user?.settings?.unitSystem; // undefined when settings missing
}
\`\`\`

### Fix

Add the nullish coalescing operator to provide a default:

\`\`\`typescript
get unitSystem(): string {
  return this.user?.settings?.unitSystem ?? "metric";
}
\`\`\``,
  },

  // -----------------------------------------------------------------------
  // Bug 7: Numeric Enum vs String Comparison
  // -----------------------------------------------------------------------
  {
    id: 'react-fitness-7',
    project: 'react-fitness',
    projectLabel: 'React Fitness',
    bugNumber: 7,
    title: 'Exercise Type Filter Shows Zero Results',
    difficulty: 'medium',
    category: 'enum-mismatch',
    language: 'typescript',
    symptom: `### Symptom

Selecting any exercise type (Strength, Cardio, Flexibility, etc.) in the filter dropdown always shows **zero exercises**, even though the exercise list clearly has items of that type. The "All Types" option works correctly.

### Expected

Selecting "Strength" should show only strength exercises, "Cardio" should show only cardio exercises, etc.

### What you know

The \`ExerciseType\` enum is defined as a numeric enum (\`Strength = 0\`, \`Cardio = 1\`, etc.). The filter compares exercise types using \`===\`. The exercise data comes from an API that returns type values as strings like \`"strength"\`.`,
    hints: [
      'What is the runtime value of `ExerciseType.Strength`? Is it `"strength"` or `0`?',
      'Numeric enums have numeric values at runtime: `ExerciseType.Strength === 0`. The API returns `"strength"`. So `"strength" === 0` is always `false`.',
      'Change the enum to a string enum (`Strength = "strength"`) so that comparisons work with the API response strings.',
    ],
    files: [
      {
        filename: 'ExerciseFilter.ts',
        language: 'typescript',
        buggyCode: `
enum ExerciseType {
  Strength = 0,
  Cardio = 1,
  Flexibility = 2,
  Balance = 3,
  HIIT = 4,
}

interface ExerciseData {
  id: string;
  name: string;
  type: string; // API returns string like "strength", "cardio"
  muscleGroup: string;
}

const ALL_EXERCISES: ExerciseData[] = [
  { id: "ex1", name: "Bench Press", type: "strength", muscleGroup: "chest" },
  { id: "ex2", name: "Squat", type: "strength", muscleGroup: "legs" },
  { id: "ex3", name: "Running", type: "cardio", muscleGroup: "full body" },
  { id: "ex4", name: "Cycling", type: "cardio", muscleGroup: "legs" },
  { id: "ex5", name: "Yoga", type: "flexibility", muscleGroup: "full body" },
  { id: "ex6", name: "Burpees", type: "hiit", muscleGroup: "full body" },
  { id: "ex7", name: "Deadlift", type: "strength", muscleGroup: "back" },
];

export function filterByType(
  exercises: ExerciseData[],
  selectedType: string
): ExerciseData[] {
  if (!selectedType) return exercises;

  return exercises.filter((ex) => {
    switch (selectedType) {
      case "strength":
        return ex.type === ExerciseType.Strength;
      case "cardio":
        return ex.type === ExerciseType.Cardio;
      case "flexibility":
        return ex.type === ExerciseType.Flexibility;
      case "balance":
        return ex.type === ExerciseType.Balance;
      case "hiit":
        return ex.type === ExerciseType.HIIT;
      default:
        return true;
    }
  });
}

export function getAllExercises(): ExerciseData[] {
  return ALL_EXERCISES;
}`,
        solutionCode: `
enum ExerciseType {
  Strength = "strength",
  Cardio = "cardio",
  Flexibility = "flexibility",
  Balance = "balance",
  HIIT = "hiit",
}

interface ExerciseData {
  id: string;
  name: string;
  type: string; // API returns string like "strength", "cardio"
  muscleGroup: string;
}

const ALL_EXERCISES: ExerciseData[] = [
  { id: "ex1", name: "Bench Press", type: "strength", muscleGroup: "chest" },
  { id: "ex2", name: "Squat", type: "strength", muscleGroup: "legs" },
  { id: "ex3", name: "Running", type: "cardio", muscleGroup: "full body" },
  { id: "ex4", name: "Cycling", type: "cardio", muscleGroup: "legs" },
  { id: "ex5", name: "Yoga", type: "flexibility", muscleGroup: "full body" },
  { id: "ex6", name: "Burpees", type: "hiit", muscleGroup: "full body" },
  { id: "ex7", name: "Deadlift", type: "strength", muscleGroup: "back" },
];

export function filterByType(
  exercises: ExerciseData[],
  selectedType: string
): ExerciseData[] {
  if (!selectedType) return exercises;

  return exercises.filter((ex) => {
    switch (selectedType) {
      case "strength":
        return ex.type === ExerciseType.Strength;
      case "cardio":
        return ex.type === ExerciseType.Cardio;
      case "flexibility":
        return ex.type === ExerciseType.Flexibility;
      case "balance":
        return ex.type === ExerciseType.Balance;
      case "hiit":
        return ex.type === ExerciseType.HIIT;
      default:
        return true;
    }
  });
}

export function getAllExercises(): ExerciseData[] {
  return ALL_EXERCISES;
}`,
      },
    ],
    testFiles: [
      {
        filename: 'ExerciseFilter.test.ts',
        language: 'typescript',
        code: `import { filterByType, getAllExercises } from "./ExerciseFilter";

describe("ExerciseFilter - type filtering", () => {
  const exercises = getAllExercises();

  it("returns all exercises when no type is selected", () => {
    expect(filterByType(exercises, "")).toHaveLength(7);
  });

  it("filters strength exercises correctly", () => {
    const result = filterByType(exercises, "strength");
    expect(result.length).toBe(3);
    expect(result.every((ex) => ex.type === "strength")).toBe(true);
  });

  it("filters cardio exercises correctly", () => {
    const result = filterByType(exercises, "cardio");
    expect(result.length).toBe(2);
    expect(result.every((ex) => ex.type === "cardio")).toBe(true);
  });

  it("filters flexibility exercises correctly", () => {
    const result = filterByType(exercises, "flexibility");
    expect(result.length).toBe(1);
    expect(result[0].name).toBe("Yoga");
  });

  it("filters hiit exercises correctly", () => {
    const result = filterByType(exercises, "hiit");
    expect(result.length).toBe(1);
    expect(result[0].name).toBe("Burpees");
  });

  it("returns empty for a type with no matching exercises", () => {
    const result = filterByType(exercises, "balance");
    expect(result).toHaveLength(0);
  });
});`,
      },
    ],
    solutionExplanation: `### Root Cause

\`ExerciseType\` is a **numeric** enum:

\`\`\`typescript
enum ExerciseType {
  Strength = 0,  // runtime value is 0
  Cardio = 1,    // runtime value is 1
  // ...
}
\`\`\`

The API returns exercise types as **strings** like \`"strength"\`. The filter compares \`ex.type === ExerciseType.Strength\` which is \`"strength" === 0\` -- always \`false\`.

### Fix

Change to a **string enum** so the values match the API response:

\`\`\`typescript
enum ExerciseType {
  Strength = "strength",
  Cardio = "cardio",
  Flexibility = "flexibility",
  Balance = "balance",
  HIIT = "hiit",
}
\`\`\``,
  },

  // -----------------------------------------------------------------------
  // Bug 8: Array Index as Key
  // -----------------------------------------------------------------------
  {
    id: 'react-fitness-8',
    project: 'react-fitness',
    projectLabel: 'React Fitness',
    bugNumber: 8,
    title: 'Exercise Notes Get Jumbled After Reordering',
    difficulty: 'medium',
    category: 'list-key',
    language: 'typescript',
    symptom: `### Symptom

When the user types notes for specific exercises and then reorders the list (move up/move down), the **note text stays in the original position** instead of moving with its exercise. For example, if "Bench Press" has the note "increase weight", moving it down causes "Squat" to show "increase weight" instead.

### Expected

Notes should stay attached to their exercise when the list is reordered.

### What you know

The exercise list renders items in a loop. Each item has an input field for notes. When the user reorders items, the notes seem "stuck" to their position rather than following the exercise data.`,
    hints: [
      'How are list items identified when the list is reordered? Check the `key` used for each item.',
      'Using array index as `key` means React thinks the item at position 0 is always the "same" item. When you swap positions, React reuses the DOM node at that index.',
      'Use a stable unique identifier (like `exercise.id`) as the key instead of the array index.',
    ],
    files: [
      {
        filename: 'ExerciseList.ts',
        language: 'typescript',
        buggyCode: `interface ExerciseData {
  id: string;
  name: string;
  type: string;
  muscleGroup: string;
}

interface RenderedItem {
  key: string | number;
  exercise: ExerciseData;
  noteValue: string;
}

/**
 * Simulates a React list component that uses keys for reconciliation.
 * When items are reordered, React matches old and new items by key.
 * If keys are stable (e.g. exercise.id), state follows the item.
 * If keys are positional (e.g. index), state stays at the DOM position.
 */
export function createExerciseList(exercises: ExerciseData[]) {
  let items = [...exercises];
  const notes: Map<string | number, string> = new Map();

  function getRenderedItems(): RenderedItem[] {
    return items.map((exercise, index) => {
      const key = index;

      if (!notes.has(key)) {
        notes.set(key, "");
      }

      return {
        key,
        exercise,
        noteValue: notes.get(key) ?? "",
      };
    });
  }

  function setNote(key: string | number, value: string) {
    notes.set(key, value);
  }

  function moveUp(index: number) {
    if (index === 0) return;
    const newItems = [...items];
    [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
    items = newItems;
  }

  function moveDown(index: number) {
    if (index === items.length - 1) return;
    const newItems = [...items];
    [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
    items = newItems;
  }

  return { getRenderedItems, setNote, moveUp, moveDown };
}`,
        solutionCode: `interface ExerciseData {
  id: string;
  name: string;
  type: string;
  muscleGroup: string;
}

interface RenderedItem {
  key: string | number;
  exercise: ExerciseData;
  noteValue: string;
}

/**
 * Simulates a React list component that uses keys for reconciliation.
 * When items are reordered, React matches old and new items by key.
 * If keys are stable (e.g. exercise.id), state follows the item.
 * If keys are positional (e.g. index), state stays at the DOM position.
 */
export function createExerciseList(exercises: ExerciseData[]) {
  let items = [...exercises];
  const notes: Map<string | number, string> = new Map();

  function getRenderedItems(): RenderedItem[] {
    return items.map((exercise) => {
      const key = exercise.id;

      if (!notes.has(key)) {
        notes.set(key, "");
      }

      return {
        key,
        exercise,
        noteValue: notes.get(key) ?? "",
      };
    });
  }

  function setNote(key: string | number, value: string) {
    notes.set(key, value);
  }

  function moveUp(index: number) {
    if (index === 0) return;
    const newItems = [...items];
    [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
    items = newItems;
  }

  function moveDown(index: number) {
    if (index === items.length - 1) return;
    const newItems = [...items];
    [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
    items = newItems;
  }

  return { getRenderedItems, setNote, moveUp, moveDown };
}`,
      },
    ],
    testFiles: [
      {
        filename: 'ExerciseList.test.ts',
        language: 'typescript',
        code: `import { createExerciseList } from "./ExerciseList";

const exercises = [
  { id: "ex1", name: "Bench Press", type: "strength", muscleGroup: "chest" },
  { id: "ex2", name: "Squat", type: "strength", muscleGroup: "legs" },
  { id: "ex3", name: "Running", type: "cardio", muscleGroup: "full body" },
];

describe("ExerciseList - key-based reconciliation", () => {
  it("renders items in correct order", () => {
    const list = createExerciseList(exercises);
    const items = list.getRenderedItems();
    expect(items[0].exercise.name).toBe("Bench Press");
    expect(items[1].exercise.name).toBe("Squat");
    expect(items[2].exercise.name).toBe("Running");
  });

  it("note stays with exercise after moveDown", () => {
    const list = createExerciseList(exercises);

    // Set a note on Bench Press (index 0)
    const itemsBefore = list.getRenderedItems();
    list.setNote(itemsBefore[0].key, "increase weight");

    // Move Bench Press down (from index 0 to index 1)
    list.moveDown(0);

    const itemsAfter = list.getRenderedItems();
    // Bench Press is now at index 1
    expect(itemsAfter[1].exercise.name).toBe("Bench Press");
    expect(itemsAfter[1].noteValue).toBe("increase weight");
  });

  it("note stays with exercise after moveUp", () => {
    const list = createExerciseList(exercises);

    // Set a note on Running (index 2)
    const itemsBefore = list.getRenderedItems();
    list.setNote(itemsBefore[2].key, "5k pace");

    // Move Running up (from index 2 to index 1)
    list.moveUp(2);

    const itemsAfter = list.getRenderedItems();
    // Running is now at index 1
    expect(itemsAfter[1].exercise.name).toBe("Running");
    expect(itemsAfter[1].noteValue).toBe("5k pace");
  });

  it("swapped items both keep their notes", () => {
    const list = createExerciseList(exercises);

    const items = list.getRenderedItems();
    list.setNote(items[0].key, "note-A");
    list.setNote(items[1].key, "note-B");

    list.moveDown(0); // swap index 0 and 1

    const after = list.getRenderedItems();
    // Squat is now at index 0, Bench Press at index 1
    expect(after[0].exercise.name).toBe("Squat");
    expect(after[0].noteValue).toBe("note-B");
    expect(after[1].exercise.name).toBe("Bench Press");
    expect(after[1].noteValue).toBe("note-A");
  });

  it("unset notes remain empty after reorder", () => {
    const list = createExerciseList(exercises);

    list.getRenderedItems(); // initialize
    list.moveDown(0);

    const after = list.getRenderedItems();
    expect(after[0].noteValue).toBe("");
    expect(after[1].noteValue).toBe("");
  });
});`,
      },
    ],
    solutionExplanation: `### Root Cause

The list uses \`index\` as the key for each rendered item. When items are reordered, the key at position 0 is still \`0\`, position 1 is still \`1\`, etc. React (and our simulation) matches items by key, so the **notes stay at their original index position** rather than following the exercise they belong to.

\`\`\`typescript
const key = index;
\`\`\`

### Fix

Use a stable unique identifier as the key:

\`\`\`typescript
const key = exercise.id;
\`\`\``,
  },

  // -----------------------------------------------------------------------
  // Bug 9: Inline Handler Defeats React.memo
  // -----------------------------------------------------------------------
  {
    id: 'react-fitness-9',
    project: 'react-fitness',
    projectLabel: 'React Fitness',
    bugNumber: 9,
    title: 'Memoized ExerciseItem Re-renders on Every Parent Render',
    difficulty: 'hard',
    category: 'memoization',
    language: 'typescript',
    symptom: `### Symptom

Despite wrapping \`ExerciseItem\` with \`React.memo\`, it re-renders on **every** parent render. The render counter increases even when the item's data hasn't changed. Simply selecting a different item causes all items to re-render.

### Expected

A memoized component should skip re-renders when its props haven't changed. Only the item whose selection state changes should re-render.

### What you know

The parent component creates a \`handleSelect\` function inline (without \`useCallback\`). This function is passed as the \`onSelect\` prop to memoized children. The parent re-renders when selection state changes.`,
    hints: [
      'What does `React.memo` compare to decide whether to skip re-rendering? It compares props by reference.',
      'The `handleSelect` function is defined inline in the parent. Every render creates a new function object, which is a new reference.',
      'Wrap `handleSelect` with `useCallback` (or in our simulation, create it once and reuse the same reference) so that the function reference stays stable across renders.',
    ],
    files: [
      {
        filename: 'ExerciseListMemo.ts',
        language: 'typescript',
        buggyCode: `interface ExerciseData {
  id: string;
  name: string;
  type: string;
}

interface ExerciseItemProps {
  exercise: ExerciseData;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

/**
 * Simulates React.memo: compares previous and current props by reference.
 * Only calls render if at least one prop changed (by ===).
 */
function createMemoComponent<P extends Record<string, unknown>>(
  render: (props: P) => string
): (props: P) => { output: string; didRender: boolean } {
  let lastProps: P | null = null;
  let lastOutput = "";

  return (props: P) => {
    if (lastProps !== null) {
      const keys = Object.keys(props) as (keyof P)[];
      const allSame = keys.every((key) => props[key] === lastProps![key]);

      if (allSame) {
        return { output: lastOutput, didRender: false };
      }
    }

    lastOutput = render(props);
    lastProps = { ...props };
    return { output: lastOutput, didRender: true };
  };
}

const MemoizedExerciseItem = createMemoComponent<ExerciseItemProps>(
  (props) => \`\${props.exercise.name} [\${props.isSelected ? "selected" : ""}]\`
);

export function createExerciseListWithMemo(exercises: ExerciseData[]) {
  let selectedIds = new Set<string>();
  let totalRenderCount = 0;

  /**
   * Simulates a "render" of the parent component.
   * In React, this function body runs on every render.
   */
  function render() {
    const handleSelect = (id: string) => {
      const next = new Set(selectedIds);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      selectedIds = next;
    };

    const results = exercises.map((exercise) => {
      const result = MemoizedExerciseItem({
        exercise,
        isSelected: selectedIds.has(exercise.id),
        onSelect: handleSelect, // New reference every render!
      });
      if (result.didRender) totalRenderCount++;
      return result;
    });

    return results;
  }

  function select(id: string) {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    selectedIds = next;
  }

  function getRenderCount() {
    return totalRenderCount;
  }

  return { render, select, getRenderCount };
}`,
        solutionCode: `interface ExerciseData {
  id: string;
  name: string;
  type: string;
}

interface ExerciseItemProps {
  exercise: ExerciseData;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

/**
 * Simulates React.memo: compares previous and current props by reference.
 * Only calls render if at least one prop changed (by ===).
 */
function createMemoComponent<P extends Record<string, unknown>>(
  render: (props: P) => string
): (props: P) => { output: string; didRender: boolean } {
  let lastProps: P | null = null;
  let lastOutput = "";

  return (props: P) => {
    if (lastProps !== null) {
      const keys = Object.keys(props) as (keyof P)[];
      const allSame = keys.every((key) => props[key] === lastProps![key]);

      if (allSame) {
        return { output: lastOutput, didRender: false };
      }
    }

    lastOutput = render(props);
    lastProps = { ...props };
    return { output: lastOutput, didRender: true };
  };
}

const MemoizedExerciseItem = createMemoComponent<ExerciseItemProps>(
  (props) => \`\${props.exercise.name} [\${props.isSelected ? "selected" : ""}]\`
);

export function createExerciseListWithMemo(exercises: ExerciseData[]) {
  let selectedIds = new Set<string>();
  let totalRenderCount = 0;

  // so the function reference is stable across renders
  const handleSelect = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    selectedIds = next;
  };

  function render() {
    const results = exercises.map((exercise) => {
      const result = MemoizedExerciseItem({
        exercise,
        isSelected: selectedIds.has(exercise.id),
        onSelect: handleSelect, // Same reference every render!
      });
      if (result.didRender) totalRenderCount++;
      return result;
    });

    return results;
  }

  function select(id: string) {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    selectedIds = next;
  }

  function getRenderCount() {
    return totalRenderCount;
  }

  return { render, select, getRenderCount };
}`,
      },
    ],
    testFiles: [
      {
        filename: 'ExerciseListMemo.test.ts',
        language: 'typescript',
        code: `import { createExerciseListWithMemo } from "./ExerciseListMemo";

const exercises = [
  { id: "ex1", name: "Bench Press", type: "strength" },
  { id: "ex2", name: "Squat", type: "strength" },
  { id: "ex3", name: "Running", type: "cardio" },
];

describe("ExerciseListMemo - useCallback for stable handler", () => {
  it("renders all items on first render", () => {
    const list = createExerciseListWithMemo(exercises);
    list.render();
    expect(list.getRenderCount()).toBe(3);
  });

  it("does NOT re-render unchanged items on second render", () => {
    const list = createExerciseListWithMemo(exercises);
    list.render(); // first render: all 3 render
    const countAfterFirst = list.getRenderCount();

    list.render(); // second render: nothing changed
    const countAfterSecond = list.getRenderCount();

    expect(countAfterSecond).toBe(countAfterFirst);
  });

  it("only re-renders the item whose selection changed", () => {
    const list = createExerciseListWithMemo(exercises);
    list.render(); // first render: 3 renders
    const countAfterFirst = list.getRenderCount();

    list.select("ex1"); // select Bench Press
    list.render();
    const countAfterSelect = list.getRenderCount();

    // Only 1 item (ex1) changed isSelected, so only 1 re-render
    expect(countAfterSelect).toBe(countAfterFirst + 1);
  });

  it("deselecting also re-renders only the affected item", () => {
    const list = createExerciseListWithMemo(exercises);
    list.render();
    list.select("ex2");
    list.render();
    const countAfterSelect = list.getRenderCount();

    list.select("ex2"); // deselect
    list.render();
    const countAfterDeselect = list.getRenderCount();

    expect(countAfterDeselect).toBe(countAfterSelect + 1);
  });

  it("render with no changes produces zero additional renders", () => {
    const list = createExerciseListWithMemo(exercises);
    list.render();
    list.render();
    list.render();
    // Only first render should produce 3, subsequent renders should produce 0
    expect(list.getRenderCount()).toBe(3);
  });
});`,
      },
    ],
    solutionExplanation: `### Root Cause

\`React.memo\` compares props by reference (\`===\`). The parent component creates \`handleSelect\` as an inline arrow function inside its render body. Every render produces a **new function reference**, so \`React.memo\` sees \`onSelect\` as changed and re-renders every child.

\`\`\`typescript
function render() {
  // New function reference every render!
  const handleSelect = (id: string) => { ... };
  // ...
}
\`\`\`

### Fix

Define \`handleSelect\` once outside the render function (simulating \`useCallback\` with an empty dependency array) so it maintains a stable reference:

\`\`\`typescript
// Created once -- same reference every render
const handleSelect = (id: string) => { ... };

function render() {
  // handleSelect is the same reference, memo skips re-render
}
\`\`\``,
  },

  // -----------------------------------------------------------------------
  // Bug 10: Synthetic Event in setTimeout
  // -----------------------------------------------------------------------
  {
    id: 'react-fitness-10',
    project: 'react-fitness',
    projectLabel: 'React Fitness',
    bugNumber: 10,
    title: 'Search Bar Debounce Always Sends Empty String',
    difficulty: 'medium',
    category: 'event-pooling',
    language: 'typescript',
    symptom: `### Symptom

The search bar has a debounce mechanism -- it waits 300ms after the user stops typing before calling \`onSearch\`. But \`onSearch\` always receives **an empty string** or \`null\`, regardless of what the user typed.

### Expected

After the debounce delay, \`onSearch\` should be called with the text the user typed.

### What you know

The event handler reads \`e.target.value\` inside a \`setTimeout\`. In React versions before 17, synthetic events are pooled and recycled -- accessing event properties asynchronously returns null. Even in newer React, reading from the event in an async context is unreliable.`,
    hints: [
      'Where is `e.target.value` being read -- synchronously or inside the `setTimeout`?',
      'React synthetic events are recycled after the event handler returns. By the time `setTimeout` fires, `e.target` is null.',
      'Capture the value synchronously in a local variable before the `setTimeout`: `const value = e.target.value;`',
    ],
    files: [
      {
        filename: 'SearchBar.ts',
        language: 'typescript',
        buggyCode: `/**
 * Simulates React's synthetic event pooling behavior.
 * After the event handler returns, the event object is recycled:
 * all properties are set to null.
 */
interface SyntheticEvent {
  target: { value: string } | null;
}

function createSyntheticEvent(value: string): SyntheticEvent {
  const event: SyntheticEvent = { target: { value } };

  // Simulate React's event pooling: after handler returns,
  // the event object is recycled and properties become null
  Promise.resolve().then(() => {
    event.target = null;
  });

  return event;
}

export function createSearchBar(
  onSearch: (query: string) => void,
  debounceMs: number = 300
) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  function handleChange(inputValue: string) {
    if (timeoutId) clearTimeout(timeoutId);

    // Create a synthetic event (simulates what React passes)
    const e = createSyntheticEvent(inputValue);

    // by then, the synthetic event has been recycled and e.target is null
    timeoutId = setTimeout(() => {
      onSearch(e.target?.value ?? "");
    }, debounceMs);
  }

  return { handleChange };
}`,
        solutionCode: `/**
 * Simulates React's synthetic event pooling behavior.
 * After the event handler returns, the event object is recycled:
 * all properties are set to null.
 */
interface SyntheticEvent {
  target: { value: string } | null;
}

function createSyntheticEvent(value: string): SyntheticEvent {
  const event: SyntheticEvent = { target: { value } };

  // Simulate React's event pooling: after handler returns,
  // the event object is recycled and properties become null
  Promise.resolve().then(() => {
    event.target = null;
  });

  return event;
}

export function createSearchBar(
  onSearch: (query: string) => void,
  debounceMs: number = 300
) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  function handleChange(inputValue: string) {
    if (timeoutId) clearTimeout(timeoutId);

    // Create a synthetic event (simulates what React passes)
    const e = createSyntheticEvent(inputValue);

    const value = e.target?.value ?? "";

    timeoutId = setTimeout(() => {
      onSearch(value);
    }, debounceMs);
  }

  return { handleChange };
}`,
      },
    ],
    testFiles: [
      {
        filename: 'SearchBar.test.ts',
        language: 'typescript',
        code: `import { createSearchBar } from "./SearchBar";

describe("SearchBar - debounced search with event pooling", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllTimers();
  });

  it("calls onSearch with the typed value after debounce", async () => {
    let searchedValue = "";
    const bar = createSearchBar((q) => { searchedValue = q; }, 300);

    bar.handleChange("bench press");

    // Let microtasks run (event pooling)
    await Promise.resolve();

    vi.advanceTimersByTime(300);
    expect(searchedValue).toBe("bench press");
  });

  it("does not call onSearch before debounce time", async () => {
    let called = false;
    const bar = createSearchBar(() => { called = true; }, 300);

    bar.handleChange("squat");
    await Promise.resolve();

    vi.advanceTimersByTime(100);
    expect(called).toBe(false);
  });

  it("only fires once after rapid typing", async () => {
    let callCount = 0;
    let lastValue = "";
    const bar = createSearchBar((q) => { callCount++; lastValue = q; }, 300);

    bar.handleChange("b");
    await Promise.resolve();
    vi.advanceTimersByTime(100);

    bar.handleChange("be");
    await Promise.resolve();
    vi.advanceTimersByTime(100);

    bar.handleChange("bench");
    await Promise.resolve();
    vi.advanceTimersByTime(300);

    expect(callCount).toBe(1);
    expect(lastValue).toBe("bench");
  });

  it("search value is not empty or null after event recycling", async () => {
    let searchedValue: string | null = null;
    const bar = createSearchBar((q) => { searchedValue = q; }, 100);

    bar.handleChange("deadlift");

    // Wait for event to be recycled (microtask)
    await Promise.resolve();
    await Promise.resolve();

    // Now fire the timeout -- event.target is already null
    vi.advanceTimersByTime(100);
    expect(searchedValue).toBe("deadlift");
  });
});`,
      },
    ],
    solutionExplanation: `### Root Cause

React recycles synthetic events after the event handler returns (event pooling). The code reads \`e.target.value\` inside a \`setTimeout\`. By the time the timeout fires, \`e.target\` has been set to \`null\` and the value is lost.

\`\`\`typescript
timeoutId = setTimeout(() => {
  onSearch(e.target?.value ?? "");
}, debounceMs);
\`\`\`

### Fix

Capture the value **synchronously** before the event is recycled:

\`\`\`typescript
const value = e.target?.value ?? ""; // Capture immediately
timeoutId = setTimeout(() => {
  onSearch(value); // Use the captured value
}, debounceMs);
\`\`\``,
  },

  // -----------------------------------------------------------------------
  // Bug 11: Test Asserts Wrong Value
  // -----------------------------------------------------------------------
  {
    id: 'react-fitness-11',
    project: 'react-fitness',
    projectLabel: 'React Fitness',
    bugNumber: 11,
    title: 'Calories Burned Returns Zero Without Body Weight',
    difficulty: 'easy',
    category: 'default-parameter',
    language: 'typescript',
    symptom: `### Symptom

Calling \`calculateCaloriesBurned(30, 12)\` (30 minutes, 12 cal/min) returns **0** instead of the expected **360**. The function works correctly only when a third argument (body weight) is explicitly provided.

### Expected

When no body weight is specified, the function should assume a default of 70 kg (average adult) and calculate calories normally: \`30 * 12 * (70 / 70) = 360\`.

### What you know

The function has a default parameter \`bodyWeight = 0\`. The formula multiplies by \`(bodyWeight / 70)\`. With bodyWeight = 0, the result is always 0. The test also expects 0 -- it was written to match the buggy behavior.`,
    hints: [
      'What is the default value of `bodyWeight`? What happens when you divide 0 by 70?',
      'The default is `bodyWeight = 0`. The formula `duration * calPerMin * (0 / 70)` always equals 0.',
      'Change the default to `bodyWeight = 70` so that omitting the argument produces a meaningful result.',
    ],
    files: [
      {
        filename: 'calorieUtils.ts',
        language: 'typescript',
        buggyCode: `/**
 * Calculates estimated calories burned during a workout.
 *
 * @param durationMinutes - How long the workout lasted (in minutes)
 * @param caloriesPerMinute - Base calorie burn rate for the exercise type
 * @param bodyWeight - User's body weight in kg (scales the result relative to 70 kg)
 */
export function calculateCaloriesBurned(
  durationMinutes: number,
  caloriesPerMinute: number,
  bodyWeight: number = 0
): number {
  return Math.round(durationMinutes * caloriesPerMinute * (bodyWeight / 70));
}

export function formatCalories(calories: number): string {
  if (calories >= 1000) {
    return \`\${(calories / 1000).toFixed(1)}k cal\`;
  }
  return \`\${calories} cal\`;
}

export function estimateWorkoutCalories(
  exercises: { durationMinutes: number; caloriesPerMinute: number }[],
  bodyWeight?: number
): number {
  return exercises.reduce(
    (total, ex) =>
      total + calculateCaloriesBurned(ex.durationMinutes, ex.caloriesPerMinute, bodyWeight),
    0
  );
}`,
        solutionCode: `/**
 * Calculates estimated calories burned during a workout.
 *
 * @param durationMinutes - How long the workout lasted (in minutes)
 * @param caloriesPerMinute - Base calorie burn rate for the exercise type
 * @param bodyWeight - User's body weight in kg (scales the result relative to 70 kg)
 */
export function calculateCaloriesBurned(
  durationMinutes: number,
  caloriesPerMinute: number,
  bodyWeight: number = 70
): number {
  return Math.round(durationMinutes * caloriesPerMinute * (bodyWeight / 70));
}

export function formatCalories(calories: number): string {
  if (calories >= 1000) {
    return \`\${(calories / 1000).toFixed(1)}k cal\`;
  }
  return \`\${calories} cal\`;
}

export function estimateWorkoutCalories(
  exercises: { durationMinutes: number; caloriesPerMinute: number }[],
  bodyWeight?: number
): number {
  return exercises.reduce(
    (total, ex) =>
      total + calculateCaloriesBurned(ex.durationMinutes, ex.caloriesPerMinute, bodyWeight),
    0
  );
}`,
      },
    ],
    testFiles: [
      {
        filename: 'calorieUtils.test.ts',
        language: 'typescript',
        code: `import { calculateCaloriesBurned, formatCalories, estimateWorkoutCalories } from "./calorieUtils";

describe("calculateCaloriesBurned", () => {
  it("calculates correctly with default body weight (no third arg)", () => {
    // 30 min * 12 cal/min * (70/70) = 360
    const result = calculateCaloriesBurned(30, 12);
    expect(result).toBe(360);
  });

  it("calculates correctly with explicit body weight of 70 kg", () => {
    const result = calculateCaloriesBurned(30, 12, 70);
    expect(result).toBe(360);
  });

  it("adjusts for lighter person (56 kg)", () => {
    // 30 * 12 * (56/70) = 288
    const result = calculateCaloriesBurned(30, 12, 56);
    expect(result).toBe(288);
  });

  it("adjusts for heavier person (84 kg)", () => {
    // 30 * 12 * (84/70) = 432
    const result = calculateCaloriesBurned(30, 12, 84);
    expect(result).toBe(432);
  });

  it("returns 0 for 0-minute workout", () => {
    const result = calculateCaloriesBurned(0, 12);
    expect(result).toBe(0);
  });
});

describe("estimateWorkoutCalories", () => {
  it("sums calories across multiple exercises with default weight", () => {
    const exercises = [
      { durationMinutes: 10, caloriesPerMinute: 8 },
      { durationMinutes: 20, caloriesPerMinute: 12 },
    ];
    // (10*8) + (20*12) = 80 + 240 = 320
    const result = estimateWorkoutCalories(exercises);
    expect(result).toBe(320);
  });
});`,
      },
    ],
    solutionExplanation: `### Root Cause

The default value for \`bodyWeight\` is \`0\`:

\`\`\`typescript
bodyWeight: number = 0
\`\`\`

The formula is \`durationMinutes * caloriesPerMinute * (bodyWeight / 70)\`. With \`bodyWeight = 0\`, the last factor is \`0 / 70 = 0\`, making the entire result 0 regardless of duration or calorie rate.

The test also expects 0, which masks the bug by asserting the wrong value.

### Fix

Change the default to 70 kg (the reference body weight):

\`\`\`typescript
bodyWeight: number = 70
\`\`\`

Now \`calculateCaloriesBurned(30, 12)\` returns \`30 * 12 * (70/70) = 360\`.`,
  },

  // -----------------------------------------------------------------------
  // Bug 12: Race Condition Without AbortController
  // -----------------------------------------------------------------------
  {
    id: 'react-fitness-12',
    project: 'react-fitness',
    projectLabel: 'React Fitness',
    bugNumber: 12,
    title: 'Filter Shows Stale Results From Slow Previous Request',
    difficulty: 'hard',
    category: 'race-condition',
    language: 'typescript',
    symptom: `### Symptom

When the user rapidly switches exercise types (e.g. Strength -> Cardio -> Flexibility), the displayed results sometimes show exercises from a **previously selected type**. For instance, after selecting "Flexibility", the list may suddenly show Cardio exercises because the Cardio request took longer and resolved after the Flexibility request.

### Expected

Only the results from the **most recently selected** type should be displayed. Older requests that resolve late should be discarded.

### What you know

Each filter change triggers an async fetch. There is no mechanism to cancel or ignore stale requests. If request A (slow) resolves after request B (fast), A's stale data overwrites B's correct data.`,
    hints: [
      'When the user changes the filter, a new async request fires. But what happens to the previous in-flight request?',
      'If request A takes 2 seconds and request B takes 500ms, B resolves first and sets the correct data. Then A resolves and overwrites with stale data.',
      'Use a flag or counter to track the latest request. When a response arrives, check if it matches the most recent request before updating state. This is what `AbortController` or a `cancelled` flag achieves.',
    ],
    files: [
      {
        filename: 'ExerciseFilterAsync.ts',
        language: 'typescript',
        buggyCode: `interface ExerciseData {
  id: string;
  name: string;
  type: string;
}

const EXERCISE_DB: ExerciseData[] = [
  { id: "ex1", name: "Bench Press", type: "strength" },
  { id: "ex2", name: "Squat", type: "strength" },
  { id: "ex3", name: "Running", type: "cardio" },
  { id: "ex4", name: "Cycling", type: "cardio" },
  { id: "ex5", name: "Yoga", type: "flexibility" },
  { id: "ex6", name: "Stretching", type: "flexibility" },
  { id: "ex7", name: "Burpees", type: "hiit" },
];

/**
 * Simulates an async API call with variable latency.
 * Different types take different amounts of time to "fetch".
 */
function fetchExercisesByType(
  type: string,
  delayMs: number
): Promise<ExerciseData[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(EXERCISE_DB.filter((ex) => ex.type === type));
    }, delayMs);
  });
}

export function createExerciseFilter() {
  let exercises: ExerciseData[] = [];
  let loading = false;

  async function selectType(type: string, delayMs: number = 100) {
    loading = true;

    const data = await fetchExercisesByType(type, delayMs);

    // If a newer request already completed, this overwrites with stale data!
    exercises = data;
    loading = false;
  }

  function getExercises() {
    return exercises;
  }

  function isLoading() {
    return loading;
  }

  return { selectType, getExercises, isLoading };
}`,
        solutionCode: `interface ExerciseData {
  id: string;
  name: string;
  type: string;
}

const EXERCISE_DB: ExerciseData[] = [
  { id: "ex1", name: "Bench Press", type: "strength" },
  { id: "ex2", name: "Squat", type: "strength" },
  { id: "ex3", name: "Running", type: "cardio" },
  { id: "ex4", name: "Cycling", type: "cardio" },
  { id: "ex5", name: "Yoga", type: "flexibility" },
  { id: "ex6", name: "Stretching", type: "flexibility" },
  { id: "ex7", name: "Burpees", type: "hiit" },
];

/**
 * Simulates an async API call with variable latency.
 * Different types take different amounts of time to "fetch".
 */
function fetchExercisesByType(
  type: string,
  delayMs: number
): Promise<ExerciseData[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(EXERCISE_DB.filter((ex) => ex.type === type));
    }, delayMs);
  });
}

export function createExerciseFilter() {
  let exercises: ExerciseData[] = [];
  let loading = false;
  let requestId = 0;

  async function selectType(type: string, delayMs: number = 100) {
    // Increment counter -- this is the "current" request
    const thisRequestId = ++requestId;
    loading = true;

    const data = await fetchExercisesByType(type, delayMs);

    if (thisRequestId === requestId) {
      exercises = data;
      loading = false;
    }
  }

  function getExercises() {
    return exercises;
  }

  function isLoading() {
    return loading;
  }

  return { selectType, getExercises, isLoading };
}`,
      },
    ],
    testFiles: [
      {
        filename: 'ExerciseFilterAsync.test.ts',
        language: 'typescript',
        code: `import { createExerciseFilter } from "./ExerciseFilterAsync";

describe("ExerciseFilter - race condition handling", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllTimers();
  });

  it("returns correct results for a single request", async () => {
    const filter = createExerciseFilter();
    const promise = filter.selectType("strength", 100);
    vi.advanceTimersByTime(100);
    await promise;

    expect(filter.getExercises()).toHaveLength(2);
    expect(filter.getExercises().every((ex) => ex.type === "strength")).toBe(true);
  });

  it("slow request does NOT overwrite fast request results", async () => {
    const filter = createExerciseFilter();

    // Request A: "strength" with 500ms delay (slow)
    const promiseA = filter.selectType("strength", 500);

    // Request B: "flexibility" with 50ms delay (fast)
    const promiseB = filter.selectType("flexibility", 50);

    // B resolves first
    vi.advanceTimersByTime(50);
    await promiseB;

    expect(filter.getExercises()).toHaveLength(2);
    expect(filter.getExercises().every((ex) => ex.type === "flexibility")).toBe(true);

    // A resolves later -- should NOT overwrite
    vi.advanceTimersByTime(450);
    await promiseA;

    // Should still show flexibility results, not strength
    expect(filter.getExercises().every((ex) => ex.type === "flexibility")).toBe(true);
    expect(filter.getExercises()).toHaveLength(2);
  });

  it("three rapid requests -- only the last one wins", async () => {
    const filter = createExerciseFilter();

    const p1 = filter.selectType("strength", 300);
    const p2 = filter.selectType("cardio", 200);
    const p3 = filter.selectType("hiit", 100);

    // hiit resolves first (100ms)
    vi.advanceTimersByTime(100);
    await p3;
    expect(filter.getExercises()).toHaveLength(1);
    expect(filter.getExercises()[0].type).toBe("hiit");

    // cardio resolves next (200ms) -- should be ignored
    vi.advanceTimersByTime(100);
    await p2;
    expect(filter.getExercises()[0].type).toBe("hiit");

    // strength resolves last (300ms) -- should be ignored
    vi.advanceTimersByTime(100);
    await p1;
    expect(filter.getExercises()[0].type).toBe("hiit");
  });

  it("sequential non-overlapping requests both work", async () => {
    const filter = createExerciseFilter();

    const p1 = filter.selectType("cardio", 50);
    vi.advanceTimersByTime(50);
    await p1;
    expect(filter.getExercises()).toHaveLength(2);

    const p2 = filter.selectType("hiit", 50);
    vi.advanceTimersByTime(50);
    await p2;
    expect(filter.getExercises()).toHaveLength(1);
    expect(filter.getExercises()[0].name).toBe("Burpees");
  });
});`,
      },
    ],
    solutionExplanation: `### Root Cause

Each filter change triggers a new async request, but there is no mechanism to cancel or ignore previous in-flight requests. If request A (slow) resolves after request B (fast), A's stale data **overwrites** B's correct data.

\`\`\`
User selects Strength (request A, 500ms delay)
User selects Flexibility (request B, 50ms delay)

Timeline:
  t=50ms   -> B resolves -> shows Flexibility (correct)
  t=500ms  -> A resolves -> shows Strength (WRONG -- overwrites B)
\`\`\`

### Fix

Track the latest request with a counter. When a response arrives, check if it matches the most recent request before updating state:

\`\`\`typescript
const thisRequestId = ++requestId;
const data = await fetchExercisesByType(type, delayMs);

// Only update if this is still the latest request
if (thisRequestId === requestId) {
  exercises = data;
}
\`\`\`

This is the same principle as using \`AbortController\` or a \`cancelled\` flag in React's \`useEffect\` cleanup.`,
  },
];
