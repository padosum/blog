---
title   : 퀵 정렬(quick sort) 
date    : 2021-08-04 17:35:31 +0900
updated : 2021-08-04 17:41:25 +0900
aliases : 
private : false
hidden  : false
showReferences : true
---
[[Merge-Sort]] 처럼 분할 정복 기법을 사용하는 알고리즘으로 이름에서도 알 수 있듯이 다른 정렬 알고리즘에 비해 훨씬 빠르게 동작한다.  

## 알고리즘  
1. 리스트 가운데 하나의 원소를 고른다. 피벗(pivot)이라고 한다.  
2. 피벗 앞에는 피벗보다 값이 작은 원소들이 오도록, 피벗 뒤는 피벗보다 큰 원소들이 오도록 리스트를 둘로 나눈다.(분할)  
3. 분할된 2개의 리스트에 대해 재귀적으로 1, 2 과정을 반복한다. (리스트의 크기가 1보다 큰 경우에만)  
	 
## 시간 복잡도  
- 최악: `O(n2)`
- 최선: `O(nlogn)`
- 평균: `O(nlogn)`

## 예제  
### JavaScript
```javascript
const solution = (arr) => {
  let answer = arr

  answer = quickSort(arr)

  return answer
}

const quickSort = (arr) => {
  let n = arr.length
  if(n <= 1) 
    return arr 

  // 피벗 정하고 기준에 맞춰 두 개의 리스트로 나누기 
  let pivot = arr[n-1]
  let left = []
  let right = []
  for(let i=0; i<n-1; i++) {
    if(arr[i] < pivot) {
      left.push(arr[i])
    }
    else {
      right.push(arr[i])
    }
  }
  // 각 리스트에 대해 재귀적으로 퀵 정렬을 한 후 
  // 합쳐주기 (왼쪽 리스트 + 피벗 + 오른쪽 리스트)
  let merge = [...quickSort(left), ...[pivot], ...quickSort(right)]
  return merge
}

arr1 = [4, 1, 7, 6, 5, 8, 2, 3]
console.log(solution(arr1))
```
