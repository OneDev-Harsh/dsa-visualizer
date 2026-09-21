'use client';

import { motion } from 'framer-motion';
import { Timer } from 'lucide-react';

interface ComplexityCardProps {
  complexity: {
    best: string;
    average: string;
    worst: string;
    space: string;
  };
}

const ITEMS = [
  { key: 'best', label: 'Best' },
  { key: 'average', label: 'Average' },
  { key: 'worst', label: 'Worst' },
  { key: 'space', label: 'Space' },
] as const;

export default function ComplexityCard({ complexity }: ComplexityCardProps) {
  return (
    <div className="bg-[#141416] border border-[#1e1e22] rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-[#1e1e22] bg-[#111114] flex items-center gap-2">
        <Timer className="w-4 h-4 text-[#4a4a56]" />
        <h3 className="text-sm font-semibold text-[#ececec]">Complexity</h3>
      </div>

      <div className="grid grid-cols-2 gap-2 p-3">
        {ITEMS.map(({ key, label }) => (
          <motion.div
            key={key}
            whileHover={{ scale: 1.02 }}
            className="bg-[#0a0a0c] border border-[#1e1e22] rounded-lg p-3 flex flex-col items-center gap-1 hover:border-[#333338] transition-colors"
          >
            <span className="text-[10px] text-[#4a4a56] uppercase tracking-wider font-mono">
              {label}
            </span>
            <span className="text-sm font-mono font-semibold text-[#ececec]">
              {complexity[key]}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
