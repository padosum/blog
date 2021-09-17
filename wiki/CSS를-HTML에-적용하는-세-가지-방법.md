---
title   : CSS를 HTML에 적용하는 세 가지 방법
date    : 2021-09-16 12:52:05 +0900
updated : 2021-09-16 12:52:49 +0900
aliases : 
tags    : ["CSS"] 
---
CSS를 HTML에 적용하는 세 가지 방법은 다음과 같다.  
1. External CSS
2. Internal CSS
3. Inline CSS 

이 글에서 세 가지 방법과 더불어 각 방법의 장단점에 대해 정리한다. 

## External CSS 
HTML 외부에 있는 `.css` 파일을 불러오는 방식이다.HTML의 `<head>` 섹션 내부에  `<link>` 를 사용해 불러온다.  
```html
<!DOCTYPE html>
<html>
  <head>
  	<link rel="stylesheet" href="style.css">
  </head>
  <body>
  	<h1>This is External CSS</h1>
  </body>
</html>
```
`href` 속성에 적힌 `.css`파일이 해당 경로에 존재해야 한다.  
```css
/* style.css */
body {
  background-color: dodgerblue;
}

h1 {
  color: orange;
}
```
![[html-with-css-1.png]]
하나의 파일만 불러와서 모든 페이지에 동일한 스타일을 적용할 수 있는 장점이 있다. 그리고 CSS 코드가 HTML 코드와 분리되어 코드 관리가 편해진다. 특정 요소를 구체적으로 제어하기는 어려울 수 있다.

## Internal CSS 
한 HTML 페이지에만 해당 스타일을 적용하고 싶을 때 사용한다. 
`<head>` 섹션 내부에 `<style>` 엘리먼트 안에다 스타일을 정의한다. 
```html
<!DOCTYPE html>
<html>
  <head>
    <style>
	body {
	  background-color: blue;
	}
	h1 {
	  color: grey;
	}
	</style>
  </head>
  <body>
    <h1>This is Internal CSS</h1>
  </body>
</html>
```
![[html-with-css-2.png]]  
External CSS와 함께 사용할 수 있어 External CSS로 적용된 스타일에 특정 페이지에만 추가적인 스타일을 적용할 수 있는 장점이 있다. 하지만 특정 스타일을 적용하고 싶은 페이지가 여러 개라면, 각 페이지 상단에 동일하게 코드를 작성해야 한다. 코드가 지저분해 보일 수도 있고 프로젝트의 규모가 클 경우 해당 작업엔 시간이 많이 걸릴 수 있다.  

## Inline CSS 
이 방법은 한 엘리먼트에만 해당 스타일을 적용하고 싶을 때 사용한다.  
```html
<!DOCTYPE html>
<html>
  <body>
    <h1 style="color:grey;">This is Inline CSS</h1>
	<p style="text-align:center;">Hello</p>
  </body>
</html>
```
![[html-with-css-3.png]]
특정 엘리먼트에 특정 스타일을 적용하고 싶을 때 유용하지만, HTML 엘리먼트의 정보와 분리가 되지 않아 소스 코드가 복잡해져서 코드 유지보수 관점에서 좋지 않다. W3C에서도 내용과 디자인을 분리할 것을 권하고 있다.  

## 세 가지 방법의 우선순위 
HTML 페이지에 두 가지 이상의 방법이 적용된다면 다음과 같은 우선순위로 적용이 된다.
1. Inline CSS 
2. External CSS, Internal CSS 
3. Browser default 값   

---
여기서 CSS의 뜻을 살펴볼 필요가 있다. CSS는 "Cascading Style Sheet"의 약자다. "Cascading"의 뜻은 "폭포처럼 흐르다."라는 의미인데 CSS 스타일이 우선순위에 따라서 연속적으로 흐르면서(폭포처럼) 스타일이 적용된다고 볼 수 있다. 우선순위가 높은 Inline 스타일 시트가 흘러 External 스타일 시트와 Internal 스타일 시트를 무시하고 덮어쓰는 것이다. 


## reference
- [https://www.w3schools.com/css/css_howto.asp](https://www.w3schools.com/css/css_howto.asp)
- [https://spoonfencing.wordpress.com/year-2/unit-20-client-side-customisation-of-web-pages/assignment-1-research-into-the-fundamentals-of-css/m1-the-advantages-and-disadvantages-of-external-internal-and-in-line-css/](https://spoonfencing.wordpress.com/year-2/unit-20-client-side-customisation-of-web-pages/assignment-1-research-into-the-fundamentals-of-css/m1-the-advantages-and-disadvantages-of-external-internal-and-in-line-css/)