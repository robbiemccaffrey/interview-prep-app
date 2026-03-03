import { DebugExercise } from './types';

// ---------------------------------------------------------------------------
// Course Catalog debug exercises (bugs 1-12)
// ---------------------------------------------------------------------------

export const courseCatalogExercises: DebugExercise[] = [
  // -----------------------------------------------------------------------
  // Bug 1 — Strategy Field Mismatch (type-mismatch, medium)
  // -----------------------------------------------------------------------
  {
    id: 'course-catalog-1',
    project: 'course-catalog',
    projectLabel: 'Course Catalog',
    bugNumber: 1,
    title: 'Strategy Selection Has No Effect',
    difficulty: 'medium',
    category: 'type-mismatch',
    language: 'typescript',
    symptom: `### Symptom

Select "Skill Gap" or "Career Path" from the strategy dropdown and run recommendations. The \`strategyUsed\` field in the response always says \`"popularity"\`, no matter what you choose.

**Expected:** The selected strategy should be used for scoring.

### Context

The frontend sends a POST body to the backend. The shared type \`RecommendRequest\` defines the field name. The backend route handler destructures from the body using that type, and passes it to \`StrategyFactory.create()\`, which falls back to \`"popularity"\` when the value is \`undefined\`.`,
    hints: [
      'Compare what the frontend sends in the POST body with what the backend expects.',
      'Look at the shared type definition for RecommendRequest.',
      'Trace the field name from the frontend API client to the backend route handler. The Zod schema validates "strategyType", but the TypeScript type says "strategyName".',
    ],
    files: [
      {
        filename: 'StrategyRouter.ts',
        language: 'typescript',
        buggyCode: `// ---- Shared Types ----
interface RecommendRequest {
  strategyName: string;
  courseIds?: string[];
}

// ---- Frontend API Client ----
class StrategyApiClient {
  async recommend(
    strategyType: string,
    courseIds?: string[],
  ): Promise<{ strategyUsed: string }> {
    // Frontend sends "strategyType" in the POST body
    const body = { strategyType, courseIds };
    return this.simulatePost(body);
  }

  private simulatePost(body: Record<string, unknown>): Promise<{ strategyUsed: string }> {
    // Simulate what the backend route handler does
    return handleRecommendRequest(body);
  }
}

// ---- Backend Strategy Factory ----
class StrategyFactory {
  private static readonly strategies: Record<string, string> = {
    popularity: 'popularity',
    skill_gap: 'skill_gap',
    career_path: 'career_path',
    experimental: 'experimental',
  };

  static create(name: string | undefined): string {
    if (name && StrategyFactory.strategies[name]) {
      return StrategyFactory.strategies[name];
    }
    return 'popularity'; // default fallback
  }
}

// ---- Backend Route Handler ----
async function handleRecommendRequest(
  body: Record<string, unknown>,
): Promise<{ strategyUsed: string }> {
  const { strategyName } = body as RecommendRequest;
  const strategy = StrategyFactory.create(strategyName);

  return { strategyUsed: strategy };
}`,
        solutionCode: `// ---- Shared Types ----
interface RecommendRequest {
  strategyType: string;
  courseIds?: string[];
}

// ---- Frontend API Client ----
class StrategyApiClient {
  async recommend(
    strategyType: string,
    courseIds?: string[],
  ): Promise<{ strategyUsed: string }> {
    const body = { strategyType, courseIds };
    return this.simulatePost(body);
  }

  private simulatePost(body: Record<string, unknown>): Promise<{ strategyUsed: string }> {
    return handleRecommendRequest(body);
  }
}

// ---- Backend Strategy Factory ----
class StrategyFactory {
  private static readonly strategies: Record<string, string> = {
    popularity: 'popularity',
    skill_gap: 'skill_gap',
    career_path: 'career_path',
    experimental: 'experimental',
  };

  static create(name: string | undefined): string {
    if (name && StrategyFactory.strategies[name]) {
      return StrategyFactory.strategies[name];
    }
    return 'popularity';
  }
}

// ---- Backend Route Handler ----
async function handleRecommendRequest(
  body: Record<string, unknown>,
): Promise<{ strategyUsed: string }> {
  const { strategyType } = body as RecommendRequest;
  const strategy = StrategyFactory.create(strategyType);

  return { strategyUsed: strategy };
}`,
      },
    ],
    testFiles: [
      {
        filename: 'strategy.test.ts',
        language: 'typescript',
        code: `describe('Strategy Selection', () => {
  it('should use the selected strategy, not always default to popularity', async () => {
    const client = new StrategyApiClient();
    const result = await client.recommend('skill_gap');
    expect(result.strategyUsed).toBe('skill_gap');
  });

  it('should use career_path when career_path is selected', async () => {
    const client = new StrategyApiClient();
    const result = await client.recommend('career_path');
    expect(result.strategyUsed).toBe('career_path');
  });

  it('should fall back to popularity when no strategy is given', async () => {
    const client = new StrategyApiClient();
    const result = await client.recommend('');
    expect(result.strategyUsed).toBe('popularity');
  });
});`,
      },
    ],
    solutionExplanation: `### Root Cause

The shared type \`RecommendRequest\` defines \`strategyName: string\`, but the frontend API client sends \`{ strategyType: selectedStrategy, courseIds }\`. The Zod schema validates \`strategyType\`, so validation passes. But the route handler destructures \`strategyName\` from the body (via the TypeScript type), which is always \`undefined\`. \`StrategyFactory.create(undefined)\` falls back to \`PopularityStrategy\`.

### Fix

Align the shared type and handler to use \`strategyType\`:
\`\`\`typescript
interface RecommendRequest {
  strategyType: string;
}

const { strategyType } = body as RecommendRequest;
\`\`\``,
  },

  // -----------------------------------------------------------------------
  // Bug 2 — Missing Clamp in Override (inheritance, medium)
  // -----------------------------------------------------------------------
  {
    id: 'course-catalog-2',
    project: 'course-catalog',
    projectLabel: 'Course Catalog',
    bugNumber: 2,
    title: 'Skill-Gap Scores Are Absurdly High',
    difficulty: 'medium',
    category: 'inheritance',
    language: 'typescript',
    symptom: `### Symptom

When using SkillGapStrategy, level 5 courses get scores in the hundreds or thousands -- way beyond the expected 0-100 range.

**Expected:** Scores should stay within a reasonable range thanks to the clamped multiplier.

### Context

The base \`Strategy.applyLevelWeight()\` clamps the multiplier to max 10 via \`Math.min(level * 2, 10)\`. The \`SkillGapStrategy\` overrides this method with its own multiplier formula but omits the clamp.`,
    hints: [
      'Look at how SkillGapStrategy overrides applyLevelWeight.',
      'Compare it to the base Strategy.applyLevelWeight method.',
      'What does the base method do that the override skips? The base uses Math.min(..., 10) to clamp.',
    ],
    files: [
      {
        filename: 'SkillGapStrategy.ts',
        language: 'typescript',
        buggyCode: `type CourseLevel = 1 | 2 | 3 | 4 | 5;

interface CourseData {
  id: string;
  title: string;
  level: CourseLevel;
  tags: string[];
  instructor: string | null;
  enrollmentDeadline: string | null;
}

interface ScoreBreakdownItem {
  factor: string;
  value: number;
  description: string;
}

interface ScoreResult {
  courseId: string;
  score: number;
  breakdown: ScoreBreakdownItem[];
}

abstract class Strategy {
  score(course: CourseData): ScoreResult {
    const breakdown: ScoreBreakdownItem[] = [];
    let total = this.baseScore(course, breakdown);
    total = this.applyLevelWeight(total, course, breakdown);
    return {
      courseId: course.id,
      score: Math.round(total * 100) / 100,
      breakdown,
    };
  }

  protected abstract baseScore(course: CourseData, breakdown: ScoreBreakdownItem[]): number;

  /** Base implementation clamps multiplier to max 10 */
  protected applyLevelWeight(
    currentScore: number,
    course: CourseData,
    breakdown: ScoreBreakdownItem[],
  ): number {
    const weight = Math.min(course.level * 2, 10);
    const weighted = currentScore * (weight / 5);
    breakdown.push({
      factor: 'level_weight',
      value: weighted - currentScore,
      description: \`Level \${course.level} weight applied (clamped to max 10)\`,
    });
    return weighted;
  }
}

class SkillGapStrategy extends Strategy {
  protected baseScore(course: CourseData, breakdown: ScoreBreakdownItem[]): number {
    const base = course.level * 15;
    breakdown.push({
      factor: 'base_score',
      value: base,
      description: \`Skill-gap base from level \${course.level}\`,
    });
    return base;
  }

  protected applyLevelWeight(
    currentScore: number,
    course: CourseData,
    breakdown: ScoreBreakdownItem[],
  ): number {
    const multiplier = course.level * 3; // can be 15 for level 5
    const weighted = currentScore * (multiplier / 5);
    breakdown.push({
      factor: 'skill_gap_level_weight',
      value: weighted - currentScore,
      description: \`Skill-gap level \${course.level} multiplier (\${multiplier})\`,
    });
    return weighted;
  }
}`,
        solutionCode: `type CourseLevel = 1 | 2 | 3 | 4 | 5;

interface CourseData {
  id: string;
  title: string;
  level: CourseLevel;
  tags: string[];
  instructor: string | null;
  enrollmentDeadline: string | null;
}

interface ScoreBreakdownItem {
  factor: string;
  value: number;
  description: string;
}

interface ScoreResult {
  courseId: string;
  score: number;
  breakdown: ScoreBreakdownItem[];
}

abstract class Strategy {
  score(course: CourseData): ScoreResult {
    const breakdown: ScoreBreakdownItem[] = [];
    let total = this.baseScore(course, breakdown);
    total = this.applyLevelWeight(total, course, breakdown);
    return {
      courseId: course.id,
      score: Math.round(total * 100) / 100,
      breakdown,
    };
  }

  protected abstract baseScore(course: CourseData, breakdown: ScoreBreakdownItem[]): number;

  protected applyLevelWeight(
    currentScore: number,
    course: CourseData,
    breakdown: ScoreBreakdownItem[],
  ): number {
    const weight = Math.min(course.level * 2, 10);
    const weighted = currentScore * (weight / 5);
    breakdown.push({
      factor: 'level_weight',
      value: weighted - currentScore,
      description: \`Level \${course.level} weight applied (clamped to max 10)\`,
    });
    return weighted;
  }
}

class SkillGapStrategy extends Strategy {
  protected baseScore(course: CourseData, breakdown: ScoreBreakdownItem[]): number {
    const base = course.level * 15;
    breakdown.push({
      factor: 'base_score',
      value: base,
      description: \`Skill-gap base from level \${course.level}\`,
    });
    return base;
  }

  protected applyLevelWeight(
    currentScore: number,
    course: CourseData,
    breakdown: ScoreBreakdownItem[],
  ): number {
    const multiplier = Math.min(course.level * 3, 10);
    const weighted = currentScore * (multiplier / 5);
    breakdown.push({
      factor: 'skill_gap_level_weight',
      value: weighted - currentScore,
      description: \`Skill-gap level \${course.level} multiplier (\${multiplier})\`,
    });
    return weighted;
  }
}`,
      },
    ],
    testFiles: [
      {
        filename: 'skillGapScoring.test.ts',
        language: 'typescript',
        code: `describe('SkillGapStrategy scoring', () => {
  it('should keep level 5 skill-gap score within a reasonable range (not exceeding 200)', () => {
    const strategy = new SkillGapStrategy();
    const course: CourseData = {
      id: 'CRS-001',
      title: 'Advanced Course',
      level: 5 as CourseLevel,
      tags: [],
      instructor: 'tester',
      enrollmentDeadline: null,
    };
    const result = strategy.score(course);
    // Without clamp: base=75, multiplier=15, weighted=75*(15/5)=225
    // With clamp:    base=75, multiplier=10, weighted=75*(10/5)=150
    expect(result.score).toBeLessThanOrEqual(200);
  });

  it('should clamp the level weight multiplier to max 10', () => {
    const strategy = new SkillGapStrategy();
    const course: CourseData = {
      id: 'CRS-002',
      title: 'Expert Course',
      level: 5 as CourseLevel,
      tags: [],
      instructor: 'tester',
      enrollmentDeadline: null,
    };
    const result = strategy.score(course);
    const weightItem = result.breakdown.find(
      (b) => b.factor === 'skill_gap_level_weight',
    );
    expect(weightItem).toBeDefined();
    // With clamp: base=75, weighted=150, delta=75
    // Without clamp: base=75, weighted=225, delta=150
    expect(weightItem!.value).toBeLessThanOrEqual(100);
  });

  it('should produce score of 150 for level 5 (base 75 * 10/5)', () => {
    const strategy = new SkillGapStrategy();
    const course: CourseData = {
      id: 'CRS-003',
      title: 'Expert Course',
      level: 5 as CourseLevel,
      tags: [],
      instructor: 'tester',
      enrollmentDeadline: null,
    };
    const result = strategy.score(course);
    expect(result.score).toBe(150);
  });
});`,
      },
    ],
    solutionExplanation: `### Root Cause

The base \`Strategy.applyLevelWeight()\` clamps the multiplier to max 10 via \`Math.min(level * 2, 10)\`. The \`SkillGapStrategy\` override uses \`level * 3\` (up to 15 for level 5) with no clamp. This produces absurdly high weighted scores.

For level 5: base = 75, multiplier = 15 (unclamped), weighted = 75 * (15/5) = **225** instead of 150.

### Fix

Add \`Math.min\` clamp to the override:
\`\`\`typescript
const multiplier = Math.min(course.level * 3, 10);
\`\`\``,
  },

  // -----------------------------------------------------------------------
  // Bug 3 — this Binding Lost (this-binding, medium)
  // -----------------------------------------------------------------------
  {
    id: 'course-catalog-3',
    project: 'course-catalog',
    projectLabel: 'Course Catalog',
    bugNumber: 3,
    title: 'Error Handler Crashes with TypeError',
    difficulty: 'medium',
    category: 'this-binding',
    language: 'typescript',
    symptom: `### Symptom

If the API returns an error for \`GET /courses/:id\`, the frontend crashes with \`TypeError: Cannot read properties of undefined (reading 'clientName')\` instead of showing a clean error message.

**Expected:** The error handler should format the error with the client name, e.g., \`"[CourseApiClient] HTTP 404: Not Found"\`.

### Context

\`CourseApiClient\` extends \`BaseApiClient\`. The \`handleError\` method on the base class references \`this.clientName\` to build a formatted error message. The \`fetchCourse\` method catches errors from the HTTP call.`,
    hints: [
      'Look at CourseApiClient.fetchCourse() and how it handles errors.',
      'How is handleError passed to .catch()? What happens to "this" inside a method when passed as a callback?',
      'When you pass this.handleError directly to .catch(), the method loses its "this" binding. Use an arrow function wrapper instead.',
    ],
    files: [
      {
        filename: 'CourseApiClient.ts',
        language: 'typescript',
        buggyCode: `abstract class BaseApiClient {
  protected baseUrl: string;
  protected clientName: string;

  constructor(baseUrl: string, clientName: string = 'ApiClient') {
    this.baseUrl = baseUrl;
    this.clientName = clientName;
  }

  protected async get<T>(path: string): Promise<T> {
    // Simulate an HTTP GET that might fail
    const url = \`\${this.baseUrl}\${path}\`;
    throw new Error(\`HTTP 404: Not Found for \${url}\`);
  }

  handleError(error: Error): never {
    // Uses this.clientName - will fail if \`this\` is lost
    console.error(\`[\${this.clientName}] Error:\`, error.message);
    throw new Error(\`[\${this.clientName}] \${error.message}\`);
  }
}

class CourseApiClient extends BaseApiClient {
  constructor(baseUrl = '/api') {
    super(baseUrl, 'CourseApiClient');
  }

  async fetchCourse(id: string): Promise<unknown> {
    return this.get(\`/courses/\${id}\`).catch(this.handleError);
  }
}`,
        solutionCode: `abstract class BaseApiClient {
  protected baseUrl: string;
  protected clientName: string;

  constructor(baseUrl: string, clientName: string = 'ApiClient') {
    this.baseUrl = baseUrl;
    this.clientName = clientName;
  }

  protected async get<T>(path: string): Promise<T> {
    const url = \`\${this.baseUrl}\${path}\`;
    throw new Error(\`HTTP 404: Not Found for \${url}\`);
  }

  handleError(error: Error): never {
    console.error(\`[\${this.clientName}] Error:\`, error.message);
    throw new Error(\`[\${this.clientName}] \${error.message}\`);
  }
}

class CourseApiClient extends BaseApiClient {
  constructor(baseUrl = '/api') {
    super(baseUrl, 'CourseApiClient');
  }

  async fetchCourse(id: string): Promise<unknown> {
    return this.get(\`/courses/\${id}\`).catch((e) => this.handleError(e));
  }
}`,
      },
    ],
    testFiles: [
      {
        filename: 'errorHandling.test.ts',
        language: 'typescript',
        code: `describe('CourseApiClient error handling', () => {
  it('should include client name in the error message when fetch fails', async () => {
    const client = new CourseApiClient('/api');
    try {
      await client.fetchCourse('nonexistent-id');
      // Should not reach here
      expect(true).toBe(false);
    } catch (err: any) {
      // With the fix, error message includes "[CourseApiClient]"
      // Without the fix, we get TypeError: Cannot read properties of undefined
      expect(err.message).toContain('CourseApiClient');
    }
  });

  it('should throw an Error, not a TypeError', async () => {
    const client = new CourseApiClient('/api');
    try {
      await client.fetchCourse('bad-id');
      expect(true).toBe(false);
    } catch (err: any) {
      // With bug: TypeError (cannot read 'clientName' of undefined)
      // Fixed: Error with formatted message
      expect(err).toBeInstanceOf(Error);
      expect(err.message).not.toContain('Cannot read properties of undefined');
    }
  });

  it('should preserve the original error information', async () => {
    const client = new CourseApiClient('/api');
    try {
      await client.fetchCourse('missing');
      expect(true).toBe(false);
    } catch (err: any) {
      expect(err.message).toContain('404');
    }
  });
});`,
      },
    ],
    solutionExplanation: `### Root Cause

\`CourseApiClient.fetchCourse()\` passes \`this.handleError\` as a callback to \`.catch()\`. When the promise rejects, \`handleError\` runs without \`this\` bound to the class instance. In strict mode, \`this\` is \`undefined\`, so \`this.clientName\` throws a TypeError.

### Fix

Use an arrow function wrapper to preserve \`this\`:
\`\`\`typescript
return this.get(\`/courses/\${id}\`).catch((e) => this.handleError(e));
\`\`\``,
  },

  // -----------------------------------------------------------------------
  // Bug 4 — Sort Direction (sort-logic, easy)
  // -----------------------------------------------------------------------
  {
    id: 'course-catalog-4',
    project: 'course-catalog',
    projectLabel: 'Course Catalog',
    bugNumber: 4,
    title: 'Recommendations in Wrong Order',
    difficulty: 'easy',
    category: 'sort-logic',
    language: 'typescript',
    symptom: `### Symptom

After running recommendations, the highest-scoring courses (best matches) appear at the bottom of the results list instead of the top.

**Expected:** The best recommendations (highest scores) should appear first.

### Context

The recommend route handler scores each course, then sorts the results before returning them to the frontend. The sort comparator determines the ordering direction.`,
    hints: [
      'Look at the sort comparator in generateRecommendations.',
      'a.score - b.score sorts ascending. For recommendations, you want descending (highest first).',
      'Flip the comparator to b.score - a.score.',
    ],
    files: [
      {
        filename: 'generateRecommendations.ts',
        language: 'typescript',
        buggyCode: `interface ScoreResult {
  courseId: string;
  score: number;
  recommendedAction: string;
}

interface RecommendResponse {
  results: ScoreResult[];
  strategyUsed: string;
  timestamp: string;
}

function generateRecommendations(courseIds: string[]): RecommendResponse {
  // Simulate scoring: each course gets a deterministic score
  const results: ScoreResult[] = courseIds.map((id, index) => ({
    courseId: id,
    score: (index + 1) * 15 + 5,
    recommendedAction: 'browse_later',
  }));

  results.sort((a, b) => a.score - b.score);

  return {
    results,
    strategyUsed: 'popularity',
    timestamp: new Date().toISOString(),
  };
}`,
        solutionCode: `interface ScoreResult {
  courseId: string;
  score: number;
  recommendedAction: string;
}

interface RecommendResponse {
  results: ScoreResult[];
  strategyUsed: string;
  timestamp: string;
}

function generateRecommendations(courseIds: string[]): RecommendResponse {
  const results: ScoreResult[] = courseIds.map((id, index) => ({
    courseId: id,
    score: (index + 1) * 15 + 5,
    recommendedAction: 'browse_later',
  }));

  results.sort((a, b) => b.score - a.score);

  return {
    results,
    strategyUsed: 'popularity',
    timestamp: new Date().toISOString(),
  };
}`,
      },
    ],
    testFiles: [
      {
        filename: 'recommendations.test.ts',
        language: 'typescript',
        code: `describe('Recommendation ordering', () => {
  it('should return results sorted highest score first', () => {
    const response = generateRecommendations(['CRS-A', 'CRS-B', 'CRS-C', 'CRS-D']);
    const scores = response.results.map((r) => r.score);
    for (let i = 1; i < scores.length; i++) {
      expect(scores[i - 1]).toBeGreaterThanOrEqual(scores[i]);
    }
  });

  it('should have the highest-scoring course at index 0', () => {
    const response = generateRecommendations(['CRS-A', 'CRS-B', 'CRS-C']);
    // CRS-C has index 2, score = (2+1)*15+5 = 50 (highest)
    expect(response.results[0].courseId).toBe('CRS-C');
  });

  it('should have the lowest-scoring course at the end', () => {
    const response = generateRecommendations(['CRS-A', 'CRS-B', 'CRS-C']);
    const last = response.results[response.results.length - 1];
    // CRS-A has index 0, score = (0+1)*15+5 = 20 (lowest)
    expect(last.courseId).toBe('CRS-A');
  });
});`,
      },
    ],
    solutionExplanation: `### Root Cause

The sort comparator \`results.sort((a, b) => a.score - b.score)\` sorts ascending (lowest first). Recommendations should show highest scores first.

### Fix

Reverse the comparator:
\`\`\`typescript
results.sort((a, b) => b.score - a.score);
\`\`\``,
  },

  // -----------------------------------------------------------------------
  // Bug 5 — Off-by-One in Base Score (off-by-one, easy)
  // -----------------------------------------------------------------------
  {
    id: 'course-catalog-5',
    project: 'course-catalog',
    projectLabel: 'Course Catalog',
    bugNumber: 5,
    title: 'Level 1 Courses Get Zero Score',
    difficulty: 'easy',
    category: 'off-by-one',
    language: 'typescript',
    symptom: `### Symptom

Courses with level 1 (e.g., "Intro to Git & GitHub") always get a recommendation score of 0 using PopularityStrategy. Level 2 gets 10.

**Expected:** Level 1 should produce a base score of 10 (level * 10).

### Context

The scoring system uses a **Template Method** pattern. The base class \`Strategy\` orchestrates the pipeline:

1. \`baseScore()\` -- subclass computes initial score
2. \`applyLevelWeight()\` -- multiplies by clamped level weight
3. \`applyDeadlinePenalty()\` -- urgency boost
4. \`applyInstructorAdjustment()\` -- self-paced bonus
5. \`finalAdjustments()\` -- subclass hook

\`PopularityStrategy\` only overrides \`baseScore()\`. Focus there.`,
    hints: [
      'Look at the arithmetic formula in PopularityStrategy.baseScore().',
      'What does (level - 1) * 10 produce for level 1? For level 2?',
      'The formula subtracts 1 before multiplying. Level 1 -> (1-1)*10 = 0. It should just be level * 10.',
    ],
    files: [
      {
        filename: 'PopularityStrategy.ts',
        language: 'typescript',
        buggyCode: `interface CourseData {
  id: string;
  title: string;
  level: number; // 1-5
  status: string;
  instructor: string | null;
  enrollmentDeadline: string | null;
  tags: string[];
  metadata: Record<string, unknown>;
}

interface ScoreBreakdownItem {
  factor: string;
  value: number;
  description: string;
}

interface ScoreResult {
  courseId: string;
  score: number;
  recommendedAction: string;
  breakdown: ScoreBreakdownItem[];
}

abstract class Strategy {
  abstract readonly name: string;

  score(course: CourseData): ScoreResult {
    const breakdown: ScoreBreakdownItem[] = [];
    let total = this.baseScore(course, breakdown);
    total = this.applyLevelWeight(total, course, breakdown);
    total = this.applyInstructorAdjustment(total, course, breakdown);
    return {
      courseId: course.id,
      score: Math.round(total * 100) / 100,
      recommendedAction: total >= 40 ? 'enroll' : 'browse',
      breakdown,
    };
  }

  protected abstract baseScore(
    course: CourseData,
    breakdown: ScoreBreakdownItem[],
  ): number;

  protected applyLevelWeight(
    currentScore: number,
    course: CourseData,
    breakdown: ScoreBreakdownItem[],
  ): number {
    const weight = Math.min(course.level * 2, 10);
    const weighted = currentScore * (weight / 5);
    breakdown.push({
      factor: 'level_weight',
      value: weighted - currentScore,
      description: \`Level \${course.level} weight (clamped max 10)\`,
    });
    return weighted;
  }

  protected applyInstructorAdjustment(
    currentScore: number,
    course: CourseData,
    breakdown: ScoreBreakdownItem[],
  ): number {
    if (!course.instructor) {
      breakdown.push({
        factor: 'self_paced_boost',
        value: 5,
        description: 'Self-paced course boost',
      });
      return currentScore + 5;
    }
    return currentScore;
  }
}

export class PopularityStrategy extends Strategy {
  readonly name = 'popularity';

  protected baseScore(
    course: CourseData,
    breakdown: ScoreBreakdownItem[],
  ): number {
    const base = (course.level - 1) * 10;
    breakdown.push({
      factor: 'base_score',
      value: base,
      description: \`Base score from level \${course.level}\`,
    });
    return base;
  }
}`,
        solutionCode: `interface CourseData {
  id: string;
  title: string;
  level: number; // 1-5
  status: string;
  instructor: string | null;
  enrollmentDeadline: string | null;
  tags: string[];
  metadata: Record<string, unknown>;
}

interface ScoreBreakdownItem {
  factor: string;
  value: number;
  description: string;
}

interface ScoreResult {
  courseId: string;
  score: number;
  recommendedAction: string;
  breakdown: ScoreBreakdownItem[];
}

abstract class Strategy {
  abstract readonly name: string;

  score(course: CourseData): ScoreResult {
    const breakdown: ScoreBreakdownItem[] = [];
    let total = this.baseScore(course, breakdown);
    total = this.applyLevelWeight(total, course, breakdown);
    total = this.applyInstructorAdjustment(total, course, breakdown);
    return {
      courseId: course.id,
      score: Math.round(total * 100) / 100,
      recommendedAction: total >= 40 ? 'enroll' : 'browse',
      breakdown,
    };
  }

  protected abstract baseScore(
    course: CourseData,
    breakdown: ScoreBreakdownItem[],
  ): number;

  protected applyLevelWeight(
    currentScore: number,
    course: CourseData,
    breakdown: ScoreBreakdownItem[],
  ): number {
    const weight = Math.min(course.level * 2, 10);
    const weighted = currentScore * (weight / 5);
    breakdown.push({
      factor: 'level_weight',
      value: weighted - currentScore,
      description: \`Level \${course.level} weight (clamped max 10)\`,
    });
    return weighted;
  }

  protected applyInstructorAdjustment(
    currentScore: number,
    course: CourseData,
    breakdown: ScoreBreakdownItem[],
  ): number {
    if (!course.instructor) {
      breakdown.push({
        factor: 'self_paced_boost',
        value: 5,
        description: 'Self-paced course boost',
      });
      return currentScore + 5;
    }
    return currentScore;
  }
}

export class PopularityStrategy extends Strategy {
  readonly name = 'popularity';

  protected baseScore(
    course: CourseData,
    breakdown: ScoreBreakdownItem[],
  ): number {
    const base = course.level * 10;
    breakdown.push({
      factor: 'base_score',
      value: base,
      description: \`Base score from level \${course.level}\`,
    });
    return base;
  }
}`,
      },
    ],
    testFiles: [
      {
        filename: 'scoring.test.ts',
        language: 'typescript',
        code: `import { PopularityStrategy } from "./PopularityStrategy";

function createTestCourse(overrides: Record<string, unknown> = {}) {
  return {
    id: 'TEST-001',
    title: 'Test Course',
    level: 3,
    status: 'published',
    instructor: 'tester',
    enrollmentDeadline: null,
    tags: [],
    metadata: {},
    ...overrides,
  };
}

describe("PopularityStrategy", () => {
  const strategy = new PopularityStrategy();

  it("level 1 should produce base score of 10", () => {
    const course = createTestCourse({ level: 1 });
    const result = strategy.score(course);
    // level 1: base=10, weight=Math.min(1*2,10)=2, weighted=10*(2/5)=4
    expect(result.score).toBe(4);
  });

  it("level 2 should produce base score of 20", () => {
    const course = createTestCourse({ level: 2 });
    const result = strategy.score(course);
    // level 2: base=20, weight=Math.min(2*2,10)=4, weighted=20*(4/5)=16
    expect(result.score).toBe(16);
  });

  it("level 3 should produce base score of 30", () => {
    const course = createTestCourse({ level: 3 });
    const result = strategy.score(course);
    // level 3: base=30, weight=Math.min(3*2,10)=6, weighted=30*(6/5)=36
    expect(result.score).toBe(36);
  });

  it("self-paced courses get a 5-point boost", () => {
    const withInstructor = createTestCourse({ instructor: 'alice' });
    const selfPaced = createTestCourse({ instructor: null });
    expect(strategy.score(selfPaced).score).toBeGreaterThan(
      strategy.score(withInstructor).score
    );
  });

  it("should include breakdown items", () => {
    const course = createTestCourse({ level: 3 });
    const result = strategy.score(course);
    expect(result.breakdown.length).toBeGreaterThan(0);
    expect(result.breakdown[0]).toHaveProperty("factor");
    expect(result.breakdown[0]).toHaveProperty("value");
  });
});`,
      },
    ],
    solutionExplanation: `### Root Cause

\`PopularityStrategy.baseScore()\` uses \`(course.level - 1) * 10\`:

- Level 1 -> (1 - 1) * 10 = **0** (should be 10)
- Level 2 -> (2 - 1) * 10 = **10** (should be 20)
- Level 3 -> (3 - 1) * 10 = **20** (should be 30)

Every level is scored one tier lower than intended. Level 1 courses are completely invisible in recommendations.

### Fix

Remove the \`- 1\`:
\`\`\`typescript
const base = course.level * 10;
\`\`\``,
  },

  // -----------------------------------------------------------------------
  // Bug 6 — Deadline Comparison Flipped (comparison-logic, medium)
  // -----------------------------------------------------------------------
  {
    id: 'course-catalog-6',
    project: 'course-catalog',
    projectLabel: 'Course Catalog',
    bugNumber: 6,
    title: 'Deadline Penalty Applied to Wrong Courses',
    difficulty: 'medium',
    category: 'comparison-logic',
    language: 'typescript',
    symptom: `### Symptom

When using CareerPathStrategy, courses that have NOT passed their enrollment deadline get a penalty, while courses that ARE past deadline do not. The penalty description even says "Xh past deadline" for courses that still have time.

**Expected:** The penalty should only apply to courses whose enrollment deadline has already passed.

### Context

\`CareerPathStrategy.applyDeadlinePenalty()\` calculates \`hoursUntilDeadline\` as \`(deadline - now) / msPerHour\`. A positive value means the deadline is in the future; a negative value means it has passed.`,
    hints: [
      'Look at CareerPathStrategy.applyDeadlinePenalty().',
      'What does a positive hoursUntilDeadline mean? What does a negative value mean?',
      'The check is > 0 (deadline in the future). The penalty should apply when < 0 (deadline has passed).',
    ],
    files: [
      {
        filename: 'CareerPathStrategy.ts',
        language: 'typescript',
        buggyCode: `type CourseLevel = 1 | 2 | 3 | 4 | 5;

interface CourseData {
  id: string;
  title: string;
  level: CourseLevel;
  tags: string[];
  instructor: string | null;
  enrollmentDeadline: string | null;
}

interface ScoreBreakdownItem {
  factor: string;
  value: number;
  description: string;
}

class CareerPathStrategy {
  applyDeadlinePenalty(
    currentScore: number,
    course: CourseData,
    breakdown: ScoreBreakdownItem[],
    now: Date, // injected for testability
  ): number {
    if (!course.enrollmentDeadline) return currentScore;

    const deadline = new Date(course.enrollmentDeadline);
    const hoursUntilDeadline =
      (deadline.getTime() - now.getTime()) / (1000 * 60 * 60);

    if (hoursUntilDeadline > 0) {
      const penalty = 20;
      breakdown.push({
        factor: 'career_deadline_penalty',
        value: penalty,
        description: \`Enrollment penalty: \${Math.abs(Math.round(hoursUntilDeadline))}h past deadline\`,
      });
      return currentScore + penalty;
    }

    return currentScore;
  }
}`,
        solutionCode: `type CourseLevel = 1 | 2 | 3 | 4 | 5;

interface CourseData {
  id: string;
  title: string;
  level: CourseLevel;
  tags: string[];
  instructor: string | null;
  enrollmentDeadline: string | null;
}

interface ScoreBreakdownItem {
  factor: string;
  value: number;
  description: string;
}

class CareerPathStrategy {
  applyDeadlinePenalty(
    currentScore: number,
    course: CourseData,
    breakdown: ScoreBreakdownItem[],
    now: Date,
  ): number {
    if (!course.enrollmentDeadline) return currentScore;

    const deadline = new Date(course.enrollmentDeadline);
    const hoursUntilDeadline =
      (deadline.getTime() - now.getTime()) / (1000 * 60 * 60);

    if (hoursUntilDeadline < 0) {
      const penalty = 20;
      breakdown.push({
        factor: 'career_deadline_penalty',
        value: penalty,
        description: \`Enrollment penalty: \${Math.abs(Math.round(hoursUntilDeadline))}h past deadline\`,
      });
      return currentScore + penalty;
    }

    return currentScore;
  }
}`,
      },
    ],
    testFiles: [
      {
        filename: 'deadlinePenalty.test.ts',
        language: 'typescript',
        code: `describe('CareerPathStrategy deadline penalty', () => {
  it('should NOT apply penalty when deadline is in the future', () => {
    const strategy = new CareerPathStrategy();
    const now = new Date('2025-01-15T10:00:00Z');
    const course: CourseData = {
      id: 'CRS-001',
      title: 'Future Deadline',
      level: 3 as CourseLevel,
      tags: [],
      instructor: 'tester',
      enrollmentDeadline: '2025-01-16T10:00:00Z', // 24h in the future
    };
    const breakdown: ScoreBreakdownItem[] = [];
    const result = strategy.applyDeadlinePenalty(50, course, breakdown, now);
    expect(result).toBe(50); // no penalty applied
    expect(breakdown.length).toBe(0);
  });

  it('should apply penalty when deadline has passed', () => {
    const strategy = new CareerPathStrategy();
    const now = new Date('2025-01-17T10:00:00Z');
    const course: CourseData = {
      id: 'CRS-002',
      title: 'Past Deadline',
      level: 3 as CourseLevel,
      tags: [],
      instructor: 'tester',
      enrollmentDeadline: '2025-01-15T10:00:00Z', // 48h in the past
    };
    const breakdown: ScoreBreakdownItem[] = [];
    const result = strategy.applyDeadlinePenalty(50, course, breakdown, now);
    expect(result).toBe(70); // penalty of 20 applied
    expect(breakdown.length).toBe(1);
    expect(breakdown[0].factor).toBe('career_deadline_penalty');
  });

  it('should not apply penalty when there is no deadline', () => {
    const strategy = new CareerPathStrategy();
    const now = new Date('2025-01-15T10:00:00Z');
    const course: CourseData = {
      id: 'CRS-003',
      title: 'No Deadline',
      level: 3 as CourseLevel,
      tags: [],
      instructor: null,
      enrollmentDeadline: null,
    };
    const breakdown: ScoreBreakdownItem[] = [];
    const result = strategy.applyDeadlinePenalty(50, course, breakdown, now);
    expect(result).toBe(50);
  });
});`,
      },
    ],
    solutionExplanation: `### Root Cause

\`CareerPathStrategy.applyDeadlinePenalty()\` checks \`hoursUntilDeadline > 0\` to apply the penalty. But \`> 0\` means "deadline is in the future" (still has time). The penalty should apply when \`< 0\` (deadline has passed).

### Fix

Change the comparison operator:
\`\`\`typescript
if (hoursUntilDeadline < 0) {
\`\`\``,
  },

  // -----------------------------------------------------------------------
  // Bug 7 — Decorator Wrong Delegation (decorator, easy)
  // -----------------------------------------------------------------------
  {
    id: 'course-catalog-7',
    project: 'course-catalog',
    projectLabel: 'Course Catalog',
    bugNumber: 7,
    title: 'Status Filter Returns All Courses',
    difficulty: 'easy',
    category: 'decorator',
    language: 'typescript',
    symptom: `### Symptom

\`GET /courses?status=published\` returns ALL courses instead of only published ones. The \`InMemoryCourseRepository\` alone works correctly, so the bug is in the layer on top.

**Expected:** Only courses matching the requested status should be returned.

### Context

The API wraps \`InMemoryCourseRepository\` with \`AuditedRepository\` (a decorator). The decorator should delegate each method to the inner repository. \`findAll()\` returns everything; \`findByCategory(category)\` filters by status.`,
    hints: [
      'The API uses AuditedRepository wrapping InMemoryCourseRepository.',
      'Look at AuditedRepository.findByCategory(). What method does it actually call on the inner repository?',
      'It calls this.inner.findAll() instead of this.inner.findByCategory(category). Fix the delegation.',
    ],
    files: [
      {
        filename: 'AuditedRepository.ts',
        language: 'typescript',
        buggyCode: `type CourseLevel = 1 | 2 | 3 | 4 | 5;
type CourseStatus = 'published' | 'draft' | 'archived' | 'upcoming';

interface CourseData {
  id: string;
  title: string;
  level: CourseLevel;
  status: CourseStatus;
}

interface CourseRepository {
  findAll(): Promise<CourseData[]>;
  findById(id: string): Promise<CourseData | undefined>;
  findByCategory(category: string): Promise<CourseData[]>;
}

class InMemoryCourseRepository implements CourseRepository {
  private courses: CourseData[];

  constructor(seed: CourseData[]) {
    this.courses = [...seed];
  }

  async findAll(): Promise<CourseData[]> {
    return [...this.courses];
  }

  async findById(id: string): Promise<CourseData | undefined> {
    return this.courses.find((c) => c.id === id);
  }

  async findByCategory(category: string): Promise<CourseData[]> {
    return this.courses.filter((c) => c.status === category);
  }
}

class AuditedRepository implements CourseRepository {
  private inner: CourseRepository;
  private auditLog: { operation: string; timestamp: Date }[] = [];

  constructor(inner: CourseRepository) {
    this.inner = inner;
  }

  async findAll(): Promise<CourseData[]> {
    this.log('findAll');
    return this.inner.findAll();
  }

  async findById(id: string): Promise<CourseData | undefined> {
    this.log(\`findById(\${id})\`);
    return this.inner.findById(id);
  }

  async findByCategory(category: string): Promise<CourseData[]> {
    this.log(\`findByCategory(\${category})\`);
    return this.inner.findAll();
  }

  getAuditLog() {
    return [...this.auditLog];
  }

  private log(operation: string): void {
    this.auditLog.push({ operation, timestamp: new Date() });
  }
}`,
        solutionCode: `type CourseLevel = 1 | 2 | 3 | 4 | 5;
type CourseStatus = 'published' | 'draft' | 'archived' | 'upcoming';

interface CourseData {
  id: string;
  title: string;
  level: CourseLevel;
  status: CourseStatus;
}

interface CourseRepository {
  findAll(): Promise<CourseData[]>;
  findById(id: string): Promise<CourseData | undefined>;
  findByCategory(category: string): Promise<CourseData[]>;
}

class InMemoryCourseRepository implements CourseRepository {
  private courses: CourseData[];

  constructor(seed: CourseData[]) {
    this.courses = [...seed];
  }

  async findAll(): Promise<CourseData[]> {
    return [...this.courses];
  }

  async findById(id: string): Promise<CourseData | undefined> {
    return this.courses.find((c) => c.id === id);
  }

  async findByCategory(category: string): Promise<CourseData[]> {
    return this.courses.filter((c) => c.status === category);
  }
}

class AuditedRepository implements CourseRepository {
  private inner: CourseRepository;
  private auditLog: { operation: string; timestamp: Date }[] = [];

  constructor(inner: CourseRepository) {
    this.inner = inner;
  }

  async findAll(): Promise<CourseData[]> {
    this.log('findAll');
    return this.inner.findAll();
  }

  async findById(id: string): Promise<CourseData | undefined> {
    this.log(\`findById(\${id})\`);
    return this.inner.findById(id);
  }

  async findByCategory(category: string): Promise<CourseData[]> {
    this.log(\`findByCategory(\${category})\`);
    return this.inner.findByCategory(category);
  }

  getAuditLog() {
    return [...this.auditLog];
  }

  private log(operation: string): void {
    this.auditLog.push({ operation, timestamp: new Date() });
  }
}`,
      },
    ],
    testFiles: [
      {
        filename: 'auditedRepository.test.ts',
        language: 'typescript',
        code: `describe('AuditedRepository.findByCategory', () => {
  const testData: CourseData[] = [
    { id: 'CRS-A', title: 'Course A', level: 1 as CourseLevel, status: 'published' as CourseStatus },
    { id: 'CRS-B', title: 'Course B', level: 2 as CourseLevel, status: 'draft' as CourseStatus },
    { id: 'CRS-C', title: 'Course C', level: 3 as CourseLevel, status: 'published' as CourseStatus },
    { id: 'CRS-D', title: 'Course D', level: 4 as CourseLevel, status: 'archived' as CourseStatus },
  ];

  it('should return only published courses when filtering by published', async () => {
    const inner = new InMemoryCourseRepository(testData);
    const audited = new AuditedRepository(inner);
    const published = await audited.findByCategory('published');
    expect(published).toHaveLength(2);
    expect(published.every((c) => c.status === 'published')).toBe(true);
  });

  it('should return only draft courses when filtering by draft', async () => {
    const inner = new InMemoryCourseRepository(testData);
    const audited = new AuditedRepository(inner);
    const drafts = await audited.findByCategory('draft');
    expect(drafts).toHaveLength(1);
    expect(drafts[0].status).toBe('draft');
  });

  it('should return empty array for category with no matches', async () => {
    const inner = new InMemoryCourseRepository(testData);
    const audited = new AuditedRepository(inner);
    const upcoming = await audited.findByCategory('upcoming');
    expect(upcoming).toHaveLength(0);
  });

  it('should still log the operation correctly', async () => {
    const inner = new InMemoryCourseRepository(testData);
    const audited = new AuditedRepository(inner);
    await audited.findByCategory('published');
    const log = audited.getAuditLog();
    expect(log).toHaveLength(1);
    expect(log[0].operation).toBe('findByCategory(published)');
  });
});`,
      },
    ],
    solutionExplanation: `### Root Cause

\`AuditedRepository.findByCategory()\` calls \`this.inner.findAll()\` instead of \`this.inner.findByCategory(category)\`. So it always returns all courses regardless of the category filter.

### Fix

Delegate to the correct method:
\`\`\`typescript
return this.inner.findByCategory(category);
\`\`\``,
  },

  // -----------------------------------------------------------------------
  // Bug 8 — ExperimentalStrategy Missing Breakdown (lsp-violation, hard)
  // -----------------------------------------------------------------------
  {
    id: 'course-catalog-8',
    project: 'course-catalog',
    projectLabel: 'Course Catalog',
    bugNumber: 8,
    title: 'Experimental Strategy Crashes on Results Page',
    difficulty: 'hard',
    category: 'lsp-violation',
    language: 'typescript',
    symptom: `### Symptom

After fixing Bug 1, select "Experimental" strategy and run recommendations. The app crashes with \`TypeError: Cannot read properties of undefined (reading 'map')\` in the RecommendationResults component.

**Expected:** The experimental strategy should return results with a breakdown array that the frontend can render.

### Context

The base \`Strategy\` class uses a Template Method pattern: \`score()\` creates a \`breakdown\` array, passes it to hooks, and includes it in the return value. \`ExperimentalStrategy\` overrides \`score()\` directly. The frontend renders \`result.breakdown.map(...)\`.`,
    hints: [
      'Look at ExperimentalStrategy.score() -- it overrides the template method directly.',
      'Compare its return value to what ScoreResult requires. What field is the frontend trying to .map() over?',
      'The override returns an object cast with "as ScoreResult" but omits the breakdown array. The frontend crashes calling .map() on undefined.',
    ],
    files: [
      {
        filename: 'ExperimentalStrategy.ts',
        language: 'typescript',
        buggyCode: `type CourseLevel = 1 | 2 | 3 | 4 | 5;

interface CourseData {
  id: string;
  title: string;
  level: CourseLevel;
  instructor: string | null;
}

interface ScoreBreakdownItem {
  factor: string;
  value: number;
  description: string;
}

interface ScoreResult {
  courseId: string;
  score: number;
  recommendedAction: string;
  breakdown: ScoreBreakdownItem[];
}

abstract class Strategy {
  score(course: CourseData): ScoreResult {
    const breakdown: ScoreBreakdownItem[] = [];
    const total = this.baseScore(course, breakdown);
    return {
      courseId: course.id,
      score: Math.round(total * 100) / 100,
      recommendedAction: total > 50 ? 'enroll_immediately' : 'browse_later',
      breakdown,
    };
  }

  protected abstract baseScore(course: CourseData, breakdown: ScoreBreakdownItem[]): number;
}

class ExperimentalStrategy extends Strategy {
  protected baseScore(course: CourseData, breakdown: ScoreBreakdownItem[]): number {
    const base = course.level * 10;
    breakdown.push({
      factor: 'base_score',
      value: base,
      description: \`Experimental base from level \${course.level}\`,
    });
    return base;
  }

  // Uses \`as ScoreResult\` to silence TypeScript
  score(course: CourseData): ScoreResult {
    const rawScore = course.level * 20 + (course.instructor ? 0 : 10);
    const result = {
      courseId: course.id,
      score: rawScore,
      recommendedAction: rawScore > 50 ? 'enroll_immediately' : 'browse_later',
    };
    return result as ScoreResult;
  }
}

// Simulates what the frontend component does
function renderBreakdown(result: ScoreResult): string[] {
  return result.breakdown.map(
    (item) => \`\${item.factor}: \${item.value} - \${item.description}\`,
  );
}`,
        solutionCode: `type CourseLevel = 1 | 2 | 3 | 4 | 5;

interface CourseData {
  id: string;
  title: string;
  level: CourseLevel;
  instructor: string | null;
}

interface ScoreBreakdownItem {
  factor: string;
  value: number;
  description: string;
}

interface ScoreResult {
  courseId: string;
  score: number;
  recommendedAction: string;
  breakdown: ScoreBreakdownItem[];
}

abstract class Strategy {
  score(course: CourseData): ScoreResult {
    const breakdown: ScoreBreakdownItem[] = [];
    const total = this.baseScore(course, breakdown);
    return {
      courseId: course.id,
      score: Math.round(total * 100) / 100,
      recommendedAction: total > 50 ? 'enroll_immediately' : 'browse_later',
      breakdown,
    };
  }

  protected abstract baseScore(course: CourseData, breakdown: ScoreBreakdownItem[]): number;
}

class ExperimentalStrategy extends Strategy {
  protected baseScore(course: CourseData, breakdown: ScoreBreakdownItem[]): number {
    const base = course.level * 10;
    breakdown.push({
      factor: 'base_score',
      value: base,
      description: \`Experimental base from level \${course.level}\`,
    });
    return base;
  }

  score(course: CourseData): ScoreResult {
    const rawScore = course.level * 20 + (course.instructor ? 0 : 10);
    return {
      courseId: course.id,
      score: rawScore,
      recommendedAction: rawScore > 50 ? 'enroll_immediately' : 'browse_later',
      breakdown: [
        { factor: 'experimental', value: rawScore, description: 'AI-based score' },
      ],
    };
  }
}

function renderBreakdown(result: ScoreResult): string[] {
  return result.breakdown.map(
    (item) => \`\${item.factor}: \${item.value} - \${item.description}\`,
  );
}`,
      },
    ],
    testFiles: [
      {
        filename: 'experimentalStrategy.test.ts',
        language: 'typescript',
        code: `describe('ExperimentalStrategy', () => {
  it('should include a breakdown array in the score result', () => {
    const strategy = new ExperimentalStrategy();
    const course: CourseData = {
      id: 'CRS-001',
      title: 'Test Course',
      level: 3 as CourseLevel,
      instructor: 'tester',
    };
    const result = strategy.score(course);
    expect(result.breakdown).toBeDefined();
    expect(Array.isArray(result.breakdown)).toBe(true);
  });

  it('should not crash when rendering breakdown via .map()', () => {
    const strategy = new ExperimentalStrategy();
    const course: CourseData = {
      id: 'CRS-002',
      title: 'Advanced Course',
      level: 5 as CourseLevel,
      instructor: null,
    };
    const result = strategy.score(course);
    // This is what the frontend does — crashes if breakdown is undefined
    const rendered = renderBreakdown(result);
    expect(rendered.length).toBeGreaterThan(0);
  });

  it('should have at least one breakdown item with required fields', () => {
    const strategy = new ExperimentalStrategy();
    const course: CourseData = {
      id: 'CRS-003',
      title: 'Another Course',
      level: 2 as CourseLevel,
      instructor: 'alice',
    };
    const result = strategy.score(course);
    expect(result.breakdown.length).toBeGreaterThan(0);
    const item = result.breakdown[0];
    expect(item).toHaveProperty('factor');
    expect(item).toHaveProperty('value');
    expect(item).toHaveProperty('description');
  });
});`,
      },
    ],
    solutionExplanation: `### Root Cause

\`ExperimentalStrategy\` overrides the \`score()\` template method directly, bypassing all hooks. Its return object omits the \`breakdown\` array and uses \`as ScoreResult\` to silence TypeScript. The frontend calls \`result.breakdown.map()\`, which crashes because \`breakdown\` is \`undefined\`.

### Fix

Include the \`breakdown\` array in the returned object:
\`\`\`typescript
return {
  courseId: course.id,
  score: rawScore,
  recommendedAction: rawScore > 50 ? 'enroll_immediately' : 'browse_later',
  breakdown: [
    { factor: 'experimental', value: rawScore, description: 'AI-based score' },
  ],
};
\`\`\``,
  },

  // -----------------------------------------------------------------------
  // Bug 9 — useEffect Missing Dep (react-hooks, medium)
  // -----------------------------------------------------------------------
  {
    id: 'course-catalog-9',
    project: 'course-catalog',
    projectLabel: 'Course Catalog',
    bugNumber: 9,
    title: "Status Filter Doesn't Re-fetch",
    difficulty: 'medium',
    category: 'react-hooks',
    language: 'typescript',
    symptom: `### Symptom

Changing the "Status Filter" dropdown in the sidebar has no visible effect -- the course list does not change.

**Expected:** Selecting "published", "draft", or "archived" should filter the displayed courses.

### Context

The \`useCourses\` hook has a \`useEffect\` that fetches and filters courses. The effect dependency array determines when it re-runs. The hook uses \`categoryFilter\` state inside the effect to filter results, but the effect may not re-run when that state changes.`,
    hints: [
      'Look at the useCourses hook (simulated as UseCourseSimulator).',
      'Examine the useEffect dependency array. What triggers a re-fetch?',
      'The dependency array is [client]. The client never changes, so the effect only runs once. Add categoryFilter to the dependency array.',
    ],
    files: [
      {
        filename: 'useCourses.ts',
        language: 'typescript',
        buggyCode: `// Simulates React hooks behavior without requiring React DOM.
// We simulate useState, useMemo, and useEffect to test the dependency array bug.

type CourseStatus = 'published' | 'draft' | 'archived' | 'upcoming';

interface CourseData {
  id: string;
  title: string;
  status: CourseStatus;
}

// Simulated API client
class CourseApiClient {
  private allCourses: CourseData[];

  constructor(courses: CourseData[]) {
    this.allCourses = courses;
  }

  async fetchCourses(): Promise<CourseData[]> {
    return [...this.allCourses];
  }
}

// Simulates what the useCourses hook does:
// The effect only runs when dependencies change.
class UseCourseSimulator {
  private client: CourseApiClient;
  private courses: CourseData[] = [];
  private categoryFilter: string = 'all';
  private effectDeps: unknown[] = [];
  private effectRanCount = 0;

  constructor(client: CourseApiClient) {
    this.client = client;
    this.runEffect(); // initial mount
  }

  private depsChanged(newDeps: unknown[]): boolean {
    if (this.effectDeps.length !== newDeps.length) return true;
    return newDeps.some((dep, i) => dep !== this.effectDeps[i]);
  }

  private getEffectDeps(): unknown[] {
    return [this.client]; // missing categoryFilter
  }

  private async runEffect(): Promise<void> {
    const newDeps = this.getEffectDeps();
    if (this.effectRanCount > 0 && !this.depsChanged(newDeps)) {
      return; // deps didn't change, skip effect
    }
    this.effectDeps = newDeps;
    this.effectRanCount++;

    const data = await this.client.fetchCourses();
    if (this.categoryFilter === 'all') {
      this.courses = data;
    } else {
      this.courses = data.filter((c) => c.status === this.categoryFilter);
    }
  }

  async setCategoryFilter(filter: string): Promise<void> {
    this.categoryFilter = filter;
    await this.runEffect();
  }

  getCourses(): CourseData[] {
    return this.courses;
  }

  getEffectRunCount(): number {
    return this.effectRanCount;
  }
}`,
        solutionCode: `type CourseStatus = 'published' | 'draft' | 'archived' | 'upcoming';

interface CourseData {
  id: string;
  title: string;
  status: CourseStatus;
}

class CourseApiClient {
  private allCourses: CourseData[];

  constructor(courses: CourseData[]) {
    this.allCourses = courses;
  }

  async fetchCourses(): Promise<CourseData[]> {
    return [...this.allCourses];
  }
}

class UseCourseSimulator {
  private client: CourseApiClient;
  private courses: CourseData[] = [];
  private categoryFilter: string = 'all';
  private effectDeps: unknown[] = [];
  private effectRanCount = 0;

  constructor(client: CourseApiClient) {
    this.client = client;
    this.runEffect();
  }

  private depsChanged(newDeps: unknown[]): boolean {
    if (this.effectDeps.length !== newDeps.length) return true;
    return newDeps.some((dep, i) => dep !== this.effectDeps[i]);
  }

  private getEffectDeps(): unknown[] {
    return [this.client, this.categoryFilter];
  }

  private async runEffect(): Promise<void> {
    const newDeps = this.getEffectDeps();
    if (this.effectRanCount > 0 && !this.depsChanged(newDeps)) {
      return;
    }
    this.effectDeps = newDeps;
    this.effectRanCount++;

    const data = await this.client.fetchCourses();
    if (this.categoryFilter === 'all') {
      this.courses = data;
    } else {
      this.courses = data.filter((c) => c.status === this.categoryFilter);
    }
  }

  async setCategoryFilter(filter: string): Promise<void> {
    this.categoryFilter = filter;
    await this.runEffect();
  }

  getCourses(): CourseData[] {
    return this.courses;
  }

  getEffectRunCount(): number {
    return this.effectRanCount;
  }
}`,
      },
    ],
    testFiles: [
      {
        filename: 'useCourses.test.ts',
        language: 'typescript',
        code: `describe('useCourses hook (simulated)', () => {
  const testCourses: CourseData[] = [
    { id: 'CRS-A', title: 'Course A', status: 'published' as CourseStatus },
    { id: 'CRS-B', title: 'Course B', status: 'draft' as CourseStatus },
    { id: 'CRS-C', title: 'Course C', status: 'published' as CourseStatus },
    { id: 'CRS-D', title: 'Course D', status: 'archived' as CourseStatus },
  ];

  it('should update the course list when the category filter changes', async () => {
    const client = new CourseApiClient(testCourses);
    const hook = new UseCourseSimulator(client);

    // Wait for initial load
    await new Promise((r) => setTimeout(r, 10));
    expect(hook.getCourses()).toHaveLength(4); // 'all' shows everything

    await hook.setCategoryFilter('published');
    expect(hook.getCourses()).toHaveLength(2);
    expect(hook.getCourses().every((c) => c.status === 'published')).toBe(true);
  });

  it('should re-run the effect when filter changes', async () => {
    const client = new CourseApiClient(testCourses);
    const hook = new UseCourseSimulator(client);

    await new Promise((r) => setTimeout(r, 10));
    const initialRunCount = hook.getEffectRunCount();

    await hook.setCategoryFilter('draft');
    expect(hook.getEffectRunCount()).toBeGreaterThan(initialRunCount);
  });

  it('should show all courses again when filter is set back to all', async () => {
    const client = new CourseApiClient(testCourses);
    const hook = new UseCourseSimulator(client);

    await new Promise((r) => setTimeout(r, 10));
    await hook.setCategoryFilter('published');
    expect(hook.getCourses()).toHaveLength(2);

    await hook.setCategoryFilter('all');
    expect(hook.getCourses()).toHaveLength(4);
  });
});`,
      },
    ],
    solutionExplanation: `### Root Cause

The \`useCourses\` hook's \`useEffect\` dependency array is \`[client]\`. The \`client\` never changes (wrapped in \`useMemo\`), so the effect runs once on mount. When \`categoryFilter\` changes, the effect does not re-run, so the list stays the same.

### Fix

Add \`categoryFilter\` to the dependency array:
\`\`\`typescript
private getEffectDeps(): unknown[] {
  return [this.client, this.categoryFilter];
}
\`\`\``,
  },

  // -----------------------------------------------------------------------
  // Bug 10 — NaN% in Metadata (null-safety, easy)
  // -----------------------------------------------------------------------
  {
    id: 'course-catalog-10',
    project: 'course-catalog',
    projectLabel: 'Course Catalog',
    bugNumber: 10,
    title: '"NaN%" in Certification Details',
    difficulty: 'easy',
    category: 'null-safety',
    language: 'typescript',
    symptom: `### Symptom

Click on a certification course (e.g., "AWS Solutions Architect Certification"). In the detail panel, the "Pass Rate" row shows "NaN%".

**Expected:** If the course metadata does not include a \`passRate\` field, the row should display "N/A" instead.

### Context

\`CertificationCourseCard.detailsRows()\` builds an array of label/value pairs for display. It accesses \`this.course.metadata.passRate\` and multiplies by 100 to get a percentage. The seed data for this course does not include a \`passRate\` field in metadata.`,
    hints: [
      'Look at CertificationCourseCard.detailsRows().',
      'Check what this.course.metadata.passRate evaluates to when the field is missing.',
      'undefined * 100 = NaN. Add a null check and provide a fallback like "N/A".',
    ],
    files: [
      {
        filename: 'CertificationCourseCard.ts',
        language: 'typescript',
        buggyCode: `interface DetailRow {
  label: string;
  value: string;
}

interface CourseData {
  id: string;
  title: string;
  status: string;
  level: number;
  instructor: string | null;
  enrollmentDeadline: string | null;
  tags: string[];
  metadata: Record<string, unknown>;
}

abstract class CourseCardModel {
  protected course: CourseData;

  constructor(course: CourseData) {
    this.course = course;
  }

  protected levelDisplay(): string {
    const labels = ['', 'Beginner', 'Elementary', 'Intermediate', 'Advanced', 'Expert'];
    return labels[this.course.level] ?? 'Unknown';
  }

  abstract detailsRows(): DetailRow[];
}

class CertificationCourseCard extends CourseCardModel {
  detailsRows(): DetailRow[] {
    const examCode = (this.course.metadata as Record<string, unknown>).examCode ?? 'Pending';
    return [
      { label: 'Status', value: this.course.status },
      { label: 'Level', value: this.levelDisplay() },
      { label: 'Exam Code', value: String(examCode) },
      { label: 'Instructor', value: this.course.instructor ?? 'Self-study' },
      {
        label: 'Pass Rate',
        value: \`\${(this.course.metadata as Record<string, number>).passRate * 100}%\`,
      },
      {
        label: 'Deadline',
        value: this.course.enrollmentDeadline
          ? new Date(this.course.enrollmentDeadline).toLocaleString()
          : 'None',
      },
      { label: 'Tags', value: this.course.tags.join(', ') || 'None' },
    ];
  }
}`,
        solutionCode: `interface DetailRow {
  label: string;
  value: string;
}

interface CourseData {
  id: string;
  title: string;
  status: string;
  level: number;
  instructor: string | null;
  enrollmentDeadline: string | null;
  tags: string[];
  metadata: Record<string, unknown>;
}

abstract class CourseCardModel {
  protected course: CourseData;

  constructor(course: CourseData) {
    this.course = course;
  }

  protected levelDisplay(): string {
    const labels = ['', 'Beginner', 'Elementary', 'Intermediate', 'Advanced', 'Expert'];
    return labels[this.course.level] ?? 'Unknown';
  }

  abstract detailsRows(): DetailRow[];
}

class CertificationCourseCard extends CourseCardModel {
  detailsRows(): DetailRow[] {
    const examCode = (this.course.metadata as Record<string, unknown>).examCode ?? 'Pending';
    return [
      { label: 'Status', value: this.course.status },
      { label: 'Level', value: this.levelDisplay() },
      { label: 'Exam Code', value: String(examCode) },
      { label: 'Instructor', value: this.course.instructor ?? 'Self-study' },
      {
        label: 'Pass Rate',
        value: (this.course.metadata as any).passRate != null
          ? \`\${(this.course.metadata as any).passRate * 100}%\`
          : 'N/A',
      },
      {
        label: 'Deadline',
        value: this.course.enrollmentDeadline
          ? new Date(this.course.enrollmentDeadline).toLocaleString()
          : 'None',
      },
      { label: 'Tags', value: this.course.tags.join(', ') || 'None' },
    ];
  }
}`,
      },
    ],
    testFiles: [
      {
        filename: 'certificationCard.test.ts',
        language: 'typescript',
        code: `describe('CertificationCourseCard details', () => {
  it('should show N/A when passRate is missing from metadata', () => {
    const course: CourseData = {
      id: 'CRS-004',
      title: 'AWS Solutions Architect Certification',
      status: 'published',
      level: 5,
      instructor: 'carol',
      enrollmentDeadline: '2025-01-15T12:00:00Z',
      tags: ['aws', 'cloud'],
      metadata: { examCode: 'SAA-C03' }, // no passRate field
    };
    const card = new CertificationCourseCard(course);
    const rows = card.detailsRows();
    const passRateRow = rows.find((r) => r.label === 'Pass Rate');
    expect(passRateRow).toBeDefined();
    expect(passRateRow!.value).not.toContain('NaN');
    expect(passRateRow!.value).toBe('N/A');
  });

  it('should show percentage when passRate exists in metadata', () => {
    const course: CourseData = {
      id: 'CRS-005',
      title: 'Cert With Pass Rate',
      status: 'published',
      level: 4,
      instructor: 'alice',
      enrollmentDeadline: null,
      tags: [],
      metadata: { examCode: 'TEST-01', passRate: 0.85 },
    };
    const card = new CertificationCourseCard(course);
    const rows = card.detailsRows();
    const passRateRow = rows.find((r) => r.label === 'Pass Rate');
    expect(passRateRow).toBeDefined();
    expect(passRateRow!.value).toBe('85%');
  });

  it('should not have any NaN values in any detail row', () => {
    const course: CourseData = {
      id: 'CRS-006',
      title: 'Another Cert',
      status: 'published',
      level: 3,
      instructor: null,
      enrollmentDeadline: null,
      tags: ['cert'],
      metadata: {},
    };
    const card = new CertificationCourseCard(course);
    const rows = card.detailsRows();
    rows.forEach((row) => {
      expect(row.value).not.toContain('NaN');
    });
  });
});`,
      },
    ],
    solutionExplanation: `### Root Cause

\`CertificationCourseCard.detailsRows()\` accesses \`this.course.metadata.passRate\`, which does not exist in the seed data. The expression \`undefined * 100\` evaluates to \`NaN\`, displayed as \`"NaN%"\`.

### Fix

Add a null check and provide a fallback:
\`\`\`typescript
value: (this.course.metadata as any).passRate != null
  ? \`\${(this.course.metadata as any).passRate * 100}%\`
  : 'N/A',
\`\`\``,
  },

  // -----------------------------------------------------------------------
  // Bug 11 — Misleading Test (misleading-test, easy)
  // -----------------------------------------------------------------------
  {
    id: 'course-catalog-11',
    project: 'course-catalog',
    projectLabel: 'Course Catalog',
    bugNumber: 11,
    title: 'Test Expects Wrong Score for Level 1',
    difficulty: 'easy',
    category: 'misleading-test',
    language: 'typescript',
    symptom: `### Symptom

The test \`"should produce base score of 0 for level 1"\` in \`scoring.test.ts\` passes -- but it is asserting the WRONG expected value. If you fix Bug 5 (the off-by-one), this test breaks.

**Expected:** After the off-by-one fix, level 1 should produce a nonzero score.

### Context

This test was written to match the buggy \`(level - 1) * 10\` formula, which gives 0 for level 1. The production code has already been fixed (Bug 5) to use \`level * 10\`. The test needs to be updated to match the corrected behavior.`,
    hints: [
      'This test was written to match the buggy behavior from Bug 5.',
      'After fixing PopularityStrategy.baseScore() to use level * 10, what should the level 1 score be?',
      'Level 1: base = 10, weight = Math.min(1*2, 10) = 2, weighted = 10 * (2/5) = 4. The test should expect 4, not 0.',
    ],
    files: [
      {
        filename: 'PopularityStrategy.ts',
        language: 'typescript',
        buggyCode: `type CourseLevel = 1 | 2 | 3 | 4 | 5;

interface CourseData {
  id: string;
  title: string;
  level: CourseLevel;
  instructor: string | null;
  enrollmentDeadline: string | null;
  tags: string[];
}

interface ScoreBreakdownItem {
  factor: string;
  value: number;
  description: string;
}

interface ScoreResult {
  courseId: string;
  score: number;
  breakdown: ScoreBreakdownItem[];
}

class PopularityStrategy {
  score(course: CourseData): ScoreResult {
    const breakdown: ScoreBreakdownItem[] = [];

    // CORRECT formula (Bug 5 already fixed): level * 10
    let total = course.level * 10;
    breakdown.push({
      factor: 'base_score',
      value: total,
      description: \`Base score from level \${course.level}\`,
    });

    // Apply level weight with clamp
    const weight = Math.min(course.level * 2, 10);
    const weighted = total * (weight / 5);
    breakdown.push({
      factor: 'level_weight',
      value: weighted - total,
      description: \`Level \${course.level} weight applied\`,
    });
    total = weighted;

    // Apply instructor adjustment
    if (!course.instructor) {
      breakdown.push({
        factor: 'self_paced_boost',
        value: 5,
        description: 'Self-paced course receives priority boost',
      });
      total += 5;
    }

    return {
      courseId: course.id,
      score: Math.round(total * 100) / 100,
      breakdown,
    };
  }
}

function createTestCourse(overrides: Partial<CourseData> = {}): CourseData {
  return {
    id: 'TEST-001',
    title: 'Test Course',
    level: 3 as CourseLevel,
    instructor: 'tester',
    enrollmentDeadline: null,
    tags: [],
    ...overrides,
  };
}`,
        solutionCode: `type CourseLevel = 1 | 2 | 3 | 4 | 5;

interface CourseData {
  id: string;
  title: string;
  level: CourseLevel;
  instructor: string | null;
  enrollmentDeadline: string | null;
  tags: string[];
}

interface ScoreBreakdownItem {
  factor: string;
  value: number;
  description: string;
}

interface ScoreResult {
  courseId: string;
  score: number;
  breakdown: ScoreBreakdownItem[];
}

class PopularityStrategy {
  score(course: CourseData): ScoreResult {
    const breakdown: ScoreBreakdownItem[] = [];

    let total = course.level * 10;
    breakdown.push({
      factor: 'base_score',
      value: total,
      description: \`Base score from level \${course.level}\`,
    });

    const weight = Math.min(course.level * 2, 10);
    const weighted = total * (weight / 5);
    breakdown.push({
      factor: 'level_weight',
      value: weighted - total,
      description: \`Level \${course.level} weight applied\`,
    });
    total = weighted;

    if (!course.instructor) {
      breakdown.push({
        factor: 'self_paced_boost',
        value: 5,
        description: 'Self-paced course receives priority boost',
      });
      total += 5;
    }

    return {
      courseId: course.id,
      score: Math.round(total * 100) / 100,
      breakdown,
    };
  }
}

function createTestCourse(overrides: Partial<CourseData> = {}): CourseData {
  return {
    id: 'TEST-001',
    title: 'Test Course',
    level: 3 as CourseLevel,
    instructor: 'tester',
    enrollmentDeadline: null,
    tags: [],
    ...overrides,
  };
}`,
      },
    ],
    testFiles: [
      {
        filename: 'scoring.test.ts',
        language: 'typescript',
        code: `describe('PopularityStrategy level 1 scoring', () => {
  // After fixing Bug 5, level 1 -> base 10, then level weight (1*2/5 = 0.4), total = 10*0.4 = 4
  // The test should expect 4, not 0.
  it('should produce correct score for level 1 (not 0)', () => {
    const strategy = new PopularityStrategy();
    const course = createTestCourse({ level: 1 as CourseLevel });
    const result = strategy.score(course);
    // Level 1: base = 10, weight = min(2, 10) = 2, weighted = 10 * (2/5) = 4
    expect(result.score).toBe(4);
  });

  it('should produce correct score for level 3', () => {
    const strategy = new PopularityStrategy();
    const course = createTestCourse({ level: 3 as CourseLevel });
    const result = strategy.score(course);
    // Level 3: base = 30, weight = min(6, 10) = 6, weighted = 30 * (6/5) = 36
    expect(result.score).toBe(36);
  });

  it('should produce nonzero score for level 1', () => {
    const strategy = new PopularityStrategy();
    const course = createTestCourse({ level: 1 as CourseLevel });
    const result = strategy.score(course);
    expect(result.score).toBeGreaterThan(0);
  });
});`,
      },
    ],
    solutionExplanation: `### Root Cause

The test was written to match the buggy \`(level - 1) * 10\` formula from Bug 5, which gives 0 for level 1. After fixing Bug 5 to \`level * 10\`, level 1 produces base score 10. The level weight for level 1 is \`Math.min(1*2, 10) = 2\`, so weighted = \`10 * (2/5) = 4\`.

### Fix

Update the test expectation:
\`\`\`typescript
// Was: expect(result.score).toBe(0);
expect(result.score).toBe(4);
\`\`\``,
  },

  // -----------------------------------------------------------------------
  // Bug 12 — Timezone Test (timezone, easy)
  // -----------------------------------------------------------------------
  {
    id: 'course-catalog-12',
    project: 'course-catalog',
    projectLabel: 'Course Catalog',
    bugNumber: 12,
    title: 'Date Parsing Test Fails in Different Timezones',
    difficulty: 'easy',
    category: 'timezone',
    language: 'typescript',
    symptom: `### Symptom

The test \`"should parse course dates correctly"\` passes on some machines but fails on others. It works in UTC but breaks in any other timezone (e.g., EST, IST, AEST).

**Expected:** Date parsing should produce consistent results regardless of the local timezone.

### Context

The course's \`createdAt\` is a UTC timestamp (\`Z\` suffix): \`"2025-01-15T10:30:00Z"\`. The test parses it and checks the hour. The JavaScript \`Date\` object has both local-time and UTC accessors.`,
    hints: [
      'Look at what getHours() returns versus getUTCHours().',
      'The course createdAt is a UTC timestamp (Z suffix). Your local timezone determines what getHours() returns.',
      'getHours() returns the hour in the local timezone. Use getUTCHours() for timezone-independent results.',
    ],
    files: [
      {
        filename: 'dateUtils.ts',
        language: 'typescript',
        buggyCode: `interface CourseData {
  id: string;
  title: string;
  createdAt: string;
}

function createTestCourse(overrides: Partial<CourseData> = {}): CourseData {
  return {
    id: 'TEST-001',
    title: 'Test Course',
    createdAt: '2025-01-15T10:30:00Z',
    ...overrides,
  };
}

function getCreatedHour(course: CourseData): number {
  const date = new Date(course.createdAt);
  return date.getHours(); // timezone-dependent!
}`,
        solutionCode: `interface CourseData {
  id: string;
  title: string;
  createdAt: string;
}

function createTestCourse(overrides: Partial<CourseData> = {}): CourseData {
  return {
    id: 'TEST-001',
    title: 'Test Course',
    createdAt: '2025-01-15T10:30:00Z',
    ...overrides,
  };
}

function getCreatedHour(course: CourseData): number {
  const date = new Date(course.createdAt);
  return date.getUTCHours();
}`,
      },
    ],
    testFiles: [
      {
        filename: 'dateParsing.test.ts',
        language: 'typescript',
        code: `describe('Course date parsing', () => {
  it('should parse course dates correctly and return UTC hour', () => {
    const course = createTestCourse({
      createdAt: '2025-01-15T10:30:00Z',
    });
    const hour = getCreatedHour(course);
    // This should always be 10 regardless of local timezone
    expect(hour).toBe(10);
  });

  it('should handle midnight UTC correctly', () => {
    const course = createTestCourse({
      createdAt: '2025-06-01T00:00:00Z',
    });
    const hour = getCreatedHour(course);
    expect(hour).toBe(0);
  });

  it('should handle afternoon UTC correctly', () => {
    const course = createTestCourse({
      createdAt: '2025-03-20T15:45:00Z',
    });
    const hour = getCreatedHour(course);
    expect(hour).toBe(15);
  });
});`,
      },
    ],
    solutionExplanation: `### Root Cause

The test uses \`date.getHours()\` which returns the hour in the local timezone. The course timestamp is \`2025-01-15T10:30:00Z\` (UTC). \`getHours()\` returns 10 only if the local timezone is UTC. In any other timezone it returns a different value, causing the test to fail.

### Fix

Use \`getUTCHours()\` instead:
\`\`\`typescript
return date.getUTCHours();
\`\`\``,
  },
];
