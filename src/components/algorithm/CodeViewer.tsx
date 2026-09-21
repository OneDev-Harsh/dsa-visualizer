'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Copy, Check, FileCode } from 'lucide-react';
import Prism from 'prismjs';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';

interface CodeViewerProps {
  code: Array<{ language: string; code: string }>;
  activeLine?: number;
  language?: string;
}

const LANG_LABELS: Record<string, string> = {
  python: 'Python',
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  java: 'Java',
  c: 'C',
  cpp: 'C++',
};

const LANG_PRISM: Record<string, string> = {
  python: 'python',
  javascript: 'javascript',
  typescript: 'typescript',
  java: 'java',
  c: 'c',
  cpp: 'cpp',
};

export default function CodeViewer({ code, activeLine, language }: CodeViewerProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState(() => {
    if (language) {
      const idx = code.findIndex((c) => c.language === language);
      if (idx !== -1) return idx;
    }
    return 0;
  });
  const codeRef = useRef<HTMLPreElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentCode = code[activeTab];
  const langKey = currentCode?.language ?? '';
  const lines = useMemo(() => currentCode?.code.split('\n') ?? [], [currentCode]);

  useEffect(() => {
    if (codeRef.current && currentCode) {
      Prism.highlightElement(codeRef.current);
    }
  }, [currentCode, activeLine]);

  useEffect(() => {
    if (containerRef.current && activeLine) {
      const lineHeight = 24;
      const targetScroll = (activeLine - 1) * lineHeight - containerRef.current.clientHeight / 3;
      containerRef.current.scrollTo({ top: Math.max(0, targetScroll), behavior: 'smooth' });
    }
  }, [activeLine]);

  const handleCopy = useCallback(async () => {
    if (!currentCode) return;
    await navigator.clipboard.writeText(currentCode.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [currentCode]);

  return (
    <div className="bg-[#1a1b26] border border-[#1e1e22] rounded-xl overflow-hidden font-mono text-[13px]">
      {/* Tab bar */}
      <div className="flex items-center bg-[#16161e] border-b border-[#1e1e22]">
        <div className="flex-1 flex overflow-x-auto">
          {code.map((item, i) => (
            <button
              key={item.language}
              onClick={() => setActiveTab(i)}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
                i === activeTab
                  ? 'text-[#7aa2f7] border-[#7aa2f7] bg-[#7aa2f7]/5'
                  : 'border-transparent text-[#565f89] hover:text-[#c0caf5] hover:bg-[#1a1b26]'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              {LANG_LABELS[item.language] ?? item.language}
            </button>
          ))}
        </div>
        <button
          onClick={handleCopy}
          aria-label="Copy code"
          className="p-2 mr-1 rounded-lg text-[#565f89] hover:text-[#c0caf5] hover:bg-[#1a1b26] transition-colors"
        >
          {copied ? (
            <Check className="w-4 h-4 text-[#9ece6a]" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Code area with line numbers */}
      <div
        ref={containerRef}
        className="overflow-auto max-h-[350px] sm:max-h-[520px]"
      >
        <div className="flex min-w-max">
          {/* Line numbers gutter */}
          <div className="flex-shrink-0 py-3 pl-3 pr-2 text-right select-none border-r border-[#1e1e22]/50 bg-[#16161e]/50">
            {lines.map((_, i) => {
              const lineNum = i + 1;
              const isActive = activeLine === lineNum;
              return (
                <div
                  key={i}
                  className={`px-2 leading-[24px] text-[11px] transition-colors duration-150 ${
                    isActive
                      ? 'text-[#c0caf5] bg-[#7aa2f7]/10 border-l-2 border-l-[#7aa2f7] -ml-[2px] pl-[6px]'
                      : 'text-[#3b4261] border-l-2 border-l-transparent -ml-[2px] pl-[6px]'
                  }`}
                >
                  {lineNum}
                </div>
              );
            })}
          </div>

          {/* Code block */}
          <div className="flex-1 overflow-x-auto">
            <pre className="m-0 p-3 bg-transparent" style={{ background: 'transparent' }}>
              <code
                ref={codeRef}
                className={`language-${LANG_PRISM[langKey] ?? ''}`}
                style={{
                  fontFamily: "'Geist Mono', 'Fira Code', 'JetBrains Mono', 'Cascadia Code', Consolas, monospace",
                  fontSize: '13px',
                  lineHeight: '24px',
                  background: 'transparent',
                }}
              >
                {currentCode?.code ?? ''}
              </code>
            </pre>
          </div>
        </div>
      </div>

      {/* Bottom status bar */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-[#16161e] border-t border-[#1e1e22] text-[10px] text-[#3b4261]">
        <span>
          {lines.length} lines
        </span>
        <span className="uppercase tracking-wider">
          {LANG_LABELS[langKey] ?? langKey}
        </span>
      </div>
    </div>
  );
}
