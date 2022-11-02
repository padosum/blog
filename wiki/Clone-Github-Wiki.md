---
title   : Github Wiki Clone 하기
date    : 2022-11-02 22:41:21 +0900
updated : 2022-11-02 22:59:47 +0900
aliases : ["Github Wiki Clone 하기"]
tags: ["Git"]
draft : false
---

## Goal
- Github 저장소가 private가 되면, Wiki를 Github 웹 페이지에서 볼 수 없다. 
	- 어떻게 알았냐고? 나도 알고 싶지 않았다..
- Github 저장소의 Wiki를 다시 볼 수 있도록 해보자.


## 해결하자.

github 는 public repository거나 pro plan인 경우 private repository에 wiki 기능을 제공하고 있다.
그래서 pro plan이 아닌 경우에 repository가 private이 되면 작성해놓은 wiki를 다시볼 수가 없었다..

그러다가 문득 기억이 하나 떠올랐다. wiki 작성할 때 gist처럼 revisons 같은게 있었던 것 같은 기억 말이다. 이전에 수정한 것들도 다 볼 수가 있었다.

그렇다면 wiki도 git으로 관리된다는 결론이 내려졌다. 이걸 내 로컬로 다시 내려받을 수 없을까? 검색을 했다.

[한 개발자 분의 글](https://this-programmer.tistory.com/454)을 발견했다. 다른 것을 얘기하고 계시긴 했는데 덕분에 wiki도 클론 가능하다는 것을 알게됐다!

저장소를 클론할 때 `git@github.com:username/reponame.git` 을 사용한다면, 해당 저장소의 wiki는 다음과 같이 가져올 수 있다!
```bash
git clone git@github.com:username/reponame.wiki.git
```

Wiki를 다시볼 수 있음에 마음이 편안해졌다. 


## 참고
- [https://this-programmer.tistory.com/454](https://this-programmer.tistory.com/454)


