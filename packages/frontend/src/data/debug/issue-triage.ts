import type { DebugExercise } from './types';

// ---------------------------------------------------------------------------
// Issue Triage -- 12 debug exercises
// ---------------------------------------------------------------------------

export const issueTriageExercises: DebugExercise[] = [
  // -----------------------------------------------------------------------
  // 1. Field Name Mismatch Silently Ignores Policy Selection
  // -----------------------------------------------------------------------
  {
    id: 'issue-triage-1',
    project: 'issue-triage',
    projectLabel: 'Issue Triage',
    bugNumber: 1,
    title: 'Field Name Mismatch Silently Ignores Policy Selection',
    difficulty: 'easy',
    category: 'type-mismatch',
    language: 'typescript',
    symptom: `### Symptom

Select "Enterprise" or "Safety Critical" from the policy dropdown and run triage. The \`policyUsed\` field in the response always says \`"standard"\`, no matter what you choose.

### Context

The Issue Triage app has a shared \`TriageRequest\` type used by both frontend and backend. The frontend builds a request body and the backend destructures it. A **Zod validation schema** validates the incoming body before the handler processes it.

Trace the field name from the frontend API client through the validation schema to the route handler.`,
    hints: [
      'Compare what the frontend sends in the POST body with what the backend expects.',
      'Look at the shared type definition for `TriageRequest` and the Zod validation schema.',
      'The type says `policyName` but the frontend sends `policyType`. The handler destructures `policyName` from the body, which is always `undefined`, so the factory falls back to StandardPolicy.',
    ],
    files: [
      {
        filename: 'triage.ts',
        language: 'typescript',
        buggyCode: `// ---- Types ----
type Severity = 1 | 2 | 3 | 4 | 5;

interface IncidentData {
  id: string;
  title: string;
  severity: Severity;
  status: string;
  assignee: string | null;
  tags: string[];
}

interface TriageRequest {
  policyName: string;  // BUG: type says "policyName"
  incidentIds?: string[];
}

interface TriageResponse {
  policyUsed: string;
  results: { incidentId: string; score: number }[];
}

// ---- Policy Factory (simplified) ----
export function createPolicy(name: string | undefined): { name: string; score: (i: IncidentData) => number } {
  const policies: Record<string, { name: string; score: (i: IncidentData) => number }> = {
    standard: { name: 'standard', score: (i) => i.severity * 10 },
    enterprise: { name: 'enterprise', score: (i) => i.severity * 12 },
    safety_critical: { name: 'safety_critical', score: (i) => i.severity * 15 },
  };
  return policies[name ?? ''] ?? policies['standard'];
}

// ---- Frontend sends this ----
export function buildTriageRequestFromUI(selectedPolicy: string, incidentIds: string[]): Record<string, unknown> {
  return {
    policyType: selectedPolicy,  // Frontend sends "policyType"
    incidentIds,
  };
}

// ---- Backend handler ----
export function handleTriageRequest(
  requestBody: Record<string, unknown>,
  incidents: IncidentData[]
): TriageResponse {
  // Cast to TriageRequest type and destructure
  const { policyName } = requestBody as TriageRequest;  // BUG: reads "policyName" but body has "policyType"
  const policy = createPolicy(policyName);

  const results = incidents.map((i) => ({
    incidentId: i.id,
    score: policy.score(i),
  }));

  return {
    policyUsed: policy.name,
    results,
  };
}`,
        solutionCode: `// ---- Types ----
type Severity = 1 | 2 | 3 | 4 | 5;

interface IncidentData {
  id: string;
  title: string;
  severity: Severity;
  status: string;
  assignee: string | null;
  tags: string[];
}

interface TriageRequest {
  policyType: string;  // FIX: aligned with what frontend sends
  incidentIds?: string[];
}

interface TriageResponse {
  policyUsed: string;
  results: { incidentId: string; score: number }[];
}

// ---- Policy Factory (simplified) ----
export function createPolicy(name: string | undefined): { name: string; score: (i: IncidentData) => number } {
  const policies: Record<string, { name: string; score: (i: IncidentData) => number }> = {
    standard: { name: 'standard', score: (i) => i.severity * 10 },
    enterprise: { name: 'enterprise', score: (i) => i.severity * 12 },
    safety_critical: { name: 'safety_critical', score: (i) => i.severity * 15 },
  };
  return policies[name ?? ''] ?? policies['standard'];
}

// ---- Frontend sends this ----
export function buildTriageRequestFromUI(selectedPolicy: string, incidentIds: string[]): Record<string, unknown> {
  return {
    policyType: selectedPolicy,
    incidentIds,
  };
}

// ---- Backend handler ----
export function handleTriageRequest(
  requestBody: Record<string, unknown>,
  incidents: IncidentData[]
): TriageResponse {
  const { policyType } = requestBody as TriageRequest;  // FIX: reads "policyType" to match body
  const policy = createPolicy(policyType);

  const results = incidents.map((i) => ({
    incidentId: i.id,
    score: policy.score(i),
  }));

  return {
    policyUsed: policy.name,
    results,
  };
}`,
      },
    ],
    testFiles: [
      {
        filename: 'triage.test.ts',
        language: 'typescript',
        code: `import { buildTriageRequestFromUI, handleTriageRequest } from "./triage";

type Severity = 1 | 2 | 3 | 4 | 5;

interface IncidentData {
  id: string;
  title: string;
  severity: Severity;
  status: string;
  assignee: string | null;
  tags: string[];
}

describe('Bug 1: Policy Selection Has No Effect', () => {
  it('should use the selected policy, not always standard', () => {
    const incidents: IncidentData[] = [
      { id: 'INC-1', title: 'Test', severity: 3 as Severity, status: 'open', assignee: null, tags: [] },
    ];

    const requestBody = buildTriageRequestFromUI('enterprise', ['INC-1']);
    const response = handleTriageRequest(requestBody, incidents);

    expect(response.policyUsed).toBe('enterprise');
  });

  it('should fall back to standard when no policy specified', () => {
    const incidents: IncidentData[] = [
      { id: 'INC-1', title: 'Test', severity: 3 as Severity, status: 'open', assignee: null, tags: [] },
    ];

    const requestBody = { incidentIds: ['INC-1'] };
    const response = handleTriageRequest(requestBody, incidents);

    expect(response.policyUsed).toBe('standard');
  });

  it('should produce different scores for different policies', () => {
    const incidents: IncidentData[] = [
      { id: 'INC-1', title: 'Test', severity: 4 as Severity, status: 'open', assignee: null, tags: [] },
    ];

    const standardBody = buildTriageRequestFromUI('standard', ['INC-1']);
    const enterpriseBody = buildTriageRequestFromUI('enterprise', ['INC-1']);

    const standardResponse = handleTriageRequest(standardBody, incidents);
    const enterpriseResponse = handleTriageRequest(enterpriseBody, incidents);

    expect(standardResponse.results[0].score).not.toBe(enterpriseResponse.results[0].score);
  });

  it('should use safety_critical policy when requested', () => {
    const incidents: IncidentData[] = [
      { id: 'INC-1', title: 'Test', severity: 5 as Severity, status: 'open', assignee: 'bob', tags: [] },
    ];

    const requestBody = buildTriageRequestFromUI('safety_critical', ['INC-1']);
    const response = handleTriageRequest(requestBody, incidents);

    expect(response.policyUsed).toBe('safety_critical');
  });
});`,
      },
    ],
    solutionExplanation: `### Root Cause

The shared type \`TriageRequest\` defines the field as \`policyName\`, but the frontend sends \`policyType\`. The Zod validation schema validates \`policyType\` (so requests pass validation), but the route handler destructures \`policyName\` from the body (cast as \`TriageRequest\`), which is always \`undefined\`.

Since \`policyName\` is always \`undefined\`, \`createPolicy(undefined)\` falls back to \`StandardPolicy\`.

### Fix

Align the field name to \`policyType\` in both the type and the destructuring:
\`\`\`typescript
interface TriageRequest {
  policyType: string;  // was: policyName
}
const { policyType } = requestBody as TriageRequest;
\`\`\``,
  },

  // -----------------------------------------------------------------------
  // 2. Missing Severity Clamp in Safety-Critical Policy Override
  // -----------------------------------------------------------------------
  {
    id: 'issue-triage-2',
    project: 'issue-triage',
    projectLabel: 'Issue Triage',
    bugNumber: 2,
    title: 'Missing Severity Clamp in Safety-Critical Policy Override',
    difficulty: 'medium',
    category: 'inheritance',
    language: 'typescript',
    symptom: `### Symptom

When using SafetyCriticalPolicy, severity 5 incidents get scores in the hundreds or thousands -- way beyond the expected 0-100 range.

### Context

The scoring system uses a **Template Method** pattern. The base \`Policy\` class orchestrates the scoring pipeline:

1. \`baseScore()\` -- subclass computes initial score
2. \`applySeverityWeight()\` -- multiplies by clamped severity weight
3. Final rounding

The base \`applySeverityWeight()\` clamps the multiplier via \`Math.min(severity * 2, 10)\`. \`SafetyCriticalPolicy\` overrides this method.`,
    hints: [
      'Look at how `SafetyCriticalPolicy` overrides `applySeverityWeight`.',
      'Compare it to the base `Policy.applySeverityWeight` method. What differs?',
      'The base method clamps the multiplier via `Math.min(severity * 2, 10)`. The override uses `severity * 3` without any clamp, allowing multipliers up to 15.',
    ],
    files: [
      {
        filename: 'scoring.ts',
        language: 'typescript',
        buggyCode: `// ---- Types ----
type Severity = 1 | 2 | 3 | 4 | 5;

interface IncidentData {
  id: string;
  severity: Severity;
  assignee: string | null;
  tags: string[];
}

interface ScoreBreakdownItem {
  factor: string;
  value: number;
  description: string;
}

// ---- Base Policy ----
export class Policy {
  baseScore(incident: IncidentData, breakdown: ScoreBreakdownItem[]): number {
    const base = incident.severity * 10;
    breakdown.push({ factor: 'base_score', value: base, description: \`Base from severity \${incident.severity}\` });
    return base;
  }

  applySeverityWeight(currentScore: number, incident: IncidentData, breakdown: ScoreBreakdownItem[]): number {
    const weight = Math.min(incident.severity * 2, 10);  // Clamped to max 10
    const weighted = currentScore * (weight / 5);
    breakdown.push({ factor: 'severity_weight', value: weighted - currentScore, description: \`Severity weight (clamped max 10)\` });
    return weighted;
  }

  score(incident: IncidentData): { score: number; breakdown: ScoreBreakdownItem[] } {
    const breakdown: ScoreBreakdownItem[] = [];
    let total = this.baseScore(incident, breakdown);
    total = this.applySeverityWeight(total, incident, breakdown);
    return { score: Math.round(total * 100) / 100, breakdown };
  }
}

// ---- Safety-Critical Policy ----
export class SafetyCriticalPolicy extends Policy {
  baseScore(incident: IncidentData, breakdown: ScoreBreakdownItem[]): number {
    const base = incident.severity * 15;
    breakdown.push({ factor: 'base_score', value: base, description: \`Safety-critical base from severity \${incident.severity}\` });
    return base;
  }

  applySeverityWeight(currentScore: number, incident: IncidentData, breakdown: ScoreBreakdownItem[]): number {
    const multiplier = incident.severity * 3;  // BUG: no clamp! severity 5 => multiplier 15
    const weighted = currentScore * (multiplier / 5);
    breakdown.push({ factor: 'safety_severity_weight', value: weighted - currentScore, description: \`Safety severity multiplier (\${multiplier})\` });
    return weighted;
  }
}`,
        solutionCode: `// ---- Types ----
type Severity = 1 | 2 | 3 | 4 | 5;

interface IncidentData {
  id: string;
  severity: Severity;
  assignee: string | null;
  tags: string[];
}

interface ScoreBreakdownItem {
  factor: string;
  value: number;
  description: string;
}

// ---- Base Policy ----
export class Policy {
  baseScore(incident: IncidentData, breakdown: ScoreBreakdownItem[]): number {
    const base = incident.severity * 10;
    breakdown.push({ factor: 'base_score', value: base, description: \`Base from severity \${incident.severity}\` });
    return base;
  }

  applySeverityWeight(currentScore: number, incident: IncidentData, breakdown: ScoreBreakdownItem[]): number {
    const weight = Math.min(incident.severity * 2, 10);
    const weighted = currentScore * (weight / 5);
    breakdown.push({ factor: 'severity_weight', value: weighted - currentScore, description: \`Severity weight (clamped max 10)\` });
    return weighted;
  }

  score(incident: IncidentData): { score: number; breakdown: ScoreBreakdownItem[] } {
    const breakdown: ScoreBreakdownItem[] = [];
    let total = this.baseScore(incident, breakdown);
    total = this.applySeverityWeight(total, incident, breakdown);
    return { score: Math.round(total * 100) / 100, breakdown };
  }
}

// ---- Safety-Critical Policy ----
export class SafetyCriticalPolicy extends Policy {
  baseScore(incident: IncidentData, breakdown: ScoreBreakdownItem[]): number {
    const base = incident.severity * 15;
    breakdown.push({ factor: 'base_score', value: base, description: \`Safety-critical base from severity \${incident.severity}\` });
    return base;
  }

  applySeverityWeight(currentScore: number, incident: IncidentData, breakdown: ScoreBreakdownItem[]): number {
    const multiplier = Math.min(incident.severity * 3, 10);  // FIX: added clamp
    const weighted = currentScore * (multiplier / 5);
    breakdown.push({ factor: 'safety_severity_weight', value: weighted - currentScore, description: \`Safety severity multiplier (\${multiplier})\` });
    return weighted;
  }
}`,
      },
    ],
    testFiles: [
      {
        filename: 'scoring.test.ts',
        language: 'typescript',
        code: `import { Policy, SafetyCriticalPolicy } from "./scoring";

type Severity = 1 | 2 | 3 | 4 | 5;

interface IncidentData {
  id: string;
  severity: Severity;
  assignee: string | null;
  tags: string[];
}

describe('Bug 2: Safety-Critical Scores Are Absurdly High', () => {
  it('should keep severity 5 scores within reasonable range (under 200)', () => {
    const incident: IncidentData = { id: 'INC-1', severity: 5 as Severity, assignee: 'bob', tags: [] };
    const policy = new SafetyCriticalPolicy();
    const result = policy.score(incident);

    expect(result.score).toBeLessThan(200);
  });

  it('should clamp the severity multiplier to max 10', () => {
    const incident: IncidentData = { id: 'INC-1', severity: 5 as Severity, assignee: null, tags: [] };
    const policy = new SafetyCriticalPolicy();
    const result = policy.score(incident);

    // With clamp: base=75, weight=min(15,10)=10, weighted=75*(10/5)=150
    // Without clamp: base=75, weight=15, weighted=75*(15/5)=225
    expect(result.score).toBeLessThanOrEqual(150);
  });

  it('should score higher than base policy for the same incident', () => {
    const incident: IncidentData = { id: 'INC-1', severity: 4 as Severity, assignee: 'alice', tags: [] };
    const base = new Policy();
    const safety = new SafetyCriticalPolicy();

    expect(safety.score(incident).score).toBeGreaterThan(base.score(incident).score);
  });

  it('should not produce absurd scores for low severity either', () => {
    const incident: IncidentData = { id: 'INC-2', severity: 2 as Severity, assignee: null, tags: [] };
    const policy = new SafetyCriticalPolicy();
    const result = policy.score(incident);

    expect(result.score).toBeLessThan(100);
  });
});`,
      },
    ],
    solutionExplanation: `### Root Cause

The base \`Policy.applySeverityWeight()\` clamps the multiplier via \`Math.min(severity * 2, 10)\`. The \`SafetyCriticalPolicy\` override uses \`severity * 3\` **without any clamp**, allowing multipliers up to 15.

For severity 5: multiplier = 15, so \`weighted = base * (15/5) = base * 3\`. With a safety-critical base of 75, that produces 225 -- way beyond the expected range.

### Fix

Add \`Math.min(..., 10)\` to the override:
\`\`\`typescript
const multiplier = Math.min(incident.severity * 3, 10);
\`\`\``,
  },

  // -----------------------------------------------------------------------
  // 3. Lost this Context When Passing Method as Callback
  // -----------------------------------------------------------------------
  {
    id: 'issue-triage-3',
    project: 'issue-triage',
    projectLabel: 'Issue Triage',
    bugNumber: 3,
    title: 'Lost this Context When Passing Method as Callback',
    difficulty: 'medium',
    category: 'this-binding',
    language: 'typescript',
    symptom: `### Symptom

If the API returns an error for fetching an incident, the app crashes with \`TypeError: Cannot read properties of undefined (reading 'clientName')\` instead of showing a clean error message.

### Context

The frontend uses an \`IncidentApiClient\` that extends \`BaseApiClient\`. The base class has a \`handleError\` method that wraps errors with the client name for better debugging. The \`fetchIncident\` method chains \`.catch()\` to handle errors.`,
    hints: [
      'Look at `IncidentApiClient.fetchIncident()` and how it handles errors.',
      'How is `handleError` passed to `.catch()`? What happens to `this` inside a method when passed as a bare callback reference?',
      'Use an arrow wrapper `(e) => this.handleError(e)`, or bind in the constructor, or make `handleError` an arrow property.',
    ],
    files: [
      {
        filename: 'api-client.ts',
        language: 'typescript',
        buggyCode: `// ---- Base API Client ----
export class BaseApiClient {
  protected baseUrl: string;
  protected clientName: string;

  constructor(baseUrl: string, clientName: string = 'ApiClient') {
    this.baseUrl = baseUrl;
    this.clientName = clientName;
  }

  protected async get<T>(path: string): Promise<T> {
    // Simulate a network request that can fail
    throw new Error(\`HTTP 404: Not Found\`);
  }

  handleError(error: Error): never {
    console.error(\`[\${this.clientName}] Error:\`, error.message);
    throw new Error(\`[\${this.clientName}] \${error.message}\`);
  }
}

// ---- Incident API Client ----
export class IncidentApiClient extends BaseApiClient {
  constructor(baseUrl = '/api') {
    super(baseUrl, 'IncidentApiClient');
  }

  async fetchIncident(id: string): Promise<any> {
    return this.get(\`/incidents/\${id}\`).catch(this.handleError);  // BUG: \`this\` is lost
  }
}`,
        solutionCode: `// ---- Base API Client ----
export class BaseApiClient {
  protected baseUrl: string;
  protected clientName: string;

  constructor(baseUrl: string, clientName: string = 'ApiClient') {
    this.baseUrl = baseUrl;
    this.clientName = clientName;
  }

  protected async get<T>(path: string): Promise<T> {
    throw new Error(\`HTTP 404: Not Found\`);
  }

  handleError(error: Error): never {
    console.error(\`[\${this.clientName}] Error:\`, error.message);
    throw new Error(\`[\${this.clientName}] \${error.message}\`);
  }
}

// ---- Incident API Client ----
export class IncidentApiClient extends BaseApiClient {
  constructor(baseUrl = '/api') {
    super(baseUrl, 'IncidentApiClient');
  }

  async fetchIncident(id: string): Promise<any> {
    return this.get(\`/incidents/\${id}\`).catch((e) => this.handleError(e));  // FIX: arrow wrapper preserves \`this\`
  }
}`,
      },
    ],
    testFiles: [
      {
        filename: 'api-client.test.ts',
        language: 'typescript',
        code: `import { IncidentApiClient } from "./api-client";

describe('Bug 3: this Binding Lost in Error Handler', () => {
  it('should include client name in error message', async () => {
    const client = new IncidentApiClient('/api');

    try {
      await client.fetchIncident('nonexistent');
      expect(true).toBe(false); // Should not reach here
    } catch (e: any) {
      expect(e.message).toContain('IncidentApiClient');
    }
  });

  it('should not throw TypeError about undefined', async () => {
    const client = new IncidentApiClient('/api');

    try {
      await client.fetchIncident('bad-id');
      expect(true).toBe(false);
    } catch (e: any) {
      expect(e.message).not.toContain('Cannot read properties of undefined');
      expect(e).toBeInstanceOf(Error);
    }
  });

  it('should wrap the original error message', async () => {
    const client = new IncidentApiClient('/api');

    try {
      await client.fetchIncident('missing');
      expect(true).toBe(false);
    } catch (e: any) {
      expect(e.message).toContain('HTTP 404');
    }
  });

  it('should produce a properly formatted error string', async () => {
    const client = new IncidentApiClient('/api');

    try {
      await client.fetchIncident('xyz');
      expect(true).toBe(false);
    } catch (e: any) {
      expect(e.message).toMatch(/\\[IncidentApiClient\\]/);
    }
  });
});`,
      },
    ],
    solutionExplanation: `### Root Cause

\`IncidentApiClient.fetchIncident()\` passes \`this.handleError\` as a bare callback reference to \`.catch()\`. When the promise rejects, \`handleError\` runs without \`this\` bound to the class instance. In strict mode (ES modules), \`this\` is \`undefined\`, so \`this.clientName\` throws a TypeError.

### Fix

Use an arrow wrapper to preserve the \`this\` context:
\`\`\`typescript
return this.get(\`/incidents/\${id}\`).catch((e) => this.handleError(e));
\`\`\``,
  },

  // -----------------------------------------------------------------------
  // 4. Sort Comparator Produces Ascending Instead of Descending Order
  // -----------------------------------------------------------------------
  {
    id: 'issue-triage-4',
    project: 'issue-triage',
    projectLabel: 'Issue Triage',
    bugNumber: 4,
    title: 'Sort Comparator Produces Ascending Instead of Descending Order',
    difficulty: 'easy',
    category: 'sort-logic',
    language: 'typescript',
    symptom: `### Symptom

After running triage, the highest-priority incidents (highest scores) appear at the **bottom** of the results list instead of the top.

### Context

The triage handler scores all incidents and then sorts them before returning. The UI renders results in array order, so the first element should be the highest-priority incident.`,
    hints: [
      'Look at the triage route handler and check the sort comparator direction.',
      '`a.score - b.score` sorts ascending (lowest first). For triage, highest-priority should be first.',
      'Swap to `b.score - a.score` for descending order.',
    ],
    files: [
      {
        filename: 'triage-sort.ts',
        language: 'typescript',
        buggyCode: `// ---- Types ----
interface ScoreResult {
  incidentId: string;
  score: number;
  recommendedAction: string;
}

interface TriageResponse {
  results: ScoreResult[];
  policyUsed: string;
}

// ---- Triage Handler ----
export function runTriage(incidents: { id: string; severity: number }[]): TriageResponse {
  const results: ScoreResult[] = incidents.map((i) => ({
    incidentId: i.id,
    score: i.severity * 10,
    recommendedAction: i.severity >= 4 ? 'escalate' : 'monitor',
  }));

  results.sort((a, b) => a.score - b.score);  // BUG: ascending order (lowest first)

  return { results, policyUsed: 'standard' };
}`,
        solutionCode: `// ---- Types ----
interface ScoreResult {
  incidentId: string;
  score: number;
  recommendedAction: string;
}

interface TriageResponse {
  results: ScoreResult[];
  policyUsed: string;
}

// ---- Triage Handler ----
export function runTriage(incidents: { id: string; severity: number }[]): TriageResponse {
  const results: ScoreResult[] = incidents.map((i) => ({
    incidentId: i.id,
    score: i.severity * 10,
    recommendedAction: i.severity >= 4 ? 'escalate' : 'monitor',
  }));

  results.sort((a, b) => b.score - a.score);  // FIX: descending order (highest first)

  return { results, policyUsed: 'standard' };
}`,
      },
    ],
    testFiles: [
      {
        filename: 'triage-sort.test.ts',
        language: 'typescript',
        code: `import { runTriage } from "./triage-sort";

describe('Bug 4: Triage Results in Wrong Order', () => {
  it('should return results in descending score order (highest first)', () => {
    const incidents = [
      { id: 'LOW', severity: 1 },
      { id: 'HIGH', severity: 5 },
      { id: 'MED', severity: 3 },
    ];

    const response = runTriage(incidents);

    expect(response.results[0].incidentId).toBe('HIGH');
    expect(response.results[1].incidentId).toBe('MED');
    expect(response.results[2].incidentId).toBe('LOW');
  });

  it('should have the highest score first', () => {
    const incidents = [
      { id: 'A', severity: 2 },
      { id: 'B', severity: 4 },
    ];

    const response = runTriage(incidents);

    expect(response.results[0].score).toBeGreaterThan(response.results[1].score);
  });

  it('should preserve all results after sorting', () => {
    const incidents = [
      { id: 'A', severity: 1 },
      { id: 'B', severity: 5 },
      { id: 'C', severity: 3 },
    ];

    const response = runTriage(incidents);
    expect(response.results).toHaveLength(3);
  });

  it('should handle single-element arrays', () => {
    const incidents = [{ id: 'ONLY', severity: 3 }];
    const response = runTriage(incidents);

    expect(response.results).toHaveLength(1);
    expect(response.results[0].incidentId).toBe('ONLY');
  });
});`,
      },
    ],
    solutionExplanation: `### Root Cause

The sort comparator uses \`a.score - b.score\`, which sorts ascending (lowest first). For triage, highest-priority (highest scores) should be first.

### Fix

Reverse the comparator:
\`\`\`typescript
results.sort((a, b) => b.score - a.score);
\`\`\``,
  },

  // -----------------------------------------------------------------------
  // 5. Off-by-One Error Makes Severity 1 Score Zero
  // -----------------------------------------------------------------------
  {
    id: 'issue-triage-5',
    project: 'issue-triage',
    projectLabel: 'Issue Triage',
    bugNumber: 5,
    title: 'Off-by-One Error Makes Severity 1 Score Zero',
    difficulty: 'easy',
    category: 'off-by-one',
    language: 'typescript',
    symptom: `### Symptom

Incidents with severity 1 always get a triage score of **0** using StandardPolicy. Severity 2 gets 10. Expected: severity 1 should produce a base score of 10.

### Context

The scoring system uses a Template Method pattern. \`StandardPolicy\` overrides \`baseScore()\` to compute the initial score from severity. The base score is then fed into \`applySeverityWeight()\` which multiplies by a clamped weight.`,
    hints: [
      'Look at `StandardPolicy.baseScore()` and check the arithmetic formula.',
      'What does `(severity - 1) * 10` produce for severity 1? For severity 2?',
      'The formula subtracts 1 before multiplying. Severity 1 gives (1-1)*10 = 0. It should just be `severity * 10`.',
    ],
    files: [
      {
        filename: 'standard-policy.ts',
        language: 'typescript',
        buggyCode: `// ---- Types ----
type Severity = 1 | 2 | 3 | 4 | 5;

interface IncidentData {
  id: string;
  severity: Severity;
  assignee: string | null;
}

interface ScoreBreakdownItem {
  factor: string;
  value: number;
  description: string;
}

// ---- Standard Policy ----
export class StandardPolicy {
  baseScore(incident: IncidentData, breakdown: ScoreBreakdownItem[]): number {
    const base = (incident.severity - 1) * 10;  // BUG: severity 1 => 0
    breakdown.push({
      factor: 'base_score',
      value: base,
      description: \`Base score from severity \${incident.severity}\`,
    });
    return base;
  }

  applySeverityWeight(currentScore: number, incident: IncidentData, breakdown: ScoreBreakdownItem[]): number {
    const weight = Math.min(incident.severity * 2, 10);
    const weighted = currentScore * (weight / 5);
    breakdown.push({ factor: 'severity_weight', value: weighted - currentScore, description: 'Severity weight' });
    return weighted;
  }

  score(incident: IncidentData): { score: number; breakdown: ScoreBreakdownItem[] } {
    const breakdown: ScoreBreakdownItem[] = [];
    let total = this.baseScore(incident, breakdown);
    total = this.applySeverityWeight(total, incident, breakdown);
    return { score: Math.round(total * 100) / 100, breakdown };
  }
}`,
        solutionCode: `// ---- Types ----
type Severity = 1 | 2 | 3 | 4 | 5;

interface IncidentData {
  id: string;
  severity: Severity;
  assignee: string | null;
}

interface ScoreBreakdownItem {
  factor: string;
  value: number;
  description: string;
}

// ---- Standard Policy ----
export class StandardPolicy {
  baseScore(incident: IncidentData, breakdown: ScoreBreakdownItem[]): number {
    const base = incident.severity * 10;  // FIX: no off-by-one
    breakdown.push({
      factor: 'base_score',
      value: base,
      description: \`Base score from severity \${incident.severity}\`,
    });
    return base;
  }

  applySeverityWeight(currentScore: number, incident: IncidentData, breakdown: ScoreBreakdownItem[]): number {
    const weight = Math.min(incident.severity * 2, 10);
    const weighted = currentScore * (weight / 5);
    breakdown.push({ factor: 'severity_weight', value: weighted - currentScore, description: 'Severity weight' });
    return weighted;
  }

  score(incident: IncidentData): { score: number; breakdown: ScoreBreakdownItem[] } {
    const breakdown: ScoreBreakdownItem[] = [];
    let total = this.baseScore(incident, breakdown);
    total = this.applySeverityWeight(total, incident, breakdown);
    return { score: Math.round(total * 100) / 100, breakdown };
  }
}`,
      },
    ],
    testFiles: [
      {
        filename: 'standard-policy.test.ts',
        language: 'typescript',
        code: `import { StandardPolicy } from "./standard-policy";

type Severity = 1 | 2 | 3 | 4 | 5;

interface IncidentData {
  id: string;
  severity: Severity;
  assignee: string | null;
}

interface ScoreBreakdownItem {
  factor: string;
  value: number;
  description: string;
}

describe('Bug 5: Off-by-One in Base Score', () => {
  it('should give severity 1 a non-zero score', () => {
    const incident: IncidentData = { id: 'INC-1', severity: 1 as Severity, assignee: 'tester' };
    const policy = new StandardPolicy();
    const result = policy.score(incident);

    expect(result.score).toBeGreaterThan(0);
  });

  it('should give severity 1 a base score of 10', () => {
    const incident: IncidentData = { id: 'INC-1', severity: 1 as Severity, assignee: 'tester' };
    const policy = new StandardPolicy();
    const breakdown: ScoreBreakdownItem[] = [];
    const base = policy.baseScore(incident, breakdown);

    expect(base).toBe(10);
  });

  it('should produce proportional base scores', () => {
    const policy = new StandardPolicy();
    const sev1: IncidentData = { id: 'A', severity: 1 as Severity, assignee: 'x' };
    const sev2: IncidentData = { id: 'B', severity: 2 as Severity, assignee: 'x' };

    const b1: ScoreBreakdownItem[] = [];
    const b2: ScoreBreakdownItem[] = [];
    const base1 = policy.baseScore(sev1, b1);
    const base2 = policy.baseScore(sev2, b2);

    expect(base2).toBe(base1 * 2);
  });

  it('should give severity 5 a base score of 50', () => {
    const incident: IncidentData = { id: 'INC-5', severity: 5 as Severity, assignee: null };
    const policy = new StandardPolicy();
    const breakdown: ScoreBreakdownItem[] = [];
    const base = policy.baseScore(incident, breakdown);

    expect(base).toBe(50);
  });
});`,
      },
    ],
    solutionExplanation: `### Root Cause

\`StandardPolicy.baseScore()\` uses \`(severity - 1) * 10\`:

- Severity 1 -> (1 - 1) * 10 = **0** (should be 10)
- Severity 2 -> (2 - 1) * 10 = **10** (should be 20)

Every severity is scored one tier lower than intended. Severity 1 incidents are completely invisible.

### Fix

Remove the \`- 1\`:
\`\`\`typescript
const base = incident.severity * 10;
\`\`\``,
  },

  // -----------------------------------------------------------------------
  // 6. SLA Penalty Applied to Non-Overdue Incidents Instead of Overdue
  // -----------------------------------------------------------------------
  {
    id: 'issue-triage-6',
    project: 'issue-triage',
    projectLabel: 'Issue Triage',
    bugNumber: 6,
    title: 'SLA Penalty Applied to Non-Overdue Incidents Instead of Overdue',
    difficulty: 'easy',
    category: 'comparison-logic',
    language: 'typescript',
    symptom: `### Symptom

When using EnterprisePolicy, incidents that are **NOT** overdue get an SLA penalty, while incidents that **ARE** overdue do not. The penalty description even says "Xh past deadline" for incidents that still have time left.

### Context

\`EnterprisePolicy\` extends the base \`Policy\` and overrides \`applySlaPenalty()\`. It calculates \`hoursUntilDeadline\` as \`(deadline - now) / millisPerHour\`. A positive value means the deadline is in the future; a negative value means the deadline has passed.`,
    hints: [
      'Look at `EnterprisePolicy.applySlaPenalty()`.',
      'What does a positive `hoursUntilDeadline` mean? What does a negative value mean?',
      '`hoursUntilDeadline > 0` means the deadline is in the future (still has time). The penalty should apply when `hoursUntilDeadline < 0` (deadline has passed).',
    ],
    files: [
      {
        filename: 'enterprise-policy.ts',
        language: 'typescript',
        buggyCode: `// ---- Types ----
type Severity = 1 | 2 | 3 | 4 | 5;

interface IncidentData {
  id: string;
  severity: Severity;
  slaDeadline: string | null;
}

interface ScoreBreakdownItem {
  factor: string;
  value: number;
  description: string;
}

// ---- Enterprise Policy ----
export class EnterprisePolicy {
  applySlaPenalty(
    currentScore: number,
    incident: IncidentData,
    breakdown: ScoreBreakdownItem[],
    now: Date = new Date()
  ): number {
    if (!incident.slaDeadline) return currentScore;

    const deadline = new Date(incident.slaDeadline);
    const hoursUntilDeadline = (deadline.getTime() - now.getTime()) / (1000 * 60 * 60);

    if (hoursUntilDeadline > 0) {  // BUG: > 0 means deadline is in the future (NOT overdue)
      const penalty = 20;
      breakdown.push({
        factor: 'enterprise_sla_penalty',
        value: penalty,
        description: \`SLA penalty: \${Math.abs(Math.round(hoursUntilDeadline))}h past deadline\`,
      });
      return currentScore + penalty;
    }

    return currentScore;
  }
}`,
        solutionCode: `// ---- Types ----
type Severity = 1 | 2 | 3 | 4 | 5;

interface IncidentData {
  id: string;
  severity: Severity;
  slaDeadline: string | null;
}

interface ScoreBreakdownItem {
  factor: string;
  value: number;
  description: string;
}

// ---- Enterprise Policy ----
export class EnterprisePolicy {
  applySlaPenalty(
    currentScore: number,
    incident: IncidentData,
    breakdown: ScoreBreakdownItem[],
    now: Date = new Date()
  ): number {
    if (!incident.slaDeadline) return currentScore;

    const deadline = new Date(incident.slaDeadline);
    const hoursUntilDeadline = (deadline.getTime() - now.getTime()) / (1000 * 60 * 60);

    if (hoursUntilDeadline < 0) {  // FIX: < 0 means deadline has passed (IS overdue)
      const penalty = 20;
      breakdown.push({
        factor: 'enterprise_sla_penalty',
        value: penalty,
        description: \`SLA penalty: \${Math.abs(Math.round(hoursUntilDeadline))}h past deadline\`,
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
        filename: 'enterprise-policy.test.ts',
        language: 'typescript',
        code: `import { EnterprisePolicy } from "./enterprise-policy";

type Severity = 1 | 2 | 3 | 4 | 5;

interface IncidentData {
  id: string;
  severity: Severity;
  slaDeadline: string | null;
}

interface ScoreBreakdownItem {
  factor: string;
  value: number;
  description: string;
}

describe('Bug 6: SLA Comparison Flipped', () => {
  it('should NOT penalize incidents whose deadline is in the future', () => {
    const futureDeadline = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
    const incident: IncidentData = { id: 'INC-1', severity: 3 as Severity, slaDeadline: futureDeadline };
    const policy = new EnterprisePolicy();
    const breakdown: ScoreBreakdownItem[] = [];

    const result = policy.applySlaPenalty(50, incident, breakdown);

    expect(result).toBe(50);  // No penalty added
    expect(breakdown).toHaveLength(0);
  });

  it('should penalize incidents whose deadline has passed', () => {
    const pastDeadline = new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString();
    const incident: IncidentData = { id: 'INC-2', severity: 4 as Severity, slaDeadline: pastDeadline };
    const policy = new EnterprisePolicy();
    const breakdown: ScoreBreakdownItem[] = [];

    const result = policy.applySlaPenalty(50, incident, breakdown);

    expect(result).toBe(70);  // 50 + 20 penalty
    expect(breakdown).toHaveLength(1);
    expect(breakdown[0].factor).toBe('enterprise_sla_penalty');
  });

  it('should not apply penalty when there is no SLA deadline', () => {
    const incident: IncidentData = { id: 'INC-3', severity: 3 as Severity, slaDeadline: null };
    const policy = new EnterprisePolicy();
    const breakdown: ScoreBreakdownItem[] = [];

    const result = policy.applySlaPenalty(50, incident, breakdown);
    expect(result).toBe(50);
  });

  it('should add exactly 20 points as penalty', () => {
    const pastDeadline = new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString();
    const incident: IncidentData = { id: 'INC-4', severity: 5 as Severity, slaDeadline: pastDeadline };
    const policy = new EnterprisePolicy();
    const breakdown: ScoreBreakdownItem[] = [];

    const result = policy.applySlaPenalty(100, incident, breakdown);
    expect(result).toBe(120);
  });
});`,
      },
    ],
    solutionExplanation: `### Root Cause

\`hoursUntilDeadline > 0\` means the deadline is in the **future** (still has time), but the code applies the penalty in that case. The penalty should apply when \`hoursUntilDeadline < 0\` (deadline has passed / overdue).

### Fix

Change \`> 0\` to \`< 0\`:
\`\`\`typescript
if (hoursUntilDeadline < 0) {
\`\`\``,
  },

  // -----------------------------------------------------------------------
  // 7. Decorator Delegates to Wrong Method
  // -----------------------------------------------------------------------
  {
    id: 'issue-triage-7',
    project: 'issue-triage',
    projectLabel: 'Issue Triage',
    bugNumber: 7,
    title: 'Decorator Delegates to Wrong Method',
    difficulty: 'easy',
    category: 'decorator',
    language: 'typescript',
    symptom: `### Symptom

\`GET /incidents?status=open\` returns **ALL** incidents instead of only open ones. The \`InMemoryIncidentRepository\` alone works correctly, so the bug is in the layer on top.

### Context

The API uses the **Decorator** pattern: \`AuditedRepository\` wraps \`InMemoryIncidentRepository\` to add audit logging. It logs every read operation and delegates to the inner repository.`,
    hints: [
      'The API uses `AuditedRepository` wrapping `InMemoryIncidentRepository`.',
      'Look at `AuditedRepository.findByStatus()`. What method does it actually call on the inner repository?',
      'It calls `this.inner.findAll()` instead of `this.inner.findByStatus(status)`. The decorator logs the correct operation but delegates to the wrong method.',
    ],
    files: [
      {
        filename: 'repository.ts',
        language: 'typescript',
        buggyCode: `// ---- Types ----
interface IncidentData {
  id: string;
  status: string;
  title: string;
}

// ---- Repository Interface ----
interface IncidentRepository {
  findAll(): Promise<IncidentData[]>;
  findById(id: string): Promise<IncidentData | undefined>;
  findByStatus(status: string): Promise<IncidentData[]>;
}

// ---- In-Memory Repository ----
export class InMemoryIncidentRepository implements IncidentRepository {
  private incidents: IncidentData[];

  constructor(seed: IncidentData[]) {
    this.incidents = [...seed];
  }

  async findAll(): Promise<IncidentData[]> {
    return [...this.incidents];
  }

  async findById(id: string): Promise<IncidentData | undefined> {
    return this.incidents.find((i) => i.id === id);
  }

  async findByStatus(status: string): Promise<IncidentData[]> {
    return this.incidents.filter((i) => i.status === status);
  }
}

// ---- Audited Repository (Decorator) ----
export class AuditedRepository implements IncidentRepository {
  private inner: IncidentRepository;
  private auditLog: { operation: string; timestamp: Date }[] = [];

  constructor(inner: IncidentRepository) {
    this.inner = inner;
  }

  async findAll(): Promise<IncidentData[]> {
    this.log('findAll');
    return this.inner.findAll();
  }

  async findById(id: string): Promise<IncidentData | undefined> {
    this.log(\`findById(\${id})\`);
    return this.inner.findById(id);
  }

  async findByStatus(status: string): Promise<IncidentData[]> {
    this.log(\`findByStatus(\${status})\`);
    return this.inner.findAll();  // BUG: should be this.inner.findByStatus(status)
  }

  getAuditLog() {
    return [...this.auditLog];
  }

  private log(operation: string): void {
    this.auditLog.push({ operation, timestamp: new Date() });
  }
}`,
        solutionCode: `// ---- Types ----
interface IncidentData {
  id: string;
  status: string;
  title: string;
}

// ---- Repository Interface ----
interface IncidentRepository {
  findAll(): Promise<IncidentData[]>;
  findById(id: string): Promise<IncidentData | undefined>;
  findByStatus(status: string): Promise<IncidentData[]>;
}

// ---- In-Memory Repository ----
export class InMemoryIncidentRepository implements IncidentRepository {
  private incidents: IncidentData[];

  constructor(seed: IncidentData[]) {
    this.incidents = [...seed];
  }

  async findAll(): Promise<IncidentData[]> {
    return [...this.incidents];
  }

  async findById(id: string): Promise<IncidentData | undefined> {
    return this.incidents.find((i) => i.id === id);
  }

  async findByStatus(status: string): Promise<IncidentData[]> {
    return this.incidents.filter((i) => i.status === status);
  }
}

// ---- Audited Repository (Decorator) ----
export class AuditedRepository implements IncidentRepository {
  private inner: IncidentRepository;
  private auditLog: { operation: string; timestamp: Date }[] = [];

  constructor(inner: IncidentRepository) {
    this.inner = inner;
  }

  async findAll(): Promise<IncidentData[]> {
    this.log('findAll');
    return this.inner.findAll();
  }

  async findById(id: string): Promise<IncidentData | undefined> {
    this.log(\`findById(\${id})\`);
    return this.inner.findById(id);
  }

  async findByStatus(status: string): Promise<IncidentData[]> {
    this.log(\`findByStatus(\${status})\`);
    return this.inner.findByStatus(status);  // FIX: delegates correctly
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
        filename: 'repository.test.ts',
        language: 'typescript',
        code: `import { InMemoryIncidentRepository, AuditedRepository } from "./repository";

interface IncidentData {
  id: string;
  status: string;
  title: string;
}

describe('Bug 7: AuditedRepository.findByStatus Returns All', () => {
  const testData: IncidentData[] = [
    { id: 'INC-A', status: 'open', title: 'Open bug' },
    { id: 'INC-B', status: 'investigating', title: 'Investigating outage' },
    { id: 'INC-C', status: 'open', title: 'Another open bug' },
    { id: 'INC-D', status: 'resolved', title: 'Resolved issue' },
  ];

  it('should return only open incidents when filtering by open', async () => {
    const inner = new InMemoryIncidentRepository(testData);
    const audited = new AuditedRepository(inner);

    const open = await audited.findByStatus('open');

    expect(open).toHaveLength(2);
    expect(open.every((i) => i.status === 'open')).toBe(true);
  });

  it('should return fewer results than findAll when filtering', async () => {
    const inner = new InMemoryIncidentRepository(testData);
    const audited = new AuditedRepository(inner);

    const all = await audited.findAll();
    const open = await audited.findByStatus('open');

    expect(open.length).toBeLessThan(all.length);
  });

  it('should return empty array for status with no matches', async () => {
    const inner = new InMemoryIncidentRepository(testData);
    const audited = new AuditedRepository(inner);

    const closed = await audited.findByStatus('closed');
    expect(closed).toHaveLength(0);
  });

  it('should return only resolved incidents when filtering by resolved', async () => {
    const inner = new InMemoryIncidentRepository(testData);
    const audited = new AuditedRepository(inner);

    const resolved = await audited.findByStatus('resolved');
    expect(resolved).toHaveLength(1);
    expect(resolved[0].id).toBe('INC-D');
  });
});`,
      },
    ],
    solutionExplanation: `### Root Cause

\`AuditedRepository.findByStatus()\` calls \`this.inner.findAll()\` instead of \`this.inner.findByStatus(status)\`. The decorator logs the correct operation name but delegates to the wrong method on the inner repository.

### Fix

Change the delegation:
\`\`\`typescript
return this.inner.findByStatus(status);
\`\`\``,
  },

  // -----------------------------------------------------------------------
  // 8. Template Method Override Omits Required breakdown Array
  // -----------------------------------------------------------------------
  {
    id: 'issue-triage-8',
    project: 'issue-triage',
    projectLabel: 'Issue Triage',
    bugNumber: 8,
    title: 'Template Method Override Omits Required breakdown Array',
    difficulty: 'medium',
    category: 'lsp-violation',
    language: 'typescript',
    symptom: `### Symptom

Select "Experimental" policy and run triage. The app crashes with \`TypeError: Cannot read properties of undefined (reading 'map')\` in the TriageResults component.

### Context

The scoring system uses a **Template Method** pattern via the base \`Policy\` class. The \`ScoreResult\` interface requires a \`breakdown\` array. \`ExperimentalPolicy\` overrides the \`score()\` template method directly, bypassing all hooks. The frontend calls \`result.breakdown.map()\` to render the breakdown.`,
    hints: [
      'Look at `ExperimentalPolicy.score()` and compare its return value to what `ScoreResult` requires.',
      'What field is the frontend trying to `.map()` over?',
      'The return object omits the `breakdown` array and uses `as ScoreResult` to silence TypeScript. Include the `breakdown` array in the return value.',
    ],
    files: [
      {
        filename: 'experimental-policy.ts',
        language: 'typescript',
        buggyCode: `// ---- Types ----
type Severity = 1 | 2 | 3 | 4 | 5;

interface IncidentData {
  id: string;
  severity: Severity;
  assignee: string | null;
}

interface ScoreBreakdownItem {
  factor: string;
  value: number;
  description: string;
}

interface ScoreResult {
  incidentId: string;
  score: number;
  recommendedAction: string;
  breakdown: ScoreBreakdownItem[];
}

// ---- Experimental Policy ----
export class ExperimentalPolicy {
  score(incident: IncidentData): ScoreResult {
    const rawScore = incident.severity * 20 + (incident.assignee ? 0 : 10);

    const result = {
      incidentId: incident.id,
      score: rawScore,
      recommendedAction: rawScore > 50 ? 'escalate_immediately' : 'monitor',
      // BUG: missing "breakdown" field
    };

    return result as ScoreResult;  // "as" silences TypeScript
  }
}

// ---- Frontend renderer (simplified) ----
export function renderBreakdown(result: ScoreResult): string[] {
  return result.breakdown.map(
    (item) => \`\${item.factor}: \${item.value} - \${item.description}\`
  );
}`,
        solutionCode: `// ---- Types ----
type Severity = 1 | 2 | 3 | 4 | 5;

interface IncidentData {
  id: string;
  severity: Severity;
  assignee: string | null;
}

interface ScoreBreakdownItem {
  factor: string;
  value: number;
  description: string;
}

interface ScoreResult {
  incidentId: string;
  score: number;
  recommendedAction: string;
  breakdown: ScoreBreakdownItem[];
}

// ---- Experimental Policy ----
export class ExperimentalPolicy {
  score(incident: IncidentData): ScoreResult {
    const rawScore = incident.severity * 20 + (incident.assignee ? 0 : 10);

    return {
      incidentId: incident.id,
      score: rawScore,
      recommendedAction: rawScore > 50 ? 'escalate_immediately' : 'monitor',
      breakdown: [
        { factor: 'experimental', value: rawScore, description: 'ML-based score' },
      ],  // FIX: breakdown included
    };
  }
}

// ---- Frontend renderer (simplified) ----
export function renderBreakdown(result: ScoreResult): string[] {
  return result.breakdown.map(
    (item) => \`\${item.factor}: \${item.value} - \${item.description}\`
  );
}`,
      },
    ],
    testFiles: [
      {
        filename: 'experimental-policy.test.ts',
        language: 'typescript',
        code: `import { ExperimentalPolicy, renderBreakdown } from "./experimental-policy";

type Severity = 1 | 2 | 3 | 4 | 5;

interface IncidentData {
  id: string;
  severity: Severity;
  assignee: string | null;
}

describe('Bug 8: ExperimentalPolicy Missing Breakdown', () => {
  it('should include breakdown array in score result', () => {
    const incident: IncidentData = { id: 'INC-1', severity: 3 as Severity, assignee: 'alice' };
    const policy = new ExperimentalPolicy();
    const result = policy.score(incident);

    expect(result.breakdown).toBeDefined();
    expect(Array.isArray(result.breakdown)).toBe(true);
  });

  it('should not crash when rendering breakdown', () => {
    const incident: IncidentData = { id: 'INC-1', severity: 4 as Severity, assignee: null };
    const policy = new ExperimentalPolicy();
    const result = policy.score(incident);

    expect(() => renderBreakdown(result)).not.toThrow();
  });

  it('should have at least one breakdown item', () => {
    const incident: IncidentData = { id: 'INC-1', severity: 5 as Severity, assignee: 'bob' };
    const policy = new ExperimentalPolicy();
    const result = policy.score(incident);

    expect(result.breakdown.length).toBeGreaterThan(0);
    expect(result.breakdown[0]).toHaveProperty('factor');
    expect(result.breakdown[0]).toHaveProperty('value');
    expect(result.breakdown[0]).toHaveProperty('description');
  });

  it('should render breakdown items as formatted strings', () => {
    const incident: IncidentData = { id: 'INC-2', severity: 3 as Severity, assignee: null };
    const policy = new ExperimentalPolicy();
    const result = policy.score(incident);
    const rendered = renderBreakdown(result);

    expect(rendered.length).toBeGreaterThan(0);
    expect(typeof rendered[0]).toBe('string');
  });
});`,
      },
    ],
    solutionExplanation: `### Root Cause

\`ExperimentalPolicy\` overrides the \`score()\` template method directly, bypassing all hooks. Its return object omits the \`breakdown\` array and uses \`as ScoreResult\` to silence TypeScript. The frontend component calls \`result.breakdown.map()\`, which crashes because \`breakdown\` is \`undefined\`.

### Fix

Include the \`breakdown\` array in the return value:
\`\`\`typescript
breakdown: [
  { factor: 'experimental', value: rawScore, description: 'ML-based score' },
],
\`\`\``,
  },

  // -----------------------------------------------------------------------
  // 9. React useEffect Missing Dependency Causes Stale Closure
  // -----------------------------------------------------------------------
  {
    id: 'issue-triage-9',
    project: 'issue-triage',
    projectLabel: 'Issue Triage',
    bugNumber: 9,
    title: 'React useEffect Missing Dependency Causes Stale Closure',
    difficulty: 'medium',
    category: 'react-hooks',
    language: 'typescript',
    symptom: `### Symptom

Changing the "Status Filter" dropdown in the sidebar has no visible effect -- the incident list does not change.

### Context

The \`useIncidents\` hook uses \`useEffect\` to fetch incidents and filter them by status. The \`client\` (API client) is memoized with \`useMemo\` and never changes. The \`statusFilter\` state changes when the user selects a new filter.

This exercise simulates the React hook as a plain function to run in the browser sandbox. The bug pattern is the same: the effect dependencies are missing \`statusFilter\`, so the filter value is captured once and never updated.`,
    hints: [
      'Look at the `useIncidents` hook and examine the `useEffect` dependency array.',
      'The dependency array is `[client]`. The `client` never changes, so the effect runs once. When `statusFilter` changes, the effect does not re-run.',
      'Add `statusFilter` to the dependency array so the effect re-runs when the filter changes.',
    ],
    files: [
      {
        filename: 'useIncidents.ts',
        language: 'typescript',
        buggyCode: `// ---- Types ----
interface IncidentData {
  id: string;
  status: string;
  title: string;
}

// ---- Simulated API Client ----
export class IncidentApiClient {
  private allIncidents: IncidentData[];

  constructor(incidents: IncidentData[]) {
    this.allIncidents = incidents;
  }

  async fetchIncidents(): Promise<IncidentData[]> {
    return [...this.allIncidents];
  }
}

// ---- useIncidents hook (simplified for sandbox) ----
export function useIncidents(client: IncidentApiClient, statusFilter: string): {
  incidents: IncidentData[];
  callCount: number;
} {
  // Simulate the effect dependency bug:
  // The real hook uses useEffect with [client] as deps, ignoring statusFilter.
  // We simulate this by only fetching once regardless of statusFilter changes.

  let allData: IncidentData[] = [];
  let callCount = 0;

  // Simulate: effect only depends on client, NOT statusFilter
  // This means filter changes don't trigger a re-fetch
  const effectDeps = [client];  // BUG: missing statusFilter

  // Simulate single fetch (effect ran once)
  callCount++;

  // Without statusFilter in deps, filtering uses initial "all" value
  const capturedFilter = 'all';  // BUG: stale closure - always uses initial value

  // Fetch and filter
  const data = syncFetchIncidents(client);
  if (capturedFilter === 'all') {
    allData = data;
  } else {
    allData = data.filter((i) => i.status === capturedFilter);
  }

  return { incidents: allData, callCount };
}

export function syncFetchIncidents(client: IncidentApiClient): IncidentData[] {
  return (client as any).allIncidents;
}`,
        solutionCode: `// ---- Types ----
interface IncidentData {
  id: string;
  status: string;
  title: string;
}

// ---- Simulated API Client ----
export class IncidentApiClient {
  private allIncidents: IncidentData[];

  constructor(incidents: IncidentData[]) {
    this.allIncidents = incidents;
  }

  async fetchIncidents(): Promise<IncidentData[]> {
    return [...this.allIncidents];
  }
}

// ---- useIncidents hook (simplified for sandbox) ----
export function useIncidents(client: IncidentApiClient, statusFilter: string): {
  incidents: IncidentData[];
  callCount: number;
} {
  let allData: IncidentData[] = [];
  let callCount = 0;

  // FIX: effect depends on both client AND statusFilter
  const effectDeps = [client, statusFilter];

  callCount++;

  // FIX: uses the actual current statusFilter value
  const capturedFilter = statusFilter;

  const data = syncFetchIncidents(client);
  if (capturedFilter === 'all') {
    allData = data;
  } else {
    allData = data.filter((i) => i.status === capturedFilter);
  }

  return { incidents: allData, callCount };
}

export function syncFetchIncidents(client: IncidentApiClient): IncidentData[] {
  return (client as any).allIncidents;
}`,
      },
    ],
    testFiles: [
      {
        filename: 'useIncidents.test.ts',
        language: 'typescript',
        code: `import { IncidentApiClient, useIncidents } from "./useIncidents";

interface IncidentData {
  id: string;
  status: string;
  title: string;
}

describe('Bug 9: Status Filter Does Not Re-fetch', () => {
  const testData: IncidentData[] = [
    { id: 'A', status: 'open', title: 'Open bug' },
    { id: 'B', status: 'investigating', title: 'Investigating' },
    { id: 'C', status: 'open', title: 'Another open' },
    { id: 'D', status: 'resolved', title: 'Resolved' },
  ];

  it('should return all incidents when filter is "all"', () => {
    const client = new IncidentApiClient(testData);
    const result = useIncidents(client, 'all');

    expect(result.incidents).toHaveLength(4);
  });

  it('should return only open incidents when filter is "open"', () => {
    const client = new IncidentApiClient(testData);
    const result = useIncidents(client, 'open');

    expect(result.incidents).toHaveLength(2);
    expect(result.incidents.every((i) => i.status === 'open')).toBe(true);
  });

  it('should return only investigating incidents when filter is "investigating"', () => {
    const client = new IncidentApiClient(testData);
    const result = useIncidents(client, 'investigating');

    expect(result.incidents).toHaveLength(1);
    expect(result.incidents[0].status).toBe('investigating');
  });

  it('should return empty array when filtering by status with no matches', () => {
    const client = new IncidentApiClient(testData);
    const result = useIncidents(client, 'closed');

    expect(result.incidents).toHaveLength(0);
  });
});`,
      },
    ],
    solutionExplanation: `### Root Cause

The \`useEffect\` dependency array is \`[client]\`. The \`client\` never changes (wrapped in \`useMemo\`), so the effect runs once. When \`statusFilter\` changes, the effect does not re-run, so the list stays stale.

In the simulation, the \`capturedFilter\` is hardcoded to \`'all'\` instead of using the actual \`statusFilter\` parameter.

### Fix

Add \`statusFilter\` to the dependency array and use the actual value:
\`\`\`typescript
const effectDeps = [client, statusFilter];
const capturedFilter = statusFilter;
\`\`\``,
  },

  // -----------------------------------------------------------------------
  // 10. Accessing Non-Existent Metadata Field Produces NaN
  // -----------------------------------------------------------------------
  {
    id: 'issue-triage-10',
    project: 'issue-triage',
    projectLabel: 'Issue Triage',
    bugNumber: 10,
    title: 'Accessing Non-Existent Metadata Field Produces NaN',
    difficulty: 'easy',
    category: 'null-safety',
    language: 'typescript',
    symptom: `### Symptom

Click on an outage incident. In the detail panel, one of the rows shows **"NaN%"** for the Uptime SLA field.

### Context

\`OutageIncidentCard\` extends \`IncidentCardModel\` and builds detail rows for the expanded view. The incident data has a \`metadata\` field of type \`Record<string, unknown>\`. Some incidents have \`uptimeSla\` in their metadata; others do not.`,
    hints: [
      'Look at `OutageIncidentCard.detailsRows()` and check what `this.incident.metadata.uptimeSla` evaluates to.',
      'What happens when you multiply `undefined * 100`?',
      'Add a null check/fallback: `metadata.uptimeSla != null ? ... : \'N/A\'`.',
    ],
    files: [
      {
        filename: 'outage-card.ts',
        language: 'typescript',
        buggyCode: `// ---- Types ----
interface DetailRow {
  label: string;
  value: string;
}

interface IncidentData {
  id: string;
  title: string;
  status: string;
  severity: number;
  assignee: string | null;
  metadata: Record<string, unknown>;
}

// ---- Outage Incident Card ----
export class OutageIncidentCard {
  private incident: IncidentData;

  constructor(incident: IncidentData) {
    this.incident = incident;
  }

  detailsRows(): DetailRow[] {
    return [
      { label: 'Status', value: this.incident.status },
      { label: 'Assignee', value: this.incident.assignee ?? 'Unassigned' },
      {
        label: 'Affected Users',
        value: String((this.incident.metadata as Record<string, unknown>).affectedUsers ?? 'Unknown'),
      },
      {
        label: 'Uptime SLA',
        value: \`\${(this.incident.metadata as Record<string, number>).uptimeSla * 100}%\`,  // BUG: uptimeSla is undefined => NaN%
      },
    ];
  }
}`,
        solutionCode: `// ---- Types ----
interface DetailRow {
  label: string;
  value: string;
}

interface IncidentData {
  id: string;
  title: string;
  status: string;
  severity: number;
  assignee: string | null;
  metadata: Record<string, unknown>;
}

// ---- Outage Incident Card ----
export class OutageIncidentCard {
  private incident: IncidentData;

  constructor(incident: IncidentData) {
    this.incident = incident;
  }

  detailsRows(): DetailRow[] {
    return [
      { label: 'Status', value: this.incident.status },
      { label: 'Assignee', value: this.incident.assignee ?? 'Unassigned' },
      {
        label: 'Affected Users',
        value: String((this.incident.metadata as Record<string, unknown>).affectedUsers ?? 'Unknown'),
      },
      {
        label: 'Uptime SLA',
        value: (this.incident.metadata as any).uptimeSla != null
          ? \`\${(this.incident.metadata as any).uptimeSla * 100}%\`
          : 'N/A',  // FIX: null check with fallback
      },
    ];
  }
}`,
      },
    ],
    testFiles: [
      {
        filename: 'outage-card.test.ts',
        language: 'typescript',
        code: `import { OutageIncidentCard } from "./outage-card";

interface IncidentData {
  id: string;
  title: string;
  status: string;
  severity: number;
  assignee: string | null;
  metadata: Record<string, unknown>;
}

describe('Bug 10: NaN% in Outage Details', () => {
  it('should not show NaN when uptimeSla is missing from metadata', () => {
    const incident: IncidentData = {
      id: 'INC-1',
      title: 'DB failover',
      status: 'investigating',
      severity: 5,
      assignee: 'bob',
      metadata: { affectedUsers: 15000 },  // no uptimeSla
    };
    const card = new OutageIncidentCard(incident);
    const rows = card.detailsRows();

    const slaRow = rows.find((r) => r.label === 'Uptime SLA');
    expect(slaRow).toBeDefined();
    expect(slaRow!.value).not.toContain('NaN');
  });

  it('should show correct percentage when uptimeSla is present', () => {
    const incident: IncidentData = {
      id: 'INC-2',
      title: 'CDN outage',
      status: 'open',
      severity: 3,
      assignee: null,
      metadata: { affectedUsers: 800, uptimeSla: 0.999 },
    };
    const card = new OutageIncidentCard(incident);
    const rows = card.detailsRows();

    const slaRow = rows.find((r) => r.label === 'Uptime SLA');
    expect(slaRow).toBeDefined();
    expect(slaRow!.value).toContain('99.9');
  });

  it('should show N/A when uptimeSla is undefined', () => {
    const incident: IncidentData = {
      id: 'INC-3',
      title: 'Network issues',
      status: 'open',
      severity: 4,
      assignee: 'alice',
      metadata: {},
    };
    const card = new OutageIncidentCard(incident);
    const rows = card.detailsRows();

    const slaRow = rows.find((r) => r.label === 'Uptime SLA');
    expect(slaRow!.value).toBe('N/A');
  });

  it('should handle uptimeSla of 1.0 (100%)', () => {
    const incident: IncidentData = {
      id: 'INC-4',
      title: 'Full outage',
      status: 'open',
      severity: 5,
      assignee: null,
      metadata: { affectedUsers: 5000, uptimeSla: 1.0 },
    };
    const card = new OutageIncidentCard(incident);
    const rows = card.detailsRows();

    const slaRow = rows.find((r) => r.label === 'Uptime SLA');
    expect(slaRow!.value).toBe('100%');
  });
});`,
      },
    ],
    solutionExplanation: `### Root Cause

\`OutageIncidentCard.detailsRows()\` accesses \`metadata.uptimeSla\`, which does not exist in the seed data. The expression \`undefined * 100\` evaluates to \`NaN\`, displayed as \`"NaN%"\`.

### Fix

Add a null check with a fallback:
\`\`\`typescript
value: (metadata as any).uptimeSla != null
  ? \`\${(metadata as any).uptimeSla * 100}%\`
  : 'N/A',
\`\`\``,
  },

  // -----------------------------------------------------------------------
  // 11. Test Written to Match Buggy Behavior
  // -----------------------------------------------------------------------
  {
    id: 'issue-triage-11',
    project: 'issue-triage',
    projectLabel: 'Issue Triage',
    bugNumber: 11,
    title: 'Test Written to Match Buggy Behavior',
    difficulty: 'easy',
    category: 'misleading-test',
    language: 'typescript',
    symptom: `### Symptom

The test \`"should produce base score of 0 for severity 1"\` **passes** -- but it is asserting the **WRONG expected value**. If you fix the off-by-one from Bug 5, this test breaks.

### Context

This test was written when the \`StandardPolicy.baseScore()\` formula was \`(severity - 1) * 10\`. That formula is buggy (Bug 5), but the test was written to match the buggy behavior. After fixing Bug 5 to use \`severity * 10\`, the test must be updated too.

The scoring pipeline: base score -> severity weight -> final rounding.`,
    hints: [
      'This test was written to match the buggy behavior from Bug 5.',
      'After fixing `StandardPolicy.baseScore()` to use `severity * 10`, severity 1 produces a base of 10, which after severity weighting gives a final score of 4.',
      'Update the expected value from 0 to 4.',
    ],
    files: [
      {
        filename: 'scoring-test-bug.ts',
        language: 'typescript',
        buggyCode: `// ---- Types ----
type Severity = 1 | 2 | 3 | 4 | 5;

interface IncidentData {
  id: string;
  severity: Severity;
  assignee: string | null;
}

interface ScoreBreakdownItem {
  factor: string;
  value: number;
  description: string;
}

// ---- Correct Policy (Bug 5 already fixed) ----
export class StandardPolicy {
  baseScore(incident: IncidentData, breakdown: ScoreBreakdownItem[]): number {
    const base = incident.severity * 10;  // Correct formula
    breakdown.push({ factor: 'base_score', value: base, description: \`Base from severity \${incident.severity}\` });
    return base;
  }

  applySeverityWeight(currentScore: number, incident: IncidentData, breakdown: ScoreBreakdownItem[]): number {
    const weight = Math.min(incident.severity * 2, 10);
    const weighted = currentScore * (weight / 5);
    breakdown.push({ factor: 'severity_weight', value: weighted - currentScore, description: 'Severity weight' });
    return weighted;
  }

  score(incident: IncidentData): { score: number; breakdown: ScoreBreakdownItem[] } {
    const breakdown: ScoreBreakdownItem[] = [];
    let total = this.baseScore(incident, breakdown);
    total = this.applySeverityWeight(total, incident, breakdown);
    return { score: Math.round(total * 100) / 100, breakdown };
  }
}

// ---- BUGGY test: expects 0 which matches the old broken formula ----
export function runBuggyTest(): { passed: boolean; actual: number; expected: number } {
  const policy = new StandardPolicy();
  const incident: IncidentData = { id: 'TEST-001', severity: 1 as Severity, assignee: 'tester' };
  const result = policy.score(incident);

  const expected = 0;  // BUG: expects 0, but correct score is 4
  return { passed: result.score === expected, actual: result.score, expected };
}`,
        solutionCode: `// ---- Types ----
type Severity = 1 | 2 | 3 | 4 | 5;

interface IncidentData {
  id: string;
  severity: Severity;
  assignee: string | null;
}

interface ScoreBreakdownItem {
  factor: string;
  value: number;
  description: string;
}

// ---- Correct Policy (Bug 5 already fixed) ----
export class StandardPolicy {
  baseScore(incident: IncidentData, breakdown: ScoreBreakdownItem[]): number {
    const base = incident.severity * 10;
    breakdown.push({ factor: 'base_score', value: base, description: \`Base from severity \${incident.severity}\` });
    return base;
  }

  applySeverityWeight(currentScore: number, incident: IncidentData, breakdown: ScoreBreakdownItem[]): number {
    const weight = Math.min(incident.severity * 2, 10);
    const weighted = currentScore * (weight / 5);
    breakdown.push({ factor: 'severity_weight', value: weighted - currentScore, description: 'Severity weight' });
    return weighted;
  }

  score(incident: IncidentData): { score: number; breakdown: ScoreBreakdownItem[] } {
    const breakdown: ScoreBreakdownItem[] = [];
    let total = this.baseScore(incident, breakdown);
    total = this.applySeverityWeight(total, incident, breakdown);
    return { score: Math.round(total * 100) / 100, breakdown };
  }
}

// ---- FIXED test: expects correct value of 4 ----
export function runBuggyTest(): { passed: boolean; actual: number; expected: number } {
  const policy = new StandardPolicy();
  const incident: IncidentData = { id: 'TEST-001', severity: 1 as Severity, assignee: 'tester' };
  const result = policy.score(incident);

  const expected = 4;  // FIX: severity 1 => base 10, weight min(2,10)=2, weighted = 10*(2/5) = 4
  return { passed: result.score === expected, actual: result.score, expected };
}`,
      },
    ],
    testFiles: [
      {
        filename: 'scoring-test-bug.test.ts',
        language: 'typescript',
        code: `import { StandardPolicy, runBuggyTest } from "./scoring-test-bug";

type Severity = 1 | 2 | 3 | 4 | 5;

interface IncidentData {
  id: string;
  severity: Severity;
  assignee: string | null;
}

describe('Bug 11: Misleading Test Expects Wrong Value', () => {
  it('should produce a score of 4 for severity 1 (not 0)', () => {
    const policy = new StandardPolicy();
    const incident: IncidentData = { id: 'TEST-001', severity: 1 as Severity, assignee: 'tester' };
    const result = policy.score(incident);

    // severity 1: base = 1*10 = 10, weight = min(1*2,10) = 2, weighted = 10*(2/5) = 4
    expect(result.score).toBe(4);
  });

  it('should verify the test function agrees with its expected value', () => {
    const testResult = runBuggyTest();
    expect(testResult.passed).toBe(true);
    expect(testResult.actual).toBe(testResult.expected);
  });

  it('should produce non-zero score for severity 1', () => {
    const policy = new StandardPolicy();
    const incident: IncidentData = { id: 'TEST-002', severity: 1 as Severity, assignee: null };
    const result = policy.score(incident);

    expect(result.score).toBeGreaterThan(0);
  });

  it('should match expected = 4, not expected = 0', () => {
    const testResult = runBuggyTest();
    expect(testResult.expected).toBe(4);
    expect(testResult.actual).toBe(4);
  });
});`,
      },
    ],
    solutionExplanation: `### Root Cause

The test was written to match the buggy \`(severity - 1) * 10\` formula, expecting severity 1 to produce 0. After fixing the formula to \`severity * 10\`, severity 1 produces a base of 10, which after severity weighting \`10 * (2/5) = 4\` gives a final score of 4.

### Fix

Update the expected value from 0 to 4:
\`\`\`typescript
const expected = 4;
\`\`\``,
  },

  // -----------------------------------------------------------------------
  // 12. Test Uses Local Time Instead of UTC
  // -----------------------------------------------------------------------
  {
    id: 'issue-triage-12',
    project: 'issue-triage',
    projectLabel: 'Issue Triage',
    bugNumber: 12,
    title: 'Test Uses Local Time Instead of UTC',
    difficulty: 'easy',
    category: 'timezone',
    language: 'typescript',
    symptom: `### Symptom

The test \`"should parse incident dates correctly"\` passes on some machines but fails on others. Whether it passes depends on the local timezone.

### Context

The incident's \`createdAt\` is a UTC timestamp (ending with \`Z\`). The test parses this date and checks that the hour matches an expected value. The expected value was written assuming UTC, but the assertion uses a timezone-sensitive method.`,
    hints: [
      'Look at what `getHours()` returns versus `getUTCHours()`.',
      'The incident\'s `createdAt` is a UTC timestamp (`Z` suffix). `getHours()` returns the hour in the **local** timezone, not UTC.',
      'Use `getUTCHours()` instead of `getHours()` so the test produces the same result in every timezone.',
    ],
    files: [
      {
        filename: 'date-utils.ts',
        language: 'typescript',
        buggyCode: `// ---- Types ----
interface IncidentData {
  id: string;
  createdAt: string;
}

// ---- Date parsing helper ----
export function parseIncidentDate(incident: IncidentData): Date {
  return new Date(incident.createdAt);
}

// ---- Buggy assertion function ----
export function assertDateParsedCorrectly(incident: IncidentData): { passed: boolean; actual: number; expected: number } {
  const date = parseIncidentDate(incident);
  const actual = date.getHours();  // BUG: local timezone, not UTC
  const expected = 10;
  return { passed: actual === expected, actual, expected };
}`,
        solutionCode: `// ---- Types ----
interface IncidentData {
  id: string;
  createdAt: string;
}

// ---- Date parsing helper ----
export function parseIncidentDate(incident: IncidentData): Date {
  return new Date(incident.createdAt);
}

// ---- Fixed assertion function ----
export function assertDateParsedCorrectly(incident: IncidentData): { passed: boolean; actual: number; expected: number } {
  const date = parseIncidentDate(incident);
  const actual = date.getUTCHours();  // FIX: use UTC hours
  const expected = 10;
  return { passed: actual === expected, actual, expected };
}`,
      },
    ],
    testFiles: [
      {
        filename: 'date-utils.test.ts',
        language: 'typescript',
        code: `import { parseIncidentDate, assertDateParsedCorrectly } from "./date-utils";

interface IncidentData {
  id: string;
  createdAt: string;
}

describe('Bug 12: Timezone-Dependent Test', () => {
  it('should parse UTC hours correctly regardless of timezone', () => {
    const incident: IncidentData = { id: 'TEST-001', createdAt: '2025-01-15T10:30:00Z' };
    const date = parseIncidentDate(incident);

    expect(date.getUTCHours()).toBe(10);
    expect(date.getUTCMinutes()).toBe(30);
  });

  it('should verify the assertion function passes', () => {
    const incident: IncidentData = { id: 'TEST-001', createdAt: '2025-01-15T10:30:00Z' };
    const result = assertDateParsedCorrectly(incident);

    expect(result.passed).toBe(true);
    expect(result.actual).toBe(10);
  });

  it('should handle different UTC times correctly', () => {
    const incident: IncidentData = { id: 'TEST-002', createdAt: '2025-06-20T23:45:00Z' };
    const date = parseIncidentDate(incident);

    expect(date.getUTCHours()).toBe(23);
    expect(date.getUTCMinutes()).toBe(45);
  });

  it('should handle midnight UTC correctly', () => {
    const incident: IncidentData = { id: 'TEST-003', createdAt: '2025-03-01T00:00:00Z' };
    const date = parseIncidentDate(incident);

    expect(date.getUTCHours()).toBe(0);
    expect(date.getUTCMinutes()).toBe(0);
  });
});`,
      },
    ],
    solutionExplanation: `### Root Cause

The test uses \`date.getHours()\` which returns the hour in the **local timezone**. The incident timestamp is \`2025-01-15T10:30:00Z\` (UTC). \`getHours()\` returns 10 only if the local timezone is UTC. On any other machine, it returns a different value and the test fails.

### Fix

Use \`getUTCHours()\` instead of \`getHours()\`:
\`\`\`typescript
const actual = date.getUTCHours();
\`\`\``,
  },
];
