const unsorted = [5, 2, 6, 20, 4, 3, 7, 17, 9, 10]

function bubbleDown(heap, heapLen, index){
  // Restore max heap from index down to bottom
  while (index < heapLen){
    console.log("Bubble down from index: ", index)
    var lcIndex = index * 2 + 1
    if (lcIndex >= heapLen){
      break
    }
    var rcIndex = index * 2 + 2

    // Find bigger child
    if (rcIndex < heapLen && heap[rcIndex] > heap[lcIndex]){
      var biggerIndex = rcIndex
    } else {
      var biggerIndex = lcIndex
    }
    if (heap[biggerIndex] > heap[index]){
      // Swap
      console.log("Swap %s and %s", heap[biggerIndex], heap[index])
      ;[heap[biggerIndex], heap[index]] = [heap[index], heap[biggerIndex]]
      index = biggerIndex
      console.log(heap)
    } else {
      break
    }
  }
  return heap
}

function heapify(arr, arrLen){
  // Convert an unsorted array to a heap by bubbling down from leaf up to top
  // First index with children is integer division of arrLen by 2, minus 1
  for (i = Math.floor(arrLen / 2) - 1; i >= 0; i--){
    arr = bubbleDown(arr, arrLen, i)
  }
  return arr
}

function heapSort(arr){
  n = arr.length
  arr = heapify(arr, n)
  // console.log("Heapify done: ", arr)
  for (i = n-1; i>=0; i--){
    // Move max value at index 0 to the back, which is the sorted arr
    ;[arr[i], arr[0]] = [arr[0], arr[i]]
    // excluded i and after from bubble down since it's the sorted arr in place
    bubbleDown(arr, i, 0)
  }
  return arr
}

console.log("Unsorted array: ", unsorted)
console.log("Heap sort: ", heapSort(unsorted))
