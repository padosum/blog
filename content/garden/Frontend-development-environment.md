---
title   : 프론트엔드 개발 환경 - Node.js 
excerpt : 
date    : 2020-03-16 21:51:20 +0900
updated : 2021-06-03 13:49:45 +0900
tags    : [Env, Nodejs]
parent  : 
layout  : 
---

## Node.js의 필요성 
- 브라우저 밖에서도 자바스크립트를 실행할 수 있는 환경 
- 최신 스펙으로 개발 가능
- 빌드 자동화
- 개발 환경 커스터마이징
- 인터넷에 공개된 패키지(모듈)을 설치하고 관리하는 도구로 [[NPM]]을 제공한다. 
## [[NPM]](Node Package Manager) 
- 명령어로 자바스크립트 라이브러리를 설치하고 관리할 수 있는 패키지 매니저, 전 세계 자바스크립트 개발자들이 자바스크립트 라이브러리를 공개된 저장소에 올려놓고 `npm` 명령어로 편하게 다운받을 수 있다.  
[Node.js와 NPM 최신 버전으로 업그레이드하기](https://velopert.com/1351) 

## 프로젝트 초기화 
- 개발 프로젝트는 외부 라이브러리를 다운로드 받고 빌드하는 등 일련의 명령어를 자동화해 프로젝트를 관리하는 도구가 존재 (ex.자바의 Gradle) 
  
### `INIT`
- 프로젝트를 생성 
  - 모두 기본값으로 하려면 `npm init -y` 

## 프로젝트 명령어
- 생성한 프로젝트는 package.json에 등록한 스크립트를 이용해 실행
- 명령어 추가 방법
  - package.json scripts 부분에 키를 추가하고 `npm run 해당키`  
    
## 패키지 설치 
  
### CDN
- CDN으로 제공하는 라이브러리를 html에서 로딩하기 
  - 🤔 CDN 서버 장애로 인해 불러오지 못한다면? 
    - 라이브러리를 직접 다운로드하는 방법이 있다....

### [[NPM]]
- 프로젝트 내의 라이브러리를 관리하는 목적(의존성 문제를 해결)을 위해 NPM을 사용하는 것이 좋다.  
    - **package.json**에 프로젝트에 사용하는 라이브러리와 버전들이 정리되어 있기 때문이다.  
- 라이브러리를 업데이트 시 매번 다운로드 하는 것은 상당히 귀찮은 일.. 게다가 하위 버전 호환성 체크도 필요하다. 
  - `npm install`(또는 `npm i`) 명령어를 이용해 외부 패키지를 다운로드하자! 
- **package.json**에 `dependencies`를 보면 패키지 정보가 기록된다. 
    - 버전 번호 관리 규칙이 있다. 
        - [유의적 버전](https://semver.org/lang/ko/) 참고 

## reference
- [프론트엔드 개발환경의 이해: NPM](http://jeonghwan-kim.github.io/series/2019/12/09/frontend-dev-env-npm.html)
- [웹팩 핸드북](https://joshua1988.github.io/webpack-guide/build/node-npm.html#node-js%EC%99%80-npm)
