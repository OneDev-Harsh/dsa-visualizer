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
      <div className="flex items-center gap-2 px-3 py-2 bg-[#111114] border-b border-[#1e1e22]">
        <FileText className="w-4 h-4 text-[#6b6b76]" />
        <span className="text-[13px] font-medium text-[#6b6b76]">Pseudocode</span>
      </div>

      <div className="overflow-auto max-h-[420px] p-3">
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
                style={{ paddingLeft: `${indent * 16 + 8}px` }}
              >
                <span className="select-none text-[11px] text-[#3a3a42] font-mono w-6 text-right mr-3 flex-shrink-0 leading-[1.8]">
                  {lineNum}
                </span>
                <span
                  className={`font-mono text-[13px] leading-[1.8] whitespace-pre ${
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
