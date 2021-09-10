---
title   : JavaScript 클로저 
excerpt : 
date    : 2020-06-03 00:18:47 +0900
updated : 2021-09-10 22:29:45 +0900
tags    : [Javascript]
---
> 클로저란 어떤 함수 A에서 선언한 변수 a를 참조하는 내부함수 B를 외부로 전달할 경우 A의 실행 컨텍스트가 종료된 이후에도 변수 a가 사라지지 않는 현상을 말한다.  
- 내부함수가 외부함수의 맥락(context)에 접근할 수 있는 것 

## 내부함수 
- 함수 안에 있는 또 다른 함수를 내부함수라고 한다.  
    ```javascript
    function outter() {
        var text = 'hello world';
        function inner() {	
            alert(text);
        }
        inner(); 
    }
    ```
	- 위 코드에서 `inner()`는 외부함수인 `outter()`의 지역변수에 접근할 수 있다.  
	
## 클로저 
- 내부함수는 외부함수의 실행이 끝나서 외부함수가 소멸된 이후에도 외부함수의 변수에 접근이 가능하다. 
    ```javascript
    function outter() {
        var text = 'hello world';
        return function() {
            alert(text);
        }
    }
    var inner = outter(); // ouuter() 내부에 return되는 함수가 들어간다. 
    inner(); // 외부함수(outter())의 지역변수인 text가 그대로 접근이 가능함 
    ```

## 예제1
```javascript
function factory_movie(title) {
	return {
		get_title : function () {
			return title;
		},
		set_title : function(_title) {
			title = _title;
		}
	}
}
var ghost = factory_movie('Ghost in the shell');
var matrix = factory_movie('Matrix');

console.log(ghost.get_title());	    // 'Ghost in the shell
console.log(matrix.get_title());	// 'Matrix'
ghost.set_title('공각기동대')
console.log(ghost.get_title());	    //	'공각기동대'
```
- 똑같은 외부함수로 만들어진 ghost, matrix의 get_title의 결과가 다른 것은 외부함수가 실행될 때마다 새로운 지역변수를 포함하는 클로저가 생성되기 때문이다.
- 자바스크립트는 기본적으로 private 속성을 지원하지 않는데 클로저의 이러한 특성을 이용해 private 속성을 사용할 수 있게 된다.  

## 예제2
```javascript
var arr = []
for (var i = 0; i < 5; i++) {
	arr[i] = function() {
		return i;
	}
}
for(var index in arr) {
	console.log(arr[index]()); // 5만 다섯번 
}
```
```javascript
var arr = []
for (var i = 0; i < 5; i++) {
	arr[i] = function(id) {
		return function() {
			return id;
		}
	}(i);
}
for(var index in arr) {
	console.log(arr[index]());
}
```

## 클로저를 활용해 private 변수 만들기  
```javascript
function Account() {
  let _money = 0
  return {
    deposit: function(amount) {
      _money += amount 
    },
    withdraw: function(amount) {
      _money -= amount
    },
    getMoney: function() {
      return _money;
    }
  }
}

const fund = Account()
fund.deposit(100) // 100
fund.deposit(100) // 100
console.log(fund.getMoney()); // 200
fund._money = 100000          // private 변수로 접근할 수 없다. 
fund._money = 4000000
console.log(fund.getMoney()); // 200
```
- `Account` 함수 내부의 `_money`라는 변수는 `deposit`, `withdraw`, `getMoney`를 제외하고 직접 접근할 수 있는 방법이 없다. 이처럼 클로저를 활용하여 변수에 직접 접근하지 못하도록 제어할 수 있다. (private 변수로 활용됨)  

## 부분 적용 함수
- 부분 적용 함수(partially applied function), n개의 인자를 받는 함수에 미리 m개의 인자만 넘겨서 기억시킨 뒤에 나중에 (n-m)개의 인자를 넘기면 원래 함수의 실행 결과를 얻을 수 있는 함수

## reference
- [생활코딩](https://opentutorials.org/course/743/6544)
- 코어 자바스크립트, 정재남 
