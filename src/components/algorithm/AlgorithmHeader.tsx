'use client';

import { RotateCcw } from 'lucide-react';

interface AlgorithmHeaderProps {
  name: string;
  category: string;
  difficulty: string;
  complexity: {
    best: string;
    average: string;
    worst: string;
    space: string;
  };
  onReset: () => void;
}

const difficultyStyles: Record<string, string> = {
  Beginner: 'bg-[#22c55e]/10 text-[#22c55e]',
  Intermediate: 'bg-[#f59e0b]/10 text-[#f59e0b]',
  Advanced: 'bg-[#ef4444]/10 text-[#ef4444]',
};

const categoryStyles: Record<string, string> = {
  Arrays: 'bg-[#3b82f6]/10 text-[#3b82f6]',
  Searching: 'bg-[#06b6d4]/10 text-[#06b6d4]',
  Sorting: 'bg-[#8b5cf6]/10 text-[#8b5cf6]',
  Strings: 'bg-[#22c55e]/10 text-[#22c55e]',
  Stacks: 'bg-[#f59e0b]/10 text-[#f59e0b]',
  Recursion: 'bg-[#ef4444]/10 text-[#ef4444]',
};

export default function AlgorithmHeader({
  name,
  category,
  difficulty,
  complexity,
  onReset,
}: AlgorithmHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-[#ececec]">{name}</h1>
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`rounded px-2 py-0.5 text-[11px] font-mono font-medium ${categoryStyles[category] ?? 'bg-[#3b82f6]/10 text-[#3b82f6]'}`}
          >
            {category}
          </span>
          <span
            className={`rounded px-2 py-0.5 text-[11px] font-mono font-medium ${difficultyStyles[difficulty] ?? 'bg-[#4a4a56]/10 text-[#4a4a56]'}`}
          >
            {difficulty}
          </span>
          <span className="text-sm text-[#6b6b76]">
            Time: {complexity.average} | Space: {complexity.space}
          </span>
        </div>
      </div>

      <button
        onClick={onReset}
        className="flex items-center gap-2 px-3 py-2 bg-[#141416] border border-[#1e1e22] text-[#6b6b76] text-sm rounded hover:text-[#ececec] hover:border-[#333338] transition-colors shrink-0"
      >
        <RotateCcw className="h-4 w-4" />
        Reset
      </button>
    </div>
  );
}
