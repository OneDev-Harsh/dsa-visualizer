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
      <div className="px-3 py-2 border-b border-[#1e1e22] bg-[#111114] flex items-center gap-2 sm:px-4 sm:py-3">
        <BookOpen className="w-3.5 h-3.5 text-[#4a4a56] sm:w-4 sm:h-4" />
        <h3 className="text-xs font-semibold text-[#ececec] sm:text-sm">Practice Problems</h3>
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
              className="flex items-start gap-2 p-2.5 border-b border-[#1e1e22] last:border-b-0 hover:border-[#333338] hover:bg-[#1a1a1e] transition-all group sm:gap-3 sm:p-3"
            >
              <span className="text-[10px] font-mono text-[#4a4a56] mt-0.5 flex-shrink-0 sm:text-[11px]">
                #{problem.number}
              </span>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-xs font-medium text-[#ececec] truncate sm:text-sm">
                    {problem.title}
                  </span>
                  <span
                    className={`inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-mono font-medium sm:text-[11px] ${diff.bg} ${diff.text}`}
                  >
                    {diff.label}
                  </span>
                </div>
                <p className="text-[10px] text-[#6b6b76] mt-0.5 line-clamp-2 leading-relaxed sm:text-[11px] sm:mt-1">
                  {problem.description}
                </p>
              </div>

              <ExternalLink className="w-3.5 h-3.5 text-[#4a4a56] group-hover:text-[#3b82f6] transition-colors flex-shrink-0 mt-0.5 sm:w-4 sm:h-4" />
            </motion.a>
          );
        })}
      </div>
    </div>
  );
}
