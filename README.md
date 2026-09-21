<div align="center">

# DSA Visualizer

**Understand algorithms. One step at a time.**

An interactive web application for learning data structures and algorithms through step-by-step visualizations, beginner-friendly explanations, and real code in 6 programming languages.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

</div>

---

## Features

- **11 algorithms** across 6 categories: Sorting, Searching, Arrays, Strings, Stacks, and Recursion
- **Step-by-step execution** — play, pause, step forward, or jump to any point in the algorithm
- **Real code in 6 languages** — Python, JavaScript, TypeScript, Java, C, and C++ with syntax highlighting
- **Pseudocode viewer** alongside the visualization
- **Interactive input** — enter your own data or generate random inputs
- **Beginner mode** — plain-English explanations for every step
- **Practice problems** — curated LeetCode problems linked to each algorithm
- **Mobile-first design** — works seamlessly on all screen sizes

## Algorithms

| Algorithm | Category | Difficulty | Time Complexity |
|-----------|----------|------------|-----------------|
| Bubble Sort | Sorting | Beginner | O(n^2) |
| Selection Sort | Sorting | Beginner | O(n^2) |
| Insertion Sort | Sorting | Beginner | O(n^2) |
| Linear Search | Searching | Beginner | O(n) |
| Binary Search | Searching | Beginner | O(log n) |
| Array Reversal | Arrays | Beginner | O(n) |
| String Reversal | Strings | Beginner | O(n) |
| Palindrome Check | Strings | Beginner | O(n) |
| Stack Operations | Stacks | Beginner | O(1) |
| Factorial | Recursion | Beginner | O(n) |
| Fibonacci | Recursion | Beginner | O(2^n) |

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org) 16 (App Router)
- **UI:** [React](https://react.dev) 19, [Tailwind CSS](https://tailwindcss.com) 4
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Syntax Highlighting:** [Prism.js](https://prismjs.com)
- **Icons:** [Lucide React](https://lucide.dev)
- **Fonts:** [Geist Sans](https://vercel.com/font) & [Geist Mono](https://vercel.com/font)

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

```bash
git clone https://github.com/OneDev-Harsh/dsa-visualizer.git
cd dsa-visualizer
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production

```bash
npm run build
npm run start
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with Navbar
│   ├── page.tsx                # Landing page with live demo
│   ├── globals.css             # Theme, Prism.js theme, utilities
│   └── algorithms/
│       ├── page.tsx            # Algorithm explorer (search + filter)
│       └── [slug]/
│           └── page.tsx        # Algorithm workspace (visualization + code)
├── components/
│   ├── layout/
│   │   └── Navbar.tsx          # Fixed navbar with mobile menu
│   ├── algorithm/
│   │   ├── AlgorithmControls.tsx   # Play/pause/step/speed controls
│   │   ├── CodeViewer.tsx          # Editor-style code display
│   │   ├── PseudocodeViewer.tsx    # Pseudocode with active line
│   │   ├── StepExplanation.tsx     # Current step details + beginner mode
│   │   ├── InputEditor.tsx         # Custom input editor
│   │   └── PracticeProblems.tsx    # LeetCode problem links
│   └── visualizations/
│       ├── SortingVisualizer.tsx   # Animated bar chart
│       ├── SearchVisualizer.tsx    # Cell-based with range indicators
│       ├── ArrayVisualizer.tsx     # Generic array cells
│       └── StackVisualizer.tsx     # Vertical stack with push/pop animations
└── lib/
    ├── algorithms/
    │   ├── types.ts            # TypeScript types
    │   ├── registry.ts         # All algorithm definitions + code
    │   └── {category}/         # Step generators per algorithm
    └── execution/
        └── execution-engine.ts # Playback state machine
```

## Adding a New Algorithm

1. Create a step generator in `src/lib/algorithms/{category}/`
2. Define the algorithm in `src/lib/algorithms/registry.ts` with code, pseudocode, explanation, and practice problems
3. The visualization auto-routes based on `visualizationType`

## Contributing

Contributions are welcome. Open an issue or submit a pull request.

## License

MIT
