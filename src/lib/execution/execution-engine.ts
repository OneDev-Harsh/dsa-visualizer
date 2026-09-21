import { AlgorithmStep } from "@/lib/algorithms/types";

export interface ExecutionState {
  steps: AlgorithmStep[];
  currentStepIndex: number;
  isPlaying: boolean;
  speed: number;
  isComplete: boolean;
}

export type ExecutionAction =
  | { type: "INIT"; steps: AlgorithmStep[] }
  | { type: "STEP_FORWARD" }
  | { type: "STEP_BACKWARD" }
  | { type: "PLAY" }
  | { type: "PAUSE" }
  | { type: "RESTART" }
  | { type: "RESET" }
  | { type: "SET_SPEED"; speed: number }
  | { type: "JUMP_TO"; stepIndex: number };

export function executionReducer(
  state: ExecutionState,
  action: ExecutionAction
): ExecutionState {
  switch (action.type) {
    case "INIT":
      return {
        steps: action.steps,
        currentStepIndex: 0,
        isPlaying: false,
        speed: state.speed,
        isComplete: action.steps.length === 0,
      };

    case "STEP_FORWARD":
      if (state.currentStepIndex >= state.steps.length - 1) {
        return { ...state, isPlaying: false, isComplete: true };
      }
      return {
        ...state,
        currentStepIndex: state.currentStepIndex + 1,
        isComplete:
          state.currentStepIndex + 1 >= state.steps.length - 1,
      };

    case "STEP_BACKWARD":
      if (state.currentStepIndex <= 0) {
        return { ...state, currentStepIndex: 0, isComplete: false };
      }
      return {
        ...state,
        currentStepIndex: state.currentStepIndex - 1,
        isComplete: false,
      };

    case "PLAY":
      return { ...state, isPlaying: true };

    case "PAUSE":
      return { ...state, isPlaying: false };

    case "RESTART":
      return {
        ...state,
        currentStepIndex: 0,
        isPlaying: false,
        isComplete: false,
      };

    case "RESET":
      return {
        steps: [],
        currentStepIndex: 0,
        isPlaying: false,
        speed: 1,
        isComplete: false,
      };

    case "SET_SPEED":
      return { ...state, speed: action.speed };

    case "JUMP_TO": {
      const idx = Math.max(
        0,
        Math.min(action.stepIndex, state.steps.length - 1)
      );
      return {
        ...state,
        currentStepIndex: idx,
        isComplete: idx >= state.steps.length - 1,
      };
    }

    default:
      return state;
  }
}

export function getInitialExecutionState(): ExecutionState {
  return {
    steps: [],
    currentStepIndex: 0,
    isPlaying: false,
    speed: 1,
    isComplete: false,
  };
}
