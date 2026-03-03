import { Topic } from './topics';

export const gotchas: Topic[] = [
  {
    id: 'python',
    title: 'Python Gotchas',
    icon: 'Py',
    summary:
      'Mutable defaults, late binding closures, scope traps, and other pitfalls that bite even experienced Python developers.',
    content: `
## Python Gotchas

The most common Python pitfalls that come up in interviews and production code. Each one is a real bug pattern — know them before you get caught.

---

### 1. Mutable Default Arguments

**The trap:**
\`\`\`python
def add_item(item, lst=[]):
    lst.append(item)
    return lst

print(add_item("a"))  # ['a']
print(add_item("b"))  # ['a', 'b'] — wait, what?
\`\`\`

**What happens:** Default arguments are evaluated **once** when the function is defined, not each time it's called. The same list object is shared across all calls.

**The fix:**
\`\`\`python
def add_item(item, lst=None):
    if lst is None:
        lst = []
    lst.append(item)
    return lst
\`\`\`

---

### 2. Mutation of Arguments Passed In

**The trap:**
\`\`\`python
def remove_duplicates(lst):
    lst.sort()
    # ... deduplicate in place
    return lst

original = [3, 1, 2]
result = remove_duplicates(original)
print(original)  # [1, 2, 3] — original is mutated!
\`\`\`

**What happens:** Lists (and dicts, sets, etc.) are passed **by reference**. Any mutation inside the function affects the original object.

**The fix:**
\`\`\`python
def remove_duplicates(lst):
    lst = sorted(lst)  # creates a new list
    # ... or lst = lst.copy() then mutate
    return lst
\`\`\`

---

### 3. Late Binding Closures in Loops

**The trap:**
\`\`\`python
funcs = []
for i in range(3):
    funcs.append(lambda: i)

print([f() for f in funcs])  # [2, 2, 2] — not [0, 1, 2]!
\`\`\`

**What happens:** The lambda captures the **variable** \`i\`, not its current **value**. By the time you call the lambdas, the loop has finished and \`i\` is 2.

**The fix:**
\`\`\`python
funcs = []
for i in range(3):
    funcs.append(lambda i=i: i)  # default argument captures the value

print([f() for f in funcs])  # [0, 1, 2]
\`\`\`

---

### 4. \`is\` vs \`==\` (Identity vs Equality)

**The trap:**
\`\`\`python
a = 256
b = 256
print(a is b)  # True

a = 257
b = 257
print(a is b)  # False — same value, different objects!
\`\`\`

**What happens:** \`is\` checks **identity** (same object in memory), not equality. CPython caches integers from -5 to 256, so small ints share the same object. Anything outside that range creates new objects.

**The fix:**
\`\`\`python
# Always use == for value comparison
print(a == b)  # True

# Only use 'is' for singletons: None, True, False
if x is None:
    ...
\`\`\`

---

### 5. Shallow vs Deep Copy (The Nested List Trap)

**The trap:**
\`\`\`python
# Looks like a 3x3 grid
grid = [[0] * 3] * 3
grid[0][0] = 1
print(grid)  # [[1, 0, 0], [1, 0, 0], [1, 0, 0]] — all rows changed!
\`\`\`

**What happens:** \`[[0] * 3] * 3\` creates **three references to the same inner list**. Mutating one row mutates them all.

**The fix:**
\`\`\`python
# List comprehension creates distinct inner lists
grid = [[0] * 3 for _ in range(3)]
grid[0][0] = 1
print(grid)  # [[1, 0, 0], [0, 0, 0], [0, 0, 0]]
\`\`\`

For general deep copies:
\`\`\`python
import copy
original = [[1, 2], [3, 4]]
deep = copy.deepcopy(original)
\`\`\`

---

### 6. Variable Scope & LEGB Rule

**The trap:**
\`\`\`python
x = 10

def foo():
    print(x)  # UnboundLocalError!
    x = 20

foo()
\`\`\`

**What happens:** Python sees \`x = 20\` in the function and treats \`x\` as a **local** variable for the entire function scope. The \`print(x)\` happens before the local \`x\` is assigned — hence \`UnboundLocalError\`.

**The fix:**
\`\`\`python
x = 10

def foo():
    # Option 1: use a different name
    local_x = 20
    print(x)  # reads the global

    # Option 2: explicitly declare global (use sparingly)
    # global x
    # x = 20
\`\`\`

Python resolves names in LEGB order: **L**ocal → **E**nclosing → **G**lobal → **B**uilt-in.

---

### 7. Dictionary Mutation During Iteration

**The trap:**
\`\`\`python
d = {"a": 1, "b": 2, "c": 3}
for key in d:
    if d[key] < 3:
        del d[key]  # RuntimeError: dictionary changed size during iteration
\`\`\`

**What happens:** You cannot add or remove keys from a dict while iterating over it. Python raises a \`RuntimeError\`.

**The fix:**
\`\`\`python
# Iterate over a copy of the keys
d = {"a": 1, "b": 2, "c": 3}
for key in list(d.keys()):
    if d[key] < 3:
        del d[key]

# Or use a dict comprehension to build a new dict
d = {k: v for k, v in d.items() if v >= 3}
\`\`\`

---

### 8. Truthiness Traps

**The trap:**
\`\`\`python
def process(data=None):
    if not data:
        data = get_default()
    return data

process([])   # [] is falsy — gets replaced!
process(0)    # 0 is falsy — gets replaced!
process("")   # "" is falsy — gets replaced!
\`\`\`

**What happens:** In Python, \`0\`, \`""\`, \`[]\`, \`{}\`, \`set()\`, \`None\`, and \`False\` are all **falsy**. Using \`if not data\` catches valid empty values you might want to keep.

**The fix:**
\`\`\`python
def process(data=None):
    if data is None:
        data = get_default()
    return data
\`\`\`

---

### 9. String \`+=\` in Loops is O(n\u00b2)

**The trap:**
\`\`\`python
result = ""
for word in words:
    result += word + " "  # O(n\u00b2) total — copies the entire string each time
\`\`\`

**What happens:** Strings are immutable. Each \`+=\` creates a **new string** and copies all previous content. For \`n\` words, that's O(1 + 2 + ... + n) = O(n\u00b2) total work.

**The fix:**
\`\`\`python
result = " ".join(words)  # O(n) — builds the string once
\`\`\`

---

### 10. \`except:\` Catching Too Much

**The trap:**
\`\`\`python
try:
    value = int(user_input)
except:
    print("Invalid input")
\`\`\`

**What happens:** Bare \`except:\` catches **everything** — including \`KeyboardInterrupt\`, \`SystemExit\`, and \`MemoryError\`. Your Ctrl+C won't work, and real errors get silently swallowed.

**The fix:**
\`\`\`python
try:
    value = int(user_input)
except ValueError:
    print("Invalid input")
# Or at most: except Exception as e:
\`\`\`

Always catch the **most specific** exception type you expect.
`,
  },
  {
    id: 'typescript',
    title: 'TypeScript Gotchas',
    icon: 'TS',
    summary:
      'Type assertions that lie, structural typing surprises, nullish vs falsy, and the gaps between types and runtime.',
    content: `
## TypeScript Gotchas

TypeScript's type system is powerful but has sharp edges. These are the pitfalls that catch people in interviews and code reviews.

---

### 1. \`any\` Type Leakage

**The trap:**
\`\`\`typescript
function parseConfig(raw: any) {
  return raw.settings.theme; // no error — any disables all checks
}

const config = parseConfig(null); // compiles fine, crashes at runtime
\`\`\`

**What happens:** \`any\` **disables type checking** entirely — and it **spreads**. Anything derived from \`any\` is also \`any\`. One \`any\` at the boundary can silently infect your entire codebase.

**The fix:**
\`\`\`typescript
function parseConfig(raw: unknown) {
  if (typeof raw === "object" && raw !== null && "settings" in raw) {
    // narrow the type safely
  }
}
\`\`\`

Use \`unknown\` instead of \`any\` — it forces you to narrow before accessing properties.

---

### 2. Structural Typing Surprises

**The trap:**
\`\`\`typescript
interface User {
  name: string;
  email: string;
}

const data = { name: "Alice", email: "a@b.com", password: "secret123" };
const user: User = data; // No error! Extra properties are allowed.

sendToClient(user); // user still has .password at runtime
\`\`\`

**What happens:** TypeScript uses **structural typing** — an object just needs the required properties. Extra properties are only rejected on **inline object literals** (excess property checking), not on variables.

**The fix:**
\`\`\`typescript
// Explicitly pick the properties you need
const user: User = { name: data.name, email: data.email };

// Or use a mapper/pick utility
const user = pick(data, ["name", "email"]);
\`\`\`

---

### 3. \`as\` Assertions Don't Convert at Runtime

**The trap:**
\`\`\`typescript
interface ApiResponse {
  id: number;
  name: string;
}

const response = await fetch("/api/user");
const data = (await response.json()) as ApiResponse;
// data.id could be undefined, a string, anything — 'as' doesn't check
\`\`\`

**What happens:** \`as\` is a **compile-time assertion only**. It tells TypeScript "trust me, this is the right shape." It does **zero runtime validation**. The actual data could be completely different.

**The fix:**
\`\`\`typescript
// Validate at the boundary with a runtime check or library (e.g., zod)
import { z } from "zod";

const ApiResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
});

const data = ApiResponseSchema.parse(await response.json());
\`\`\`

---

### 4. \`?.\` vs \`&&\`, \`??\` vs \`||\`

**The trap:**
\`\`\`typescript
const port = config.port || 3000;
// If config.port is 0, this returns 3000!

const name = user.name || "Anonymous";
// If user.name is "", this returns "Anonymous"!
\`\`\`

**What happens:** \`||\` returns the right side for **any falsy** value: \`0\`, \`""\`, \`false\`, \`null\`, \`undefined\`, \`NaN\`. The **nullish coalescing** operator \`??\` only triggers for \`null\` or \`undefined\`.

**The fix:**
\`\`\`typescript
const port = config.port ?? 3000;    // only if null/undefined
const name = user.name ?? "Anonymous"; // only if null/undefined

// Similarly: ?. vs &&
user?.address?.city   // safe navigation, returns undefined if null/undefined
user && user.address && user.address.city // treats 0, "", false as falsy too
\`\`\`

---

### 5. \`Object.keys()\` Returns \`string[]\`

**The trap:**
\`\`\`typescript
interface Config {
  host: string;
  port: number;
}

const config: Config = { host: "localhost", port: 8080 };
Object.keys(config).forEach((key) => {
  console.log(config[key]);
  // Error: Element implicitly has an 'any' type because
  // expression of type 'string' can't be used to index type 'Config'
});
\`\`\`

**What happens:** \`Object.keys()\` returns \`string[]\`, not \`(keyof T)[]\`. TypeScript does this intentionally because objects can have more properties at runtime than the type declares (structural typing).

**The fix:**
\`\`\`typescript
// Option 1: Type assertion (if you're sure of the shape)
(Object.keys(config) as (keyof Config)[]).forEach((key) => {
  console.log(config[key]);
});

// Option 2: Use a type-safe entries helper
function typedEntries<T extends object>(obj: T) {
  return Object.entries(obj) as [keyof T, T[keyof T]][];
}
\`\`\`

---

### 6. Enum Pitfalls

**The trap:**
\`\`\`typescript
enum Status {
  Active,    // 0
  Inactive,  // 1
}

// Numeric enums have reverse mapping
console.log(Status[0]); // "Active" — string, not Status!
console.log(Status[99]); // undefined — no error!

function setStatus(s: Status) { /* ... */ }
setStatus(99); // No error! Any number is accepted.
\`\`\`

**What happens:** Numeric enums accept **any number**, not just defined members. They also create reverse mappings (\`Status[0] === "Active"\`), which is confusing.

**The fix:**
\`\`\`typescript
// Prefer union types or string enums
type Status = "active" | "inactive";

// Or string enums (no reverse mapping, stricter)
enum Status {
  Active = "active",
  Inactive = "inactive",
}
\`\`\`

---

### 7. Type Widening

**The trap:**
\`\`\`typescript
let status = "active";
// type is string, not "active"

function setStatus(s: "active" | "inactive") { /* ... */ }
setStatus(status); // Error: string is not assignable to "active" | "inactive"
\`\`\`

**What happens:** \`let\` declarations **widen** literal types to their base type (\`"active"\` becomes \`string\`). TypeScript assumes you might reassign the variable.

**The fix:**
\`\`\`typescript
const status = "active"; // type is "active" (literal)

// Or use 'as const' for complex values
const config = { status: "active" } as const;
// config.status is "active", not string
\`\`\`

---

### 8. \`Readonly<T>\` is Shallow

**The trap:**
\`\`\`typescript
interface Config {
  db: { host: string; port: number };
}

const config: Readonly<Config> = {
  db: { host: "localhost", port: 5432 },
};

config.db = { host: "x", port: 0 }; // Error (good)
config.db.port = 9999;               // No error! (bad)
\`\`\`

**What happens:** \`Readonly<T>\` only makes the **top-level** properties readonly. Nested objects are still mutable.

**The fix:**
\`\`\`typescript
// Use a recursive DeepReadonly type
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

const config: DeepReadonly<Config> = { /* ... */ };
config.db.port = 9999; // Error now!
\`\`\`

---

### 9. Index Signatures Need \`noUncheckedIndexedAccess\`

**The trap:**
\`\`\`typescript
interface Cache {
  [key: string]: string;
}

const cache: Cache = {};
const value = cache["missing-key"];
// TypeScript says: string (not string | undefined!)
console.log(value.toUpperCase()); // compiles fine, crashes at runtime
\`\`\`

**What happens:** By default, TypeScript assumes index signatures always return the declared type — never \`undefined\`. This is a lie for any key that doesn't exist.

**The fix:**
\`\`\`json
// tsconfig.json
{
  "compilerOptions": {
    "noUncheckedIndexedAccess": true
  }
}
\`\`\`
\`\`\`typescript
const value = cache["missing-key"]; // now: string | undefined
if (value !== undefined) {
  console.log(value.toUpperCase()); // safe
}
\`\`\`

---

### 10. Promise Error Handling

**The trap:**
\`\`\`typescript
async function fetchUser(id: string) {
  const res = await fetch(\`/api/users/\${id}\`);
  return res.json(); // no .ok check, no try/catch
}

// Caller forgets to await or catch
fetchUser("123"); // unhandled promise rejection if it fails
\`\`\`

**What happens:** \`async\` functions **always return a Promise**. If you don't \`await\` the call, errors vanish silently. And \`fetch\` doesn't throw on 404/500 — you need to check \`res.ok\` yourself.

**The fix:**
\`\`\`typescript
async function fetchUser(id: string): Promise<User> {
  const res = await fetch(\`/api/users/\${id}\`);
  if (!res.ok) {
    throw new Error(\`Failed to fetch user: \${res.status}\`);
  }
  return res.json();
}

// Always handle the promise
try {
  const user = await fetchUser("123");
} catch (err) {
  console.error("Failed:", err);
}
\`\`\`
`,
  },
  {
    id: 'react',
    title: 'React Gotchas',
    icon: 'Re',
    summary:
      'Stale closures, reference equality, useEffect pitfalls, and the mental model mistakes that cause subtle bugs.',
    content: `
## React Gotchas

React's hooks and rendering model have specific mental models you need to internalize. These are the most common mistakes that cause subtle, hard-to-debug issues.

---

### 1. Stale Closures in Hooks

**The trap:**
\`\`\`tsx
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      console.log(count); // always 0!
      setCount(count + 1); // always sets to 1!
    }, 1000);
    return () => clearInterval(id);
  }, []); // empty deps — closure captures initial count

  return <div>{count}</div>;
}
\`\`\`

**What happens:** The effect closure captures the \`count\` value **from the render it was created in**. With \`[]\` as deps, it never re-runs, so it always sees \`count = 0\`.

**The fix:**
\`\`\`tsx
useEffect(() => {
  const id = setInterval(() => {
    setCount((prev) => prev + 1); // functional update — no stale closure
  }, 1000);
  return () => clearInterval(id);
}, []);
\`\`\`

Use **functional updates** (\`prev => prev + 1\`) when the new state depends on the previous state inside a stale closure.

---

### 2. Reference Equality and Re-renders

**The trap:**
\`\`\`tsx
function Parent() {
  const style = { color: "red" }; // new object every render

  return <Child style={style} />;
}

const Child = React.memo(({ style }) => {
  // Re-renders every time because {} !== {}
  return <div style={style}>Hello</div>;
});
\`\`\`

**What happens:** Every render creates a **new object** for \`style\`. Even though the values are identical, \`React.memo\` does a **shallow comparison** and sees a different reference, so it re-renders.

**The fix:**
\`\`\`tsx
function Parent() {
  const style = useMemo(() => ({ color: "red" }), []); // stable reference
  return <Child style={style} />;
}

// Or define it outside the component if it's truly static
const style = { color: "red" };
\`\`\`

---

### 3. useEffect Cleanup and Async Race Conditions

**The trap:**
\`\`\`tsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(\`/api/users/\${userId}\`)
      .then((res) => res.json())
      .then((data) => setUser(data)); // may set state for a stale userId!
  }, [userId]);

  return <div>{user?.name}</div>;
}
\`\`\`

**What happens:** If \`userId\` changes rapidly, the first fetch might resolve **after** the second. The component shows the wrong user data — a classic race condition.

**The fix:**
\`\`\`tsx
useEffect(() => {
  let cancelled = false;

  fetch(\`/api/users/\${userId}\`)
    .then((res) => res.json())
    .then((data) => {
      if (!cancelled) setUser(data);
    });

  return () => { cancelled = true; }; // cleanup on re-run
}, [userId]);
\`\`\`

The cleanup function runs **before** the effect re-runs for a new \`userId\`, preventing stale updates.

---

### 4. useMemo / useCallback Misuse

**The trap:**
\`\`\`tsx
function List({ items }) {
  // Premature optimization — useMemo has its own overhead
  const sorted = useMemo(() => [...items].sort(), [items]);

  // useCallback for a handler that's never passed to a memoized child
  const handleClick = useCallback(() => {
    console.log("clicked");
  }, []);

  return <div onClick={handleClick}>{sorted.map(/* ... */)}</div>;
}
\`\`\`

**What happens:** \`useMemo\` and \`useCallback\` have a cost — they store the previous value and compare deps on every render. If the computation is cheap or the result isn't passed to a memoized child, you're **adding** overhead, not saving it.

**The fix:**
\`\`\`tsx
function List({ items }) {
  // Just compute it — React renders are fast
  const sorted = [...items].sort();
  const handleClick = () => console.log("clicked");

  return <div onClick={handleClick}>{sorted.map(/* ... */)}</div>;
}

// Only memoize when:
// 1. The value is passed to React.memo children
// 2. The computation is genuinely expensive
// 3. You've profiled and confirmed unnecessary re-renders
\`\`\`

---

### 5. State Updates Are Asynchronous

**The trap:**
\`\`\`tsx
function Form() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
    // count is still 0 here — all three set it to 1!
  };

  return <button onClick={handleClick}>{count}</button>;
}
\`\`\`

**What happens:** State updates are **batched**. Each \`setCount(count + 1)\` uses the same \`count\` value (0) from the current closure. The result is 1, not 3.

**The fix:**
\`\`\`tsx
const handleClick = () => {
  setCount((prev) => prev + 1); // 0 -> 1
  setCount((prev) => prev + 1); // 1 -> 2
  setCount((prev) => prev + 1); // 2 -> 3
};
\`\`\`

Use **functional updates** when the next state depends on the previous state.

---

### 6. Key Prop Mistakes

**The trap:**
\`\`\`tsx
{items.map((item, index) => (
  <TodoItem key={index} item={item} />
))}
\`\`\`

**What happens:** Using \`index\` as key breaks when items are **reordered, inserted, or deleted**. React associates state with the key — if you delete the first item, the second item inherits the first item's state (checked/unchecked, input values, etc.).

**The fix:**
\`\`\`tsx
{items.map((item) => (
  <TodoItem key={item.id} item={item} />
))}
\`\`\`

Use a **stable, unique identifier** (database ID, UUID). Index is only safe for lists that never change order.

---

### 7. useEffect Dependency Array Pitfalls

**The trap:**
\`\`\`tsx
// 1. Empty array — runs once, stale closures
useEffect(() => {
  window.addEventListener("resize", () => setWidth(window.innerWidth));
}, []); // missing cleanup!

// 2. Object as dependency — infinite loop
useEffect(() => {
  fetchData(filters);
}, [filters]); // if filters is { page: 1 }, new object every render → infinite loop

// 3. Omitted array — runs every render
useEffect(() => {
  console.log("I run on EVERY render");
}); // no array at all = runs after every render
\`\`\`

**What happens:** The dependency array controls when the effect re-runs. Getting it wrong causes stale data, infinite loops, or performance problems.

**The fix:**
\`\`\`tsx
// 1. Always clean up event listeners
useEffect(() => {
  const handler = () => setWidth(window.innerWidth);
  window.addEventListener("resize", handler);
  return () => window.removeEventListener("resize", handler);
}, []);

// 2. Memoize object deps or use primitive values
const page = filters.page;
useEffect(() => {
  fetchData({ page });
}, [page]);

// 3. Be intentional — every effect needs a dependency array
\`\`\`

---

### 8. Derived State Anti-Pattern

**The trap:**
\`\`\`tsx
function UserGreeting({ user }) {
  const [fullName, setFullName] = useState(
    user.firstName + " " + user.lastName
  );

  // Now you need useEffect to keep it in sync...
  useEffect(() => {
    setFullName(user.firstName + " " + user.lastName);
  }, [user.firstName, user.lastName]);

  return <h1>Hello, {fullName}</h1>;
}
\`\`\`

**What happens:** Copying props into state creates a **synchronization problem**. You need an effect to keep them in sync, which means the component renders with stale data for one frame.

**The fix:**
\`\`\`tsx
function UserGreeting({ user }) {
  // Just compute it during render — no state needed
  const fullName = user.firstName + " " + user.lastName;
  return <h1>Hello, {fullName}</h1>;
}
\`\`\`

**Rule:** If a value can be **computed** from props or other state, don't put it in state.

---

### 9. Conditional Hooks

**The trap:**
\`\`\`tsx
function Profile({ isLoggedIn }) {
  if (isLoggedIn) {
    const [user, setUser] = useState(null); // ERROR!
  }

  const [theme, setTheme] = useState("dark");
  // ...
}
\`\`\`

**What happens:** Hooks must be called in the **exact same order** on every render. React identifies hooks by their call order, not by name. Conditional hooks change the order when conditions change, corrupting state.

**The fix:**
\`\`\`tsx
function Profile({ isLoggedIn }) {
  const [user, setUser] = useState(null); // always call
  const [theme, setTheme] = useState("dark");

  // Use the condition in the render or effect, not around the hook
  if (!isLoggedIn) return <LoginPrompt />;

  return <div>{user?.name}</div>;
}
\`\`\`

---

### 10. React.memo Shallow Comparison

**The trap:**
\`\`\`tsx
const ExpensiveList = React.memo(({ items, onItemClick }) => {
  return items.map((item) => (
    <div key={item.id} onClick={() => onItemClick(item.id)}>
      {item.name}
    </div>
  ));
});

function Parent() {
  const [items] = useState(getItems());

  // New function reference every render — React.memo is useless!
  const handleClick = (id) => console.log(id);

  return <ExpensiveList items={items} onItemClick={handleClick} />;
}
\`\`\`

**What happens:** \`React.memo\` does a **shallow comparison** of all props. If any prop is a new reference (like an inline function), the memoized component re-renders anyway. The memo is doing nothing.

**The fix:**
\`\`\`tsx
function Parent() {
  const [items] = useState(getItems());

  // Stable reference with useCallback
  const handleClick = useCallback((id) => {
    console.log(id);
  }, []);

  return <ExpensiveList items={items} onItemClick={handleClick} />;
}
\`\`\`

For \`React.memo\` to work, **all props** must have stable references. If you can't stabilize all props, \`React.memo\` is adding overhead for no benefit.
`,
  },
];
