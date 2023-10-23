---
title: JavaScript에서 URL parameter 추출하기
date: 2023-10-23 23:37:48 +0900
updated: 2023-10-23 23:39:09 +0900
aliases: ['JavaScript에서 URL parameter 추출하기 ']
tags: ['JavaScript']
---

`URLSearchParams`를 사용해 간단하게 URL의 parameter를 추출할 수 있다.

```js
const getOrderBy = () => {
  const params = new URLSearchParams(location.search)
  return params.get('orderBy') || 'DESC'
}
```
