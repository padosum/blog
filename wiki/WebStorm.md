---
title   : WebStorm 
date    : 2023-09-18 22:46:56 +0900
updated : 2023-09-18 22:50:06 +0900
aliases : 
draft : false
tags : ["How to", "Tools"]
---

## Goal

WebStorm 사용법을 익히자.

## Shortcuts

- 대소문자 변환: <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>U</kbd> 
- 멀티 커서: 옵션 키 두번 연타, 두번 째 옵션 키를 누른 상태에서 커서 이동

## 파일 경로 찾기
- Edit > Copy Path/Reference...

## Errors

###  Cannot connect to already running IDE instance. Exception: Process 2,837 is still running

- [IDE config directory](https://www.jetbrains.com/help/idea/directories-used-by-the-ide-to-store-settings-caches-plugins-and-logs.html?_ga=2.127325707.785042715.1695044950-583682627.1690160436&_gl=1*1k73t31*_ga*NTgzNjgyNjI3LjE2OTAxNjA0MzY.*_ga_9J976DJZ68*MTY5NTA0NDk0OS4zLjEuMTY5NTA0NDk1Ny4wLjAuMA..#config-directory)로 이동해 `.lock` 파일을 삭제하면 된다. 
- [참고](https://intellij-support.jetbrains.com/hc/en-us/community/posts/13541697317906-Error-while-opening-intellij-Cannot-connect-to-already-running-IDE-instance-Exception-Process-2-837-is-still-running-)
