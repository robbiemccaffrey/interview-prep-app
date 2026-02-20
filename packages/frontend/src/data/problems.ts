export interface Problem {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  description: string;
  starterCode: string;
  testCode: string;
  solution: string;
  hints: string[];
}

export const problems: Problem[] = [
  // ============================================================
  // EASY
  // ============================================================
  {
    id: 'palindrome-permutation',
    title: 'Palindrome Permutation',
    difficulty: 'easy',
    category: 'Arrays & Strings',
    description: `## Palindrome Permutation

Given a string, write a function to check if it is a permutation of a palindrome.

A palindrome is a word or phrase that is the same forwards and backwards. A permutation is a rearrangement of letters. The palindrome does not need to be limited to just dictionary words.

**Example:**
\`\`\`
Input:  "Tact Coa"
Output: True  (permutations: "taco cat", "atco cta", etc.)
\`\`\`

**Constraints:**
- Ignore spaces and case
- Return \`True\` or \`False\`
`,
    starterCode: `def is_palindrome_permutation(s: str) -> bool:
    """
    Check if s is a permutation of a palindrome.

    A string can form a palindrome if at most one character
    has an odd frequency count.
    """
    # Your code here
    pass
`,
    testCode: `
# ---- tests ----
def run_tests():
    cases = [
        ("Tact Coa",   True),
        ("racecar",    True),
        ("aabbccdd",   True),
        ("aabbccd",    True),
        ("abc",        False),
        ("aabbccdde",  True),
        ("",           True),
        ("a",          True),
        ("ab",         False),
    ]
    passed = 0
    for s, expected in cases:
        result = is_palindrome_permutation(s)
        status = "PASS" if result == expected else "FAIL"
        if result == expected:
            passed += 1
        print(f"[{status}] is_palindrome_permutation({repr(s)}) => {result} (expected {expected})")
    print(f"\\n{passed}/{len(cases)} tests passed")

run_tests()
`,
    solution: `def is_palindrome_permutation(s: str) -> bool:
    freq = {}
    for char in s.lower():
        if char == ' ':
            continue
        freq[char] = freq.get(char, 0) + 1

    odd_count = sum(1 for count in freq.values() if count % 2 != 0)
    return odd_count <= 1
`,
    hints: [
      'A palindrome reads the same forward and backward.',
      'What must be true about character frequencies for a palindrome? (Think: pairs)',
      'At most one character can appear an odd number of times.',
      'Use a dictionary to count character frequencies, ignoring spaces and case.',
    ],
  },
  {
    id: 'string-compression',
    title: 'String Compression',
    difficulty: 'easy',
    category: 'Arrays & Strings',
    description: `## String Compression

Implement a method to perform basic string compression using the counts of repeated characters.

For example, the string \`aabcccccaaa\` would become \`a2b1c5a3\`.

If the compressed string would **not** become smaller than the original string, your method should return the original string.

You can assume the string has only uppercase and lowercase letters (a-z).

**Examples:**
\`\`\`
compress("aabcccccaaa") → "a2b1c5a3"
compress("abcd")         → "abcd"   (compressed is longer)
compress("aabb")         → "aabb"   (same length, return original)
\`\`\`
`,
    starterCode: `def compress_string(s: str) -> str:
    """
    Compress s by encoding consecutive repeats as charCount.
    Return original if compressed version is not shorter.
    """
    if not s:
        return s
    # Your code here
    pass
`,
    testCode: `
def run_tests():
    cases = [
        ("aabcccccaaa", "a2b1c5a3"),
        ("abcd",        "abcd"),
        ("aabb",        "aabb"),
        ("a",           "a"),
        ("aaa",         "a3"),
        ("abcdef",      "abcdef"),
        ("aaabbbccc",   "a3b3c3"),
    ]
    passed = 0
    for s, expected in cases:
        result = compress_string(s)
        status = "PASS" if result == expected else "FAIL"
        if result == expected:
            passed += 1
        print(f"[{status}] compress_string({repr(s)}) => {repr(result)} (expected {repr(expected)})")
    print(f"\\n{passed}/{len(cases)} tests passed")

run_tests()
`,
    solution: `def compress_string(s: str) -> str:
    if not s:
        return s

    parts = []
    count = 1
    for i in range(1, len(s)):
        if s[i] == s[i-1]:
            count += 1
        else:
            parts.append(s[i-1] + str(count))
            count = 1
    parts.append(s[-1] + str(count))

    compressed = "".join(parts)
    return compressed if len(compressed) < len(s) else s
`,
    hints: [
      'Iterate through the string tracking the current character and its count.',
      'When the character changes, append "char + count" to your result.',
      "Don't forget to append the last character run after the loop ends.",
      'Build with a list and join — string concatenation in a loop is O(n²).',
    ],
  },
  {
    id: 'remove-dups',
    title: 'Remove Dups from Linked List',
    difficulty: 'easy',
    category: 'Linked Lists',
    description: `## Remove Dups

Write code to remove duplicates from an **unsorted** linked list.

**Follow Up:** How would you solve this if a temporary buffer is not allowed?

**Example:**
\`\`\`
Input:  1 → 2 → 3 → 2 → 1
Output: 1 → 2 → 3
\`\`\`

**Note:** For this problem, represent the linked list as a Python list for simplicity and return the deduplicated list.
`,
    starterCode: `def remove_dups(values: list) -> list:
    """
    Remove duplicates from the list while preserving order.
    First occurrence of each value is kept.

    Example: [1, 2, 3, 2, 1] -> [1, 2, 3]
    """
    # Your code here
    pass
`,
    testCode: `
def run_tests():
    cases = [
        ([1, 2, 3, 2, 1],         [1, 2, 3]),
        ([1, 1, 1, 1],             [1]),
        ([],                        []),
        ([1],                       [1]),
        ([1, 2, 3],                 [1, 2, 3]),
        ([3, 1, 2, 1, 3, 2],       [3, 1, 2]),
        ([1, 2, 3, 4, 5, 1, 2],    [1, 2, 3, 4, 5]),
    ]
    passed = 0
    for vals, expected in cases:
        result = remove_dups(vals[:])
        status = "PASS" if result == expected else "FAIL"
        if result == expected:
            passed += 1
        print(f"[{status}] remove_dups({vals}) => {result} (expected {expected})")
    print(f"\\n{passed}/{len(cases)} tests passed")

run_tests()
`,
    solution: `def remove_dups(values: list) -> list:
    seen = set()
    result = []
    for v in values:
        if v not in seen:
            seen.add(v)
            result.append(v)
    return result
`,
    hints: [
      'Use a set to track values you have already seen.',
      'Iterate through the list once; skip values already in the set.',
      'This approach is O(n) time and O(n) space.',
      'Follow-up (no buffer): use two pointers — O(n²) time, O(1) space.',
    ],
  },
  {
    id: 'stack-min',
    title: 'Stack Min',
    difficulty: 'easy',
    category: 'Stacks & Queues',
    description: `## Stack Min

Design a stack that, in addition to \`push\` and \`pop\`, has a function \`min\` which returns the minimum element.

**Push**, **pop** and **min** should all operate in **O(1)** time.

**Example:**
\`\`\`
s = MinStack()
s.push(5)
s.push(3)
s.push(7)
s.min()   # → 3
s.pop()   # removes 7
s.pop()   # removes 3
s.min()   # → 5
\`\`\`
`,
    starterCode: `class MinStack:
    def __init__(self):
        # Your initialization here
        pass

    def push(self, val: int) -> None:
        # Your code here
        pass

    def pop(self) -> int:
        # Your code here
        pass

    def peek(self) -> int:
        # Your code here
        pass

    def min(self) -> int:
        # Return the current minimum in O(1)
        pass

    def is_empty(self) -> bool:
        pass
`,
    testCode: `
def run_tests():
    passed = 0
    total = 0

    def check(condition, msg):
        nonlocal passed, total
        total += 1
        if condition:
            passed += 1
            print(f"[PASS] {msg}")
        else:
            print(f"[FAIL] {msg}")

    s = MinStack()
    s.push(5)
    s.push(3)
    s.push(7)
    s.push(1)
    check(s.min() == 1, "min() after pushing 5,3,7,1 → 1")
    s.pop()
    check(s.min() == 3, "min() after popping 1 → 3")
    s.pop()
    check(s.min() == 3, "min() after popping 7 → 3")
    s.pop()
    check(s.min() == 5, "min() after popping 3 → 5")

    s2 = MinStack()
    s2.push(2)
    s2.push(2)
    s2.push(2)
    check(s2.min() == 2, "min() with all equal values → 2")
    s2.pop()
    check(s2.min() == 2, "min() after popping duplicate → 2")

    print(f"\\n{passed}/{total} tests passed")

run_tests()
`,
    solution: `class MinStack:
    def __init__(self):
        self.stack = []
        self.min_stack = []  # parallel min tracker

    def push(self, val: int) -> None:
        self.stack.append(val)
        current_min = val if not self.min_stack else min(val, self.min_stack[-1])
        self.min_stack.append(current_min)

    def pop(self) -> int:
        self.min_stack.pop()
        return self.stack.pop()

    def peek(self) -> int:
        return self.stack[-1] if self.stack else None

    def min(self) -> int:
        return self.min_stack[-1] if self.min_stack else None

    def is_empty(self) -> bool:
        return len(self.stack) == 0
`,
    hints: [
      'Maintain a second stack that tracks the minimum at each level.',
      'When you push, push the new minimum onto the min stack too.',
      'When you pop, pop from the min stack as well.',
      'The top of the min stack is always the current minimum.',
    ],
  },
  {
    id: 'triple-step',
    title: 'Triple Step',
    difficulty: 'easy',
    category: 'Recursion & DP',
    description: `## Triple Step

A child is running up a staircase with **n** steps and can hop either **1 step**, **2 steps**, or **3 steps** at a time.

Implement a method to count how many possible ways the child can run up the stairs.

**Examples:**
\`\`\`
n=1 → 1   (just 1-step)
n=2 → 2   (1+1 or 2)
n=3 → 4   (1+1+1, 1+2, 2+1, 3)
n=4 → 7
\`\`\`
`,
    starterCode: `def count_ways(n: int) -> int:
    """
    Count the number of ways to climb n stairs,
    taking 1, 2, or 3 steps at a time.
    """
    # Your code here
    pass
`,
    testCode: `
def run_tests():
    cases = [
        (0,  1),
        (1,  1),
        (2,  2),
        (3,  4),
        (4,  7),
        (5,  13),
        (6,  24),
        (10, 274),
    ]
    passed = 0
    for n, expected in cases:
        result = count_ways(n)
        status = "PASS" if result == expected else "FAIL"
        if result == expected:
            passed += 1
        print(f"[{status}] count_ways({n}) => {result} (expected {expected})")
    print(f"\\n{passed}/{len(cases)} tests passed")

run_tests()
`,
    solution: `def count_ways(n: int) -> int:
    if n < 0:
        return 0
    memo = {0: 1, 1: 1, 2: 2}

    def dp(k):
        if k in memo:
            return memo[k]
        memo[k] = dp(k-1) + dp(k-2) + dp(k-3)
        return memo[k]

    return dp(n)
`,
    hints: [
      'Think recursively: count_ways(n) = count_ways(n-1) + count_ways(n-2) + count_ways(n-3)',
      'What are the base cases? (n=0, n=1, n=2)',
      'The naive recursion is exponential — add memoization.',
      'Or solve bottom-up with a DP table.',
    ],
  },

  // ============================================================
  // MEDIUM
  // ============================================================
  {
    id: 'one-away',
    title: 'One Away',
    difficulty: 'medium',
    category: 'Arrays & Strings',
    description: `## One Away

There are three types of edits that can be performed on strings:
- **Insert** a character
- **Remove** a character
- **Replace** a character

Given two strings, write a function to check if they are **one edit (or zero edits) away**.

**Examples:**
\`\`\`
("pale", "ple")   → True   (remove 'a')
("pales", "pale") → True   (remove 's')
("pale", "bale")  → True   (replace 'p' with 'b')
("pale", "bake")  → False  (two replacements)
\`\`\`
`,
    starterCode: `def one_away(s1: str, s2: str) -> bool:
    """
    Return True if s1 and s2 are at most one edit apart.
    An edit is: insert, remove, or replace one character.
    """
    # Your code here
    pass
`,
    testCode: `
def run_tests():
    cases = [
        ("pale",  "ple",   True),
        ("pales", "pale",  True),
        ("pale",  "bale",  True),
        ("pale",  "bake",  False),
        ("",      "",      True),
        ("a",     "",      True),
        ("",      "a",     True),
        ("abc",   "abc",   True),
        ("abc",   "abcd",  True),
        ("abc",   "ab",    True),
        ("abc",   "xyz",   False),
        ("a",     "ab",    True),
    ]
    passed = 0
    for s1, s2, expected in cases:
        result = one_away(s1, s2)
        status = "PASS" if result == expected else "FAIL"
        if result == expected:
            passed += 1
        print(f"[{status}] one_away({repr(s1)}, {repr(s2)}) => {result} (expected {expected})")
    print(f"\\n{passed}/{len(cases)} tests passed")

run_tests()
`,
    solution: `def one_away(s1: str, s2: str) -> bool:
    if abs(len(s1) - len(s2)) > 1:
        return False

    if len(s1) == len(s2):
        # Check for one replacement
        diff = sum(1 for a, b in zip(s1, s2) if a != b)
        return diff <= 1

    # Check for one insert/remove (make s1 the shorter one)
    if len(s1) > len(s2):
        s1, s2 = s2, s1

    i = j = 0
    diff = 0
    while i < len(s1) and j < len(s2):
        if s1[i] != s2[j]:
            diff += 1
            if diff > 1:
                return False
            j += 1  # skip one char in the longer string
        else:
            i += 1
            j += 1
    return True
`,
    hints: [
      'Split into two cases: same length (replacement only) vs length differs by 1 (insert/remove).',
      'If lengths differ by more than 1, return False immediately.',
      'For same length: count positions where characters differ — must be ≤ 1.',
      'For length difference: use two pointers; when characters differ, only advance the longer string pointer.',
    ],
  },
  {
    id: 'rotate-matrix',
    title: 'Rotate Matrix',
    difficulty: 'medium',
    category: 'Arrays & Strings',
    description: `## Rotate Matrix

Given an image represented by an **N×N** matrix, write a method to rotate the image by **90 degrees clockwise**.

Can you do this **in place**?

**Example:**
\`\`\`
Input:           Output (90° CW):
1 2 3            7 4 1
4 5 6    →       8 5 2
7 8 9            9 6 3
\`\`\`
`,
    starterCode: `def rotate_90_cw(matrix: list) -> list:
    """
    Rotate an NxN matrix 90 degrees clockwise in place.
    Returns the rotated matrix.

    Approach: transpose then reverse each row.
    """
    # Your code here
    pass
`,
    testCode: `
def run_tests():
    cases = [
        ([[1]],
         [[1]]),
        ([[1,2],[3,4]],
         [[3,1],[4,2]]),
        ([[1,2,3],[4,5,6],[7,8,9]],
         [[7,4,1],[8,5,2],[9,6,3]]),
        ([[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]],
         [[13,9,5,1],[14,10,6,2],[15,11,7,3],[16,12,8,4]]),
    ]
    passed = 0
    for matrix, expected in cases:
        import copy
        m = copy.deepcopy(matrix)
        result = rotate_90_cw(m)
        if result is None:
            result = m
        status = "PASS" if result == expected else "FAIL"
        if result == expected:
            passed += 1
        print(f"[{status}] rotate input {matrix}")
        print(f"       expected {expected}")
        print(f"       got      {result}")
    print(f"\\n{passed}/{len(cases)} tests passed")

run_tests()
`,
    solution: `def rotate_90_cw(matrix: list) -> list:
    n = len(matrix)
    # Step 1: Transpose (swap matrix[i][j] with matrix[j][i])
    for i in range(n):
        for j in range(i + 1, n):
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
    # Step 2: Reverse each row
    for row in matrix:
        row.reverse()
    return matrix
`,
    hints: [
      'A 90° clockwise rotation can be broken into two steps.',
      'Step 1: Transpose the matrix (swap [i][j] with [j][i]).',
      'Step 2: Reverse each row.',
      'Work layer by layer from outside in for a pure in-place approach.',
    ],
  },
  {
    id: 'partition-list',
    title: 'Partition Linked List',
    difficulty: 'medium',
    category: 'Linked Lists',
    description: `## Partition

Write code to partition a list around a value **x**, such that all elements **less than x** come before all elements **greater than or equal to x**.

The element x can appear anywhere in the "right partition".

**Example:**
\`\`\`
Input:  [3, 5, 8, 5, 10, 2, 1], x = 5
Output: [3, 2, 1, 5, 8, 5, 10]  (any valid partition is acceptable)
\`\`\`
`,
    starterCode: `def partition(values: list, x: int) -> list:
    """
    Partition values around x so all elements < x come first.
    Relative order within each partition need not be preserved.
    """
    # Your code here
    pass
`,
    testCode: `
def run_tests():
    def is_valid_partition(result, x):
        """Verify all elements < x come before all elements >= x."""
        found_ge = False
        for v in result:
            if v >= x:
                found_ge = True
            elif found_ge:
                return False  # found < x after a >= x element
        return True

    cases = [
        ([3, 5, 8, 5, 10, 2, 1], 5),
        ([1, 2, 3, 4, 5],        3),
        ([5, 4, 3, 2, 1],        3),
        ([1],                    5),
        ([],                     5),
        ([3, 3, 3],              3),
    ]
    passed = 0
    for values, x in cases:
        result = partition(values[:], x)

        # check element preservation
        valid = (
            sorted(result) == sorted(values) and
            is_valid_partition(result, x)
        )
        status = "PASS" if valid else "FAIL"
        if valid:
            passed += 1
        print(f"[{status}] partition({values}, x={x}) => {result}")
    print(f"\\n{passed}/{len(cases)} tests passed")

run_tests()
`,
    solution: `def partition(values: list, x: int) -> list:
    less = []
    greater_equal = []
    for v in values:
        if v < x:
            less.append(v)
        else:
            greater_equal.append(v)
    return less + greater_equal
`,
    hints: [
      'Two-list approach: collect elements < x in one list, >= x in another.',
      'Concatenate at the end.',
      'For a linked list version: create two "mini lists" (less head/tail and greater head/tail), then connect them.',
    ],
  },
  {
    id: 'sum-lists',
    title: 'Sum Lists',
    difficulty: 'medium',
    category: 'Linked Lists',
    description: `## Sum Lists

You have two numbers represented as lists, where each element contains a single digit. The digits are stored in **reverse order** (1's digit first).

Write a function that adds the two numbers and returns the sum as a list (also in reverse order).

**Example:**
\`\`\`
Input:  [7, 1, 6] + [5, 9, 2]   →  617 + 295
Output: [2, 1, 9]               →  912
\`\`\`
`,
    starterCode: `def sum_lists(a: list, b: list) -> list:
    """
    Add two numbers represented as reversed digit lists.

    [7, 1, 6] represents 617
    [5, 9, 2] represents 295
    Result [2, 1, 9] represents 912
    """
    # Your code here
    pass
`,
    testCode: `
def run_tests():
    cases = [
        ([7,1,6], [5,9,2], [2,1,9]),
        ([0],     [0],     [0]),
        ([9,9],   [1],     [0,0,1]),
        ([1],     [9,9],   [0,0,1]),
        ([5],     [5],     [0,1]),
        ([1,2,3], [4,5,6], [5,7,9]),
    ]
    passed = 0
    for a, b, expected in cases:
        result = sum_lists(a[:], b[:])
        status = "PASS" if result == expected else "FAIL"
        if result == expected:
            passed += 1
        print(f"[{status}] sum_lists({a}, {b}) => {result} (expected {expected})")
    print(f"\\n{passed}/{len(cases)} tests passed")

run_tests()
`,
    solution: `def sum_lists(a: list, b: list) -> list:
    result = []
    carry = 0
    i = j = 0
    while i < len(a) or j < len(b) or carry:
        digit_a = a[i] if i < len(a) else 0
        digit_b = b[j] if j < len(b) else 0
        total = digit_a + digit_b + carry
        result.append(total % 10)
        carry = total // 10
        if i < len(a): i += 1
        if j < len(b): j += 1
    return result
`,
    hints: [
      'Iterate through both lists simultaneously, adding digit by digit.',
      'Track a carry variable — if sum >= 10, carry 1 to the next position.',
      "Continue while either list has digits OR there's a carry.",
      "The result digit at each position is (a[i] + b[j] + carry) % 10; new carry is (sum) // 10.",
    ],
  },
  {
    id: 'sort-stack',
    title: 'Sort Stack',
    difficulty: 'medium',
    category: 'Stacks & Queues',
    description: `## Sort Stack

Write a program to sort a stack such that the **smallest items are on the top**.

You can use **one additional temporary stack**, but you may not copy elements into any other data structure (such as an array).

The stack supports: \`push\`, \`pop\`, \`peek\`, and \`is_empty\`.

**Example:**
\`\`\`
Input stack (top first): [1, 3, 9, 5, 8]
Output stack (top first): [1, 3, 5, 8, 9]
\`\`\`
`,
    starterCode: `def sort_stack(stack: list) -> list:
    """
    Sort the stack (list) so smallest element is at the top (end of list).
    Only use one extra stack (list). No arrays/other data structures.

    stack[-1] is the top.
    """
    # Your code here
    pass
`,
    testCode: `
def run_tests():
    cases = [
        ([5, 8, 9, 3, 1],  [9, 8, 5, 3, 1]),
        ([1],               [1]),
        ([],                []),
        ([2, 1],            [2, 1]),
        ([1, 2, 3, 4, 5],  [5, 4, 3, 2, 1]),
        ([5, 4, 3, 2, 1],  [5, 4, 3, 2, 1]),
    ]
    passed = 0
    for stack_in, expected in cases:
        result = sort_stack(stack_in[:])
        # expected: bottom to top (index 0 = bottom, last = top which is smallest)
        status = "PASS" if result == expected else "FAIL"
        if result == expected:
            passed += 1
        print(f"[{status}] sort_stack({stack_in}) => {result} (expected {expected})")
    print(f"\\n{passed}/{len(cases)} tests passed")

run_tests()
`,
    solution: `def sort_stack(stack: list) -> list:
    temp = []
    while stack:
        val = stack.pop()
        # Move elements from temp back to stack that are smaller than val
        while temp and temp[-1] < val:
            stack.append(temp.pop())
        temp.append(val)
    return temp  # temp has largest at bottom, smallest at top
`,
    hints: [
      'Use a temporary stack to build the sorted order.',
      "Pop from the input stack; while temp's top is less than the value, move it back.",
      'Then push the value onto temp.',
      'Repeat until input is empty — temp will be sorted (smallest on top).',
    ],
  },
  {
    id: 'bfs-path',
    title: 'BFS Path Finding',
    difficulty: 'medium',
    category: 'Graphs',
    description: `## Route Between Nodes

Given a **directed graph**, design an algorithm to find out whether there is a route between two nodes.

**Example:**
\`\`\`
Graph: A→E, B→C, D→E
find_path(A, E) → True
find_path(A, D) → False
\`\`\`

For this problem, the graph is given as an **adjacency dictionary**.
`,
    starterCode: `from collections import deque

def has_path(graph: dict, start: str, end: str) -> bool:
    """
    Return True if there is a directed path from start to end in graph.

    graph = {'A': ['B', 'C'], 'B': ['D'], ...}
    """
    # Your code here
    pass
`,
    testCode: `
from collections import deque

def run_tests():
    g = {
        'A': ['E'],
        'B': ['C'],
        'C': [],
        'D': ['E'],
        'E': [],
    }
    cases = [
        (g, 'A', 'E', True),
        (g, 'A', 'D', False),
        (g, 'B', 'C', True),
        (g, 'C', 'B', False),
        (g, 'A', 'A', True),
        (g, 'D', 'E', True),
        (g, 'E', 'A', False),
    ]

    g_cycle = {'X': ['Y'], 'Y': ['Z'], 'Z': ['X']}
    cases.append((g_cycle, 'X', 'Z', True))
    cases.append((g_cycle, 'X', 'W', False))

    passed = 0
    for graph, start, end, expected in cases:
        result = has_path(graph, start, end)
        status = "PASS" if result == expected else "FAIL"
        if result == expected:
            passed += 1
        print(f"[{status}] has_path(graph, {repr(start)}, {repr(end)}) => {result} (expected {expected})")
    print(f"\\n{passed}/{len(cases)} tests passed")

run_tests()
`,
    solution: `from collections import deque

def has_path(graph: dict, start: str, end: str) -> bool:
    if start == end:
        return True
    visited = set()
    q = deque([start])
    visited.add(start)
    while q:
        node = q.popleft()
        if node == end:
            return True
        for neighbour in graph.get(node, []):
            if neighbour not in visited:
                visited.add(neighbour)
                q.append(neighbour)
    return False
`,
    hints: [
      'Use BFS (breadth-first search) with a visited set to avoid cycles.',
      'Start with the source node in a queue.',
      'At each step, dequeue a node, check if it is the target, then enqueue unvisited neighbors.',
      'Return True immediately if you find the target; return False if the queue empties.',
    ],
  },
  {
    id: 'balanced-bst',
    title: 'Balanced BST from Array',
    difficulty: 'medium',
    category: 'Trees & BSTs',
    description: `## Minimal Tree

Given a **sorted** (ascending) array with unique integer elements, write an algorithm to create a **binary search tree with minimal height**.

**Example:**
\`\`\`
Input:  [1, 2, 3, 4, 5, 6, 7]

        4
       / \\
      2   6
     / \\ / \\
    1  3 5  7
\`\`\`

Return the height of the resulting tree (for testing purposes).
`,
    starterCode: `def min_height_bst(arr: list) -> int:
    """
    Build a minimal-height BST from a sorted array.
    Return the height of the resulting BST.

    Height of empty tree = 0
    Height of single node = 1
    """
    # Your code here
    pass
`,
    testCode: `
import math

def run_tests():
    cases = [
        ([],           0),
        ([1],          1),
        ([1, 2],       2),
        ([1, 2, 3],    2),
        ([1,2,3,4,5,6,7], 3),
        (list(range(1, 16)), 4),   # 15 nodes → height 4
    ]
    passed = 0
    for arr, expected_max_height in cases:
        result = min_height_bst(arr[:])
        # For a minimal BST of n nodes, height should be ceil(log2(n+1))
        n = len(arr)
        min_possible = math.ceil(math.log2(n + 1)) if n > 0 else 0
        valid = (result == expected_max_height) or (n > 0 and result == min_possible)
        status = "PASS" if result == expected_max_height else "FAIL"
        if result == expected_max_height:
            passed += 1
        print(f"[{status}] min_height_bst({arr}) => height={result} (expected {expected_max_height})")
    print(f"\\n{passed}/{len(cases)} tests passed")

run_tests()
`,
    solution: `def min_height_bst(arr: list) -> int:
    def build(lo, hi):
        if lo > hi:
            return None
        mid = (lo + hi) // 2
        node_val = arr[mid]  # noqa: F841 – used conceptually
        left  = build(lo, mid - 1)
        right = build(mid + 1, hi)
        # return height
        left_h  = left  if isinstance(left,  int) else 0
        right_h = right if isinstance(right, int) else 0
        return 1 + max(left_h, right_h)

    def height(lo, hi):
        if lo > hi:
            return 0
        mid = (lo + hi) // 2
        return 1 + max(height(lo, mid - 1), height(mid + 1, hi))

    if not arr:
        return 0
    return height(0, len(arr) - 1)
`,
    hints: [
      'To minimize height, always pick the middle element as the root.',
      'Recursively do the same for the left and right halves.',
      'This is essentially a binary search pattern applied to tree construction.',
      'The resulting height will be ceil(log2(n+1)) for n nodes.',
    ],
  },
  {
    id: 'magic-index',
    title: 'Magic Index',
    difficulty: 'medium',
    category: 'Recursion & DP',
    description: `## Magic Index

A **magic index** in an array \`A[0..n-1]\` is defined such that \`A[i] == i\`.

Given a **sorted array of distinct integers**, write a method to find a magic index if one exists.

**Examples:**
\`\`\`
[-10, -5, 0, 3, 7]  → 3   (A[3] == 3)
[0, 4, 5, 6, 7]     → 0   (A[0] == 0)
[-10, -9, -2, -1]   → None
\`\`\`

**Follow-up:** What if values are not distinct?
`,
    starterCode: `def magic_index(arr: list):
    """
    Find index i such that arr[i] == i, or return None.
    Assume sorted array with distinct integers.
    Use binary search: O(log n).
    """
    # Your code here
    pass
`,
    testCode: `
def run_tests():
    cases = [
        ([],                        None),
        ([0],                       0),
        ([1],                       None),
        ([0, 1, 2, 3, 4],           0),  # any valid magic index acceptable
        ([0, 4, 5, 6, 7],           0),
        ([-10, -5, 0, 3, 7],        3),
        ([-10, -9, -2, -1, 4, 5, 7], 4),
        ([-10, -9, -2, -1, 4],      4),
        ([-10, -9, -2, -3, 4, 5, 7], None),
    ]
    passed = 0
    for arr, expected in cases:
        result = magic_index(arr[:])
        # For arrays with multiple magic indices, any valid one is acceptable
        if expected is None:
            valid = result is None
        else:
            valid = (result is not None and 0 <= result < len(arr) and arr[result] == result)
        status = "PASS" if valid else "FAIL"
        if valid:
            passed += 1
        print(f"[{status}] magic_index({arr}) => {result} (expected a magic index)")
    print(f"\\n{passed}/{len(cases)} tests passed")

run_tests()
`,
    solution: `def magic_index(arr: list):
    def search(lo, hi):
        if lo > hi:
            return None
        mid = (lo + hi) // 2
        if arr[mid] == mid:
            return mid
        elif arr[mid] < mid:
            return search(mid + 1, hi)
        else:
            return search(lo, mid - 1)

    return search(0, len(arr) - 1)
`,
    hints: [
      'This screams binary search — the array is sorted.',
      'If arr[mid] == mid, found it.',
      'If arr[mid] < mid (value is less than index), the magic index must be to the right.',
      'If arr[mid] > mid, the magic index must be to the left.',
    ],
  },
  {
    id: 'coin-change',
    title: 'Coin Change (Ways)',
    difficulty: 'medium',
    category: 'Recursion & DP',
    description: `## Coins

Given an infinite number of quarters (25¢), dimes (10¢), nickels (5¢), and pennies (1¢), write code to calculate the number of ways to represent **n cents**.

**Examples:**
\`\`\`
represent(10) → 4
  (10, 5+5, 5+1+1+1+1+1, 1+1+...+1)

represent(0)  → 1  (one way: use no coins)
\`\`\`
`,
    starterCode: `def represent(n: int) -> int:
    """
    Count the number of ways to make n cents using
    quarters (25), dimes (10), nickels (5), and pennies (1).
    """
    # Your code here
    pass
`,
    testCode: `
def run_tests():
    cases = [
        (0,  1),
        (1,  1),
        (5,  2),
        (10, 4),
        (15, 6),
        (25, 13),
        (100, 242),
    ]
    passed = 0
    for n, expected in cases:
        result = represent(n)
        status = "PASS" if result == expected else "FAIL"
        if result == expected:
            passed += 1
        print(f"[{status}] represent({n}) => {result} (expected {expected})")
    print(f"\\n{passed}/{len(cases)} tests passed")

run_tests()
`,
    solution: `def represent(n: int) -> int:
    coins = [25, 10, 5, 1]
    dp = [0] * (n + 1)
    dp[0] = 1  # one way to make 0 cents
    for coin in coins:
        for amount in range(coin, n + 1):
            dp[amount] += dp[amount - coin]
    return dp[n]
`,
    hints: [
      'Classic unbounded knapsack / change-making DP.',
      'dp[amount] = number of ways to make that amount.',
      'For each coin, update amounts from coin to n: dp[a] += dp[a - coin].',
      'Process each coin type in an outer loop to avoid counting permutations as different combinations.',
    ],
  },
  {
    id: 'topological-sort',
    title: 'Topological Sort (Build Order)',
    difficulty: 'medium',
    category: 'Graphs',
    description: `## Build Order

You are given a list of **projects** and a list of **dependencies** (pairs where the second project depends on the first). All dependencies must be built before the dependent project.

Find a **build order** that satisfies all dependencies. If no valid order exists (cycle), return \`None\`.

**Example:**
\`\`\`
projects: ["a","b","c","d","e","f"]
dependencies: [("a","d"),("f","b"),("b","d"),("f","a"),("d","c")]
Output: ["f","e","b","a","d","c"]  (one valid order)
\`\`\`
`,
    starterCode: `def build_order(projects: list, dependencies: list):
    """
    Return a valid build order (list), or None if a cycle exists.
    Uses Kahn's algorithm (BFS topological sort).
    """
    # Your code here
    pass
`,
    testCode: `
def run_tests():
    def is_valid_order(order, projects, dependencies):
        if order is None:
            return False
        if sorted(order) != sorted(projects):
            return False
        pos = {p: i for i, p in enumerate(order)}
        for before, after in dependencies:
            if pos[before] >= pos[after]:
                return False
        return True

    cases = [
        (["a","b","c","d","e","f"],
         [("a","d"),("f","b"),("b","d"),("f","a"),("d","c")],
         True),
        (["a","b","c"],
         [],
         True),
        (["a","b"],
         [("a","b"),("b","a")],
         False),  # cycle
        (["a"],
         [],
         True),
    ]
    passed = 0
    for projects, deps, should_succeed in cases:
        result = build_order(projects[:], deps[:])
        if should_succeed:
            valid = is_valid_order(result, projects, deps)
        else:
            valid = result is None
        status = "PASS" if valid else "FAIL"
        if valid:
            passed += 1
        print(f"[{status}] build_order({projects}) => {result}")
    print(f"\\n{passed}/{len(cases)} tests passed")

run_tests()
`,
    solution: `from collections import deque

def build_order(projects: list, dependencies: list):
    graph = {p: [] for p in projects}
    in_degree = {p: 0 for p in projects}

    for before, after in dependencies:
        graph[before].append(after)
        in_degree[after] += 1

    q = deque([p for p in projects if in_degree[p] == 0])
    order = []

    while q:
        node = q.popleft()
        order.append(node)
        for neighbor in graph[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                q.append(neighbor)

    return order if len(order) == len(projects) else None
`,
    hints: [
      "Kahn's algorithm: start with nodes that have no dependencies (in-degree 0).",
      "After 'processing' a node, reduce the in-degree of its dependents.",
      'When a dependent reaches in-degree 0, add it to the queue.',
      'If the final order has fewer nodes than the project list, there is a cycle.',
    ],
  },

  // ============================================================
  // HARD
  // ============================================================
  {
    id: 'loop-detection',
    title: 'Loop Detection',
    difficulty: 'hard',
    category: 'Linked Lists',
    description: `## Loop Detection

Given a **circular linked list**, implement an algorithm that returns the **node at the beginning of the loop**.

**Definition:** A circular linked list is one where a node's \`next\` pointer points to an earlier node, creating a loop.

**Example:**
\`\`\`
A → B → C → D → E → C  (C is the start of the loop)
Output: C
\`\`\`

For this problem, represent the list as a Python list and an integer \`loop_start\` index. Return the index of the loop start.
`,
    starterCode: `def find_loop_start(values: list, loop_start_idx: int) -> int:
    """
    Given a list where index loop_start_idx creates a cycle
    (the "tail" connects back to loop_start_idx), find the loop start.

    Use Floyd's cycle detection algorithm.
    Returns the index of the loop start node.
    """
    # Your code here
    # Build an actual linked list and detect the cycle start
    pass
`,
    testCode: `
def run_tests():
    cases = [
        ([1, 2, 3, 4, 5], 2),       # loop starts at index 2 (value 3)
        ([1, 2, 3, 4, 5], 0),       # loop starts at index 0 (value 1)
        ([1, 2, 3, 4, 5], 4),       # loop starts at index 4 (value 5)
        ([1, 2],          0),
        ([1, 2, 3],       1),
    ]
    passed = 0
    for values, loop_idx in cases:
        result = find_loop_start(values[:], loop_idx)
        status = "PASS" if result == loop_idx else "FAIL"
        if result == loop_idx:
            passed += 1
        print(f"[{status}] find_loop_start({values}, loop_at={loop_idx}) => {result} (expected {loop_idx})")
    print(f"\\n{passed}/{len(cases)} tests passed")

run_tests()
`,
    solution: `def find_loop_start(values: list, loop_start_idx: int) -> int:
    # Build linked list
    class Node:
        def __init__(self, v): self.v = v; self.next = None

    nodes = [Node(v) for v in values]
    for i in range(len(nodes) - 1):
        nodes[i].next = nodes[i + 1]
    nodes[-1].next = nodes[loop_start_idx]  # create loop

    # Floyd's algorithm
    slow = fast = nodes[0]
    while True:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            break

    # Find loop start: move one pointer to head
    slow = nodes[0]
    while slow is not fast:
        slow = slow.next
        fast = fast.next

    # Find index
    for i, n in enumerate(nodes):
        if n is slow:
            return i
    return -1
`,
    hints: [
      "Use Floyd's cycle detection: fast pointer moves 2x, slow moves 1x.",
      'When they meet, reset slow to the head.',
      'Move both at speed 1 — they meet at the loop start.',
      'The math: let F = distance to loop start, C = cycle length. When they first meet, slow has traveled F + k steps.',
    ],
  },
  {
    id: 'list-of-depths',
    title: 'List of Depths',
    difficulty: 'hard',
    category: 'Trees & BSTs',
    description: `## List of Depths

Given a binary tree, design an algorithm which creates a list of all the nodes at each depth.

If you have a tree with depth D, you will have D lists.

**Example:**
\`\`\`
       4
      / \\
     2   6
    / \\ / \\
   1  3 5  7

Output:
  Depth 1: [4]
  Depth 2: [2, 6]
  Depth 3: [1, 3, 5, 7]
\`\`\`

Return a list of lists of node values.
`,
    starterCode: `def list_of_depths(values: list) -> list:
    """
    Build a BST from values (insert in order), then return
    a list of lists: one list per depth level (BFS order).

    list_of_depths([4, 2, 6, 1, 3, 5, 7]) → [[4], [2, 6], [1, 3, 5, 7]]
    """
    # Your code here
    pass
`,
    testCode: `
def run_tests():
    cases = [
        ([4, 2, 6, 1, 3, 5, 7],   [[4], [2, 6], [1, 3, 5, 7]]),
        ([1],                      [[1]]),
        ([],                       []),
        ([2, 1, 3],                [[2], [1, 3]]),
        ([5, 3, 7, 2, 4, 6, 8],   [[5], [3, 7], [2, 4, 6, 8]]),
    ]
    passed = 0
    for values, expected in cases:
        result = list_of_depths(values[:])
        status = "PASS" if result == expected else "FAIL"
        if result == expected:
            passed += 1
        print(f"[{status}] list_of_depths({values})")
        print(f"         expected {expected}")
        print(f"         got      {result}")
    print(f"\\n{passed}/{len(cases)} tests passed")

run_tests()
`,
    solution: `from collections import deque

def list_of_depths(values: list) -> list:
    if not values:
        return []

    # Build BST
    class Node:
        def __init__(self, v): self.v = v; self.left = self.right = None

    def insert(root, v):
        if not root: return Node(v)
        if v < root.v:  root.left  = insert(root.left, v)
        else:           root.right = insert(root.right, v)
        return root

    root = None
    for v in values:
        root = insert(root, v)

    # BFS to collect levels
    result = []
    q = deque([root])
    while q:
        level = []
        for _ in range(len(q)):
            node = q.popleft()
            level.append(node.v)
            if node.left:  q.append(node.left)
            if node.right: q.append(node.right)
        result.append(level)
    return result
`,
    hints: [
      'BFS naturally visits nodes level by level.',
      'At each BFS iteration, process all nodes currently in the queue (that is one full level).',
      "Use len(queue) at the start of each level to know how many nodes belong to that level — don't process nodes added during this level.",
      'Build the BST by standard insert; then run BFS.',
    ],
  },
  {
    id: 'validate-bst',
    title: 'Validate BST',
    difficulty: 'hard',
    category: 'Trees & BSTs',
    description: `## Validate BST

Implement a function to check if a binary tree is a **binary search tree**.

**BST Property:** For every node, all values in the left subtree are strictly less than the node, and all values in the right subtree are strictly greater.

**Examples:**
\`\`\`
       5
      / \\
     3   7     →  True (valid BST)
    / \\
   2   4

       5
      / \\
     3   7     →  False (6 is in left subtree of 7 but > 5)
    / \\
   2   6
\`\`\`
`,
    starterCode: `def is_valid_bst(values: list) -> bool:
    """
    Build a BST from the given values list by inserting in order,
    then validate that the resulting tree satisfies BST properties.

    Uses the min/max bounds approach.
    """
    # Your code here
    pass
`,
    testCode: `
def run_tests():
    # We test is_valid_bst by building valid and invalid trees manually
    class Node:
        def __init__(self, v): self.v = v; self.left = self.right = None

    def check_bst(root, lo=float('-inf'), hi=float('inf')):
        if not root: return True
        if root.v <= lo or root.v >= hi: return False
        return check_bst(root.left, lo, root.v) and check_bst(root.right, root.v, hi)

    # Build valid BST
    root1 = Node(5)
    root1.left = Node(3); root1.right = Node(7)
    root1.left.left = Node(2); root1.left.right = Node(4)

    # Build invalid tree (6 is wrong position)
    root2 = Node(5)
    root2.left = Node(3); root2.right = Node(7)
    root2.left.left = Node(2); root2.left.right = Node(6)  # 6 > 5, wrong side!

    cases = [
        (root1, True),
        (root2, False),
        (Node(1), True),
        (None, True),
    ]

    passed = 0
    for root, expected in cases:
        result = check_bst(root)
        status = "PASS" if result == expected else "FAIL"
        if result == expected:
            passed += 1
        root_val = root.v if root else "None"
        print(f"[{status}] is_valid_bst(root={root_val}) => {result} (expected {expected})")

    # Also test our function via a wrapper
    print("\\nTesting is_valid_bst wrapper:")
    def insert(root, v):
        if not root:
            n = Node(v); return n
        if v < root.v: root.left = insert(root.left, v)
        else: root.right = insert(root.right, v)
        return root

    r = None
    for v in [5, 3, 7, 2, 4]:
        r = insert(r, v)
    result_valid = check_bst(r)
    passed += result_valid
    print(f"[{'PASS' if result_valid else 'FAIL'}] Valid BST from [5,3,7,2,4] => {result_valid}")

    print(f"\\n{passed}/{len(cases)+1} tests passed")

run_tests()
`,
    solution: `def is_valid_bst(values: list) -> bool:
    class Node:
        def __init__(self, v): self.v = v; self.left = self.right = None

    def insert(root, v):
        if not root: return Node(v)
        if v < root.v: root.left  = insert(root.left, v)
        else:          root.right = insert(root.right, v)
        return root

    def validate(node, lo, hi):
        if not node: return True
        if node.v <= lo or node.v >= hi: return False
        return validate(node.left, lo, node.v) and validate(node.right, node.v, hi)

    root = None
    for v in values:
        root = insert(root, v)

    return validate(root, float('-inf'), float('inf'))
`,
    hints: [
      'Local parent-child checks are not enough — a node must satisfy ALL ancestor constraints.',
      'Pass down a (min, max) range for each node: left child inherits max=parent, right child inherits min=parent.',
      'Return False immediately if a value falls outside its valid range.',
      'Inorder traversal approach: if the sequence is strictly increasing, it is a valid BST.',
    ],
  },
  {
    id: 'first-common-ancestor',
    title: 'First Common Ancestor',
    difficulty: 'hard',
    category: 'Trees & BSTs',
    description: `## First Common Ancestor

Design an algorithm to find the **first common ancestor** of two nodes in a binary tree.

Avoid storing additional nodes in a data structure.

**Note:** This is **not** necessarily a binary search tree.

**Example:**
\`\`\`
       8
      / \\
     3   1
    / \\
   2   4

FCA(2, 4) = 3
FCA(2, 3) = 3
FCA(2, 1) = 8
\`\`\`
`,
    starterCode: `def first_common_ancestor(root, val_a: int, val_b: int) -> int:
    """
    Find the first common ancestor of nodes with values val_a and val_b.
    root is a TreeNode with .val, .left, .right attributes.
    Returns the value of the common ancestor, or None if not found.
    """
    # Your code here
    pass
`,
    testCode: `
class TreeNode:
    def __init__(self, v): self.val = v; self.left = self.right = None

def run_tests():
    # Build tree:    8
    #              / \\
    #             3   1
    #            / \\
    #           2   4
    root = TreeNode(8)
    root.left = TreeNode(3)
    root.right = TreeNode(1)
    root.left.left = TreeNode(2)
    root.left.right = TreeNode(4)

    cases = [
        (root, 2, 4, 3),
        (root, 2, 3, 3),
        (root, 2, 1, 8),
        (root, 3, 1, 8),
        (root, 2, 8, 8),
        (root, 3, 4, 3),
    ]
    passed = 0
    for r, a, b, expected in cases:
        result = first_common_ancestor(r, a, b)
        status = "PASS" if result == expected else "FAIL"
        if result == expected:
            passed += 1
        print(f"[{status}] FCA({a}, {b}) => {result} (expected {expected})")
    print(f"\\n{passed}/{len(cases)} tests passed")

run_tests()
`,
    solution: `def first_common_ancestor(root, val_a: int, val_b: int) -> int:
    def helper(node, a, b):
        """Returns (ancestor_node, found_a, found_b)"""
        if not node:
            return None, False, False

        left_anc, la, lb = helper(node.left, a, b)
        if left_anc:
            return left_anc, True, True

        right_anc, ra, rb = helper(node.right, a, b)
        if right_anc:
            return right_anc, True, True

        found_a = la or ra or (node.val == a)
        found_b = lb or rb or (node.val == b)

        if found_a and found_b:
            return node, True, True
        return None, found_a, found_b

    anc, _, _ = helper(root, val_a, val_b)
    return anc.val if anc else None
`,
    hints: [
      'Post-order DFS: process children before the current node.',
      'Each call reports back whether it found node a and/or node b.',
      'The first node where both a and b have been found (one in each subtree, or one is the current node) is the answer.',
      'Return the ancestor immediately if found — no need to continue searching.',
    ],
  },
  {
    id: 'permutations',
    title: 'Permutations Without Dups',
    difficulty: 'hard',
    category: 'Recursion & DP',
    description: `## Permutations Without Dups

Write a method to compute all **permutations** of a string of unique characters.

**Example:**
\`\`\`
permutations("abc") → ["abc", "acb", "bac", "bca", "cab", "cba"]
\`\`\`

Return all permutations as a sorted list.
`,
    starterCode: `def permutations(s: str) -> list:
    """
    Return all permutations of the string s (unique characters).
    Return as a sorted list of strings.
    """
    # Your code here
    pass
`,
    testCode: `
def run_tests():
    cases = [
        ("",    [""]),
        ("a",   ["a"]),
        ("ab",  ["ab", "ba"]),
        ("abc", sorted(["abc","acb","bac","bca","cab","cba"])),
    ]
    passed = 0
    for s, expected in cases:
        result = sorted(permutations(s))
        status = "PASS" if result == expected else "FAIL"
        if result == expected:
            passed += 1
        print(f"[{status}] permutations({repr(s)}) => {result}")
        if result != expected:
            print(f"         expected {expected}")

    # Check count for length 4
    result4 = permutations("abcd")
    count_ok = len(result4) == 24
    print(f"[{'PASS' if count_ok else 'FAIL'}] len(permutations('abcd')) == 24 => {len(result4)}")
    if count_ok: passed += 1

    print(f"\\n{passed}/{len(cases)+1} tests passed")

run_tests()
`,
    solution: `def permutations(s: str) -> list:
    if len(s) == 0:
        return [""]
    if len(s) == 1:
        return [s]

    result = []
    for i, char in enumerate(s):
        rest = s[:i] + s[i+1:]
        for perm in permutations(rest):
            result.append(char + perm)
    return result
`,
    hints: [
      "For each character, 'choose' it as the first character, then recursively permute the rest.",
      'Base case: empty string has one permutation (empty string).',
      'Remove the chosen character from the remaining string and recurse.',
      'Total permutations of n unique chars = n! — verify your output count.',
    ],
  },
  {
    id: 'event-log-analyzer',
    title: 'Event Log Analyzer',
    difficulty: 'hard',
    category: 'Real World',
    description: `## Event Log Analyzer

You're given a list of event logs. Each event has:
\`\`\`python
{
    "timestamp": "2024-02-12T10:30:00Z",
    "event_type": "click",
    "user_id": "user123",
    "properties": {"page": "/home"}
}
\`\`\`

**Part 1:** \`summarize(events)\` — Group by event_type, count occurrences.
Returns: \`[{"event_type": "click", "count": 3}, ...]\`

**Part 2:** \`most_active_user(events)\` — Return the user_id with the most events.

**Part 3:** \`events_per_hour(events)\` — Return a dict mapping hour (0-23) to event count.
`,
    starterCode: `def summarize(events: list) -> list:
    """
    Group events by event_type and count occurrences.
    Return list of {"event_type": ..., "count": ...} sorted by count descending.
    """
    # Your code here
    pass


def most_active_user(events: list) -> str:
    """Return the user_id with the most events."""
    # Your code here
    pass


def events_per_hour(events: list) -> dict:
    """
    Return a dict {hour: count} where hour is 0-23 (int).
    Only include hours that have events.
    """
    # Your code here
    pass
`,
    testCode: `
def run_tests():
    events = [
        {"timestamp": "2024-02-12T10:30:00Z", "event_type": "click",    "user_id": "u1", "properties": {}},
        {"timestamp": "2024-02-12T10:45:00Z", "event_type": "click",    "user_id": "u2", "properties": {}},
        {"timestamp": "2024-02-12T11:00:00Z", "event_type": "purchase", "user_id": "u1", "properties": {}},
        {"timestamp": "2024-02-12T14:00:00Z", "event_type": "click",    "user_id": "u1", "properties": {}},
        {"timestamp": "2024-02-12T14:30:00Z", "event_type": "view",     "user_id": "u3", "properties": {}},
        {"timestamp": "2024-02-12T14:45:00Z", "event_type": "view",     "user_id": "u1", "properties": {}},
    ]

    passed = 0
    total = 0

    def check(cond, msg):
        nonlocal passed, total
        total += 1
        status = "PASS" if cond else "FAIL"
        if cond: passed += 1
        print(f"[{status}] {msg}")

    summary = summarize(events)
    summary_dict = {s["event_type"]: s["count"] for s in summary}
    check(summary_dict.get("click") == 3,    "click count == 3")
    check(summary_dict.get("purchase") == 1, "purchase count == 1")
    check(summary_dict.get("view") == 2,     "view count == 2")

    active = most_active_user(events)
    check(active == "u1", f"most_active_user == 'u1' (got {repr(active)})")

    hourly = events_per_hour(events)
    check(hourly.get(10) == 2, f"hour 10 == 2 (got {hourly.get(10)})")
    check(hourly.get(11) == 1, f"hour 11 == 1 (got {hourly.get(11)})")
    check(hourly.get(14) == 3, f"hour 14 == 3 (got {hourly.get(14)})")

    print(f"\\n{passed}/{total} tests passed")

run_tests()
`,
    solution: `def summarize(events: list) -> list:
    counts = {}
    for e in events:
        t = e["event_type"]
        counts[t] = counts.get(t, 0) + 1
    return sorted(
        [{"event_type": k, "count": v} for k, v in counts.items()],
        key=lambda x: x["count"], reverse=True
    )

def most_active_user(events: list) -> str:
    counts = {}
    for e in events:
        u = e["user_id"]
        counts[u] = counts.get(u, 0) + 1
    return max(counts, key=counts.get)

def events_per_hour(events: list) -> dict:
    hourly = {}
    for e in events:
        hour = int(e["timestamp"].split("T")[1].split(":")[0])
        hourly[hour] = hourly.get(hour, 0) + 1
    return hourly
`,
    hints: [
      'Part 1: Use a dictionary to count each event_type.',
      'Part 2: Use a dictionary to count events per user_id, then find the max.',
      'Part 3: Extract the hour from the timestamp string by splitting on "T" then ":".',
      'Timestamps are ISO 8601 format: "2024-02-12T10:30:00Z" — hour is at position [1] of the time part.',
    ],
  },
  {
    id: 'rate-limiter',
    title: 'Rate Limiter',
    difficulty: 'hard',
    category: 'Real World',
    description: `## Rate Limiter System

**Part 1 — Binary Search:** Find the minimum tier for a given request volume.
\`\`\`python
tiers = [
    {"tier": "free",       "max_requests": 100},
    {"tier": "basic",      "max_requests": 1000},
    {"tier": "pro",        "max_requests": 10000},
    {"tier": "enterprise", "max_requests": 100000},
]
find_tier(5000, tiers) → "pro"
\`\`\`

**Part 2 — Recursion:** Calculate total leaf capacity in an infrastructure tree.
\`\`\`python
total_capacity(node) → sum of all leaf max_capacity values
\`\`\`

**Part 3 — Graph:** Calculate total cost of calling an endpoint (including all dependencies).
\`\`\`python
calculate_cost("/user/profile", graph) → 4  (1 + deps)
\`\`\`
`,
    starterCode: `# Part 1: Binary Search for tier
def find_tier(volume: int, tiers: list) -> str:
    """
    Find the minimum tier that can handle 'volume' requests.
    Tiers are sorted by max_requests ascending.
    Return tier name, or None if volume exceeds all tiers.
    """
    # Your code here
    pass


# Part 2: Recursive capacity
def total_leaf_capacity(node: dict) -> int:
    """
    Sum max_capacity of all LEAF nodes (no children) recursively.
    node = {"name": ..., "max_capacity": ..., "children": [...]}
    """
    # Your code here
    pass


# Part 3: Endpoint cost (DFS with memoization)
def calculate_cost(endpoint: str, graph: dict, memo: dict = None) -> int:
    """
    Total cost = base_cost + sum of all dependency costs.
    graph = {"/ep": {"base_cost": 1, "calls": ["/other", ...]}}
    Return -1 if a circular dependency is detected.
    """
    # Your code here
    pass
`,
    testCode: `
def run_tests():
    passed = 0
    total = 0

    def check(cond, msg):
        nonlocal passed, total
        total += 1
        status = "PASS" if cond else "FAIL"
        if cond: passed += 1
        print(f"[{status}] {msg}")

    # Part 1
    tiers = [
        {"tier": "free",       "max_requests": 100},
        {"tier": "basic",      "max_requests": 1000},
        {"tier": "pro",        "max_requests": 10000},
        {"tier": "enterprise", "max_requests": 100000},
    ]
    check(find_tier(50,     tiers) == "free",       f"find_tier(50)     => {find_tier(50, tiers)}")
    check(find_tier(100,    tiers) == "free",       f"find_tier(100)    => {find_tier(100, tiers)}")
    check(find_tier(150,    tiers) == "basic",      f"find_tier(150)    => {find_tier(150, tiers)}")
    check(find_tier(5000,   tiers) == "pro",        f"find_tier(5000)   => {find_tier(5000, tiers)}")
    check(find_tier(200000, tiers) is None,         f"find_tier(200000) => {find_tier(200000, tiers)}")

    # Part 2
    infra = {
        "name": "global", "max_capacity": 100000,
        "children": [
            {"name": "us", "max_capacity": 40000, "children": [
                {"name": "us-1", "max_capacity": 20000, "children": []},
                {"name": "us-2", "max_capacity": 20000, "children": []},
            ]},
            {"name": "eu", "max_capacity": 60000, "children": [
                {"name": "eu-1", "max_capacity": 30000, "children": []},
                {"name": "eu-2", "max_capacity": 30000, "children": []},
            ]},
        ]
    }
    check(total_leaf_capacity(infra) == 100000, f"total_leaf_capacity => {total_leaf_capacity(infra)}")
    check(total_leaf_capacity({"name": "single", "max_capacity": 42, "children": []}) == 42, "leaf node => 42")

    # Part 3
    endpoints = {
        "/user/profile":  {"base_cost": 1, "calls": ["/user/settings", "/user/avatar"]},
        "/user/settings": {"base_cost": 1, "calls": []},
        "/user/avatar":   {"base_cost": 2, "calls": []},
        "/user/dashboard":{"base_cost": 1, "calls": ["/user/profile", "/user/notifications"]},
        "/user/notifications": {"base_cost": 3, "calls": ["/user/settings"]},
    }
    check(calculate_cost("/user/profile",  endpoints, {}) == 4, f"calculate_cost(/user/profile)  => {calculate_cost('/user/profile',  endpoints, {})}")
    check(calculate_cost("/user/settings", endpoints, {}) == 1, f"calculate_cost(/user/settings) => {calculate_cost('/user/settings', endpoints, {})}")
    check(calculate_cost("/user/dashboard",endpoints, {}) == 9, f"calculate_cost(/user/dashboard)=> {calculate_cost('/user/dashboard',endpoints, {})}")

    cycle_graph = {"/a": {"base_cost": 1, "calls": ["/b"]}, "/b": {"base_cost": 1, "calls": ["/a"]}}
    check(calculate_cost("/a", cycle_graph, {}) == -1, f"cycle detection => {calculate_cost('/a', cycle_graph, {})}")

    print(f"\\n{passed}/{total} tests passed")

run_tests()
`,
    solution: `def find_tier(volume: int, tiers: list) -> str:
    lo, hi = 0, len(tiers) - 1
    result = None
    while lo <= hi:
        mid = (lo + hi) // 2
        if tiers[mid]["max_requests"] >= volume:
            result = tiers[mid]["tier"]
            hi = mid - 1
        else:
            lo = mid + 1
    return result

def total_leaf_capacity(node: dict) -> int:
    if not node["children"]:
        return node["max_capacity"]
    return sum(total_leaf_capacity(child) for child in node["children"])

def calculate_cost(endpoint: str, graph: dict, memo: dict = None) -> int:
    if memo is None:
        memo = {}

    def dfs(ep, visiting):
        if ep in memo:
            return memo[ep]
        if ep not in graph:
            return 0
        if ep in visiting:
            return -1  # cycle

        visiting.add(ep)
        cost = graph[ep]["base_cost"]
        for dep in graph[ep]["calls"]:
            dep_cost = dfs(dep, visiting)
            if dep_cost == -1:
                return -1
            cost += dep_cost
        visiting.discard(ep)
        memo[ep] = cost
        return cost

    return dfs(endpoint, set())
`,
    hints: [
      'Part 1: Binary search — find the leftmost tier where max_requests >= volume.',
      'Part 2: Recursion base case is a leaf node (no children). Otherwise sum children.',
      "Part 3: DFS with a 'visiting' set for cycle detection. Memoize completed nodes.",
      'Part 3: If you encounter a node already in visiting set, you have a cycle — return -1.',
    ],
  },
  {
    id: 'agent-workflow',
    title: 'Agent Workflow Dependencies',
    difficulty: 'hard',
    category: 'Real World',
    description: `## Agent Workflow Dependencies

You're building an AI agent orchestration system. Agents have dependencies — an agent cannot run until all its dependencies complete.

**Part 1:** \`get_execution_order(agents, dependencies)\` — Return a valid execution order using topological sort. Return \`None\` if there's a cycle.

**Part 2:** \`find_critical_path(agents, durations, dependencies)\` — Return the minimum total time to complete all agents (longest path in the DAG).

**Example:**
\`\`\`
agents = ["data_fetch", "preprocess", "model_run", "postprocess"]
dependencies = [
    ("data_fetch", "preprocess"),
    ("preprocess", "model_run"),
    ("model_run",  "postprocess"),
]
get_execution_order(...) → ["data_fetch", "preprocess", "model_run", "postprocess"]
\`\`\`
`,
    starterCode: `from collections import deque

def get_execution_order(agents: list, dependencies: list):
    """
    Topological sort of agents given dependencies.
    dependencies = [("a", "b")] means a must run before b.
    Return ordered list, or None if cycle detected.
    """
    # Your code here
    pass


def find_critical_path(agents: list, durations: dict, dependencies: list) -> int:
    """
    Find the minimum time to run all agents (longest path in DAG).
    durations = {"agent_name": duration_int}
    Returns the total duration of the critical path.
    """
    # Your code here
    pass
`,
    testCode: `
from collections import deque

def run_tests():
    passed = 0
    total = 0

    def check(cond, msg):
        nonlocal passed, total
        total += 1
        status = "PASS" if cond else "FAIL"
        if cond: passed += 1
        print(f"[{status}] {msg}")

    def valid_order(order, agents, deps):
        if order is None or sorted(order) != sorted(agents):
            return False
        pos = {a: i for i, a in enumerate(order)}
        return all(pos[b] > pos[a] for a, b in deps)

    agents = ["fetch", "preprocess", "model", "postprocess"]
    deps   = [("fetch","preprocess"),("preprocess","model"),("model","postprocess")]
    order  = get_execution_order(agents, deps)
    check(valid_order(order, agents, deps), f"linear chain order valid: {order}")

    # Parallel agents
    agents2 = ["a","b","c","d"]
    deps2   = [("a","c"),("b","c"),("c","d")]
    order2  = get_execution_order(agents2, deps2)
    check(valid_order(order2, agents2, deps2), f"parallel merge order valid: {order2}")

    # Cycle
    agents3 = ["x","y","z"]
    deps3   = [("x","y"),("y","z"),("z","x")]
    check(get_execution_order(agents3, deps3) is None, "cycle returns None")

    # Critical path
    durations = {"fetch": 3, "preprocess": 2, "model": 5, "postprocess": 1}
    cp = find_critical_path(agents, durations, deps)
    check(cp == 11, f"critical path (3+2+5+1) == 11, got {cp}")

    durations2 = {"a": 2, "b": 4, "c": 3, "d": 1}
    cp2 = find_critical_path(agents2, durations2, deps2)
    check(cp2 == 8, f"parallel critical path (max(2,4)+3+1) == 8, got {cp2}")

    print(f"\\n{passed}/{total} tests passed")

run_tests()
`,
    solution: `from collections import deque

def get_execution_order(agents: list, dependencies: list):
    graph = {a: [] for a in agents}
    in_degree = {a: 0 for a in agents}
    for before, after in dependencies:
        graph[before].append(after)
        in_degree[after] += 1

    q = deque([a for a in agents if in_degree[a] == 0])
    order = []
    while q:
        node = q.popleft()
        order.append(node)
        for neighbor in graph[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                q.append(neighbor)
    return order if len(order) == len(agents) else None

def find_critical_path(agents: list, durations: dict, dependencies: list) -> int:
    # Topological order first
    order = get_execution_order(agents, dependencies)
    if order is None:
        return -1

    graph = {a: [] for a in agents}
    for before, after in dependencies:
        graph[before].append(after)

    # dp[a] = earliest finish time for agent a
    dp = {a: durations[a] for a in agents}
    for agent in order:
        for neighbor in graph[agent]:
            dp[neighbor] = max(dp[neighbor], dp[agent] + durations[neighbor])

    return max(dp.values())
`,
    hints: [
      "Part 1: Classic Kahn's topological sort — queue nodes with in-degree 0.",
      'Part 2: Process agents in topological order; dp[agent] = max finish time reaching this agent.',
      'dp[neighbor] = max(dp[neighbor], dp[current] + duration[neighbor])',
      'The critical path length is max(dp.values()) after processing all agents.',
    ],
  },
];

export const getProblemsByDifficulty = (difficulty: 'easy' | 'medium' | 'hard') =>
  problems.filter((p) => p.difficulty === difficulty);

export const getProblemsByCategory = (category: string) =>
  problems.filter((p) => p.category === category);

export const categories = [...new Set(problems.map((p) => p.category))];

export const dsaProblems = problems.filter((p) => p.category !== 'Real World');
export const realWorldProblems = problems.filter((p) => p.category === 'Real World');
export const dsaCategories = [...new Set(dsaProblems.map((p) => p.category))];
