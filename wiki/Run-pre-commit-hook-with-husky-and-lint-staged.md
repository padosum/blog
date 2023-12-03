---
title: husky와 lint-staged를 사용해 pre-commit hook 실행하기
date: 2023-06-24 17:05:04 +0900
updated: 2023-06-24 18:52:56 +0900
aliases: ['husky와 lint-staged를 사용해 pre-commit hook 실행하기 ']
draft: false
---

## Goal

husky와 lint-staged를 사용해 commit 전 스크립트 수행하기

---

프로젝트의 코드를 검증하기 위해 많은 작업을 수행한다.  
lint, 코드 포맷팅, test 등...

로컬에서 개인적으로 작업 후에 배포를 하면 되겠지만 사람인지라 까먹을 수도 있다. 그래서 [[Git-pre-commit-Hooks|pre-commit]]같은 도구를 사용해 커밋 전에 이런 작업들을 수행하는 것이 좋다. 저번에 이 사실을 익혔는데 미리 세팅 해두지 않아 뒤늦게 세팅해야 할 일이 생겼다.

나는 프로젝트에서 commit 전에 다음 작업들을 수행하고 싶었다.

- `prettier`
- `eslint`
- `tsc` (TypeScript 프로젝트이므로 type check를 수행하고 싶었다.)
- `vitest`

## pre-commit

예전에 사용한 [[Git-pre-commit-Hooks|pre-commit]]은 Python등의 언어로 코드를 작성해야 했는데 하려고 하면 할 수 있겠지만 복잡했다. ([참고](https://gist.github.com/posquit0/b6eea4273868f0da707c9719a9ea59ad))

특정 확장자로 된 파일 경로를 찾고, `eslint` 나 필요한 도구들이 설치된 경로를 찾고.. 실행해주고 잘 작동하는지 확인하고...를 직접 작성해야 한다.

어떻게 할지 고민하던 중 husky를 알게되었다. 얘기는 많이 들어봤는데 처음 사용해봤다. 훨씬 간편했다.

## husky

husky는 [모든 Git hooks](https://git-scm.com/docs/githooks)을 제공하는 도구다.

[공식문서](https://typicode.github.io/husky/getting-started.html)를 참고해 간단하게 설치할 수 있다.

`husky` 설치하기

```sh
npm i -D husky
```

Git hooks 활성화

```sh
npx husky install
```

설치 후 자동으로 Git hooks를 활성화하기 위해선 다음 스크립트를 `package.json`에 추가한다. 그러면 이후 팀원들이 `npm install`만 하고 사용할 수 있다.

```json
{
  "scripts": {
    "prepare": "husky install"
  }
}
```

### pre-commit hook 만들기

우선 임시로 잘 작동하는지 확인해보자.

```sh
npx husky add .husky/pre-commit "npm test"
```

`.husky/pre-commit` 파일이 생성되고 내부에 `npm test` 명령어가 작성된 것을 확인할 수 있다.

commit을 하면 그 전에 `npm test`가 수행된다. test가 실패되면 commit도 중단된다.

```sh
git commit -m "Keep calm and commit"
```

### 디렉토리가 다를 때

아주 순조롭다가 문제가 발생했다. 내 프로젝트의 디렉토리 구조는 다음과 같았는데

```
.
├── .git
├── backend
└── frontend
```

나는 husky를 `frontend` 디렉토리에 설치했다.
사실 두 디렉토리 모두 pre-commit을 수행해야 하는 것이 좋을 것 같긴 한데 우선은 `frontend`에서 필요해서 이 상황에서 해결하는 방법을 알고 싶었다.

[공식문서](https://typicode.github.io/husky/guide.html#custom-directory)을 통해 custom directory를 설정하는 방법을 알려주고 있었다. 나의 경우와 같앗다. `package.json` 파일과 `.git` 디렉터리와 다른 레벨에 있는 경우였다.

설계상 `husky install`이 `.git`과 같은 디렉토리에 있어야 실행이 되기 때문에 스크립트 실행시 디렉터리 부모 디렉터리로 이동하면 되는 것이었다.

```json
{
  "scripts": {
    "prepare": "cd .. && husky install frontend/.husky"
  }
}
```

그리고 `frontend` 디렉토리에 `npx husky add .husky/pre-commit "npm test"`를 실행했기 때문에 `frontend/.husky/` 경로에 `pre-commit` 파일이 있었다.
마찬가지로 `frontend` 경로에서 hook이 실행되도록 `cd frontend`를 추가했다.

```
cd frontend
npm test
```

## lint-staged

지금까지 husky를 사용해 commit 전에 해당 스크립트를 실행하는 작업을 했다.

모든 파일이 아닌 staged 파일에 linter를 수행하기 위한 [lint-staged](https://github.com/okonet/lint-staged) 라는 도구가 있다.

설치하기

```sh
npm i --D lint-staged
```

`package.json`에 옵션과 script를 추가한다.

```json
{
  "scripts": {
    "lint-staged": "lint-staged"
  },
  "lint-staged": {}
}
```

`.husky/pre-commit` 파일에 `npm run lint-staged`를 추가한다.

```
npm run lint-staged
```

`*.ts`, `*.tsx` 파일에 대해 작업을 수행하기 위해 옵션을 추가한다.

```json
  "lint-staged": {
    "*.{ts,tsx}": [
      "prettier --write",
      "eslint --fix",
      "tsc-files --noEmit",
      "vitest related --run"
    ]
  },
```

배열엔 수행할 작업들을 추가해주면 된다.

TypeScript 에러를 확인하기 위해 `tsc`를 실행해야 하는데 `--noEmit` 을 추가하면 JavaScript가 생성되지 않는다.

lint-staged가 `tsc` 명령에 staged 파일을 `tsc --noEmit file1.ts file2.ts`로 전달해서 `tsconfig.json`을 무시한다고 한다. ([참고](https://dev.to/samueldjones/run-a-typescript-type-check-in-your-pre-commit-hook-using-lint-staged-husky-30id))

그래서 `tsconfig.json`을 무시하지 않고 파일에 `tsc`를 수행하는 [`tsc files`](https://github.com/gustavopch/tsc-files)라는 도구를 사용했다.

```sh
npm i -D tsc-files
```

vitest도 마찬가지로 관련있는 테스트만 실행되도록 `related`와 `--run` (watch mode가 아니도록!) 을 추가했다. ([참고](https://vitest.dev/guide/cli.html#vitest-related))

## 생각

- 말로만 들었던 husky를 사용해봐서 좋았다.
- 조금 더 옵션을 수정하면 좋을 것들이 보이는데 차차 고쳐나가도록 해야겠다.

## reference

- https://gist.github.com/posquit0/b6eea4273868f0da707c9719a9ea59ad
- https://subicura.com/devops/guide/validate.html#link-staged
- https://typicode.github.io/husky/guide.html#custom-directory
