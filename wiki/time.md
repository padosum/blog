---
title   : time  
date    : 2023-02-01 21:57:12 +0900
updated : 2023-02-01 22:52:09 +0900
aliases : ["time 명령어"]
draft : false
tags  : ["Tools"]
---

- 특정 명령을 실행할 때 소요되는 시간을 확인할 수 있다.
- 나는 현재 `zsh`을 사용하고 있는데 `zsh`에서는 이 명령어가 예약어라고 한다. `type time`으로 확인해보면 `time is a reserved word`라고 나온다.

## example
```shell
time ls
time npm run build
```

- 결과로 나오는 `user`와 `system`은 각각 [user mode와 kernel mode](https://blog.codinghorror.com/understanding-user-and-kernel-mode/)에서 소요된 시간(초)을 보여준다.
- `cpu`는 총 CPU 시간의 백분율. `user`와 `system`의 결합된 값을 표시.

## reference
- [https://apple.stackexchange.com/questions/424131/what-does-the-time-command-do-on-zsh-mac-terminal-and-what-is-the-output-of-ch](https://apple.stackexchange.com/questions/424131/what-does-the-time-command-do-on-zsh-mac-terminal-and-what-is-the-output-of-ch)
