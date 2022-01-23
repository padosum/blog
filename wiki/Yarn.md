---
title   : Yarn 
date    : 2022-01-23 20:40:05 +0900
updated : 2022-01-23 20:40:10 +0900
aliases : 
tags    : 
---
**Yarn**
- 페이스북에서 만든 자바스크립트 [[Package-Manager|패키지 매니저]]
- 여러 패키지를 설치할 때 병렬로 처리하기 때문에 설치 속도가 빠르다.
- [[NPM]]을 직접 사용해봐야 yarn의 필요성에 대해 판가름을 할 수 있다고 한다.[^1]

## yarn 명령어
- `yarn init`: `package.json` 생성
- `yarn or yarn install`: `package.json` 파일 및 해당 종속성에 나열된 모든 모듈을 설치
- `yarn add package_name@version`: 특정 패키지 특정 버전 설치
- `yarn add 주소`: 특정 저장소 내 패키지 설치
- `yarm remove`: 패키지 삭제 명령어
- `yarn update`: 패키지 업데이트


## 같이 보기
- [node_modules로부터 우리를 구원해 줄 Yarn Berry](https://toss.tech/article/node-modules-and-yarn-berry)

[^1]: https://velog.io/@kysung95/%EA%B0%9C%EB%B0%9C%EC%83%81%EC%8B%9D-npm%EA%B3%BC-yarn