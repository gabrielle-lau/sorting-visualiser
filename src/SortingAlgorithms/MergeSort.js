export function mergeSortAnimation(a){
  const animations = [];
  const copyA = a.slice();
  mergeSort(a, 0, a.length - 1, copyA, animations);
  return animations
}


function mergeSort(a, startIdx, endIdx, copyA, animations){
  // Track original array a's index, and modify animations (a constant) in place, no need to return sorted array
  // Don't slice original array into left and right, just mark the start and end index of original array
  
  if (endIdx === startIdx){
    return 
  }
  
  const m = Math.floor((startIdx + endIdx)/2);
  // recurse root->left->right->merge root, then go back up to recurse right node adjacent to merged root 
  // copyA is first parameter of mergeSort so that the unmodified copyA is passed as original array to merge function
  mergeSort(copyA, startIdx, m, a, animations);

  mergeSort(copyA, m + 1, endIdx, a, animations);

  merge(a, startIdx, m, endIdx, copyA, animations);


}

function merge(a, startIdx, m, endIdx, copyA, animations){
  // first index of "left slice", incremented if left slice's first element is smaller
  let i = startIdx;
  // first index of "right slice", increment if right slice's first element is smaller
  let j = m + 1;
  // front of sorted, merged slices, incremented every loop to be always at front
  let k = startIdx;
  // iterate through "left slice" and "right slice" have been iterated 
  while (i <= m && j <= endIdx){
    // push indices being compared to change color, and then push again to revert color
    animations.push([i, j]);
    animations.push([i, j]);
    // compare copyA's (unmodified array) first element in "left" and "right", if left one is smaller
    if (copyA[i] <= copyA[j]){
      // push height to make animation look like swapping heights, ie. modifies a's value at index k with the smaller of compared values
      animations.push([k, copyA[i]]);
      // modify original array
      a[k] = copyA[i];
      // increment indices
      k++;
      i++;
    } else {
      animations.push([k, copyA[j]]);
      a[k] = copyA[j];
      k++;
      j++;
    }
  }
  // add animation for any leftover elements in either "left" or "right" slices respectively
  while (i <= m){
    // just change color of index i
    animations.push([i, i]);
    animations.push([i, i]);
    animations.push([k, copyA[i]]);
    a[k] = copyA[i];
    k++;
    i++;
  }

  while (j <= endIdx){
    // just change color of index j
    animations.push([j, j]);
    animations.push([j, j]);
    animations.push([k, copyA[j]]);
    a[k] = copyA[j];
    k++;
    j++;
  }
}


// // Original code
// const unsorted = [5, 2, 6, 20, 4, 3, 7, 17, 9, 10]

// export const mergeSort = a =>{
//   if (a.length <= 1){
//     return a
//   }
//   // Simultaneously evaluate m, l, r
//   let m = Math.floor(a.length / 2 ),
//       l = mergeSort(a.slice(0, m)),
//       r = mergeSort(a.slice(m))

//   // Merge sorted arrays
//   return merge(l, r)
//   }


// function merge(l, r){
//   let sorted = []
//   while (l.length > 0 && r.length > 0){
//     if (l[0]  < r[0]){
//       sorted.push(l.shift())
//     } else {
//       sorted.push(r.shift())
//     }
//   }
//   // add leftover elements in either l or r with sorted array
//   return sorted.concat(l.slice().concat(r.slice()))
// }

// console.log("Unsorted array: ", unsorted)
// console.log("Merge sort: ", mergeSort(unsorted))