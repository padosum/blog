---
title   : Jasmine 
date    : 2022-02-27 22:49:38 +0900
updated : 2022-02-27 22:58:20 +0900
aliases : 
tags    : 
---
[[JavaScript]] 테스트 프레임워크  

## 설치
[standalone](https://github.com/jasmine/jasmine/releases)에서 원하는 버전을 설치한다.  

### Test Runner 
- Jasmine, Source Code, Test Code를 실행한다.  
- standalone으로 설치한 jasmine은 HTML 파일이 테스트 러너다.  
  - 테스트 자동화를 하려면 테스트 러너인 Karma와 함께 사용할 수 있다.  

## 사용법 
- `describe('테스트 설명', 테스트 구현 함수)`
- `it ('테스트 설명', 기대식을 가진 테스트 구현 함수)`
- `expect(결과값).toBe(기대값)`
- `spyOn(감시할 객체, 감시할 메서드)`

## reference
- [견고한 JS 소프트웨어 만들기](https://inf.run/wxtD)
