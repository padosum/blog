---
title   : 계수 정렬(Counting Sort) 
date    : 2021-08-09 19:14:34 +0900
updated : 2021-08-09 19:18:03 +0900
aliases : 
private : false
hidden  : false
showReferences : true
---
계수 정렬은 비교 정렬이 아닌 알고리즘이다. 범위 조건(예, 5이하의 숫자만 있는 수열을 정렬하기)이 있는 경우 빠른 정렬이다. 데이터를 한번씩 접근하여 해당 데이터가 총 몇번이 나오는지 횟수를 세는 배열을 만들고, 그 횟수만큼 해당 숫자를 조회하면 된다.  

## 예시  

### JavaScript  
```javascript
const solution = (arr) => {
  let answer = [];
  let n = arr.length;

  // 숫자가 나타나는 횟수를 저장하는 배열 
  let count = Array.from({length: n}, () => 0)
  for (i in arr) {
    count[arr[i]] += 1
  }
  
  for (i in arr) {
    if(count[i] !== 0) {
      for(let j = 0; j < count[i]; j++) {
        answer.push(i)
      }
    }
  }

  return answer;
}

arr1 = [4, 1, 9, 6, 5, 8, 2, 3, 1, 3, 5]
console.log(solution(arr1))
```
