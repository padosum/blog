---
title   : find 명령어
date    : 2022-10-27 15:09:27 +0900
updated : 2022-10-27 15:39:04 +0900
aliases : ["find 명령어"]
tags: ["Tools"]
draft : false
---

- 파일 및 디렉토리를 검색할 때 사용하는 명령어

## example

```bash
$ find . -name [FILE] #현재 디렉토리 아래 모든 파일 및 하위 디렉토리에서 파일 검색

$ find . -name "STR*" #파일 이름이 특정 문자열로 시작하는 파일 검색

$ find . -name "*STR*" #파일 이름에 특정 문자열이 포함된 파일 검색

$ find . -name "*STR" #파일 이름이 특정 문자열로 끝나는 파일 검색

$ find . ! -name "*STR*" #파일 이름에 특정 문자열이 포함되지 않는 파일 검색
```
