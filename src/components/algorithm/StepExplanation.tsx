'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Variable, GitBranch, ArrowLeftRight, BarChart3, Play, Lightbulb } from 'lucide-react';
import type { AlgorithmStep } from '@/lib/algorithms/types';

interface StepExplanationProps {
  step: AlgorithmStep | null;
  beginnerMode: boolean;
}

const ACTION_DOT_COLORS: Record<string, string> = {
  compare: 'bg-emerald-500',
  swap: 'bg-red-500',
  highlight: 'bg-[#3b82f6]',
};

function Collapsible({
  title,
  icon: Icon,
  children,
  defaultOpen = false,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border border-[#1e1e22] rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 w-full px-3 py-2 text-sm font-medium text-[#6b6b76] hover:text-[#ececec] hover:bg-[#1a1a1e] transition-all"
      >
        <Icon className="w-3.5 h-3.5" />
        <span className="flex-1 text-left">{title}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-3.5 h-3.5" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-3">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function StepExplanation({ step, beginnerMode }: StepExplanationProps) {
  if (!step) {
    return (
      <div className="bg-[#141416] border border-[#1e1e22] rounded-xl p-4 flex flex-col items-center justify-center gap-2 text-[#6b6b76] text-sm">
        <Play className="w-4 h-4" />
        <span>Press play to begin</span>
      </div>
    );
  }

  const hasVariables = step.variables && Object.keys(step.variables).length > 0;
  const hasPointers = step.pointers && Object.keys(step.pointers).length > 0;
  const hasComparison = step.comparedIndices && step.comparedIndices.length > 0;
  const hasRange = step.range;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step.stepIndex}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25 }}
        className="bg-[#141416] border border-[#1e1e22] rounded-xl border-l-2 border-l-[#3b82f6] p-4 space-y-3"
      >
        <div>
          <h3 className="text-sm font-semibold text-[#ececec] flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full ${ACTION_DOT_COLORS[step.action] ?? 'bg-[#6b6b76]'}`} />
            {step.action}
          </h3>
          <p className="text-sm text-[#8e8e9a] mt-1.5 leading-relaxed">{step.explanation}</p>
        </div>

        {beginnerMode && step.detailedExplanation && (
          <div className="bg-[#0f2544]/50 border border-[#3b82f6]/20 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <Lightbulb className="w-4 h-4 text-[#3b82f6] mt-0.5 shrink-0" />
              <p className="text-sm text-[#8e8e9a] leading-relaxed">
                {step.detailedExplanation}
              </p>
            </div>
          </div>
        )}

        {hasVariables && (
          <Collapsible title="Variables" icon={Variable} defaultOpen>
            <div className="space-y-1">
              {Object.entries(step.variables!).map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-center justify-between px-2.5 py-1.5 bg-[#0a0a0c] rounded-md text-sm"
                >
                  <span className="text-[#6b6b76] font-mono text-xs">{key}</span>
                  <span className="text-[#ececec] font-mono text-xs font-medium">
                    {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                  </span>
                </div>
              ))}
            </div>
          </Collapsible>
        )}

        {hasPointers && (
          <Collapsible title="Pointers" icon={GitBranch}>
            <div className="space-y-1">
              {Object.entries(step.pointers!).map(([name, index]) => (
                <div
                  key={name}
                  className="flex items-center justify-between px-2.5 py-1.5 bg-[#0a0a0c] rounded-md text-sm"
                >
                  <span className="text-[#6b6b76] font-mono text-xs">{name}</span>
                  <span className="text-[#f97316] font-mono text-xs font-medium">
                    &rarr; index {index}
                  </span>
                </div>
              ))}
            </div>
          </Collapsible>
        )}

        {hasComparison && (
          <Collapsible title="Comparison" icon={ArrowLeftRight}>
            <div className="flex items-center gap-2 px-2.5 py-2 bg-[#0a0a0c] rounded-md">
              <span className="text-xs font-mono text-[#8e8e9a]">
                indices [{step.comparedIndices!.join(', ')}]
              </span>
            </div>
          </Collapsible>
        )}

        {hasRange && (
          <Collapsible title="Range" icon={BarChart3}>
            <div className="flex items-center gap-2 px-2.5 py-2 bg-[#0a0a0c] rounded-md">
              <span className="text-xs font-mono text-[#8e8e9a]">
                left: {step.range!.left} &rarr; right: {step.range!.right}
              </span>
            </div>
          </Collapsible>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
