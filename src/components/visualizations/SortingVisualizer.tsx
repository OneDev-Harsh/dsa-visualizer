'use client';

import { motion, AnimatePresence } from 'framer-motion';

export interface SortingVisualizerProps {
  items: number[];
  highlightedIndices?: number[];
  comparedIndices?: number[];
  swappedIndices?: number[];
  sortedIndices?: number[];
  activeIndex?: number;
  pointers?: Record<string, number>;
  maxValue?: number;
}

function getBarStyle(
  index: number,
  highlightedIndices: number[],
  comparedIndices: number[],
  swappedIndices: number[],
  sortedIndices: number[],
  activeIndex?: number
) {
  if (sortedIndices.includes(index)) {
    return 'bg-success border-success/50';
  }
  if (swappedIndices.includes(index)) {
    return 'bg-danger border-danger/50';
  }
  if (comparedIndices.includes(index)) {
    return 'bg-accent border-accent/50';
  }
  if (highlightedIndices.includes(index) || activeIndex === index) {
    return 'bg-primary border-primary/50';
  }
  return 'bg-zinc-700 border-zinc-600';
}

function getBarShadow(
  index: number,
  swappedIndices: number[],
  sortedIndices: number[]
) {
  if (swappedIndices.includes(index)) {
    return '0 0 16px rgba(239,68,68,0.5)';
  }
  if (sortedIndices.includes(index)) {
    return '0 0 10px rgba(34,197,94,0.35)';
  }
  return 'inset 0 1px 2px rgba(0,0,0,0.3)';
}

function getPointerLabel(
  index: number,
  pointers: Record<string, number>
): string | null {
  for (const [label, ptrIndex] of Object.entries(pointers)) {
    if (ptrIndex === index) return label;
  }
  return null;
}

export default function SortingVisualizer({
  items,
  highlightedIndices = [],
  comparedIndices = [],
  swappedIndices = [],
  sortedIndices = [],
  activeIndex,
  pointers = {},
  maxValue,
}: SortingVisualizerProps) {
  const max = maxValue ?? Math.max(...items, 1);

  return (
    <div className="flex flex-col items-center gap-2 w-full overflow-x-auto pb-4">
      <div className="relative flex items-end gap-1 sm:gap-1.5 min-w-max px-4" style={{ height: '320px' }}>
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <AnimatePresence mode="popLayout">
          {items.map((item, index) => {
            const heightPercent = (item / max) * 100;
            const height = Math.max(20, (heightPercent / 100) * 300);
            const pointerLabel = getPointerLabel(index, pointers);
            const isSorted = sortedIndices.includes(index);
            return (
              <motion.div
                key={`bar-item-${index}`}
                layout
                layoutId={`bar-item-${index}`}
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                exit={{ opacity: 0, scaleY: 0 }}
                transition={{
                  layout: { type: 'spring', stiffness: 400, damping: 30 },
                  opacity: { duration: 0.2 },
                  scaleY: { type: 'spring', stiffness: 300, damping: 25 },
                }}
                style={{ originY: 1 }}
                className="flex flex-col items-center gap-1"
              >
                {pointerLabel ? (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center"
                  >
                    <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-algo-pointer/20 text-algo-pointer border border-algo-pointer/30">
                      {pointerLabel}
                    </span>
                    <svg width="10" height="6" viewBox="0 0 10 6" className="text-algo-pointer/60 -mt-px">
                      <path d="M0 0 L5 6 L10 0" fill="currentColor" />
                    </svg>
                  </motion.div>
                ) : (
                  <span className="h-[18px]" />
                )}

                <div className="flex flex-col items-center justify-end" style={{ height: '300px' }}>
                  <motion.div
                    layout
                    className={`
                      relative w-9 sm:w-11 md:w-[3.25rem]
                      border rounded-t-md
                      flex items-start justify-center
                      pt-1.5
                      transition-colors duration-200
                      ${getBarStyle(index, highlightedIndices, comparedIndices, swappedIndices, sortedIndices, activeIndex)}
                      ${activeIndex === index ? 'ring-2 ring-warning' : ''}
                    `}
                    animate={{
                      height,
                      boxShadow: getBarShadow(index, swappedIndices, sortedIndices),
                    }}
                    transition={{
                      height: { type: 'spring', stiffness: 300, damping: 25 },
                      boxShadow: { duration: 0.3 },
                    }}
                  >
                    {/* Value label pill */}
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={item}
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.15 }}
                        className="relative z-10 px-1.5 py-0.5 rounded-full bg-black/50 text-[10px] sm:text-xs font-mono font-bold text-white drop-shadow-sm"
                      >
                        {item}
                      </motion.span>
                    </AnimatePresence>
                  </motion.div>
                </div>

                <div className="flex flex-col items-center gap-0.5">
                  <span className="text-[10px] text-[#6b6b76] font-mono">
                    {index}
                  </span>
                  {isSorted && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                      className="text-success"
                    >
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </motion.span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Floor line */}
      <div className="w-full max-w-md h-px bg-[#222226]" />
    </div>
  );
}
