'use client';

import { motion, AnimatePresence } from 'framer-motion';

export interface StackVisualizerProps {
  items: number[];
  highlightTop?: boolean;
  operation?: string;
  lastOperation?: { type: 'push' | 'pop'; value?: number };
}

export default function StackVisualizer({
  items,
  highlightTop = true,
  operation,
  lastOperation,
}: StackVisualizerProps) {
  const isEmpty = items.length === 0;
  const topIndex = items.length - 1;

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {operation && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-3 py-1.5 rounded-lg bg-[#1e1e22] border border-[#222226] text-xs text-[#6b6b76] font-mono"
        >
          {operation}
        </motion.div>
      )}

      <div className="relative flex flex-col items-center">
        {/* Left-side gradient ruler border */}
        <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl overflow-hidden">
          <div
            className="w-full h-full"
            style={{
              background: 'linear-gradient(to bottom, rgba(59,130,246,0.5), rgba(168,85,247,0.5), rgba(236,72,153,0.5))',
            }}
          />
        </div>

        <div
          className={`
            relative flex flex-col-reverse items-center gap-0
            min-w-[200px] w-full max-w-[320px]
            border border-[#222226] rounded-b-xl
            bg-[#1e1e22]/50
            pl-1
            ${isEmpty ? 'border-dashed' : ''}
          `}
        >
          <div className="w-full h-px bg-[#222226]" />

          <div className="w-full flex flex-col items-center gap-0 p-3 pt-0 min-h-[60px]">
            <AnimatePresence mode="popLayout">
              {isEmpty ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-6 text-sm text-[#6b6b76] italic font-mono"
                >
                  Empty stack
                </motion.div>
              ) : (
                items.map((item, index) => {
                  const isTop = index === topIndex;
                  const wasPushed =
                    lastOperation?.type === 'push' && isTop;
                  return (
                    <motion.div
                      key={`stack-item-${index}`}
                      layout
                      layoutId={`stack-item-${index}`}
                      initial={
                        wasPushed
                          ? { opacity: 0, y: -50, scale: 0.85 }
                          : { opacity: 0, scale: 0.95 }
                      }
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -50, scale: 0.85 }}
                      transition={{
                        layout: { type: 'spring', stiffness: 400, damping: 30 },
                        opacity: { duration: 0.2 },
                        y: { type: 'spring', stiffness: 350, damping: 25 },
                        scale: { type: 'spring', stiffness: 300, damping: 25 },
                      }}
                      className={`
                        relative w-full
                        flex items-center justify-center
                        px-4 py-3
                        border rounded-lg
                        font-mono text-sm font-semibold
                        transition-colors duration-200
                        ${
                          isTop && highlightTop
                            ? 'bg-primary/20 border-primary text-primary z-10'
                            : 'bg-[#1e1e22] border-[#222226] text-zinc-200'
                        }
                      `}
                    >
                      {isTop && highlightTop && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="absolute -left-16 flex items-center gap-1"
                        >
                          <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                            TOP
                          </span>
                          <motion.svg
                            width="10"
                            height="10"
                            viewBox="0 0 10 10"
                            className="text-primary"
                            animate={{ y: [0, -2, 0] }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              ease: 'easeInOut',
                            }}
                          >
                            <path
                              d="M3 7 L5 2 L7 7"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </motion.svg>
                        </motion.div>
                      )}
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={item}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.15 }}
                        >
                          {item}
                        </motion.span>
                      </AnimatePresence>
                      {wasPushed && (
                        <motion.span
                          initial={{ opacity: 1 }}
                          animate={{ opacity: 0 }}
                          transition={{ delay: 0.5, duration: 0.3 }}
                          className="absolute -right-14 text-[10px] text-success font-bold"
                        >
                          PUSHED
                        </motion.span>
                      )}
                    </motion.div>
                  );
                })
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="w-full max-w-[320px] h-2 bg-[#222226] rounded-b-xl" />
      </div>

      {/* Pop notification */}
      <AnimatePresence>
        {lastOperation?.type === 'pop' && lastOperation.value !== undefined && (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="px-3 py-1.5 rounded-lg bg-danger-muted border border-danger/30 text-xs text-danger font-mono"
          >
            Popped: {lastOperation.value}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Size counter pill */}
      <motion.div
        layout
        className="px-3 py-1 rounded-full bg-[#1e1e22] border border-[#222226] text-xs text-[#6b6b76] font-mono"
      >
        Size: {items.length}
      </motion.div>
    </div>
  );
}
