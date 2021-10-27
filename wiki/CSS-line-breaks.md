---
title   : CSS로 줄바꿈 처리를 하는 방법
date    : 2021-10-27 16:55:43 +0900
updated : 2021-10-27 17:53:58 +0900
aliases : ["CSS로 줄바꿈 처리를 하는 방법"] 
tags    : ["CSS"]
---
## Goal
CSS 속성 `word-break`, `hyphens` 에 대해 알아보기 

## word-break
텍스트의 양이 contents box를 넘어가는 경우에 어떻게 줄을 바꿀 지 지정할 수 있다.  
```css
/* 기본 줄 바꿈 규칙 */
word-break: normal;  

/* 한중일 텍스트를 제외하고 
 * 텍스트가 넘치는 것(오버플로)을 방지하기 위해 
 * 줄 바꿈이 발생할 수 있다. 
 */
word-break: break-all; 

/* 한중일 텍스트에서 줄을 바꿀 때 
 * 단어가 중간에 끊기지 않는다. 
 * (비 한중일 텍스트는 normal과 동일)
 */
word-break: keep-all;
```
**웹에서 글이 읽기 쉽게 디자인하기 위해서는 `word-break: keep-all`을 사용해 단어가 끊기지 않도록 하는 것이 중요하다.** 

## hyphens
영어 문서를 읽을 때 한 단어인데 길어서 줄이 넘어가는 경우에 하이픈(`-`)으로 연결한다. 이렇게 단어를 형태소로 나누는 것을 "분철"이라고 하는데 규칙이 나라마다 다르다고 한다.  
CSS의 `hyphens` 속성은 텍스트에 하이픈(`-`)을 추가하는 방식을 설정한다.  
```css
/* 줄바꿈이 일어나지 않는다.*/
hyphens: none;

/* 줄 바꿈 위치를 나타내는 문자에서 줄을 바꿈 */
hyphens: manual;

/* 브라우저가 적합한 하이픈의 위치를 골라서 줄을 바꿀 수 있게 한다.*/
hyphens: auto;
```
[참고](https://developer.mozilla.org/ko/docs/Web/CSS/hyphens)

## reference
- [https://developer.mozilla.org/ko/docs/Web/CSS/word-break](https://developer.mozilla.org/ko/docs/Web/CSS/word-break)
- [영어 하이픈 사용법](https://raccoonenglish.tistory.com/2939)
