---
title   : Github Actions과 함께 Vercel 사용하기
date    : 2022-10-04 16:24:58 +0900
updated : 2022-10-05 23:27:30 +0900
aliases : ["Github Actions을 사용해 Vercel 배포하기"]
tags: ["How to", "Vercel", "CI/CD", "Git"]
draft : false
---

## Goal
- Github Actions과 함께 Vercel 사용하기
- 배포 후 `git log --pretty=format:a%aI` , commit 날짜 명령이 먹히지 않는 문제 해결하기


## 문제
개인 위키를 사용하면서 한 gatsby 테마를 이용해 배포해서 사용 중이었다. 그런데 문제가 하나 있었다. 바로 화면에 표시되는 문서의 최근 수정 일자, 즉 `lastUpdated` 변수가 매번 항상 배포하는 시각으로 나오는 것이었다. 

해당 테마를 사용하던 초창기에는 이 문제에 대해 인식하지 못했다. 그러다가 이번 여름에 알고 나니 상당히 거슬리는 것이다. 그래서 값을 가져오는 코드를 확인해봤다.
```js
const gitAuthorTime = execSync(`git log -1 --pretty=format:%aI "${node.fileAbsolutePath}"`).toString();
```

위와 같은 코드가 있었다. `node.fileAbsolutePath`는 해당 문서 파일의 경로고, 변수명이 `gitAuthorTime`이라고 되어있다. 
여기서 `git log -1 --pretty=format:%aI` 라는 명령어가 사용되어 있는데 풀어서 확인해보면  
- `git log`: commit log를 보여준다.
- `-1`: 출력할 commit 수, 즉 1이니 제일 최신 commit
- `pretty=format`: commit log를 주어진 포맷으로 출력하기
- `%aI`: author date를 strict ISO 8601 format 로

확인 결과 해당 파일의 가장 최신 commit 내역의 날짜를 구하는 것이다. 
여기서 author date란 무엇일까?

### author date vs commit date
[git log 문서](https://git-scm.com/docs/git-log) 를 확인하니 **author date**가 있고 **commit date** 가 있었다. 왜 개발자가 author date를 사용했는지 궁금했다. 내 느낌상 이름 그대로 commit한 날짜는 commit date 여야할 것 같았다.

[이 stackoverflow 답변](https://stackoverflow.com/questions/11856983/why-is-git-authordate-different-from-commitdate) 을 읽어봤다. **author date**의 경우 해당 commit이 처음 작성된 날짜를 기록하는 것이고, **commit date** 의 경우  해당 commit이 수정될 때마다 변경된다고 한다. 여기서 새로운 걸 하나 배우게 되었다! 😄

배포를 하면 해당 날짜가 배포시의 날짜로 보여지니, 배포과정에서 뭔가 문제가 있어보였다.   


### vercel과 `git log`
구글링을 했더니 vercel repo에 build 과정 중에 `git log`를 사용할 수 없냐는 [질문이 있었다.](https://github.com/vercel/vercel/discussions/4101)  

답변은 현재  `.git` 디렉토리가 배포되지 않기 때문에 사용할 수 없다였다.

어떻게 하면 좋을까? 고민을 해봤다.  

우선 현재 내 wiki의 github repo는 vercel에 연동되어서 branch에 push될 때마다 자동으로 배포되고 있다.

처음 아이디어는 이 연동된 메커니즘을 통해서 배포하지 말고 내 로컬에서 직접해보자 였다. 내 로컬에서 build를 하면 로컬에서 `git log`를 실행해서 최신 수정 날짜를 가져온다. 그리고 build 결과물을 배포하면 된다.  
결과는 성공적이었다! 하지만 기쁘지 않았다. 자동배포로 하고 싶었는데...

또 고민을 해보고, Github Actions를 이용해 배포하는 것은 뭔가 다를까 해서 시도해봤다.

## GitHub Actions
[공식문서](https://vercel.com/guides/how-can-i-use-github-actions-with-vercel) 를 참고해 정리했다.

### 설정하기
Vercel을 통해 Preview 배포와 Production 배포를 할 수 있다. GItHub Actions와 함께 사용하면 [[CI-CD|CI/CD]] 파이프라인을 제어할 수 있다. 해보자.

### Preview Deployment
Preview 배포를 위해 프로젝트에 `.github/workflows/preview.yaml` 파일을 추가하자!
```yaml
name: GitHub Actions Vercel Preview Deployment
env:
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
on:
  push:
    branches-ignore:
      - main
jobs:
  Deploy-Preview:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install Vercel CLI
        run: npm install --global vercel@latest
      - name: Pull Vercel Environment Information
        run: vercel pull --yes --environment=preview --token=${{ secrets.VERCEL_TOKEN }}
      - name: Build Project Artifacts
        run: vercel build --token=${{ secrets.VERCEL_TOKEN }}
      - name: Deploy Project Artifacts to Vercel
        run: vercel deploy --prebuilt --token=${{ secrets.VERCEL_TOKEN }}
```
위 코드는 Vercel 공식문서에서 알려주는 예시 코드다.  
- `on.push.`: 저장소에 `push` 이벤트를 사용할 때 특정 분기 또는 태그에서 실행되도록 workflow를 구성한다.
	- 여기서는 `branches-ignore`에 `main`이 추가되었는데, 저장소에 `push`가 발생했을 때 이 workflow를 실행한다. 단, `main` 브랜치에 `push`된 경우는 제외한다. 
	- 공식문서에 따르면 **Preview(미리보기)**이므로, `main` 브랜치가 아닌 다른 branch에서 배포를 확인하고 마음에 들지 않으면 rollback하기 위함이다.
- `jobs`: workflow 실행은 하나 이상의 `jobs`로 구성된다.
- `runs-on`: 각 작업은 `runs-on`에 명시된 환경에서 실행된다. 여기선 `ubuntu-latest`
- `steps`: job은 `steps`라는 일련의 작업이 포함된다. 명령을 실행하거나 설정 작업을 실행하는 등 repo에서 작업을 실행할 수 있다.
	- 여기서 배포를 위해 다음 작업을 실행한다.
		- Vercel CLI 설치: `npm install --global vercel@latest`
		- Vercel cloud에서 환경 변수, 프로젝트 설정 가져오기: `vercel pull --yes --environment=preview`
		- build: `vercel build`
		- build 결과물을 vercel에 배포하기: `vercel deploy --prebuilt`

`vercel build`를 사용하면 Vercel이 프론트엔드 [[Framework]]를 자동으로 감지해 `.vercel/output` 폴더를 생성한다.  

`vercel deploy --prebuilt`는 Vercel에서 build 단계를 건너뛰고 이전에 생성된 `.vercel/output` 폴더를 업로드한다. 

### Production Deployment
`.github/workflows/production.yaml` 파일을 추가하자.  
```yaml
name: GitHub Actions Vercel Production Deployment
env:
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
on:
  push:
    branches:
      - main
jobs:
  Deploy-Production:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install Vercel CLI
        run: npm install --global vercel@latest
      - name: Pull Vercel Environment Information
        run: vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}
      - name: Build Project Artifacts
        run: vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}
      - name: Deploy Project Artifacts to Vercel
        run: vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }}
```
production 배포는 preview 배포의 차이점은 branch다.  
preview는 앞서 설명한대로 `main`  브랜치를 제외시켰다.  보통 개발을 할 때 branch를 따로 만들어 작업을 한 후, pull request를 새로 만든 다음에 작업이 정상적으로 완료되면 `main` 브랜치로 `merge`한다. 따라서 이 workflow는 `branches`에 `main`이 적혀있다. 즉 pr이 merge된 경우에만 production 배포를 하는 것이다.

`vercel pull`에도 production에 대한 환경 변수와 프로젝트 세팅을 가져와야 하므로  `--environment=production`을 추가한다.  
그 다음 `vercel build` 명령어도 `--prod` 옵션을 넣어서 production 환경 변수를 가져오도록 한다.
`vercel deploy --prebuilt --prod` 명령어도 `--prod`를 추가하면 Vercel의 프로젝트 대시보드에 지정된 프로덕션 도메인에 대한 배포를 생성할 수 있다.

자, 이제 끝이 보인다. workflow에 존재하는 변수들이 필요하다.  
1. 먼저 Vercel Access Token을 가져오자. 
[Settings > Tokens](https://vercel.com/account/tokens) 에 접속해서  `Create` 버튼을 클릭해 token을 생성하고 복사해둔다.
2. [Vercel CLI](https://vercel.com/docs/cli)를 설치한다. 
	1. `npm i -g vercel`
3. `vercel login`을 실행한다.
4. 프로젝트 디렉토리에서 `vercel link`를 실행해 Vercel Project를 만든다.
5. 4번 과정으로 만들어진 `.vercel` 디렉토리 내부에 있는 `project.json`에서 `projectId`, `orgId`를 확인할 수 있다.
6. Github 저장소 > Settings > Secrets > Actions에 각 값을 이전 과정에서 가져온 값으로 추가한다.
	- `VERCEL_ORG_ID`: `.vercel > project.json`에서 `orgId`
	- `VERCEL_PROJECT_ID`: `.vercel > project.json`에서 `projectId`
	- `VERCEL_TOKEN`: Vercel Access Token 값

이제 저장소에 `push`하니 Github Actions에 저장된 workflow가 잘 작동하는 것을 확인할 수 있었다. 하지만 문제는 여전했다. 

답답해서 검색을 더 해봤더니 [checkout action은 shallow clone을 한다.](https://stackoverflow.com/questions/60868897/git-log-dates-incorrect-in-a-github-action) 는 것을 알게되었다. checkout action? shallow clone?? 어디선가 들어봤지만 뭔지 명확하게 모르는 상태였다.

우선 vercel의 예시 workflow 코드를 살펴보니 `uses: actions/checkout@v2`가 있었다. 이게 checkout action으로 보였다.
일단 `uses`의 경우 어떤 action을 사용할지 지정하는 것이라고 한다. 즉 이미 만들어져서 Github marketplace에 등록된 action을 사용할 수 있다. 
저장소의 코드를 workflow가 실행되는 환경으로 가져와야 하므로 `actions/checkout`을 사용해 코드를 내려받는 것이다. 
여기서 checkout action이 shallow clone을 한다는 것의 의미는 다음과 같았다.
> 엄청나게 큰 저장소를 clone하는 작업은 전송해야 할 데이터가 많아 시간이 오래걸리거나, 심지어는 중간에 실패하는 경우가 생기기도 한다. 해당 프로젝트의 history 전체가 필요한 경우가 아니라면 shallow clone을 하는 것이 좋은 선택일 수 있다. [출처](https://nochoco-lee.tistory.com/200)

[checkout aciton](https://github.com/actions/checkout) 은 마지막 하나의 커밋만 가져온다.  
내 저장소로 테스트를 해봤다.  
```bash
$ git clone --depth=1 https://github.com/padosum/blog.git
```

그리고 `git log`를 사용하니 가장 마지막 커밋만 확인할 수 있었다.  
그러니 `git log --pretty`로 파일경로를 명시해봐도 마지막 커밋 하나뿐이니 그 커밋의 author date가 나올 수 밖에 없다. 

파일경로와 일치하는 파일이 어떻게 생겼는지 설명하기에 충분한 커밋만을 표시하는데 커밋이 하나뿐이기 때문이다...

checkout action 저장소 README 내용처럼 아래와 같이 `fetch-depth`를 `0`으로 설정해주면 모든 히스토리를 가져온다.
```yaml
- uses: actions/checkout@v3
  with:
    fetch-depth: 0
```


## 생각
gatsby 테마에 원하는 기능이 제대로 나오지 않는 문제 덕분에 git에 대해 이것 저것을 학습할 수 있었다.  
- `git log`의 `--pretty` 옵션
- Github Actions workflow 문법에 대해 약간.
- git의 shallow clone

Vercel에서 이것에 대해 당연히 명시해주지 않았을까 하고 공식문서를 찾아봤는데 역시나 [얘기해주고 있었다.](https://vercel.com/docs/concepts/deployments/configure-a-build)  Vercel에서는 프로젝트 빌드를 위해 저장소를 "shallow clone"하고 있다고... [다른 곳](https://github.com/vercel/vercel/discussions/5737)에서도 설명이 있었다.  
문제를 해결하고 난 뒤 해당 테마의 저장소로 가서 예시 저장소가 배포를 어떤식으로 하는지 봤다. 사실 예전에도 배포를 어떻게 하는진 봤었는데 Github Actions을 사용하고 있었다. 하지만 난 Vercel로 하잖아?하고 넘어가기만 했었다. 그런데 다시 workflow를 확인하니 `fetch-depth: 0` 을 사용하는 걸 봤다... 알려주고 있었는데 몰랐다.

그동안 살면서 공식문서의 중요성을 참 많이 느꼈는데 이상하게 해당 문제에 대해 바로 바로 찾아내는 건 쉽지 않은 것 같다. 왜냐하면 문제의 원인을 명확하게 파악하지 못했기 때문이다. 어쨌든 돌고 돌아 만나게 되어 기쁘다. 🥹 


## 참고
- [git-scm.com - git log](https://git-scm.com/docs/git-log)
- [How can I use Github Actions with Vercel](https://vercel.com/guides/how-can-i-use-github-actions-with-vercel)