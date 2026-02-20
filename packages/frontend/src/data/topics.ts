export interface Topic {
  id: string;
  title: string;
  icon: string;
  summary: string;
  content: string; // Markdown
}

export const topics: Topic[] = [
  {
    id: 'big-o-notation',
    title: 'Big O Notation',
    icon: 'O',
    summary: 'The language of algorithm efficiency. Master how to read, write, and calculate time and space complexity.',
    content: `
## Big O Notation

Big O notation describes **how the runtime or memory usage of an algorithm scales** as the input size \`n\` grows. It lets you compare algorithms without worrying about hardware, language, or constant factors.

> Big O describes the **upper bound** — worst-case growth rate, not exact performance.

---

### Why It Matters

Two solutions can both be "correct" but have wildly different performance at scale:

\`\`\`python
# O(n²) — works fine for n=100, painful for n=1,000,000
def has_duplicate_slow(arr):
    for i in range(len(arr)):
        for j in range(i + 1, len(arr)):
            if arr[i] == arr[j]:
                return True
    return False

# O(n) — same result, scales to millions
def has_duplicate_fast(arr):
    return len(arr) != len(set(arr))
\`\`\`

---

### The 8 Common Complexities

#### O(1) — Constant
Runtime does not depend on input size at all.
\`\`\`python
def get_first(arr):
    return arr[0]             # one operation regardless of len(arr)

def is_even(n):
    return n % 2 == 0         # one modulo, always

def hash_lookup(d, key):
    return d.get(key)         # hash map lookup is O(1) average
\`\`\`

#### O(log n) — Logarithmic
Input is repeatedly **halved** (or multiplied). Common in binary search and trees.
\`\`\`python
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2   # cut search space in half each time
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1
# After k iterations, we've checked 2^k elements → k = log₂(n) iterations
\`\`\`

#### O(n) — Linear
You visit every element once.
\`\`\`python
def find_max(arr):
    m = arr[0]
    for x in arr:    # touch each element once
        if x > m:
            m = x
    return m
\`\`\`

#### O(n log n) — Linearithmic
Typical of efficient sorting algorithms — you do O(log n) levels of work, each level touching all n elements.
\`\`\`python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])   # log n recursive levels
    right = merge_sort(arr[mid:])
    return merge(left, right)      # O(n) merge at each level
# Total: n elements × log n levels = O(n log n)
\`\`\`

#### O(n²) — Quadratic
Two nested loops, each proportional to n.
\`\`\`python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):         # outer: n iterations
        for j in range(n - 1): # inner: ~n iterations
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
\`\`\`

#### O(n³) — Cubic
Three nested loops. Quickly becomes impractical.
\`\`\`python
def matrix_multiply(A, B, n):
    C = [[0]*n for _ in range(n)]
    for i in range(n):
        for j in range(n):
            for k in range(n):   # three nested loops
                C[i][j] += A[i][k] * B[k][j]
\`\`\`

#### O(2ⁿ) — Exponential
Each additional input element doubles the work. Common in naive recursion without memoization.
\`\`\`python
def fib(n):
    if n <= 1:
        return n
    return fib(n-1) + fib(n-2)  # two recursive calls → binary tree of depth n → 2ⁿ nodes

def power_set(s):
    result = [[]]
    for elem in s:
        result += [sub + [elem] for sub in result]  # doubles each iteration → 2ⁿ subsets
    return result
\`\`\`

#### O(n!) — Factorial
Generating all permutations. The fastest-growing complexity — \`n=20\` gives 2.4 quintillion operations.
\`\`\`python
def permutations(arr, start=0):
    if start == len(arr) - 1:
        yield arr[:]
        return
    for i in range(start, len(arr)):
        arr[start], arr[i] = arr[i], arr[start]
        yield from permutations(arr, start + 1)
        arr[start], arr[i] = arr[i], arr[start]
# n choices for first, n-1 for second… = n! total permutations
\`\`\`

---

### Rules for Calculating Big O

#### Rule 1: Drop Constants
We care about growth rate, not exact multipliers.
\`\`\`python
# O(2n) → O(n)
def two_passes(arr):
    for x in arr: print(x)   # O(n)
    for x in arr: print(x)   # O(n)
# Two loops = O(2n), but we drop the 2 → O(n)
\`\`\`

#### Rule 2: Drop Non-Dominant Terms
Keep only the fastest-growing term.
\`\`\`python
# O(n² + n) → O(n²)
def example(arr):
    n = len(arr)
    for i in range(n):        # O(n)
        for j in range(n):    # O(n²) total
            pass
    for i in range(n):        # O(n) — dominated, drop it
        pass
\`\`\`

| Before simplification | After |
|----------------------|-------|
| O(n² + n) | O(n²) |
| O(2n + 100) | O(n) |
| O(n + log n) | O(n) |
| O(n! + 2ⁿ) | O(n!) |

#### Rule 3: Different Inputs = Different Variables
If two independent arrays are involved, use separate variables.
\`\`\`python
# NOT O(n²) — it's O(a * b)
def print_pairs(arr_a, arr_b):
    for x in arr_a:         # O(a)
        for y in arr_b:     # O(b)
            print(x, y)
# If a == b == n then yes, O(n²). But they're independent.
\`\`\`

#### Rule 4: Multi-Part Algorithms
- **Sequential steps** → **add**: O(a + b)
- **Nested steps** → **multiply**: O(a * b)
\`\`\`python
# Sequential — ADD
def add_example(arr):
    sort(arr)        # O(n log n)
    find_max(arr)    # O(n)
# Total: O(n log n + n) = O(n log n)

# Nested — MULTIPLY
def multiply_example(arr):
    for x in arr:                  # O(n)
        for y in arr:              # O(n) inside
            process(x, y)
# Total: O(n × n) = O(n²)
\`\`\`

---

### Space Complexity

Space complexity counts the **extra memory** your algorithm allocates, not including the input itself.

\`\`\`python
def reverse_copy(arr):
    result = []                # allocates n new elements → O(n) space
    for x in reversed(arr):
        result.append(x)
    return result

def reverse_in_place(arr):
    left, right = 0, len(arr) - 1
    while left < right:        # only two variables → O(1) space
        arr[left], arr[right] = arr[right], arr[left]
        left += 1
        right -= 1
\`\`\`

**Call stack counts too!** Recursive functions use O(depth) stack space.
\`\`\`python
def factorial(n):
    if n <= 1: return 1
    return n * factorial(n - 1)
# Stack depth = n → O(n) space even though no explicit data structure
\`\`\`

---

### Best, Worst, and Average Case

Big O almost always refers to the **worst case** in interviews, but be precise when asked:

\`\`\`python
def search(arr, target):
    for i, x in enumerate(arr):
        if x == target:
            return i    # ← could return immediately
    return -1
\`\`\`

| Case | Scenario | Complexity |
|------|----------|------------|
| Best | Target is first element | O(1) |
| Average | Target is in the middle on average | O(n/2) = O(n) |
| Worst | Target is last or not found | O(n) |

---

### Amortized Analysis

Some operations are occasionally expensive but cheap on average. The classic example is dynamic array append:
\`\`\`
Most appends: O(1)   — just write to pre-allocated slot
Occasional:   O(n)   — resize (copy all elements to new array)
Amortized:    O(1)   — the cost averages out over many operations
\`\`\`
Python's \`list.append()\` and Java's \`ArrayList.add()\` are both O(1) amortized.

---

### Common Gotchas

**String immutability — concatenation in a loop:**
\`\`\`python
# Looks like O(n) but is actually O(n²) — each += copies the whole string
result = ""
for c in chars:
    result += c

# Fix: use a list and join at the end → O(n)
result = "".join(chars)
\`\`\`

**Recursive Fibonacci without memoization:**
\`\`\`python
fib(n)         # O(2ⁿ) — exponential
fib_memo(n)    # O(n)  — with memoization
fib_dp(n)      # O(n)  — bottom-up DP, O(1) space if you only keep last two
\`\`\`

**Log base doesn't matter:**
\`\`\`
O(log₂ n) = O(log₁₀ n) = O(log n)
# Changing the base only changes by a constant factor, which we drop
\`\`\`

---

### Complexity Quick Reference

| Complexity | Name | n=10 | n=100 | n=1000 | Feasible up to |
|-----------|------|-------|--------|---------|----------------|
| O(1) | Constant | 1 | 1 | 1 | Any |
| O(log n) | Logarithmic | 3 | 7 | 10 | Any |
| O(n) | Linear | 10 | 100 | 1,000 | ~10⁸ |
| O(n log n) | Linearithmic | 33 | 664 | 9,966 | ~10⁶ |
| O(n²) | Quadratic | 100 | 10,000 | 10⁶ | ~10⁴ |
| O(n³) | Cubic | 1,000 | 10⁶ | 10⁹ | ~500 |
| O(2ⁿ) | Exponential | 1,024 | 10³⁰ | ≈∞ | ~20 |
| O(n!) | Factorial | 3.6M | ≈∞ | ≈∞ | ~12 |

---

### Interview Tips

1. **Always state complexity** — unsolicited. "This is O(n) time, O(1) space."
2. **Explain the why** — "O(n log n) because merge sort divides into log n levels and merges O(n) per level."
3. **Consider both time and space** — interviewers will ask if you only give one.
4. **Note the trade-off** — "I could get O(n) time by using O(n) extra space for a hash map."
5. **Simplify before speaking** — O(2n + 5) → say "O(n)".

> Ready to test yourself? Head to the **[Big O Quiz](/big-o)** and work through 30 examples with instant feedback.
    `,
  },
  {
    id: 'hash-tables',
    title: 'Hash Tables',
    icon: '#',
    summary: 'O(1) average insert/lookup. Key building block for most interview problems.',
    content: `
## Hash Tables

A hash table maps **keys to values** using a hash function. Average O(1) insert, delete, and lookup.

### How It Works
1. Hash function converts key → integer index
2. Index into an underlying array (bucket)
3. **Collision resolution**: chaining (linked list at each bucket) or open addressing

### Polynomial Rolling Hash
The classic hash function used for strings:
\`\`\`
hash = hash * 31 + c
\`\`\`
Multiplying by 31 (a prime) before adding each character ensures **order matters** — \`"abc"\` and \`"bac"\` get different hashes. Without the multiply, any anagram would hash to the same value.

### Collision Resolution

**Chaining (Linked Lists per bucket)**
- Worst case O(n) if all keys hash to same bucket
- Can upgrade buckets to BSTs → worst case O(log n), used by Java 8+

**Open Addressing (Linear Probing)**
- All keys stored directly in the array — no chaining
- On collision, check next slots sequentially: i, i+1, i+2... (mod capacity)
- Problem: **clustering** — consecutive filled slots grow, increasing probe time
- Improvements: quadratic probing or double hashing reduce clustering

### Resizing & Load Factor
Hash tables must resize as they fill up:

| Language | Growth factor | Resize threshold (load factor) |
|----------|--------------|-------------------------------|
| Java     | 2×           | 0.75                          |
| Python   | ~1.3–2×      | 0.7–0.8                       |

Resizing wastes some space but keeps average operations O(1).

### BST as Alternative
You can implement a hash map using a **binary search tree** instead of an array:
- Lookup: O(log n) vs O(1) average for array-based
- Benefit: keys are **ordered** → enables range queries and finding neighbours
- Tradeoff: worse lookup, but useful when you need ordered iteration

### Complexity

| Operation | Average | Worst (all collisions) |
|-----------|---------|------------------------|
| Insert    | O(1)    | O(n)                   |
| Delete    | O(1)    | O(n)                   |
| Lookup    | O(1)    | O(n)                   |
| Space     | O(n)    | O(n)                   |

### Python Built-ins

\`\`\`python
# dict — the Python hash table
d = {}
d["key"] = "value"     # insert O(1)
val = d.get("key")     # lookup O(1), None if missing
"key" in d             # membership O(1)
del d["key"]           # delete O(1)

# Counter — frequency map
from collections import Counter
freq = Counter("abracadabra")  # {'a': 5, 'b': 2, ...}

# defaultdict — no KeyError on missing keys
from collections import defaultdict
graph = defaultdict(list)
graph["a"].append("b")
\`\`\`

### Classic Interview Patterns

**Frequency counting**
\`\`\`python
def has_duplicate(arr):
    seen = set()
    for x in arr:
        if x in seen:
            return True
        seen.add(x)
    return False
\`\`\`

**Two Sum**
\`\`\`python
def two_sum(nums, target):
    seen = {}                    # value -> index
    for i, n in enumerate(nums):
        complement = target - n
        if complement in seen:
            return [seen[complement], i]
        seen[n] = i
    return []
\`\`\`

**Group anagrams**
\`\`\`python
from collections import defaultdict

def group_anagrams(words):
    groups = defaultdict(list)
    for w in words:
        key = tuple(sorted(w))   # canonical form
        groups[key].append(w)
    return list(groups.values())
\`\`\`

### Key Interview Tips
- **Reach for a dict or set first** when you need fast lookup
- Always ask: "can I trade O(n) space for O(1) lookup?"
- \`frozenset\` or \`tuple\` can be used as dict keys (immutable/hashable)
- Python \`set\` is a hash table without values — ideal for membership tests
- O(1) average is not guaranteed — pathological inputs can degrade to O(n)
    `,
  },
  {
    id: 'arrays-strings',
    title: 'Arrays & Strings',
    icon: '[]',
    summary: 'Contiguous memory, O(1) index access. Two pointers & sliding window live here.',
    content: `
## Arrays & Strings

Arrays store elements in contiguous memory — O(1) random access, O(n) insert/delete at arbitrary positions.

### Static vs Dynamic Arrays
- **Static**: Fixed size at creation (C arrays)
- **Dynamic** (Python list, Java ArrayList): Resize by doubling when full
  - Append: O(1) **amortized** — occasional O(n) resize is averaged out over all appends

### Complexity

| Operation         | Array  | Dynamic Array (Python list) |
|-------------------|--------|-----------------------------|
| Access by index   | O(1)   | O(1)                        |
| Append            | —      | O(1) amortized              |
| Insert at front   | O(n)   | O(n)                        |
| Delete at index   | O(n)   | O(n)                        |
| Search (unsorted) | O(n)   | O(n)                        |
| Search (sorted)   | O(log n) | O(log n)                  |

### String Immutability in Python
Strings are **immutable** — building with \`+=\` in a loop is O(n²) because each concatenation copies the whole string. Use \`list\` + \`"".join()\`:

\`\`\`python
# Bad — O(n^2): each += creates a new string
result = ""
for c in chars:
    result += c

# Good — O(n): build list, join once at the end
parts = []
for c in chars:
    parts.append(c)
result = "".join(parts)
\`\`\`

### Two Pointer Variations

There are three distinct two-pointer patterns:

**1. Opposite ends — sorted array pair problems**
\`\`\`python
def two_sum_sorted(arr, target):
    left, right = 0, len(arr) - 1
    while left < right:
        s = arr[left] + arr[right]
        if s == target:   return [left, right]
        elif s < target:  left += 1
        else:             right -= 1
    return []
\`\`\`

**2. Different speeds — fast/slow (cycle, middle)**
\`\`\`python
def find_middle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow
\`\`\`

**3. Same direction with offset — string comparison when lengths differ**
\`\`\`python
def is_one_edit_away_insert(shorter, longer):
    i = j = diff = 0
    while i < len(shorter):
        if shorter[i] != longer[j]:
            diff += 1
            if diff > 1: return False
            j += 1        # skip one char in longer
        else:
            i += 1; j += 1
    return True
\`\`\`

### Sliding Window Pattern
\`\`\`python
def max_sum_subarray(arr, k):
    window_sum = sum(arr[:k])
    best = window_sum
    for i in range(k, len(arr)):
        window_sum += arr[i] - arr[i - k]  # slide
        best = max(best, window_sum)
    return best
\`\`\`

### Prefix Sum
\`\`\`python
def subarray_sum(arr, k):
    """Count subarrays summing to k — O(n) with prefix hash."""
    prefix_count = {0: 1}
    total = count = 0
    for x in arr:
        total += x
        count += prefix_count.get(total - k, 0)
        prefix_count[total] = prefix_count.get(total, 0) + 1
    return count
\`\`\`

### In-Place Matrix Rotation
Rotate NxN matrix 90° clockwise **in place** — two approaches:

**Transpose + reverse each row (clean):**
\`\`\`python
def rotate_90_cw(matrix):
    n = len(matrix)
    # Transpose: swap [i][j] with [j][i]
    for i in range(n):
        for j in range(i + 1, n):
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
    # Reverse each row
    for row in matrix:
        row.reverse()
\`\`\`

**Layer-by-layer 4-cycle (classic in-place):**
\`\`\`python
def rotate_layers(matrix):
    n = len(matrix)
    for layer in range(n // 2):
        last = n - layer - 1
        for i in range(layer, last):
            offset = i - layer
            top = matrix[layer][i]
            # left → top
            matrix[layer][i] = matrix[last - offset][layer]
            # bottom → left
            matrix[last - offset][layer] = matrix[last][last - offset]
            # right → bottom
            matrix[last][last - offset] = matrix[i][last]
            # top → right
            matrix[i][last] = top
\`\`\`

**Formula:** \`new_row = old_col\`, \`new_col = size - old_row - 1\`
Time: O(n²), Space: O(1)

### Character Frequency Counting
\`\`\`python
from collections import Counter

# Palindrome permutation check
def is_palindrome_permutation(s):
    freq = Counter(c.lower() for c in s if c != ' ')
    return sum(v % 2 for v in freq.values()) <= 1

# Anagram check
def is_anagram(s, t):
    return Counter(s) == Counter(t)
\`\`\`

### Key Interview Tips
- Off-by-one errors are the #1 bug — always trace boundary conditions on paper
- Consider **sorting first** if order doesn't matter (often unlocks O(n log n))
- Two-pointer technique eliminates a nested loop → O(n²) → O(n)
- For in-place 2D rotation: transpose + reverse-rows is the cleanest approach
    `,
  },
  {
    id: 'linked-lists',
    title: 'Linked Lists',
    icon: '→',
    summary: 'Node chains with O(1) insert/delete. Master fast & slow pointers.',
    content: `
## Linked Lists

Each node holds a value + pointer(s) to next/previous node. No random access — must traverse.

### Why Linked Lists?
- O(1) insert/delete **if you already have a reference to the node** — arrays must shift elements
- Grow and shrink dynamically with no resizing overhead
- Used to implement: **stacks**, **queues**, **hash map buckets**, **LRU caches**

### LRU Cache (classic linked list application)
Combine a **hash map** (O(1) lookup) + **doubly linked list** (O(1) move-to-front):
- Most recently used (MRU) lives at the **head**
- Least recently used (LRU) lives at the **tail** — evicted when cache is full
- On access: O(1) lookup via hash map, then O(1) move node to head via prev/next pointers

### Complexity

| Operation        | Singly  | Doubly  |
|------------------|---------|---------|
| Access by index  | O(n)    | O(n)    |
| Insert at head   | O(1)    | O(1)    |
| Insert at tail   | O(1)*   | O(1)*   |
| Delete (known node) | O(1) | O(1)    |
| Search           | O(n)    | O(n)    |

*With a tail pointer maintained.

### Node Reference vs Value Comparison
\`\`\`python
# Reference comparison — same object in memory (identity)
node_a is node_b       # True only if they ARE the same node

# Value comparison — same data
node_a.value == node_b.value   # True if data matches, even different nodes
\`\`\`
For **intersection** problems, use \`is\` (reference) — two lists intersect when their nodes are the **same object**, not just equal values.

### Python Node Template
\`\`\`python
class Node:
    def __init__(self, val):
        self.val = val
        self.next = None      # singly

class DNode:
    def __init__(self, val):
        self.val = val
        self.next = None      # doubly
        self.prev = None
\`\`\`

### Fast & Slow Pointer (Floyd's Algorithm)
Time: O(n), Space: O(1) — no extra space needed.

\`\`\`python
def has_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            return True
    return False

def find_cycle_start(head):
    slow = fast = head
    # Phase 1: detect meeting point
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            break
    else:
        return None  # no cycle
    # Phase 2: reset slow to head, both advance at speed 1
    slow = head
    while slow is not fast:
        slow = slow.next
        fast = fast.next
    return slow  # cycle start node
\`\`\`

### Reverse a Linked List
\`\`\`python
def reverse(head):
    prev = None
    curr = head
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    return prev   # new head
\`\`\`

### Find Middle Node
\`\`\`python
def find_middle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow  # middle (or right-of-middle for even length)
\`\`\`

### Remove Duplicates (with buffer)
\`\`\`python
def remove_dups(head):
    seen = set()
    prev, curr = None, head
    while curr:
        if curr.val in seen:
            prev.next = curr.next  # skip duplicate
        else:
            seen.add(curr.val)
            prev = curr
        curr = curr.next
\`\`\`

### k-th From End (two-pointer)
\`\`\`python
def kth_from_end(head, k):
    fast = slow = head
    for _ in range(k):        # advance fast k steps
        fast = fast.next
    while fast:               # move both until fast reaches end
        slow = slow.next
        fast = fast.next
    return slow
\`\`\`

### Key Interview Tips
- Always handle **null/empty list** and **single node** as first cases
- Draw pointer reassignments before coding — it's easy to lose a node
- Fast+slow pointer finds: midpoint, cycle start, nth-from-end — all O(n) time O(1) space
- Use a **dummy head node** to simplify edge cases at the front of the list
- For intersection: align lengths first, then walk together until \`node_a is node_b\`
    `,
  },
  {
    id: 'stacks-queues',
    title: 'Stacks & Queues',
    icon: '⊏',
    summary: 'LIFO vs FIFO. Stacks power DFS and expression evaluation.',
    content: `
## Stacks & Queues

**Stack** — Last In, First Out (LIFO). Push/pop from the same end.
**Queue** — First In, First Out (FIFO). Enqueue one end, dequeue the other.

### The Call Stack
Every recursive function call **uses the call stack** implicitly:
- Each call **pushes** the current function state (local variables, return address)
- When the function returns, it **pops** that frame
- Deep or infinite recursion → stack overflow
- This is why iterative solutions with explicit stacks can be more memory-safe

### BFS Uses a Queue
In BFS, when you visit a node you add all its **unvisited neighbours to the end** of the queue. This guarantees level-by-level exploration:
\`\`\`python
from collections import deque

def bfs(graph, start):
    visited = {start}
    q = deque([start])
    while q:
        node = q.popleft()
        for neighbour in graph.get(node, []):
            if neighbour not in visited:
                visited.add(neighbour)
                q.append(neighbour)
\`\`\`

### Python Built-ins
\`\`\`python
# Stack — use list
stack = []
stack.append(x)   # push  O(1)
stack.pop()       # pop   O(1)
stack[-1]         # peek  O(1)

# Queue — ALWAYS use deque (list.pop(0) is O(n)!)
from collections import deque
q = deque()
q.append(x)       # enqueue  O(1)
q.popleft()       # dequeue  O(1)
q[0]              # peek     O(1)
\`\`\`

### Complexity

| Operation | Stack | Queue (deque) |
|-----------|-------|-------|
| Push/Enqueue | O(1) | O(1) |
| Pop/Dequeue  | O(1) | O(1) |
| Peek         | O(1) | O(1) |
| Search       | O(n) | O(n) |

### Min Stack — O(1) min()
Maintain a **parallel min stack** that tracks the current minimum at every level:
\`\`\`python
class MinStack:
    def __init__(self):
        self.stack = []
        self.min_stack = []   # top = current minimum

    def push(self, val):
        self.stack.append(val)
        # Push new min: either val or keep existing min
        current_min = val if not self.min_stack else min(val, self.min_stack[-1])
        self.min_stack.append(current_min)

    def pop(self):
        self.min_stack.pop()
        return self.stack.pop()

    def min(self):
        return self.min_stack[-1]
\`\`\`

The key insight: when pushing, push \`min(val, current_min)\` — not just val. When popping, always pop both stacks together.

### Balanced Parentheses
\`\`\`python
def is_balanced(s):
    stack = []
    pairs = {')': '(', ']': '[', '}': '{'}
    for c in s:
        if c in '([{':
            stack.append(c)
        elif c in ')]}':
            if not stack or stack[-1] != pairs[c]:
                return False
            stack.pop()
    return len(stack) == 0
\`\`\`

### Sort a Stack (using 1 extra stack)
\`\`\`python
def sort_stack(s):
    temp = []
    while s:
        val = s.pop()
        # Move values back from temp that are smaller than val
        while temp and temp[-1] < val:
            s.append(temp.pop())
        temp.append(val)
    return temp  # sorted, smallest on top
\`\`\`
Time: O(n²), Space: O(n).

### Multiple Stacks in One Array
Divide a single array into N equal segments — each segment is a stack:
- Track a \`top[i]\` pointer for each stack
- Handle overflow by resizing the segment or throwing an error
- More complex variant: allow segments to grow dynamically using a linked list of "stack frames"

### Key Interview Tips
- Stack → DFS, expression evaluation, function call simulation, monotonic problems
- Queue → BFS, task scheduling, sliding window maximum
- **Monotonic stack**: keeps elements in monotonic order — powerful for "next greater element"
- Two stacks can simulate a queue (and vice versa) — classic interview question
- \`deque\` supports O(1) at both ends — use it instead of list for queues
    `,
  },
  {
    id: 'trees-bst',
    title: 'Trees & BSTs',
    icon: 'T',
    summary: 'Hierarchical data. DFS (pre/in/post-order) and BFS. BST enables O(log n) search.',
    content: `
## Trees & Binary Search Trees

### Tree Taxonomy

| Type | Definition |
|------|-----------|
| **Binary tree** | Each node has at most 2 children |
| **BST** | Binary tree where left < node < right (strict) |
| **Balanced tree** | Heights of subtrees differ by at most 1 — guarantees O(log n) ops. Examples: AVL tree, Red-Black tree |
| **Complete binary tree** | Every level filled except possibly the last, which fills left-to-right |
| **Full binary tree** | Every node has exactly 0 or 2 children |
| **Perfect binary tree** | Full AND complete — all leaves at same level. Has exactly **2^k − 1** nodes where k = number of levels |

### Tree Properties
- **Height**: Longest path from root to leaf (edges)
- **Depth**: Distance from root to a specific node (edges)
- **Level**: Root is level 0, children are level 1, etc.
- **Diameter**: Longest path between any two nodes (may not pass through root)

### BST Complexity

| Operation | Average (balanced) | Worst (skewed) |
|-----------|--------------------|----------------|
| Search    | O(log n)           | O(n)           |
| Insert    | O(log n)           | O(n)           |
| Delete    | O(log n)           | O(n)           |

### Python Node Template
\`\`\`python
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
\`\`\`

### DFS Traversals
\`\`\`python
def preorder(node):   # current → left → right  (preserves tree structure)
    if not node: return
    print(node.val)
    preorder(node.left)
    preorder(node.right)

def inorder(node):    # left → current → right  (SORTED for BST!)
    if not node: return
    inorder(node.left)
    print(node.val)
    inorder(node.right)

def postorder(node):  # left → right → current  (children before parent)
    if not node: return
    postorder(node.left)
    postorder(node.right)
    print(node.val)
\`\`\`

All traversals can also be done **iteratively** using an explicit stack — avoids Python recursion depth limits on skewed trees.

### BFS (Level-Order)
\`\`\`python
from collections import deque

def level_order(root):
    if not root: return []
    result, q = [], deque([root])
    while q:
        level = []
        for _ in range(len(q)):   # process exactly one level
            node = q.popleft()
            level.append(node.val)
            if node.left:  q.append(node.left)
            if node.right: q.append(node.right)
        result.append(level)
    return result
\`\`\`

### Tree Height & Balance Check
\`\`\`python
def height(node):
    if not node: return 0
    return 1 + max(height(node.left), height(node.right))

def is_balanced(node):
    """O(n) — return -1 if unbalanced, height otherwise."""
    def check(n):
        if not n: return 0
        l = check(n.left)
        r = check(n.right)
        if l == -1 or r == -1 or abs(l - r) > 1:
            return -1
        return 1 + max(l, r)
    return check(node) != -1
\`\`\`

### Validate BST (min/max bounds — the right approach)
Local parent-child checks are **not enough** — a node must satisfy ALL ancestor constraints:
\`\`\`python
def is_valid_bst(root, lo=float('-inf'), hi=float('inf')):
    if not root: return True
    if root.val <= lo or root.val >= hi:
        return False
    return (is_valid_bst(root.left,  lo,       root.val) and
            is_valid_bst(root.right, root.val, hi))
\`\`\`

### Tree Construction: Sorted Array → Minimal BST
Always pick the middle element as root — recursively for each half:
\`\`\`python
def sorted_array_to_bst(arr):
    if not arr: return None
    mid = len(arr) // 2
    node = TreeNode(arr[mid])
    node.left  = sorted_array_to_bst(arr[:mid])
    node.right = sorted_array_to_bst(arr[mid+1:])
    return node
# Time: O(n), Space: O(n) for tree + O(log n) for recursion stack
\`\`\`

You can also reconstruct trees from:
- **Preorder + inorder**: root from preorder, split inorder at root
- **Postorder + inorder**: root from postorder, split inorder at root

### In-Order Successor in BST
Given a node, find the next node in in-order traversal:
\`\`\`python
def inorder_successor(node):
    # Case 1: node has a right subtree
    # → successor is the LEFTMOST node in the right subtree
    if node.right:
        curr = node.right
        while curr.left:
            curr = curr.left
        return curr

    # Case 2: no right subtree
    # → go up parent chain until we come from a LEFT child
    # → that parent is the successor
    child = node
    parent = node.parent
    while parent and child is parent.right:
        child = parent
        parent = parent.parent
    return parent   # None if node is the maximum
# Time: O(h), Space: O(1)
\`\`\`

### Lowest Common Ancestor (LCA)
**With parent pointers:**
1. Get depth of both nodes
2. Move deeper node up until same depth
3. Move both up together until they meet

**Without parent pointers (DFS):**
\`\`\`python
def lca(root, p, q):
    """Returns LCA node if both p and q are in tree."""
    if not root or root is p or root is q:
        return root
    left  = lca(root.left,  p, q)
    right = lca(root.right, p, q)
    if left and right:
        return root   # p in one subtree, q in the other
    return left or right
# Time: O(n), Space: O(h)
\`\`\`

### Subtree Matching
Naive: find T2's root in T1 via BFS, then compare trees simultaneously — O(n × m).

**Better approach (serialize + substring):**
Serialize both trees using preorder with null markers (e.g. \`"4 2 # # 6 # #"\`), then check if T2's serialized form is a **substring** of T1's. Use KMP for O(n + m).

### Binary Heaps

A **min-heap** is a complete binary tree where every parent ≤ its children (root = minimum).
**Max-heap**: every parent ≥ its children (root = maximum).

**Array implementation** (space-efficient):
\`\`\`
Parent at index i → children at 2i+1 and 2i+2
Child at index i  → parent at (i-1)//2
\`\`\`

\`\`\`python
import heapq

# Min-heap in Python
heap = []
heapq.heappush(heap, 3)
heapq.heappush(heap, 1)
heapq.heappush(heap, 2)
heapq.heappop(heap)   # → 1 (minimum)

# Max-heap: negate values
heapq.heappush(heap, -val)
max_val = -heapq.heappop(heap)
\`\`\`

| Operation | Time |
|-----------|------|
| Insert (push) | O(log n) |
| Extract min/max | O(log n) |
| Peek | O(1) |

**Use cases:** Dijkstra's algorithm, merge k sorted lists, find k largest/smallest, event simulation.

### Tries (Prefix Trees)
An N-ary tree where each node represents a character. End of word marked with a \`*\` flag.

\`\`\`python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self): self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for c in word:
            node = node.children.setdefault(c, TrieNode())
        node.is_end = True

    def search(self, word):
        node = self.root
        for c in word:
            if c not in node.children: return False
            node = node.children[c]
        return node.is_end

    def starts_with(self, prefix):
        node = self.root
        for c in prefix:
            if c not in node.children: return False
            node = node.children[c]
        return True
\`\`\`

Lookup is O(k) where k = length of string — similar to a hash map (which still hashes each character).

**Word search / word break:** Build a Trie, run DFS+backtracking from each cell. At each step, check if current path is a valid prefix — **prune early** if not, which drastically reduces search space.

### Key Interview Tips
- **Inorder traversal of a BST produces a sorted sequence** — use this for validation, k-th smallest, etc.
- Pre/post order **preserve tree structure** — useful for serialisation
- Recursive solutions are natural; switch to iterative on skewed trees to avoid stack overflow
- BST deletion: leaf → remove directly; one child → replace; two children → swap with in-order successor then delete successor
- For "find k-th smallest in BST": inorder traversal + counter
    `,
  },
  {
    id: 'graphs',
    title: 'Graphs',
    icon: 'G',
    summary: 'Nodes + edges. BFS for shortest path, DFS for connectivity. Topological sort for dependencies.',
    content: `
## Graphs

A graph is a set of **nodes (vertices)** and **edges**. A tree is a special graph — connected and acyclic. Not all graphs are trees.

### Graph Types
- **Directed**: edges have direction (one-way streets)
- **Undirected**: edges are bidirectional
- **Connected graph**: path exists between every pair of vertices
- **Acyclic**: no cycles (a DAG is a Directed Acyclic Graph)
- **Weighted**: edges have numeric weights

### Representations

**Adjacency List** — most common for interviews
\`\`\`python
graph = {
    'A': ['B', 'C'],
    'B': ['D'],
    'C': ['D', 'E'],
}
\`\`\`
- Space: O(V + E) — good for sparse graphs
- In undirected graphs, store each edge twice: A→B and B→A
- Iterating neighbours: O(degree of node)

**Adjacency Matrix** — NxN boolean (or weight) matrix
\`\`\`python
# matrix[i][j] = True means edge from i to j
\`\`\`
- Space: O(V²) — good for **dense graphs**
- Fast edge existence check: O(1) via \`matrix[A][B]\`
- Undirected graph matrix is **symmetric**
- Downside: iterating neighbours requires scanning all N columns

| | Adjacency List | Adjacency Matrix |
|--|--|--|
| Space | O(V + E) | O(V²) |
| Edge lookup | O(degree) | O(1) |
| Best for | Sparse graphs | Dense graphs |

### BFS — Shortest Path (unweighted)
\`\`\`python
from collections import deque

def bfs(graph, start, end):
    if start == end: return True
    visited = {start}
    q = deque([start])
    while q:
        node = q.popleft()
        if node == end: return True
        for neighbour in graph.get(node, []):
            if neighbour not in visited:
                visited.add(neighbour)
                q.append(neighbour)
    return False
\`\`\`
BFS is preferred when you need **shortest path** (unweighted). Track parent pointers to reconstruct the path.

### DFS — Connected Components
\`\`\`python
def dfs(graph, node, visited):
    visited.add(node)
    for neighbour in graph.get(node, []):
        if neighbour not in visited:
            dfs(graph, neighbour, visited)

def count_components(graph):
    visited = set()
    count = 0
    for node in graph:
        if node not in visited:
            dfs(graph, node, visited)
            count += 1
    return count
\`\`\`
DFS is preferred when you want to **visit every node** or explore all paths.

### Bidirectional BFS
Run simultaneous BFS from both source and target. Stop when the two frontiers collide.

**Why it's faster:** Instead of exploring to depth d (O(kᵈ) nodes), each side only goes to depth d/2 — total O(kᵈ/²) nodes. Huge win on large graphs.

### Topological Sort (Kahn's Algorithm)
Only works on **DAGs** (directed acyclic graphs). Key insight: *find the tasks with nothing blocking them, do those first.*

\`\`\`python
from collections import deque

def topo_sort(nodes, dependencies):
    graph = {n: [] for n in nodes}
    in_degree = {n: 0 for n in nodes}
    for before, after in dependencies:
        graph[before].append(after)
        in_degree[after] += 1

    # Start with all nodes that have no prerequisites
    q = deque([n for n in nodes if in_degree[n] == 0])
    order = []
    while q:
        node = q.popleft()
        order.append(node)
        for neighbour in graph[node]:
            in_degree[neighbour] -= 1
            if in_degree[neighbour] == 0:
                q.append(neighbour)

    return order if len(order) == len(nodes) else None  # None = cycle
# Time: O(V + E)
\`\`\`

**Use cases:** build order, course prerequisites, task scheduling, CI/CD pipeline ordering.

### Cycle Detection

**Directed graph — DFS with 3 colors:**
\`\`\`python
def has_cycle_directed(graph):
    WHITE, GRAY, BLACK = 0, 1, 2
    color = {n: WHITE for n in graph}

    def dfs(node):
        color[node] = GRAY         # mark as in-progress
        for nb in graph.get(node, []):
            if color[nb] == GRAY: return True   # back edge = cycle
            if color[nb] == WHITE and dfs(nb): return True
        color[node] = BLACK        # fully processed
        return False

    return any(color[n] == WHITE and dfs(n) for n in graph)
\`\`\`

**Undirected graph:** DFS but track the parent — don't flag the edge back to parent as a cycle.

**Alternative:** Topological sort — if result length < node count, there's a cycle.

### Shortest Path Algorithms

| Algorithm | Handles | Time | Use when |
|-----------|---------|------|----------|
| **BFS** | Unweighted | O(V + E) | Equal-weight edges |
| **Dijkstra** | Non-negative weights | O((V+E) log V) | Standard weighted graph |
| **Bellman-Ford** | Negative weights | O(VE) | Negative edges, detect negative cycles |
| **Floyd-Warshall** | All pairs | O(V³) | Small graphs, all-pairs needed |

\`\`\`python
import heapq

def dijkstra(graph, start):
    """graph[node] = [(neighbor, weight), ...]"""
    dist = {node: float('inf') for node in graph}
    dist[start] = 0
    heap = [(0, start)]
    while heap:
        d, node = heapq.heappop(heap)
        if d > dist[node]: continue
        for neighbour, weight in graph.get(node, []):
            new_dist = dist[node] + weight
            if new_dist < dist[neighbour]:
                dist[neighbour] = new_dist
                heapq.heappush(heap, (new_dist, neighbour))
    return dist
\`\`\`

### Union-Find (Disjoint Set Union)
Tracks connected components efficiently. Operations: **Find** (with path compression) + **Union** (by rank).

\`\`\`python
class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])  # path compression
        return self.parent[x]

    def union(self, x, y):
        rx, ry = self.find(x), self.find(y)
        if rx == ry: return False   # already same component
        if self.rank[rx] < self.rank[ry]: rx, ry = ry, rx
        self.parent[ry] = rx
        if self.rank[rx] == self.rank[ry]: self.rank[rx] += 1
        return True
\`\`\`
Amortized O(α(n)) per operation — effectively constant. Used in: Kruskal's MST, cycle detection, connected components.

### Minimum Spanning Tree (MST)

**Kruskal's:** Sort edges by weight, add edge if it doesn't create a cycle (use Union-Find). Time: O(E log E).

**Prim's:** Start from any node, greedily add the minimum-weight edge connecting a new node. Time: O(E log V) with a heap.

### Key Interview Tips
- Always track **visited** to avoid infinite loops
- BFS → shortest path (unweighted); Dijkstra → weighted non-negative
- Topological sort only works on DAGs — check for cycles
- "Islands" grid problems: treat the 2D grid as an implicit graph, BFS/DFS from unvisited cells
- For cycle detection in undirected graphs, track parent to avoid false positives
    `,
  },
  {
    id: 'recursion-dp',
    title: 'Recursion & DP',
    icon: 'f()',
    summary: 'Divide and conquer. Memoize overlapping subproblems. Tabulate bottom-up.',
    content: `
## Recursion & Dynamic Programming

**Recursion** breaks a problem into smaller sub-problems.
**DP** = recursion + memoization (top-down) or tabulation (bottom-up) to avoid redundant work.

**When to use DP:** overlapping subproblems + optimal substructure.

### Recursion Template
\`\`\`python
def solve(n):
    # 1. Base case(s) — must exist to terminate
    if n == 0:
        return 1
    # 2. Recursive case — smaller sub-problem
    return n * solve(n - 1)
\`\`\`

### Top-Down DP (Memoization)
Without memo, triple step is **O(3ⁿ)**. With memo it's **O(n)**.

\`\`\`python
# Option 1: lru_cache decorator (cleanest)
from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n):
    if n <= 1: return n
    return fib(n-1) + fib(n-2)

# Option 2: manual memo dict
def fib(n, memo={}):
    if n <= 1: return n
    if n in memo: return memo[n]
    memo[n] = fib(n-1, memo) + fib(n-2, memo)
    return memo[n]
\`\`\`

### Bottom-Up DP (Tabulation)
\`\`\`python
def fib(n):
    if n <= 1: return n
    dp = [0] * (n + 1)
    dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[n]

# Space-optimised: only need last 2 values
def fib_opt(n):
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a
\`\`\`

### Triple Step (Stair Climbing)
\`\`\`python
@lru_cache(maxsize=None)
def count_ways(n):
    if n < 0: return 0
    if n == 0: return 1       # one way to stand at bottom: do nothing
    return count_ways(n-1) + count_ways(n-2) + count_ways(n-3)
\`\`\`

### Coin Change (number of ways)
Key insight: process each coin in an outer loop to avoid counting permutations as distinct combinations.
\`\`\`python
def coin_change_ways(amount, coins):
    dp = [0] * (amount + 1)
    dp[0] = 1                      # one way to make 0: use no coins
    for coin in coins:
        for amt in range(coin, amount + 1):
            dp[amt] += dp[amt - coin]
    return dp[amount]
\`\`\`

### 0/1 Knapsack
\`\`\`python
def knapsack(weights, values, capacity):
    n = len(weights)
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]
    for i in range(1, n + 1):
        for w in range(capacity + 1):
            dp[i][w] = dp[i-1][w]           # skip item i
            if weights[i-1] <= w:
                dp[i][w] = max(dp[i][w],
                               dp[i-1][w - weights[i-1]] + values[i-1])
    return dp[n][capacity]
\`\`\`

### Powerset Generation (Backtracking)
Generate all 2ⁿ subsets:
\`\`\`python
def powerset(nums):
    result = [[]]
    for n in nums:
        result += [subset + [n] for subset in result]
    return result
# Time: O(2^n), Space: O(2^n)
\`\`\`

### Permutation Generation
\`\`\`python
def permutations(s):
    if len(s) == 0: return [""]
    result = []
    for i, char in enumerate(s):
        rest = s[:i] + s[i+1:]
        for perm in permutations(rest):
            result.append(char + perm)
    return result
# Time: O(n!), Space: O(n!)
\`\`\`

### Backtracking Template
Build solution incrementally, backtrack when a constraint is violated:
\`\`\`python
def backtrack(candidate, result, ...):
    if is_complete(candidate):
        result.append(candidate[:])   # save a copy
        return
    for next_choice in generate_choices(candidate):
        if is_valid(next_choice):
            candidate.append(next_choice)    # make move
            backtrack(candidate, result, ...)
            candidate.pop()                  # undo move (backtrack)
\`\`\`
**Common problems:** N-Queens, Sudoku solver, permutations, combinations, word search.

### Recursive Multiplication (no * operator)
\`\`\`python
def multiply(a, b):
    """Multiply using bit shifts and addition."""
    if b == 0: return 0
    if b == 1: return a
    half = multiply(a, b >> 1)   # b // 2 via right shift
    if b % 2 == 0:
        return half + half
    else:
        return half + half + a   # odd: add one more a
# x * 2 = x << 1 (left shift)
\`\`\`

### DP Pattern Summary

| Pattern | Example problems |
|---------|-----------------|
| **1D DP** | Fibonacci, climbing stairs, house robber |
| **2D DP** | Longest common subsequence, edit distance, unique paths |
| **Knapsack** | Subset sum, coin change, partition equal subsets |
| **Interval DP** | Matrix chain multiplication, burst balloons |

### Key Interview Tips
- Always identify the **recurrence relation** before writing code
- Draw the recursion tree — overlapping sub-trees = use DP
- Top-down is easier to write; bottom-up is more space-efficient
- **State definition** is everything in DP — what does dp[i] represent?
- For backtracking: always undo your move after recursing
    `,
  },
  {
    id: 'sorting-searching',
    title: 'Sorting & Searching',
    icon: '↕',
    summary: 'Know O(n log n) sorts cold. Binary search pattern — not just for sorted arrays.',
    content: `
## Sorting & Searching

### Sorting Complexity

| Algorithm      | Best      | Average   | Worst     | Space  | Stable | Use when |
|----------------|-----------|-----------|-----------|--------|--------|----------|
| Merge Sort     | O(n log n)| O(n log n)| O(n log n)| O(n)   | Yes    | Need stable sort or worst-case guarantee |
| Quick Sort     | O(n log n)| O(n log n)| O(n²)     | O(log n)| No    | General purpose, good average |
| Heap Sort      | O(n log n)| O(n log n)| O(n log n)| O(1)   | No     | In-place with guaranteed O(n log n) |
| Tim Sort (Python) | O(n)  | O(n log n)| O(n log n)| O(n)   | Yes    | Python's built-in — best for real data |
| Counting Sort  | O(n+k)    | O(n+k)    | O(n+k)    | O(k)   | Yes    | Small integer range |
| Radix Sort     | O(d(n+k)) | O(d(n+k)) | O(d(n+k)) | O(n+k) | Yes    | Fixed-width integers/strings |

**Non-comparison sorts** (Counting, Radix) break the O(n log n) lower bound — they only work on specific data types.

### Python Sort
\`\`\`python
arr.sort()                      # in-place, Timsort O(n log n), stable
sorted_arr = sorted(arr)        # returns new list
arr.sort(key=lambda x: x[1])   # sort by second element
arr.sort(key=lambda x: -x)     # descending (negate for numbers)
arr.sort(reverse=True)          # descending
\`\`\`

### Merge Sort
\`\`\`python
def merge_sort(arr):
    if len(arr) <= 1: return arr
    mid = len(arr) // 2
    left  = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result, i, j = [], 0, 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i]); i += 1
        else:
            result.append(right[j]); j += 1
    return result + left[i:] + right[j:]
\`\`\`

### Quick Sort
\`\`\`python
def quicksort(arr, lo, hi):
    if lo < hi:
        p = partition(arr, lo, hi)
        quicksort(arr, lo, p - 1)
        quicksort(arr, p + 1, hi)

def partition(arr, lo, hi):
    pivot = arr[hi]
    i = lo - 1
    for j in range(lo, hi):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i+1], arr[hi] = arr[hi], arr[i+1]
    return i + 1
\`\`\`

### Binary Search
\`\`\`python
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:   return mid
        elif arr[mid] < target:  left = mid + 1
        else:                    right = mid - 1
    return -1

# Find leftmost occurrence (lower bound)
def lower_bound(arr, target):
    left, right = 0, len(arr)
    while left < right:
        mid = (left + right) // 2
        if arr[mid] < target: left = mid + 1
        else:                 right = mid
    return left
\`\`\`

**Magic index insight:** In a sorted array of distinct integers, \`arr[mid] < mid\` means the magic index must be to the **right** (values are too small on the left); \`arr[mid] > mid\` means search the left.

### Binary Search on the Answer
\`\`\`python
# Template: "find minimum X such that condition(X) is True"
# Works when the answer space is monotonic (False, False, ..., True, True, ...)
def binary_search_answer(lo, hi, condition):
    while lo < hi:
        mid = (lo + hi) // 2
        if condition(mid): hi = mid   # might be answer, search left
        else:              lo = mid + 1
    return lo
\`\`\`

**Example uses:** minimum days to complete, koko eating bananas, allocate minimum pages.

### Quick Select — k-th Smallest in O(n) Average
\`\`\`python
import random

def quick_select(arr, k):
    """Find the k-th smallest element (1-indexed). Average O(n)."""
    lo, hi = 0, len(arr) - 1
    while lo < hi:
        pivot_idx = random.randint(lo, hi)
        arr[pivot_idx], arr[hi] = arr[hi], arr[pivot_idx]
        pivot = arr[hi]
        i = lo - 1
        for j in range(lo, hi):
            if arr[j] <= pivot:
                i += 1; arr[i], arr[j] = arr[j], arr[i]
        i += 1
        arr[i], arr[hi] = arr[hi], arr[i]
        if i == k - 1:   return arr[i]
        elif i < k - 1:  lo = i + 1
        else:            hi = i - 1
    return arr[lo]
\`\`\`

### Key Interview Tips
- Python's \`sort()\` is Timsort — stable, O(n log n), and very fast on partially-sorted data
- Binary search works on any **monotonic** condition, not just sorted arrays
- "Find the minimum/maximum value that satisfies X" → binary search on the answer
- Use \`bisect\` module for pre-sorted arrays: \`bisect_left\`, \`bisect_right\` — no need to roll your own
- Quick sort has O(n²) worst case — use median-of-3 pivot or shuffle input to avoid it
    `,
  },
  {
    id: 'bit-manipulation',
    title: 'Bit Manipulation',
    icon: '01',
    summary: 'XOR, AND, OR, shifts. Fast and elegant for specific problems.',
    content: `
## Bit Manipulation

Bitwise operations work directly on binary representations. Fast, constant-space tricks.

### Operators

| Operator | Symbol | Example |
|----------|--------|---------|
| AND      | \`&\`  | \`5 & 3 = 1\`  (101 & 011 = 001) |
| OR       | \`|\`  | \`5 | 3 = 7\`  (101 \| 011 = 111) |
| XOR      | \`^\`  | \`5 ^ 3 = 6\`  (101 ^ 011 = 110) |
| NOT      | \`~\`  | \`~5 = -6\` |
| Left shift  | \`<<\` | \`2 << 3 = 16\` (multiply by 2³) |
| Right shift | \`>>\` | \`16 >> 2 = 4\` (divide by 2²) |

Left shift × 1 bit = multiply by 2. Right shift × 1 bit = integer divide by 2.

### Core Bit Operations
\`\`\`python
# Get bit i
(n >> i) & 1          # 1 if bit i is set, 0 otherwise

# Set bit i
n | (1 << i)

# Clear bit i
n & ~(1 << i)

# Toggle bit i
n ^ (1 << i)

# Clear the LOWEST set bit (Brian Kernighan trick)
n & (n - 1)

# Isolate the lowest set bit
n & (-n)
\`\`\`

### Common Tricks
\`\`\`python
# Check if power of 2 (exactly one bit set)
n > 0 and (n & (n - 1)) == 0

# Count set bits (Brian Kernighan's algorithm)
count = 0
while n:
    n &= (n - 1)    # clears the lowest set bit each iteration
    count += 1

# Simpler (Python-specific)
bin(n).count('1')

# XOR trick: find the ONE unique element (all others appear twice)
def find_unique(arr):
    result = 0
    for x in arr:
        result ^= x
    return result     # a ^ a = 0, so duplicates cancel out

# Swap without temp variable
a ^= b
b ^= a
a ^= b

# Recursive multiplication with bit shifts
def multiply(a, b):
    if b == 0: return 0
    half = multiply(a, b >> 1)      # b // 2
    return half + half if b % 2 == 0 else half + half + a
\`\`\`

### Two's Complement
Negative numbers in binary: flip all bits, then add 1.
- \`-1\` = all 1s (\`...11111111\`)
- \`-n = ~n + 1\`
- In Python, integers are arbitrary precision — no overflow risk

### XOR Properties (memorise these)
\`\`\`
a ^ 0 = a          # XOR with 0 is identity
a ^ a = 0          # XOR with self is 0
a ^ b = b ^ a      # commutative
(a ^ b) ^ c = a ^ (b ^ c)   # associative
\`\`\`
XOR is its own inverse — \`(a ^ b) ^ b = a\`.

### Subset Enumeration with Bitmasks
\`\`\`python
def all_subsets(arr):
    n = len(arr)
    for mask in range(1 << n):      # 0 to 2^n - 1
        subset = [arr[i] for i in range(n) if mask & (1 << i)]
        print(subset)
# Time: O(2^n × n), useful for small n (≤ 20)
\`\`\`

### Key Interview Tips
- XOR is your tool for finding a unique/missing element when all others appear in pairs
- Left/right shift is cleaner than writing \`* 2\` or \`// 2\` in bit-manipulation contexts
- \`n & (n-1)\` clearing the lowest set bit is useful for counting set bits and power-of-2 checks
- In Python, \`~n\` gives \`-(n+1)\` due to two's complement — use with care
    `,
  },
  {
    id: 'interview-patterns',
    title: 'Interview Patterns',
    icon: '⚡',
    summary: 'Two pointers, sliding window, fast/slow, merge intervals. Pattern recognition wins interviews.',
    content: `
## Interview Patterns

Recognizing the right pattern is more important than memorizing solutions.

---

### 1. Two Pointers
**When:** Sorted array, find pair with target sum, palindrome check, container with most water.

\`\`\`python
def two_sum_sorted(arr, target):
    left, right = 0, len(arr) - 1
    while left < right:
        s = arr[left] + arr[right]
        if s == target:   return [left, right]
        elif s < target:  left += 1
        else:             right -= 1
    return []
\`\`\`
Time: O(n), Space: O(1).

---

### 2. Sliding Window
**When:** Subarray/substring with constraint (max sum, longest with k distinct chars, etc.)

\`\`\`python
def longest_substring_k_distinct(s, k):
    freq = {}
    left = best = 0
    for right, c in enumerate(s):
        freq[c] = freq.get(c, 0) + 1
        while len(freq) > k:
            freq[s[left]] -= 1
            if freq[s[left]] == 0:
                del freq[s[left]]
            left += 1
        best = max(best, right - left + 1)
    return best
\`\`\`

---

### 3. Fast & Slow Pointers
**When:** Cycle detection, find middle of linked list, nth from end.

\`\`\`python
def find_middle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow
\`\`\`

---

### 4. Merge Intervals
**When:** Overlapping intervals, meeting rooms, merge calendar events.

\`\`\`python
def merge_intervals(intervals):
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]
    for start, end in intervals[1:]:
        if start <= merged[-1][1]:
            merged[-1][1] = max(merged[-1][1], end)
        else:
            merged.append([start, end])
    return merged
\`\`\`

---

### 5. Binary Search on Answer
**When:** "Find minimum X such that condition holds" — answer space is monotonic (False...True or True...False).

\`\`\`python
def min_days_to_bloom(bloomDay, m, k):
    def can_bloom(day):
        blooms = flowers = 0
        for d in bloomDay:
            if d <= day:
                flowers += 1
                if flowers == k:
                    blooms += 1; flowers = 0
            else:
                flowers = 0
        return blooms >= m

    lo, hi = min(bloomDay), max(bloomDay)
    while lo < hi:
        mid = (lo + hi) // 2
        if can_bloom(mid): hi = mid
        else:              lo = mid + 1
    return lo
\`\`\`

---

### 6. Monotonic Stack
**When:** Next greater element, largest rectangle in histogram, daily temperatures.

\`\`\`python
def next_greater(nums):
    result = [-1] * len(nums)
    stack = []  # indices of elements waiting for their "next greater"
    for i, n in enumerate(nums):
        while stack and nums[stack[-1]] < n:
            result[stack.pop()] = n   # n is the answer for stack[-1]
        stack.append(i)
    return result
\`\`\`

---

### 7. Greedy Algorithms
Make the locally optimal choice at each step — works when problems have **greedy choice property** + **optimal substructure**.

\`\`\`python
# Activity selection: maximize non-overlapping intervals
def max_activities(intervals):
    # Sort by end time — earliest finish first
    intervals.sort(key=lambda x: x[1])
    count = 0
    last_end = float('-inf')
    for start, end in intervals:
        if start >= last_end:
            count += 1
            last_end = end
    return count
\`\`\`

**Other greedy problems:** fractional knapsack, Huffman coding, minimum spanning tree (Prim's/Kruskal's), jump game.

---

### 8. Backtracking
**When:** Generate all solutions, combinations, permutations, N-Queens, Sudoku.

\`\`\`python
def backtrack(candidate, result):
    if is_complete(candidate):
        result.append(candidate[:])
        return
    for choice in generate_choices(candidate):
        if is_valid(choice):
            candidate.append(choice)        # make move
            backtrack(candidate, result)
            candidate.pop()                 # undo (backtrack)
\`\`\`

---

### 9. Divide and Conquer
Break into sub-problems, solve recursively, combine. Classic examples: merge sort, quick sort, binary search, closest pair of points.

---

### Iterative vs Recursive

| | Recursive | Iterative |
|--|--|--|
| Code clarity | Often cleaner | More boilerplate |
| Stack overflow | Risk on deep/skewed input | Explicit stack, safe |
| Preferred for | Trees (natural structure) | Large graphs, skewed trees |

---

### Edge Cases Checklist
Before submitting any solution, verify these:
- Empty input (null, empty string, empty array)
- Single element
- All same elements
- Already sorted / reverse sorted
- Cycles in graphs or linked lists
- Disconnected graphs
- Skewed trees (worst case for BST ops)
- Integer overflow (less relevant in Python)

---

### Complexity Quick Reference

| Complexity | Name | Example |
|-----------|------|---------|
| O(1)      | Constant | Hash map lookup |
| O(log n)  | Logarithmic | Binary search, heap ops |
| O(n)      | Linear | Single pass |
| O(n log n)| Linearithmic | Sorting, divide & conquer |
| O(n²)     | Quadratic | Nested loops |
| O(2ⁿ)     | Exponential | Recursion without memo |
| O(n!)     | Factorial | Permutations |

---

### Pattern Recognition Cheat Sheet

| Signal in problem | Try |
|-------------------|-----|
| Sorted array, pair sum | Two pointers |
| Subarray/substring constraint | Sliding window |
| Linked list cycle | Fast & slow |
| Overlapping intervals | Sort + merge |
| Min/max feasibility | Binary search on answer |
| Next greater/smaller | Monotonic stack |
| Make locally optimal choices | Greedy |
| All combinations/paths | DFS + backtracking |
| Dependencies/ordering | Topological sort |
| Shortest path (unweighted) | BFS |
| Shortest path (weighted) | Dijkstra |
| Connected components / cycles | Union-Find |
| Repeated sub-problems | DP (top-down or bottom-up) |
    `,
  },
];
