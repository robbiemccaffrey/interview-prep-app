# Interview Prep Notes - Complete

## Hash Tables
- Implemented as Array with linked lists 
    - Can also be implemented as binary search tree which saves on space but has a look up as O(logN)
        - This can be beneficial if we want to do range queries e.g having keys ordered and find neighbours
- Hash tables need to be resized
    - Java size* 2 
    - Typescript & Python size* 1.2-1.5 
    - This also means they waste space
    - Load factor: Typically resize when load factor > 0.75 (Java) or 0.7-0.8 (Python)
- Hash table lookup is O(1) **average case**, but O(n) worst case (when all keys hash to same bucket)
- Example of hash
- hash = hash * 31 + c
    - c is for the character so we know order of the letters because multiples doesn't care about order 
- Deal with collisions 
    - Use linked lists 
        - Worst case O(n)
    - Could chain with binary search tree
        - Worst case O(log n)
- Open Addressing (Linear Probing)
  •	Store all keys directly in the array (no chaining).
  •	On collision, check next slots sequentially:
  i, i+1, i+2... (mod capacity) until empty.
  •	Clustering: Consecutive filled slots form clusters, which grow and increase probe time.
  •	Fast when load factor is low, but slows as table fills.
  •	Improvements: Quadratic probing or double hashing to reduce clustering.

## String Builder
- Always use a string builder when concatenating strings otherwise you'll double the space each time you concat 
- Use list + `join()` instead of string concatenation for better performance (Python optimization)

## Arrays
- **Fundamentals:**
  - Fixed size (static) vs dynamic arrays
  - Dynamic arrays (ArrayList, vector) resize by doubling
  - Access: O(1), Insert/Delete at end: O(1) amortized, Insert/Delete at middle: O(n)
  
- **Common Techniques:**
  - **Two-pointer technique**: Start from both ends or move at different speeds
    - One pointer from start, one from end: Used in palindrome checking, two-sum on sorted arrays
    - Two pointers moving at different speeds: Used in loop detection (fast/slow pointers)
    - Two pointers moving together: Used in "one edit away" problem - compare strings with offset when lengths differ
    - Used for: palindrome checking, sorted array problems, removing duplicates
    - Time: O(n), Space: O(1)
  - **Sliding window**: Maintain a window of elements
    - Used for: substring problems, maximum/minimum in subarray
  - **Prefix sums**: Precompute cumulative sums
    - Used for: range sum queries in O(1)
  - **Binary search on sorted arrays**: O(log n) search
    - Can be applied to rotated arrays, finding boundaries
    - **Binary search for answer**: When answer space is monotonic

- **Character Frequency Counting**
  - Use hash map/dictionary to count character frequencies
  - Useful for: palindrome permutation, anagram detection, string compression
  - Example: Count chars, check if at most one has odd count (palindrome check)

- **String Compression**
  - Iterate through string, count consecutive characters
  - Use list + join() instead of string concatenation for better performance
  - Check if compressed length < original before returning

- **Matrix Rotation (In-Place)**
  - Rotate 90 degrees clockwise: work layer by layer from outside to inside
  - For each layer, rotate 4 elements in a cycle
  - Formula: `new_row = old_col`, `new_col = size - old_row - 1`
  - Time: O(n²), Space: O(1)

## Linked List
- Fast inserts and deletes O(1) if you know where it is 
    - Arrays dont have this as they have to shift elements 
- Grow and shrink easily no resizing 
- Used to implement other data structures 
    - Stacks 
    - Queues 
    - Hash map buckets 
    - LRU caches 
        - Made with hash map and linked list 
            - MRU is at the front of the linked list and LRU is at the tail, its get evicted when full

- **Hash Set for Node Tracking**
  - Store visited nodes in a set to detect duplicates or intersections
  - Used in: remove duplicates, finding intersection point
  - Time: O(n), Space: O(n)
  - **Important**: For intersection, compare node references (identity), not values

- **Fast and Slow Pointers (Floyd's Cycle Detection)**
  - **Detecting cycles**: Move slow pointer 1 step, fast pointer 2 steps
  - If they meet, cycle exists
  - **Finding cycle start**: After detecting cycle, reset slow to head, move both 1 step until they meet
  - Time: O(n), Space: O(1) - no extra space needed!
  - Used in: loop detection, finding middle of list, detecting palindrome in list

- **Doubly Linked Lists**
  - Nodes have both `next` and `prev` pointers
  - Allows O(1) deletion if you have reference to node
  - More memory overhead but useful for certain operations

- **Node Reference vs Value Comparison**
  - **Reference comparison**: `node_a is node_b` (same object in memory)
  - **Value comparison**: `node_a.value == node_b.value` (same data)
  - For intersection problems, use reference comparison

## Stacks & Queue
- A stack is LIFO and is implemented using a linked list 
    - Pop, peek, push 
    - Every recursive function uses the call stack to push the state of the function and then pops when its return 
- Queues is FIFO and is implemented as a linked list 
    - add, remove, peek 
    - In BFS
        - We use a queue to store the list of nodes we need to search, each time we visit a node we add its adjacent nodes to the end of the queue 

- **Min Stack Pattern**
  - Maintain two stacks: one for data, one for minimums
  - When pushing: push to data stack, push to min stack only if value <= current min
  - When popping: pop from data stack, pop from min stack if popped value equals current min
  - All operations (push, pop, min) in O(1) time

- **Sorting a Stack**
  - Use a temporary stack
  - Pop from original, insert into temp stack in sorted order (may need to pop back)
  - Time: O(n²), Space: O(n) for temporary stack

- **Multiple Stacks in One Array**
  - Divide array into segments for each stack
  - Track top pointer for each stack
  - Handle overflow by resizing or throwing error

- **Deque (Double-ended queue)**: O(1) operations at both ends
  - Use `collections.deque` for queues (O(1) append/popleft) in Python

## Trees and Graphs

### A tree
- Has a root node, the root node has zero or more children and each child has zero or more child nodes

### A binary tree
- Each node has up to 2 children 

### A binary search tree is a binary tree with specific properties 
- All left descendants <= n < all right descendants 

### A balanced tree means that its balanced enough to ensure O (log N) insert and find
- RBT and AVL trees

### A complete binary tree
- Every level is full filled except perhaps the last level 

### A full binary tree where every node has zero or two children 

### A perfect binary tree is both full and complete
- 2^K -1 nodes where k is the number of levels

### Tree Properties
- **Height**: Longest path from root to leaf (number of edges)
- **Depth**: Distance from root to node (number of edges)
- **Diameter**: Longest path between any two nodes
- **Level**: Distance from root (root is level 0)

### Traversal 
- **In order**
    - Print left, current, right 
        - traverse(L)
        - Print current
        - Traverse (R)
    - In-order traversal of a BST visits nodes in ascending sorted order
- **Pre order**
    - **Retain** the structure of the tree (typo fix: was "Restrain")
    - Visit current node before children
        - Print current 
        - Traverse (L)
        - Traverse (R)
- **Post order**
    - **Retain** the structure of the tree (typo fix: was "Restrain")
    - Visit current nodes after its children 
        - Traverse (L)
        - Traverse (R)
        - Print current

- **Tree Traversal (Iterative)**
  - All traversals can be done iteratively with explicit stack
  - Level-order (BFS) uses queue

### Tree Construction
- **From sorted array (Balanced BST)**: Always pick middle element as root
  - Recursively build left subtree from left half, right subtree from right half
  - Results in balanced tree (height = log n)
  - Time: O(n), Space: O(n) for tree + O(log n) for recursion
- **From preorder + inorder**: Root from preorder, split inorder by root
- **From postorder + inorder**: Root from postorder, split inorder by root
- **From preorder + postorder**: Ambiguous (need full binary tree or special handling)

### Level-Order (BFS) Tree Insertion
- Insert nodes level by level, left to right
- Use queue to maintain insertion order
- First available left/right child gets the new node
- Time: O(n) worst case, O(1) with optimized queue of incomplete nodes

### BST Validation
- **In-order traversal method**: Traverse in-order, check if sequence is non-decreasing
  - Can optimize to O(h) space by tracking only previous value
- **Min/max bounds method**: Each node must be within (low, high) bounds from ancestors
  - More explicit about constraints
- Both methods: Time O(n), Space O(h) for recursion
- Why checking only local parent-child relationships is insufficient: Local checks ignore ancestor constraints

### In-Order Successor in BST
- **If node has right subtree**: Successor is leftmost node in right subtree
- **If no right subtree**: Move up parent chain until node is a left child, parent is successor
- **If no such parent**: Node is maximum, no successor
- Requires parent pointers
- Time: O(h), Space: O(1)

### Lowest Common Ancestor (LCA)
- **With parent pointers**: 
  1. Get depth of both nodes
  2. Move deeper node up until same depth
  3. Move both up until they meet
- **Without parent pointers**: 
  - DFS from root, return node if found in subtree
  - LCA is node where both subtrees return non-null
- Time: O(h), Space: O(1) with parent pointers, O(h) without

### Subtree Matching
- Find root of T2 in T1 using BFS
- Once found, do simultaneous BFS of both trees to compare structure
- Must match both structure AND values
- Time: O(n * m) worst case where n = T1 size, m = T2 size
- **Better approach**: Serialize both trees using preorder + null markers (e.g., `#`), then check if serialized T2 is a substring of serialized T1 (use KMP for O(n + m)).

### Tree Balance Checking
- **Definition**: Heights of two subtrees differ by at most 1
- **DFS approach**: Check height of left and right subtrees recursively
- Return height if balanced, return error code if unbalanced
- Time: O(n), Space: O(h)

### Tree Problems
- Lowest common ancestor (LCA)
- Tree diameter (two DFS passes)
- Maximum path sum
- Serialize/deserialize binary tree

### Binary Heaps ( Min-heaps )
- A min heap is a complete binary tree 
- The root is the minimum element in the tree
- **Max-heaps** also exist (root is maximum)
- Heaps can be implemented as arrays (not just trees)
  - Parent at index i, children at 2i+1 and 2i+2
  - This makes heaps space-efficient
- Insertion
    - Put it to the rightmost node and then bubble it up 
- Extract min element 
    - We remove the element and swap it with the bottommost right most element then bubble down this element swapping it with its children until the min heap is restored. Always swapping it with the smallest children
    - This takes log ( N )
- **Operations:**
  - Insert: O(log n)
  - Extract min/max: O(log n)
  - Peek: O(1)
  - Decrease key: O(log n) (for Dijkstra's)
- **Use cases:**
  - Dijkstra's algorithm
  - Merge k sorted lists
  - Find k largest/smallest elements
  - Event-driven simulation

### Tries ( Prefix trees) 
- N-ary tree in which characters are stored at each node and the end of a word is described by a *
- A lookup is O(K) where K is the number of characters in the string which is similar to hash map even though it says O(1) as we still need to hash each character 
- Build a Trie (prefix tree) from all words, then run DFS/backtracking from each cell.
    - At each step, check whether the current path is a valid prefix in the trie
    - If not, prune early (stop exploring that path).
- **Trie variations**: Suffix tree, suffix array

### Graph
- A tree is a type of graph but not all graphs are trees 
    - A tree is a connected graph without cycles 
- A graph is a collection of nodes with edges between them
    - Graphs can be either directed or undirected 
        - Directed are one way street 
        - Undirected are like two way
    - A graph may consist of multiple isolated subgraphs
        - If there is a path between every pair of vertices its called a "connected graph"
    - A graph can have cycles, an acyclic graph is one without cycles 

- **Graph Representation**
  - **Adjacency lists** 
      - Most common way to store a graph
          - Exact vertex stores a list of adjacent vertices 
          - In a undirected graph a-> b would be stored twice (a,b) and (b, a)
      - Can be implemented as node classes 
      - Dictionary/array of lists: `graph[node] = [neighbor1, neighbor2, ...]`
      - Space: O(V + E), good for sparse graphs
  - **Adjacency matrices** 
      - An adjacent matrix is a NxN boolean matrix where N is number of nodes and true indicates an edge from i to j.
      - In an undirected graph an adjacent matrix will be symmetric 
      - The same graph algorithms used on adjacency lists (BFS, DFS) can be used with adjacency matrices but may be less efficient. In an adjacency list you can easily iterate through the neighbours of a node, in a matrix you will need to iterate through all nodes identify a nodes neighbour
      - Good for 
          - Dense graphs (otherwise have large lists) 
          - Fast edge existence checks (Matrix[A][B] check) 
          - Weight graphs 
      - Space: O(V²), good for dense graphs, fast edge lookup

### Graph Search 
- Two most common Depth first search and Breadth first search 

- **DFS (Depth-First Search)**
    - Start at the root 
        - Explore each branch completely before moving onto the next branch
        - We go deep first 
    - Use recursion or explicit stack
    - Mark nodes as visited
    - Explores as deep as possible before backtracking
    - **Use cases**: Path finding, cycle detection, topological sort, connected components
    - Time: O(V + E), Space: O(V) for recursion stack
    - DFS preferred if we want to visit every node in the graph

- **BFS (Breadth-First Search)**
    - Start at the root 
        - Explore each neighbour before going on to any of their children
    - Use queue (deque in Python)
    - Mark nodes as visited to avoid cycles
    - Explores level by level
    - **Use cases**: Shortest path (unweighted), level-order traversal, finding all nodes at distance k
    - Time: O(V + E), Space: O(V) for queue and visited set
    - If we want to find the shorted path between two nodes, BFS is generally better

- **DFS Implementation:**
```
Void search(node)
	if node == null: 
		return
	visit(node) # what you want to do
	node.visited = true 
	for child in node.children:
		if child.visited == false:
			search(child)
```

- **BFS Implementation:**
```
void search (root)
	Queue q = new Queue();
	q.add(root);
	while !q.isEmpty():
		Node n = q.pop();
		visit(n)
		for child in n.children:
			if child.marked == false: 
				child.marked = true
				q.add(child);
```
- The key is to use a Queue

- **Bidirectional search**
    - Used to find the shortest path between source and destination node. 
    - Run simultaneous BFS when the search collide we have found a path
    - Bidirectional BFS is faster because instead of expanding one search to depth d, we expand two searches to depth d/2, reducing the explored nodes from O(kᵈ) to O(kᵈ/²).

- **Path Finding (BFS)**
  - BFS naturally finds shortest path in unweighted graphs
  - Track parent pointers to reconstruct path
  - Time: O(V + E), Space: O(V)

### Topological Sort
- In what order can I do things so that all prerequisites are respected 
- a -> b, a must happen before b, if theres a cycle a-> b-> c-> a, this is why is only works on directed acyclic graphs
- **Key insight**
    - Find the tasks with nothing blocking and do them first
- **Algorithm (Kahn's Algorithm)**
    - Count number of incoming neighbours for each node
    - For any node with 0 neighbours incoming add it to the queue 
    - While the queue isn't empty
        - Add the queue item to the result 
        - Look at all of its outgoing neighbors (nodes it points to) and decrement their inbound count by 1
        - If any become to have 0 neighbours 
        - Add them to the queue
    - When finished compare the result to the length of the graph if not the same theres a cycle
    - The run time is O (V + E )
- **Use cases**: Build order, course prerequisites, task scheduling

### Graph Algorithms (Expanded)
- **Shortest Path:**
  - **Dijkstra's Algorithm**: Single-source shortest path in weighted graphs (non-negative weights)
    - Uses priority queue (min-heap)
    - Time: O((V + E) log V) with heap, O(V²) with array
  - **Bellman-Ford**: Handles negative weights, detects negative cycles
    - Time: O(VE)
  - **Floyd-Warshall**: All-pairs shortest path
    - Time: O(V³)
  
- **Minimum Spanning Tree (MST):**
  - **Kruskal's Algorithm**: Sort edges by weight, add if no cycle (use Union-Find)
    - Time: O(E log E)
  - **Prim's Algorithm**: Start from node, add minimum edge connecting to tree
    - Time: O(E log V) with heap
  
- **Union-Find (Disjoint Set Union):**
  - Tracks connected components
  - Operations: Find (with path compression), Union (by rank)
  - Amortized O(α(n)) per operation (α is inverse Ackermann, effectively constant)
  - Used in: Kruskal's, cycle detection, connected components

- **Cycle Detection:**
  - **Undirected graph**: DFS with parent tracking, or Union-Find
  - **Directed graph**: DFS with recursion stack (gray nodes), or topological sort
  - **Cycle Detection in Directed Graphs (DFS with two sets)**:
    - `visiting` (current path) and `visited` (fully processed)
    - If node in `visiting` is encountered again → cycle
    - Move from `visiting` to `visited` when done exploring
    - Time: O(V + E), Space: O(V)
    - **Alternative**: Topological sort - if can't process all nodes, cycle exists

- **Strongly Connected Components (SCC):**
  - Kosaraju's or Tarjan's algorithm
  - Time: O(V + E)

## Recursion & Dynamic Programming

### Memoization (Top-Down DP)
- Cache results of subproblems to avoid recomputation
- Use dictionary/hash map to store computed values
- Example: Triple step problem - cache `count_steps(n)` results
- Time: O(n) with memoization vs O(3ⁿ) without

### Dynamic Programming
- **Core concept**: Break problem into subproblems, store results to avoid recomputation
- **Two approaches:**
  - **Top-down (Memoization)**: Recursive with cache
  - **Bottom-up (Tabulation)**: Iterative, build from base cases
- **Key patterns:**
  - **1D DP**: Fibonacci, climbing stairs, coin change
  - **2D DP**: Longest common subsequence, edit distance, unique paths
  - **Knapsack problems**: 0/1 knapsack, unbounded knapsack
- **When to use**: Overlapping subproblems + optimal substructure

### Binary Search on Sorted Arrays
- **Standard binary search**: O(log n) to find element
- **Binary search for answer**: When answer space is monotonic
- **Magic index problem**: If `array[mid] < mid`, search right; if `array[mid] > mid`, search left
- Can be adapted for non-distinct values by searching both sides

### Powerset Generation (Backtracking)
- Generate all subsets of a set
- Two approaches:
  1. **Include/exclude each element**: For each element, include it or don't
  2. **Build incrementally**: Start with empty set, add elements one by one
- Time: O(2ⁿ), Space: O(2ⁿ) for output

### Permutation Generation
- Generate all arrangements of elements
- Swap elements and recurse, then swap back (backtrack)
- Can use set to deduplicate if needed
- Time: O(n!), Space: O(n!) for output

### Coin Change Problem (DP Pattern)
- **Ways to make change**: Count number of ways to make amount
- **Key insight**: Use max_coin parameter to avoid counting duplicates
- Can solve with recursion + memoization or bottom-up DP table
- Pattern: `ways(n) = ways(n-coin1) + ways(n-coin2) + ...`

### Recursive Multiplication
- Multiply without * operator
- Use bit shifting and addition
- `x * 2 = x << 1` (left shift)
- Break multiplier into powers of 2

### Backtracking
- **Pattern**: Build solution incrementally, backtrack when constraint violated
- **Template:**
```
def backtrack(candidate):
    if is_solution(candidate):
        output(candidate)
        return
    for next_candidate in generate_candidates(candidate):
        if is_valid(next_candidate):
            make_move(next_candidate)
            backtrack(next_candidate)
            unmake_move(next_candidate)  # backtrack
```
- **Common problems**: N-Queens, Sudoku solver, permutations, combinations, subset generation

## Sorting Algorithms
- **Comparison-based:**
  - **Quick Sort**: O(n log n) average, O(n²) worst, in-place, unstable
  - **Merge Sort**: O(n log n) worst, O(n) space, stable
  - **Heap Sort**: O(n log n) worst, in-place, unstable
- **Non-comparison:**
  - **Counting Sort**: O(n + k) where k is range, stable
  - **Radix Sort**: O(d(n + k)) where d is digits
- **When to use which:**
  - Quick sort: General purpose, good average case
  - Merge sort: Need stability, worst-case guarantee
  - Heap sort: In-place with guaranteed O(n log n)

## Greedy Algorithms
- **Strategy**: Make locally optimal choice at each step
- **When it works**: Greedy choice property + optimal substructure
- **Common problems:**
  - Activity selection
  - Fractional knapsack
  - Huffman coding
  - Minimum spanning tree (Prim's, Kruskal's)
  - Interval scheduling

## String Algorithms
- **Pattern Matching:**
  - **KMP (Knuth-Morris-Pratt)**: O(n + m) for pattern matching
    - Build failure function (LPS array) to avoid re-checking
  - **Rabin-Karp**: Rolling hash, O(n + m) average case
  - **Boyer-Moore**: Skip characters, good for long patterns
  
- **String Problems:**
  - Longest common substring/subsequence
  - Edit distance (Levenshtein)
  - Palindrome problems
  - Anagram detection
  - String compression

## Bit Manipulation
- **Common operations:**
  - Get bit: `(num >> i) & 1`
  - Set bit: `num | (1 << i)`
  - Clear bit: `num & ~(1 << i)`
  - Toggle bit: `num ^ (1 << i)`
  - Clear rightmost set bit: `num & (num - 1)`
  
- **Tricks:**
  - Check if power of 2: `(n & (n - 1)) == 0`
  - Count set bits: Brian Kernighan's algorithm
  - XOR properties: `a ^ a = 0`, `a ^ 0 = a`

## Time & Space Complexity
- **Big O notation**: Upper bound (worst case)
- **Big Ω (Omega)**: Lower bound (best case)
- **Big Θ (Theta)**: Tight bound (both upper and lower)
- **Common complexities:**
  - O(1): Constant
  - O(log n): Logarithmic (binary search, heap operations)
  - O(n): Linear (single pass)
  - O(n log n): Linearithmic (sorting, divide & conquer)
  - O(n²): Quadratic (nested loops)
  - O(2ⁿ): Exponential (recursive without memoization)
  - O(n!): Factorial (permutations)

## Additional Data Structures
- **Set**: O(1) average lookup, insert, delete
- **Deque (Double-ended queue)**: O(1) operations at both ends
- **Segment Tree**: Range queries and updates in O(log n)
- **Fenwick Tree (Binary Indexed Tree)**: Range sum queries in O(log n)

## General Patterns & Techniques

### Divide and Conquer
- Break problem into smaller subproblems
- Solve recursively, combine results
- Examples: Merge sort, quick sort, tree construction, binary search
- Often reduces time complexity significantly

### Space-Time Tradeoffs
- **Hash set for O(1) lookup**: Use extra space to reduce time
- **Memoization**: Use space to cache results, avoid recomputation
- **Two-pass algorithms**: Sometimes need to pass through data twice

### Edge Cases to Consider
- Empty input (null, empty string, empty array)
- Single element
- All same elements
- Already sorted/unsorted
- Cycles in graphs/linked lists
- Disconnected graphs
- Skewed trees (worst case for BST)

### Python-Specific Optimizations
- Use `collections.deque` for queues (O(1) append/popleft)
- Use list + `join()` instead of string concatenation
- Use sets for O(1) membership testing
- Use `deepcopy` when needed to avoid reference issues

### Iterative vs Recursive
- **Recursive**: More intuitive, but can cause stack overflow
- **Iterative**: Use explicit stack/queue, more control over memory
- For trees: Recursive is natural, but iterative avoids recursion depth limits
- For graphs: Both work, iterative often preferred for large graphs

## Problem-Solving Strategies
- **Two pointers**: Array/string problems
- **Sliding window**: Subarray/substring problems
- **Prefix/suffix arrays**: Range queries
- **Monotonic stack**: Next greater/smaller element
- **Monotonic queue**: Sliding window maximum/minimum
- **Divide and conquer**: Merge sort, quick sort, binary search
- **Binary search on answer**: When answer space is monotonic

## Common Interview Patterns
1. **Array/String manipulation**: Two pointers, sliding window
2. **Tree problems**: DFS/BFS, recursion
3. **Graph problems**: DFS/BFS, topological sort, shortest path
4. **Dynamic programming**: Identify subproblems, build table
5. **Backtracking**: Generate all solutions, prune invalid paths
6. **Greedy**: Make optimal local choices
7. **Binary search**: Sorted arrays, search space reduction
