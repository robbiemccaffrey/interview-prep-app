import { DebugExercise } from './types';

export const supportAgentExercises: DebugExercise[] = [
  // -----------------------------------------------------------------------
  // Bug A — Session Always Expires (Seconds vs Milliseconds)
  // -----------------------------------------------------------------------
  {
    id: 'support-agent-a',
    project: 'support-agent',
    projectLabel: 'Support Agent (AI)',
    bugNumber: 'A',
    title: 'Session Always Expires',
    difficulty: 'easy',
    category: 'unit-mismatch',
    language: 'typescript',
    symptom: `### Symptom

Every customer message is treated as the start of a brand new conversation. The AI support agent has **zero conversational memory** — it never remembers what the customer said in previous messages.

### What you know

**Support Agent** is an AI customer support platform. When a customer sends a message, the system loads their session from a key-value store, checks if it has expired (based on a 30-minute TTL), and either reuses the existing session or creates a new one.

Sessions store \`lastActivity\` as a **Unix timestamp in seconds**. The TTL is \`1800\` (seconds = 30 minutes).

**Every single session** is treated as expired, even ones created moments ago.`,
    context: `### Pipeline Flow
\`\`\`
Customer Message → Session Loader → Intent Classifier → Action Executor → Response Generator
\`\`\`

### Log excerpt
\`\`\`
[session-loader] Session found in store
  session_id=sess_f7a21
  last_activity=1731677521         ← seconds
  ttl_seconds=1800
  current_time=1731677595201       ← milliseconds!

[session-loader] Session expired, creating new session
  session_id=sess_f7a21
  reason="TTL exceeded"
\`\`\``,
    hints: [
      'Compare the units of `currentTime` and `session.lastActivity`. Are they in the same unit?',
      '`Date.now()` returns milliseconds. `session.lastActivity` is in seconds. What happens when you subtract seconds from milliseconds?',
      'The elapsed time calculation produces a number in the billions (ms - s), which is always greater than 1800. Convert `Date.now()` to seconds first: `Math.floor(Date.now() / 1000)`.',
    ],
    files: [
      {
        filename: 'session-loader.ts',
        language: 'typescript',
        buggyCode: `/**
 * In-memory store pretending to be Redis.
 */
class KeyValueStore {
  private store = new Map<string, string>();

  async get(key: string): Promise<string | null> {
    return this.store.get(key) ?? null;
  }

  async set(key: string, value: string, _mode?: string, _ttl?: number): Promise<void> {
    this.store.set(key, value);
  }

  clear(): void {
    this.store.clear();
  }
}

export const kvStore = new KeyValueStore();

// ---------------------------------------------------------------------------

interface ConversationMessage {
  role: "customer" | "agent";
  content: string;
  timestamp: number; // Unix seconds
}

interface Session {
  sessionId: string;
  tenantId: string;
  userId: string;
  history: ConversationMessage[];
  createdAt: number;      // Unix timestamp in seconds
  lastActivity: number;   // Unix timestamp in seconds
  ttlSeconds: number;
}

const DEFAULT_TTL_SECONDS = 1800; // 30 minutes

export async function loadSession(
  tenantId: string,
  sessionId: string,
  userId: string,
): Promise<Session> {
  const key = \`session:\${tenantId}:\${sessionId}\`;
  const data = await kvStore.get(key);

  if (data) {
    const session: Session = JSON.parse(data);
    const currentTime = Date.now(); // milliseconds since epoch
    const elapsed = currentTime - session.lastActivity;

    if (elapsed < session.ttlSeconds) {
      return session;
    }
  }

  // Create new session
  const newSession: Session = {
    sessionId,
    tenantId,
    userId,
    history: [],
    createdAt: Math.floor(Date.now() / 1000),
    lastActivity: Math.floor(Date.now() / 1000),
    ttlSeconds: DEFAULT_TTL_SECONDS,
  };

  await kvStore.set(key, JSON.stringify(newSession), "EX", DEFAULT_TTL_SECONDS);
  return newSession;
}

export async function saveSession(session: Session): Promise<void> {
  const key = \`session:\${session.tenantId}:\${session.sessionId}\`;
  session.lastActivity = Math.floor(Date.now() / 1000);
  await kvStore.set(key, JSON.stringify(session), "EX", session.ttlSeconds);
}`,
        solutionCode: `/**
 * In-memory store pretending to be Redis.
 */
class KeyValueStore {
  private store = new Map<string, string>();

  async get(key: string): Promise<string | null> {
    return this.store.get(key) ?? null;
  }

  async set(key: string, value: string, _mode?: string, _ttl?: number): Promise<void> {
    this.store.set(key, value);
  }

  clear(): void {
    this.store.clear();
  }
}

export const kvStore = new KeyValueStore();

// ---------------------------------------------------------------------------

interface ConversationMessage {
  role: "customer" | "agent";
  content: string;
  timestamp: number; // Unix seconds
}

interface Session {
  sessionId: string;
  tenantId: string;
  userId: string;
  history: ConversationMessage[];
  createdAt: number;      // Unix timestamp in seconds
  lastActivity: number;   // Unix timestamp in seconds
  ttlSeconds: number;
}

const DEFAULT_TTL_SECONDS = 1800; // 30 minutes

export async function loadSession(
  tenantId: string,
  sessionId: string,
  userId: string,
): Promise<Session> {
  const key = \`session:\${tenantId}:\${sessionId}\`;
  const data = await kvStore.get(key);

  if (data) {
    const session: Session = JSON.parse(data);
    const currentTime = Math.floor(Date.now() / 1000); // Convert to seconds
    const elapsed = currentTime - session.lastActivity;

    if (elapsed < session.ttlSeconds) {
      return session;
    }
  }

  // Create new session
  const newSession: Session = {
    sessionId,
    tenantId,
    userId,
    history: [],
    createdAt: Math.floor(Date.now() / 1000),
    lastActivity: Math.floor(Date.now() / 1000),
    ttlSeconds: DEFAULT_TTL_SECONDS,
  };

  await kvStore.set(key, JSON.stringify(newSession), "EX", DEFAULT_TTL_SECONDS);
  return newSession;
}

export async function saveSession(session: Session): Promise<void> {
  const key = \`session:\${session.tenantId}:\${session.sessionId}\`;
  session.lastActivity = Math.floor(Date.now() / 1000);
  await kvStore.set(key, JSON.stringify(session), "EX", session.ttlSeconds);
}`,
      },
    ],
    testFiles: [
      {
        filename: 'session-loader.test.ts',
        language: 'typescript',
        code: `import { loadSession, saveSession, kvStore } from "./session-loader";

describe("session-loader", () => {
  beforeEach(() => {
    kvStore.clear();
  });

  it("creates a new session when none exists", async () => {
    const session = await loadSession("shopflow", "sess_new", "cust_1");
    expect(session.sessionId).toBe("sess_new");
    expect(session.tenantId).toBe("shopflow");
    expect(session.userId).toBe("cust_1");
    expect(session.history).toEqual([]);
    expect(session.ttlSeconds).toBe(1800);
  });

  it("should preserve history for a 60-second-old session", async () => {
    const sixtySecondsAgo = Math.floor(Date.now() / 1000) - 60;
    const existingSession = {
      sessionId: "sess_test",
      tenantId: "shopflow",
      userId: "cust_1",
      history: [
        { role: "customer", content: "Hello", timestamp: sixtySecondsAgo },
        { role: "agent", content: "Hi there!", timestamp: sixtySecondsAgo },
      ],
      createdAt: sixtySecondsAgo,
      lastActivity: sixtySecondsAgo,
      ttlSeconds: 1800,
    };

    await kvStore.set(
      "session:shopflow:sess_test",
      JSON.stringify(existingSession),
    );

    const session = await loadSession("shopflow", "sess_test", "cust_1");

    // 60 seconds < 1800 TTL, session should be valid
    expect(session.history.length).toBe(2);
    expect(session.history[0].content).toBe("Hello");
  });

  it("session loaded immediately after save should retain history", async () => {
    const session1 = await loadSession("shopflow", "sess_imm", "cust_1");
    session1.history.push(
      { role: "customer", content: "Test", timestamp: Math.floor(Date.now() / 1000) },
      { role: "agent", content: "Reply", timestamp: Math.floor(Date.now() / 1000) },
    );
    await saveSession(session1);

    const session2 = await loadSession("shopflow", "sess_imm", "cust_1");

    // Session was just saved, should still be valid
    expect(session2.history.length).toBe(2);
  });

  it("should expire sessions that are truly past TTL", async () => {
    const twoHoursAgo = Math.floor(Date.now() / 1000) - 7200;
    const oldSession = {
      sessionId: "sess_old",
      tenantId: "shopflow",
      userId: "cust_1",
      history: [
        { role: "customer", content: "Old message", timestamp: twoHoursAgo },
      ],
      createdAt: twoHoursAgo,
      lastActivity: twoHoursAgo,
      ttlSeconds: 1800,
    };

    await kvStore.set(
      "session:shopflow:sess_old",
      JSON.stringify(oldSession),
    );

    const session = await loadSession("shopflow", "sess_old", "cust_1");

    // 7200 seconds > 1800 TTL, session should be expired (new empty session)
    expect(session.history).toEqual([]);
  });
});`,
      },
    ],
    solutionExplanation: `### Root Cause

In \`loadSession\`, the current time is obtained in **milliseconds** but compared against \`lastActivity\` which is stored in **seconds**:

\`\`\`typescript
const currentTime = Date.now(); // milliseconds (e.g., 1731677595201)
const elapsed = currentTime - session.lastActivity; // lastActivity is seconds (e.g., 1731677521)
\`\`\`

\`elapsed\` becomes something like \`1,731,677,595,201 - 1,731,677,521 = ~1.7 trillion\`, which is always greater than the TTL of \`1800\`. Every session is treated as expired.

### Fix

Convert \`Date.now()\` to seconds before computing elapsed time:

\`\`\`typescript
const currentTime = Math.floor(Date.now() / 1000); // Convert to seconds
\`\`\``,
  },

  // -----------------------------------------------------------------------
  // Bug B — Off-by-One in Confidence Threshold (> vs >=)
  // -----------------------------------------------------------------------
  {
    id: 'support-agent-b',
    project: 'support-agent',
    projectLabel: 'Support Agent (AI)',
    bugNumber: 'B',
    title: 'Follow-up Questions Misclassified',
    difficulty: 'easy',
    category: 'comparison-logic',
    language: 'typescript',
    symptom: `### Symptom

When a customer asks a follow-up question like "Actually can you also check #SF-40822?", the intent classifier falls back to \`general_inquiry\` instead of recognizing it as \`order_status\`. The customer gets a generic FAQ response instead of their actual order details.

### What you know

The intent classifier returns a confidence score between 0 and 1. Messages are classified as their detected intent only if the confidence meets a threshold of \`0.70\`. Otherwise, the system falls back to \`general_inquiry\`.

For follow-up order queries without conversation history, the classifier returns a confidence of **exactly 0.70** — right at the threshold boundary. But the message is still being classified as \`general_inquiry\`.`,
    context: `### Pipeline Flow
\`\`\`
Customer Message → Session Loader → Intent Classifier → Action Executor → Response Generator
                                     ↑
                              Confidence threshold = 0.70
\`\`\`

### Log excerpt
\`\`\`
[classifier] Classifying message
  input="Actually can you also check #SF-40822?"
  result={ intent: "order_status", confidence: 0.70 }

[classifier] Intent resolved
  intent=general_inquiry
  confidence=0.70
  method=fallback
\`\`\``,
    hints: [
      'The classifier detects `order_status` with confidence 0.70, but the final intent is `general_inquiry`. Look at the comparison operator.',
      'The threshold is 0.70. The confidence is 0.70. What does `0.70 > 0.70` evaluate to?',
      'Change `>` to `>=` so that confidence values exactly at the threshold are accepted rather than rejected.',
    ],
    files: [
      {
        filename: 'intent-classifier.ts',
        language: 'typescript',
        buggyCode: `interface ConversationMessage {
  role: "customer" | "agent";
  content: string;
  timestamp: number;
}

interface ClassificationResult {
  intent: string;
  confidence: number;
}

/**
 * Deterministic classifier. Returns confidence based on message patterns.
 *
 * Rules:
 * - Direct order queries ("where is my order") -> order_status, 0.94
 * - Follow-up order queries without history ("also check") -> order_status, 0.70
 * - Follow-up order queries WITH history -> order_status, 0.85
 * - Product questions ("waterproof") -> product_question, 0.97
 * - Everything else -> general_inquiry, 0.45
 */
class ClassifierModel {
  classify(
    message: string,
    history: ConversationMessage[],
  ): ClassificationResult {
    const lower = message.toLowerCase();

    if (
      lower.includes("where is my order") ||
      lower.includes("order status") ||
      lower.includes("track my order")
    ) {
      return { intent: "order_status", confidence: 0.94 };
    }

    if (
      lower.includes("also check") ||
      lower.includes("check #sf-") ||
      lower.includes("what about order") ||
      lower.includes("another order")
    ) {
      if (history.length > 0) {
        return { intent: "order_status", confidence: 0.85 };
      }
      return { intent: "order_status", confidence: 0.70 };
    }

    if (
      lower.includes("waterproof") ||
      lower.includes("product spec") ||
      lower.includes("is the") ||
      lower.includes("does the")
    ) {
      return { intent: "product_question", confidence: 0.97 };
    }

    if (lower.includes("return") || lower.includes("refund")) {
      return { intent: "return_request", confidence: 0.88 };
    }

    return { intent: "general_inquiry", confidence: 0.45 };
  }
}

const classifierModel = new ClassifierModel();
const CONFIDENCE_THRESHOLD = 0.70;

export function classifyIntent(
  message: string,
  history: ConversationMessage[],
): ClassificationResult & { method: "primary" | "fallback" } {
  const primaryResult = classifierModel.classify(message, history);

  if (primaryResult.confidence > CONFIDENCE_THRESHOLD) {
    return { ...primaryResult, method: "primary" };
  }

  // Fall back to general inquiry
  return {
    intent: "general_inquiry",
    confidence: primaryResult.confidence,
    method: "fallback",
  };
}`,
        solutionCode: `interface ConversationMessage {
  role: "customer" | "agent";
  content: string;
  timestamp: number;
}

interface ClassificationResult {
  intent: string;
  confidence: number;
}

/**
 * Deterministic classifier. Returns confidence based on message patterns.
 *
 * Rules:
 * - Direct order queries ("where is my order") -> order_status, 0.94
 * - Follow-up order queries without history ("also check") -> order_status, 0.70
 * - Follow-up order queries WITH history -> order_status, 0.85
 * - Product questions ("waterproof") -> product_question, 0.97
 * - Everything else -> general_inquiry, 0.45
 */
class ClassifierModel {
  classify(
    message: string,
    history: ConversationMessage[],
  ): ClassificationResult {
    const lower = message.toLowerCase();

    if (
      lower.includes("where is my order") ||
      lower.includes("order status") ||
      lower.includes("track my order")
    ) {
      return { intent: "order_status", confidence: 0.94 };
    }

    if (
      lower.includes("also check") ||
      lower.includes("check #sf-") ||
      lower.includes("what about order") ||
      lower.includes("another order")
    ) {
      if (history.length > 0) {
        return { intent: "order_status", confidence: 0.85 };
      }
      return { intent: "order_status", confidence: 0.70 };
    }

    if (
      lower.includes("waterproof") ||
      lower.includes("product spec") ||
      lower.includes("is the") ||
      lower.includes("does the")
    ) {
      return { intent: "product_question", confidence: 0.97 };
    }

    if (lower.includes("return") || lower.includes("refund")) {
      return { intent: "return_request", confidence: 0.88 };
    }

    return { intent: "general_inquiry", confidence: 0.45 };
  }
}

const classifierModel = new ClassifierModel();
const CONFIDENCE_THRESHOLD = 0.70;

export function classifyIntent(
  message: string,
  history: ConversationMessage[],
): ClassificationResult & { method: "primary" | "fallback" } {
  const primaryResult = classifierModel.classify(message, history);

  if (primaryResult.confidence >= CONFIDENCE_THRESHOLD) {
    return { ...primaryResult, method: "primary" };
  }

  // Fall back to general inquiry
  return {
    intent: "general_inquiry",
    confidence: primaryResult.confidence,
    method: "fallback",
  };
}`,
      },
    ],
    testFiles: [
      {
        filename: 'intent-classifier.test.ts',
        language: 'typescript',
        code: `import { classifyIntent } from "./intent-classifier";

describe("intent-classifier", () => {
  it("classifies clear order status messages correctly", () => {
    const result = classifyIntent("Where is my order #SF-40821?", []);
    expect(result.intent).toBe("order_status");
    expect(result.confidence).toBe(0.94);
    expect(result.method).toBe("primary");
  });

  it("classifies product questions correctly", () => {
    const result = classifyIntent("Is the UltraBoost 5 waterproof?", []);
    expect(result.intent).toBe("product_question");
    expect(result.confidence).toBe(0.97);
    expect(result.method).toBe("primary");
  });

  it("confidence exactly at 0.70 should use primary intent, not fallback", () => {
    const result = classifyIntent(
      "Actually can you also check #SF-40822?",
      [],
    );

    expect(result.confidence).toBe(0.70);
    // 0.70 meets the threshold of 0.70 — should be accepted
    expect(result.intent).toBe("order_status");
    expect(result.method).toBe("primary");
  });

  it("with conversation history, follow-up gets higher confidence", () => {
    const history = [
      { role: "customer" as const, content: "Where is my order #SF-40821?", timestamp: 1000 },
      { role: "agent" as const, content: "Your order is shipped!", timestamp: 1001 },
    ];

    const result = classifyIntent(
      "Actually can you also check #SF-40822?",
      history,
    );

    expect(result.confidence).toBe(0.85);
    expect(result.intent).toBe("order_status");
    expect(result.method).toBe("primary");
  });

  it("low confidence messages should still fall back to general_inquiry", () => {
    const result = classifyIntent("Hello there", []);
    expect(result.confidence).toBe(0.45);
    expect(result.intent).toBe("general_inquiry");
    expect(result.method).toBe("fallback");
  });
});`,
      },
    ],
    solutionExplanation: `### Root Cause

The confidence threshold check uses strict greater-than (\`>\`) instead of greater-than-or-equal (\`>=\`):

\`\`\`typescript
if (primaryResult.confidence > CONFIDENCE_THRESHOLD) {
\`\`\`

The threshold is \`0.70\`. When the classifier returns confidence of **exactly** \`0.70\`, the condition \`0.70 > 0.70\` is \`false\`, so the code falls through to the \`general_inquiry\` fallback. The classifier correctly identified the intent but the threshold check rejected it.

### Fix

Use \`>=\` so confidence values at the threshold are accepted:

\`\`\`typescript
if (primaryResult.confidence >= CONFIDENCE_THRESHOLD) {
\`\`\``,
  },

  // -----------------------------------------------------------------------
  // Bug C — Knowledge Retriever Filter Inverted (> vs <)
  // -----------------------------------------------------------------------
  {
    id: 'support-agent-c',
    project: 'support-agent',
    projectLabel: 'Support Agent (AI)',
    bugNumber: 'C',
    title: 'Knowledge Search Returns Wrong Articles',
    difficulty: 'easy',
    category: 'comparison-logic',
    language: 'typescript',
    symptom: `### Symptom

When a customer asks "Is the UltraBoost 5 waterproof?", the knowledge retriever returns **"Gift Card Terms"** and **"Return Policy Overview"** instead of the relevant product articles. The AI agent confidently answers with completely wrong information.

### What you know

The knowledge retriever embeds the customer's query, searches a vector database, and filters results by a similarity threshold. The scoring system uses **cosine distance** where:
- \`0.0\` = identical (most relevant)
- \`1.0\` = completely unrelated (least relevant)

The threshold is \`0.35\` — articles with a distance **below** this threshold should be kept (they are similar enough to be relevant).

But the results are backwards: relevant articles are discarded and irrelevant ones are returned.`,
    context: `### Pipeline Flow
\`\`\`
Customer Message → ... → Knowledge Retriever → Response Generator
                          ↑
                    Embeds query, searches vector DB,
                    filters by similarity threshold (0.35)
\`\`\`

### Log excerpt
\`\`\`
[knowledge] Vector search results (pre-filter):
  - "UltraBoost 5 Product Specs"   score: 0.05  (very relevant)
  - "Shoe Care & Waterproofing"    score: 0.11  (relevant)
  - "Gift Card Terms"              score: 0.85  (irrelevant)
  - "Return Policy Overview"       score: 0.92  (irrelevant)
  threshold: 0.35
  score_description: "cosine distance: 0.0 = identical, 1.0 = unrelated"

[knowledge] Vector search results (post-filter):
  - "Gift Card Terms"              score: 0.85
  - "Return Policy Overview"       score: 0.92
\`\`\``,
    hints: [
      'Look at the filter condition. What does `score > 0.35` keep when lower scores mean more relevant?',
      'Cosine distance: 0.0 = best match, 1.0 = worst match. Filtering for `score > 0.35` keeps scores above 0.35 — the irrelevant documents.',
      'Change `>` to `<` so that only documents with distance below the threshold (i.e., the most similar ones) are kept.',
    ],
    files: [
      {
        filename: 'knowledge-retriever.ts',
        language: 'typescript',
        buggyCode: `// ---------------------------------------------------------------------------
// Fake embedding model — encodes query category in vector[0]
// ---------------------------------------------------------------------------

class EmbeddingModel {
  embed(text: string): number[] {
    const lower = text.toLowerCase();
    let category = 0.0; // general

    if (
      lower.includes("order") ||
      lower.includes("sf-") ||
      lower.includes("check #") ||
      lower.includes("also check")
    ) {
      category = 1.0; // order-related
    } else if (
      lower.includes("waterproof") ||
      lower.includes("product") ||
      lower.includes("ultraboost") ||
      lower.includes("material") ||
      lower.includes("specs")
    ) {
      category = 2.0; // product-related
    }

    const hash = Array.from(text).reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
    return [
      category,
      ...Array.from({ length: 7 }, (_, i) => Math.sin(hash + i)),
    ];
  }
}

// ---------------------------------------------------------------------------
// Fake vector DB with pre-computed cosine distances
// ---------------------------------------------------------------------------

interface KBArticle {
  docId: string;
  title: string;
  content: string;
}

interface SearchResult {
  docId: string;
  title: string;
  content: string;
  score: number; // cosine distance: 0.0 = identical, 1.0 = unrelated
}

interface VectorSearchParams {
  collection: string;
  vector: number[];
  limit: number;
}

const KB_ARTICLES: KBArticle[] = [
  { docId: "kb_042", title: "Order Tracking Guide", content: "To track your order, go to My Orders and click the tracking link." },
  { docId: "kb_119", title: "Shipping Timeframes by Region", content: "Standard shipping: 3-5 business days. Express: 1-2 business days." },
  { docId: "kb_088", title: "Multiple Order Management", content: "You can manage multiple orders from your account dashboard." },
  { docId: "kb_203", title: "Gift Card Terms", content: "Gift cards are valid for 12 months from purchase date." },
  { docId: "kb_067", title: "Return Policy Overview", content: "Items can be returned within 30 days of delivery." },
  { docId: "kb_301", title: "UltraBoost 5 Product Specs", content: "The UltraBoost 5 features a Primeknit upper with water-resistant coating." },
  { docId: "kb_305", title: "Shoe Care & Waterproofing", content: "To maintain water resistance, apply waterproofing spray every 2-3 months." },
];

// Distance tables by query category
// Category 1.0 = order queries, 2.0 = product queries, 0.0 = general
const DISTANCE_TABLES: Record<number, Record<string, number>> = {
  1: {
    kb_042: 0.08, kb_119: 0.12, kb_203: 0.87, kb_067: 0.91,
    kb_088: 0.93, kb_301: 0.95, kb_305: 0.96,
  },
  2: {
    kb_301: 0.05, kb_305: 0.11, kb_203: 0.85, kb_067: 0.92,
    kb_042: 0.93, kb_119: 0.94, kb_088: 0.95,
  },
  0: {
    kb_042: 0.20, kb_119: 0.25, kb_203: 0.85, kb_067: 0.88,
    kb_088: 0.90, kb_301: 0.92, kb_305: 0.94,
  },
};

class VectorDB {
  search(params: VectorSearchParams): SearchResult[] {
    const category = Math.round(params.vector[0] ?? 0);
    const distanceTable = DISTANCE_TABLES[category] ?? DISTANCE_TABLES[0];

    const results: SearchResult[] = KB_ARTICLES.map((article) => ({
      ...article,
      score: distanceTable[article.docId] ?? 0.5,
    }));

    results.sort((a, b) => a.score - b.score);
    return results.slice(0, params.limit);
  }
}

const embeddingModel = new EmbeddingModel();
const vectorDB = new VectorDB();

// ---------------------------------------------------------------------------
// Knowledge retriever
// ---------------------------------------------------------------------------

const SIMILARITY_THRESHOLD = 0.35;
const TOP_K = 5;

export function retrieveKnowledge(
  query: string,
  tenantId: string,
): SearchResult[] {
  const embedding = embeddingModel.embed(query);

  // Search vector DB — returns results sorted by score ascending (best first)
  const results = vectorDB.search({
    collection: \`kb_\${tenantId}\`,
    vector: embedding,
    limit: TOP_K,
  });

  // Filter by similarity threshold
  const filtered = results.filter((r) => r.score > SIMILARITY_THRESHOLD);

  return filtered;
}`,
        solutionCode: `// ---------------------------------------------------------------------------
// Fake embedding model — encodes query category in vector[0]
// ---------------------------------------------------------------------------

class EmbeddingModel {
  embed(text: string): number[] {
    const lower = text.toLowerCase();
    let category = 0.0; // general

    if (
      lower.includes("order") ||
      lower.includes("sf-") ||
      lower.includes("check #") ||
      lower.includes("also check")
    ) {
      category = 1.0; // order-related
    } else if (
      lower.includes("waterproof") ||
      lower.includes("product") ||
      lower.includes("ultraboost") ||
      lower.includes("material") ||
      lower.includes("specs")
    ) {
      category = 2.0; // product-related
    }

    const hash = Array.from(text).reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
    return [
      category,
      ...Array.from({ length: 7 }, (_, i) => Math.sin(hash + i)),
    ];
  }
}

// ---------------------------------------------------------------------------
// Fake vector DB with pre-computed cosine distances
// ---------------------------------------------------------------------------

interface KBArticle {
  docId: string;
  title: string;
  content: string;
}

interface SearchResult {
  docId: string;
  title: string;
  content: string;
  score: number; // cosine distance: 0.0 = identical, 1.0 = unrelated
}

interface VectorSearchParams {
  collection: string;
  vector: number[];
  limit: number;
}

const KB_ARTICLES: KBArticle[] = [
  { docId: "kb_042", title: "Order Tracking Guide", content: "To track your order, go to My Orders and click the tracking link." },
  { docId: "kb_119", title: "Shipping Timeframes by Region", content: "Standard shipping: 3-5 business days. Express: 1-2 business days." },
  { docId: "kb_088", title: "Multiple Order Management", content: "You can manage multiple orders from your account dashboard." },
  { docId: "kb_203", title: "Gift Card Terms", content: "Gift cards are valid for 12 months from purchase date." },
  { docId: "kb_067", title: "Return Policy Overview", content: "Items can be returned within 30 days of delivery." },
  { docId: "kb_301", title: "UltraBoost 5 Product Specs", content: "The UltraBoost 5 features a Primeknit upper with water-resistant coating." },
  { docId: "kb_305", title: "Shoe Care & Waterproofing", content: "To maintain water resistance, apply waterproofing spray every 2-3 months." },
];

// Distance tables by query category
// Category 1.0 = order queries, 2.0 = product queries, 0.0 = general
const DISTANCE_TABLES: Record<number, Record<string, number>> = {
  1: {
    kb_042: 0.08, kb_119: 0.12, kb_203: 0.87, kb_067: 0.91,
    kb_088: 0.93, kb_301: 0.95, kb_305: 0.96,
  },
  2: {
    kb_301: 0.05, kb_305: 0.11, kb_203: 0.85, kb_067: 0.92,
    kb_042: 0.93, kb_119: 0.94, kb_088: 0.95,
  },
  0: {
    kb_042: 0.20, kb_119: 0.25, kb_203: 0.85, kb_067: 0.88,
    kb_088: 0.90, kb_301: 0.92, kb_305: 0.94,
  },
};

class VectorDB {
  search(params: VectorSearchParams): SearchResult[] {
    const category = Math.round(params.vector[0] ?? 0);
    const distanceTable = DISTANCE_TABLES[category] ?? DISTANCE_TABLES[0];

    const results: SearchResult[] = KB_ARTICLES.map((article) => ({
      ...article,
      score: distanceTable[article.docId] ?? 0.5,
    }));

    results.sort((a, b) => a.score - b.score);
    return results.slice(0, params.limit);
  }
}

const embeddingModel = new EmbeddingModel();
const vectorDB = new VectorDB();

// ---------------------------------------------------------------------------
// Knowledge retriever
// ---------------------------------------------------------------------------

const SIMILARITY_THRESHOLD = 0.35;
const TOP_K = 5;

export function retrieveKnowledge(
  query: string,
  tenantId: string,
): SearchResult[] {
  const embedding = embeddingModel.embed(query);

  // Search vector DB — returns results sorted by score ascending (best first)
  const results = vectorDB.search({
    collection: \`kb_\${tenantId}\`,
    vector: embedding,
    limit: TOP_K,
  });

  // Filter by similarity threshold — keep docs with distance BELOW threshold
  const filtered = results.filter((r) => r.score < SIMILARITY_THRESHOLD);

  return filtered;
}`,
      },
    ],
    testFiles: [
      {
        filename: 'knowledge-retriever.test.ts',
        language: 'typescript',
        code: `import { retrieveKnowledge } from "./knowledge-retriever";

describe("knowledge-retriever", () => {
  it("product question should return relevant product articles", () => {
    const results = retrieveKnowledge(
      "Is the UltraBoost 5 waterproof?",
      "shopflow",
    );

    const titles = results.map((r) => r.title);

    // Should keep low-distance (relevant) docs
    expect(titles).toContain("UltraBoost 5 Product Specs");
    expect(titles).toContain("Shoe Care & Waterproofing");
    // Should discard high-distance (irrelevant) docs
    expect(titles).not.toContain("Gift Card Terms");
    expect(titles).not.toContain("Return Policy Overview");
  });

  it("order query should return order-related articles", () => {
    const results = retrieveKnowledge(
      "Hi, where is my order #SF-40821?",
      "shopflow",
    );

    const titles = results.map((r) => r.title);

    expect(titles).toContain("Order Tracking Guide");
    expect(titles).toContain("Shipping Timeframes by Region");
    expect(titles).not.toContain("Gift Card Terms");
  });

  it("all returned results should have score below threshold", () => {
    const results = retrieveKnowledge(
      "Is the UltraBoost 5 waterproof?",
      "shopflow",
    );

    for (const result of results) {
      expect(result.score).toBeLessThan(0.35);
    }
  });

  it("should return at least one result for a relevant query", () => {
    const results = retrieveKnowledge(
      "Where is my order #SF-40821?",
      "shopflow",
    );

    expect(results.length).toBeGreaterThan(0);
  });
});`,
      },
    ],
    solutionExplanation: `### Root Cause

The similarity filter is inverted:

\`\`\`typescript
const filtered = results.filter((r) => r.score > SIMILARITY_THRESHOLD);
\`\`\`

The scoring system uses **cosine distance** where \`0.0 = identical\` and \`1.0 = completely unrelated\`. Filtering for \`score > 0.35\` **keeps documents with distance greater than 0.35** -- the least relevant ones. The most relevant documents (low distance scores like 0.05 and 0.11) are discarded.

### Fix

Flip the comparison to keep documents **below** the threshold (the relevant ones):

\`\`\`typescript
const filtered = results.filter((r) => r.score < SIMILARITY_THRESHOLD);
\`\`\``,
  },

  // -----------------------------------------------------------------------
  // Bug D — Wrong Field Name in Order Mapper
  // -----------------------------------------------------------------------
  {
    id: 'support-agent-d',
    project: 'support-agent',
    projectLabel: 'Support Agent (AI)',
    bugNumber: 'D',
    title: 'Delivery Date Always Shows "Unavailable"',
    difficulty: 'easy',
    category: 'type-mismatch',
    language: 'typescript',
    symptom: `### Symptom

Every customer asking about their order gets **"estimated delivery date is unavailable"** even though the ShopFlow API returns the data.

The order ID, status, items, total, and tracking number all show correctly -- only the delivery date is missing.

### What you know

The platform builds AI customer support agents. When a customer asks about an order, the system calls the ShopFlow API, maps the response to a clean format, and passes it to the LLM for response generation.

The ShopFlow API response includes a \`delivery_estimate\` field, but the mapped result always shows \`"unavailable"\`.`,
    context: `### Pipeline Flow
\`\`\`
Customer Message → Intent Classifier → Action Executor → Response Generator
                                        ↑
                                   Calls ShopFlow API
                                   Maps response fields
\`\`\`

### Log excerpt (Message 1)
\`\`\`json
// ShopFlow API raw response:
{
  "order_id": "SF-40821",
  "status": "shipped",
  "items": ["UltraBoost 5 (Size 10)"],
  "total": "$189.99",
  "shipped_at": "2024-11-15T14:30:00Z",
  "delivery_estimate": "2024-11-18T00:00:00Z",
  "tracking_number": "1Z999AA10123456784"
}

// Mapped result passed to LLM:
{
  "order_id": "SF-40821",
  "status": "shipped",
  "estimated_delivery": "unavailable"  <- Should be "2024-11-18"
}
\`\`\``,
    hints: [
      'Compare the field name in the ShopFlowOrderResponse interface with what the mapping code reads.',
      'The interface defines `delivery_estimate` but the code reads `estimated_delivery_date`. These are different names.',
      'The code uses `(raw as any).estimated_delivery_date` -- a typo from an older API version. The correct field is `raw.delivery_estimate`.',
    ],
    files: [
      {
        filename: 'action-executor.ts',
        language: 'typescript',
        buggyCode: `interface ShopFlowOrderResponse {
  order_id: string;
  status: string;
  items: string[];
  total: string;
  shipped_at: string | null;
  delivery_estimate: string | null;
  tracking_number: string | null;
}

interface MappedOrderResult {
  order_id: string;
  status: string;
  items: string[];
  total: string;
  shipped_at: string;
  estimated_delivery: string;
  tracking_number: string;
}

export function mapOrderResponse(raw: ShopFlowOrderResponse): MappedOrderResult {
  return {
    order_id: raw.order_id,
    status: raw.status,
    items: raw.items,
    total: raw.total,
    shipped_at: raw.shipped_at
      ? new Date(raw.shipped_at).toISOString().split("T")[0]
      : "not yet shipped",
    estimated_delivery: (raw as any).estimated_delivery_date
      ? new Date((raw as any).estimated_delivery_date as string)
          .toISOString()
          .split("T")[0]
      : "unavailable",
    tracking_number: raw.tracking_number ?? "not available",
  };
}`,
        solutionCode: `interface ShopFlowOrderResponse {
  order_id: string;
  status: string;
  items: string[];
  total: string;
  shipped_at: string | null;
  delivery_estimate: string | null;
  tracking_number: string | null;
}

interface MappedOrderResult {
  order_id: string;
  status: string;
  items: string[];
  total: string;
  shipped_at: string;
  estimated_delivery: string;
  tracking_number: string;
}

export function mapOrderResponse(raw: ShopFlowOrderResponse): MappedOrderResult {
  return {
    order_id: raw.order_id,
    status: raw.status,
    items: raw.items,
    total: raw.total,
    shipped_at: raw.shipped_at
      ? new Date(raw.shipped_at).toISOString().split("T")[0]
      : "not yet shipped",
    estimated_delivery: raw.delivery_estimate
      ? new Date(raw.delivery_estimate).toISOString().split("T")[0]
      : "unavailable",
    tracking_number: raw.tracking_number ?? "not available",
  };
}`,
      },
    ],
    testFiles: [
      {
        filename: 'action-executor.test.ts',
        language: 'typescript',
        code: `import { mapOrderResponse } from "./action-executor";

describe("mapOrderResponse", () => {
  const fullOrder = {
    order_id: "SF-40821",
    status: "shipped",
    items: ["UltraBoost 5 (Size 10)"],
    total: "$189.99",
    shipped_at: "2024-11-15T14:30:00Z",
    delivery_estimate: "2024-11-18T00:00:00Z",
    tracking_number: "1Z999AA10123456784",
  };

  it("should map delivery_estimate to estimated_delivery date string", () => {
    const result = mapOrderResponse(fullOrder);
    expect(result.estimated_delivery).toBe("2024-11-18");
  });

  it("should map shipped_at to date string", () => {
    const result = mapOrderResponse(fullOrder);
    expect(result.shipped_at).toBe("2024-11-15");
  });

  it("should preserve order_id", () => {
    const result = mapOrderResponse(fullOrder);
    expect(result.order_id).toBe("SF-40821");
  });

  it("should show 'not yet shipped' when shipped_at is null", () => {
    const order = { ...fullOrder, shipped_at: null };
    const result = mapOrderResponse(order);
    expect(result.shipped_at).toBe("not yet shipped");
  });

  it("should show 'unavailable' when delivery_estimate is null", () => {
    const order = { ...fullOrder, delivery_estimate: null };
    const result = mapOrderResponse(order);
    expect(result.estimated_delivery).toBe("unavailable");
  });

  it("should show 'not available' when tracking_number is null", () => {
    const order = { ...fullOrder, tracking_number: null };
    const result = mapOrderResponse(order);
    expect(result.tracking_number).toBe("not available");
  });
});`,
      },
    ],
    solutionExplanation: `### Root Cause

The mapper reads a field that doesn't exist on the response:

\`\`\`typescript
estimated_delivery: (raw as any).estimated_delivery_date  // wrong field name
\`\`\`

The \`ShopFlowOrderResponse\` interface defines the field as \`delivery_estimate\`, and that's what the API sends. But the code reads \`estimated_delivery_date\` -- likely a leftover from an older API version.

Since \`estimated_delivery_date\` is \`undefined\`, the ternary falls through to \`"unavailable"\` every time. The \`as any\` cast hides the type error.

### Fix

Use the correct field name:
\`\`\`typescript
estimated_delivery: raw.delivery_estimate
  ? new Date(raw.delivery_estimate).toISOString().split("T")[0]
  : "unavailable",
\`\`\``,
  },
];
