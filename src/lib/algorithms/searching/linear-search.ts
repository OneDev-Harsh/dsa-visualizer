import { AlgorithmStep } from "@/lib/algorithms/types";

export type LinearSearchInput = { arr: number[]; target: number };

export function generateSteps(input: LinearSearchInput): AlgorithmStep[] {
  const arr = structuredClone(input.arr);
  const target = input.target;
  const steps: AlgorithmStep[] = [];
  let stepIndex = 0;

  steps.push({
    stepIndex: stepIndex++,
    state: structuredClone(arr),
    action: "initialize",
    explanation:
      "Starting Linear Search. We will check each element from left to right.",
    detailedExplanation:
      "Linear Search examines each element in the array sequentially until the target is found or the end is reached. It works on both sorted and unsorted arrays.",
    highlightedIndices: [],
    activeLine: 1,
    variables: { target, n: arr.length },
    isComplete: arr.length === 0,
  });

  if (arr.length === 0) {
    steps[steps.length - 1].explanation =
      "Array is empty. Target cannot be found.";
    steps[steps.length - 1].isComplete = true;
    return steps;
  }

  for (let i = 0; i < arr.length; i++) {
    // Comparison step
    steps.push({
      stepIndex: stepIndex++,
      state: structuredClone(arr),
      action: "compare",
      explanation: `Comparing element at index ${i} (value ${arr[i]}) with target ${target}.`,
      detailedExplanation: `We are at index i = ${i}. arr[${i}] = ${arr[i]}. Is ${arr[i]} === ${target}? ${arr[i] === target ? "Yes!" : "No, they are not equal."}`,
      highlightedIndices: [i],
      comparedIndices: [i],
      activeLine: 2,
      variables: { i, "arr[i]": arr[i], target },
    });

    if (arr[i] === target) {
      // Found step
      steps.push({
        stepIndex: stepIndex++,
        state: structuredClone(arr),
        action: "found",
        explanation: `Found target ${target} at index ${i}!`,
        detailedExplanation: `Element arr[${i}] = ${arr[i]} matches the target ${target}. Linear Search is complete.`,
        highlightedIndices: [i],
        foundIndex: i,
        activeLine: 3,
        variables: { i, "arr[i]": arr[i], target },
        result: i,
        isComplete: true,
      });
      return steps;
    }

    // Moving to next element step
    steps.push({
      stepIndex: stepIndex++,
      state: structuredClone(arr),
      action: "move",
      explanation: `Element at index ${i} is ${arr[i]}, not the target. Moving to next element.`,
      detailedExplanation: `${arr[i]} ≠ ${target}, so we continue scanning. Next we will check index ${i + 1}.`,
      highlightedIndices: [i],
      activeLine: 1,
      variables: { i, "arr[i]": arr[i], target },
    });
  }

  // Not found
  steps.push({
    stepIndex: stepIndex++,
    state: structuredClone(arr),
    action: "not-found",
    explanation: `We have checked all elements. Target ${target} is not in the array.`,
    detailedExplanation: `We examined all ${arr.length} elements and none matched the target ${target}. The target is not present in this array.`,
    highlightedIndices: [],
    activeLine: 3,
    variables: { target, "searched length": arr.length },
    isComplete: true,
  });

  return steps;
}

export default generateSteps;
