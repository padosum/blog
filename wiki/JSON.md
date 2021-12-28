---
title   : JSON
date    : 2021-12-07 22:32:05 +0900
updated : 2021-12-28 15:16:59 +0900
---

클라이언트와 서버 간의 HTTP 통신을 위한 텍스트 데이터 포맷, 대부분의 프로그래밍 언어에서 사용할 수 있다.

## 발견  
- 더글러스 크락포드와 칩 모닝스타(Chip Morningstar)가 단일 페이지로 구성된 웹 애플리케이션을 위한 플랫폼을 만들기 위해 회사를 하나 차림
- 브라우저와 서버 간에 정보를 전달할 수 있는 방법이 필요했음
	- 당시에는 [[XML]]에 지배당하고 있었다.
- 서로 다른 언어로 작성된 프로그램들 사이에서 데이터를 교환할 수 있기를 원했는데, XML은 문제를 해결할 수 없다고 판단했다. 
- **개선된 XML이나 대체제들이 많이 있었으나 어느 것도 흥미를 끌진 못했고 스스로 만들기로 결심함. -> [[JavaScript-Object-Literal|자바스크립트 객체 리터럴]]을 사용할 수 있겠다는 아이디어 **
- 원래 이름은 "JSML"이라고 불렀는데 "JSON"으로 변경됐다고 한다.  

### JSON의 표준화
- 고객들에게 JSON 컨셉을 설득시키느라 힘든 시간을 보냈다고 한다.
	- `json.org` 도메인을 구매
- 자바스크립트 때문에 속성 이름은 따옴표로 둘러싸고, 예약어 목록은 집어넣지 않기로 했다.
- JSON에 대한 트레이드마크나 로고는 원하지 않고, 페이지에 저작권 관련 문구도 넣지 않음 
	- JSON을 최대한 자유롭게 하기 위하여...
	- 돈도 벌고 싶지 않았음. 많은 사람들이 사용하길 바랄 뿐...
- **JSON이 잘 동작할 수 있었던 이유는 각 언어별로 값이나 데이터 구조를 표현하는 방식이 서로 다르고 복잡할 수 있어서 설계시 공통점을 위주로 설계하는 방식**을 취했다고 한다.

## JSON 표기 방식 
[[JavaScript-Object-Literal|자바스크립트 객체 리터럴]]과 유사하게 키와 값으로 구성되어 있는 텍스트로 표기한다. 
```json
{
  "name": "padosum",
  "age": 20,
  "hobby": ["tennis", "programming"]
}
```

## JSON 객체  
자바스크립트는 JSON 객체의 두 개의 함수(`stringify`, `parse`)를 통해 JSON을 지원한다. 

### JSON.stringify
`JSON.stringify` 메서드는 객체를 JSON 포맷의 문자열로 변환한다. 클라이언트가 서버로 객체를 전송하려면 객체를 문자열화해야 하는데 이를 **"직렬화"**라고 한다. 
```javascript
const obj = {
  name: "padosum",
  age: 20,
  hobby: ["tennis", "programming"]
};

const json = JSON.stringify(obj);
console.log(typeof json, json);
// string {"name":"padosum","age":20,"hobby":["tennis","programming"]}
```

데이터 전송 시에 텍스트를 압축하기 위해 공백 문자를 추가하지 않는데 `space` 매개변수를 쓰게 되면 줄 바꿈 문자와 들여쓰기를 삽입한다. 
  
```javascript
const jsonWithSpace = JSON.stringify(obj, null, 2);
console.log(jsonWithSpace);
/*
{
  "name": "padosum",
  "age": 20,
  "hobby": [
    "tennis",
    "programming"
  ]
}
*/
```

`replacer` 매개변수를 사용하면 데이터 필터링도 가능하다.
  
```javascript
function replacer(key, value) {
  if (typeof value === "number") {
    return undefined;
  }
  return value;
}

const filteredJson = JSON.stringify(obj, replacer, 2);
console.log(filteredJson);
/*
{
  "name": "padosum",
  "hobby": [
    "tennis",
    "programming"
  ]
}
*/
```

### JSON.parse
`JSON.parse` 메서드는 JSON 포맷의 문자열을 객체로 변환한다. 서버로부터 클라이언트에게 전송된 JSON 데이터는 문자열이기 때문에 객체로서 사용하기 위해 사용한다. 이를 **역직렬화**라고 한다.

```javascript
const obj = {
  name: "padosum",
  age: 20,
  hobby: ["tennis", "programming"]
};

const json = JSON.stringify(obj);

const parsedData = JSON.parse(json);
console.log(parsedData);
// {name: 'padosum', age: 20, hobby: Array(2)}
```

`JSON.parse`도 `reviver` 함수를 매개변수로 받아서 값을 반환하기 전에 변환할 수 있다.   
```javascript
function replacer(key, value) {
  if (typeof value === "number") {
    return undefined;
  }
  return value;
}

const filteredData = JSON.parse(json);
console.log(filteredData);
// {name: 'padosum', hobby: Array(2)}
```


## reference
- 박수현 역, 더글러스 크락포드 저, 《자바스크립트는 왜 그 모양일까?》, 인사이트, 2020년
- 이웅모 저, 《모던 자바스크립트 Deep Dive》, 위키북스, 2020년
- [MDN Web Docs - JSON.stringify()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)
- [MDN Web Docs - JSON.parse()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)