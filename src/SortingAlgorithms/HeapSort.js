export function heapSortAnimation(a){
  const animations =[];
  heapSort(a, animations);
  return animations
}

function bubbleDown(heap, heapLen, index, animations){
  // Restore max heap from a specified index down to bottom
  while (index < heapLen){
    // console.log("Bubble down from index: ", index);
    // Left child index 
    const lcIndex = index * 2 + 1;
    if (lcIndex >= heapLen){
      break;
    }
    //Right child index
    const rcIndex = index * 2 + 2;

    // Find bigger child between left child and right child (if any)
    const biggerIndex = (rcIndex < heapLen && heap[rcIndex] > heap[lcIndex]) ? rcIndex : lcIndex;

    if (heap[biggerIndex] > heap[index]){
      // Push indices being swapped to change color (3rd color for bubble down)
      animations.push([4, biggerIndex, index]);
      // Push index and new height of each of the two bars being swapped
      animations.push([2, biggerIndex, heap[index], index, heap[biggerIndex]]);
      // Swap
      // console.log("Swap %s and %s", heap[biggerIndex], heap[index]);
      ;[heap[biggerIndex], heap[index]] = [heap[index], heap[biggerIndex]];
      // Push indices being swapped to revert color
      animations.push([3, biggerIndex, index]);
      index = biggerIndex;
      // console.log(heap);
    } else {
      break
    }
  }
  return heap
}

function heapify(arr, arrLen, animations){
  // Convert an unsorted array to a heap by bubbling down from leaf up to top
  // First index with children is integer division of arrLen by 2, minus 1
  for (let i = Math.floor(arrLen / 2) - 1; i >= 0; i--){
    arr = bubbleDown(arr, arrLen, i, animations);
  }
  return arr
}

export function heapSort(a, animations){
  const n = a.length;
  const arr = heapify(a, n, animations);
  // console.log("Heapify done: ", arr)
  for (let i = n-1; i>=0; i--){
    // Push indices being swapped to change color
    animations.push([1, i, 0]);
    // Push index and height for each of the two bars being swapped
    animations.push([2, i, arr[0], 0, arr[i]])
    // Move max value at index 0 to the back, which is the sorted arr
    ;[arr[i], arr[0]] = [arr[0], arr[i]];
    // Push indices being swapped to revert color
    animations.push([3, i, 0]);
    // excluded i and after from bubble down since it's the sorted arr in place
    bubbleDown(arr, i, 0, animations);
  }
  return arr
}

