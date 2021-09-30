---
title   : JavaScript 날짜 포맷 변경하기
date    : 2021-09-30 22:10:37 +0900
updated : 2021-09-30 22:17:17 +0900
aliases : ["JavaScript 날짜 포맷 변경하기"]
tags    : ["JavaScript", "How to"]
---
JavaScript의 `Date` 객체 값을 내가 원하는 포맷으로 변경하고 싶었다. 검색을 해보니 다양한 방법이 있었는데 나는 `toISOString` 메서드가 편했다.  

```javascript
const today = new Date(); // Thu Sep 30 2021 22:14:42 GMT+0900 (Korean Standard Time)

const formatDate = myBirthDay.toISOString().split('T')[0]; // "2021-09-13"
formatDate.replace(/-/g, '/'); // "2021/09/30"
```

