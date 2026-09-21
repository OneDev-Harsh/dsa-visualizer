import { AlgorithmStep } from "@/lib/algorithms/types";

export type BinarySearchInput = { arr: number[]; target: number };

export function generateSteps(input: BinarySearchInput): AlgorithmStep[] {
  const arr = structuredClone(input.arr);
  const target = input.target;
  const steps: AlgorithmStep[] = [];
  let stepIndex = 0;

  // Validate sorted order
  let isSorted = true;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) {
      isSorted = false;
      break;
    }
  }

  if (!isSorted) {
    arr.sort((a, b) => a - b);
    steps.push({
      stepIndex: stepIndex++,
      state: structuredClone(arr),
      action: "sort",
      explanation:
        "Input array was not sorted. Binary Search requires a sorted array, so we sorted it first.",
      detailedExplanation:
        "Binary Search works by repeatedly dividing the search interval in half. This only works if the array is sorted. The input has been sorted for you.",
      highlightedIndices: [],
      activeLine: 1,
      variables: { target, n: arr.length },
    });
  }

  steps.push({
    stepIndex: stepIndex++,
    state: structuredClone(arr),
    action: "initialize",
    explanation:
      "Starting Binary Search on a sorted array. We'll repeatedly divide the search range in half.",
    detailedExplanation:
      "Binary Search compares the target with the middle element. If they are not equal, the half in which the target cannot lie is eliminated and the search continues on the remaining half.",
    highlightedIndices: [],
    range: { left: 0, right: arr.length - 1 },
    activeLine: 1,
    variables: { target, left: 0, right: arr.length - 1, n: arr.length },
    isComplete: arr.length === 0,
  });

  if (arr.length === 0) {
    steps[steps.length - 1].explanation =
      "Array is empty. Target cannot be found.";
    steps[steps.length - 1].isComplete = true;
    return steps;
  }

  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    // While loop condition step
    steps.push({
      stepIndex: stepIndex++,
      state: structuredClone(arr),
      action: "loop-check",
      explanation: `Search range is [${left}, ${right}]. Calculating mid = ⌊(${left} + ${right}) / 2⌋ = ${mid}.`,
      detailedExplanation: `left = ${left}, right = ${right}. mid = floor((${left} + ${right}) / 2) = ${mid}. We will compare arr[${mid}] with the target.`,
      highlightedIndices: [],
      range: { left, right },
      activeLine: 3,
      variables: { left, right, mid, target, "arr[mid]": arr[mid] },
      pointers: { left, right, mid },
    });

    // Comparison step
    steps.push({
      stepIndex: stepIndex++,
      state: structuredClone(arr),
      action: "compare",
      explanation: `Comparing arr[${mid}] = ${arr[mid]} with target ${target}.`,
      detailedExplanation: `arr[${mid}] = ${arr[mid]}, target = ${target}. ${arr[mid] === target ? "They are equal!" : arr[mid] < target ? `${arr[mid]} < ${target}, so the target must be in the right half.` : `${arr[mid]} > ${target}, so the target must be in the left half.`}`,
      highlightedIndices: [mid],
      comparedIndices: [mid],
      range: { left, right },
      activeLine: 4,
      variables: { left, right, mid, target, "arr[mid]": arr[mid] },
      pointers: { left, right, mid },
    });

    if (arr[mid] === target) {
      steps.push({
        stepIndex: stepIndex++,
        state: structuredClone(arr),
        action: "found",
        explanation: `Found target ${target} at index ${mid}!`,
        detailedExplanation: `arr[${mid}] = ${arr[mid]} matches the target ${target}. Binary Search is complete.`,
        highlightedIndices: [mid],
        foundIndex: mid,
        range: { left, right },
        activeLine: 7,
        variables: { left, right, mid, target, "arr[mid]": arr[mid] },
        pointers: { left, right, mid },
        result: mid,
        isComplete: true,
      });
      return steps;
    } else if (arr[mid] < target) {
      // Update left
      const oldLeft = left;
      left = mid + 1;
      steps.push({
        stepIndex: stepIndex++,
        state: structuredClone(arr),
        action: "update-left",
        explanation: `${arr[mid]} < ${target}, so we eliminate the left half. New range: [${left}, ${right}].`,
        detailedExplanation: `Since arr[${mid}] = ${arr[mid]} < ${target}, the target (if present) must be in indices ${mid + 1} to ${right}. We set left = mid + 1 = ${left}. Eliminating indices ${oldLeft} to ${mid}.`,
        highlightedIndices: Array.from(
          { length: mid - oldLeft + 1 },
          (_, k) => oldLeft + k,
        ),
        range: { left, right },
        activeLine: 5,
        variables: { left, right, mid, target, "arr[mid]": arr[mid] },
        pointers: { left, right, mid },
      });
    } else {
      // Update right
      const oldRight = right;
      right = mid - 1;
      steps.push({
        stepIndex: stepIndex++,
        state: structuredClone(arr),
        action: "update-right",
        explanation: `${arr[mid]} > ${target}, so we eliminate the right half. New range: [${left}, ${right}].`,
        detailedExplanation: `Since arr[${mid}] = ${arr[mid]} > ${target}, the target (if present) must be in indices ${left} to ${mid - 1}. We set right = mid - 1 = ${right}. Eliminating indices ${mid} to ${oldRight}.`,
        highlightedIndices: Array.from(
          { length: oldRight - mid + 1 },
          (_, k) => mid + k,
        ),
        range: { left, right },
        activeLine: 6,
        variables: { left, right, mid, target, "arr[mid]": arr[mid] },
        pointers: { left, right, mid },
      });
    }
  }

  // Not found
  steps.push({
    stepIndex: stepIndex++,
    state: structuredClone(arr),
    action: "not-found",
    explanation: `Search range is empty. Target ${target} is not in the array.`,
    detailedExplanation: `left (${left}) > right (${right}), so the search range is empty. The target ${target} is not present in this array.`,
    highlightedIndices: [],
    range: { left, right },
    activeLine: 7,
    variables: { left, right, target },
    isComplete: true,
  });

  return steps;
}

export default generateSteps;
