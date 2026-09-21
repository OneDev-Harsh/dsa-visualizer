import type { AlgorithmStep } from "@/lib/algorithms/types";

export type PalindromeInput = { str: string };

export function generateSteps(input: PalindromeInput): AlgorithmStep[] {
  const str = structuredClone(input.str);
  const normalized = str.toLowerCase().replace(/[^a-z0-9]/g, "");
  const chars = normalized.split("");
  const steps: AlgorithmStep[] = [];
  let stepIndex = 0;

  steps.push({
    stepIndex,
    state: structuredClone(chars),
    action: "initialize",
    explanation: "Starting Palindrome Check.",
    detailedExplanation: `Normalize "${str}" → lowercase and remove non-alphanumeric → "${normalized}". Use two pointers to compare from outside in.`,
    pointers: { left: 0, right: chars.length - 1 },
  });
  stepIndex++;

  if (chars.length === 0) {
    steps.push({
      stepIndex,
      state: structuredClone(chars),
      action: "complete",
      explanation: "All characters matched. It's a palindrome!",
      detailedExplanation: "Empty string is considered a palindrome.",
      isComplete: true,
      result: true,
    });
    return steps;
  }

  let left = 0;
  let right = chars.length - 1;

  while (left < right) {
    steps.push({
      stepIndex,
      state: structuredClone(chars),
      action: "compare",
      explanation: `Comparing '${chars[left]}' at index ${left} and '${chars[right]}' at index ${right}.`,
      detailedExplanation: `Left pointer=${left}, right pointer=${right}. Checking if '${chars[left]}' === '${chars[right]}'.`,
      highlightedIndices: [left, right],
      comparedIndices: [left, right],
      pointers: { left, right },
    });
    stepIndex++;

    if (chars[left] !== chars[right]) {
      steps.push({
        stepIndex,
        state: structuredClone(chars),
        action: "mismatch",
        explanation: "Characters don't match. Not a palindrome.",
        detailedExplanation: `'${chars[left]}' !== '${chars[right]}'. The string is not a palindrome.`,
        highlightedIndices: [left, right],
        isComplete: true,
        result: false,
      });
      return steps;
    }

    steps.push({
      stepIndex,
      state: structuredClone(chars),
      action: "match",
      explanation: `'${chars[left]}' === '${chars[right]}'. Characters match.`,
      detailedExplanation: `Pointers move inward: left → ${left + 1}, right → ${right - 1}.`,
      highlightedIndices: [left, right],
      pointers: { left: left + 1, right: right - 1 },
    });
    stepIndex++;

    left++;
    right--;
  }

  steps.push({
    stepIndex,
    state: structuredClone(chars),
    action: "complete",
    explanation: "All characters matched. It's a palindrome!",
    detailedExplanation: "All character pairs matched. The string is a palindrome.",
    sortedIndices: chars.map((_, i) => i),
    isComplete: true,
    result: true,
  });

  return steps;
}
