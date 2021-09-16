---
title   : NPM
date    : 2021-06-03 13:56:01 +0900
updated : 2021-06-07 14:23:50 +0900
aliases : 
---
**NPM (Node Package Manager)**  

- 명령어로 자바스크립트 라이브러리를 설치하고 관리할 수 있는 패키지 매니저, 전 세계 자바스크립트 개발자들이 자바스크립트 라이브러리를 공개된 저장소에 올려놓고 `npm` 명령어로 편하게 다운받을 수 있다. 

## NPM 설치 
- `npm install` 
- `npm uninstall`: 라이브러리 삭제 명령어 
  
### NPM 설치 명령어 옵션 
- `--global` 또는 `-g`
  - 프로젝트에서 사용할 라이브러리를 불러오는 것이 아니라 시스템 레벨에서 사용할 라이브러리를 설치할 때 사용 
  - 전역으로 설치된 라이브러리 경로: `/usr/local/lib/node_modules`
- `--save-prod`
  - 옵션에 아무것도 넣지 않은 것과 같다. **package.json**의 `dependencies`에 등록됨 
- `--save-dev` 또는 `-D` 
  - **package.json**의 `devDependencies`에 등록됨

## dependencies, devDependencies 
- `dependencies`는 배포용, `devDependencies`는 개발용  
  - 배포용은 화면 로직과 연관된 라이브러리, 개발용은 개발할 때만 사용하고 배포할 때는 빠져도 좋은 라이브러리
  - 배포용 라이브러리는 `npm run build`로 빌드하면 최종 애플리케이션 코드 안에 포함되게 된다. 
- 개발용 라이브러리의 예
  - webpack
  - eslint
  - sass
  - js-compression 
  - imagemin 

## scripts
- custom scripts는 `npm run 명령어`로 실행한다.  
  
  
## reference 
- [프론트엔드 개발자를 위한 웹팩](https://inf.run/hVZe)
