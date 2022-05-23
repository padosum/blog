---
title   : JavaScript 어트리뷰트 값 가져오기, 어트리뷰트 값 변경, 삭제하기 
date    : 2021-10-04 13:21:14 +0900
updated : 2022-05-23 22:28:01 +0900
aliases : ["JavaScript 어트리뷰트 값 가져오기, 어트리뷰트 값 변경, 삭제하기"]
tags    : ["JavaScript"]
---

## 어트리뷰트 값 가져오기
`Element.getAttribute` 메서드를 이용한다.  
```javascript
const attribute = element.getAttribute(attributeName);
```
인자로 얻고자 하는 속성 이름(`attributeName`)을 전달한다.   

만약 특정 어트리뷰트가 존재하는지 확인하고 싶다면, `Element.hasAttribute()`를 사용한다.  
```javascript
const result = element.hasAttribute(name);
```

값이 정의되었는지 여부에 관계없이 `true`다. 따라서 값을 가지고 있지 않은 `Boolean` 어트리뷰트의 경우에 `true`가 나온다.
```html
<body>
  <input type="checkbox" checked></input>

  <script>
    const att = document.querySelector('input')
    console.log(att.hasAttribute('checked')) // true
  </script>
</body>
```


## 어트리뷰트 값 변경하기 
`Element.setAttribute()` 메서드를 이용한다.
```javascript
Element.setAttribute(name, value);
```
변경하고 싶은 어트리뷰트 이름(`name`)과 변경하려는 값(`value`)를 전달한다.  

## 어트리뷰트 값 삭제하기
`Element.removeAttribute()` 메서드를 이용한다.  
```javascript
Element.removeAttribute(attrName);
```
삭제하고 싶은 어트리뷰트 이름(`attrName`)을 전달한다. 
