---
title   : Uncaught TypeError Illegal invocation  
date    : 2023-08-24 10:42:34 +0900
updated : 2023-08-24 13:35:43 +0900
aliases : 
tags    : ["How to"]
---
## Goal
`Uncaught TypeError: Illegal invocation`가 발생하는 이유를 안다.


## 메서드 이름을 변경해서 사용하기

jQuery처럼 `document.querySelector`를 간단하게 사용하기 위해 다음과 같이 할 수 있다.

```js
const $ = document.querySelector
```

하지만 위 `$`를 사용해보면 Illegal invocation이라는 오류가 나타난다. 
```js
$('div')
```

왜 이런걸까?  

검색을 해보니 `this` binding이 잘못되었다는 말이 잔뜩 나온다. 그럼 `document` 객체의 메서드가 가리키는 `this` 무엇일까?  

`document` 객체를 통해 실행된 메서드이기 때문에 그 내부 `this`는 `document`를 가리킨다.  
다음 코드와 같이 `this`를 리턴하는 함수를 `document` 객체에 할당해서 실행해보자. 그럼 `document`가 출력될 것이다.  
```js
function getThis() {
  return this;
}

document.getThis = getThis;
document.getThis(); // #document
```

## this binding 수정하기  

그럼 아래와 같이 함수를 할당해서 호출하면 어떻게 되는 걸까?  
```js
const $ = document.querySelector
$('div')
```

`document.querySelector`는 일반 함수이고, `$('div')`는 그 함수를 실행하는 것이다. 따라서 함수를 실행한 주체는 `document`가 아닌 `window`가 되는 것이다. 여기서 문제가 발생한다.  

`document.querySelector`에서 `this`는 `document`를 가리켜야 하는데 그렇지 않기 때문에 오류가 발생하는 것이다.  

따라서 `bind` 함수를 이용해 `this` binding을 `document`로 설정해준 뒤, 해당 함수를 실행하면 된다.

```js
const $ = document.querySelector.bind(document)
const dif = $('div')
```

`Illegal invocation`를 번역해보면 잘못된 호출이란 의미인데 호출 주체가 잘못된 것이라고 여기면 되겠다.  

