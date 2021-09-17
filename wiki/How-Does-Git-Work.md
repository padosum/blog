---
title   : Git은 어떤 원리로 동작하는가?
date    : 2021-09-12 13:43:41 +0900
updated : 2021-09-17 10:02:20 +0900
aliases : ["Git은 어떤 원리로 동작하는가?"] 
tags: ["Git"]
---
[[Git]]의 원리를 알기 위해 `.git`의 내부를 살펴보자.
`git init` 명령어를 사용하면 `.git` 디렉토리가 생성된다.
gistory라는 프로그램을 이용하면 `.git` 디렉토리의 내용을 리스트로 보여준다.

## gistory 설치
1. [python](https://www.python.org/downloads/)을 설치한다.
2. `sudo pip3 install gistory`
3. `.git` 디렉토리로 이동 
4. `gistory`를 입력
![Screen Shot 2021-09-12 at 11 13 12 AM](https://user-images.githubusercontent.com/6129764/132972592-8961e4cd-9c88-44b2-8ebd-cda21c9a455e.png)

5. 브라우저에서 `http://0.0.0.0:8805/` 에 접속
![Screen Shot 2021-09-12 at 11 17 44 AM](https://user-images.githubusercontent.com/6129764/132972600-4a12ab98-8e1d-4b6e-80fa-c0ecd50d3802.png)

## git add
파일을 추가한 뒤 gistory 화면을 리로드해도 아무런 변화가 없다.  
하지만 `git add` 명령어로 추가한 파일을 전달하면 다음과 같이 2개의 항목이 추가가된 것을 확인할 수 있다.

![Screen Shot 2021-09-12 at 11 20 52 AM](https://user-images.githubusercontent.com/6129764/132972615-7dbfed8e-c659-4285-859d-fb6d095f8613.png)

추가된 `./objects/....` 디렉토리를 클릭하면 우측에 추가한 파일인 `t1.txt`의 내용이 담겨져있음을 알 수 있다.
![Screen Shot 2021-09-12 at 11 23 15 AM](https://user-images.githubusercontent.com/6129764/132972622-bc8ed74f-533c-48aa-a7b7-421dc433a2ba.png)  
파일의 이름은 gistory가 편의상 보여준 것이고 `./objects` 디렉토리 안에 적혀있지는 않다. 이름은 그 위에 있는 `./index`에 적혀있다.
![Screen Shot 2021-09-12 at 11 26 01 AM](https://user-images.githubusercontent.com/6129764/132972626-09b2e30a-f4e0-47c5-b89d-fd048cb64f2e.png)
즉 파일의 이름은 `./index`에, 파일의 내용은 `./objects`에 담겨있다. 그 디렉토리 안에 담겨있는 파일들을 **객체, Object**라고 한다.

---
파일을 하나 더 추가해본다. 오브젝트가 하나 더 추가가되고, `./index`에도 해당 파일에 대한 정보가 추가된다.
![Screen Shot 2021-09-12 at 11 28 50 AM](https://user-images.githubusercontent.com/6129764/132972631-a7fba6a4-e39f-435e-abb7-6b2e62ed8d92.png)
![Screen Shot 2021-09-12 at 11 28 59 AM](https://user-images.githubusercontent.com/6129764/132972629-078c745b-93b5-462a-8cbd-9dd5e9479c3b.png)

---  
기존의 파일을 복사해본다.  
```bash
$ cp t1.txt t3.txt
```
![Screen Shot 2021-09-12 at 11 31 41 AM](https://user-images.githubusercontent.com/6129764/132972637-cfc2aef7-a548-43e9-872e-7da5d04f2a25.png)

![Screen Shot 2021-09-12 at 11 31 48 AM](https://user-images.githubusercontent.com/6129764/132972634-d7a74de1-b3dc-4ca9-b5ee-3081d481ae95.png)
`./index`를 확인해보면 `t1.txt`와 `t3.txt`가 같은 object를 가리키고 있음을 알 수 있다. **git은 파일을 저장할 때 파일의 이름이 달라도 파일의 내용이 같다면 같은 object를 가리킨다.** 

## object의 파일명의 원리
git은 우리가 작업하는 파일의 내용을 SHA1이라는 해시 알고리즘을 통과시켜서 만든 해시값에서 앞 2글자만 떼서 object 디렉토리 안에 디렉토리를 만든다. 그리고 2글자 이후 값을 이름으로 파일을 만들어 내용을 저장한다.  
그래서 어떤 파일에 대해 `git add`를 이용하면, git은 파일의 내용을 압축하고 SHA1이라는 방법으로 해시값을 만들고 그 값에 해당되는 정보를 `./objects` 디렉토리 안에 만들고, 내용을 저장하는 것이다.

## commit의 원리 
`git add` 후,  `git commit`을 하면, 다음과 같이 많은 파일이 생성되었음을 확인할 수 있다.

![Screen Shot 2021-09-12 at 11 54 31 AM](https://user-images.githubusercontent.com/6129764/132972653-9dc4af47-b505-4d8e-9aa2-6beebf509c39.png)  
`./objects` 디렉토리 내부의 파일 중 하나에 commit에 대한 정보가 담겨져있다.
![Screen Shot 2021-09-12 at 11 55 21 AM](https://user-images.githubusercontent.com/6129764/132972651-f36911e6-58ab-4131-af60-37ac3e66be77.png)  
commit 또한 `.git` 디렉토리 안에 저장된다. 즉 commit도 Object이다. `tree`에는 Object 정보가 담겨있다. 해당 버전에 해당되는 파일의 이름과 내용이 연결되어있다.  
![Screen Shot 2021-09-12 at 12 01 04 PM](https://user-images.githubusercontent.com/6129764/132972650-9c1780e6-bd23-422c-80ac-4a6bed4b92d2.png)

---
파일을 새로 수정하고, 다시 commit을 하고 그 commit object를 살펴보면 이전에 없었던 `parent`가 추가된 것을 확인할 수 있다. `parent`에는 이전 commit이 연결되어 있다.
![Screen Shot 2021-09-12 at 12 02 47 PM](https://user-images.githubusercontent.com/6129764/132972665-ba8c9dd9-93e4-4eaf-ae2c-81b0c48984c2.png)
![Screen Shot 2021-09-12 at 12 04 20 PM](https://user-images.githubusercontent.com/6129764/132972664-e693e73b-abde-48f0-a7d5-bcf246a36d33.png)

---
commit에는 이전 commit이 어떤 것인지 확인하는 `parent`와 그 commit이 일어난 시점의 파일 이름과 내용 사이의 정보가 `tree`에 담겨있다. 
각각의 버전은 서로 다른 `tree`가 담겨 있고, `tree`에는 파일 내용과 파일 이름이 담겨 있어 버전의 `tree`를 이용해 버전이 만들어진 시점의 상태를 얻어낼 수 있는 것이다. 각각의 버전이 만들어진 스냅샷을 `tree`라는 구조에 담는 것이다.

---
디렉토리를 추가해 동일한 파일을 copy하면 내용이 같기 때문에, `./index`에서 같은 Object를 가리키고 있다.
```bash
$ cp t1.txt d1/t1.txt
```
![Screen Shot 2021-09-12 at 12 11 08 PM](https://user-images.githubusercontent.com/6129764/132972672-6ad2dde9-f739-4042-9c9c-89024d89d0e1.png)

---
`./objects` 디렉토리 안의 Object 파일들은 크게 3가지 중 하나다. 하나는 파일의 내용을 담은 `blob`,  디렉토리의 파일의 이름과 내용(`blob`)을 담은 `tree`, 그리고 `commit`

## status의 원리
현재 가장 최신 commit과 `./index`를 비교하면 commit할 것이 있는지 없는지 확인할 수 있다.  

`./index`에 있는 값과 현재 파일의 내용이 만들어내는 값이 다르다면, 해당 파일이 수정되었다는 것을 알 수 있다. 변경된 파일을 `git add`로 commit 대상에 포함시키면, git은 `./index`의 내용과 commit 대상에 포함시킨 파일이 같으니, commit 대기 상태임을 알 수 있다. 
그리고 git은 `./index`의 내용과 가장 최신 commit의 tree가 가리키는 내용이 다른 것을 확인해 commit 대기 상태인 것을 알 수 있다.

## branch 
소프트웨어 개발 프로젝트를 진행하면 개발자들이 동일한 소스코드를 작업을 하는데, 각각 작업을 하다보면 서로 다른 버전의 코드가 만들어진다. 이럴때 동시에 작업을 진행할 수 있게 해주는 기능이 브랜치(Branch)이다. 분리된 작업 영역에서 작업을 하고 나중에 원래의 버전과 비교해 하나의 버전을 만들 수도 있다. 
각각의 브랜치는 다른 브랜치의 영향을 받지 않아 여러 작업을 동시에 할 수 있다. 또 병합(Merge)해서 하나의 브랜치로 합칠 수도 있다.  

## Head 
`git init` 후 `./HEAD`라는 파일을 살펴보면 다음과 같다. `refs/heads/master`라는 파일을 가리키는데 아직 그 파일은 없다.
![Screen Shot 2021-09-12 at 1 05 44 PM](https://user-images.githubusercontent.com/6129764/132972683-28003307-f57b-47be-af45-ed9d90f44008.png)  
파일을 하나 commit 하고 나면 `ref/heads/master`라는 파일이 생성되어 있다. commit한 내용이 담겨져있다.
![Screen Shot 2021-09-12 at 1 07 23 PM](https://user-images.githubusercontent.com/6129764/132972682-41b13fcb-3f92-4449-9cda-a9081f4cc088.png)  
한번 더 수정 후 commit하면 `refs/heads/master`에 방금 commit한 내용이 담겨져있다. 가장 최신 commit이 들어가는 것을 확인할 수 있다.
![Screen Shot 2021-09-12 at 1 10 01 PM](https://user-images.githubusercontent.com/6129764/132972681-0903e823-28ed-4827-b1e5-9b13c7b076c3.png)

`git log`를 입력하면 `HEAD` 파일을 통해 가장 최신 commit을 알게되고 그 commit 의 parent를 통해 이전 commit을 탐색할 수 있는 것이다.
![Screen Shot 2021-09-12 at 1 11 34 PM](https://user-images.githubusercontent.com/6129764/132972679-16e64d50-fe86-494a-9e89-63966f53e8de.png)

---
branch를 하나 추가해보고 gistory를 확인해보면 `refs/heads/exp`가 생성되고 이 파일은 master 브랜치처럼 최신 commit을 가지고 있다. 
```bash
$ git branch exp
```
![Screen Shot 2021-09-12 at 1 13 53 PM](https://user-images.githubusercontent.com/6129764/132972705-d1526971-0ef0-4f7d-967e-c91efb033bc9.png)  
git에서 branch라는 것은 `.git` 내부의 파일인 것이다.  
다음과 같이 branch 이동하면 `./HEAD` 파일이 `refs/heads/exp`를 가리키게 된다.
```bash
$ git checkout exp
```
![Screen Shot 2021-09-12 at 1 18 02 PM](https://user-images.githubusercontent.com/6129764/132972704-acd009e2-7790-4c60-8178-863789711c52.png)
결국 **Head라는 것은 현재 checkout한 최신 commit을 가리키는 것이다.**

---
- `reset`: `refs/heads/브랜치명` 파일의 commit id를 변경한다.

## Tag 
Tag는 Branch와 비슷한듯 다르다. 
Release 라는 것은 사용자에게 제공되는 의미있는 버전을 말한다. 해당 버전이 어떤 commit인지 확인할 필요가 있다. 그때 사용하는 것이 Tag이다. 
```bash
$ git tag 1.0.0 master
$ git tag
```
![Screen Shot 2021-09-12 at 1 30 01 PM](https://user-images.githubusercontent.com/6129764/132972701-ef611eb2-2efc-46d7-97a6-229a37879a0e.png)
Tag의 종류는 2가지 이다. 이름만 붙이는 일반 태그(Lightweight tag)와 주석 태그(Annotated tag)이다.  

### Tag 명령어
#### 태그 목록 보기
`git tag`
#### 태그 생성 (light weight tag)
`git tag "태그 이름" [태그가 가르킬 버전의 커밋 아이디]`

#### 태그 생성 (annotated tag)
`git tag -a "태그 이름" -m "태그에 대한 설명" [태그가 가르킬 버전의 커밋 아이디]`

#### 태그 삭제
`git tag -d "삭제할 태그명"`

#### 태그 원격 저장소로 업로드
`git push --tags`

## reference
- [생활코딩 - 지옥에서 온 Git](https://opentutorials.org/course/2708)
- [누구나 쉽게 이해할 수 있는 Git 입문](https://backlog.com/git-tutorial/kr/intro/intro1_4.html)
