---
title   : JavaScript 화살표 함수
date    : 2021-09-15 15:55:37 +0900
updated : 2021-09-15 15:55:38 +0900
aliases : ["화살표 함수"]
---
화살표 함수는 `function` 키워드 대신 화살표(`=>`)를 사용해 기존의 함수 정의 방식보다 간략하게 함수를 정의할 수 있다.  

## 화살표 함수 정의하기 
함수 선언문으로는 정의할 수 없고 표현식으로 정의해야 한다.  
```
const sum = (x, y) => x+y;
sum(1, 2); // 3
```

매개변수가 하나인 경우 다음과 같이 소괄호 생략이 가능하다.  하지만 매개변수가 없다면 소괄호는 생략할 수 없다.
```javascript
const doubleSize = x => x*2; 

const sayHi = () => console.log('Hi');
```

### 함수 몸체 
함수 몸체가 하나의 문이라면 함수 몸체를 감싸는 중괄호를 생략할 수 있다. 만약 중괄호를 생략했을 때 내부의 문이 표현식이 아니라면 오류가 발생한다. 반환할 수 없기 때문이다.  
```javascript
const doubleSize = x => x*2;

const func = () => let x = x*2; // error
```
몸체의 문이 여러 개일때도 생략할 수 없다. 여러 개라면 리턴 값을 명시해야 한다. 
```javascript
const sum = (a, b) => {
  return a + b;
}
```

### 콜백 함수에서 
코드가 간략해지기 때문에 콜백 함수에 사용하면 좋다.  
```javascript
const birds = [
  'Vulture',
  'Penguin',
  'Owl',
  'Pigeon'
];

console.log(birds.map(bird => bird.length));
// (4) [7, 7, 3, 6]
```


## 화살표 함수 vs 일반 함수
1. 화살표 함수는 인스턴스를 생성할 수 없다. `non-constructor`이다.  
2. 화살표 함수는 함수 자체 `this`, `arguments`, `super`, `new.target` 바인딩을 갖지 않는다. 스코프 체인을 통해 상위 스코프의 `this`, `arguments`, `super`, `new.target`을 참조한다.  

### this  
화살표 함수의 `this`는 일반 함수의 `this`와 다르다. [[JavaScript-this|this]] 바인딩은 함수의 호출 방식, 함수가 어떻게 호출되었는지에 따라 동적으로 결정된다. 
**일반 함수로 호출되는 모든 함수 내부의 `this`는 전역 객체를 가리키지만, 화살표 함수는 함수 자체의 `this` 바인딩을 갖지 않는다. 상위 스코프의 `this`를 그대로 참조한다.(lexical this - 렉시컬 스코프처럼 `this`가 함수가 정의된 위치에 의해 결정된다는 것을 의미 )** 

화살표 함수로 메서드를 정의하는 것은 바람직하지 않다. 메서드 내부에는 메서드를 호출한 객체를 가리키는 `this`를 사용할 가능성이 높은데 화살표 함수를 사용하면 상위 스코프의 `this`를 참조하기 때문이다. 따라서 메서드를 정의할 때는 ES6 메서드 축약 표현으로 정의한 ES6 메서드를 사용하는 것이 좋다.  
```javascript
const bird = {
  name: 'Pingu',
  sayHi: () => console.log(`Hi ${this.name}`)
};

// 화살표 함수 내부의 this는 상위 스코프인 전역의 this가 가리키는 전역 객체를 가리킨다. window.name과 같다. 
bird.sayHi(); // Hi 



const bird = {
  name: 'Pingu',
  sayHi() {
    console.log(`Hi ${this.name}`);
  }
};

bird.sayHi(); // Hi Pingu 
```