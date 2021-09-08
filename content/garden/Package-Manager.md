---
title   : 패키지 매니저
date    : 2021-04-22 23:27:10 +0900
updated : 2021-09-08 23:22:35 +0900
aliases : 
private : false
hidden  : false
showReferences : true
---

- 패키지(하나의 완성된 소프트웨어나 부품으로 쓰이는 라이브러리 및 모듈)들의 설치, 업데이트 및 패키지간의 의존성과 버전 정보를 관리해주는 프로그램  

## 종류 
- 엔드 유저가 사용할 실행 가능한 프로그램을 배포하는 프로그램 → Apple App Store, Google Play Store .... 
- OS별로 사용하는 여러 프로그램 및 각종 라이브러리 설치를 돕는 [[CLI]] 프로그램 → yum, apt, brew
- 특정 플랫폼의 라이브러리 및 모듈을 모은 [[CLI]] 프로그램 → [[NPM]], pip, gem, nuget, gradle... 

## 사용 목적  
- 개발중인 패키지의 의존성 정보를 기반으로(Node.js의 경우 `package.json`) 원격 저장소(Repository)로부터 의존 패키지들을 다운로드 및 업데이트할 수 있도록 한다.  
- 그래서 프로그램을 배포할 때 의존하고 있는 패키지들 모두 소스코드에 포함할 필요 없이 메타 정보만을 포함하는 것이 가능해진다.  → **의존 라이브러리들의 설치 및 관리가 편리**해진다.

## 참고
- [https://okky.kr/article/400839](https://okky.kr/article/400839)
