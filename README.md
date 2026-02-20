# Interview Prep App

A full-stack monorepo interview prep app with:
- **Learn** — 10 DS&A topics with complexity tables and annotated code examples
- **Practice** — 24 coding problems (easy/medium/hard) with a live in-browser Python runner (Pyodide/WebAssembly)

## Quick Start

```bash
cd interview-prep-app
npm install
npm run dev        # starts frontend (port 5173) + backend (port 3001)
```

Or run individually:
```bash
npm run dev:frontend   # port 5173
npm run dev:backend    # port 3001
```

## Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18, TypeScript, Vite |
| Routing | React Router v6 |
| Editor | Monaco Editor |
| Python Runtime | Pyodide (WebAssembly, in-browser) |
| Styling | Tailwind CSS + @tailwindcss/typography |
| Markdown | react-markdown + rehype-highlight |
| Backend | Express + TypeScript |

## Problems

- **Easy (5):** Palindrome Permutation, String Compression, Remove Dups, Stack Min, Triple Step
- **Medium (10):** One Away, Rotate Matrix, Partition List, Sum Lists, Sort Stack, BFS Path, Balanced BST, Magic Index, Coin Change, Topological Sort
- **Hard (9):** Loop Detection, List of Depths, Validate BST, First Common Ancestor, Permutations, Event Log Analyzer, Rate Limiter, Agent Workflow Dependencies

## Features

- Live Python execution via Pyodide (no server needed)
- Monaco editor with Python syntax highlighting
- Test runner with pass/fail output per test case
- Progress tracking via localStorage (no auth required)
- Show/hide solution and collapsible hints
- Dark theme throughout
