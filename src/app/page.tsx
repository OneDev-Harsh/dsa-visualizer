'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight,
  Play,
  Search,
  Layers,
  Code2,

  BarChart3,
  BookOpen,
  GitBranch,
  Terminal,
  Zap,
  Braces,
  Hash,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const featuredAlgorithms = [
  {
    name: 'Bubble Sort',
    slug: 'bubble-sort',
    category: 'Sorting',
    difficulty: 'Easy',
    tagline: 'Watch adjacent pairs swap their way into order.',
  },
  {
    name: 'Binary Search',
    slug: 'binary-search',
    category: 'Searching',
    difficulty: 'Easy',
    tagline: 'Halve the search space until you find it.',
  },
  {
    name: 'Stack Operations',
    slug: 'stack-operations',
    category: 'Data Structures',
    difficulty: 'Easy',
    tagline: 'LIFO in action — push, pop, peek, repeat.',
  },
];

const steps = [
  {
    icon: Search,
    title: 'Pick an algorithm',
    description:
      'Browse by category — sorting, searching, or data structures. Every card tells you the difficulty up front.',
    color: '#3b82f6',
  },
  {
    icon: Layers,
    title: 'Feed it your data',
    description:
      'Type your own array or use the defaults. Seeing your own numbers makes the lightbulb moment way faster.',
    color: '#8b5cf6',
  },
  {
    icon: Play,
    title: 'Step through it',
    description:
      'Hit play, pause, or step forward one comparison at a time. The animation is the explanation.',
    color: '#22c55e',
  },
  {
    icon: Code2,
    title: 'Read the code alongside',
    description:
      'Python, JS, Java, C, C++, TypeScript — same algorithm, different syntax. The active line highlights as the visual runs.',
    color: '#f59e0b',
  },
];

const features = [
  {
    icon: Zap,
    title: 'Step-by-step execution',
    body: 'Every swap, comparison, and pointer move is its own frame. You never wonder what happened between step 3 and step 4.',
  },
  {
    icon: BookOpen,
    title: 'No jargon without explanation',
    body: 'Terms like "invariant" or "amortized" are defined the first time they appear — and linked to the visual context.',
  },
  {
    icon: Code2,
    title: 'Real code in 6 languages',
    body: 'Not pseudocode. Actual Python, JavaScript, TypeScript, Java, C, and C++ you can copy and run locally.',
  },
  {
    icon: GitBranch,
    title: 'Your own inputs',
    body: 'Enter a custom array or string and watch the algorithm handle it. Nothing teaches faster than seeing your own data.',
  },
  {
    icon: Braces,
    title: 'Practice on LeetCode',
    body: 'Each algorithm links to curated LeetCode problems. You learn it, then you solve it — that sticks.',
  },
  {
    icon: BarChart3,
    title: 'Complexity explained simply',
    body: 'Big-O isn\'t just a formula here. We show the actual operation count climbing as input size grows.',
  },
];

/* ------------------------------------------------------------------ */
/*  LiveSortingDemo — a self-contained bubble sort visualizer          */
/* ------------------------------------------------------------------ */

const INITIAL_VALUES = [7, 3, 8, 1, 5, 2];

function LiveSortingDemo() {
  const [arr, setArr] = useState<number[]>([...INITIAL_VALUES]);
  const [i, setI] = useState(0);
  const [j, setJ] = useState(0);
  const [swapped, setSwapped] = useState(false);
  const [compareIdx, setCompareIdx] = useState<number[]>([]);
  const [sortedIdx, setSortedIdx] = useState<Set<number>>(new Set());
  const [done, setDone] = useState(false);
  const [status, setStatus] = useState('Initializing…');

  useEffect(() => {
    if (done) {
      const t = setTimeout(() => {
        setArr([...INITIAL_VALUES]);
        setI(0);
        setJ(0);
        setSwapped(false);
        setCompareIdx([]);
        setSortedIdx(new Set());
        setDone(false);
        setStatus('Resetting…');
      }, 2200);
      return () => clearTimeout(t);
    }

    const n = arr.length;
    const id = setInterval(() => {
      if (i >= n - 1) {
        setSortedIdx((prev) => new Set([...prev, 0]));
        setDone(true);
        setStatus('Sorted');
        clearInterval(id);
        return;
      }

      if (j >= n - 1 - i) {
        if (!swapped) {
          setSortedIdx((prev) => {
            const next = new Set(prev);
            for (let k = 0; k < n; k++) next.add(k);
            return next;
          });
          setDone(true);
          setStatus('Sorted');
          clearInterval(id);
          return;
        }
        setSortedIdx((prev) => new Set([...prev, n - 1 - i]));
        setI(i + 1);
        setJ(0);
        setSwapped(false);
        return;
      }

      setCompareIdx([j, j + 1]);
      setStatus(`Comparing arr[${j}]=${arr[j]} with arr[${j + 1}]=${arr[j + 1]}`);

      if (arr[j] > arr[j + 1]) {
        setArr((prev) => {
          const next = [...prev];
          [next[j], next[j + 1]] = [next[j + 1], next[j]];
          return next;
        });
        setSwapped(true);
        setStatus(`Swapped arr[${j}] and arr[${j + 1}]`);
      }

      setJ(j + 1);
    }, 650);

    return () => clearInterval(id);
  }, [i, j, swapped, arr, done]);

  const maxVal = Math.max(...arr);

  return (
    <div className="rounded-xl border border-[#1e1e22] bg-[#0c0c0e] overflow-hidden shadow-2xl shadow-black/40">
      {/* Terminal chrome */}
      <div className="flex items-center gap-2 border-b border-[#1e1e22] bg-[#111113] px-3 py-2 sm:px-4 sm:py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57] sm:h-3 sm:w-3" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e] sm:h-3 sm:w-3" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840] sm:h-3 sm:w-3" />
        <span className="ml-2 font-mono text-[10px] text-[#6b6b76] sm:ml-3 sm:text-xs">bubble_sort.py</span>
      </div>

      {/* Bars */}
      <div className="flex items-end justify-center gap-1.5 px-4 pt-6 pb-3 sm:gap-2 sm:px-6 sm:pt-8 sm:pb-4" style={{ minHeight: 140 }}>
        {arr.map((val, idx) => {
          const isCompare = compareIdx.includes(idx);
          const isSorted = sortedIdx.has(idx);
          const isSwapping = isCompare && !isSorted && compareIdx.length === 2 && arr[compareIdx[0]] > arr[compareIdx[1]];

          let barColor = '#3b82f6';
          if (isSorted) barColor = '#22c55e';
          else if (isSwapping) barColor = '#f59e0b';
          else if (isCompare) barColor = '#8b5cf6';

          return (
            <motion.div
              key={idx}
              layout
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className="relative flex flex-col items-center gap-1"
            >
              <motion.div
                className="w-7 rounded-t-md sm:w-10"
                style={{ backgroundColor: barColor }}
                animate={{ height: (val / maxVal) * 80 + 16 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              />
              <span className="font-mono text-[9px] text-[#6b6b76] sm:text-[10px]">{val}</span>
            </motion.div>
          );
        })}
      </div>

      {/* Status line */}
      <div className="border-t border-[#1e1e22] bg-[#111113] px-3 py-1.5 font-mono text-[10px] text-[#6b6b76] sm:px-4 sm:py-2 sm:text-[11px]">
        <span className="text-[#22c55e]">$</span>{' '}
        <span className="text-[#ececec]">{status}</span>
        <span className="ml-1 opacity-40 sm:ml-2">[{arr.join(', ')}]</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-[#ececec]">
      {/* ============================================================ */}
      {/*  HERO                                                        */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden px-4 pt-16 pb-14 sm:px-6 sm:pt-24 sm:pb-20 lg:pt-32 lg:pb-28">
        {/* dot-grid + orbs */}
        <div className="pointer-events-none absolute inset-0 dot-grid opacity-40" />
        <div className="pointer-events-none absolute -left-32 top-1/4 h-[500px] w-[500px] rounded-full bg-[#3b82f6] opacity-[0.06] blur-[120px]" />
        <div className="pointer-events-none absolute -right-24 top-1/2 h-[400px] w-[400px] rounded-full bg-[#8b5cf6] opacity-[0.05] blur-[100px]" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid items-center gap-8 sm:gap-12 lg:grid-cols-[1fr,420px]">
            {/* Left copy */}
            <div className="max-w-2xl">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.08 }}
                className="text-3xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
              >
                Understand algorithms.
                <br />
                <span className="text-[#3b82f6]">One step at a time.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.16 }}
                className="mt-4 max-w-lg text-sm leading-relaxed text-[#8e8e9a] sm:mt-5 sm:text-base"
              >
                Not another algorithm tutorial. This is a visual workspace where you run
                the code, see every step, and actually get it.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.24 }}
                className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8"
              >
                <Link
                  href="/algorithms"
                  className="btn-press focus-ring inline-flex items-center gap-2 rounded-lg bg-[#3b82f6] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#2563eb] sm:px-5"
                >
                  Explore algorithms
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="#how-it-works"
                  className="btn-press focus-ring inline-flex items-center gap-2 rounded-lg border border-[#1e1e22] bg-transparent px-4 py-2.5 text-sm font-medium text-[#ececec] transition-colors hover:bg-[#141416] hover:border-[#333338] sm:px-5"
                >
                  How it works
                </Link>
              </motion.div>

              {/* Meta stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#6b6b76] sm:mt-10"
              >
                <span className="flex items-center gap-1.5">
                  <Hash className="h-3.5 w-3.5" />
                  11 algorithms
                </span>
                <span className="h-3 w-px bg-[#1e1e22]" />
                <span className="flex items-center gap-1.5">
                  <Code2 className="h-3.5 w-3.5" />
                  6 languages
                </span>
                <span className="h-3 w-px bg-[#1e1e22]" />
                <span className="flex items-center gap-1.5">
                  <Play className="h-3.5 w-3.5" />
                  Step-by-step
                </span>
              </motion.div>
            </div>

            {/* Right — live demo */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <LiveSortingDemo />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  HOW IT WORKS                                                */}
      {/* ============================================================ */}
      <section id="how-it-works" className="border-t border-[#1e1e22] px-4 py-14 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-xl sm:mb-14">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="block font-mono text-xs font-semibold uppercase tracking-widest text-[#3b82f6]"
            >
              How it works
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="mt-3 text-2xl font-bold tracking-tight sm:text-4xl"
            >
              Four steps to{' '}
              <span className="text-[#6b6b76]">actually getting it</span>
            </motion.h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
            {steps.map((step, idx) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="group relative rounded-xl border border-[#1e1e22] bg-[#141416] p-4 transition-colors hover:bg-[#1a1a1e] hover:border-[#333338] sm:p-6"
              >
                {/* Big faded step number */}
                <span
                  className="pointer-events-none absolute right-4 top-3 font-mono text-4xl font-bold opacity-[0.04] select-none sm:right-5 sm:top-4 sm:text-5xl"
                  aria-hidden
                >
                  {String(idx + 1).padStart(2, '0')}
                </span>

                <div
                  className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg sm:mb-4 sm:h-10 sm:w-10"
                  style={{ backgroundColor: `${step.color}18`, color: step.color }}
                >
                  <step.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>

                <h3 className="text-sm font-semibold sm:text-[15px]">{step.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-[#8e8e9a] sm:mt-2 sm:text-sm">
                  {step.description}
                </p>

                {/* Tiny color dot indicator */}
                <div
                  className="absolute bottom-3 right-3 h-1.5 w-1.5 rounded-full opacity-60 sm:bottom-4 sm:right-4"
                  style={{ backgroundColor: step.color }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FEATURED ALGORITHMS                                         */}
      {/* ============================================================ */}
      <section className="border-t border-[#1e1e22] px-4 py-14 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-end justify-between sm:mb-12">
            <div className="max-w-xl">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="block font-mono text-xs font-semibold uppercase tracking-widest text-[#8b5cf6]"
              >
                Featured
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.08 }}
                className="mt-3 text-2xl font-bold tracking-tight sm:text-4xl"
              >
                Start here
              </motion.h2>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <Link
                href="/algorithms"
                className="group/link hidden items-center gap-1 text-sm text-[#8e8e9a] transition-colors hover:text-[#3b82f6] sm:inline-flex"
              >
                View all
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5" />
              </Link>
            </motion.div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {featuredAlgorithms.map((algo, idx) => (
              <motion.div
                key={algo.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
              >
                <Link
                  href={`/algorithms/${algo.slug}`}
                  className="group block h-full rounded-xl border border-[#1e1e22] bg-[#141416] p-4 transition-all hover:bg-[#1a1a1e] hover:border-[#333338] hover:shadow-lg hover:shadow-[#3b82f6]/[0.04] sm:p-6"
                >
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-[#8b5cf618] px-2 py-0.5 text-[11px] font-medium text-[#8b5cf6]">
                      {algo.category}
                    </span>
                    <span className="rounded-md bg-[#22c55e18] px-2 py-0.5 text-[11px] font-medium text-[#22c55e]">
                      {algo.difficulty}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center gap-2 sm:mt-4">
                    <Terminal className="h-4 w-4 text-[#6b6b76]" />
                    <h3 className="text-sm font-semibold transition-colors group-hover:text-[#3b82f6] sm:text-base">
                      {algo.name}
                    </h3>
                  </div>

                  <p className="mt-1.5 text-xs leading-relaxed text-[#8e8e9a] sm:mt-2 sm:text-sm">
                    {algo.tagline}
                  </p>

                  <div className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-[#3b82f6] transition-all group-hover:gap-2 sm:mt-5">
                    Visualize
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FEATURES GRID                                               */}
      {/* ============================================================ */}
      <section className="border-t border-[#1e1e22] px-4 py-14 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-xl sm:mb-14">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="block font-mono text-xs font-semibold uppercase tracking-widest text-[#22c55e]"
            >
              Why this exists
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="mt-3 text-2xl font-bold tracking-tight sm:text-4xl"
            >
              Built for people who learn{' '}
              <span className="text-[#6b6b76]">by doing</span>
            </motion.h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {features.map((feat, idx) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: idx * 0.06 }}
                className="rounded-xl border border-[#1e1e22] bg-[#141416] p-4 transition-colors hover:bg-[#1a1a1e] hover:border-[#333338] sm:p-6"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#3b82f612] text-[#3b82f6] sm:h-9 sm:w-9">
                  <feat.icon className="h-4 w-4" />
                </div>
                <h3 className="mt-3 text-sm font-semibold sm:text-[15px]">{feat.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-[#8e8e9a] sm:mt-2 sm:text-sm">
                  {feat.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FOOTER                                                      */}
      {/* ============================================================ */}
      <footer className="border-t border-[#1e1e22] px-4 py-8 sm:px-6 sm:py-10">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center sm:gap-6">
            {/* Left */}
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#3b82f6]">
                <Code2 className="h-3.5 w-3.5 text-white" />
              </div>
              <div>
                <span className="text-sm font-semibold">DSA Visualizer</span>
                <span className="ml-2 text-xs text-[#6b6b76]">Built for learning</span>
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-4 sm:gap-5">
              <Link
                href="/algorithms"
                className="text-sm text-[#6b6b76] transition-colors hover:text-[#ececec]"
              >
                Explorer
              </Link>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#6b6b76] transition-colors hover:text-[#ececec]"
              >
                GitHub
              </a>
            </div>
          </div>

          <div className="mt-6 text-[11px] text-[#3a3a42] sm:mt-8">
            &copy; {new Date().getFullYear()} DSA Visualizer
          </div>
        </div>
      </footer>
    </div>
  );
}
