'use client';

import { useState } from 'react';
import { RotateCcw } from 'lucide-react';

interface InputEditorProps {
  inputType: 'array' | 'search' | 'string' | 'stack' | 'recursion';
  input: unknown;
  onInputChange: (input: unknown) => void;
  onApply: () => void;
  onGenerateRandom: () => void;
  onResetDefault: () => void;
  error?: string;
}

export default function InputEditor({
  inputType,
  input,
  onInputChange,
  onApply,
  onGenerateRandom,
  onResetDefault,
  error,
}: InputEditorProps) {
  const [arrayText, setArrayText] = useState(() => formatArray(input));
  const [targetText, setTargetText] = useState('');
  const [stringValue, setStringValue] = useState(() =>
    typeof input === 'string' ? input : '',
  );
  const [recursionN, setRecursionN] = useState(() =>
    typeof input === 'number' ? input : 5,
  );

  const handleApply = () => {
    switch (inputType) {
      case 'array':
      case 'stack': {
        const parsed = parseArray(arrayText);
        if (parsed.length === 0) return;
        onInputChange(parsed);
        break;
      }
      case 'search': {
        const parsed = parseArray(arrayText);
        const target = Number(targetText);
        if (parsed.length === 0 || isNaN(target)) return;
        onInputChange({ array: parsed, target });
        break;
      }
      case 'string':
        if (!stringValue) return;
        onInputChange(stringValue);
        break;
      case 'recursion':
        onInputChange(recursionN);
        break;
    }
    onApply();
  };

  const handleReset = () => {
    onResetDefault();
    setArrayText(formatArray(input));
    if (inputType === 'string') setStringValue(typeof input === 'string' ? input : '');
    if (inputType === 'recursion') setRecursionN(typeof input === 'number' ? input : 5);
  };

  return (
    <div className="bg-[#0a0a0c] border border-[#1e1e22] rounded-lg p-3 space-y-2.5 sm:p-4 sm:space-y-3">
      <div className="space-y-2.5 sm:space-y-3">
        {(inputType === 'array' || inputType === 'search') && (
          <div>
            <label className="block text-xs font-medium text-[#6b6b76] mb-1 sm:mb-1.5">
              Enter array (comma-separated)
            </label>
            <input
              type="text"
              value={arrayText}
              onChange={(e) => setArrayText(e.target.value)}
              placeholder="e.g. 64, 34, 25, 12, 22, 11, 90"
              className="w-full bg-[#141416] border border-[#1e1e22] rounded-lg px-3 py-2 text-sm text-[#ececec] placeholder:text-[#4a4a56] focus:outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6]/20 transition-all sm:py-2.5"
            />
          </div>
        )}

        {inputType === 'search' && (
          <div>
            <label className="block text-xs font-medium text-[#6b6b76] mb-1 sm:mb-1.5">
              Target value
            </label>
            <input
              type="number"
              value={targetText}
              onChange={(e) => setTargetText(e.target.value)}
              placeholder="e.g. 22"
              className="w-full bg-[#141416] border border-[#1e1e22] rounded-lg px-3 py-2 text-sm text-[#ececec] placeholder:text-[#4a4a56] focus:outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6]/20 transition-all sm:py-2.5"
            />
          </div>
        )}

        {inputType === 'string' && (
          <div>
            <label className="block text-xs font-medium text-[#6b6b76] mb-1 sm:mb-1.5">
              Enter string
            </label>
            <input
              type="text"
              value={stringValue}
              onChange={(e) => setStringValue(e.target.value)}
              placeholder="e.g. hello world"
              className="w-full bg-[#141416] border border-[#1e1e22] rounded-lg px-3 py-2 text-sm text-[#ececec] placeholder:text-[#4a4a56] focus:outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6]/20 transition-all sm:py-2.5"
            />
          </div>
        )}

        {inputType === 'stack' && (
          <div>
            <label className="block text-xs font-medium text-[#6b6b76] mb-1 sm:mb-1.5">
              Stack operations (comma-separated numbers to push)
            </label>
            <input
              type="text"
              value={arrayText}
              onChange={(e) => setArrayText(e.target.value)}
              placeholder="e.g. 10, 20, 30"
              className="w-full bg-[#141416] border border-[#1e1e22] rounded-lg px-3 py-2 text-sm text-[#ececec] placeholder:text-[#4a4a56] focus:outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6]/20 transition-all sm:py-2.5"
            />
          </div>
        )}

        {inputType === 'recursion' && (
          <div>
            <label className="block text-xs font-medium text-[#6b6b76] mb-1 sm:mb-1.5">
              Value of n
            </label>
            <input
              type="number"
              value={recursionN}
              onChange={(e) => setRecursionN(Number(e.target.value))}
              min={1}
              max={20}
              className="w-full bg-[#141416] border border-[#1e1e22] rounded-lg px-3 py-2 text-sm text-[#ececec] placeholder:text-[#4a4a56] focus:outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6]/20 transition-all sm:py-2.5"
            />
          </div>
        )}
      </div>

      {error && <p className="text-[#ef4444] text-xs mt-1">{error}</p>}

      <div className="flex flex-wrap gap-2">
        <button
          onClick={handleApply}
          className="px-3 py-2 bg-[#3b82f6] text-white text-sm font-medium rounded-lg hover:bg-[#2563eb] btn-press transition-colors sm:px-4"
        >
          Apply Input
        </button>
        <button
          onClick={onGenerateRandom}
          className="px-3 py-2 bg-[#141416] border border-[#1e1e22] text-[#8e8e9a] text-sm rounded-lg hover:border-[#333338] hover:text-[#ececec] btn-press transition-colors sm:px-4"
        >
          Random
        </button>
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-2 bg-[#141416] border border-[#1e1e22] text-[#8e8e9a] text-sm rounded-lg hover:border-[#333338] hover:text-[#ececec] btn-press transition-colors sm:px-4"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </button>
      </div>
    </div>
  );
}

function formatArray(input: unknown): string {
  return Array.isArray(input) ? (input as number[]).join(', ') : '';
}

function parseArray(text: string): number[] {
  return text
    .split(',')
    .map((s) => s.trim())
    .filter((s) => s !== '')
    .map(Number)
    .filter((n) => !isNaN(n));
}
