'use client';

import { motion, AnimatePresence } from 'framer-motion';

export interface ArrayVisualizerProps {
  items: number[];
  highlightedIndices?: number[];
  comparedIndices?: number[];
  swappedIndices?: number[];
  sortedIndices?: number[];
  activeIndex?: number;
  pointers?: Record<string, number>;
  showIndices?: boolean;
}

function getItemStyle(
  index: number,
  highlightedIndices: number[],
  comparedIndices: number[],
  swappedIndices: number[],
  sortedIndices: number[],
  activeIndex?: number
) {
  if (sortedIndices.includes(index)) {
    return 'bg-success/20 border-success text-success';
  }
  if (swappedIndices.includes(index)) {
    return 'bg-danger/20 border-danger text-danger';
  }
  if (comparedIndices.includes(index)) {
    return 'bg-accent/20 border-accent text-accent';
  }
  if (highlightedIndices.includes(index) || activeIndex === index) {
    return 'bg-primary/20 border-primary text-primary';
  }
  return 'bg-[#1e1e22] border-[#222226] text-zinc-200';
}

function getItemShadow(
  index: number,
  highlightedIndices: number[],
  comparedIndices: number[],
  swappedIndices: number[],
  activeIndex?: number
) {
  if (swappedIndices.includes(index)) {
    return '0 0 14px rgba(239,68,68,0.45)';
  }
  if (highlightedIndices.includes(index) || activeIndex === index) {
    return '0 0 12px rgba(59,130,246,0.15)';
  }
  if (comparedIndices.includes(index)) {
    return '0 0 10px rgba(168,85,247,0.15)';
  }
  return 'shadow-sm';
}

function getRingStyle(index: number, activeIndex?: number) {
  if (activeIndex === index) {
    return 'ring-2 ring-warning';
  }
  return '';
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

export default function ArrayVisualizer({
  items,
  highlightedIndices = [],
  comparedIndices = [],
  swappedIndices = [],
  sortedIndices = [],
  activeIndex,
  pointers = {},
  showIndices = true,
}: ArrayVisualizerProps) {
  return (
    <div className="flex flex-col items-center gap-2 w-full overflow-x-auto pb-4">
      <div className="flex items-end gap-1 min-w-max px-2 sm:gap-1.5 sm:px-4">
        <AnimatePresence mode="popLayout">
          {items.map((item, index) => {
            const pointerLabel = getPointerLabel(index, pointers);
            const isDefault =
              !highlightedIndices.includes(index) &&
              !comparedIndices.includes(index) &&
              !swappedIndices.includes(index) &&
              !sortedIndices.includes(index) &&
              activeIndex !== index;

            return (
              <motion.div
                key={`array-item-${index}`}
                layout
                layoutId={`array-item-${index}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  layout: { type: 'spring', stiffness: 400, damping: 30 },
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.2 },
                }}
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
                <motion.div
                  layout
                  className={`
                    relative w-10 h-12 sm:w-12 sm:h-14 md:w-14 md:h-16
                    flex items-center justify-center
                    border rounded-lg
                    font-mono text-xs sm:text-sm md:text-base font-semibold
                    transition-colors duration-200
                    ${getItemStyle(index, highlightedIndices, comparedIndices, swappedIndices, sortedIndices, activeIndex)}
                    ${getRingStyle(index, activeIndex)}
                  `}
                  animate={{
                    boxShadow: getItemShadow(
                      index,
                      highlightedIndices,
                      comparedIndices,
                      swappedIndices,
                      activeIndex
                    ),
                  }}
                  transition={{ boxShadow: { duration: 0.3 } }}
                >
                  {/* Subtle background pattern for default blocks */}
                  {isDefault && (
                    <div
                      className="absolute inset-0 rounded-lg pointer-events-none opacity-[0.03]"
                      style={{
                        backgroundImage:
                          'repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(255,255,255,0.5) 3px, rgba(255,255,255,0.5) 4px)',
                      }}
                    />
                  )}
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={item}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="relative z-10"
                    >
                      {item}
                    </motion.span>
                  </AnimatePresence>
                </motion.div>
                {showIndices && (
                  <span className="text-[10px] text-[#4a4a56] font-mono">
                    {index}
                  </span>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
