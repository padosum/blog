---
title   : Jest 
date    : 2023-02-18 21:49:02 +0900
updated : 2023-02-18 22:08:55 +0900
aliases : 
draft : false
tags : ["framework", "testing"]
---

- JavaScript Testing Framework
- CLI나 Node.js를 통해 테스트를 수행한다.


## 사용법 정리

Jest는 test 파일에서 `describe`, `expect`, `test` 등의 메서드를 global environment에 넣어준다. 따라서 따로 `import` 할 필요는 없다. 하지만 하고 싶으면 해도 된다.

### VSCode에서 Jest 메서드 자동완성
```js
import { describe, expect, test } from '@jest/globals'
```

VSCode에서 Jest 메서드들이 자동완성 되지 않는 경우에는 `@types/jest`를 설치해준다.
```js
npm i @types/jest --save-dev 
```

### ESM 사용하기
[ecmascript-modules](https://jestjs.io/docs/ecmascript-modules) 참고 

