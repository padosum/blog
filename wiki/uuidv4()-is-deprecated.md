---
title   : uuidv4() is deprecated. Use v4() from the uuid module instead. 
date    : 2023-02-25 22:13:56 +0900
updated : 2023-02-25 22:15:33 +0900
aliases : 
draft : false
tags : ["error"]
---

> uuidv4() is deprecated. Use v4() from the uuid module instead.


[uuidv4]()를 사용하다가 만난 에러.

위와 같이 변경해서 사용하면 된다.

```js
import { v4 as uuid } from 'uuid';
```
