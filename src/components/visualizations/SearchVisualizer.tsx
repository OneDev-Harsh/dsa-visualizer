'use client';

import { motion, AnimatePresence } from 'framer-motion';

export interface SearchVisualizerProps {
  items: number[];
  target: number;
  highlightedIndices?: number[];
  comparedIndices?: number[];
  range?: { left: number; right: number };
  pointers?: Record<string, number>;
  foundIndex?: number;
  visualizationType: 'linear' | 'binary';
}

function getItemStyle(
  index: number,
  highlightedIndices: number[],
  comparedIndices: number[],
  foundIndex?: number,
  range?: { left: number; right: number },
  isNotFound?: boolean
) {
  if (isNotFound) {
    return 'bg-zinc-800/50 border-zinc-700/50 text-zinc-500';
  }
  if (foundIndex === index) {
    return 'bg-success/20 border-success text-success';
  }
  if (comparedIndices.includes(index)) {
    return 'bg-accent/20 border-accent text-accent';
  }
  if (highlightedIndices.includes(index)) {
    return 'bg-primary/20 border-primary text-primary';
  }
  if (range && index >= range.left && index <= range.right) {
    return 'bg-primary-muted border-primary/40 text-zinc-200';
  }
  return 'bg-[#1e1e22] border-[#222226] text-zinc-200';
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

function getPointerColor(label: string): string {
  switch (label.toLowerCase()) {
    case 'left':
      return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    case 'right':
      return 'bg-rose-500/20 text-rose-400 border-rose-500/30';
    case 'mid':
      return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
    default:
      return 'bg-algo-pointer/20 text-algo-pointer border-algo-pointer/30';
  }
}

function getPointerArrowColor(label: string): string {
  switch (label.toLowerCase()) {
    case 'left':
      return 'text-emerald-400/60';
    case 'right':
      return 'text-rose-400/60';
    case 'mid':
      return 'text-amber-400/60';
    default:
      return 'text-algo-pointer/60';
  }
}

export default function SearchVisualizer({
  items,
  target,
  highlightedIndices = [],
  comparedIndices = [],
  range,
  pointers = {},
  foundIndex,
  visualizationType,
}: SearchVisualizerProps) {
  const isNotFound = foundIndex === -1;

  return (
    <div className="flex flex-col items-center gap-4 w-full overflow-x-auto pb-4">
      {/* Target display */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative flex items-center gap-3 px-5 py-3 rounded-xl bg-[#1e1e22] border border-[#222226]"
      >
        <motion.div
          className="absolute inset-0 rounded-xl border-2 border-primary/30"
          animate={{
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <span className="text-xs text-[#6b6b76] uppercase tracking-wider font-medium">
          Target
        </span>
        <span className="text-2xl font-bold font-mono text-primary">
          {target}
        </span>
        {foundIndex !== undefined && foundIndex >= 0 && (
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="text-success"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </motion.span>
        )}
      </motion.div>

      {/* Binary search range indicator */}
      {visualizationType === 'binary' && range && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-3 text-xs text-[#6b6b76] font-mono"
        >
          <span className="px-2 py-0.5 rounded bg-[#1e1e22] border border-[#222226]">
            L: <span className="text-emerald-400">{range.left}</span>
          </span>
          <div className="flex items-center gap-0">
            <div className="w-8 h-px bg-[#222226]" />
            <div className="flex items-center gap-0.5 px-1 py-0.5 rounded bg-primary-muted/30 border border-primary/20">
              {Array.from({ length: range.right - range.left + 1 }, (_, i) => (
                <div key={i} className="w-1 h-1 rounded-full bg-primary/40" />
              ))}
            </div>
            <div className="w-8 h-px bg-[#222226]" />
          </div>
          <span className="px-2 py-0.5 rounded bg-[#1e1e22] border border-[#222226]">
            R: <span className="text-rose-400">{range.right}</span>
          </span>
        </motion.div>
      )}

      <div className="relative flex items-end gap-1.5 sm:gap-2 min-w-max px-4">
        <AnimatePresence mode="popLayout">
          {items.map((item, index) => {
            const pointerLabel = getPointerLabel(index, pointers);

            return (
              <motion.div
                key={`search-item-${index}`}
                layout
                layoutId={`search-item-${index}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: isNotFound ? 0.5 : 1,
                  scale: 1,
                }}
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
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full border ${getPointerColor(pointerLabel)}`}
                    >
                      {pointerLabel}
                    </span>
                    <svg
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      className={`-mt-px ${getPointerArrowColor(pointerLabel)}`}
                    >
                      <path d="M0 0 L5 6 L10 0" fill="currentColor" />
                    </svg>
                  </motion.div>
                ) : (
                  <span className="h-[18px]" />
                )}
                <motion.div
                  layout
                  className={`
                    relative w-12 h-14 sm:w-14 sm:h-16
                    flex items-center justify-center
                    border rounded-lg
                    font-mono text-sm sm:text-base font-semibold
                    transition-colors duration-200
                    ${getItemStyle(index, highlightedIndices, comparedIndices, foundIndex, range, isNotFound)}
                    ${foundIndex === index ? 'ring-2 ring-success/50' : ''}
                  `}
                  animate={
                    foundIndex === index
                      ? { boxShadow: '0 0 20px rgba(34,197,94,0.4)' }
                      : { boxShadow: '0 0 0px transparent' }
                  }
                  transition={{ boxShadow: { duration: 0.3 } }}
                >
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={item}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                    >
                      {item}
                    </motion.span>
                  </AnimatePresence>
                  {foundIndex === index && (
                    <motion.div
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-success rounded-full flex items-center justify-center shadow-lg"
                    >
                      <svg
                        className="w-3 h-3 text-white"
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
                    </motion.div>
                  )}
                </motion.div>
                <span
                  className={`text-[10px] font-mono ${
                    isNotFound ? 'text-zinc-600' : 'text-[#6b6b76]'
                  }`}
                >
                  {index}
                </span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Not found message */}
      {isNotFound && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 py-2.5 rounded-lg bg-[#1e1e22] border border-[#222226] text-sm text-zinc-400 font-mono"
        >
          <span className="text-danger font-semibold">Not found:</span>{' '}
          Target <span className="text-primary font-bold">{target}</span> is not
          in the array
        </motion.div>
      )}
    </div>
  );
}
