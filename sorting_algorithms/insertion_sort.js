const unsorted = [5, 2, 6, 20, 4, 3, 7, 17, 9, 10]

function insertionSort(a){
  var cur, temp
  for (i = 1; i < a.length; i++){
    cur = a[i]
    temp = i
    for (j = i-1; j >= 0; j--){
      if (cur < a[j]){
        [a[temp], a[j]] = [a[j], a[temp]]
        temp = j
      } else {
        break;
      }
    }
  }
  return a
}

console.log("Unsorted array: ", unsorted)
console.log("Insertion sort: ", insertionSort(unsorted))
