---
title   : JavaScript 모듈화 
date    : 2021-04-23 19:31:22 +0900
updated : 2022-11-17 23:56:44 +0900
aliases : 
tags: ["JavaScript"]
---
- HTML에서 로드된 JavaScript는 전역 공간에서 순차적으로 실행될 뿐, 모듈이란 개념은 존재하지 않는다. 
- JavaScript에 인위적으로 모듈을 도입하는 **CommonJS**, **AMD(Asynchronous Module Definition)**라는 두 진영이 등장하게 되었다.  

## CommonJS 
```javascript
var someModule = require('someModule');

exports.doSomethingElse = function() {
    return someModule.doSomething() + "bar"; 
}
```

```js
const { hello, bye } = require('./hello')

// hello.js
const hello = 'hello';
const bye = 'bye';

module.exports = {
  hello,
  bye
}
```
- Node.js의 모듈 패턴은 CommonJS 방식을 따른다.  
- 백엔드, 서버사이드를 위한 방식 


### Node.js에서 
`require` 함수를 호출할 때 `index.js` 파일은 이름을 생략할 수 있다. 
생략 시 해당 디렉토리의 `index.js` 파일을 로드한다.

`someModule/index.js` 파일이 있을 때
```js
const someModule = require('./someModule')
```


모듈 확장자는 생략이 가능하다!
확장자가 없으면 Node.js는 `.js`, `.json`, `.node` 확장자를 추가해 필요한 파일을 로드하려고 시도한다고 한다.[^1]


## AMD 
```javascript
define(
	// 이 모듈은 jquery와 underscore 두 모듈에 의존합니다.
	['jquery', 'underscore'],
    
	// 의존 모듈이 로드되면 인자로 모듈들이 전달되며 이 함수가 실행됩니다.
    function ($, \_) {
    
	// 격리된 스코프
    function a(){};
    function b(){};
    function c(){};
    
	// 함수의 리턴 값이 모듈이 exports하는 값이 됩니다.
    return {
    	b: b,
    	c: c
    };
});
```
- 웹 브라우저 환경에 좀 더 적합하게 구현된 방식 

## UMD 
- CommonJS, AMD 방식에 모두 호환되는 모듈을 작성하고 싶은 경우에는 UMD (Universal Module Definition) 방식으로 모듈을 배포 할 수 있다. 

## ES6 Modules 

### Import, Export 
- Import와 Export는 자바스크립트의 코드를 모듈화할 수 있는 기능  
```javascript
// math.js
export var pi = 3.14;
```
```javascript
// app.js
import { pi } from './math.js';
console.log(pi); // 3.14
```
- **가급적 실무에서는 [[Webpack]]과 같은 모듈 번들러를 이용해 구현하기**
  - 로딩 속도를 높이기 위해 번들링과 최적화를 수행한다. 불필요한 코드가 최종 결과물에서는 제거되어 빌드 결과물의 크기가 작아진다. (가지치기, tree-shaking) 
### import `as`
```javascript
import {sayHi as hi, sayBye as bye} from './say.js'

hi('lion')
bye('lion')
```
- 모듈을 이름바꿔가져올 수 있다.   
### export `as`  
- 이름바꿔 내보내는 것도 가능하다.  
```javascript
// say.js
export {sayHi as hi, sayBye as bye}
```
```javascript
import * as say from './say.js'

say.hi('lion')
say.bye('lion')
```

### export default  
- 모듈의 종류는 **복수의 함수가 있는 라이브러리 형태**와 **개체 하나만 선언된 모듈**이 있다.  
- 보통은 개체 하나만 선언된 모듈을 많이 사용하는데 그렇게되면 자연스럽게 파일의 수가 많아진다.
  - 모듈 이름을 잘 지어주고 폴더에 파일을 잘 나눈다면 코드 탐색은 어렵지 않다.  
- `export default`는 **해당 모듈에는 개체가 하나만 있다**는 사실을 명시한다.  
  - 모듈을 가져올 때 중괄호 없이 가져올 수 있고 원하는대로 이름을 지정해줄 수 있다. 그러므로 혼란을 방지하기 위한 규칙이 필요할 수 있다.  
 
## reference 
- [https://okky.kr/article/400839](https://okky.kr/article/400839)
- [프론트엔드 개발자를 위한 웹팩](https://inf.run/hVZe)
- [https://ko.javascript.info/import-export](https://ko.javascript.info/import-export)

[^1]: https://nodejs.org/api/modules.html#file-modules