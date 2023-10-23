---
title: String과 Boolean을 비교할 수 있다는 착각
date: 2023-10-23 23:31:58 +0900
updated: 2023-10-23 23:32:08 +0900
aliases: ['String과 Boolean을 비교할 수 있다는 착각']
tags: ['JavaScript']
---

JavaScript에서 어떤 변수가 `"false"`라는 값을 가질 때 `Boolean`으로 변경한다 해도 그 값은 `true`다.

조금만 더 생각하면 이해가 되는데 처음에 "왜 이래?"하고 당황스러웠다.  
문자열 값이 "존재"하기 때문이다. `"true"`도 마찬가지. 그래서 내가 생각하는 진짜 `true`인지 확인하려면 다음과 같이 비교해야 한다.

```js
const b = 'false'
console.log(Boolean(b)) // true
console.log(b === 'false') // true
console.log(b === 'true') // false
```
