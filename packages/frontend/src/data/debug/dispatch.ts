import { DebugExercise } from './types';

export const dispatchExercises: DebugExercise[] = [
  // -----------------------------------------------------------------------
  // Bug A — Signature Timestamp Mismatch
  // -----------------------------------------------------------------------
  {
    id: 'dispatch-a',
    project: 'dispatch',
    projectLabel: 'Dispatch (Webhooks)',
    bugNumber: 'A',
    title: 'Signature Timestamp Mismatch',
    difficulty: 'medium',
    category: 'unit-mismatch',
    language: 'typescript',
    symptom: `### Symptom

All webhook signature verification fails. Merchants report that they cannot verify any webhook signatures.

### What you know

**Dispatch** is a webhook delivery platform. When a payment event occurs, Dispatch signs the payload and sends it to merchant endpoints. Merchants verify signatures by reconstructing the signed string from the header timestamp and payload.

The signed string format is: \`\${timestamp}.\${payload}\`

Merchants use the timestamp from the \`X-Dispatch-Timestamp\` header to reconstruct this string, then compare the HMAC against the \`X-Dispatch-Signature\` header.

**Every single merchant** reports verification failures — this is not intermittent.`,
    context: `### Pipeline Flow
\`\`\`
Event → Header Builder → HMAC Signer → HTTP Delivery → Merchant Verification
\`\`\`

### Log excerpt
\`\`\`
[header-builder] Signed headers built
  eventId=evt_abc
  headerTimestamp=1731677521    ← seconds
  algorithm=sha256

[hmac-signer] Computing signature
  algorithm=sha256
  timestamp=1731677521000       ← milliseconds!
  signedStringPrefix="1731677521000.{\\"event\\":\\"charge..."
\`\`\``,
    hints: [
      'Compare the timestamp value in the header with the timestamp used to compute the signature.',
      'The header timestamp is in seconds (divided by 1000). What value does the signer receive?',
      'The header puts `timestampSeconds` but the signer receives `event.createdAt` (milliseconds). The merchant reconstructs with the header value, which doesn\'t match the signed value.',
    ],
    files: [
      {
        filename: 'header-builder.ts',
        language: 'typescript',
        buggyCode: `import { signPayload } from "./hmac-signer";

export interface SignedHeaders {
  [key: string]: string;
}

interface EnrichedEvent {
  id: string;
  createdAt: number; // Unix timestamp in milliseconds
  payload: Record<string, unknown>;
}

/**
 * Builds signed headers for a webhook delivery.
 *
 * Produces:
 *   X-Dispatch-Signature: sha256=<hex>
 *   X-Dispatch-Timestamp: <unix seconds>
 *   X-Dispatch-Event-Id: <event id>
 *   Content-Type: application/json
 */
export function buildSignedHeaders(
  event: EnrichedEvent,
  payload: string,
  secret: string
): SignedHeaders {
  const timestampSeconds = Math.floor(event.createdAt / 1000);
  const signature = signPayload(payload, secret, event.createdAt);

  return {
    "Content-Type": "application/json",
    "X-Dispatch-Event-Id": event.id,
    "X-Dispatch-Timestamp": String(timestampSeconds),
    "X-Dispatch-Signature": \`sha256=\${signature}\`,
  };
}`,
        solutionCode: `import { signPayload } from "./hmac-signer";

export interface SignedHeaders {
  [key: string]: string;
}

interface EnrichedEvent {
  id: string;
  createdAt: number; // Unix timestamp in milliseconds
  payload: Record<string, unknown>;
}

/**
 * Builds signed headers for a webhook delivery.
 *
 * Produces:
 *   X-Dispatch-Signature: sha256=<hex>
 *   X-Dispatch-Timestamp: <unix seconds>
 *   X-Dispatch-Event-Id: <event id>
 *   Content-Type: application/json
 */
export function buildSignedHeaders(
  event: EnrichedEvent,
  payload: string,
  secret: string
): SignedHeaders {
  const timestampSeconds = Math.floor(event.createdAt / 1000);
  const signature = signPayload(payload, secret, timestampSeconds);

  return {
    "Content-Type": "application/json",
    "X-Dispatch-Event-Id": event.id,
    "X-Dispatch-Timestamp": String(timestampSeconds),
    "X-Dispatch-Signature": \`sha256=\${signature}\`,
  };
}`,
      },
      {
        filename: 'hmac-signer.ts',
        language: 'typescript',
        buggyCode: `/**
 * Computes the HMAC signature for a webhook payload.
 *
 * The signed string format is: \`\${timestamp}.\${payload}\`
 * where timestamp is the event's createdAt value and payload is the
 * JSON-serialized body.
 */
export function signPayload(
  payload: string,
  secret: string,
  timestamp: number
): string {
  // Simple hash for browser environment (not real HMAC, but deterministic)
  const signedString = \`\${timestamp}.\${payload}\`;
  let hash = 0;
  const combined = secret + ":" + signedString;
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(16).padStart(8, '0');
}`,
        solutionCode: `/**
 * Computes the HMAC signature for a webhook payload.
 *
 * The signed string format is: \`\${timestamp}.\${payload}\`
 * where timestamp is the event's createdAt value and payload is the
 * JSON-serialized body.
 */
export function signPayload(
  payload: string,
  secret: string,
  timestamp: number
): string {
  // Simple hash for browser environment (not real HMAC, but deterministic)
  const signedString = \`\${timestamp}.\${payload}\`;
  let hash = 0;
  const combined = secret + ":" + signedString;
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(16).padStart(8, '0');
}`,
      },
    ],
    testFiles: [
      {
        filename: 'header-builder.test.ts',
        language: 'typescript',
        code: `import { buildSignedHeaders } from "./header-builder";
import { signPayload } from "./hmac-signer";

describe("buildSignedHeaders", () => {
  const secret = "whsec_test_secret_key";
  const event = {
    id: "evt_abc123",
    createdAt: 1731677521000, // milliseconds
    payload: { event: "charge.succeeded", amount: 4999 },
  };
  const payload = JSON.stringify(event.payload);

  it("header timestamp should be in seconds", () => {
    const headers = buildSignedHeaders(event, payload, secret);
    const headerTs = Number(headers["X-Dispatch-Timestamp"]);
    // Should be seconds (10 digits), not milliseconds (13 digits)
    expect(headerTs).toBe(1731677521);
  });

  it("signature should use the same timestamp as the header", () => {
    const headers = buildSignedHeaders(event, payload, secret);
    const headerTs = Number(headers["X-Dispatch-Timestamp"]);

    // Merchant verification: reconstruct signature using header timestamp
    const merchantSignature = signPayload(payload, secret, headerTs);
    const actualSignature = headers["X-Dispatch-Signature"].replace("sha256=", "");

    expect(actualSignature).toBe(merchantSignature);
  });

  it("should include all required headers", () => {
    const headers = buildSignedHeaders(event, payload, secret);
    expect(headers).toHaveProperty("Content-Type");
    expect(headers).toHaveProperty("X-Dispatch-Event-Id");
    expect(headers).toHaveProperty("X-Dispatch-Timestamp");
    expect(headers).toHaveProperty("X-Dispatch-Signature");
  });

  it("event ID should match", () => {
    const headers = buildSignedHeaders(event, payload, secret);
    expect(headers["X-Dispatch-Event-Id"]).toBe("evt_abc123");
  });
});`,
      },
    ],
    solutionExplanation: `### Root Cause

In \`header-builder.ts\`, the timestamp is converted to seconds for the header:
\`\`\`typescript
const timestampSeconds = Math.floor(event.createdAt / 1000);
\`\`\`

But the raw millisecond value is passed to the signer:
\`\`\`typescript
const signature = signPayload(payload, secret, event.createdAt); // milliseconds!
\`\`\`

The header contains **seconds** (1731677521) but the signature was computed with **milliseconds** (1731677521000). When merchants reconstruct the signed string using the header timestamp, they get a different string than what was actually signed.

### Fix

Pass the same timestamp to both:
\`\`\`typescript
const signature = signPayload(payload, secret, timestampSeconds);
\`\`\``,
  },

  // -----------------------------------------------------------------------
  // Bug B — Retry Backoff Capped Too Low
  // -----------------------------------------------------------------------
  {
    id: 'dispatch-b',
    project: 'dispatch',
    projectLabel: 'Dispatch (Webhooks)',
    bugNumber: 'B',
    title: 'Retry Backoff Capped Too Low',
    difficulty: 'easy',
    category: 'unit-mismatch',
    language: 'typescript',
    symptom: `### Symptom

All webhook retries fire within ~60ms of each other, hammering merchant endpoints instead of backing off. Merchants complain about being flooded with rapid retry attempts when their servers are recovering from an outage.

### What you know

**Dispatch** uses exponential backoff for retries. The base delay is 1000ms (1 second), and the multiplier is 2x per attempt. The maximum delay should cap at 60 seconds.

Expected backoff schedule:
- Attempt 0: ~1,000ms (1s)
- Attempt 1: ~2,000ms (2s)
- Attempt 2: ~4,000ms (4s)
- Attempt 3: ~8,000ms (8s)
- Attempt 4: ~16,000ms (16s)

Actual behavior: every retry fires after ~60ms regardless of attempt number.`,
    context: `### Retry Configuration
\`\`\`
BASE_RETRY_DELAY  = 1000      ← milliseconds
MAX_RETRY_DELAY   = 60        ← what unit is this?
BACKOFF_MULTIPLIER = 2
\`\`\`

### Log excerpt
\`\`\`
[backoff-calculator] Backoff calculated
  attempt=0
  exponentialDelay=1000
  cappedDelay=60               ← capped to 60 instead of 1000?
  finalDelay=57

[backoff-calculator] Backoff calculated
  attempt=2
  exponentialDelay=4000
  cappedDelay=60               ← still 60
  finalDelay=63
\`\`\``,
    hints: [
      'Look at the units for BASE_RETRY_DELAY and MAX_RETRY_DELAY in the constants file.',
      'BASE_RETRY_DELAY is 1000 (milliseconds). MAX_RETRY_DELAY is 60. What unit was 60 intended to be?',
      'MAX_RETRY_DELAY is 60 (seconds) but Math.min compares it against millisecond values. 60ms caps everything immediately. It should be 60_000 (milliseconds).',
    ],
    files: [
      {
        filename: 'constants.ts',
        language: 'typescript',
        buggyCode: `// Dispatch platform configuration constants

// Retry settings
export const MAX_RETRIES = 5;
export const BASE_RETRY_DELAY = 1000; // milliseconds
export const MAX_RETRY_DELAY = 60; // seconds — maximum backoff cap
export const RETRY_BACKOFF_MULTIPLIER = 2;

// Delivery settings
export const DELIVERY_TIMEOUT_MS = 30_000;
export const MAX_PAYLOAD_SIZE_BYTES = 65_536;`,
        solutionCode: `// Dispatch platform configuration constants

// Retry settings
export const MAX_RETRIES = 5;
export const BASE_RETRY_DELAY = 1000; // milliseconds
export const MAX_RETRY_DELAY = 60_000; // 60 seconds in milliseconds
export const RETRY_BACKOFF_MULTIPLIER = 2;

// Delivery settings
export const DELIVERY_TIMEOUT_MS = 30_000;
export const MAX_PAYLOAD_SIZE_BYTES = 65_536;`,
      },
      {
        filename: 'backoff-calculator.ts',
        language: 'typescript',
        buggyCode: `import {
  BASE_RETRY_DELAY,
  MAX_RETRY_DELAY,
  RETRY_BACKOFF_MULTIPLIER,
} from "./constants";

/**
 * Calculates exponential backoff delay for retry attempts.
 *
 * Formula: min(BASE_DELAY * MULTIPLIER^attempt, MAX_DELAY)
 * Adds jitter of +/-10% to prevent thundering herd.
 */
export function calculateBackoff(attempt: number): number {
  const exponentialDelay =
    BASE_RETRY_DELAY * Math.pow(RETRY_BACKOFF_MULTIPLIER, attempt);

  const cappedDelay = Math.min(exponentialDelay, MAX_RETRY_DELAY);

  // Add jitter of +/-10%
  const jitterRange = cappedDelay * 0.1;
  const jitter = (Math.random() - 0.5) * 2 * jitterRange;
  const finalDelay = Math.max(0, Math.round(cappedDelay + jitter));

  return finalDelay;
}`,
        solutionCode: `import {
  BASE_RETRY_DELAY,
  MAX_RETRY_DELAY,
  RETRY_BACKOFF_MULTIPLIER,
} from "./constants";

/**
 * Calculates exponential backoff delay for retry attempts.
 *
 * Formula: min(BASE_DELAY * MULTIPLIER^attempt, MAX_DELAY)
 * Adds jitter of +/-10% to prevent thundering herd.
 */
export function calculateBackoff(attempt: number): number {
  const exponentialDelay =
    BASE_RETRY_DELAY * Math.pow(RETRY_BACKOFF_MULTIPLIER, attempt);

  const cappedDelay = Math.min(exponentialDelay, MAX_RETRY_DELAY);

  // Add jitter of +/-10%
  const jitterRange = cappedDelay * 0.1;
  const jitter = (Math.random() - 0.5) * 2 * jitterRange;
  const finalDelay = Math.max(0, Math.round(cappedDelay + jitter));

  return finalDelay;
}`,
      },
    ],
    testFiles: [
      {
        filename: 'backoff-calculator.test.ts',
        language: 'typescript',
        code: `import { calculateBackoff } from "./backoff-calculator";
import { BASE_RETRY_DELAY, MAX_RETRY_DELAY } from "./constants";

describe("calculateBackoff", () => {
  it("BASE_RETRY_DELAY should be in milliseconds", () => {
    expect(BASE_RETRY_DELAY).toBe(1000);
  });

  it("MAX_RETRY_DELAY should be in the same unit as BASE_RETRY_DELAY", () => {
    // Both should be milliseconds. MAX should be much larger than BASE.
    expect(MAX_RETRY_DELAY).toBeGreaterThan(BASE_RETRY_DELAY);
  });

  it("attempt 0 should produce ~1000ms delay", () => {
    const delay = calculateBackoff(0);
    // 1000 * 2^0 = 1000ms, +/-10% jitter = 900-1100
    expect(delay).toBeGreaterThan(800);
    expect(delay).toBeLessThan(1200);
  });

  it("attempt 2 should produce ~4000ms delay", () => {
    const delay = calculateBackoff(2);
    // 1000 * 2^2 = 4000ms, +/-10% jitter = 3600-4400
    expect(delay).toBeGreaterThan(3500);
    expect(delay).toBeLessThan(4500);
  });

  it("attempt 4 should produce ~16000ms delay", () => {
    const delay = calculateBackoff(4);
    // 1000 * 2^4 = 16000ms, +/-10% jitter = 14400-17600
    expect(delay).toBeGreaterThan(14000);
    expect(delay).toBeLessThan(18000);
  });

  it("delay should never exceed MAX_RETRY_DELAY (plus jitter)", () => {
    const delay = calculateBackoff(20); // Very high attempt
    // Should be capped at MAX_RETRY_DELAY + 10% jitter
    expect(delay).toBeLessThanOrEqual(MAX_RETRY_DELAY * 1.1);
  });
});`,
      },
    ],
    solutionExplanation: `### Root Cause

In \`constants.ts\`, \`MAX_RETRY_DELAY\` is set to \`60\` with a comment saying "seconds":
\`\`\`typescript
export const MAX_RETRY_DELAY = 60; // seconds — maximum backoff cap
\`\`\`

But \`backoff-calculator.ts\` uses it directly in \`Math.min(exponentialDelay, MAX_RETRY_DELAY)\` where \`exponentialDelay\` is in **milliseconds** (since \`BASE_RETRY_DELAY\` is 1000ms).

\`Math.min(1000, 60)\` returns 60 -- so the first retry is capped to 60ms instead of 1000ms. Every subsequent retry is also capped at 60ms.

### Fix

Change the constant to milliseconds:
\`\`\`typescript
export const MAX_RETRY_DELAY = 60_000; // 60 seconds in milliseconds
\`\`\``,
  },

  // -----------------------------------------------------------------------
  // Bug C — Event Type Filter Matches Too Broadly
  // -----------------------------------------------------------------------
  {
    id: 'dispatch-c',
    project: 'dispatch',
    projectLabel: 'Dispatch (Webhooks)',
    bugNumber: 'C',
    title: 'Event Type Filter Matches Too Broadly',
    difficulty: 'easy',
    category: 'string-matching',
    language: 'typescript',
    symptom: `### Symptom

A merchant subscribed to \`surcharge.succeeded\` events is also receiving \`charge.succeeded\` events. They should only receive surcharge events, but they get every charge event too.

### What you know

**Dispatch** routes events to merchant endpoints based on subscription filters. The filter evaluator supports:
- Exact match: \`"charge.succeeded"\` matches only \`"charge.succeeded"\`
- Wildcard suffix: \`"charge.*"\` matches \`"charge.succeeded"\`, \`"charge.failed"\`
- Catch-all: \`"*"\` matches everything

The merchant's subscription filter is \`"surcharge.succeeded"\` but they receive \`"charge.succeeded"\` events. This should not happen with an exact match.`,
    context: `### Routing Flow
\`\`\`
Event (type: "charge.succeeded")
  → Filter Evaluator checks each subscription filter
  → "charge.succeeded" filter  → should match     ✓
  → "surcharge.succeeded" filter → should NOT match ✗ (but it does!)
  → "refund.*" filter          → should NOT match  ✓
\`\`\`

### Log excerpt
\`\`\`
[subscription-matcher] Subscriptions matched
  eventType="charge.succeeded"
  matched=["sub_charge", "sub_surcharge"]  ← sub_surcharge shouldn't be here
\`\`\``,
    hints: [
      'Look at how the exact-match branch compares the event type and the filter string.',
      'The code uses `filter.includes(eventType)`. What does `"surcharge.succeeded".includes("charge.succeeded")` return?',
      '`String.includes()` does substring matching. `"surcharge.succeeded"` contains `"charge.succeeded"` as a substring. The fix is to use strict equality: `eventType === filter`.',
    ],
    files: [
      {
        filename: 'filter-evaluator.ts',
        language: 'typescript',
        buggyCode: `/**
 * Evaluates whether an event type matches a subscription filter.
 *
 * Supports:
 *   - Exact match: "charge.succeeded" matches "charge.succeeded"
 *   - Wildcard suffix: "charge.*" matches "charge.succeeded", "charge.failed"
 *   - Catch-all: "*" matches everything
 */
export function matchesFilter(eventType: string, filter: string): boolean {
  if (filter === "*") {
    return true;
  }

  if (filter.endsWith(".*")) {
    const prefix = filter.slice(0, -2);
    return eventType.startsWith(prefix);
  }

  return filter.includes(eventType);
}`,
        solutionCode: `/**
 * Evaluates whether an event type matches a subscription filter.
 *
 * Supports:
 *   - Exact match: "charge.succeeded" matches "charge.succeeded"
 *   - Wildcard suffix: "charge.*" matches "charge.succeeded", "charge.failed"
 *   - Catch-all: "*" matches everything
 */
export function matchesFilter(eventType: string, filter: string): boolean {
  if (filter === "*") {
    return true;
  }

  if (filter.endsWith(".*")) {
    const prefix = filter.slice(0, -2);
    return eventType.startsWith(prefix);
  }

  return eventType === filter;
}`,
      },
    ],
    testFiles: [
      {
        filename: 'filter-evaluator.test.ts',
        language: 'typescript',
        code: `import { matchesFilter } from "./filter-evaluator";

describe("matchesFilter", () => {
  it("exact match: 'charge.succeeded' should match 'charge.succeeded'", () => {
    expect(matchesFilter("charge.succeeded", "charge.succeeded")).toBe(true);
  });

  it("'surcharge.succeeded' filter should NOT match 'charge.succeeded'", () => {
    // This is the critical test — substring matching causes a false positive
    expect(matchesFilter("charge.succeeded", "surcharge.succeeded")).toBe(false);
  });

  it("'charge.succeeded' filter should NOT match 'surcharge.succeeded'", () => {
    expect(matchesFilter("surcharge.succeeded", "charge.succeeded")).toBe(false);
  });

  it("wildcard: 'charge.*' should match 'charge.succeeded'", () => {
    expect(matchesFilter("charge.succeeded", "charge.*")).toBe(true);
  });

  it("wildcard: 'charge.*' should match 'charge.failed'", () => {
    expect(matchesFilter("charge.failed", "charge.*")).toBe(true);
  });

  it("wildcard: 'charge.*' should NOT match 'refund.created'", () => {
    expect(matchesFilter("refund.created", "charge.*")).toBe(false);
  });

  it("catch-all '*' should match any event type", () => {
    expect(matchesFilter("charge.succeeded", "*")).toBe(true);
    expect(matchesFilter("refund.failed", "*")).toBe(true);
  });

  it("exact match: 'refund.created' should NOT match 'charge.succeeded'", () => {
    expect(matchesFilter("charge.succeeded", "refund.created")).toBe(false);
  });
});`,
      },
    ],
    solutionExplanation: `### Root Cause

The exact-match branch in \`matchesFilter\` uses \`filter.includes(eventType)\`:
\`\`\`typescript
return filter.includes(eventType);
\`\`\`

\`String.includes()\` does **substring** matching. Since \`"surcharge.succeeded"\` contains \`"charge.succeeded"\` as a substring, the filter incorrectly matches:
\`\`\`
"surcharge.succeeded".includes("charge.succeeded") → true
\`\`\`

This means any subscription whose filter string happens to contain the event type as a substring will receive events it should not.

### Fix

Use strict equality for exact matching:
\`\`\`typescript
return eventType === filter;
\`\`\``,
  },

  // -----------------------------------------------------------------------
  // Bug D — Dead Letter Queue Off-By-One
  // -----------------------------------------------------------------------
  {
    id: 'dispatch-d',
    project: 'dispatch',
    projectLabel: 'Dispatch (Webhooks)',
    bugNumber: 'D',
    title: 'Dead Letter Queue Off-By-One',
    difficulty: 'easy',
    category: 'off-by-one',
    language: 'typescript',
    symptom: `### Symptom

Events are moved to the dead letter queue (DLQ) after only 4 retries instead of the configured 5. Merchants expect 5 retry attempts before giving up, but Dispatch gives up one attempt early.

### What you know

**Dispatch** retries failed webhook deliveries with exponential backoff. When all retries are exhausted, the delivery is moved to the dead letter queue for manual inspection.

The configuration says \`MAX_RETRIES = 5\`, meaning 5 retry attempts should execute before moving to DLQ. But only 4 retries actually happen.

The retry scheduler is called after each failed attempt. It increments the attempt number and checks if retries are exhausted.`,
    context: `### Retry Flow
\`\`\`
Initial delivery (attempt 0) → FAIL
  → scheduleRetry(attempt=0, maxRetries=5)
  → nextAttemptNumber = 1, 1 < 5 → retry ✓

Retry 1 (attempt 1) → FAIL
  → scheduleRetry(attempt=1, maxRetries=5)
  → nextAttemptNumber = 2, 2 < 5 → retry ✓

...

Retry 3 (attempt 3) → FAIL
  → scheduleRetry(attempt=3, maxRetries=5)
  → nextAttemptNumber = 4, 4 < 5 → retry ✓

Retry 4 (attempt 4) → FAIL
  → scheduleRetry(attempt=4, maxRetries=5)
  → nextAttemptNumber = 5, 5 >= 5 → DLQ!  ← but retry 5 never ran!
\`\`\``,
    hints: [
      'The scheduler calculates `nextAttemptNumber = attempt + 1` then checks if it should go to DLQ. What comparison operator does it use?',
      'With `maxRetries=5` and `attempt=4`: `nextAttemptNumber = 5`, and `5 >= 5` is true. But should attempt 5 still run?',
      'The check uses `>=` instead of `>`. When `nextAttemptNumber` equals `maxRetries`, the 5th retry should still execute. Change `>=` to `>`.',
    ],
    files: [
      {
        filename: 'retry-scheduler.ts',
        language: 'typescript',
        buggyCode: `interface DeliveryAttempt {
  id: string;
  eventId: string;
  subscriptionId: string;
  endpointUrl: string;
  attempt: number;
  status: string;
  scheduledAt: number;
}

interface RetryDecision {
  shouldRetry: boolean;
  nextAttempt?: DeliveryAttempt;
  movedToDlq: boolean;
  backoffMs?: number;
}

const deadLetterQueue: DeliveryAttempt[] = [];

function addToDeadLetterQueue(attempt: DeliveryAttempt): void {
  deadLetterQueue.push({ ...attempt, status: "dead_letter" });
}

export function getDeadLetterQueue(): DeliveryAttempt[] {
  return [...deadLetterQueue];
}

export function clearDeadLetterQueue(): void {
  deadLetterQueue.length = 0;
}

/**
 * Simple exponential backoff: BASE_DELAY * 2^attempt
 */
function calculateBackoff(attempt: number): number {
  const baseDelay = 1000;
  return baseDelay * Math.pow(2, attempt);
}

/**
 * Decides whether to retry a failed delivery attempt.
 *
 * If attempts are exhausted, moves the delivery to the dead letter queue.
 */
export function scheduleRetry(
  attempt: DeliveryAttempt,
  maxRetries: number,
  currentTime: number
): RetryDecision {
  const nextAttemptNumber = attempt.attempt + 1;

  if (nextAttemptNumber >= maxRetries) {
    addToDeadLetterQueue(attempt);

    return {
      shouldRetry: false,
      movedToDlq: true,
    };
  }

  const backoffMs = calculateBackoff(nextAttemptNumber);
  const scheduledAt = currentTime + backoffMs;

  const nextDelivery: DeliveryAttempt = {
    id: \`\${attempt.eventId}-\${attempt.subscriptionId}-\${nextAttemptNumber}\`,
    eventId: attempt.eventId,
    subscriptionId: attempt.subscriptionId,
    endpointUrl: attempt.endpointUrl,
    attempt: nextAttemptNumber,
    status: "pending",
    scheduledAt,
  };

  return {
    shouldRetry: true,
    nextAttempt: nextDelivery,
    movedToDlq: false,
    backoffMs,
  };
}`,
        solutionCode: `interface DeliveryAttempt {
  id: string;
  eventId: string;
  subscriptionId: string;
  endpointUrl: string;
  attempt: number;
  status: string;
  scheduledAt: number;
}

interface RetryDecision {
  shouldRetry: boolean;
  nextAttempt?: DeliveryAttempt;
  movedToDlq: boolean;
  backoffMs?: number;
}

const deadLetterQueue: DeliveryAttempt[] = [];

function addToDeadLetterQueue(attempt: DeliveryAttempt): void {
  deadLetterQueue.push({ ...attempt, status: "dead_letter" });
}

export function getDeadLetterQueue(): DeliveryAttempt[] {
  return [...deadLetterQueue];
}

export function clearDeadLetterQueue(): void {
  deadLetterQueue.length = 0;
}

/**
 * Simple exponential backoff: BASE_DELAY * 2^attempt
 */
function calculateBackoff(attempt: number): number {
  const baseDelay = 1000;
  return baseDelay * Math.pow(2, attempt);
}

/**
 * Decides whether to retry a failed delivery attempt.
 *
 * If attempts are exhausted, moves the delivery to the dead letter queue.
 */
export function scheduleRetry(
  attempt: DeliveryAttempt,
  maxRetries: number,
  currentTime: number
): RetryDecision {
  const nextAttemptNumber = attempt.attempt + 1;

  if (nextAttemptNumber > maxRetries) {
    addToDeadLetterQueue(attempt);

    return {
      shouldRetry: false,
      movedToDlq: true,
    };
  }

  const backoffMs = calculateBackoff(nextAttemptNumber);
  const scheduledAt = currentTime + backoffMs;

  const nextDelivery: DeliveryAttempt = {
    id: \`\${attempt.eventId}-\${attempt.subscriptionId}-\${nextAttemptNumber}\`,
    eventId: attempt.eventId,
    subscriptionId: attempt.subscriptionId,
    endpointUrl: attempt.endpointUrl,
    attempt: nextAttemptNumber,
    status: "pending",
    scheduledAt,
  };

  return {
    shouldRetry: true,
    nextAttempt: nextDelivery,
    movedToDlq: false,
    backoffMs,
  };
}`,
      },
    ],
    testFiles: [
      {
        filename: 'retry-scheduler.test.ts',
        language: 'typescript',
        code: `import { scheduleRetry, clearDeadLetterQueue, getDeadLetterQueue } from "./retry-scheduler";

function makeAttempt(attempt: number) {
  return {
    id: \`evt_001-sub_001-\${attempt}\`,
    eventId: "evt_001",
    subscriptionId: "sub_001",
    endpointUrl: "https://merchant.com/webhooks",
    attempt,
    status: "failed_transient",
    scheduledAt: Date.now(),
  };
}

describe("scheduleRetry", () => {
  const maxRetries = 5;
  const now = Date.now();

  beforeEach(() => {
    clearDeadLetterQueue();
  });

  it("should allow retry when attempts remain", () => {
    const attempt = makeAttempt(0);
    const decision = scheduleRetry(attempt, maxRetries, now);
    expect(decision.shouldRetry).toBe(true);
    expect(decision.movedToDlq).toBe(false);
  });

  it("should allow exactly 5 retries before DLQ", () => {
    let retryCount = 0;

    for (let i = 0; i <= maxRetries + 1; i++) {
      const attempt = makeAttempt(i);
      const decision = scheduleRetry(attempt, maxRetries, now);

      if (decision.shouldRetry) {
        retryCount++;
      }
      if (decision.movedToDlq) {
        break;
      }
    }

    expect(retryCount).toBe(maxRetries);
  });

  it("should move to DLQ only after all retries are exhausted", () => {
    // After attempt 4 (the 5th attempt overall), the next attempt is 5
    // which equals maxRetries. The 5th retry should still run.
    const attempt4 = makeAttempt(4);
    const decision = scheduleRetry(attempt4, maxRetries, now);
    expect(decision.shouldRetry).toBe(true);
    expect(decision.movedToDlq).toBe(false);
  });

  it("should move to DLQ when attempt exceeds maxRetries", () => {
    const attempt5 = makeAttempt(5);
    const decision = scheduleRetry(attempt5, maxRetries, now);
    expect(decision.shouldRetry).toBe(false);
    expect(decision.movedToDlq).toBe(true);
    expect(getDeadLetterQueue()).toHaveLength(1);
  });

  it("next attempt should have incremented attempt number", () => {
    const attempt = makeAttempt(2);
    const decision = scheduleRetry(attempt, maxRetries, now);
    expect(decision.nextAttempt?.attempt).toBe(3);
  });

  it("next attempt should have a future scheduledAt", () => {
    const attempt = makeAttempt(0);
    const decision = scheduleRetry(attempt, maxRetries, now);
    expect(decision.nextAttempt?.scheduledAt).toBeGreaterThan(now);
  });
});`,
      },
    ],
    solutionExplanation: `### Root Cause

The retry scheduler increments the attempt number and then uses \`>=\` to check against \`maxRetries\`:
\`\`\`typescript
const nextAttemptNumber = attempt.attempt + 1;
if (nextAttemptNumber >= maxRetries) {  // >= causes off-by-one
\`\`\`

With \`maxRetries=5\` and \`attempt=4\`:
- \`nextAttemptNumber = 4 + 1 = 5\`
- \`5 >= 5\` is \`true\` -- moves to DLQ

But the 5th retry (attempt 5) never actually executes. Only 4 retries ran (attempts 1-4), one fewer than configured.

### Fix

Change \`>=\` to \`>\`:
\`\`\`typescript
if (nextAttemptNumber > maxRetries) {
\`\`\`

Now attempt 5 is allowed to run, and DLQ only triggers when \`nextAttemptNumber\` is 6 (after all 5 retries have executed).`,
  },

  // -----------------------------------------------------------------------
  // Bug E — Payload Mutation by Timeline Recorder
  // -----------------------------------------------------------------------
  {
    id: 'dispatch-e',
    project: 'dispatch',
    projectLabel: 'Dispatch (Webhooks)',
    bugNumber: 'E',
    title: 'Payload Mutation by Timeline Recorder',
    difficulty: 'medium',
    category: 'mutation',
    language: 'typescript',
    symptom: `### Symptom

Merchants report that sensitive fields like \`card\`, \`bank_account\`, and \`payment_method_details\` are arriving as \`"[REDACTED]"\` in webhook payloads. The payload should contain the full payment details — redaction is only meant for internal audit logs.

### What you know

**Dispatch** records a timeline of events for auditing. Before storing a timeline entry, sensitive fields are redacted for PCI compliance. This redaction should only affect the timeline log, not the actual webhook delivery.

The pipeline processes events in this order:
1. Timeline recording (for audit) -- redacts sensitive fields
2. Payload serialization for HTTP delivery

Merchants need the full payload with card details, but they only see \`"[REDACTED]"\`.`,
    context: `### Pipeline Flow
\`\`\`
Event (payload has card, bank_account, payment_method_details)
  → Timeline Recorder (redacts sensitive fields for audit log)
  → HTTP Delivery (serializes event.payload for merchant)
                    ↑
                    payload.card is now "[REDACTED]"!
\`\`\`

### Log excerpt
\`\`\`json
// Original event payload:
{
  "amount": 5000,
  "currency": "usd",
  "card": { "last4": "4242", "brand": "visa" },
  "bank_account": { "last4": "6789" },
  "description": "Payment for Order #1234"
}

// Payload delivered to merchant:
{
  "amount": 5000,
  "currency": "usd",
  "card": "[REDACTED]",
  "bank_account": "[REDACTED]",
  "description": "Payment for Order #1234"
}
\`\`\``,
    hints: [
      'Look at how `redactSensitiveFields` modifies the event. Does it work on a copy or the original?',
      'The function signature is `redactSensitiveFields(event: EnrichedEvent): void`. It mutates `event.payload` directly — no copy is made.',
      'The fix is to deep-copy the payload before redacting, so the original event object is never modified. Use `JSON.parse(JSON.stringify(payload))` to create an independent copy.',
    ],
    files: [
      {
        filename: 'timeline-recorder.ts',
        language: 'typescript',
        buggyCode: `interface EnrichedEvent {
  id: string;
  tenantId: string;
  eventType: string;
  payload: Record<string, unknown>;
  createdAt: number;
}

interface TimelineEntry {
  eventId: string;
  subscriptionId: string;
  action: string;
  timestamp: number;
  details: Record<string, unknown>;
}

const timeline: TimelineEntry[] = [];

const SENSITIVE_FIELDS = ["card", "bank_account", "payment_method_details"];

/**
 * Redacts sensitive fields from the event payload for PCI compliance
 * before storing in the timeline.
 */
function redactSensitiveFields(event: EnrichedEvent): void {
  for (const field of SENSITIVE_FIELDS) {
    if (field in event.payload) {
      event.payload[field] = "[REDACTED]";
    }
  }
}

export function recordTimelineEvent(
  event: EnrichedEvent,
  subscriptionId: string,
  action: string,
  details: Record<string, unknown> = {}
): TimelineEntry {
  redactSensitiveFields(event);

  const entry: TimelineEntry = {
    eventId: event.id,
    subscriptionId,
    action,
    timestamp: Date.now(),
    details: {
      eventType: event.eventType,
      ...details,
    },
  };

  timeline.push(entry);
  return entry;
}

export function getTimeline(eventId?: string): TimelineEntry[] {
  if (eventId) {
    return timeline.filter((e) => e.eventId === eventId);
  }
  return [...timeline];
}

export function clearTimeline(): void {
  timeline.length = 0;
}`,
        solutionCode: `interface EnrichedEvent {
  id: string;
  tenantId: string;
  eventType: string;
  payload: Record<string, unknown>;
  createdAt: number;
}

interface TimelineEntry {
  eventId: string;
  subscriptionId: string;
  action: string;
  timestamp: number;
  details: Record<string, unknown>;
}

const timeline: TimelineEntry[] = [];

const SENSITIVE_FIELDS = ["card", "bank_account", "payment_method_details"];

/**
 * Creates a redacted copy of the payload for PCI compliance.
 * Returns a new object — never mutates the original.
 */
function redactPayload(payload: Record<string, unknown>): Record<string, unknown> {
  const copy = JSON.parse(JSON.stringify(payload));
  for (const field of SENSITIVE_FIELDS) {
    if (field in copy) {
      copy[field] = "[REDACTED]";
    }
  }
  return copy;
}

export function recordTimelineEvent(
  event: EnrichedEvent,
  subscriptionId: string,
  action: string,
  details: Record<string, unknown> = {}
): TimelineEntry {
  const redactedPayload = redactPayload(event.payload);

  const entry: TimelineEntry = {
    eventId: event.id,
    subscriptionId,
    action,
    timestamp: Date.now(),
    details: {
      eventType: event.eventType,
      redactedPayload,
      ...details,
    },
  };

  timeline.push(entry);
  return entry;
}

export function getTimeline(eventId?: string): TimelineEntry[] {
  if (eventId) {
    return timeline.filter((e) => e.eventId === eventId);
  }
  return [...timeline];
}

export function clearTimeline(): void {
  timeline.length = 0;
}`,
      },
    ],
    testFiles: [
      {
        filename: 'timeline-recorder.test.ts',
        language: 'typescript',
        code: `import { recordTimelineEvent, clearTimeline } from "./timeline-recorder";

function makeEvent() {
  return {
    id: "evt_001",
    tenantId: "tenant_paystream",
    eventType: "charge.succeeded",
    payload: {
      amount: 5000,
      currency: "usd",
      card: {
        last4: "4242",
        brand: "visa",
        exp_month: 12,
        exp_year: 2025,
      },
      bank_account: {
        routing_number: "110000000",
        last4: "6789",
      },
      payment_method_details: {
        type: "card",
        card: { network: "visa" },
      },
      description: "Payment for Order #1234",
      customer_id: "cus_abc123",
    },
    createdAt: Date.now(),
  };
}

describe("recordTimelineEvent", () => {
  beforeEach(() => {
    clearTimeline();
  });

  it("should NOT mutate the original event payload", () => {
    const event = makeEvent();
    const originalCard = event.payload.card;
    const originalBank = event.payload.bank_account;

    recordTimelineEvent(event, "sub_001", "delivery_initiated");

    // Original payload should be unchanged
    expect(event.payload.card).toEqual(originalCard);
    expect(event.payload.bank_account).toEqual(originalBank);
  });

  it("delivered payload should still contain sensitive fields after recording", () => {
    const event = makeEvent();

    // Timeline recording happens BEFORE delivery in the pipeline
    recordTimelineEvent(event, "sub_001", "delivery_initiated");

    // Simulate what HTTP delivery does: serialize the payload
    const deliveredPayload = JSON.stringify(event.payload);

    expect(deliveredPayload).toContain("4242");
    expect(deliveredPayload).toContain("visa");
    expect(deliveredPayload).not.toContain("[REDACTED]");
  });

  it("non-sensitive fields should never be affected", () => {
    const event = makeEvent();

    recordTimelineEvent(event, "sub_001", "delivery_initiated");

    expect(event.payload.amount).toBe(5000);
    expect(event.payload.currency).toBe("usd");
    expect(event.payload.description).toBe("Payment for Order #1234");
    expect(event.payload.customer_id).toBe("cus_abc123");
  });

  it("should still record a timeline entry", () => {
    const event = makeEvent();

    const entry = recordTimelineEvent(event, "sub_001", "delivery_initiated");

    expect(entry.eventId).toBe("evt_001");
    expect(entry.subscriptionId).toBe("sub_001");
    expect(entry.action).toBe("delivery_initiated");
  });

  it("multiple recordings should not progressively corrupt the payload", () => {
    const event = makeEvent();

    recordTimelineEvent(event, "sub_001", "delivery_initiated");
    recordTimelineEvent(event, "sub_002", "delivery_initiated");
    recordTimelineEvent(event, "sub_003", "delivery_initiated");

    // Even after 3 timeline recordings, the original should be intact
    expect(event.payload.card).toEqual({
      last4: "4242",
      brand: "visa",
      exp_month: 12,
      exp_year: 2025,
    });
  });
});`,
      },
    ],
    solutionExplanation: `### Root Cause

The \`redactSensitiveFields\` function mutates the original event object directly:
\`\`\`typescript
function redactSensitiveFields(event: EnrichedEvent): void {
  for (const field of SENSITIVE_FIELDS) {
    if (field in event.payload) {
      event.payload[field] = "[REDACTED]";  // Mutates the original!
    }
  }
}
\`\`\`

In the pipeline, timeline recording happens **before** HTTP delivery. So by the time the payload is serialized for the merchant, \`card\`, \`bank_account\`, and \`payment_method_details\` have already been replaced with \`"[REDACTED]"\`.

### Fix

Deep-copy the payload before redacting, so the original event is never modified:
\`\`\`typescript
function redactPayload(payload: Record<string, unknown>): Record<string, unknown> {
  const copy = JSON.parse(JSON.stringify(payload));
  for (const field of SENSITIVE_FIELDS) {
    if (field in copy) {
      copy[field] = "[REDACTED]";
    }
  }
  return copy;
}
\`\`\`

Use the returned copy for the timeline entry, leaving \`event.payload\` untouched for delivery.`,
  },
];
