---
title   : 함수형 프로그래밍(Functional Programming)
date    : 2021-05-14 18:22:05 +0900
updated : 2021-08-20 23:18:50 +0900
aliases : ["함수형 프로그래밍"]
private : false
hidden  : false
showReferences : true
---

> 순수 함수와 보조 함수의 조합을 통해 외부 상태를 변경하는 부수 효과를 최소화해서 불변성을 지향하는 프로그래밍 패러다임이다. 로직 내에 존재하는 조건문과 반복문을 제거해서 복잡성을 해결하며, 변수 사용을 억제하거나 생명주기를 최소화해서 상태 변경을 피해 오류를 최소화하는 것을 목표로 한다. 조건문이나 반복문은 로직의 흐름을 이해하기 어렵게 해서 가독성을 해치고, 변수의 값은 누군가에 의해 언제든지 변경될 수 있어 오류 발생의 근본적인 원인이 될 수 있기 때문이다.   
*모던 자바스크립트 Deep Dive*  

- 함수가 first class citizen/first class member라는 개념  
  - 변수에 함수를 대입할 수 있고, 함수를 다른 함수에 인자로 넘길 수 있고 함수에서 함수를 만들어 반환할 수 있어야 한다.  
  - 자바스크립트는 함수가 first class citizen 이기 때문에 함수형 프로그래밍을 지원한다 할 수 있다.  
- 함수를 인자로 받거나 함수를 반환하는 함수를 **고차 함수**라고 한다.  


## 핵심 개념  


### 불변성
- mutate: 변한다.
- immutable: 변할 수 없는 
- immutability: 불변성, 불변성 데이터는 바뀔 수 없는 데이터 
	- 함수형 프로그래밍에선 데이터가 변할 수 없다. 
- 불변성 데이터의 작동 방식
	- 원본 데이터의 구조를 변경하는 대신, 그 데이터 구조의 복사본을 만들어서 변경한다.  

#### 불변성을 유지하는 방법 
- 자바스크립트에서 함수의 인자는 실제 데이터에 대한 참조이므로, 인자로 넘겨 데이터를 변경하면 원본 데이터가 변경된다.  
```javascript
let developer = {
  name: "yj",
  language: "javascript"
}

function setLanguage(developer, language) {
  developer.language = language 
  return developer
}

console.log(setLanguage(developer, "java").language) // java
console.log(developer.language) // java
```

##### `Object.assign`
- 원본 데이터를 변경하지 않으려면 `Object.assign`을 사용할 수 있다.
```javascript
let setLanguage = function(developer, language) {
  return Object.assign({}, developer, {language:language})
}

console.log(setLanguage(developer, "typescript").language) // typescript
console.log(developer.language) // javascript
```

##### 화살표 함수, 스프레드 연산자 활용 
```javascript
const setLanguage = (developer, language) => ({
  ...developer,  // 원본 객체를 새로운 객체에 복사
  language      // language 프로퍼티를 덮어쓰기 
})
```

### 순수 함수  
- pure function 
- 파라미터에 의해서만 반환값이 결정되는 함수 
	- 인자가 같으면 항상 같은 값이나 함수를 반환하게 된다. 부수 효과가 없다. 
	- 순수 함수는 인자를 변경 불가능한 데이터로 취급한다. 


```javascript
let today = {
  title: "Learn TypeScript",
  desc: "TypeScript Modules",
  done: false, 
}  

const doneTodo = (todo) => ({
  ...today,
  done = true 
})
```
- `doneTodo` 함수는 순수함수다. 받은 파라미터를 변경하지 않고 불변 데이터로 취급했기 때문이다. 
- 리액트에서 UI를 순수 함수로 표현한다. 
	- 다음 코드에서 함수는 DOM을 변경하지 않고 엘리먼트를 반환한다. 엘리먼트를 만드는 일만 책임지는 것. 부수 효과가 없다.  
```javascript
const Nav = (props) => <h1>{props.menu}</h1>
```

- **순수 함수를 사용하면 애플리케이션의 상태에 영향을 미치지 않아서 코딩이 편해진다.**
- 순수 함수를 만들기 위한 규칙 
	1. 파라미터를 최소 하나 이상 받기
	2. 값이나 다른 함수를 반환하기 
	3. 인자나 함수 밖에 있는 다른 변수를 변경하거나 입출력을 수행해서는 안 됨 

### 데이터 변환 
- 자바스크립트에는 데이터 변경을 위해 제공되는 도구가 있다. `Array.map`과 `Array.reduce`이다.  
	- 새 배열을 만들기 때문 
	- `Array.filter`도 순수 함수이다.  

### 고차 함수  
- high order function (HOF)  
- 다른 함수를 인자로 받거나 함수를 반환할 수 있는 함수 
- `Array.map`, `Array.filter`, `Array.reduce`  
- 함수를 반환하는 고차 함수를 이용하면 필요할 때 재활용할 수 있는 함수를 만들 수 있다.  
- **커링**
	- 함수형 프로그래밍 기법 
	- 어떤 연산을 수행할 때 필요한 값 중 일부를 저장하고 나중에 나머지 값을 전달받는 기법 

### 재귀
- 자기 자신을 호출하는 함수를 만드는 기법 
```javascript
const deepPick = (fields, object={}) => {
  const [first, ...remaining] = fields.split(".")
  return (remaining.length) ? 
    deepPick(remaining.join("."), object[first]) : 
    object[first]
}
```

### 합성  
- 함수형 프로그램은 여러 작은 순수 함수로 나눠져 있고, 언젠가는 모든 작은 함수를 한 곳에 합칠 수 있다.  
- 함수를 연쇄 호출하는 체이닝 기법이 있다.  
```javascript
const template = "yyyy-mm-dd"
const birthday = template.replace("yyyy", "1994").replace("mm", "05").replace("dd", "13") 

console.log(birthday) // 1994-05-13
```
- **합성의 목표는 단순한 함수들을 조합해서 고차 함수를 만들어내는 것** 

#### `compose` 함수 
- 여러 함수를 인자로 받아서 한 함수를 결과로 내놓는다 .


## reference 
- [Learning React](https://www.hanbit.co.kr/store/books/look.php?p_code=B3942115529)





