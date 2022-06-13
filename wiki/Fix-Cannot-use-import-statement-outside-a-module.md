---
title   : Cannot use import statement outside a module 오류 해결하기 
date    : 2022-06-13 21:56:09 +0900
updated : 2022-06-13 23:00:56 +0900
aliases : ["Cannot use import statement outside a module 오류 해결하기"] 
tags    : ["How to", "JavaScript"]
---

## Goal
"Cannot use import statement outside a module" 오류가 발생하는 이유를 알아내고 다음번엔 쉽게 해결할 수 있도록 해결 방법을 알아보자.


`node`를 이용해 간단히 [[JavaScript]] 코드를 실행하려하는데 `import`를 사용하니 "Cannot use import statement outside a module" 메시지가 뜨며 실행하지 못했다.
모듈은 특수한 키워드나 기능과 함께 사용되므로 `<script type="module">` 같은 속성을 설정해서 해당 스크립트가 모듈이란 걸 브라우저가 알 수 있게 해줘야 한다고 한다.[^1]
```html
<script type="module">
  import { sayHi } from './say.js'
</script>
```

브라우저가 알 수 있게 해주는 것처럼 Node.js 환경에서도 명시해줄 필요가 있었다. `package.json` 파일에 다음과 같은 값을 추가해 알려줘야 한다!
```json
{
  "type": "module"
}
```

추가해주니 `node`로 스크립트가 잘 실행되었다.

[^1]: https://ko.javascript.info/modules-intro
