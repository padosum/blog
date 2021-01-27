---
title   : 🌴 Javascript Scope 
excerpt : 자바스크립트의 유효범위
date    : 2020-02-01 23:59:39 +0900
updated : 2020-02-02 00:01:31 +0900
tags    : [Javascript]
parent  : 
layout  :
---

## var 키워드
```javascript
// 전역변수 
var vscope = 'global';
function fscope() {
	alert(vscope); // global
}
fscope(); 
```

```javascript
// 지역변수 
var vscope = 'global';
function fscope() {
	var vscope = 'local'
	alert(vscope); // local 
}
fscope(); 
```

- 지역변수를 우선으로 사용하고 전역변수는 사용해야 하는 이유가 분명하지 않은 경우 사용하지 않는 것이 좋다. 
	- 이름의 충돌 등을 회피할 수 있는 최선의 방법이다. 

### 전역변수를 불가피하게 사용해야 하는 경우  

- 객체 하나를 전역변수로 만들고 객체의 속성으로 변수를 관리하는 방법을 사용한다.  
    ```javascript
    MYAPP = {}
    MYAPP.calculator = {
        'left' : null,
        'right' : null
    }
    MYAPP.coordinate = {
        'left' : null,
        'right' : null
    }

    MYAPP.calculator.left = 10;
    MYAPP.calculator.right = 20;
    function sum() {
        return MYAPP.calculator.left + MYAPP.calculator.right;
    }

    document.write(sum());
    ```

- 전역변수 사용 없이 하려면 익명함수를 호출하면 된다.   
    ```javascript
    (function() {
        MYAPP = {}
        MYAPP.calculator = {
            'left' : null,
            'right' : null
        }
        MYAPP.coordinate = {
            'left' : null,
            'right' : null
        }

        MYAPP.calculator.left = 10;
        MYAPP.calculator.right = 20;
        function sum() {
            return MYAPP.calculator.left + MYAPP.calculator.right;
        }

        document.write(sum());
    }())
    ```

### 유효범위의 대상

- 자바스크립트에서 유효범위는 함수에 대해서만 제공된다.  
  - 다른 언어들과의 차이점이다. 다른 언어들은 블록(`{}`) 안에서 유효범위가 제공된다.  
  - 함수안에서 선언된 변수만이 지역변수가 되는 것  
    ```javascript
    for(var i = 0; i < 10; i++) {
        var test = 'Test!!!';
    }
    alert(test);
    ```
    - 여기서 test는 지역변수가 아니다.   

### 정적 유효범위  

- 함수가 선언된 시점에서 유효범위를 갖는데 이것을 정적 유효범위(static scoping)라고 부른다.  
    ```javascript
    var i = 5;

    function a() {
        var i = 10;
        b();
    }

    function b() {
        document.write(i);  // 5 
    }
    ```

## let 키워드 

- ES6에서 `let` 키워드로 변수를 선언하는 것이 도입되었다.  
- `let` 키워드를 사용하면 블록 레벨 유효범위를 사용할 수 있다. 
    ```javascript
    let lscope = 0;
    {
        let lscope = 1;
        console.log(lscope); // 1
    }
    console.log(lscope); // 0
    ```

## const 키워드 
