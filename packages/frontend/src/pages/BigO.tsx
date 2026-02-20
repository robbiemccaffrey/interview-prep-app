import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

interface Example {
  id: number;
  title: string;
  category: string;
  code: string;
  timeComplexity: string;
  spaceComplexity: string;
  timeExplanation: string;
  spaceExplanation: string;
}

const COMPLEXITY_OPTIONS = [
  'O(1)',
  'O(log n)',
  'O(n)',
  'O(n log n)',
  'O(n²)',
  'O(n³)',
  'O(2ⁿ)',
  'O(n!)',
];

const examples: Example[] = [
  {
    id: 1,
    title: 'Linear Search',
    category: 'Loops',
    code: '```python\ndef find_element(arr, target):\n    for x in arr:\n        if x == target:\n            return True\n    return False\n```',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    timeExplanation: 'We visit each element at most once. Worst case: all n elements are checked.',
    spaceExplanation: 'Only a loop variable — no extra memory proportional to input size.',
  },
  {
    id: 2,
    title: 'Pair Sum Check (Brute Force)',
    category: 'Loops',
    code: '```python\ndef has_pair_sum(arr, target):\n    for i in range(len(arr)):\n        for j in range(i + 1, len(arr)):\n            if arr[i] + arr[j] == target:\n                return True\n    return False\n```',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    timeExplanation: 'Two nested loops — the outer runs n times, the inner runs up to n times → O(n²) comparisons.',
    spaceExplanation: 'Only index variables. No data structures scaling with n.',
  },
  {
    id: 3,
    title: 'Triple Sum Check',
    category: 'Loops',
    code: '```python\ndef triple_sum(arr, target):\n    n = len(arr)\n    for i in range(n):\n        for j in range(i + 1, n):\n            for k in range(j + 1, n):\n                if arr[i] + arr[j] + arr[k] == target:\n                    return True\n    return False\n```',
    timeComplexity: 'O(n³)',
    spaceComplexity: 'O(1)',
    timeExplanation: 'Three nested loops, each running up to n times → O(n³) iterations.',
    spaceExplanation: 'Only index variables used — constant extra space.',
  },
  {
    id: 4,
    title: 'Two Independent Loops',
    category: 'Loops',
    code: '```python\ndef process(arr):\n    total = 0\n    for x in arr:\n        total += x\n\n    result = []\n    for x in arr:\n        result.append(x * 2)\n\n    return total, result\n```',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    timeExplanation: 'Two separate loops, each O(n). O(n) + O(n) = O(2n) = O(n). They don\'t multiply.',
    spaceExplanation: '`result` grows linearly with input size → O(n) space.',
  },
  {
    id: 5,
    title: 'Halving Loop',
    category: 'Loops',
    code: '```python\ndef count_halvings(n):\n    count = 0\n    while n > 1:\n        n //= 2\n        count += 1\n    return count\n```',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    timeExplanation: 'n is halved each iteration. It takes log₂(n) steps to reach 1.',
    spaceExplanation: 'Only `count` and `n` are stored — constant space.',
  },
  {
    id: 6,
    title: 'Binary Search (Iterative)',
    category: 'Searching',
    code: '```python\ndef binary_search(arr, target):\n    left, right = 0, len(arr) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1\n```',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    timeExplanation: 'Search space is halved each iteration → log₂(n) iterations.',
    spaceExplanation: 'Only a few pointer variables — no call stack growth.',
  },
  {
    id: 7,
    title: 'Binary Search (Recursive)',
    category: 'Searching',
    code: '```python\ndef binary_search(arr, target, left, right):\n    if left > right:\n        return -1\n    mid = (left + right) // 2\n    if arr[mid] == target:\n        return mid\n    elif arr[mid] < target:\n        return binary_search(arr, target, mid + 1, right)\n    else:\n        return binary_search(arr, target, left, mid - 1)\n```',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(log n)',
    timeExplanation: 'Same as iterative — search space halves each call → O(log n) calls.',
    spaceExplanation: 'Each recursive call adds a frame to the call stack. Depth = O(log n).',
  },
  {
    id: 8,
    title: 'Factorial (Recursive)',
    category: 'Recursion',
    code: '```python\ndef factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)\n```',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    timeExplanation: 'One recursive call per integer from n down to 1 → n total calls.',
    spaceExplanation: 'Call stack depth is n — each call waits for the next to return.',
  },
  {
    id: 9,
    title: 'Fibonacci (Naive Recursive)',
    category: 'Recursion',
    code: '```python\ndef fib(n):\n    if n <= 1:\n        return n\n    return fib(n - 1) + fib(n - 2)\n```',
    timeComplexity: 'O(2ⁿ)',
    spaceComplexity: 'O(n)',
    timeExplanation: 'Each call spawns two more calls, creating a binary tree of depth n → ~2ⁿ nodes.',
    spaceExplanation: 'Maximum call stack depth is n (the leftmost branch fib(n) → fib(n-1) → ...).',
  },
  {
    id: 10,
    title: 'Fibonacci (Memoized)',
    category: 'Recursion',
    code: '```python\ndef fib(n, memo={}):\n    if n in memo:\n        return memo[n]\n    if n <= 1:\n        return n\n    memo[n] = fib(n - 1, memo) + fib(n - 2, memo)\n    return memo[n]\n```',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    timeExplanation: 'Each subproblem is computed once and cached → n unique subproblems.',
    spaceExplanation: 'Memo dict stores n entries + call stack depth up to n → O(n).',
  },
  {
    id: 11,
    title: 'Merge Sort',
    category: 'Sorting',
    code: '```python\ndef merge_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    mid = len(arr) // 2\n    left = merge_sort(arr[:mid])\n    right = merge_sort(arr[mid:])\n    return merge(left, right)  # O(n) merge step\n```',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    timeExplanation: 'The array is divided log n times (tree height), and each level does O(n) merge work → O(n log n).',
    spaceExplanation: 'Auxiliary arrays at each merge level total O(n) at any point in time.',
  },
  {
    id: 12,
    title: 'Bubble Sort',
    category: 'Sorting',
    code: '```python\ndef bubble_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        for j in range(0, n - i - 1):\n            if arr[j] > arr[j + 1]:\n                arr[j], arr[j + 1] = arr[j + 1], arr[j]\n    return arr\n```',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    timeExplanation: 'Two nested loops: O(n) outer × O(n) inner comparisons = O(n²).',
    spaceExplanation: 'Sorted in-place using only a temp swap variable.',
  },
  {
    id: 13,
    title: 'Insertion Sort',
    category: 'Sorting',
    code: '```python\ndef insertion_sort(arr):\n    for i in range(1, len(arr)):\n        key = arr[i]\n        j = i - 1\n        while j >= 0 and arr[j] > key:\n            arr[j + 1] = arr[j]\n            j -= 1\n        arr[j + 1] = key\n    return arr\n```',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    timeExplanation: 'Worst case: each element shifts past all previous elements → O(n²) total shifts.',
    spaceExplanation: 'Sorted in-place — only `key` and index variables.',
  },
  {
    id: 14,
    title: 'Fast Power (Divide & Conquer)',
    category: 'Recursion',
    code: '```python\ndef power(base, exp):\n    if exp == 0:\n        return 1\n    if exp % 2 == 0:\n        half = power(base, exp // 2)\n        return half * half\n    return base * power(base, exp - 1)\n```',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(log n)',
    timeExplanation: 'exp is halved each even step → O(log n) recursive calls.',
    spaceExplanation: 'Call stack depth matches recursion depth → O(log n).',
  },
  {
    id: 15,
    title: 'Two Pointers',
    category: 'Data Structures',
    code: '```python\ndef two_sum_sorted(arr, target):\n    left, right = 0, len(arr) - 1\n    while left < right:\n        s = arr[left] + arr[right]\n        if s == target:\n            return (left, right)\n        elif s < target:\n            left += 1\n        else:\n            right -= 1\n    return None\n```',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    timeExplanation: 'Two pointers move toward each other; combined they traverse at most n elements.',
    spaceExplanation: 'Only two pointer variables — no auxiliary data structure.',
  },
  {
    id: 16,
    title: 'Find Duplicates with Hash Set',
    category: 'Data Structures',
    code: '```python\ndef has_duplicate(arr):\n    seen = set()\n    for x in arr:\n        if x in seen:\n            return True\n        seen.add(x)\n    return False\n```',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    timeExplanation: 'One pass through the array; each hash set operation is O(1) average.',
    spaceExplanation: '`seen` can grow to hold up to n elements.',
  },
  {
    id: 17,
    title: 'Build Prefix Sum Array',
    category: 'Data Structures',
    code: '```python\ndef prefix_sum(arr):\n    n = len(arr)\n    prefix = [0] * (n + 1)\n    for i in range(n):\n        prefix[i + 1] = prefix[i] + arr[i]\n    return prefix\n```',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    timeExplanation: 'One pass through arr to fill n+1 values.',
    spaceExplanation: '`prefix` array has n+1 elements → O(n) extra space.',
  },
  {
    id: 18,
    title: 'Hash Map Lookup',
    category: 'Data Structures',
    code: '```python\ndef two_sum(nums, target):\n    seen = {}  # {value: index}\n    for i, x in enumerate(nums):\n        complement = target - x\n        if complement in seen:\n            return [seen[complement], i]\n        seen[x] = i\n    return []\n```',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    timeExplanation: 'Single pass; each hash map lookup/insert is O(1) average → O(n) total.',
    spaceExplanation: '`seen` stores up to n key-value pairs.',
  },
  {
    id: 19,
    title: 'Matrix Transpose In-Place',
    category: 'Data Structures',
    code: '```python\ndef transpose(matrix):\n    n = len(matrix)\n    for i in range(n):\n        for j in range(i + 1, n):\n            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]\n    return matrix\n```',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    timeExplanation: 'We swap each pair (i,j) where j > i — roughly n²/2 swaps → O(n²).',
    spaceExplanation: 'In-place swap using tuple unpacking — no extra array needed.',
  },
  {
    id: 20,
    title: 'Matrix Multiplication (n×n)',
    category: 'Data Structures',
    code: '```python\ndef multiply(A, B, n):\n    C = [[0] * n for _ in range(n)]\n    for i in range(n):\n        for j in range(n):\n            for k in range(n):\n                C[i][j] += A[i][k] * B[k][j]\n    return C\n```',
    timeComplexity: 'O(n³)',
    spaceComplexity: 'O(n²)',
    timeExplanation: 'Three nested loops each of size n → O(n³) multiplications.',
    spaceExplanation: 'Result matrix C has n² entries.',
  },
  {
    id: 21,
    title: 'Power Set',
    category: 'Math & Combinatorics',
    code: '```python\ndef power_set(s):\n    result = [[]]\n    for elem in s:\n        result += [subset + [elem] for subset in result]\n    return result\n```',
    timeComplexity: 'O(2ⁿ)',
    spaceComplexity: 'O(2ⁿ)',
    timeExplanation: 'Each element doubles the number of subsets → 2ⁿ subsets generated.',
    spaceExplanation: 'Storing all 2ⁿ subsets in result.',
  },
  {
    id: 22,
    title: 'Generate All Permutations',
    category: 'Math & Combinatorics',
    code: '```python\ndef permutations(arr, start=0):\n    if start == len(arr) - 1:\n        yield arr[:]\n        return\n    for i in range(start, len(arr)):\n        arr[start], arr[i] = arr[i], arr[start]\n        yield from permutations(arr, start + 1)\n        arr[start], arr[i] = arr[i], arr[start]\n```',
    timeComplexity: 'O(n!)',
    spaceComplexity: 'O(n)',
    timeExplanation: 'There are n! permutations of n elements, and we visit each one once.',
    spaceExplanation: 'Permutations are generated in-place; call stack depth is n.',
  },
  {
    id: 23,
    title: 'Count Digits',
    category: 'Math & Combinatorics',
    code: '```python\ndef count_digits(n):\n    if n == 0:\n        return 1\n    count = 0\n    while n > 0:\n        n //= 10\n        count += 1\n    return count\n```',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    timeExplanation: 'We divide by 10 each iteration — the number of decimal digits is ⌊log₁₀(n)⌋ + 1.',
    spaceExplanation: 'Only `count` and `n` stored.',
  },
  {
    id: 24,
    title: 'Sum to n (Closed Form)',
    category: 'Math & Combinatorics',
    code: '```python\ndef sum_to_n(n):\n    return n * (n + 1) // 2\n```',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    timeExplanation: 'A single arithmetic formula — no loops or recursion.',
    spaceExplanation: 'No extra memory allocated regardless of n.',
  },
  {
    id: 25,
    title: 'Is Power of Two',
    category: 'Math & Combinatorics',
    code: '```python\ndef is_power_of_two(n):\n    return n > 0 and (n & (n - 1)) == 0\n```',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    timeExplanation: 'A single bitwise AND operation. Powers of 2 have exactly one bit set, so n & (n-1) clears it.',
    spaceExplanation: 'No memory allocation — just a bitwise check.',
  },
  {
    id: 26,
    title: 'Reverse a String',
    category: 'Strings',
    code: '```python\ndef reverse_string(s):\n    result = []\n    for c in s:\n        result.append(c)\n    result.reverse()\n    return "".join(result)\n```',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    timeExplanation: 'We visit each character once → O(n). The join at the end is also O(n).',
    spaceExplanation: '`result` holds a copy of all n characters.',
  },
  {
    id: 27,
    title: 'Check Palindrome',
    category: 'Strings',
    code: '```python\ndef is_palindrome(s):\n    left, right = 0, len(s) - 1\n    while left < right:\n        if s[left] != s[right]:\n            return False\n        left += 1\n        right -= 1\n    return True\n```',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    timeExplanation: 'Two pointers meet in the middle — at most n/2 comparisons.',
    spaceExplanation: 'Only two index variables used.',
  },
  {
    id: 28,
    title: 'String Concatenation in Loop',
    category: 'Strings',
    code: '```python\ndef build_string(chars):\n    result = ""\n    for c in chars:\n        result += c  # creates a new string each time\n    return result\n```',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(n)',
    timeExplanation: 'In Python (and many languages), strings are immutable. Each `+=` copies the existing string → 1 + 2 + ... + n = O(n²) total work.',
    spaceExplanation: 'Final string is length n. Intermediate copies are garbage-collected → O(n) peak.',
  },
  {
    id: 29,
    title: 'Sliding Window (Fixed Size)',
    category: 'Data Structures',
    code: '```python\ndef max_subarray_sum(arr, k):\n    window_sum = sum(arr[:k])\n    max_sum = window_sum\n    for i in range(k, len(arr)):\n        window_sum += arr[i] - arr[i - k]\n        max_sum = max(max_sum, window_sum)\n    return max_sum\n```',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    timeExplanation: 'Initial window build is O(k), then one pass of n-k steps. Total O(n).',
    spaceExplanation: 'Only `window_sum` and `max_sum` — no auxiliary array.',
  },
  {
    id: 30,
    title: 'Heap Insert',
    category: 'Data Structures',
    code: '```python\ndef heap_insert(heap, val):\n    heap.append(val)\n    i = len(heap) - 1\n    while i > 0:\n        parent = (i - 1) // 2\n        if heap[parent] > heap[i]:\n            heap[parent], heap[i] = heap[i], heap[parent]\n            i = parent\n        else:\n            break\n```',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    timeExplanation: 'We bubble up from leaf to root. Heap height = O(log n) swaps in the worst case.',
    spaceExplanation: 'In-place operation — only `i` and `parent` index variables.',
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  Loops: 'bg-blue-900/40 text-blue-300 border-blue-800',
  Searching: 'bg-purple-900/40 text-purple-300 border-purple-800',
  Recursion: 'bg-orange-900/40 text-orange-300 border-orange-800',
  Sorting: 'bg-pink-900/40 text-pink-300 border-pink-800',
  'Data Structures': 'bg-teal-900/40 text-teal-300 border-teal-800',
  'Math & Combinatorics': 'bg-yellow-900/40 text-yellow-300 border-yellow-800',
  Strings: 'bg-indigo-900/40 text-indigo-300 border-indigo-800',
};

export default function BigO() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeAnswer, setTimeAnswer] = useState('');
  const [spaceAnswer, setSpaceAnswer] = useState('');
  const [checked, setChecked] = useState(false);
  const [results, setResults] = useState<Record<number, { timeOk: boolean; spaceOk: boolean }>>(
    {}
  );

  const example = examples[currentIndex];
  const totalChecked = Object.keys(results).length;
  const totalCorrect = Object.values(results).filter((r) => r.timeOk && r.spaceOk).length;

  const timeOk = timeAnswer === example.timeComplexity;
  const spaceOk = spaceAnswer === example.spaceComplexity;

  function handleCheck() {
    if (!timeAnswer || !spaceAnswer) return;
    setChecked(true);
    setResults((prev) => ({
      ...prev,
      [example.id]: { timeOk, spaceOk },
    }));
  }

  function goTo(idx: number) {
    setCurrentIndex(idx);
    setTimeAnswer('');
    setSpaceAnswer('');
    setChecked(false);
  }

  function handleNext() {
    if (currentIndex < examples.length - 1) goTo(currentIndex + 1);
  }

  function handlePrev() {
    if (currentIndex > 0) goTo(currentIndex - 1);
  }

  const prevResult = results[example.id];

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">⏱</span>
          <h1 className="text-3xl font-bold text-white">Big O Complexity Quiz</h1>
        </div>
        <p className="text-gray-400 max-w-2xl">
          Read each code snippet and identify its time and space complexity. Select your answers
          and check to see if you're right. Work through all 30 examples to master complexity
          analysis.
        </p>
      </div>

      {/* Score bar */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div>
            <span className="text-xs text-gray-500 uppercase tracking-wider">Progress</span>
            <div className="text-lg font-mono text-white mt-0.5">
              {currentIndex + 1}{' '}
              <span className="text-gray-500">/ {examples.length}</span>
            </div>
          </div>
          <div className="w-px h-8 bg-gray-700" />
          <div>
            <span className="text-xs text-gray-500 uppercase tracking-wider">Score</span>
            <div className="text-lg font-mono text-emerald-400 mt-0.5">
              {totalCorrect}{' '}
              <span className="text-gray-500">/ {totalChecked} checked</span>
            </div>
          </div>
        </div>
        {/* Mini progress dots */}
        <div className="hidden md:flex gap-1 flex-wrap max-w-xs justify-end">
          {examples.map((ex, i) => {
            const r = results[ex.id];
            return (
              <button
                key={ex.id}
                onClick={() => goTo(i)}
                title={ex.title}
                className={`w-3 h-3 rounded-full transition-colors ${
                  i === currentIndex
                    ? 'bg-white ring-1 ring-emerald-400'
                    : r
                    ? r.timeOk && r.spaceOk
                      ? 'bg-emerald-500'
                      : 'bg-red-500'
                    : 'bg-gray-700 hover:bg-gray-500'
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Quiz card */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        {/* Card header */}
        <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-gray-500 font-mono text-sm">#{example.id}</span>
            <h2 className="text-white font-semibold">{example.title}</h2>
            <span
              className={`text-xs px-2 py-0.5 rounded-full border ${
                CATEGORY_COLORS[example.category] ?? 'bg-gray-800 text-gray-400 border-gray-700'
              }`}
            >
              {example.category}
            </span>
          </div>
          {prevResult && !checked && (
            <span
              className={`text-xs px-2.5 py-1 rounded-full border ${
                prevResult.timeOk && prevResult.spaceOk
                  ? 'bg-emerald-900/30 text-emerald-400 border-emerald-800'
                  : 'bg-red-900/30 text-red-400 border-red-800'
              }`}
            >
              {prevResult.timeOk && prevResult.spaceOk ? '✓ Correct' : '✗ Incorrect'}
            </span>
          )}
        </div>

        {/* Code */}
        <div className="px-6 pt-4 pb-2">
          <ReactMarkdown
            rehypePlugins={[rehypeHighlight]}
            components={{
              pre: ({ children }) => (
                <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
                  {children}
                </pre>
              ),
            }}
          >
            {example.code}
          </ReactMarkdown>
        </div>

        {/* Answer inputs */}
        <div className="px-6 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Time */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">
                Time Complexity
              </label>
              <select
                value={timeAnswer}
                onChange={(e) => {
                  if (!checked) setTimeAnswer(e.target.value);
                }}
                disabled={checked}
                className={`w-full bg-gray-800 border rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors ${
                  checked
                    ? timeOk
                      ? 'border-emerald-500 text-emerald-400'
                      : 'border-red-500 text-red-400'
                    : 'border-gray-700 text-gray-300 focus:border-emerald-500'
                }`}
              >
                <option value="">Select complexity…</option>
                {COMPLEXITY_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              {checked && (
                <div
                  className={`mt-2 text-xs px-3 py-2 rounded-lg ${
                    timeOk
                      ? 'bg-emerald-900/30 text-emerald-300 border border-emerald-800'
                      : 'bg-red-900/30 text-red-300 border border-red-800'
                  }`}
                >
                  {timeOk ? (
                    <>✓ Correct — {example.timeComplexity}</>
                  ) : (
                    <>
                      ✗ Answer: <strong>{example.timeComplexity}</strong>
                    </>
                  )}
                  <p className="mt-1 text-gray-400">{example.timeExplanation}</p>
                </div>
              )}
            </div>

            {/* Space */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">
                Space Complexity
              </label>
              <select
                value={spaceAnswer}
                onChange={(e) => {
                  if (!checked) setSpaceAnswer(e.target.value);
                }}
                disabled={checked}
                className={`w-full bg-gray-800 border rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors ${
                  checked
                    ? spaceOk
                      ? 'border-emerald-500 text-emerald-400'
                      : 'border-red-500 text-red-400'
                    : 'border-gray-700 text-gray-300 focus:border-emerald-500'
                }`}
              >
                <option value="">Select complexity…</option>
                {COMPLEXITY_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              {checked && (
                <div
                  className={`mt-2 text-xs px-3 py-2 rounded-lg ${
                    spaceOk
                      ? 'bg-emerald-900/30 text-emerald-300 border border-emerald-800'
                      : 'bg-red-900/30 text-red-300 border border-red-800'
                  }`}
                >
                  {spaceOk ? (
                    <>✓ Correct — {example.spaceComplexity}</>
                  ) : (
                    <>
                      ✗ Answer: <strong>{example.spaceComplexity}</strong>
                    </>
                  )}
                  <p className="mt-1 text-gray-400">{example.spaceExplanation}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 py-4 border-t border-gray-800 flex items-center justify-between gap-4">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="px-4 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            ← Prev
          </button>

          <div className="flex gap-3">
            {!checked ? (
              <button
                onClick={handleCheck}
                disabled={!timeAnswer || !spaceAnswer}
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg transition-colors"
              >
                Check Answer
              </button>
            ) : (
              <div
                className={`px-6 py-2 rounded-lg text-sm font-semibold ${
                  timeOk && spaceOk
                    ? 'bg-emerald-900/50 text-emerald-300 border border-emerald-700'
                    : 'bg-red-900/50 text-red-300 border border-red-700'
                }`}
              >
                {timeOk && spaceOk ? '🎉 Both correct!' : timeOk || spaceOk ? '⚠ Partially correct' : '✗ Try again next time'}
              </div>
            )}
          </div>

          <button
            onClick={handleNext}
            disabled={currentIndex === examples.length - 1}
            className="px-4 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Next →
          </button>
        </div>
      </div>

      {/* Complexity cheat sheet */}
      <div className="mt-8 bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h3 className="text-white font-semibold mb-4">Big O Quick Reference</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left text-gray-400 font-medium pb-2 pr-4">Complexity</th>
                <th className="text-left text-gray-400 font-medium pb-2 pr-4">Name</th>
                <th className="text-left text-gray-400 font-medium pb-2 pr-4">n=10</th>
                <th className="text-left text-gray-400 font-medium pb-2">Example</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {[
                { complexity: 'O(1)', name: 'Constant', n10: '1', example: 'Hash map lookup, array index' },
                { complexity: 'O(log n)', name: 'Logarithmic', n10: '3', example: 'Binary search, heap ops' },
                { complexity: 'O(n)', name: 'Linear', n10: '10', example: 'Single loop, linear scan' },
                { complexity: 'O(n log n)', name: 'Linearithmic', n10: '33', example: 'Merge sort, heap sort' },
                { complexity: 'O(n²)', name: 'Quadratic', n10: '100', example: 'Nested loops, bubble sort' },
                { complexity: 'O(n³)', name: 'Cubic', n10: '1,000', example: 'Triple nested loops, naive matrix mult' },
                { complexity: 'O(2ⁿ)', name: 'Exponential', n10: '1,024', example: 'Naive fibonacci, power set' },
                { complexity: 'O(n!)', name: 'Factorial', n10: '3,628,800', example: 'All permutations, TSP brute force' },
              ].map(({ complexity, name, n10, example }) => (
                <tr key={complexity}>
                  <td className="py-2 pr-4 font-mono text-emerald-400">{complexity}</td>
                  <td className="py-2 pr-4 text-gray-300">{name}</td>
                  <td className="py-2 pr-4 text-gray-400 font-mono">{n10}</td>
                  <td className="py-2 text-gray-500">{example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
