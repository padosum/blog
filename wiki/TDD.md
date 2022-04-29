---
title   : TDD 
date    : 2022-02-27 22:41:55 +0900
updated : 2022-02-27 23:02:15 +0900
aliases : 
tags    : ["Test"]
---

**TDD (Test Driven Development)**

- 테스트 코드를 먼저 작성하고 그 테스트 코드를 통과하는 실제 코드를 나중에 작성하는 개발 방법  
	
## JavaScript와 Test
- [[JavaScript|자바스크립트]]는 자바와 같은 언어처럼 빌드 과정에서 문법 검사를 진행하지 않아 잘못된 코드를 작성하기 쉽다. 즉 컴파일러가 없으니 테스트를 하는 것이 중요하다. 
- 테스트하기 쉬운 코드를 만드는 방법: 함수가 하나의 기능만 하는 것 

### JavaScript Testing Framework  
- Mocha
- Puppeteer
- [[Jasmine]]
- Jest 등...

## TDD 절차
1. 실패
  - 실패하는 테스트 케이스를 먼저 만든다.
2. 성공
  - 실패한 테스트 케이스를 통과시키기 위해 코드를 작성하고 테스트를 통과시킨다. 
3. 리팩터링
  - 구현한 코드에 중복 or 개선할 부분이 있다면 진행한다. 
  - 리팩터링 후에 테스트 케이스가 성공하는지 확인한다.

## TDD 장점
- 리팩터링과 유지보수가 쉬워진다.

## 같이 보기
- [누구나 테스트 주도 개발 당장 시작 할 수 있는 방법](https://www.sungdoo.dev/programming/easiest-way-to-start-tdd)