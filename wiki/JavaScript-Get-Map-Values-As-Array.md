---
title   : JavaScript Map의 value를 배열로 가져오기 
date    : 2021-10-03 18:47:35 +0900
updated : 2021-10-03 18:59:08 +0900
aliases : ["JavaScript Map의 value를 배열로 가져오기"]
tags    : ["JavaScript", "How to"]
---

알고리즘 문제를 풀다가 `Map`의 값들 중 최댓값을 얻고 싶었다.  
`Math.max`에 인수를 전하기 위해 배열로 변경해야 했다.  
`Map`의 `values()`를 사용하면 value들만 가져올 수 있다.  

```javascript
const map = new Map();

map.set('1', 2);
map.set('2', 1);
map.set('3', 3);

console.log([...map.values()]); // [2, 1, 3]
```

사실 `Math.max`에 전달하려면 배열로는 변환하지 않아도 된다.  
```javascript
console.log(Math.max(...map.values())); 
```


