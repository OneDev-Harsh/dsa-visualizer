import { AlgorithmStep } from "@/lib/algorithms/types";

export type SortInput = { arr: number[] };

export function generateSteps(input: SortInput): AlgorithmStep[] {
  const arr = structuredClone(input.arr);
  const n = arr.length;
  const steps: AlgorithmStep[] = [];
  const sortedIndices: number[] = [];
  let stepIndex = 0;

  // Initial state
  steps.push({
    stepIndex: stepIndex++,
    state: structuredClone(arr),
    action: "initialize",
    explanation:
      "Starting Selection Sort. We will repeatedly find the minimum element in the unsorted region and place it at the beginning.",
    detailedExplanation:
      "Selection Sort works by dividing the array into a sorted and unsorted region. We repeatedly find the smallest element in the unsorted region and swap it with the first element of the unsorted region, expanding the sorted region by one.",
    highlightedIndices: [],
    sortedIndices: [],
    activeLine: 1,
    variables: { n: n },
    isComplete: n <= 1,
  });

  if (n <= 1) {
    if (n === 1) {
      sortedIndices.push(0);
      steps[steps.length - 1].sortedIndices = [...sortedIndices];
      steps[steps.length - 1].explanation =
        "Array has only one element. It is already sorted.";
    }
    return steps;
  }

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    // Announce start of finding minimum
    steps.push({
      stepIndex: stepIndex++,
      state: structuredClone(arr),
      action: "outer-loop",
      explanation: `Finding the minimum element in the unsorted region from index ${i} to ${n - 1}.`,
      detailedExplanation:
        `Starting outer loop iteration ${i + 1}. The sorted region is indices [0..${i - 1}], and the unsorted region is [${i}..${n - 1}]. We will scan the unsorted region to find the smallest element.`,
      highlightedIndices: [i],
      sortedIndices: [...sortedIndices],
      activeLine: 2,
      variables: { i: i, minIdx: minIdx, "arr[minIdx]": arr[minIdx] },
      range: { left: i, right: n - 1 },
    });

    for (let j = i + 1; j < n; j++) {
      // Comparison step
      steps.push({
        stepIndex: stepIndex++,
        state: structuredClone(arr),
        action: "compare",
        explanation: `Comparing arr[${j}] = ${arr[j]} with current minimum arr[${minIdx}] = ${arr[minIdx]}. ${arr[j] < arr[minIdx] ? `${arr[j]} < ${arr[minIdx]}, so ${arr[j]} becomes the new minimum.` : `${arr[j]} >= ${arr[minIdx]}, so the current minimum stays.`}`,
        detailedExplanation:
          `We are scanning the unsorted region to find the minimum. Currently the minimum is arr[${minIdx}] = ${arr[minIdx]} at index ${minIdx}. We compare with arr[${j}] = ${arr[j]} at index ${j}. ${arr[j] < arr[minIdx] ? `Since ${arr[j]} < ${arr[minIdx]}, we update minIdx to ${j}.` : `Since ${arr[j]} >= ${arr[minIdx]}, the minimum does not change.`}`,
        highlightedIndices: [minIdx, j],
        comparedIndices: [minIdx, j],
        sortedIndices: [...sortedIndices],
        activeLine: 4,
        variables: { i: i, j: j, minIdx: minIdx, "arr[minIdx]": arr[minIdx], "arr[j]": arr[j] },
        range: { left: i, right: n - 1 },
      });

      if (arr[j] < arr[minIdx]) {
        minIdx = j;

        // Update minimum step
        steps.push({
          stepIndex: stepIndex++,
          state: structuredClone(arr),
          action: "update-min",
          explanation: `New minimum found: arr[${minIdx}] = ${arr[minIdx]} at index ${minIdx}.`,
          detailedExplanation:
            `Updated minIdx from ${i === minIdx ? i : minIdx} to ${minIdx}. The new minimum value in the unsorted region is ${arr[minIdx]}. We continue scanning to check if there is an even smaller element.`,
          highlightedIndices: [minIdx],
          sortedIndices: [...sortedIndices],
          activeLine: 5,
          variables: { i: i, j: j, minIdx: minIdx, "arr[minIdx]": arr[minIdx] },
          range: { left: i, right: n - 1 },
          pointers: { min: minIdx },
        });
      }
    }

    // Swap step
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];

      steps.push({
        stepIndex: stepIndex++,
        state: structuredClone(arr),
        action: "swap",
        explanation: `Swapped arr[${i}] = ${arr[i]} and arr[${minIdx}] = ${arr[minIdx]}. The minimum element ${arr[minIdx]} is now at position ${i}.`,
        detailedExplanation:
          `We found that the minimum element in the unsorted region [${i}..${n - 1}] is ${arr[minIdx]} at index ${minIdx}. We swap it with the element at index ${i} (the boundary of the sorted region). After swapping, the sorted region expands to include index ${i}.`,
        highlightedIndices: [i, minIdx],
        swappedIndices: [i, minIdx],
        sortedIndices: [...sortedIndices],
        activeLine: 6,
        variables: { i: i, minIdx: minIdx, "arr[i]": arr[i], "arr[minIdx]": arr[minIdx] },
        range: { left: i, right: n - 1 },
      });
    } else {
      steps.push({
        stepIndex: stepIndex++,
        state: structuredClone(arr),
        action: "no-swap",
        explanation: `Element ${arr[i]} at index ${i} is already the minimum. No swap needed.`,
        detailedExplanation:
          `The minimum element in the unsorted region [${i}..${n - 1}] is already at index ${i}. Since the element is already in its correct position, no swap is performed. The sorted region expands naturally.`,
        highlightedIndices: [i],
        sortedIndices: [...sortedIndices],
        activeLine: 6,
        variables: { i: i, minIdx: minIdx, "arr[i]": arr[i] },
        range: { left: i, right: n - 1 },
      });
    }

    sortedIndices.push(i);
  }

  // Mark last element as sorted
  sortedIndices.push(n - 1);

  steps.push({
    stepIndex: stepIndex++,
    state: structuredClone(arr),
    action: "complete",
    explanation: "Selection Sort is complete! The array is now sorted.",
    detailedExplanation:
      `All ${n} elements have been placed in their correct positions. The final sorted array is [${arr.join(", ")}]. Selection Sort performed exactly ${n - 1} passes through the unsorted region.`,
    highlightedIndices: [],
    sortedIndices: [...sortedIndices],
    activeLine: 6,
    variables: { totalPasses: n - 1 },
    isComplete: true,
  });

  return steps;
}

export default generateSteps;
