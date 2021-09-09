---
title   : Vue.js
date    : 2021-04-26 09:41:29 +0900
updated : 2021-09-09 23:50:01 +0900
aliases : 
private : false
hidden  : false
showReferences : true
---
## Vue.js가 무엇인가? 
- UI를 만들기 위한 Progressive [[Framework]] 
  - 화면(view, 브라우저에서 사용자에게 보여지는 것)단 라이브러리  
- View([[DOM]]) → Vue([[DOM]] Listeners) → Model(JavaScript)
- View([[DOM]]) ← Vue(Data Bindings) ← Model(JavaScript)

### 기존 웹 개발 방식  
- HTML, JavaScript를 사용하며 [[DOM]]을 조작해 `div`안의 문자열 변경하기  
```javascript
<body>
    <div id="app">
    </div>
    <script>
        let div = document.querySelector('#app');
        let str = `hello world`;
        div.innerHTML = str;

        str = `hello world!!!`;  // 변수의 값만 변경해서는 반영이 되지 않는다.
        div.innerHTML = str;     // 다시 innerHTML에 변수를 넣어줘야 함 
    </script>
</body>
```

### Vue.js의 핵심기술 - `Reactivity` 구현
- `Object.defineProperty()` 객체의 속성의 동작을 재정의하는 API 
  ```javascript
  Object.defineProperty(대상 객체, 객체의 속성, {
      // ... 정의할 내용 
  })
  ```
---
```javascript
<body>
    <div id="app"></div>
    <script>
        const div = document.querySelector('#app');
        let viewModel = {};

        Object.defineProperty(viewModel, 'str', {
            // 속성에 접근했을 때 동작을 정의 
            get: function() {
                console.log(`접근`);
            },
            // 속성에 값을 할당했을 때 동작을 정의 
            set: function(newValue) {
                console.log(`할당`, newValue);
                div.innerHTML = newValue;
            }
        });
    </script>
</body>
```
- **Reactivity(반응성)** 
  - 값을 바꿀 때마다 화면이 바뀌게 된다
  - 데이터의 변화를 감지해서 알아서 화면을 자동으로 그려주는 것 (Data Bindings)

#### 라이브러리화 
```javascript
(function() {
    function init() {
        Object.defineProperty(viewModel, 'str', {
            // 속성에 접근했을 때 동작을 정의 
            get: function () {
                console.log(`접근`);
            },
            // 속성에 값을 할당했을 때 동작을 정의 
            set: function (newValue) {
                console.log(`할당`, newValue);
                render(newValue);
            }
        });
    }

    function render(value) {
        div.innerHTML = value;
    }

    init();
})();
```  
- 즉시 실행함수를 사용하면 라이브러리 내부 로직이 사용자에게 노출되지 않도록 변수 유효 범위가 분리된다.  
  - ES 2015 이후 등장한 모듈화 문법 전에 모듈화를 하기 위한 방법 
  - 익명 함수 내부에 선언된 변수는 익명 함수 바깥에서 접근할 수 없다. → 전역 스코프로 선언되지 않는다. 


## 출처 
- [Vue.js시작하기 - 장기효](https://inf.run/SwGd)
