import type { AlgorithmStep } from "@/lib/algorithms/types";

export type StackInput = {
  operations: Array<{ type: "push" | "pop"; value?: number }>;
};

const DEFAULT_OPS: StackInput["operations"] = [
  { type: "push", value: 10 },
  { type: "push", value: 20 },
  { type: "push", value: 30 },
  { type: "pop" },
  { type: "pop" },
  { type: "push", value: 40 },
  { type: "pop" },
];

export function generateSteps(input?: StackInput): AlgorithmStep[] {
  const operations = input
    ? structuredClone(input.operations)
    : structuredClone(DEFAULT_OPS);
  const steps: AlgorithmStep[] = [];
  const stack: number[] = [];
  let stepIndex = 0;

  steps.push({
    stepIndex,
    state: [],
    action: "initialize",
    explanation: "Starting Stack Operations visualization.",
    detailedExplanation: `Executing ${operations.length} operations on an empty stack.`,
    stackOperation: "initialize",
    variables: { stack: [], operationCount: operations.length },
  });
  stepIndex++;

  for (const op of operations) {
    if (op.type === "push" && op.value !== undefined) {
      stack.push(op.value);

      steps.push({
        stepIndex,
        state: structuredClone(stack),
        action: "push",
        explanation: `Pushing ${op.value} onto the stack.`,
        detailedExplanation: `Push value ${op.value}. Stack is now [${stack.join(", ")}]. Top is ${stack[stack.length - 1]}.`,
        stackOperation: "push",
        highlightedIndices: [stack.length - 1],
        variables: { stack: structuredClone(stack), top: op.value },
      });
    } else if (op.type === "pop") {
      if (stack.length === 0) {
        steps.push({
          stepIndex,
          state: [],
          action: "pop",
          explanation: "Stack is empty! Cannot pop.",
          detailedExplanation: "Attempted pop on empty stack. Stack underflow.",
          stackOperation: "pop_error",
          variables: { stack: [], error: "Stack is empty" },
        });
      } else {
        const popped = stack.pop()!;

        steps.push({
          stepIndex,
          state: structuredClone(stack),
          action: "pop",
          explanation: `Popping ${popped} from the stack.`,
          detailedExplanation: `Pop top value ${popped}. Stack is now [${stack.join(", ")}].`,
          stackOperation: "pop",
          highlightedIndices: [stack.length],
          variables: { stack: structuredClone(stack), poppedValue: popped },
        });
      }
    }
    stepIndex++;
  }

  steps.push({
    stepIndex,
    state: structuredClone(stack),
    action: "complete",
    explanation: "Stack operations complete.",
    detailedExplanation: `Final stack state: [${stack.join(", ")}].`,
    stackOperation: "complete",
    isComplete: true,
    result: structuredClone(stack),
  });

  return steps;
}
