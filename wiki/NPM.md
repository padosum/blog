---
title   : NPM
date    : 2021-06-03 13:56:01 +0900
updated : 2023-09-18 22:43:29 +0900
tags    : ["JavaScript"] 
---
**NPM (Node Package Manager)**  

- 명령어로 자바스크립트 라이브러리를 설치하고 관리할 수 있는 [[Package-Manager|패키지 매니저]], 전 세계 자바스크립트 개발자들이 자바스크립트 라이브러리를 공개된 저장소에 올려놓고 `npm` 명령어로 편하게 다운받을 수 있다. 

## NPM 설치 
- `npm install`  : `npm i`로 줄여쓰기 가능
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

## NPM 명령어
### `npm ci`

- 현재 `node_modules`를 삭제하고 `package-lock.json` 파일에 명시된 대로 하위 의존성 모듈까지 **정확한 버전**으로 설치한다. 
- `node_modules`가 없는 경우에 `npm install`보다 2배 이상 빠르다. [참고](https://blog.npmjs.org/post/171139955345/v570.html)

## scripts
- custom scripts는 `npm run 명령어`로 실행한다.  

### concurrently
[concurrently](https://github.com/open-cli-tools/concurrently)를 사용하면 여러 개의 스크립트를 동시에 실행할 수 있다. server와 client를 동시에 실행시킬 때 사용한다.  
```bash
$ npm install concurrently
```
```json
"scripts": {
    "backend": "nodemon server/index.js",
    "dev": "concurrently \"npm run backend\" \"npm run start --prefix client \""
  },
```
스크립트의 경로가 다른 곳에 있다면 `--prefix 경로`를 뒤에 붙여준다.
  
## 버전에 대하여 [^1]
패키지 간의 의존 관계가 복잡하니 버전 번호를 어떻게 정하고 올려야 하는지 명시하는 규칙이 등장했다.
- 노드 패키지들의 버전은 항상 세 자리로 이뤄져 있는데 그 이유는 SemVer 방식의 버전 넘버링을 따르기 때문
- SemVer: Semantic Versioning. 버전을 구성하는 세 자리가 모두 의미를 가지고 있다는 뜻이라고 한다.
- 버전의 첫 자리: major 버전
	- 1부터 정식 버전
	- 하위 호환이 안 될 정도로 패키지 내용이 수정되었을 때 버전을 올린다.
- 버전의 두 번째 자리: minor 버전
	- 하위 호환이 되는 기능 업데이트 시 버전을 올린다.
- 버전의 세 번째 자리: patch 버전
	- 새로운 기능이 추가되었다기 보다는 기존 기능의 문제가 있을 때 버전을 올린다.
- 기호 - 설치 / 업데이트 시에 어떤 버전을 설치해야하는지를 명시한다.
	- `^`: minor 버전까지만 설치 또는 업데이트
	- `~`: patch 버전까지만 설치 또는 업데이트
	- `@latest` 또는 `@x`: 항상 최신 버전
	- `>`, `<`, `>=`, `<=`, `=`: 문자 그대로 초과, 미만, 이상, 이하, 동일을 의미

---

모 패키지를 둘러보다가 rc라고 붙은 버전을 발견했다.

`3.0.0-rc.1`

무슨 뜻일까 찾아보니 rc = release candidate -> 릴리즈 후보였다.
아직 정식으로 출시된 것은 아니나 준비가 된 버전을 의미하는 것이었다. [버그가 발견되지 않고 개발자들, 커뮤니티에서 안정적인 것으로 판단되면 릴리즈 된다.](https://stackoverflow.com/questions/41307500/what-does-the-rc-in-a-npm-package-version-structure)


## NVM (Node Version Manager)  
- node 버전 변경 프로그램 
- 호환성을 위해 node 버전을 변경해야할 때 이전 버전을 직접 설치해도 되지만 NVM을 사용해도 된다.  
- NVM 사용법
  - 설치 후 `node -v` 현재 node 버전 확인
  - `nvm install 10.16.3` node 10.16.3 버전이 설치되고 해당 버전으로 변경 
  - `nvm use 버전명` node 버전 변경(해당 버전이 이미 설치된 경우)  
  - `nvm list`: 설치된 node version 목록을 보여준다.
  - `nvm uninstall 버전명`: 노드 버전을 삭제한다.
	  - ex) `nvm uninstall v14`: 14.xxx 버전이 삭제된다.

## reference 
- [프론트엔드 개발자를 위한 웹팩](https://inf.run/hVZe)
- [https://ellapresso.tistory.com/79](https://ellapresso.tistory.com/79)

[^1]: 조현영 저, 《Node.js 교과서》, 길벗, 2018년
