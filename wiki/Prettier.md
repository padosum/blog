---
title   : Prettier
date    : 2021-06-13 22:19:06 +0900
updated : 2022-12-18 23:04:25 +0900
aliases : 
tags: ["Tools"]
---
**Prettier, 프리티어**
- 코드를 일관적인 스타일로 다듬어준다.  
  
## Prettier 설치  
```bash
npm i -D prettier 
```

## 설정 파일 생성
```sh
echo {}> .prettierrc.json
```

특정 파일에는 작동하지 않도록 하기 위해선 `.prettierignore`를 추가한다.
```
# 무시할 것들을 추가한다.
build
coverage
```

하지만 `.gitignore`와 `.eslintignore`가 있는 경우, 그것을 기반으로 작동한다.

## Prettier 사용 
```bash
npx prettier app.js --write
```
- `--write` 옵션은 파일을 재작성, 옵션이 없으면 결과를 터미널에 출력 


## VSCode와 연동하기

VSCode의 기본 포맷터로 사용하기 위해 [Extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) 을 설치한다.

`settings.json`을 수정한다. 다음과 같이 수정하면 기본 포맷터가 prettier로 설정되고 `formatOnSave`를 `true`로 하면 코드를 저장할 때마다 설정파일에 맞게 코드가 업데이트된다.
```json
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
```