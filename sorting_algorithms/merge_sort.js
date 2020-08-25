const unsorted = [5, 2, 6, 20, 4, 3, 7, 17, 9, 10]

function mergeSort(a){
  if (a.length <= 1){
    return a
  }
  // Simultaneously evaluate m, l, r
  let m = Math.floor(a.length / 2 ),
      l = mergeSort(a.slice(0, m)),
      r = mergeSort(a.slice(m))
  console.log(l, r)
  // Merge sorted arrays
  return merge(l, r)
  }


function merge(l, r){
  let sorted = []
  while (l.length > 0 && r.length > 0){
    if (l[0]  < r[0]){
      sorted.push(l.shift())
    } else {
      sorted.push(r.shift())
    }
  }
  // add leftover elements in either l or r with sorted array
  return sorted.concat(l.slice().concat(r.slice()))
}

console.log("Unsorted array: ", unsorted)
console.log("Merge sort: ", mergeSort(unsorted))
