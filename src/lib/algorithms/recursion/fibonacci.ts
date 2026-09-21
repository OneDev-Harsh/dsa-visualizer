import type { AlgorithmStep } from "@/lib/algorithms/types";

export type FibonacciInput = { n: number };

export function generateSteps(input: FibonacciInput): AlgorithmStep[] {
  const n = input.n;
  const steps: AlgorithmStep[] = [];
  const callStack: string[] = [];
  let stepIndex = 0;

  steps.push({
    stepIndex,
    state: null,
    action: "initialize",
    explanation: `Starting fibonacci(${n}).`,
    detailedExplanation: `Calculate fibonacci(${n}) using recursion.`,
    variables: { n, callStack: [], currentResult: null },
  });
  stepIndex++;

  const memo: Record<number, number> = {};

  function fibonacci(num: number): number {
    callStack.push(`fibonacci(${num})`);

    steps.push({
      stepIndex,
      state: null,
      action: "call",
      explanation: `Calling fibonacci(${num}).`,
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
        explanation: `Base case: fibonacci(${num}) = ${num}.`,
        detailedExplanation: `When n <= 1, return n. fibonacci(${num}) = ${num}.`,
        variables: {
          n: num,
          callStack: [...callStack],
          currentResult: num,
        },
      });
      stepIndex++;

      callStack.pop();

      steps.push({
        stepIndex,
        state: null,
        action: "return",
        explanation: `fibonacci(${num}) = ${num}. Popping from call stack.`,
        detailedExplanation: `Returning ${num}. Call stack: [${callStack.join(" -> ") || "(empty)"}].`,
        stackOperation: "pop",
        variables: {
          n: num,
          callStack: [...callStack],
          currentResult: num,
        },
        result: num,
      });
      stepIndex++;

      memo[num] = num;
      return num;
    }

    const left = fibonacci(num - 1);
    const right = fibonacci(num - 2);
    const result = left + right;

    callStack.pop();

    steps.push({
      stepIndex,
      state: null,
      action: "return",
      explanation: `fibonacci(${num}) = ${result}. Popping from call stack.`,
      detailedExplanation: `fibonacci(${num - 1}) + fibonacci(${num - 2}) = ${left} + ${right} = ${result}. Call stack: [${callStack.join(" -> ") || "(empty)"}].`,
      stackOperation: "pop",
      variables: {
        n: num,
        callStack: [...callStack],
        currentResult: result,
      },
      result,
    });
    stepIndex++;

    memo[num] = result;
    return result;
  }

  const result = fibonacci(n);

  steps.push({
    stepIndex,
    state: null,
    action: "complete",
    explanation: `fibonacci(${n}) = ${result}`,
    detailedExplanation: `Recursion complete. The final result is ${result}.`,
    isComplete: true,
    result,
    variables: { n, callStack: [], currentResult: result },
  });

  return steps;
}
