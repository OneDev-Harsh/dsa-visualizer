import type {
  Algorithm,
  AlgorithmStep,
  Category,
} from "@/lib/algorithms/types";

import { generateSteps as bubbleSortSteps } from "@/lib/algorithms/sorting/bubble-sort";
import { generateSteps as selectionSortSteps } from "@/lib/algorithms/sorting/selection-sort";
import { generateSteps as insertionSortSteps } from "@/lib/algorithms/sorting/insertion-sort";
import { generateSteps as linearSearchSteps } from "@/lib/algorithms/searching/linear-search";
import { generateSteps as binarySearchSteps } from "@/lib/algorithms/searching/binary-search";
import { generateSteps as arrayReversalSteps } from "@/lib/algorithms/arrays/array-reversal";
import { generateSteps as stringReversalSteps } from "@/lib/algorithms/strings/string-reversal";
import { generateSteps as palindromeCheckSteps } from "@/lib/algorithms/strings/palindrome-check";
import { generateSteps as stackOperationsSteps } from "@/lib/algorithms/stacks/stack-operations";
import { generateSteps as factorialSteps } from "@/lib/algorithms/recursion/factorial";
import { generateSteps as fibonacciSteps } from "@/lib/algorithms/recursion/fibonacci";

export const algorithms: Algorithm[] = [
  {
    id: "bubble-sort",
    name: "Bubble Sort",
    category: "Sorting",
    difficulty: "Beginner",
    description:
      "A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.",
    visualizationType: "sorting",
    complexity: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)",
      space: "O(1)",
    },
    defaultInput: { arr: [64, 34, 25, 12, 22, 11, 90] },
    generateSteps: (input: unknown): AlgorithmStep[] =>
      bubbleSortSteps(input as { arr: number[] }),
    validateInput: (input: unknown): { valid: boolean; error?: string } => {
      const data = input as { arr?: number[] };
      if (!data || !Array.isArray(data.arr)) {
        return { valid: false, error: "Input must contain an 'arr' array." };
      }
      if (data.arr.some((x) => typeof x !== "number" || isNaN(x))) {
        return { valid: false, error: "All elements must be valid numbers." };
      }
      return { valid: true };
    },
    pseudocode: [
      "procedure bubbleSort(A: list of sortable items)",
      "    n = length(A)",
      "    for i = 0 to n-1 do",
      "        swapped = false",
      "        for j = 0 to n-i-2 do",
      "            if A[j] > A[j+1] then",
      "                swap(A[j], A[j+1])",
      "                swapped = true",
      "            end if",
      "        end for",
      "        if not swapped then",
      "            break  // Array is sorted",
      "        end if",
      "    end for",
      "end procedure",
    ],
    code: [
      {
        language: "python",
        code: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr`,
      },
      {
        language: "javascript",
        code: `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return arr;
}`,
      },
      {
        language: "typescript",
        code: `function bubbleSort(arr: number[]): number[] {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return arr;
}`,
      },
      {
        language: "java",
        code: `public static void bubbleSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n; i++) {
        boolean swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}`,
      },
      {
        language: "c",
        code: `void bubble_sort(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        int swapped = 0;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = 1;
            }
        }
        if (!swapped) break;
    }
}`,
      },
      {
        language: "cpp",
        code: `void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n; i++) {
        bool swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}`,
      },
    ],
    explanation: {
      whatIsIt:
        "Bubble Sort is a comparison-based sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted. The name comes from the way larger elements 'bubble' to the top of the list.",
      whenToUse:
        "Use Bubble Sort for educational purposes, very small datasets, or when the data is nearly sorted. It is simple to implement and understand, making it a great first algorithm to learn. However, it is not efficient for large datasets compared to algorithms like Quick Sort or Merge Sort.",
      howItWorks: [
        "Compare each pair of adjacent elements from the beginning of the array.",
        "If the first element is greater than the second, swap them.",
        "Continue this process for each pair of adjacent elements in the array.",
        "After one complete pass, the largest element is in its correct position at the end.",
        "Repeat the process for the remaining unsorted portion of the array.",
        "Stop early if no swaps occur during a complete pass (array is already sorted).",
      ],
      commonMistakes: [
        "Forgetting the early termination optimization: if no swaps happen in a pass, the array is already sorted.",
        "Using the wrong loop bounds: the inner loop should go up to n-i-1, not n-1.",
        "Modifying the array while iterating without proper bounds checking.",
        "Assuming Bubble Sort is efficient for large datasets (it has O(n²) time complexity).",
      ],
    },
    practiceProblems: [
      {
        title: "Sort an Array",
        number: 912,
        difficulty: "Medium",
        description:
          "Given an array of integers nums, sort the array in ascending order.",
        url: "https://leetcode.com/problems/sort-an-array/",
      },
      {
        title: "Average Salary Excluding the Minimum and Maximum Salary",
        number: 1491,
        difficulty: "Easy",
        description:
          "Given an array of unique salaries, return the average salary excluding the minimum and maximum.",
        url: "https://leetcode.com/problems/average-salary-excluding-the-minimum-and-maximum-salary/",
      },
    ],
  },
  {
    id: "selection-sort",
    name: "Selection Sort",
    category: "Sorting",
    difficulty: "Beginner",
    description:
      "A sorting algorithm that divides the input into a sorted and unsorted region, and repeatedly selects the smallest element from the unsorted region to grow the sorted region.",
    visualizationType: "sorting",
    complexity: {
      best: "O(n²)",
      average: "O(n²)",
      worst: "O(n²)",
      space: "O(1)",
    },
    defaultInput: { arr: [64, 25, 12, 22, 11] },
    generateSteps: (input: unknown): AlgorithmStep[] =>
      selectionSortSteps(input as { arr: number[] }),
    validateInput: (input: unknown): { valid: boolean; error?: string } => {
      const data = input as { arr?: number[] };
      if (!data || !Array.isArray(data.arr)) {
        return { valid: false, error: "Input must contain an 'arr' array." };
      }
      if (data.arr.some((x) => typeof x !== "number" || isNaN(x))) {
        return { valid: false, error: "All elements must be valid numbers." };
      }
      return { valid: true };
    },
    pseudocode: [
      "procedure selectionSort(A: list of sortable items)",
      "    n = length(A)",
      "    for i = 0 to n-2 do",
      "        minIdx = i",
      "        for j = i+1 to n-1 do",
      "            if A[j] < A[minIdx] then",
      "                minIdx = j",
      "            end if",
      "        end for",
      "        if minIdx ≠ i then",
      "            swap(A[i], A[minIdx])",
      "        end if",
      "    end for",
      "end procedure",
    ],
    code: [
      {
        language: "python",
        code: `def selection_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        if min_idx != i:
            arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr`,
      },
      {
        language: "javascript",
        code: `function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  return arr;
}`,
      },
      {
        language: "typescript",
        code: `function selectionSort(arr: number[]): number[] {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  return arr;
}`,
      },
      {
        language: "java",
        code: `public static void selectionSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        if (minIdx != i) {
            int temp = arr[i];
            arr[i] = arr[minIdx];
            arr[minIdx] = temp;
        }
    }
}`,
      },
      {
        language: "c",
        code: `void selection_sort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int min_idx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[min_idx]) {
                min_idx = j;
            }
        }
        if (min_idx != i) {
            int temp = arr[i];
            arr[i] = arr[min_idx];
            arr[min_idx] = temp;
        }
    }
}`,
      },
      {
        language: "cpp",
        code: `void selectionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        if (minIdx != i) {
            swap(arr[i], arr[minIdx]);
        }
    }
}`,
      },
    ],
    explanation: {
      whatIsIt:
        "Selection Sort is an in-place comparison sorting algorithm. It divides the input list into two parts: a sorted sublist of items which is built up from left to right at the front of the list, and a sublist of the remaining unsorted items. Initially, the sorted sublist is empty and the unsorted sublist is the entire input list.",
      whenToUse:
        "Use Selection Sort when you want to minimize the number of swaps. It performs O(n) swaps in the worst case, making it useful when write operations are expensive. It is also simple to understand and implement, making it useful for educational purposes.",
      howItWorks: [
        "Start with the entire array as unsorted.",
        "Find the minimum element in the unsorted portion.",
        "Swap the minimum element with the first element of the unsorted portion.",
        "The sorted portion now includes one more element from the left.",
        "Repeat until the entire array is sorted.",
      ],
      commonMistakes: [
        "Confusing Selection Sort with Insertion Sort: Selection Sort finds the minimum and swaps, while Insertion Sort picks an element and shifts.",
        "Not updating minIdx correctly when a smaller element is found.",
        "Swapping elements even when minIdx equals the current index (unnecessary swap).",
        "Thinking Selection Sort is efficient because it minimizes swaps: it still has O(n²) comparisons.",
      ],
    },
    practiceProblems: [
      {
        title: "Sort an Array",
        number: 912,
        difficulty: "Medium",
        description:
          "Given an array of integers nums, sort the array in ascending order.",
        url: "https://leetcode.com/problems/sort-an-array/",
      },
      {
        title: "Move Zeroes",
        number: 283,
        difficulty: "Easy",
        description:
          "Given an integer array nums, move all 0's to the end while maintaining the relative order of non-zero elements.",
        url: "https://leetcode.com/problems/move-zeroes/",
      },
    ],
  },
  {
    id: "insertion-sort",
    name: "Insertion Sort",
    category: "Sorting",
    difficulty: "Beginner",
    description:
      "A simple sorting algorithm that builds the final sorted array one item at a time by inserting each element into its correct position.",
    visualizationType: "sorting",
    complexity: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)",
      space: "O(1)",
    },
    defaultInput: { arr: [12, 11, 13, 5, 6] },
    generateSteps: (input: unknown): AlgorithmStep[] =>
      insertionSortSteps(input as { arr: number[] }),
    validateInput: (input: unknown): { valid: boolean; error?: string } => {
      const data = input as { arr?: number[] };
      if (!data || !Array.isArray(data.arr)) {
        return { valid: false, error: "Input must contain an 'arr' array." };
      }
      if (data.arr.some((x) => typeof x !== "number" || isNaN(x))) {
        return { valid: false, error: "All elements must be valid numbers." };
      }
      return { valid: true };
    },
    pseudocode: [
      "procedure insertionSort(A: list of sortable items)",
      "    for i = 1 to length(A) - 1 do",
      "        key = A[i]",
      "        j = i - 1",
      "        while j >= 0 and A[j] > key do",
      "            A[j+1] = A[j]",
      "            j = j - 1",
      "        end while",
      "        A[j+1] = key",
      "    end for",
      "end procedure",
    ],
    code: [
      {
        language: "python",
        code: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr`,
      },
      {
        language: "javascript",
        code: `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`,
      },
      {
        language: "typescript",
        code: `function insertionSort(arr: number[]): number[] {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`,
      },
      {
        language: "java",
        code: `public static void insertionSort(int[] arr) {
    for (int i = 1; i < arr.length; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`,
      },
      {
        language: "c",
        code: `void insertion_sort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`,
      },
      {
        language: "cpp",
        code: `void insertionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`,
      },
    ],
    explanation: {
      whatIsIt:
        "Insertion Sort is a simple sorting algorithm that builds the final sorted array one item at a time. It is much like the way you sort playing cards in your hands. You pick up one card at a time and insert it into its correct position among the cards you've already sorted.",
      whenToUse:
        "Use Insertion Sort for small datasets, nearly sorted arrays, or as part of a more complex algorithm (like TimSort). It is stable, in-place, and adaptive — meaning it performs well on data that is already substantially sorted.",
      howItWorks: [
        "Start with the second element (index 1) as the key.",
        "Compare the key with elements in the sorted portion (to its left).",
        "Shift all larger elements one position to the right.",
        "Insert the key into its correct position.",
        "Repeat for each subsequent element until the entire array is sorted.",
      ],
      commonMistakes: [
        "Off-by-one errors: starting the loop at index 0 instead of index 1.",
        "Forgetting to shift elements before inserting the key, causing data loss.",
        "Using the wrong comparison operator (should be > for ascending order).",
        "Not handling the case where the key is smaller than all sorted elements (j goes to -1).",
      ],
    },
    practiceProblems: [
      {
        title: "Sort an Array",
        number: 912,
        difficulty: "Medium",
        description:
          "Given an array of integers nums, sort the array in ascending order.",
        url: "https://leetcode.com/problems/sort-an-array/",
      },
      {
        title: "Insertion Sort List",
        number: 147,
        difficulty: "Medium",
        description:
          "Sort a linked list using insertion sort. Return the sorted list's head.",
        url: "https://leetcode.com/problems/insertion-sort-list/",
      },
    ],
  },
  {
    id: "linear-search",
    name: "Linear Search",
    category: "Searching",
    difficulty: "Beginner",
    description:
      "A simple search algorithm that checks each element in a list sequentially until the target value is found or the list is exhausted.",
    visualizationType: "search",
    complexity: {
      best: "O(1)",
      average: "O(n)",
      worst: "O(n)",
      space: "O(1)",
    },
    defaultInput: { arr: [2, 3, 4, 10, 40], target: 10 },
    generateSteps: (input: unknown): AlgorithmStep[] =>
      linearSearchSteps(input as { arr: number[]; target: number }),
    validateInput: (input: unknown): { valid: boolean; error?: string } => {
      const data = input as { arr?: number[]; target?: number };
      if (!data || !Array.isArray(data.arr)) {
        return { valid: false, error: "Input must contain an 'arr' array." };
      }
      if (typeof data.target !== "number" || isNaN(data.target)) {
        return { valid: false, error: "Input must contain a 'target' number." };
      }
      return { valid: true };
    },
    pseudocode: [
      "procedure linearSearch(A, target)",
      "    for i = 0 to length(A) - 1 do",
      "        if A[i] = target then",
      "            return i",
      "        end if",
      "    end for",
      "    return not found",
      "end procedure",
    ],
    code: [
      {
        language: "python",
        code: `def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1`,
      },
      {
        language: "javascript",
        code: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;
    }
  }
  return -1;
}`,
      },
      {
        language: "typescript",
        code: `function linearSearch(arr: number[], target: number): number {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;
    }
  }
  return -1;
}`,
      },
      {
        language: "java",
        code: `public static int linearSearch(int[] arr, int target) {
    for (int i = 0; i < arr.length; i++) {
        if (arr[i] == target) {
            return i;
        }
    }
    return -1;
}`,
      },
      {
        language: "c",
        code: `int linear_search(int arr[], int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) {
            return i;
        }
    }
    return -1;
}`,
      },
      {
        language: "cpp",
        code: `int linearSearch(const vector<int>& arr, int target) {
    for (int i = 0; i < arr.size(); i++) {
        if (arr[i] == target) {
            return i;
        }
    }
    return -1;
}`,
      },
    ],
    explanation: {
      whatIsIt:
        "Linear Search (also known as sequential search) is the simplest search algorithm. It works by checking each element of the list one by one until the target element is found or the end of the list is reached.",
      whenToUse:
        "Use Linear Search when the data is unsorted, the list is small, or you only need to search once. It does not require any preprocessing and works on any collection, including linked lists where random access is not available.",
      howItWorks: [
        "Start at the beginning of the array.",
        "Compare the current element with the target value.",
        "If they match, return the current index.",
        "If they don't match, move to the next element.",
        "If you reach the end without finding the target, return -1 (not found).",
      ],
      commonMistakes: [
        "Returning the wrong index when duplicates exist (should return the first occurrence).",
        "Forgetting to handle the case where the target is not in the array (return -1).",
        "Using Linear Search on large sorted arrays where Binary Search would be more efficient.",
        "Off-by-one errors in the loop boundary conditions.",
      ],
    },
    practiceProblems: [
      {
        title: "Binary Search",
        number: 704,
        difficulty: "Easy",
        description:
          "Given a sorted array and a target, return the index if found. Otherwise return -1. (Linear search is a simpler alternative.)",
        url: "https://leetcode.com/problems/binary-search/",
      },
      {
        title: "Intersection of Two Arrays",
        number: 349,
        difficulty: "Easy",
        description:
          "Given two integer arrays, return an array of their intersection. Each element in the result must be unique.",
        url: "https://leetcode.com/problems/intersection-of-two-arrays/",
      },
    ],
  },
  {
    id: "binary-search",
    name: "Binary Search",
    category: "Searching",
    difficulty: "Beginner",
    description:
      "An efficient search algorithm that finds the position of a target value within a sorted array by repeatedly dividing the search interval in half.",
    visualizationType: "search",
    complexity: {
      best: "O(1)",
      average: "O(log n)",
      worst: "O(log n)",
      space: "O(1)",
    },
    defaultInput: { arr: [2, 3, 4, 10, 40], target: 10 },
    generateSteps: (input: unknown): AlgorithmStep[] =>
      binarySearchSteps(input as { arr: number[]; target: number }),
    validateInput: (input: unknown): { valid: boolean; error?: string } => {
      const data = input as { arr?: number[]; target?: number };
      if (!data || !Array.isArray(data.arr)) {
        return { valid: false, error: "Input must contain an 'arr' array." };
      }
      if (typeof data.target !== "number" || isNaN(data.target)) {
        return { valid: false, error: "Input must contain a 'target' number." };
      }
      return { valid: true };
    },
    pseudocode: [
      "procedure binarySearch(A, target)",
      "    left = 0",
      "    right = length(A) - 1",
      "    while left <= right do",
      "        mid = floor((left + right) / 2)",
      "        if A[mid] = target then",
      "            return mid",
      "        else if A[mid] < target then",
      "            left = mid + 1",
      "        else",
      "            right = mid - 1",
      "        end if",
      "    end while",
      "    return not found",
      "end procedure",
    ],
    code: [
      {
        language: "python",
        code: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`,
      },
      {
        language: "javascript",
        code: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
}`,
      },
      {
        language: "typescript",
        code: `function binarySearch(arr: number[], target: number): number {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
}`,
      },
      {
        language: "java",
        code: `public static int binarySearch(int[] arr, int target) {
    int left = 0;
    int right = arr.length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}`,
      },
      {
        language: "c",
        code: `int binary_search(int arr[], int n, int target) {
    int left = 0;
    int right = n - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}`,
      },
      {
        language: "cpp",
        code: `int binarySearch(const vector<int>& arr, int target) {
    int left = 0;
    int right = arr.size() - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}`,
      },
    ],
    explanation: {
      whatIsIt:
        "Binary Search is an efficient algorithm for finding an item from a sorted list of items. It works by repeatedly dividing the search interval in half. If the value of the search key is less than the item in the middle of the interval, the algorithm narrows the interval to the lower half, otherwise it narrows it to the upper half.",
      whenToUse:
        "Use Binary Search when the data is sorted and you need efficient searching. It is ideal for large datasets where O(log n) performance is significantly better than O(n) linear search. Common applications include searching in dictionaries, phone directories, and debugging with bisect.",
      howItWorks: [
        "Compare the target with the middle element of the sorted array.",
        "If the target equals the middle element, the search is complete.",
        "If the target is less than the middle element, search the left half.",
        "If the target is greater than the middle element, search the right half.",
        "Repeat until the target is found or the search range is empty.",
      ],
      commonMistakes: [
        "Using Binary Search on an unsorted array (it requires sorted data).",
        "Integer overflow when calculating mid: use left + (right - left) / 2 instead of (left + right) / 2.",
        "Off-by-one errors: using left < right instead of left <= right as the loop condition.",
        "Updating wrong boundary: left should become mid + 1, not mid; right should become mid - 1, not mid.",
      ],
    },
    practiceProblems: [
      {
        title: "Binary Search",
        number: 704,
        difficulty: "Easy",
        description:
          "Given a sorted array of distinct integers and a target value, return the index if found. Otherwise return -1.",
        url: "https://leetcode.com/problems/binary-search/",
      },
      {
        title: "Search Insert Position",
        number: 35,
        difficulty: "Easy",
        description:
          "Given a sorted array and a target value, return the index where it should be inserted.",
        url: "https://leetcode.com/problems/search-insert-position/",
      },
    ],
  },
  {
    id: "array-reversal",
    name: "Array Reversal",
    category: "Arrays",
    difficulty: "Beginner",
    description:
      "A technique that reverses the elements of an array in-place using two pointers starting from opposite ends.",
    visualizationType: "array",
    complexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
      space: "O(1)",
    },
    defaultInput: { arr: [1, 2, 3, 4, 5] },
    generateSteps: (input: unknown): AlgorithmStep[] =>
      arrayReversalSteps(input as { arr: number[] }),
    validateInput: (input: unknown): { valid: boolean; error?: string } => {
      const data = input as { arr?: number[] };
      if (!data || !Array.isArray(data.arr)) {
        return { valid: false, error: "Input must contain an 'arr' array." };
      }
      if (data.arr.some((x) => typeof x !== "number" || isNaN(x))) {
        return { valid: false, error: "All elements must be valid numbers." };
      }
      return { valid: true };
    },
    pseudocode: [
      "procedure reverseArray(A)",
      "    left = 0",
      "    right = length(A) - 1",
      "    while left < right do",
      "        swap(A[left], A[right])",
      "        left = left + 1",
      "        right = right - 1",
      "    end while",
      "end procedure",
    ],
    code: [
      {
        language: "python",
        code: `def reverse_array(arr):
    left, right = 0, len(arr) - 1
    while left < right:
        arr[left], arr[right] = arr[right], arr[left]
        left += 1
        right -= 1
    return arr`,
      },
      {
        language: "javascript",
        code: `function reverseArray(arr) {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }
  return arr;
}`,
      },
      {
        language: "typescript",
        code: `function reverseArray(arr: number[]): number[] {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }
  return arr;
}`,
      },
      {
        language: "java",
        code: `public static void reverseArray(int[] arr) {
    int left = 0;
    int right = arr.length - 1;
    while (left < right) {
        int temp = arr[left];
        arr[left] = arr[right];
        arr[right] = temp;
        left++;
        right--;
    }
}`,
      },
      {
        language: "c",
        code: `void reverse_array(int arr[], int n) {
    int left = 0;
    int right = n - 1;
    while (left < right) {
        int temp = arr[left];
        arr[left] = arr[right];
        arr[right] = temp;
        left++;
        right--;
    }
}`,
      },
      {
        language: "cpp",
        code: `void reverseArray(vector<int>& arr) {
    int left = 0;
    int right = arr.size() - 1;
    while (left < right) {
        swap(arr[left], arr[right]);
        left++;
        right--;
    }
}`,
      },
    ],
    explanation: {
      whatIsIt:
        "Array Reversal is the process of reversing the order of elements in an array. The most common approach uses two pointers — one starting at the beginning and one at the end — that swap elements and move toward each other until they meet.",
      whenToUse:
        "Use Array Reversal as a building block in other algorithms (like reversing a linked list, checking palindromes, or rotating arrays). It is also useful when you need to process data in reverse order without allocating extra memory.",
      howItWorks: [
        "Initialize a left pointer at the start (index 0) and a right pointer at the end (index n-1).",
        "Swap the elements at the left and right pointers.",
        "Move the left pointer one position right.",
        "Move the right pointer one position left.",
        "Repeat until the pointers meet or cross each other.",
      ],
      commonMistakes: [
        "Using a for loop with the wrong number of iterations (should be n/2 swaps, not n).",
        "Forgetting to handle odd-length arrays (the middle element stays in place).",
        "Using extra space when the reversal should be in-place.",
        "Off-by-one errors when calculating the right pointer's initial position.",
      ],
    },
    practiceProblems: [
      {
        title: "Reverse String",
        number: 344,
        difficulty: "Easy",
        description:
          "Write a function that reverses a string. The input string is given as an array of characters.",
        url: "https://leetcode.com/problems/reverse-string/",
      },
      {
        title: "Valid Palindrome",
        number: 125,
        difficulty: "Easy",
        description:
          "A phrase is a palindrome if it reads the same forward and backward after converting to lowercase and removing non-alphanumeric characters.",
        url: "https://leetcode.com/problems/valid-palindrome/",
      },
    ],
  },
  {
    id: "string-reversal",
    name: "String Reversal",
    category: "Strings",
    difficulty: "Beginner",
    description:
      "The process of reversing the characters in a string using a two-pointer approach on the character array.",
    visualizationType: "string",
    complexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
      space: "O(n)",
    },
    defaultInput: { str: "hello" },
    generateSteps: (input: unknown): AlgorithmStep[] =>
      stringReversalSteps(input as { str: string }),
    validateInput: (input: unknown): { valid: boolean; error?: string } => {
      const data = input as { str?: string };
      if (!data || typeof data.str !== "string") {
        return { valid: false, error: "Input must contain a 'str' string." };
      }
      return { valid: true };
    },
    pseudocode: [
      "procedure reverseString(s)",
      "    chars = character array of s",
      "    left = 0",
      "    right = length(chars) - 1",
      "    while left < right do",
      "        swap(chars[left], chars[right])",
      "        left = left + 1",
      "        right = right - 1",
      "    end while",
      "    return join(chars)",
      "end procedure",
    ],
    code: [
      {
        language: "python",
        code: `def reverse_string(s):
    chars = list(s)
    left, right = 0, len(chars) - 1
    while left < right:
        chars[left], chars[right] = chars[right], chars[left]
        left += 1
        right -= 1
    return ''.join(chars)`,
      },
      {
        language: "javascript",
        code: `function reverseString(s) {
  const chars = s.split("");
  let left = 0;
  let right = chars.length - 1;
  while (left < right) {
    [chars[left], chars[right]] = [chars[right], chars[left]];
    left++;
    right--;
  }
  return chars.join("");
}`,
      },
      {
        language: "typescript",
        code: `function reverseString(s: string): string {
  const chars = s.split("");
  let left = 0;
  let right = chars.length - 1;
  while (left < right) {
    [chars[left], chars[right]] = [chars[right], chars[left]];
    left++;
    right--;
  }
  return chars.join("");
}`,
      },
      {
        language: "java",
        code: `public static String reverseString(String s) {
    char[] chars = s.toCharArray();
    int left = 0;
    int right = chars.length - 1;
    while (left < right) {
        char temp = chars[left];
        chars[left] = chars[right];
        chars[right] = temp;
        left++;
        right--;
    }
    return new String(chars);
}`,
      },
      {
        language: "c",
        code: `void reverse_string(char* s) {
    int left = 0;
    int right = strlen(s) - 1;
    while (left < right) {
        char temp = s[left];
        s[left] = s[right];
        s[right] = temp;
        left++;
        right--;
    }
}`,
      },
      {
        language: "cpp",
        code: `string reverseString(string s) {
    int left = 0;
    int right = s.length() - 1;
    while (left < right) {
        swap(s[left], s[right]);
        left++;
        right--;
    }
    return s;
}`,
      },
    ],
    explanation: {
      whatIsIt:
        "String Reversal is the process of reversing the order of characters in a string. Since strings are immutable in many languages, the typical approach converts the string to a character array, performs an in-place reversal using two pointers, and then joins the characters back into a string.",
      whenToUse:
        "Use String Reversal as a fundamental building block in many string processing algorithms. It is commonly used in palindrome checking, anagram detection, and various coding interview problems.",
      howItWorks: [
        "Convert the string into an array of characters (if the language requires it).",
        "Initialize a left pointer at the start and a right pointer at the end.",
        "Swap the characters at the left and right pointers.",
        "Move both pointers toward the center.",
        "Repeat until the pointers meet, then join the characters back into a string.",
      ],
      commonMistakes: [
        "Forgetting that strings may be immutable, requiring conversion to a mutable array first.",
        "Using extra space by creating a new string instead of modifying in-place.",
        "Off-by-one errors when calculating the right pointer for odd-length strings.",
        "Not handling empty strings or single-character strings correctly.",
      ],
    },
    practiceProblems: [
      {
        title: "Reverse String",
        number: 344,
        difficulty: "Easy",
        description:
          "Write a function that reverses a string. The input string is given as an array of characters. You must do this by modifying the input array in-place with O(1) extra memory.",
        url: "https://leetcode.com/problems/reverse-string/",
      },
    ],
  },
  {
    id: "palindrome-check",
    name: "Palindrome Check",
    category: "Strings",
    difficulty: "Beginner",
    description:
      "An algorithm to determine if a string reads the same forwards and backwards, using two pointers from both ends.",
    visualizationType: "string",
    complexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
      space: "O(1)",
    },
    defaultInput: { str: "racecar" },
    generateSteps: (input: unknown): AlgorithmStep[] =>
      palindromeCheckSteps(input as { str: string }),
    validateInput: (input: unknown): { valid: boolean; error?: string } => {
      const data = input as { str?: string };
      if (!data || typeof data.str !== "string") {
        return { valid: false, error: "Input must contain a 'str' string." };
      }
      return { valid: true };
    },
    pseudocode: [
      "procedure isPalindrome(s)",
      "    normalize s to lowercase and remove non-alphanumeric characters",
      "    left = 0",
      "    right = length(s) - 1",
      "    while left < right do",
      "        if s[left] ≠ s[right] then",
      "            return false",
      "        end if",
      "        left = left + 1",
      "        right = right - 1",
      "    end while",
      "    return true",
      "end procedure",
    ],
    code: [
      {
        language: "python",
        code: `def is_palindrome(s):
    normalized = ''.join(c.lower() for c in s if c.isalnum())
    left, right = 0, len(normalized) - 1
    while left < right:
        if normalized[left] != normalized[right]:
            return False
        left += 1
        right -= 1
    return True`,
      },
      {
        language: "javascript",
        code: `function isPalindrome(s) {
  const normalized = s.toLowerCase().replace(/[^a-z0-9]/g, "");
  let left = 0;
  let right = normalized.length - 1;
  while (left < right) {
    if (normalized[left] !== normalized[right]) {
      return false;
    }
    left++;
    right--;
  }
  return true;
}`,
      },
      {
        language: "typescript",
        code: `function isPalindrome(s: string): boolean {
  const normalized = s.toLowerCase().replace(/[^a-z0-9]/g, "");
  let left = 0;
  let right = normalized.length - 1;
  while (left < right) {
    if (normalized[left] !== normalized[right]) {
      return false;
    }
    left++;
    right--;
  }
  return true;
}`,
      },
      {
        language: "java",
        code: `public static boolean isPalindrome(String s) {
    String normalized = s.toLowerCase().replaceAll("[^a-z0-9]", "");
    int left = 0;
    int right = normalized.length() - 1;
    while (left < right) {
        if (normalized.charAt(left) != normalized.charAt(right)) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}`,
      },
      {
        language: "c",
        code: `int is_palindrome(const char* s) {
    int len = strlen(s);
    int left = 0;
    int right = len - 1;
    while (left < right) {
        while (left < right && !isalnum(s[left])) left++;
        while (left < right && !isalnum(s[right])) right--;
        if (tolower(s[left]) != tolower(s[right])) {
            return 0;
        }
        left++;
        right--;
    }
    return 1;
}`,
      },
      {
        language: "cpp",
        code: `bool isPalindrome(string s) {
    string normalized = "";
    for (char c : s) {
        if (isalnum(c)) {
            normalized += tolower(c);
        }
    }
    int left = 0;
    int right = normalized.length() - 1;
    while (left < right) {
        if (normalized[left] != normalized[right]) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}`,
      },
    ],
    explanation: {
      whatIsIt:
        "A Palindrome Check determines whether a given string reads the same forwards and backwards. After normalizing the string (converting to lowercase and removing non-alphanumeric characters), the algorithm uses two pointers to compare characters from both ends.",
      whenToUse:
        "Use Palindrome Check for text processing, data validation, and many coding interview problems. It is commonly used in DNA sequence analysis, IP address validation, and word games.",
      howItWorks: [
        "Normalize the string by converting to lowercase and removing non-alphanumeric characters.",
        "Initialize a left pointer at the start and a right pointer at the end.",
        "Compare characters at both pointers.",
        "If they don't match, the string is not a palindrome.",
        "If they match, move both pointers toward the center and continue.",
        "If all pairs match, the string is a palindrome.",
      ],
      commonMistakes: [
        "Forgetting to normalize the string (case sensitivity and special characters).",
        "Using extra space by creating a reversed string instead of comparing in-place.",
        "Not handling empty strings (an empty string is a palindrome).",
        "Stopping the comparison too early or too late due to off-by-one errors.",
      ],
    },
    practiceProblems: [
      {
        title: "Valid Palindrome",
        number: 125,
        difficulty: "Easy",
        description:
          "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.",
        url: "https://leetcode.com/problems/valid-palindrome/",
      },
      {
        title: "Valid Palindrome II",
        number: 680,
        difficulty: "Easy",
        description:
          "Given a string s, return true if s can be made a palindrome by deleting at most one character.",
        url: "https://leetcode.com/problems/valid-palindrome-ii/",
      },
    ],
  },
  {
    id: "stack-operations",
    name: "Stack Operations",
    category: "Stacks",
    difficulty: "Beginner",
    description:
      "Visualization of fundamental stack operations: push (add to top) and pop (remove from top), demonstrating LIFO (Last In, First Out) behavior.",
    visualizationType: "stack",
    complexity: {
      best: "O(1)",
      average: "O(1)",
      worst: "O(1)",
      space: "O(n)",
    },
    defaultInput: {
      operations: [
        { type: "push", value: 10 },
        { type: "push", value: 20 },
        { type: "push", value: 30 },
        { type: "pop" },
        { type: "pop" },
        { type: "push", value: 40 },
        { type: "pop" },
      ],
    },
    generateSteps: (input: unknown): AlgorithmStep[] =>
      stackOperationsSteps(
        input as { operations: Array<{ type: "push" | "pop"; value?: number }> }
      ),
    validateInput: (input: unknown): { valid: boolean; error?: string } => {
      const data = input as {
        operations?: Array<{ type: string; value?: number }>;
      };
      if (!data || !Array.isArray(data.operations)) {
        return {
          valid: false,
          error: "Input must contain an 'operations' array.",
        };
      }
      for (const op of data.operations) {
        if (op.type !== "push" && op.type !== "pop") {
          return {
            valid: false,
            error: `Invalid operation type: '${op.type}'. Must be 'push' or 'pop'.`,
          };
        }
        if (op.type === "push" && typeof op.value !== "number") {
          return {
            valid: false,
            error: "Push operations must include a numeric 'value'.",
          };
        }
      }
      return { valid: true };
    },
    pseudocode: [
      "procedure stackOperations(operations)",
      "    stack = empty stack",
      "    for each operation in operations do",
      "        if operation.type = push then",
      "            push operation.value onto stack",
      "        else if operation.type = pop then",
      "            if stack is not empty then",
      "                pop from stack",
      "            else",
      "                report stack underflow error",
      "            end if",
      "        end if",
      "    end for",
      "end procedure",
    ],
    code: [
      {
        language: "python",
        code: `class Stack:
    def __init__(self):
        self.items = []

    def push(self, value):
        self.items.append(value)

    def pop(self):
        if not self.is_empty():
            return self.items.pop()
        raise IndexError("Stack underflow")

    def is_empty(self):
        return len(self.items) == 0

    def peek(self):
        if not self.is_empty():
            return self.items[-1]
        raise IndexError("Stack is empty")

    def size(self):
        return len(self.items)`,
      },
      {
        language: "javascript",
        code: `class Stack {
  constructor() {
    this.items = [];
  }

  push(value) {
    this.items.push(value);
  }

  pop() {
    if (!this.isEmpty()) {
      return this.items.pop();
    }
    throw new Error("Stack underflow");
  }

  isEmpty() {
    return this.items.length === 0;
  }

  peek() {
    if (!this.isEmpty()) {
      return this.items[this.items.length - 1];
    }
    throw new Error("Stack is empty");
  }

  size() {
    return this.items.length;
  }
}`,
      },
      {
        language: "typescript",
        code: `class Stack {
  private items: number[] = [];

  push(value: number): void {
    this.items.push(value);
  }

  pop(): number {
    if (!this.isEmpty()) {
      return this.items.pop()!;
    }
    throw new Error("Stack underflow");
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  peek(): number {
    if (!this.isEmpty()) {
      return this.items[this.items.length - 1];
    }
    throw new Error("Stack is empty");
  }

  size(): number {
    return this.items.length;
  }
}`,
      },
      {
        language: "java",
        code: `public class Stack {
    private int[] items;
    private int top;
    private int capacity;

    public Stack(int capacity) {
        this.capacity = capacity;
        this.items = new int[capacity];
        this.top = -1;
    }

    public void push(int value) {
        if (top == capacity - 1) {
            throw new RuntimeException("Stack overflow");
        }
        items[++top] = value;
    }

    public int pop() {
        if (isEmpty()) {
            throw new RuntimeException("Stack underflow");
        }
        return items[top--];
    }

    public boolean isEmpty() {
        return top == -1;
    }

    public int peek() {
        if (isEmpty()) {
            throw new RuntimeException("Stack is empty");
        }
        return items[top];
    }
}`,
      },
      {
        language: "c",
        code: `#define MAX 1000

typedef struct {
    int items[MAX];
    int top;
} Stack;

void init_stack(Stack* s) {
    s->top = -1;
}

int is_empty(Stack* s) {
    return s->top == -1;
}

void push(Stack* s, int value) {
    if (s->top == MAX - 1) {
        printf("Stack overflow\\n");
        return;
    }
    s->items[++(s->top)] = value;
}

int pop(Stack* s) {
    if (is_empty(s)) {
        printf("Stack underflow\\n");
        return -1;
    }
    return s->items[(s->top)--];
}

int peek(Stack* s) {
    if (is_empty(s)) {
        printf("Stack is empty\\n");
        return -1;
    }
    return s->items[s->top];
}`,
      },
      {
        language: "cpp",
        code: `class Stack {
private:
    vector<int> items;

public:
    void push(int value) {
        items.push_back(value);
    }

    int pop() {
        if (!isEmpty()) {
            int value = items.back();
            items.pop_back();
            return value;
        }
        throw runtime_error("Stack underflow");
    }

    bool isEmpty() const {
        return items.empty();
    }

    int peek() const {
        if (!isEmpty()) {
            return items.back();
        }
        throw runtime_error("Stack is empty");
    }

    int size() const {
        return items.size();
    }
};`,
      },
    ],
    explanation: {
      whatIsIt:
        "A Stack is a linear data structure that follows the LIFO (Last In, First Out) principle. The two fundamental operations are push (add an element to the top) and pop (remove the top element). Think of it like a stack of plates — you can only add or remove from the top.",
      whenToUse:
        "Use Stacks for problems involving undo/redo functionality, function call management (recursion), expression evaluation, backtracking algorithms, and balancing parentheses. They are also used in depth-first search (DFS) and in parsing expressions.",
      howItWorks: [
        "Initialize an empty stack.",
        "Push operation: Add an element to the top of the stack.",
        "Pop operation: Remove and return the top element from the stack.",
        "Peek operation: View the top element without removing it.",
        "The stack always operates on the most recently added element (LIFO).",
      ],
      commonMistakes: [
        "Popping from an empty stack (stack underflow) — always check if the stack is empty first.",
        "Pushing onto a full stack (stack overflow) — ensure sufficient capacity.",
        "Confusing stack order: the last pushed element is the first to be popped.",
        "Using a stack when a queue (FIFO) would be more appropriate for the problem.",
      ],
    },
    practiceProblems: [
      {
        title: "Valid Parentheses",
        number: 20,
        difficulty: "Easy",
        description:
          "Given a string containing only parentheses, determine if the input string is valid.",
        url: "https://leetcode.com/problems/valid-parentheses/",
      },
      {
        title: "Min Stack",
        number: 155,
        difficulty: "Medium",
        description:
          "Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.",
        url: "https://leetcode.com/problems/min-stack/",
      },
    ],
  },
  {
    id: "factorial",
    name: "Factorial",
    category: "Recursion",
    difficulty: "Beginner",
    description:
      "A classic recursive algorithm that computes the factorial of a non-negative integer n, defined as n! = n × (n-1) × ... × 1.",
    visualizationType: "recursion",
    complexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
      space: "O(n)",
    },
    defaultInput: { n: 5 },
    generateSteps: (input: unknown): AlgorithmStep[] =>
      factorialSteps(input as { n: number }),
    validateInput: (input: unknown): { valid: boolean; error?: string } => {
      const data = input as { n?: number };
      if (!data || typeof data.n !== "number" || isNaN(data.n)) {
        return { valid: false, error: "Input must contain a numeric 'n'." };
      }
      if (data.n < 0) {
        return { valid: false, error: "n must be a non-negative integer." };
      }
      if (!Number.isInteger(data.n)) {
        return { valid: false, error: "n must be an integer." };
      }
      return { valid: true };
    },
    pseudocode: [
      "procedure factorial(n)",
      "    if n ≤ 1 then",
      "        return 1",
      "    end if",
      "    return n × factorial(n - 1)",
      "end procedure",
    ],
    code: [
      {
        language: "python",
        code: `def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)`,
      },
      {
        language: "javascript",
        code: `function factorial(n) {
  if (n <= 1) {
    return 1;
  }
  return n * factorial(n - 1);
}`,
      },
      {
        language: "typescript",
        code: `function factorial(n: number): number {
  if (n <= 1) {
    return 1;
  }
  return n * factorial(n - 1);
}`,
      },
      {
        language: "java",
        code: `public static long factorial(int n) {
    if (n <= 1) {
        return 1;
    }
    return n * factorial(n - 1);
}`,
      },
      {
        language: "c",
        code: `long factorial(int n) {
    if (n <= 1) {
        return 1;
    }
    return n * factorial(n - 1);
}`,
      },
      {
        language: "cpp",
        code: `long long factorial(int n) {
    if (n <= 1) {
        return 1;
    }
    return n * factorial(n - 1);
}`,
      },
    ],
    explanation: {
      whatIsIt:
        "The Factorial function computes the product of all positive integers from 1 to n. Written as n!, it is defined as: n! = n × (n-1) × (n-2) × ... × 2 × 1. The base case is 0! = 1 and 1! = 1. It is a classic example of recursion.",
      whenToUse:
        "Use Factorial in combinatorics (permutations, combinations), probability calculations, and mathematical formulas. It demonstrates the recursive approach where a problem is broken into smaller subproblems. Note: for very large n, use iterative approach or memoization to avoid stack overflow.",
      howItWorks: [
        "Check if n is 0 or 1 (base case): if so, return 1.",
        "Otherwise, return n multiplied by factorial(n-1).",
        "The recursive call reduces the problem size by 1 each time.",
        "When the base case is reached, the call stack unwinds, multiplying results.",
        "The final result is the product of all integers from 1 to n.",
      ],
      commonMistakes: [
        "Missing or incorrect base case: factorial(0) = 1, not undefined.",
        "Stack overflow for large n due to deep recursion (use iterative or memoized version).",
        "Integer overflow: factorials grow very fast; use long or big integer types.",
        "Off-by-one error: returning n * factorial(n) instead of n * factorial(n-1), causing infinite recursion.",
      ],
    },
    practiceProblems: [
      {
        title: "Fibonacci Number",
        number: 509,
        difficulty: "Easy",
        description:
          "The Fibonacci numbers are defined as F(0) = 0, F(1) = 1, F(n) = F(n-1) + F(n-2). This is similar to factorial in its recursive structure.",
        url: "https://leetcode.com/problems/fibonacci-number/",
      },
      {
        title: "Find All The Lonely Nodes",
        number: 1469,
        difficulty: "Easy",
        description:
          "Given a binary tree, return all the lonely nodes (nodes with no siblings). Understanding recursion is key.",
        url: "https://leetcode.com/problems/find-all-the-lonely-nodes/",
      },
    ],
  },
  {
    id: "fibonacci",
    name: "Fibonacci Sequence",
    category: "Recursion",
    difficulty: "Beginner",
    description:
      "A recursive algorithm that computes the nth Fibonacci number, where each number is the sum of the two preceding ones.",
    visualizationType: "recursion",
    complexity: {
      best: "O(2^n)",
      average: "O(2^n)",
      worst: "O(2^n)",
      space: "O(n)",
    },
    defaultInput: { n: 7 },
    generateSteps: (input: unknown): AlgorithmStep[] =>
      fibonacciSteps(input as { n: number }),
    validateInput: (input: unknown): { valid: boolean; error?: string } => {
      const data = input as { n?: number };
      if (!data || typeof data.n !== "number" || isNaN(data.n)) {
        return { valid: false, error: "Input must contain a numeric 'n'." };
      }
      if (data.n < 0) {
        return { valid: false, error: "n must be a non-negative integer." };
      }
      if (!Number.isInteger(data.n)) {
        return { valid: false, error: "n must be an integer." };
      }
      return { valid: true };
    },
    pseudocode: [
      "procedure fibonacci(n)",
      "    if n ≤ 1 then",
      "        return n",
      "    end if",
      "    return fibonacci(n - 1) + fibonacci(n - 2)",
      "end procedure",
    ],
    code: [
      {
        language: "python",
        code: `def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)`,
      },
      {
        language: "javascript",
        code: `function fibonacci(n) {
  if (n <= 1) {
    return n;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}`,
      },
      {
        language: "typescript",
        code: `function fibonacci(n: number): number {
  if (n <= 1) {
    return n;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}`,
      },
      {
        language: "java",
        code: `public static int fibonacci(int n) {
    if (n <= 1) {
        return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}`,
      },
      {
        language: "c",
        code: `int fibonacci(int n) {
    if (n <= 1) {
        return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}`,
      },
      {
        language: "cpp",
        code: `int fibonacci(int n) {
    if (n <= 1) {
        return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}`,
      },
    ],
    explanation: {
      whatIsIt:
        "The Fibonacci sequence is a series of numbers where each number is the sum of the two preceding ones, starting from 0 and 1. The sequence is: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ... It appears frequently in nature (spiral patterns, branching trees) and is a classic example of recursion.",
      whenToUse:
        "Use the Fibonacci sequence as a teaching tool for recursion and dynamic programming. The naive recursive approach has exponential time complexity, making it a perfect example of why memoization or iterative approaches are important. In practice, use iteration or memoization for efficiency.",
      howItWorks: [
        "Base case: if n is 0, return 0; if n is 1, return 1.",
        "Recursive case: return fibonacci(n-1) + fibonacci(n-2).",
        "Each call branches into two more calls, creating a tree of recursive calls.",
        "When the base cases are reached, the results bubble back up.",
        "The final result is the nth Fibonacci number.",
      ],
      commonMistakes: [
        "Exponential time complexity: naive recursion computes the same subproblems many times. Use memoization.",
        "Incorrect base cases: F(0) = 0 and F(1) = 1, not F(0) = 1.",
        "Stack overflow for large n due to deep recursion tree.",
        "Off-by-one errors: returning fibonacci(n-1) + fibonacci(n-2) when n = 2 gives 1+1 = 2, which is correct.",
      ],
    },
    practiceProblems: [
      {
        title: "Fibonacci Number",
        number: 509,
        difficulty: "Easy",
        description:
          "The Fibonacci numbers, commonly denoted F(n), form a sequence called the Fibonacci sequence. F(0) = 0, F(1) = 1, F(n) = F(n-1) + F(n-2) for n > 1.",
        url: "https://leetcode.com/problems/fibonacci-number/",
      },
      {
        title: "Climbing Stairs",
        number: 70,
        difficulty: "Easy",
        description:
          "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
        url: "https://leetcode.com/problems/climbing-stairs/",
      },
    ],
  },
];

export function getAlgorithm(id: string): Algorithm | undefined {
  return algorithms.find((algo) => algo.id === id);
}

export function getAlgorithmsByCategory(category: Category): Algorithm[] {
  return algorithms.filter((algo) => algo.category === category);
}
