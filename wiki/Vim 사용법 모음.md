---
title   : Vim 사용법 모음 
date    : 2022-12-04 10:35:20 +0900
updated : 2022-12-04 11:00:46 +0900
tags : ["Vim", "How to"] 
draft : false
description: "기록하고 익숙해지도록 한다."
---

## 줄 마지막 커서로 이동해 입력하기
`A`

## 커서 이동
- `$`: 줄의 마지막으로 이동
- `0`: 줄의 처음으로 이동
- <kbd>Shift</kbd> + `g`: 맨 아래로 이동
- `gg`: 맨 위로 이동
- `k`, `j`, `h`, `l`: 상, 하, 좌, 우 이동
  - 원하는 줄 번호로 이동하는 것은 번호 입력 + `j` or `k`
- 단어 단위로 이동하기
  - `w`: 단어의 시작 위치로 (forward)
  - `e`: 단어의 마지막 위치로 (forward)
  - `b`: 단어의 시작 위치로 (backward)
  - `ge`: 단어의 마지막 위치로 (backward)

## 편집
- `y`: 줄 복사하기
- `p`: 복사된 내용 붙이기
- `dd`: 줄 삭제하기
- `u`: 되돌리기

## 세로줄 편집

- 특정 문자열 지우기
  - 수정하고 싶은 위치에서 <kbd>Ctrl</kbd> + <kbd>v</kbd>
  - 수정하고 싶은 행 선택 (`j`, `k`)
  - `d`로 삭제
- 문자열 추가하기
  - 수정하고 싶은 위치에서 <kbd>Ctrl</kbd> + <kbd>v</kbd>
  - 수정하고 싶은 행 선택 (`j`, `k`)
  - <kbd>Shift</kbd> + <kbd>i</kbd> (수정 모드)
  - 수정한다. (첫 번째로 선택한 행만 수정되는 것처럼 보임. ~~그래서 안되는 줄 알았다...~~)
  - <kbd>Esc</kbd> <kbd>Esc</kbd>
- [참고](https://stackoverflow.com/questions/1676632/whats-a-quick-way-to-comment-uncomment-lines-in-vim)


