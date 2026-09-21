'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ArrowRight, Clock, BarChart3 } from 'lucide-react'
import { algorithms, getAlgorithmsByCategory } from '@/lib/algorithms/registry'
import type { Category } from '@/lib/algorithms/types'

const categories: (Category | 'All')[] = [
  'All',
  'Arrays',
  'Searching',
  'Sorting',
  'Strings',
  'Stacks',
  'Recursion',
]

const categoryBadge: Record<Category, { bg: string; text: string }> = {
  Sorting: { bg: 'bg-violet-500/10', text: 'text-violet-400' },
  Searching: { bg: 'bg-sky-500/10', text: 'text-sky-400' },
  Arrays: { bg: 'bg-amber-500/10', text: 'text-amber-400' },
  Strings: { bg: 'bg-emerald-500/10', text: 'text-emerald-400' },
  Stacks: { bg: 'bg-rose-500/10', text: 'text-rose-400' },
  Recursion: { bg: 'bg-cyan-500/10', text: 'text-cyan-400' },
}

const difficultyBadge: Record<string, { bg: string; text: string }> = {
  Beginner: { bg: 'bg-emerald-500/10', text: 'text-emerald-400' },
  Intermediate: { bg: 'bg-amber-500/10', text: 'text-amber-400' },
  Advanced: { bg: 'bg-rose-500/10', text: 'text-rose-400' },
}

export default function AlgorithmExplorerPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All')

  const filteredAlgorithms = useMemo(() => {
    let results =
      activeCategory === 'All'
        ? algorithms
        : getAlgorithmsByCategory(activeCategory)

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      results = results.filter(
        (algo) =>
          algo.name.toLowerCase().includes(query) ||
          algo.description.toLowerCase().includes(query)
      )
    }

    return results
  }, [activeCategory, searchQuery])

  return (
    <div className="min-h-screen bg-[#0a0a0c] pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* ── Header ─────────────────────────────────────────── */}
        <div className="mb-12">
          <span className="inline-block font-mono text-xs font-semibold tracking-[0.2em] uppercase text-[#3b82f6] mb-3">
            Explore
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-3">
            All algorithms
          </h1>
          <p className="text-[#8e8e9a] text-lg max-w-xl leading-relaxed">
            Browse every algorithm in the collection. Each one comes with a
            step-by-step visualization, explanations, and practice problems.
          </p>
          <p className="text-[#555562] text-sm mt-4 font-mono">
            {algorithms.length} algorithms available
          </p>
        </div>

        {/* ── Search + Filters ───────────────────────────────── */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#555562] pointer-events-none" />
            <input
              type="text"
              placeholder="Search by name or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#141416] border border-[#1e1e22] rounded-lg text-sm text-white placeholder:text-[#555562] focus:outline-none focus:border-[#3b82f6]/50 transition-colors"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-none">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  activeCategory === category
                    ? 'bg-[#3b82f6] text-white shadow-[0_0_16px_rgba(59,130,246,0.25)]'
                    : 'bg-[#141416] border border-[#1e1e22] text-[#8e8e9a] hover:border-[#333338] hover:text-[#b0b0bc]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* ── Algorithm Grid ─────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {filteredAlgorithms.length > 0 ? (
            <motion.div
              key={activeCategory + searchQuery}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {filteredAlgorithms.map((algo, index) => {
                const cat = categoryBadge[algo.category]
                const diff = difficultyBadge[algo.difficulty]

                return (
                  <motion.div
                    key={algo.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.35,
                      delay: index * 0.04,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  >
                    <Link
                      href={`/algorithms/${algo.id}`}
                      className="group block h-full bg-[#141416] border border-[#1e1e22] rounded-xl p-5 hover:border-[#333338] hover:bg-[#1a1a1e] transition-all duration-200"
                    >
                      {/* badges */}
                      <div className="flex items-center gap-2 mb-3.5">
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-semibold tracking-wide uppercase ${cat.bg} ${cat.text}`}
                        >
                          {algo.category}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-semibold ${diff.bg} ${diff.text}`}
                        >
                          {algo.difficulty}
                        </span>
                      </div>

                      {/* name */}
                      <h3 className="text-[15px] font-semibold text-white group-hover:text-[#3b82f6] transition-colors duration-200 mb-1.5">
                        {algo.name}
                      </h3>

                      {/* description */}
                      <p className="text-[13px] leading-relaxed text-[#71717e] line-clamp-2 mb-4">
                        {algo.description}
                      </p>

                      {/* complexity */}
                      <div className="flex items-center gap-3 text-[11px] font-mono text-[#555562] mb-4">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3 h-3" />
                          Time: {algo.complexity.average}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <BarChart3 className="w-3 h-3" />
                          Space: {algo.complexity.space}
                        </span>
                      </div>

                      {/* link */}
                      <div className="flex items-center text-[13px] font-medium text-[#3b82f6] opacity-0 group-hover:opacity-100 transition-all duration-200">
                        Visualize
                        <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col items-center justify-center py-28 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-[#141416] border border-[#1e1e22] flex items-center justify-center mb-5">
                <Search className="w-5 h-5 text-[#555562]" />
              </div>
              <p className="text-[#8e8e9a] text-base font-medium mb-1.5">
                No algorithms match your search.
              </p>
              <p className="text-[#555562] text-sm">
                Try a different keyword or category.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
