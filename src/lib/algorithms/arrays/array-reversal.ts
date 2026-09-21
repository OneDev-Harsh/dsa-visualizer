import type { AlgorithmStep } from "@/lib/algorithms/types";

export type ArrayReversalInput = { arr: number[] };

export function generateSteps(input: ArrayReversalInput): AlgorithmStep[] {
  const arr = structuredClone(input.arr);
  const steps: AlgorithmStep[] = [];
  let stepIndex = 0;

  steps.push({
    stepIndex,
    state: structuredClone(arr),
    action: "initialize",
    explanation: "Starting Array Reversal using two pointers.",
    detailedExplanation: "Initialize left pointer at the start and right pointer at the end of the array.",
    pointers: { left: 0, right: arr.length - 1 },
  });
  stepIndex++;

  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    const leftVal = arr[left];
    const rightVal = arr[right];

    const temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp;

    steps.push({
      stepIndex,
      state: structuredClone(arr),
      action: "swap",
      explanation: `Swapping elements at index ${left} (${leftVal}) and index ${right} (${rightVal}).`,
      detailedExplanation: `Pointer left=${left}, right=${right}. Swap values ${leftVal} and ${rightVal}. Pointers move inward.`,
      highlightedIndices: [left, right],
      swappedIndices: [left, right],
      pointers: { left: left + 1, right: right - 1 },
    });
    stepIndex++;

    left++;
    right--;
  }

  steps.push({
    stepIndex,
    state: structuredClone(arr),
    action: "complete",
    explanation: "Array reversal is complete!",
    detailedExplanation: "Pointers have met or crossed. The array is fully reversed.",
    sortedIndices: arr.map((_, i) => i),
    isComplete: true,
    result: structuredClone(arr),
  });

  return steps;
}
