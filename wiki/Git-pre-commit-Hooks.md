---
title   : pre-commit hooks 사용법 
date    : 2022-03-08 12:04:20 +0900
updated : 2022-03-08 12:42:10 +0900
aliases : 
tags    : 
---
## Goal
commit 전에 파일을 체크할 수 있는 pre-commit hooks 사용법을 익힌다.

## pre-commit
pre-commit은 git에서 commit 하기 직전에 실행되는 hook을 말한다.

## pre-commit 설치하기
[pre-commit](https://pre-commit.com/)은 pre-commit hook들을 관리할 수 있는 [[Framework|프레임워크]]인데 설치 방법은 다음과 같다.

```bash
$ pip install pre-commit
```

## pre-commit 설정
`.pre-commit-config.yaml` 파일로 설정이 가능하다. 프로젝트 디렉토리에 다음 명령어로 설정 파일을 추가한다.

```bash
$ pre-commit sample-config > .pre-commit-config.yaml
```

명령어를 실행하고 나면 `sample-config`라는 템플릿으로 만들어진 파일이 생성된다. 다음과 같이 4개의 hook을 확인할 수 있다.

```yaml
# See https://pre-commit.com for more information
# See https://pre-commit.com/hooks.html for more hooks
repos:
- repo: https://github.com/pre-commit/pre-commit-hooks
  rev: v3.2.0
  hooks:
  - id: trailing-whitespace
  - id: end-of-file-fixer
  - id: check-yaml
  - id: check-added-large-files
```

### 다른 hook 사용하기
`pre-commit`에 대해 학습한 이유는 `.md` 파일의 frontmatter를 확인하고 싶어서였다. sample로 제공된 저장소 말고도 다른 hook들은 [Supported hooks](https://pre-commit.com/hooks.html) 페이지에서 확인이 가능하다.

문서가 잘되어 있는 경우가 대부분이다. 다음은 `mdformat`이라는 hook을 설정한 `.pre-commit-config.yaml` 파일의 예시이다.

```yaml
repos:
- repo: https://github.com/executablebooks/mdformat # git 저장소 주소
  rev: 0.7.13 # 버전 
	hooks:
	- id: mdformat # hook id
	  # hook에 전달할 argument
		args: [--check]
	  # plugin 입력 (옵션)
		additional_dependencies:
		- mdformat-frontmatter # 플러그인명
```

## pre-commit 사용하기
다음 명령어를 입력하면  설정 파일에 명시한 hook들이 우선 설치가 된다. 
```bash
$ pre-commit run 
```

`git commit` 명령어를 실행하면 commit이 되기 전에 staged 파일들이 `.pre-commit-config.yaml` 에 설정된 hook을 거치게 된다. 

직접 hook을 실행하기 위해서는 `pre-commit run` 명령어를 다시 입력한다. staged 파일들에 한해 실행된다.
```bash
$ pre-commit run 
$ pre-commit run -a # 전체 파일 실행
$ pre-commit run --files 파일명 # 특정 파일 실행
```

## reference
- https://github.com/pre-commit/pre-commit-hooks/blob/master/README.md
- http://snowdeer.github.io/git/2021/04/27/use-git-pre-commit/
- https://www.daleseo.com/pre-commit/
