'use client';

import { useState, useReducer, useEffect, useCallback, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Lightbulb,
  Code,
  FileText,
  BookOpen,
  GraduationCap,
  ChevronDown,
} from 'lucide-react';

import { getAlgorithm } from '@/lib/algorithms/registry';
import {
  executionReducer,
  getInitialExecutionState,
} from '@/lib/execution/execution-engine';
import type {
  Algorithm,
  AlgorithmStep,
  VisualizationType,
} from '@/lib/algorithms/types';

import SortingVisualizer from '@/components/visualizations/SortingVisualizer';
import SearchVisualizer from '@/components/visualizations/SearchVisualizer';
import ArrayVisualizer from '@/components/visualizations/ArrayVisualizer';
import StackVisualizer from '@/components/visualizations/StackVisualizer';

import AlgorithmControls from '@/components/algorithm/AlgorithmControls';
import StepExplanation from '@/components/algorithm/StepExplanation';
import CodeViewer from '@/components/algorithm/CodeViewer';
import PseudocodeViewer from '@/components/algorithm/PseudocodeViewer';
import PracticeProblems from '@/components/algorithm/PracticeProblems';
import InputEditor from '@/components/algorithm/InputEditor';


function getInputType(
  vizType: VisualizationType
): 'array' | 'search' | 'string' | 'stack' | 'recursion' {
  switch (vizType) {
    case 'sorting':
    case 'array':
      return 'array';
    case 'search':
      return 'search';
    case 'string':
      return 'string';
    case 'stack':
      return 'stack';
    case 'recursion':
      return 'recursion';
  }
}

function getEditorInput(algorithm: Algorithm, input: unknown): unknown {
  switch (algorithm.visualizationType) {
    case 'sorting':
    case 'array':
      return (input as Record<string, unknown>)?.arr ?? [];
    case 'search':
      return (input as Record<string, unknown>)?.arr ?? [];
    case 'string':
      return (input as Record<string, unknown>)?.str ?? '';
    case 'stack': {
      const ops = (
        (input as Record<string, unknown>)?.operations as Array<{
          type: string;
          value?: number;
        }>
      ) ?? [];
      return ops
        .filter((op) => op.type === 'push')
        .map((op) => op.value);
    }
    case 'recursion':
      return (input as Record<string, unknown>)?.n ?? 5;
    default:
      return input;
  }
}

function convertEditorOutput(
  algorithm: Algorithm,
  rawInput: unknown
): unknown {
  switch (algorithm.visualizationType) {
    case 'sorting':
    case 'array':
      return { arr: rawInput as number[] };
    case 'search': {
      const data = rawInput as { array: number[]; target: number };
      return { arr: data.array, target: data.target };
    }
    case 'string':
      return { str: rawInput as string };
    case 'stack': {
      const values = rawInput as number[];
      return {
        operations: values.map((v) => ({ type: 'push' as const, value: v })),
      };
    }
    case 'recursion':
      return { n: rawInput as number };
    default:
      return rawInput;
  }
}

function generateRandomInput(algorithm: Algorithm): unknown {
  switch (algorithm.visualizationType) {
    case 'sorting':
    case 'array': {
      const len = 5 + Math.floor(Math.random() * 6);
      const arr = Array.from(
        { length: len },
        () => Math.floor(Math.random() * 100) + 1
      );
      return { arr };
    }
    case 'search': {
      const len = 5 + Math.floor(Math.random() * 6);
      const arr = Array.from(
        { length: len },
        () => Math.floor(Math.random() * 100) + 1
      ).sort((a, b) => a - b);
      const target = arr[Math.floor(Math.random() * arr.length)];
      return { arr, target };
    }
    case 'string': {
      const chars = 'abcdefghijklmnopqrstuvwxyz';
      const len = 4 + Math.floor(Math.random() * 5);
      const str = Array.from(
        { length: len },
        () => chars[Math.floor(Math.random() * chars.length)]
      ).join('');
      return { str };
    }
    case 'stack': {
      const numOps = 5 + Math.floor(Math.random() * 4);
      const operations: Array<{ type: 'push' | 'pop'; value?: number }> = [];
      let size = 0;
      for (let i = 0; i < numOps; i++) {
        if (size === 0 || Math.random() > 0.35) {
          operations.push({
            type: 'push',
            value: Math.floor(Math.random() * 100) + 1,
          });
          size++;
        } else {
          operations.push({ type: 'pop' });
          size--;
        }
      }
      return { operations };
    }
    case 'recursion':
      return { n: 2 + Math.floor(Math.random() * 7) };
    default:
      return algorithm.defaultInput;
  }
}

function getSearchVizType(algorithmId: string): 'linear' | 'binary' {
  return algorithmId === 'binary-search' ? 'binary' : 'linear';
}

export default function AlgorithmWorkspacePage() {
  const params = useParams();
  const slug = params.slug as string;
  const algorithm = getAlgorithm(slug);

  const [execution, dispatch] = useReducer(
    executionReducer,
    getInitialExecutionState()
  );
  const [input, setInput] = useState(algorithm?.defaultInput);
  const [beginnerMode, setBeginnerMode] = useState(true);
  const [inputError, setInputError] = useState<string | undefined>();
  const [activeTab, setActiveTab] = useState<
    'code' | 'pseudocode' | 'learn' | 'practice'
  >('code');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const [showInput, setShowInput] = useState(false);
  const [resetCounter, setResetCounter] = useState(0);

  const pendingRawInputRef = useRef<unknown>(undefined);
  const explanationRef = useRef<HTMLDivElement>(null);

  const currentStep = execution.steps[execution.currentStepIndex] ?? null;

  useEffect(() => {
    if (algorithm) {
      const steps = algorithm.generateSteps(algorithm.defaultInput);
      dispatch({ type: 'INIT', steps });
    }
  }, [algorithm]);

  useEffect(() => {
    if (!execution.isPlaying || execution.isComplete) return;
    const interval = setInterval(() => {
      dispatch({ type: 'STEP_FORWARD' });
    }, 1000 / execution.speed);
    return () => clearInterval(interval);
  }, [execution.isPlaying, execution.speed, execution.isComplete]);

  useEffect(() => {
    if (explanationRef.current) {
      explanationRef.current.scrollTop = 0;
    }
  }, [execution.currentStepIndex]);

  const handlePlay = useCallback(() => dispatch({ type: 'PLAY' }), []);
  const handlePause = useCallback(() => dispatch({ type: 'PAUSE' }), []);
  const handleNext = useCallback(
    () => dispatch({ type: 'STEP_FORWARD' }),
    []
  );
  const handlePrevious = useCallback(
    () => dispatch({ type: 'STEP_BACKWARD' }),
    []
  );
  const handleRestart = useCallback(
    () => dispatch({ type: 'RESTART' }),
    []
  );
  const handleSpeedChange = useCallback(
    (speed: number) => dispatch({ type: 'SET_SPEED', speed }),
    []
  );
  const handleJumpTo = useCallback(
    (step: number) => dispatch({ type: 'JUMP_TO', stepIndex: step }),
    []
  );

  const handleReset = useCallback(() => {
    if (!algorithm) return;
    setInput(algorithm.defaultInput);
    setInputError(undefined);
    const steps = algorithm.generateSteps(algorithm.defaultInput);
    dispatch({ type: 'INIT', steps });
    setResetCounter((c) => c + 1);
  }, [algorithm]);

  const handleInputChange = useCallback((rawInput: unknown) => {
    pendingRawInputRef.current = rawInput;
  }, []);

  const handleApplyInput = useCallback(() => {
    if (!algorithm || pendingRawInputRef.current === undefined) return;
    const newInput = convertEditorOutput(algorithm, pendingRawInputRef.current);
    const validation = algorithm.validateInput(newInput);
    if (!validation.valid) {
      setInputError(validation.error);
      return;
    }
    setInputError(undefined);
    setInput(newInput);
    const steps = algorithm.generateSteps(newInput);
    dispatch({ type: 'INIT', steps });
    pendingRawInputRef.current = undefined;
  }, [algorithm]);

  const handleGenerateRandom = useCallback(() => {
    if (!algorithm) return;
    const randomInput = generateRandomInput(algorithm);
    const validation = algorithm.validateInput(randomInput);
    if (!validation.valid) return;
    setInput(randomInput);
    setInputError(undefined);
    const steps = algorithm.generateSteps(randomInput);
    dispatch({ type: 'INIT', steps });
    setResetCounter((c) => c + 1);
  }, [algorithm]);

  const handleResetDefault = useCallback(() => {
    if (!algorithm) return;
    setInput(algorithm.defaultInput);
    setInputError(undefined);
    const steps = algorithm.generateSteps(algorithm.defaultInput);
    dispatch({ type: 'INIT', steps });
    setResetCounter((c) => c + 1);
  }, [algorithm]);

  if (!algorithm) {
    return (
      <div className="bg-[#0a0a0c] min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-5">
          <span className="text-[80px] font-bold text-[#333338] leading-none select-none font-mono">
            404
          </span>
          <div className="text-center space-y-2">
            <h1 className="text-xl font-semibold text-[#ececec]">
              Algorithm Not Found
            </h1>
            <p className="text-[#6b6b76] text-sm">
              &quot;{slug}&quot; doesn&apos;t exist in our collection.
            </p>
          </div>
          <Link
            href="/algorithms"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#141416] border border-[#1e1e22] rounded-lg text-sm text-[#ececec] hover:bg-[#1a1a1e] hover:border-[#333338] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Explorer
          </Link>
        </div>
      </div>
    );
  }

  const renderVisualization = () => {
    const step = currentStep;
    const state = step?.state;

    switch (algorithm.visualizationType) {
      case 'sorting': {
        const items =
          (state as number[]) ??
          (algorithm.defaultInput as Record<string, unknown>)?.arr;
        return (
          <SortingVisualizer
            items={items as number[]}
            highlightedIndices={step?.highlightedIndices}
            comparedIndices={step?.comparedIndices}
            swappedIndices={step?.swappedIndices}
            sortedIndices={step?.sortedIndices}
            pointers={step?.pointers}
            maxValue={Math.max(...(items as number[]), 1)}
          />
        );
      }
      case 'search': {
        const items =
          (state as number[]) ??
          (algorithm.defaultInput as Record<string, unknown>)?.arr;
        const vars = step?.variables as Record<string, unknown> | undefined;
        const target =
          vars?.target ??
          (algorithm.defaultInput as Record<string, unknown>)?.target;
        return (
          <SearchVisualizer
            items={items as number[]}
            target={target as number}
            highlightedIndices={step?.highlightedIndices}
            comparedIndices={step?.comparedIndices}
            range={step?.range}
            pointers={step?.pointers}
            foundIndex={step?.foundIndex}
            visualizationType={getSearchVizType(algorithm.id)}
          />
        );
      }
      case 'array': {
        const items =
          (state as number[]) ??
          (algorithm.defaultInput as Record<string, unknown>)?.arr;
        return (
          <ArrayVisualizer
            items={items as number[]}
            highlightedIndices={step?.highlightedIndices}
            comparedIndices={step?.comparedIndices}
            swappedIndices={step?.swappedIndices}
            sortedIndices={step?.sortedIndices}
            pointers={step?.pointers}
          />
        );
      }
      case 'string': {
        const chars =
          (state as string[]) ??
          (
            (algorithm.defaultInput as Record<string, unknown>)?.str as string
          )?.split('') ??
          [];
        return (
          <StringCharacterVisualizer
            chars={chars}
            highlightedIndices={step?.highlightedIndices}
            comparedIndices={step?.comparedIndices}
            swappedIndices={step?.swappedIndices}
            sortedIndices={step?.sortedIndices}
            pointers={step?.pointers}
          />
        );
      }
      case 'stack': {
        const items = (state as number[]) ?? [];
        const vars = step?.variables as Record<string, unknown> | undefined;
        let lastOp:
          | { type: 'push' | 'pop'; value?: number }
          | undefined;
        if (step?.stackOperation === 'push') {
          lastOp = { type: 'push', value: vars?.top as number };
        } else if (step?.stackOperation === 'pop') {
          lastOp = { type: 'pop', value: vars?.poppedValue as number };
        }
        return (
          <StackVisualizer
            items={items}
            operation={step?.action}
            lastOperation={lastOp}
          />
        );
      }
      case 'recursion': {
        return <RecursionVisualizer step={step} />;
      }
      default:
        return (
          <div className="text-[#6b6b76] text-center py-8">
            No visualization available
          </div>
        );
    }
  };

  const difficultyColor: Record<string, string> = {
    easy: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
    medium: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
    hard: 'text-red-400 bg-red-400/10 border-red-400/20',
  };

  const complexitySummary = algorithm.complexity
    ? `${algorithm.complexity.average} / ${algorithm.complexity.space}`
    : null;

  return (
    <div className="bg-[#0a0a0c] min-h-screen pt-16">
      {/* Toolbar */}
      <div className="sticky top-16 z-30 bg-[#111114] border-b border-[#1e1e22]">
        <div className="max-w-7xl mx-auto px-4 h-12 flex items-center gap-4 text-sm overflow-x-auto">
          <Link
            href="/algorithms"
            className="inline-flex items-center gap-1.5 text-[#6b6b76] hover:text-[#ececec] transition-colors shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>

          <div className="w-px h-4 bg-[#1e1e22] shrink-0" />

          <h1 className="font-semibold text-[#ececec] truncate shrink-0">
            {algorithm.name}
          </h1>

          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-[#3b82f6]/10 text-[#3b82f6] border border-[#3b82f6]/20 shrink-0">
            {algorithm.category}
          </span>

          <span
            className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border shrink-0 ${
              difficultyColor[algorithm.difficulty] ?? 'text-[#6b6b76] bg-[#141416] border-[#1e1e22]'
            }`}
          >
            {algorithm.difficulty}
          </span>

          {complexitySummary && (
            <>
              <div className="w-px h-4 bg-[#1e1e22] shrink-0" />
              <span className="font-mono text-[11px] text-[#8e8e9a] whitespace-nowrap shrink-0">
                {complexitySummary}
              </span>
            </>
          )}

          <div className="flex-1" />

          <button
            onClick={() => setBeginnerMode(!beginnerMode)}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium rounded border transition-colors shrink-0 ${
              beginnerMode
                ? 'bg-[#3b82f6]/10 border-[#3b82f6]/30 text-[#3b82f6]'
                : 'bg-[#141416] border-[#1e1e22] text-[#6b6b76] hover:text-[#ececec] hover:border-[#333338]'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5" />
            Beginner
          </button>

          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium rounded border bg-[#141416] border-[#1e1e22] text-[#6b6b76] hover:text-[#ececec] hover:bg-[#1a1a1e] hover:border-[#333338] transition-colors shrink-0"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col gap-5">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,380px] gap-5">
          {/* Visualization Panel */}
          <div className="bg-[#0e0e12] border border-[#1e1e22] rounded-xl min-h-[420px] flex flex-col overflow-hidden">
            <div className="px-4 pt-3 pb-0">
              <span className="font-mono text-[11px] text-[#6b6b76] uppercase tracking-wider">
                Visualization
              </span>
            </div>
            <div className="flex-1 flex items-center justify-center p-6">
              {renderVisualization()}
            </div>
          </div>

          {/* Step Explanation */}
          <div className="bg-[#141416] border border-[#1e1e22] rounded-xl flex flex-col overflow-hidden">
            <div className="px-4 pt-3 pb-0 border-b border-[#1e1e22]">
              <span className="font-mono text-[11px] text-[#6b6b76] uppercase tracking-wider">
                Current Step
              </span>
            </div>
            <div
              ref={explanationRef}
              className="flex-1 overflow-y-auto p-4 max-h-[600px] lg:max-h-none"
            >
              <StepExplanation step={currentStep} beginnerMode={beginnerMode} />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-[#141416] border border-[#1e1e22] rounded-xl px-4 py-3">
          <AlgorithmControls
            isPlaying={execution.isPlaying}
            currentStep={execution.currentStepIndex}
            totalSteps={execution.steps.length}
            speed={execution.speed}
            isComplete={execution.isComplete}
            onPlay={handlePlay}
            onPause={handlePause}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onRestart={handleRestart}
            onReset={handleReset}
            onSpeedChange={handleSpeedChange}
            onJumpTo={handleJumpTo}
          />
        </div>

        {/* Input Editor */}
        <div className="bg-[#141416] border border-[#1e1e22] rounded-xl overflow-hidden">
          <button
            onClick={() => setShowInput(!showInput)}
            className="flex items-center gap-2 w-full px-4 py-3 text-sm font-medium text-[#6b6b76] hover:text-[#ececec] hover:bg-[#1a1a1e] transition-colors"
          >
            {showInput ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
            <span>Custom Input</span>
            <motion.div
              animate={{ rotate: showInput ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="ml-auto"
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </button>
          <AnimatePresence initial={false}>
            {showInput && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-4">
                  <InputEditor
                    key={`${algorithm.id}-${resetCounter}`}
                    inputType={getInputType(algorithm.visualizationType)}
                    input={getEditorInput(algorithm, input)}
                    onInputChange={handleInputChange}
                    onApply={handleApplyInput}
                    onGenerateRandom={handleGenerateRandom}
                    onResetDefault={handleResetDefault}
                    error={inputError}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Tabs */}
        <div className="bg-[#141416] border border-[#1e1e22] rounded-xl overflow-hidden">
          <div className="flex bg-[#111114] border-b border-[#1e1e22] overflow-x-auto">
            {(
              [
                { key: 'code', label: 'Code', icon: Code },
                { key: 'pseudocode', label: 'Pseudocode', icon: FileText },
                { key: 'learn', label: 'Learn', icon: GraduationCap },
                { key: 'practice', label: 'Practice', icon: BookOpen },
              ] as const
            ).map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === key
                    ? 'border-[#3b82f6] text-[#3b82f6] bg-[#3b82f6]/5'
                    : 'border-transparent text-[#6b6b76] hover:text-[#ececec] hover:bg-[#141416]'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>

          <div className="p-5">
            <AnimatePresence mode="wait">
              {activeTab === 'code' && (
                <motion.div
                  key="code"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <CodeViewer
                    code={algorithm.code}
                    language={selectedLanguage}
                    activeLine={currentStep?.activeLine}
                  />
                </motion.div>
              )}
              {activeTab === 'pseudocode' && (
                <motion.div
                  key="pseudocode"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <PseudocodeViewer
                    lines={algorithm.pseudocode}
                    activeLine={currentStep?.activeLine}
                  />
                </motion.div>
              )}
              {activeTab === 'learn' && (
                <motion.div
                  key="learn"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <LearnContent explanation={algorithm.explanation} />
                </motion.div>
              )}
              {activeTab === 'practice' && (
                <motion.div
                  key="practice"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <PracticeProblems problems={algorithm.practiceProblems} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

function StringCharacterVisualizer({
  chars,
  highlightedIndices = [],
  comparedIndices = [],
  swappedIndices = [],
  sortedIndices = [],
  pointers = {},
}: {
  chars: string[];
  highlightedIndices?: number[];
  comparedIndices?: number[];
  swappedIndices?: number[];
  sortedIndices?: number[];
  pointers?: Record<string, number>;
}) {
  return (
    <div className="flex flex-col items-center gap-2 w-full overflow-x-auto pb-4">
      <div className="flex items-end gap-1.5 sm:gap-2 min-w-max px-4">
        <AnimatePresence mode="popLayout">
          {chars.map((char, index) => {
            const pointerLabel = Object.entries(pointers).find(
              ([, v]) => v === index
            )?.[0];

            let style = 'bg-zinc-800 border-zinc-700 text-zinc-200';
            if (sortedIndices.includes(index)) {
              style = 'bg-success/20 border-success text-success';
            } else if (swappedIndices.includes(index)) {
              style = 'bg-danger/20 border-danger text-danger';
            } else if (comparedIndices.includes(index)) {
              style = 'bg-accent/20 border-accent text-accent';
            } else if (highlightedIndices.includes(index)) {
              style = 'bg-primary/20 border-primary text-primary';
            }

            return (
              <motion.div
                key={`char-${index}`}
                layout
                layoutId={`char-${index}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  layout: { type: 'spring', stiffness: 400, damping: 30 },
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.2 },
                }}
                className="flex flex-col items-center gap-1"
              >
                {pointerLabel && (
                  <motion.span
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-algo-pointer/20 text-algo-pointer border border-algo-pointer/30"
                  >
                    {pointerLabel}
                  </motion.span>
                )}
                {!pointerLabel && <span className="h-[18px]" />}
                <motion.div
                  layout
                  className={`
                    relative w-12 h-14 sm:w-14 sm:h-16
                    flex items-center justify-center
                    border rounded-lg
                    font-mono text-lg font-semibold
                    transition-colors duration-200
                    ${style}
                  `}
                >
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={char}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                    >
                      {char}
                    </motion.span>
                  </AnimatePresence>
                </motion.div>
                <span className="text-[10px] text-muted-foreground font-mono">
                  {index}
                </span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

function RecursionVisualizer({ step }: { step: AlgorithmStep | null }) {
  const vars = (step?.variables ?? {}) as Record<string, unknown>;
  const callStack = (vars.callStack as string[]) ?? [];
  const currentResult = vars.currentResult;
  const n = vars.n;

  return (
    <div className="flex flex-col items-center gap-6 w-full p-4">
      <div className="text-center">
        <span className="text-sm text-[#6b6b76]">Current call: </span>
        <span className="font-mono font-semibold text-[#3b82f6]">
          ({String(n)})
        </span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-[#6b6b76] uppercase tracking-wider font-medium">
          Call Stack
        </span>
        <div className="flex flex-col-reverse items-center gap-1 min-w-[200px]">
          {callStack.length === 0 ? (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-[#6b6b76] italic py-4"
            >
              Empty
            </motion.span>
          ) : (
            callStack.map((call: string, i: number) => (
              <motion.div
                key={`${call}-${i}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`
                  w-full px-4 py-2 rounded-lg border text-center font-mono text-sm
                  ${
                    i === callStack.length - 1
                      ? 'bg-[#3b82f6]/20 border-[#3b82f6]/40 text-[#3b82f6]'
                      : 'bg-zinc-800 border-zinc-700 text-zinc-200'
                  }
                `}
              >
                {call}
              </motion.div>
            ))
          )}
        </div>
      </div>

      {currentResult !== null && currentResult !== undefined && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center px-4 py-2 rounded-lg bg-success/10 border border-success/30"
        >
          <span className="text-sm text-[#6b6b76]">Result: </span>
          <span className="font-mono font-semibold text-success">
            {String(currentResult)}
          </span>
        </motion.div>
      )}
    </div>
  );
}

function LearnContent({
  explanation,
}: {
  explanation: {
    whatIsIt: string;
    whenToUse: string;
    howItWorks: string[];
    commonMistakes: string[];
  };
}) {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h3 className="text-lg font-semibold text-[#ececec] mb-2">
          What is it?
        </h3>
        <p className="text-[#8e8e9a] leading-relaxed">
          {explanation.whatIsIt}
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-[#ececec] mb-2">
          When to use?
        </h3>
        <p className="text-[#8e8e9a] leading-relaxed">
          {explanation.whenToUse}
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-[#ececec] mb-3">
          How it works
        </h3>
        <ul className="space-y-2">
          {explanation.howItWorks.map((step, i) => (
            <li key={i} className="flex gap-3 text-[#8e8e9a]">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#3b82f6]/10 text-[#3b82f6] text-xs font-medium flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <span className="leading-relaxed">{step}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-[#ececec] mb-3">
          Common mistakes
        </h3>
        <ul className="space-y-2">
          {explanation.commonMistakes.map((mistake, i) => (
            <li key={i} className="flex gap-3 text-[#8e8e9a]">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-danger/10 text-danger text-xs font-medium flex items-center justify-center mt-0.5">
                !
              </span>
              <span className="leading-relaxed">{mistake}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
