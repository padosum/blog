---
title   : Git
date    : 2021-04-23 19:50:26 +0900
updated : 2021-04-23 19:50:32 +0900
aliases : 
private : false
hidden  : false
showReferences : true
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

## 참고
- [https://okky.kr/article/400839](https://okky.kr/article/400839)