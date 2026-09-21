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
      "Starting Insertion Sort. We will build the sorted array one element at a time by inserting each element into its correct position.",
    detailedExplanation:
      "Insertion Sort works by taking elements one at a time from the unsorted portion and inserting them into their correct position within the sorted portion. It is efficient for small or nearly sorted arrays.",
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

  // First element is trivially sorted
  sortedIndices.push(0);

  steps.push({
    stepIndex: stepIndex++,
    state: structuredClone(arr),
    action: "mark-sorted",
    explanation: `Element ${arr[0]} at index 0 is the only element so far. The sorted region is [${arr[0]}].`,
    detailedExplanation:
      "The first element forms the initial sorted region. We will now insert each subsequent element into its correct position within this sorted region.",
    highlightedIndices: [0],
    sortedIndices: [...sortedIndices],
    activeLine: 2,
    variables: { i: 0, "key": arr[0] },
    range: { left: 0, right: 0 },
  });

  for (let i = 1; i < n; i++) {
    const key = arr[i];

    // Announce picking the key
    steps.push({
      stepIndex: stepIndex++,
      state: structuredClone(arr),
      action: "pick-key",
      explanation: `Picking element ${key} at index ${i} as the key to insert.`,
      detailedExplanation:
        `We pick arr[${i}] = ${key} as the key. We need to find the correct position for this key within the sorted region [0..${i - 1}] and shift elements to make room.`,
      highlightedIndices: [i],
      sortedIndices: [...sortedIndices],
      activeLine: 2,
      variables: { i: i, key: key },
      range: { left: 0, right: i },
    });

    let j = i - 1;

    // Compare and shift
    while (j >= 0 && arr[j] > key) {
      // Comparison step
      steps.push({
        stepIndex: stepIndex++,
        state: structuredClone(arr),
        action: "compare",
        explanation: `Comparing key ${key} with arr[${j}] = ${arr[j]}. Since ${arr[j]} > ${key}, we need to shift ${arr[j]} to the right.`,
        detailedExplanation:
          `Comparing the key ${key} with the element at index ${j}. Since arr[${j}] = ${arr[j]} > ${key} = key, this element is larger than our key and must be shifted one position to the right to make room for the key.`,
        highlightedIndices: [j, i],
        comparedIndices: [j, i],
        sortedIndices: [...sortedIndices],
        activeLine: 4,
        variables: { i: i, j: j, key: key, "arr[j]": arr[j] },
        range: { left: 0, right: i },
      });

      // Shift step
      arr[j + 1] = arr[j];

      steps.push({
        stepIndex: stepIndex++,
        state: structuredClone(arr),
        action: "shift",
        explanation: `Shifted ${arr[j]} from index ${j} to index ${j + 1}.`,
        detailedExplanation:
          `Moved arr[${j}] = ${arr[j]} to arr[${j + 1}]. The element ${arr[j]} has been shifted one position to the right. This creates an empty spot at index ${j} that may hold the key.`,
        highlightedIndices: [j, j + 1],
        swappedIndices: [j, j + 1],
        sortedIndices: [...sortedIndices],
        activeLine: 5,
        variables: { i: i, j: j, key: key, "arr[j]": arr[j] },
        range: { left: 0, right: i },
      });

      j--;
    }

    // Check if we stopped because we found a smaller element or reached the beginning
    if (j >= 0 && arr[j] <= key) {
      steps.push({
        stepIndex: stepIndex++,
        state: structuredClone(arr),
        action: "compare",
        explanation: `Comparing key ${key} with arr[${j}] = ${arr[j]}. Since ${arr[j]} <= ${key}, we stop shifting. The key will be inserted at index ${j + 1}.`,
        detailedExplanation:
          `We found that arr[${j}] = ${arr[j]} <= ${key} = key, so the key should be placed after this element. The correct insertion position for the key is index ${j + 1}.`,
        highlightedIndices: [j],
        comparedIndices: [j],
        sortedIndices: [...sortedIndices],
        activeLine: 4,
        variables: { i: i, j: j, key: key, "arr[j]": arr[j], "insertPosition": j + 1 },
        range: { left: 0, right: i },
      });
    }

    // Insert the key
    arr[j + 1] = key;
    sortedIndices.push(i);
    // Keep sortedIndices sorted and unique
    const uniqueSorted = Array.from(new Set(sortedIndices)).sort((a, b) => a - b);

    steps.push({
      stepIndex: stepIndex++,
      state: structuredClone(arr),
      action: "insert",
      explanation: `Inserted key ${key} at index ${j + 1}. The sorted region is now [${arr.slice(0, i + 1).join(", ")}].`,
      detailedExplanation:
        `Placed the key ${key} at its correct position index ${j + 1} within the sorted region. The sorted region now spans indices [0..${i}] with values [${arr.slice(0, i + 1).join(", ")}].`,
      highlightedIndices: [j + 1],
      sortedIndices: [...uniqueSorted],
      activeLine: 6,
      variables: { i: i, j: j, key: key, "insertPosition": j + 1 },
      range: { left: 0, right: i },
    });
  }

  // Complete step
  steps.push({
    stepIndex: stepIndex++,
    state: structuredClone(arr),
    action: "complete",
    explanation: "Insertion Sort is complete! The array is now sorted.",
    detailedExplanation:
      `All ${n} elements have been inserted into their correct positions. The final sorted array is [${arr.join(", ")}]. Insertion Sort is efficient for small datasets and nearly sorted arrays with O(n) best case.`,
    highlightedIndices: [],
    sortedIndices: Array.from({ length: n }, (_, k) => k),
    activeLine: 6,
    variables: { totalInsertions: n - 1 },
    isComplete: true,
  });

  return steps;
}

export default generateSteps;
