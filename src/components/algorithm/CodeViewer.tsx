'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
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

  const currentCode = code[activeTab];
  const langKey = currentCode?.language ?? '';

  useEffect(() => {
    if (codeRef.current && currentCode) {
      Prism.highlightElement(codeRef.current);
    }
  }, [currentCode, activeLine]);

  useEffect(() => {
    if (codeRef.current && activeLine) {
      const lineEl = codeRef.current.querySelector(`[data-line="${activeLine}"]`);
      if (lineEl) {
        lineEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [activeLine]);

  const handleCopy = useCallback(async () => {
    if (!currentCode) return;
    await navigator.clipboard.writeText(currentCode.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [currentCode]);

  const lines = currentCode?.code.split('\n') ?? [];

  return (
    <div className="bg-[#141416] border border-[#1e1e22] rounded-xl overflow-hidden">
      <div className="flex items-center bg-[#111114] border-b border-[#1e1e22]">
        <div className="flex-1 flex overflow-x-auto">
          {code.map((item, i) => (
            <button
              key={item.language}
              onClick={() => setActiveTab(i)}
              className={`flex items-center gap-1.5 px-3 py-2 text-[13px] font-medium border-b-2 transition-colors whitespace-nowrap ${
                i === activeTab
                  ? 'text-[#3b82f6] border-[#3b82f6] bg-[#3b82f6]/5'
                  : 'border-transparent text-[#6b6b76] hover:text-[#ececec] hover:bg-[#141416]'
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
          className="p-2 mr-1 rounded-lg text-[#6b6b76] hover:text-[#ececec] hover:bg-[#141416] transition-colors"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>

      <div className="relative overflow-auto max-h-[520px]">
        {activeLine && (
          <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-[#3b82f6]/8 to-transparent pointer-events-none transition-opacity duration-300" />
        )}
        <pre className="m-0 p-0">
          <code ref={codeRef} className={`language-${LANG_PRISM[langKey] ?? ''}`}>
            <table className="w-full border-collapse">
              <tbody>
                {lines.map((line, i) => {
                  const lineNum = i + 1;
                  const isActive = activeLine === lineNum;
                  return (
                    <tr
                      key={i}
                      data-line={lineNum}
                      className={`transition-all duration-200 ${
                        isActive ? 'bg-[#3b82f6]/10' : ''
                      }`}
                    >
                      <td
                        className={`select-none text-right pr-4 pl-4 py-0 text-[11px] font-mono w-[1%] whitespace-nowrap align-top border-l-2 transition-colors duration-200 ${
                          isActive
                            ? 'text-[#3a3a42] border-l-[#3b82f6]'
                            : 'text-[#3a3a42] border-l-transparent'
                        }`}
                      >
                        {lineNum}
                      </td>
                      <td className="pr-4 py-0 align-top font-mono text-[13px] leading-[1.8]">
                        <span className="whitespace-pre">{line || ' '}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </code>
        </pre>
      </div>
    </div>
  );
}
