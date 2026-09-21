export type Category =
  | "Arrays"
  | "Searching"
  | "Sorting"
  | "Strings"
  | "Stacks"
  | "Recursion";

export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export type VisualizationType =
  | "array"
  | "search"
  | "sorting"
  | "stack"
  | "string"
  | "recursion";

export type Language = "python" | "javascript" | "typescript" | "java" | "c" | "cpp";

export interface AlgorithmStep {
  stepIndex: number;
  state: unknown;
  action: string;
  explanation: string;
  detailedExplanation?: string;
  highlightedIndices?: number[];
  comparedIndices?: number[];
  swappedIndices?: number[];
  sortedIndices?: number[];
  activeLine?: number;
  variables?: Record<string, unknown>;
  pointers?: Record<string, number>;
  range?: { left: number; right: number };
  foundIndex?: number;
  stackOperation?: string;
  result?: unknown;
  isComplete?: boolean;
}

export interface ComplexityInfo {
  best: string;
  average: string;
  worst: string;
  space: string;
}

export interface CodeImplementation {
  language: Language;
  code: string;
}

export interface PracticeProblem {
  title: string;
  number: number;
  difficulty: "Easy" | "Medium" | "Hard";
  description: string;
  url: string;
}

export interface AlgorithmExplanation {
  whatIsIt: string;
  whenToUse: string;
  howItWorks: string[];
  commonMistakes: string[];
}

export interface Algorithm {
  id: string;
  name: string;
  category: Category;
  difficulty: Difficulty;
  description: string;
  visualizationType: VisualizationType;
  complexity: ComplexityInfo;
  defaultInput: unknown;
  generateSteps: (input: unknown) => AlgorithmStep[];
  validateInput: (input: unknown) => { valid: boolean; error?: string };
  pseudocode: string[];
  code: CodeImplementation[];
  explanation: AlgorithmExplanation;
  practiceProblems: PracticeProblem[];
}

export interface PlaybackState {
  isPlaying: boolean;
  currentStep: number;
  totalSteps: number;
  speed: number;
  isComplete: boolean;
}
