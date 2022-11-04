---
title   : JavaScript querySelector 사용하기 
date    : 2022-11-04 13:33:21 +0900
updated : 2022-11-04 13:35:05 +0900
aliases : ["JavaScript querySelector 사용하기"]
tags    : ["How to", "JavaScript"]
draft : false
---

## data 어트리뷰트를 가진 요소 가져오기
특정 [[JavaScript-Data-Attribute|data 어트리뷰트]]를 가진 요소를 `querySelector`로 가져올 수 있다.
```js
const padosum = document.querySelector('[data-name="padosum"]')

const people = document.querySelectorAll('[data-name]')

// 'mg'로 시작하는 data-id를 가진 요소
const mg = document.querySelector('[data-id^="mg"]')

// 'er'로 끝나는 data-id를 가진 요소
const er = document.querySelector('[data-id$="er"]')

// 'box'를 포함하는 data-id를 가진 요소
const boxes = document.querySelectorAll('[data-id*="box"]')
```
[참고](https://bobbyhadz.com/blog/javascript-get-element-by-data-attribute)


## required attribute를 가진 요소 가져오기

```js
const required = document.querySelectorAll('[required]');
```
