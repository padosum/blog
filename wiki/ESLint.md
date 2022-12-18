---
title   : ESLint
date    : 2021-06-13 20:37:56 +0900
updated : 2022-12-18 23:04:36 +0900
aliases : 
tags: ["JavaScript"]
---
## Lint 
- 보풀
- Lint Roller, 돌돌이 보풀제거기 
- 린트 롤러처럼 코드의 오류나 버그, 스타일을 점검하는 것을 린트, 린터라 한다.  
  
## ESLint
- ECMAScript 코드에서 린트 도구 중 하나  
- 코드에서 검사하는 항목
  - 포맷팅
    - 일관된 코드 스타일 유지, 가독성을 더 좋도록 해준다. 
  - 코드 품질 
    - 앱의 잠재적인 오류나 버그를 예방, 오류 발생 확률을 줄여준다. 
    
## ESLint 설치와 사용  

[공식 문서 참고](https://eslint.org/docs/latest/user-guide/getting-started)
다음 명령을 사용하면 몇 가지 질문을 거친 후 설치가 완료된다:
```sh
npm init @eslint/config
```

직접 설치는 다음 명령어로 한다:
```bash
npm i -D eslint
```

노드 패키지 설치 후 `.eslintrc.{js, yml, json}`라는 이름의 린트 설정파일 생성한다.
(`npm init @eslint/config`를 사용하면 이미 만들어져 있을 것이다.)

```javascript
// .eslintrc.js
module.exports = {
  rules: {
    "no-unexpected-multiline": "error",
  },
}
```

- 파일의 `rules`에 코드를 검사하는 규칙을 정할 수 있다. 
  - [미리 정해놓은 규칙들](https://eslint.org/docs/rules/)
  - 규칙 목록 중 렌치 아이콘이 표시되어 있는 항목은  `--fix` 옵션으로 자동 수정이 가능한 규칙이다.  
    
### `extends`
- 미리 규칙들을 프리셋처럼 만들어논 것이 있다. `eslint:recommended` 설정  
```javascript
// .eslintrc.js
module.exports = {
  extends: [
    "eslint:recommended", // 미리 설정된 규칙 세트을 사용한다
  ],
}
```
- 규칙 목록 중에 체크 표시가 되어있는 항목

설정을 다 했으면 사용해보자.
```sh
npx eslint 파일명 --fix
```

### error  'module' is not defined
설정 후 `.eslintrc.js` 파일을 `--fix` 옵션과 함께 린터를 돌리면 다음과 같은 오류가 나타날 것이다.
```
error  'module' is not defined
```

eslint 설정에 `env`에 `node`를 추가해야 한다.
```js
// .eslintrc.js
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
```


## Prettier

[[prettier]]는 code formatter다.

linter는 두 가지 범주의 규칙을 가지고 있다. 서식 규칙(코드 포맷)과 코드 품질 규칙이다. 
포맷팅에는 prettier를 사용하고 코드 버그를 찾으려면(품질을 위해) linter를 사용해야 한다. 

**ESLint와 prettier를 함께 사용하기 위해 `eslint-config-prettier`를 사용하면 prettier와 충돌하는 ESLint 규칙을 비활성화 한다.**  

```sh
npm install --save-dev eslint-config-prettier
```

```javascript
// .eslintrc.js
{
  extends: [
    "eslint:recommended",
    "eslint-config-prettier"
  ]
}
```
```bash
npx prettier 파일명 --write && npx eslint 파일명 --fix
```

[블로그 글](https://yrnana.dev/post/2021-03-21-prettier-eslint) 이 많은 도움이 되었다.

## 자동화  
린트를 매번 코딩시에 수시로 실행하는 것보다 자동화하는 것이 편하다.  


### 에디터 확장 도구 사용하기  
[https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)  

저장시 린트 검사를 하는 옵션, `settings.json`에 다음 내용을 추가한다:
```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```  

### Git Hooks
- [husky](https://github.com/typicode/husky)는 깃 훅을 쉽게 사용할 수 있는 도구  
```bash
npm i -D husky
```
```json
{
  "husky": {
    "hooks": {
      "pre-commit": "eslint app.js --fix"
    }
  }
}
```
- 린트중 오류가 발생하면 커밋에 실패한다.  
- [lint stage](https://github.com/okonet/lint-staged)은 변경된 파일만 린트로 검사하는 도구  
  ```bash
  {
    "lint-staged": {
      "*.js": "eslint --fix"
    }
  }
  ```
  ```json
  {
    "lint-staged": {
      "*.js": "eslint --fix"
    },
    "husky": {
      "hooks": {
        "pre-commit": "lint-staged"
      }
    }
  }
  ```
  
## 옵션 
### quotes 
큰 따옴표, 작은 따옴표, 백틱을 강제할 수 있다.  
만약 큰 따옴표와 백틱을 함께 사용하려면 다음과 같이 설정하면 된다.  
```json
{
    ... 
    "rules": {
        "quotes": [ 
            "error",
            "single",
            {
                "allowTemplateLiterals":  true
            }
        ]
    }
}
```

## 생각  
ESLint라 하면 여러 강의나 튜토리얼에서 "코드 오류를 수정해준다. 확장 프로그램을 설치해라." 하고 간단하게 설명만들었었는데 왜 필요한지, 어떻게 사용해야 하는지, 또 다른 사용법은 무엇인지 상세하게 알게되었다. 결국 기초와 원리가 중요함을 또 느꼈다. 그냥 확장프로그램이 만들어져 있으니 사용하는 것이 아니라 그걸 사용하는 이유와 어떤 부분에서 편리한 프로그램인지 한번 더 생각해볼 수 있었다.

## reference 
- [https://jeonghwan-kim.github.io/series/2019/12/30/frontend-dev-env-lint.html](https://jeonghwan-kim.github.io/series/2019/12/30/frontend-dev-env-lint.html) 
- [https://yrnana.dev/post/2021-03-21-prettier-eslint](https://yrnana.dev/post/2021-03-21-prettier-eslint)

## 같이 보기
- [ESLint 조금 더 잘 활용하기](https://tech.kakao.com/2019/12/05/make-better-use-of-eslint/)
