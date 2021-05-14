---
title   : JavaScript 클로저 
excerpt : 
date    : 2020-06-03 00:18:47 +0900
updated : 2021-05-14 18:15:16 +0900
tags    : [Javascript]
parent  : 
layout  :
---

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
- 자바스크립트는 기본적으로 private 속성[^1]을 지원하지 않는데 클로저의 이러한 특성을 이용해 private 속성을 사용할 수 있게 된다.  

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

## 참고자료
- [생활코딩](https://opentutorials.org/course/743/6544)


[^1]: 객체의 외부에서는 접근할 수 없는 외부에 감춰진 속성이나 메소드, 이를 통해 객체의 내부에서만 사용해야하는 값이 노출됨으로서 생기는 오류를 줄일 수 있음  
