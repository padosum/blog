---
title   : pre-commit hook 만들기
date    : 2022-12-03 23:16:03 +0900
updated : 2022-12-18 23:04:39 +0900
aliases : ["pre-commit hook 만들기"]
tags    : ["Git", "How to", "Python"]
draft : false
---

## Goal
[[Git-pre-commit-Hooks|pre-commit hook]]을 직접 만들어보기
Python에 대해 잘 모르기 때문에 최대한 검색해서 구현을 했다. 다 만들고 나서 다른 언어로도 가능하다는 것을 뒤늦게 알았다. 다음에 기회가 된다면 다른 언어로 해봐야겠다...

## 프로젝트 생성하기

hook을 가져올 수 있는 저장소를 하나 만들자. 이름은 `pre-commit-hooks`라고 했다.
```bash
mkdir pre-commit-hooks
cd pre-commit-hooks
git init
```

프로젝트 루트에 `setup.cfg`와 `setup.py`를 추가한다.

그리고 여러 가지 hook이 있을 수 있으니 안에 디렉토리를 따로 생성하자. 나는 commit log를 `.md` 파일에 추가하는 hook을 만들고 싶어서 `print_commits`라고 정했다. 
생성한 `print_commits` 디렉토리에 `__init__.py` 파일과 `main.py`를 생성한다.  

프로젝트 구조는 다음과 같다:
```
pre-commit-hooks
├── README.md
├── print_commits
│   ├── __init__.py
│   └── main.py
├── setup.cfg
└── setup.py
```

- `__init__.py`: 파이썬은 디렉토리에 `__init__.py`가 존재하면 이를 패키지라고 여긴다고 한다.[^1] 외부에서 이 패키지를 참조하는 시점에 해당 패키지의 `__init__.py` 가 실행된다. 
- `main.py`: hook 의 기능이 들어간다.
- `setup.py`: 패키지를 빌드하기 위해 필요하다.
- `setup.cfg`: 패키지에 대한 설명이다. 

정확히는 모르지만, [[NPM]] 같은 것이라 생각하고 넘어갔다.  `setup.cfg`는 `package.json`과 비슷한 것 같고, `setup.py`는 이를 토대로 빌드를 해주는 것 같다.

## 기능 구현하기

기능은 `main.py` 파일 내부에 코드를 작성한다.
[참고]()

> hook이 실패했다면 `0`이 아닌 값으로 종료되거나, 파일이 수정되어야 한다!

## python 패키지로 변환하기

```python
# setup.py
from setuptools import setup

setup()
```

```python
# setup.cfg
[metadata]
name = print-commits
description = print commits
version = 0.1.0
author = padosum
author_email = email
license = MIT
url = 저장소 

[options]
packages = find:
python_requires = >= 3.8.5
install_requires =
    requests>=2.8.1

[options.entry_points]
console_scripts =
    print-commits = print_commits.main:main
```

- `package = find:`: `print_commits` 패키지를 찾아준다. 
- `console_scripts`: hook의 entry point다. `pre-commit`이 `print-commits` 을 실행할 것이다. 
- `python_requires`: 나는 개발하면서 버전 때문에 제대로 동작하지 않는 문제가 있어서 추가해줬다. 
- `install_requires`: 마찬가지로 테스트할 때 `No module named requests` 라는 에러가 떠서 설치할 수 있도록 명시했다.


패키지 설치를 위해선 다음 명령어를 입력하면 된다. (프로젝트 root에서 실행해야 한다! -`setup.py`가 있는 곳)
```bash
pip install . 
```

## hook 으로 변환하기

**그동안 작업한 내용은 commit 해야 한다. 그래야 테스트할 수 있다.**  

pre-commit 프레임워크는 다음 명령어로 설치한다:
```bash
pip install pre-coimmit
```

저장소에는 pre-commit에게 hook이 있다고 알려줘야 하는 파일이 필요하다. 바로 `.pre-commit-hooks.yaml`이다.
```bash
touch .pre-commit-hooks.yaml
```

[공식 문서를 참고](https://pre-commit.com/#creating-new-hooks)해서 필요한 정보를 작성한다.

```yaml
- id: print-commit
  name: print-commit
  description: print commit log
  entry: print-commits
  language: python
  language_version: python3
  files: \.md$
```
- `id`: 말그대로 hook의 id다. hook을 사용할 때 명시해줘야 한다.
- `name`: hook이 실행될 때 보여지는 hook의 이름
- `description`: hook에 대한 설명
- `entry`: hook의 entry point다. 앞서 작성한 `setup.cfg`에 `console_scripts`에 추가된 이름과 같다. 따라서 그곳에 작성된 스크립트가 실행된다.
- `language`: hook이 작성된 언어 이름.
- `laguage_version`: 언어의 버전
- `files`: hook이 실행되는 파일의 패턴을 명시한다.


## 테스트하기
만들어진 hook을 로컬에서 테스트해보자. 우선 hook 프로젝트 외부에 다른 디렉토리를 하나 만든다.  `test-hook`이라고 했다.
```
.
├── pre-commit-hooks
└── test-hook
```

`test-hook` 디렉토리에서 테스트할 파일을 만들자.
```bash
touch test1.md test2.md
```

그리고 해당 디렉토리를 git 저장소로 초기화한다.
```bash
git init
```

그리고 hook을 실행할 파일을 `git add`를 이용해 스테이징 영역에 추가한다.
```bash
git add .
```

hook은 다음 명령으로 테스트할 수 있다:
```bash
pre-commit try-repo ../pre-commit-hooks print-commit
```



## 배포된 hook 사용하기
[[Git-pre-commit-Hooks]]를 참고한다.

## Python과 timezone

hook을 만들면서 python의 문법을 검색하며 공부할 수 있었다. 특히 JavaScript에서 가능한 것들은 키워드만 잘 찾으면 모두 구현할 수 있었다.
다 완성된 줄 알고 사용하다가 문제를 하나 발견했다.

아침에 한 커밋은 기록에 없었다. 이유는 [Github API의 timezone은 UTC](https://docs.github.com/en/rest/overview/resources-in-the-rest-api?apiVersion=2022-11-28)로 되어있어서 로컬 날짜를 기준으로 하니 해당 데이터는 전 날로 되어있어 그런 것이었다.
예를 들면, 2022년 12월 08일 07시 43분에 push 한 기록이 9시간 전인 2022년 12월 07일로 기록되어 있다.
그래서 시간대를 맞춰서 확인해야 햇다.


https://twpower.github.io/29-iso8601-utc-and-python-example
https://spoqa.github.io/2019/02/15/python-timezone.html

## reference
- [https://dev.to/jalvaradosegura/create-your-own-pre-commit-hook-3kh](https://dev.to/jalvaradosegura/create-your-own-pre-commit-hook-3kh)
- [https://pre-commit.com/#creating-new-hooks](https://pre-commit.com/#creating-new-hooks)

[^1]: https://www.holaxprogramming.com/2017/06/28/python-project-structures/
