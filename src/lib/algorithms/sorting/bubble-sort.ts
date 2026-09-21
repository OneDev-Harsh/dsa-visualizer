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
      "Starting Bubble Sort. We will repeatedly compare adjacent elements and swap them if they are in the wrong order.",
    detailedExplanation:
      "Bubble Sort works by stepping through the list, comparing each pair of adjacent elements, and swapping them if they are in the wrong order. The pass through the list is repeated until the list is sorted. The largest unsorted element 'bubbles up' to its correct position on each pass.",
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
    let swapped = false;

    steps.push({
      stepIndex: stepIndex++,
      state: structuredClone(arr),
      action: "outer-loop",
      explanation: `Starting pass ${i + 1}. We will compare adjacent elements from index 0 to ${n - 2 - i}.`,
      detailedExplanation:
        `Outer loop iteration ${i + 1}. After ${i} pass${i !== 1 ? "es" : ""}, the ${i} largest element${i !== 1 ? "s" : ""} ${i !== 1 ? "have" : "has"} already bubbled to the end. We only need to scan the unsorted portion.`,
      highlightedIndices: [],
      sortedIndices: [...sortedIndices],
      activeLine: 1,
      variables: { i: i, n: n },
      range: { left: 0, right: n - 1 - i },
    });

    for (let j = 0; j < n - 1 - i; j++) {
      // Comparison step
      steps.push({
        stepIndex: stepIndex++,
        state: structuredClone(arr),
        action: "compare",
        explanation: `Comparing ${arr[j]} and ${arr[j + 1]}. Since ${arr[j]} ${arr[j] > arr[j + 1] ? ">" : "<="} ${arr[j + 1]}, ${arr[j] > arr[j + 1] ? "we swap them." : "no swap needed."}`,
        detailedExplanation:
          `Comparing arr[j] and arr[j+1] where j = ${j}. arr[${j}] = ${arr[j]}, arr[${j + 1}] = ${arr[j + 1]}. ${arr[j] > arr[j + 1] ? `${arr[j]} > ${arr[j + 1]}, so we swap these adjacent elements to move the larger value toward the end.` : `${arr[j]} <= ${arr[j + 1]}, so they are already in the correct relative order. No swap is performed.`}`,
        highlightedIndices: [j, j + 1],
        comparedIndices: [j, j + 1],
        sortedIndices: [...sortedIndices],
        activeLine: 3,
        variables: { i: i, j: j, "arr[j]": arr[j], "arr[j+1]": arr[j + 1] },
        range: { left: 0, right: n - 1 - i },
      });

      // Swap step (if needed)
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;

        steps.push({
          stepIndex: stepIndex++,
          state: structuredClone(arr),
          action: "swap",
          explanation: `Swapped ${arr[j]} and ${arr[j + 1]}. The larger element ${arr[j + 1]} moves one position closer to its sorted position.`,
          detailedExplanation:
            `After swapping arr[${j}] and arr[${j + 1}], the array becomes: [${arr.join(", ")}]. The element ${arr[j + 1]} has moved rightward by one position.`,
          highlightedIndices: [j, j + 1],
          swappedIndices: [j, j + 1],
          sortedIndices: [...sortedIndices],
          activeLine: 4,
          variables: { i: i, j: j, "arr[j]": arr[j], "arr[j+1]": arr[j + 1] },
          range: { left: 0, right: n - 1 - i },
        });
      }
    }

    // Mark element as sorted after each pass
    sortedIndices.push(n - 1 - i);

    if (!swapped) {
      // Already sorted, mark all remaining as sorted
      for (let k = n - 2 - i; k >= 0; k--) {
        if (!sortedIndices.includes(k)) {
          sortedIndices.push(k);
        }
      }
      sortedIndices.sort((a, b) => a - b);

      steps.push({
        stepIndex: stepIndex++,
        state: structuredClone(arr),
        action: "complete",
        explanation:
          "Bubble Sort is complete! The array is now sorted. No swaps were needed in this pass, meaning all elements are in order.",
        detailedExplanation:
          "An optimization in Bubble Sort: if no swaps occur during a complete pass, the array is already sorted and we can stop early.",
        highlightedIndices: [],
        sortedIndices: [...sortedIndices],
        activeLine: 6,
        variables: { i: i, passesCompleted: i + 1 },
        isComplete: true,
      });

      return steps;
    }

    steps.push({
      stepIndex: stepIndex++,
      state: structuredClone(arr),
      action: "mark-sorted",
      explanation: `Pass ${i + 1} complete. Element ${arr[n - 1 - i]} is now in its correct sorted position at index ${n - 1 - i}.`,
      detailedExplanation:
        `After pass ${i + 1}, the largest ${i + 1} element${i > 0 ? "s" : ""} of the unsorted portion have bubbled to their correct positions at the end of the array.`,
      highlightedIndices: [n - 1 - i],
      sortedIndices: [...sortedIndices],
      activeLine: 6,
      variables: { i: i, passesCompleted: i + 1, "newly sorted": arr[n - 1 - i] },
      range: { left: 0, right: n - 2 - i },
    });
  }

  // All elements sorted
  for (let k = 0; k < n; k++) {
    if (!sortedIndices.includes(k)) {
      sortedIndices.push(k);
    }
  }
  sortedIndices.sort((a, b) => a - b);

  steps.push({
    stepIndex: stepIndex++,
    state: structuredClone(arr),
    action: "complete",
    explanation: "Bubble Sort is complete! The array is now sorted.",
    detailedExplanation:
      `All ${n} elements have been placed in their correct positions. The final sorted array is [${arr.join(", ")}].`,
    highlightedIndices: [],
    sortedIndices: [...sortedIndices],
    activeLine: 6,
    variables: { totalPasses: n - 1 },
    isComplete: true,
  });

  return steps;
}

export default generateSteps;
