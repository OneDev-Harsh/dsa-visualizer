'use client';

import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

interface PseudocodeViewerProps {
  lines: string[];
  activeLine?: number;
}

function getIndentLevel(line: string): number {
  let count = 0;
  for (const ch of line) {
    if (ch === ' ' || ch === '\t') count++;
    else break;
  }
  return Math.floor(count / 2);
}

export default function PseudocodeViewer({ lines, activeLine }: PseudocodeViewerProps) {
  return (
    <div className="bg-[#141416] border border-[#1e1e22] rounded-xl overflow-hidden">
      <div className="flex items-center gap-2 px-2.5 py-1.5 bg-[#111114] border-b border-[#1e1e22] sm:px-3 sm:py-2">
        <FileText className="w-3.5 h-3.5 text-[#6b6b76] sm:w-4 sm:h-4" />
        <span className="text-xs font-medium text-[#6b6b76] sm:text-[13px]">Pseudocode</span>
      </div>

      <div className="overflow-auto max-h-[320px] p-2 sm:max-h-[420px] sm:p-3">
        <div className="space-y-0.5">
          {lines.map((line, i) => {
            const lineNum = i + 1;
            const isActive = activeLine === lineNum;
            const indent = getIndentLevel(line);
            const trimmed = line.trimStart();

            return (
              <motion.div
                key={i}
                initial={false}
                animate={{
                  backgroundColor: isActive ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                  borderLeftColor: isActive ? '#3b82f6' : 'transparent',
                }}
                transition={{ duration: 0.2 }}
                className="flex items-start border-l-2 rounded-r-sm"
                style={{ paddingLeft: `${indent * 12 + 6}px` }}
              >
                <span className="select-none text-[10px] text-[#3a3a42] font-mono w-5 text-right mr-2 flex-shrink-0 leading-[1.8] sm:text-[11px] sm:w-6 sm:mr-3">
                  {lineNum}
                </span>
                <span
                  className={`font-mono text-xs leading-[1.8] whitespace-pre sm:text-[13px] ${
                    isActive ? 'text-[#ececec]' : 'text-[#8e8e9a]'
                  }`}
                >
                  {trimmed || '\u00A0'}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
