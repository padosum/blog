---
title   : Git
date    : 2021-04-23 19:50:26 +0900
updated : 2021-09-28 21:29:53 +0900
aliases : 
tags: ["Git"]
---
[[Version-Control|버전 관리]]를 위한 소프트웨어  

## 특징 
- 무료, 오픈소스 
- 개개 파일(텍스트 외에 바이너리까지)별 생성 및 파일명 변경, 이동, 내용 추가 및 삭제에 대한 모든 이력을 효율적으로 보관
- 생성되는 버전(Commit)별로 작성자 및 변경 사항을 기록할 수 있음
- 원격 저장소 및 서버를 두면 쉽게 협업할 수 있음
- 소스코드 충돌(Conflict)시 가능한 경우 자동으로 취합(Merge) 할 수 있음
- 버전을 분기(Branch)하여 충돌을 줄이면서 짜임새있고 장기적인 소프트웨어 개발 계획을 수립할 수 있음

## 설치 
- [https://git-scm.com/downloads](https://git-scm.com/downloads)

## 저장소  
- Git을 이용하면 특정 디렉토리를 기준으로 저장소(Repository)를 생성할 수 있다. 
- 저장소는 루트 디렉토리(Top Level Directory) 하부에 `.git` 디렉토리를 생성하고, 루트 디렉토리에 생성되는 모든 파일에 대한 버전별 스냅샷(Snapshot; 특정 시점의 모든 데이터)을 `.git` 디렉토리에 저장하게 된다. 

## [[How-Does-Git-Work|Git은 어떤 원리로 동작하는가?]]

###  git init 
```bash
mkdir git-test
cd git-test 
git init 
```

## 작업 디렉토리(Working Directory)
- 현재 편집중인 소스코드 및 리소스가 존재하는 디렉토리(작업 디렉토리)에서 프로젝트의 이력을 저장소에 반영하는 매커니즘 
	- 작업 디렉토리 내의 모든 파일은 4가지 상태를 갖는다. 
		- Untracked: 저장소에 이력을 추가하지 않은 파일, 저장소에 추가(`git add`)되면 다음 세 가지 상태를 오가게 된다. 
		- Unmodified
		- Modified: 마지막 버전(스냅샷)에서 변경된 파일, `git add`를 통해 **Staged** 상태로 변경 가능 
		- Staged: 새로운 버전에 반영될 준비가 되었다는 의미
			- `git commit -m '메세지'`를 통해 마지막 버전에 Staged 파일들을 반영해 새로운 버전을 생성하게 된다. 새로운 버전이 생성된 이후 파일은 다시 Unmodified 상태로 돌아간다. 
- 외부적인 요인으로 파일이 삭제된 경우에는 Git은 파일을 Modified 상태로 추적  

## .gitignore 
- DB 설정 파일이나, `node_modules` 같은 의존 패키지 등 **저장소의 스냅샷에 포함하고 싶지 않은 파일**이 있을 수 있음 
- 해당 파일들을 애초에 tracking하지 않도록 하는 설정파일
- 루트 디렉토리(혹은 하위 폴더)에 .gitignore 텍스트 파일을 작성하면된다.  
- [https://git-scm.com/docs/gitignore](https://git-scm.com/docs/gitignore) 참고 

## 명령어 정리  

- `git init`
    - 해당 디렉토리의 [[Version-Control|버전 관리]]를 시작한다는 의미
- `git status`
    - [[Version-Control|버전 관리]]가 되고 있는 디렉토리의 상태를 보여준다.
- `git add 파일명`
    - `git add .` : 현재 디렉토리의 모든 변경사항을 staging area로 옮긴다.
- `git rm --cached <file>`
    - 해당 파일을 staging area에서 제외
- `git commit -m "commit message`
    - commit message: 나중에 커밋을 봤을 때 왜 커밋했는지 확인할 수 있다.
    - 길고 상세한 commit message는 `git commit` 만 입력 후 commit message 창으로 이동하여 작성한다.
- `git commit -am "commit message`
    - `add` 와 `commit`  동시에 하기, 한번이라도 commit을 한 대상만 가능하다.
- `git commit -sm "commit message"`
	- `-s` 옵션 포함시 라이센스 서명을 의미하는 Signed-off-by 내용을 commit message 안에 포함한다.  
	- CLA를 사용하기도 한다.  
- `git commit --amend`최신 commit 수정  

- `git log`
    - commit 내역 확인
    - [https://stackoverflow.com/questions/9483757/how-to-exit-git-log-or-git-diff](https://stackoverflow.com/questions/9483757/how-to-exit-git-log-or-git-diff)
    - [https://velog.io/@nmy0502/git-commit-err-vi](https://velog.io/@nmy0502/git-commit-err-vi)
- `git shortlog -sn | nl`  
	- commit 내역, `-s`는 개발자별 commit 수, `-nl`은 line number를 표시한다.  
  - 누가 해당 프로젝트에 많이 기여했는가를 간단하게 볼 수 있다.  
- `git log --oneline | wc -l`  
	- 전체 커밋 수 세기
	- `wc -l`은 파일 라인수  
  - 특정 폴더에서? 
		- `git log --oneline -- 폴더명`
- `git log --oneline --no-merges`  
	- merge commit 제외하고 조회  
- `git log -p`
  - commit 내역 상세 조회  
- `git log --oneline --after=2021-07-23 --before=2021-08-08`  
	- 특정 날짜 기준 커밋 내역 조회  
  - inclusive 
- `git log --reverse` 
	- 과거순 조회  
- `git log -n 5`  
	- 특정 개수만 조회
- `git show <commit id>`  
	- commit 정보 조회
- `git show <commit id> | grep "diff --git"`: commit에서 수정한 파일 확인  
- `git push`
    - 원격 저장소로 local 저장소의 변경 사항을 반영
- `git stash`
	- 수정한 내용 임시 저장 
- `git stash pop`
	- 임시 저장한 내용 복구  
- `git checkout -- <파일명>`  
	- 수정한 내용 원래대로 복구  
	- `checkout` 은 브랜치 변경시에도 사용. 도서관에서 책을 받는 것과 같은 의미. 저장소 디렉토리에 있는  `.git` 폴더에서 히스토리를 관리. `.git`에서 특정 히스토리를 꺼내는 것  


### `git config`
- GitHub ID/PW 캐싱 데이터 삭제하기 
```bash
$ git config --global --unset credential.helper  
$ git config --system --unset credential.helper
```  
- user email, name 설정 
```bash
$ git config --global user.email "e-mail"
$ git config --global user.name "author"
```
- 확인하기: `git config -l`  
- 커밋 메시지 기본 편집기 설정 
```bash
$ git config --global core.editor vim 
```

### 되돌리기 
- `git reset`
  - `git reset --hard HEAD^` : 수정한 것까지 통째로 되돌리기
  - `git reset --mixed HEAD^` : add한 것까지 되돌리기
  - `git reset --soft HEAD^`: commit한 것만 되돌리기
  - `HEAD^`의 의미
      - `HEAD`: 가장 최근 버전에서
      - `^`: 하나 되돌리기
      - ex) `git reset --hard HEAD^^`: 가장 최신 버전에서 2개 버전 이전으로 되돌리기
      
- `git revert`
  - `git revert <돌아가고 싶은 commit>`
  - `git reset`과의 차이
      - `git reset`은 되돌린 버전 이후 버전이 모두 사라지지만 `git revert` 는 되돌린 버전 이후 버전은 유지되고 revert 되었다는 사실을 담은 commit을 새로 추가하는 것
          - 하지만 `revert` 에 `-n` 옵션을 붙이면 commit이 남지 않을 수 있다.

### 수정 내역 되감기  
- `git rebase -i --root`
	- 되감고 싶은 부분의 commit `pick`글자를 `edit`으로 수정  
- `git rebase --abort` 되감기 취소 
- `git rebase --continue` 되감았던 것 풀기  

### branch 
  - `git branch <브랜치명>` 브랜치 생성
  - `git branch` 현재 branch 목록 조회
  - `git checkout <브랜치명>` 해당 브랜치로 변경
  - 브랜치 병합(합치기)
      - 어느 쪽이 병합의 대상인지 잘 생각해야한다.
      1. **병합의 결과**가 되는 대상에 checkout
      2. `git merge <병합할 브랜치명>`
- `git branch -D <브랜치명>` 브랜치 삭제 
### 비교하기
- 변경 내역 비교 명령어
- 커밋 간의 비교
    - `git diff 비교대상commit 기준commit`
- 원격 저장소와 로컬 저장소 간의 비교
    - `git diff <비교 대상 브랜치명> origin(원격저장소 단축이름)/<branch명>`
- 이전 commit과 그 전 commit 비교
    - `git diff HEAD HEAD^`
- 이전 commit과 현재 수정된 내용 비교
    - `git diff HEAD`
- 브랜치 간 비교
    - `git diff <비교대상 branch 명> <기준 branch 명>`


### 원격 저장소와 협업하기 
- 원격 저장소 추가하기
    - `git remote add <원격 저장소 단축이름> <url>`
        - `<url>`에 있는 원격저장소를 원격 저장소 단축이름으로 추가
- `git remote` : 원격 저장소 조회
- `git push -u origin master`
    - 내 repository의 master branch를 origin(원격 저장소)의 repository로 push
    - `-u`  옵션을 사용하면 다음 명령어 사용시 `origin과 master 가 기본적으로 상호작용한다.`
- `git pull (origin master)`
    - origin을 내 repository master branch로 병합하기
- `git fetch (origin matser)`
    - origin을 내 repository master branch로 가져오지만 병합하지는 않는다.
- `git clone <url>`
    - 원격 저장소 내용을 현재 디렉토리로 복사
- `git rm <원격 저장소명>`
    - 원격 저장소 삭제

- 로컬 저장소와 원격 저장소가 충돌이 난 경우
    - `git fetch origin` 으로 확인
        - `fetch` 된 내용은 `<원격 저장소명>/<확인하려는branch>` 에서 확인 가능하다.
            - ex) `git checkout origin/master`
            - `git checkout FETCH_HEAD` 에서도 확인 가능

### 원격 저장소와 로컬 저장소의 충돌시 
#### pull request
- 원격 저장소에 내 commit을 pull 해달라고 요청하는 것
- 원격 저장소 관리자가 승인하면 merge 된다.
- github에서 pull request 보내는 법
    1. 원격 저장소 fork
    2. fork된 저장소 clone
    3. 새 branch 만들기 
    4. 수정 후 add, commit, 새로 만든 branch에 push 
    5. pull request 보내기 
    6. 해당 branch 삭제

#### merge 에 대하여
- 3-way merge
    - 두 branch의 최신 커밋과 공통된 조상으로 병합의 결과를 판단
    - merge된 결과인 merge commit이 새로 생기게 된다.
        - 이것이 반복된다면... history 관리가 어려워짐 (어떤 branch가 어디서 나왔고...)
#### rebase
- 현재 내가 작업하고 있는 branch의 base를 옮기는 방법
    - base = 현재 내가 작업하고 있는 branch와 합치려는 branch의 공통된 조상 commit
- 병합하고자 하는 branch의 최신 commit으로 base를 옮기는 것이다.
    - merge commit이 생기지 않기 때문에 history 관리가 용이하다.
- 방법
    1. base를 바꾸고자 하는 branch로 checkout 
    2. `git rebase <base가 될 브랜치명>`

## blame  
- 해당 소스라인에 대해 누가 마지막으로 수정했는지 commit ID 추적을 할 수 있다.
- 소스코드 리딩 시 유용  

## reference
- [https://okky.kr/article/400839](https://okky.kr/article/400839)
