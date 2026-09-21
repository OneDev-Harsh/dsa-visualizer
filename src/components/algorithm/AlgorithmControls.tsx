'use client';

import { Play, Pause, SkipBack, SkipForward, RotateCcw, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

interface AlgorithmControlsProps {
  isPlaying: boolean;
  currentStep: number;
  totalSteps: number;
  speed: number;
  isComplete: boolean;
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onRestart: () => void;
  onReset: () => void;
  onSpeedChange: (speed: number) => void;
  onJumpTo: (step: number) => void;
}

const SPEED_OPTIONS = [0.5, 1, 1.5, 2, 3];

export default function AlgorithmControls({
  isPlaying,
  currentStep,
  totalSteps,
  speed,
  isComplete,
  onPlay,
  onPause,
  onNext,
  onPrevious,
  onRestart,
  onReset,
  onSpeedChange,
  onJumpTo: _onJumpTo,
}: AlgorithmControlsProps) {
  const [speedOpen, setSpeedOpen] = useState(false);
  const speedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (speedRef.current && !speedRef.current.contains(e.target as Node)) {
        setSpeedOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const progress = totalSteps > 0 ? (currentStep / (totalSteps - 1)) * 100 : 0;

  return (
    <div className="bg-[#141416] border border-[#1e1e22] rounded-xl p-2 sm:p-3">
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="flex items-center gap-1 sm:gap-1.5">
          <button
            onClick={onReset}
            aria-label="Reset to beginning"
            title="Restart (R)"
            className="p-1.5 rounded-lg text-[#6b6b76] hover:text-[#ececec] hover:bg-[#1a1a1e] transition-all focus-ring sm:p-2"
          >
            <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          <button
            onClick={onPrevious}
            disabled={currentStep === 0}
            aria-label="Previous step"
            title="Previous (←)"
            className="p-1 rounded-lg text-[#6b6b76] hover:text-[#ececec] hover:bg-[#1a1a1e] transition-all disabled:opacity-30 disabled:cursor-not-allowed focus-ring sm:p-1.5"
          >
            <SkipBack className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </button>

          <button
            onClick={isComplete ? onRestart : isPlaying ? onPause : onPlay}
            aria-label={isComplete ? 'Restart' : isPlaying ? 'Pause' : 'Play'}
            title={isComplete ? 'Restart (R)' : isPlaying ? 'Pause (Space)' : 'Play (Space)'}
            className={`p-2 rounded-lg bg-[#3b82f6] text-white hover:bg-[#2563eb] transition-all focus-ring sm:p-2.5 ${
              isPlaying ? 'shadow-[0_0_12px_rgba(59,130,246,0.3)]' : ''
            }`}
          >
            {isComplete ? (
              <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
            ) : isPlaying ? (
              <Pause className="w-4 h-4 sm:w-5 sm:h-5" />
            ) : (
              <Play className="w-4 h-4 ml-0.5 sm:w-5 sm:h-5" />
            )}
          </button>

          <button
            onClick={onNext}
            disabled={currentStep >= totalSteps - 1}
            aria-label="Next step"
            title="Next (→)"
            className="p-1 rounded-lg text-[#6b6b76] hover:text-[#ececec] hover:bg-[#1a1a1e] transition-all disabled:opacity-30 disabled:cursor-not-allowed focus-ring sm:p-1.5"
          >
            <SkipForward className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </button>
        </div>

        <div className="w-px h-4 bg-[#1e1e22] sm:h-5" />

        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[#6b6b76] font-mono tabular-nums whitespace-nowrap sm:text-xs">
            Step {currentStep + 1} / {totalSteps}
          </span>
        </div>

        <div className="flex-1" />

        <div className="relative" ref={speedRef}>
          <button
            onClick={() => setSpeedOpen(!speedOpen)}
            aria-label="Change speed"
            className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs text-[#6b6b76] hover:text-[#ececec] hover:bg-[#1a1a1e] transition-all border border-[#1e1e22] focus-ring sm:px-2.5 sm:text-sm"
          >
            <span className="font-mono tabular-nums">{speed}x</span>
            <ChevronDown className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
          </button>

          {speedOpen && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="absolute right-0 top-full mt-1 bg-[#141416] border border-[#1e1e22] rounded-lg shadow-lg z-50 overflow-hidden"
            >
              {SPEED_OPTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    onSpeedChange(s);
                    setSpeedOpen(false);
                  }}
                  className={`block w-full px-4 py-2 text-sm text-left font-mono transition-colors ${
                    s === speed
                      ? 'bg-[#3b82f6]/15 text-[#3b82f6]'
                      : 'text-[#6b6b76] hover:bg-[#1a1a1e] hover:text-[#ececec]'
                  }`}
                >
                  {s}x
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      <div
        className="mt-2 h-1 bg-[#1e1e22] rounded-full overflow-hidden cursor-pointer sm:mt-3"
        role="progressbar"
        aria-valuenow={currentStep}
        aria-valuemin={0}
        aria-valuemax={totalSteps - 1}
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const pct = (e.clientX - rect.left) / rect.width;
          const step = Math.round(pct * (totalSteps - 1));
          _onJumpTo(Math.max(0, Math.min(step, totalSteps - 1)));
        }}
      >
        <motion.div
          className="h-full bg-[#3b82f6] rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
