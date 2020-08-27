export function insertionSortAnimation(a){
  const animations = [];
  insertionSort(a, animations);
  return animations
}


function insertionSort(a, animations){
  let cur, temp;
  for (let i = 1; i < a.length; i++){
    // first element of unsorted array 
    cur = a[i];
    // marker of first element of unsorted array 
    temp = i;
    for (let j = i-1; j >= 0; j--){
      // push indices being compared to change color
      animations.push([4, i, j]);     
      // push indices being compared to revert color
      animations.push([3, i, j]);   
      if (cur < a[j]){
        // push indices being compared to change color
        animations.push([1, temp, j]);
        // push index and new height for each of the two bars being compared and swapped
        animations.push([2, temp, a[j], j, a[temp]]);
        [a[temp], a[j]] = [a[j], a[temp]];
        // push indices being compared to revert color
        animations.push([3, temp, j]);   
        temp = j;
      } else {
        break;
      }

    }
  }
  return a
}

