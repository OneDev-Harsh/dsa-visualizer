'use client';

import { motion } from 'framer-motion';
import { ExternalLink, BookOpen } from 'lucide-react';

interface PracticeProblemsProps {
  problems: Array<{
    title: string;
    number: number;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    description: string;
    url: string;
  }>;
}

const DIFF_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  Easy: { bg: 'bg-[#22c55e]/10', text: 'text-[#22c55e]', label: 'Easy' },
  Medium: { bg: 'bg-[#f59e0b]/10', text: 'text-[#f59e0b]', label: 'Medium' },
  Hard: { bg: 'bg-[#ef4444]/10', text: 'text-[#ef4444]', label: 'Hard' },
};

export default function PracticeProblems({ problems }: PracticeProblemsProps) {
  return (
    <div className="bg-[#141416] border border-[#1e1e22] rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-[#1e1e22] bg-[#111114] flex items-center gap-2">
        <BookOpen className="w-4 h-4 text-[#4a4a56]" />
        <h3 className="text-sm font-semibold text-[#ececec]">Practice Problems</h3>
      </div>

      <div className="space-y-0">
        {problems.map((problem) => {
          const diff = DIFF_STYLES[problem.difficulty] ?? DIFF_STYLES.Easy;

          return (
            <motion.a
              key={problem.number}
              href={problem.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.005 }}
              className="flex items-start gap-3 p-3 border-b border-[#1e1e22] last:border-b-0 hover:border-[#333338] hover:bg-[#1a1a1e] transition-all group"
            >
              <span className="text-[11px] font-mono text-[#4a4a56] mt-0.5 flex-shrink-0">
                #{problem.number}
              </span>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-[#ececec] truncate">
                    {problem.title}
                  </span>
                  <span
                    className={`inline-flex items-center rounded px-2 py-0.5 text-[11px] font-mono font-medium ${diff.bg} ${diff.text}`}
                  >
                    {diff.label}
                  </span>
                </div>
                <p className="text-[11px] text-[#6b6b76] mt-1 line-clamp-2 leading-relaxed">
                  {problem.description}
                </p>
              </div>

              <ExternalLink className="w-4 h-4 text-[#4a4a56] group-hover:text-[#3b82f6] transition-colors flex-shrink-0 mt-0.5" />
            </motion.a>
          );
        })}
      </div>
    </div>
  );
}
