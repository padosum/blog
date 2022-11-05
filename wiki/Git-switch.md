---
title   : Git switch 명령어
date    : 2022-11-05 22:49:18 +0900
updated : 2022-11-05 23:08:11 +0900
aliases : ["Git switch 명령어"]
tags: ["Git"]
draft : false
---

## Goal
git switch 명령어를 어떨 때 사용하는지 알고 쓰자.

[[Git]]을 사용하면서 branch를 새로 생성하기 위해 `git branch` 명령어를 사용했왔다.  
그런데 프로젝트를 같이 진행했던 팀원분이 `git switch`를 쓰는게 좋다라는 말을 하셨다. 자세한 걸 찾아봐야지 하고 시간이 많이 흘렀다.  

기존에는 `checkout` 으로 브랜치를 다뤄왔다. 그런데 내가 잠깐 공부한 것만해도 브랜치 생성, 변경, 복구 등 많은 기능을 포함하고 있었다.

git 버전이 업데이트되면서 `checkout`의 기능을 `switch`와 `restore`로 분리했다고 한다. (~~업데이트 한 것도 아주 오래되었따. ~~)

`switch`는 말 그대로 브랜치를 변경하는 명령어다. 만약 생성하면서 변경하고자 한다면 `-c` 옵션을 붙인다.
뭔가 기존 명령어보다 더 명확한 것 같아서 사용하는데 정말 익숙해졌다. 이제 `checkout`으로 브랜치를 생성하거나 변경하지 않는다.

`restore`은 복구 기능이다. 어떤 파일을 마지막 커밋 상태로 되돌릴 때 사용한다.

```bash
git checkout -- <파일명>
```

위와 같이 사용하는 대신 아래와 같이 사용하면 된다.
```bash
git retore <파일명>
```

이것 또 명령어로 인해 훨씬 명확해진 것 같다. 사실 `restore`는 현재 나로썬 사용하지 않을 때가 많다. 그냥 vscode에서 복구하곤 한다...

왜 내가 이 두 명령어를 더 명확하게 느끼는 걸까? 단어도 그렇지만 난 영어를 쓰는 원어민이 아니기에 "checkout"이라는 단어에 대해 "이런 의미다! 이런 느낌이다!" 하고 떠올라서 명령어를 바로 사용할 수 없었기 때문인 것 같다.

## reference
- [https://xtring-dev.tistory.com/entry/git-git-switch-restore%EA%B0%80-%EB%AD%90%EC%95%BC-checkout%EC%97%90%EC%84%9C-switch-restore](https://xtring-dev.tistory.com/entry/git-git-switch-restore%EA%B0%80-%EB%AD%90%EC%95%BC-checkout%EC%97%90%EC%84%9C-switch-restore)