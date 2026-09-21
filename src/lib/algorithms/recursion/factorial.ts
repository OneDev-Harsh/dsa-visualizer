import type { AlgorithmStep } from "@/lib/algorithms/types";

export type FactorialInput = { n: number };

export function generateSteps(input: FactorialInput): AlgorithmStep[] {
  const n = input.n;
  const steps: AlgorithmStep[] = [];
  const callStack: string[] = [];
  let stepIndex = 0;

  steps.push({
    stepIndex,
    state: null,
    action: "initialize",
    explanation: `Starting factorial(${n}).`,
    detailedExplanation: `Calculate factorial of ${n} using recursion.`,
    variables: { n, callStack: [], currentResult: null },
  });
  stepIndex++;

  function factorial(num: number): number {
    callStack.push(`factorial(${num})`);

    steps.push({
      stepIndex,
      state: null,
      action: "call",
      explanation: `Calling factorial(${num}). Pushing to call stack.`,
      detailedExplanation: `Call stack: [${callStack.join(" -> ")}]. Checking base case.`,
      stackOperation: "push",
      variables: {
        n: num,
        callStack: [...callStack],
        currentResult: null,
      },
    });
    stepIndex++;

    if (num <= 1) {
      steps.push({
        stepIndex,
        state: null,
        action: "base_case",
        explanation: `Base case: factorial(${num}) = 1.`,
        detailedExplanation: `When n <= 1, return 1. factorial(${num}) = 1.`,
        variables: {
          n: num,
          callStack: [...callStack],
          currentResult: 1,
        },
      });
      stepIndex++;

      callStack.pop();

      steps.push({
        stepIndex,
        state: null,
        action: "return",
        explanation: `factorial(${num}) = 1. Popping from call stack.`,
        detailedExplanation: `Returning 1. Call stack: [${callStack.join(" -> ") || "(empty)"}].`,
        stackOperation: "pop",
        variables: {
          n: num,
          callStack: [...callStack],
          currentResult: 1,
        },
        result: 1,
      });
      stepIndex++;

      return 1;
    }

    const result = num * factorial(num - 1);

    callStack.pop();

    steps.push({
      stepIndex,
      state: null,
      action: "return",
      explanation: `factorial(${num}) = ${result}. Popping from call stack.`,
      detailedExplanation: `${num} * factorial(${num - 1}) = ${num} * ${result / num} = ${result}. Call stack: [${callStack.join(" -> ") || "(empty)"}].`,
      stackOperation: "pop",
      variables: {
        n: num,
        callStack: [...callStack],
        currentResult: result,
      },
      result,
    });
    stepIndex++;

    return result;
  }

  const result = factorial(n);

  steps.push({
    stepIndex,
    state: null,
    action: "complete",
    explanation: `factorial(${n}) = ${result}`,
    detailedExplanation: `Recursion complete. The final result is ${result}.`,
    isComplete: true,
    result,
    variables: { n, callStack: [], currentResult: result },
  });

  return steps;
}
