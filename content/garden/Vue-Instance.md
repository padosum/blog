---
title   : 뷰 인스턴스 
date    : 2021-04-26 12:55:46 +0900
updated : 2021-04-26 12:55:52 +0900
aliases : 
private : false
hidden  : false
showReferences : true
---
## 뷰 인스턴스 사용하기
```javascript
const vm = new Vue({
    el: '#app', // el로 지정된 요소에 Vue API들을 사용할 수 있다. 
    data: {
        message: `hi`,
    }
}); 
```  
- 인스턴스 안에는 미리 정의되어 있는 속성과 메서드(API)들이 있어서 그것을 활용해 화면 개발을 할 수 있다.  

## 인스턴스와 생성자 함수 
- JavaScript에서 함수를 이용해 인스턴스를 생성하는 방법 → 생성자 함수를 이용하기  
```javascript
function Person(name, job) {
    this.name = name;
    this.job = job; 
    this.sayHello = function() {
        console.log(`Hello`, this.name);
    }
}
let p1 = new Person('padosum', 'developer');
p1.sayHello();
let p2 = new Person('makalu', 'designer'); 
p2.sayHello(); 
```  
- 어떤 함수를 인스턴스마다 사용하기 위해 사용할 때마다 새로 정의하는 것이 아니라 생성자 함수로 한번 정의해놓으면 그 생성자 함수로 만든 인스턴스에서 계속 사용할 수 있다.  
  - 결국 vue도 생성자 함수로 정의된 API를 가져다 쓰거나 재사용하는 패턴을 갖게 된다.  


## 인스턴스의 옵션과 속성 
- [https://joshua1988.github.io/vue-camp/vue/instance.html#%EC%9D%B8%EC%8A%A4%ED%84%B4%EC%8A%A4%EC%9D%98-%EC%86%8D%EC%84%B1-api%EB%93%A4](https://joshua1988.github.io/vue-camp/vue/instance.html#%EC%9D%B8%EC%8A%A4%ED%84%B4%EC%8A%A4%EC%9D%98-%EC%86%8D%EC%84%B1-api%EB%93%A4)


## 출처 
- [Vue.js시작하기 - 장기효](https://inf.run/SwGd)