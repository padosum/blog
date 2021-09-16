---
title   : 합병 정렬(merge-sort) 
date    : 2021-08-03 16:07:37 +0900
updated : 2021-08-03 16:26:47 +0900
aliases : 
tags: ["Algorithm"]
---
분할과 정복을 원리로 원소가 한 개가 될 때까지 계속 반으로 나누다가 다시 합쳐나가며 정렬하는 방법이다.  

## 복잡도  
- `O(n log n)`

## 예제  
### JavaScript
```javascript
function solution(arr) {
  let answer

  answer = divide(arr)
  return answer
}

function divide(arr) {
  if(arr.length < 2) return arr

  let pivot = Math.floor(arr.length) / 2
  let left = arr.slice(0, pivot)
  let right = arr.slice(pivot, arr.length)

  return merge(divide(left), divide(right))
}

function merge(left, right) {
  let result = []
  while(left.length && right.length) {
    if(left[0] <= right[0]) 
      result.push(left.shift())
    else 
      result.push(right.shift())
  }
  while(left.length) result.push(left.shift())
  while(right.length) result.push(right.shift())

  return result
}

let arr1 = [11, 7, 5, 6, 10, 9];
console.log(solution(arr1))
```
