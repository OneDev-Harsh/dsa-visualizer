import type { AlgorithmStep } from "@/lib/algorithms/types";

export type StringReversalInput = { str: string };

export function generateSteps(input: StringReversalInput): AlgorithmStep[] {
  const str = structuredClone(input.str);
  const chars = str.split("");
  const steps: AlgorithmStep[] = [];
  let stepIndex = 0;

  steps.push({
    stepIndex,
    state: structuredClone(chars),
    action: "initialize",
    explanation: "Starting String Reversal.",
    detailedExplanation: `Convert string "${str}" to character array [${chars.map((c) => `"${c}"`).join(", ")}] and use two pointers.`,
    pointers: { left: 0, right: chars.length - 1 },
  });
  stepIndex++;

  let left = 0;
  let right = chars.length - 1;

  while (left < right) {
    const leftChar = chars[left];
    const rightChar = chars[right];

    const temp = chars[left];
    chars[left] = chars[right];
    chars[right] = temp;

    steps.push({
      stepIndex,
      state: structuredClone(chars),
      action: "swap",
      explanation: `Swapping characters at index ${left} ('${leftChar}') and index ${right} ('${rightChar}').`,
      detailedExplanation: `Pointer left=${left}, right=${right}. Swap '${leftChar}' and '${rightChar}'. Pointers move inward.`,
      highlightedIndices: [left, right],
      swappedIndices: [left, right],
      pointers: { left: left + 1, right: right - 1 },
    });
    stepIndex++;

    left++;
    right--;
  }

  const reversed = chars.join("");

  steps.push({
    stepIndex,
    state: structuredClone(chars),
    action: "complete",
    explanation: `String reversal is complete! Reversed string: ${reversed}`,
    detailedExplanation: "Pointers have met or crossed. The string is fully reversed.",
    sortedIndices: chars.map((_, i) => i),
    isComplete: true,
    result: reversed,
  });

  return steps;
}
