---
title   : Git commit hook 건너뛰기, skip 
date    : 2021-05-03 09:44:03 +0900
updated : 2021-05-03 09:51:49 +0900
aliases : ["Git commit hook 건너뛰기"]
private : false
hidden  : false
showReferences : true
---
## 문제 발견  
post 작성시 업로드된 이미지를 내려받는 hook을 사용하고 있는데 거기에 commit 전에 해당 디렉토리의 파일들이 다 스테이지에 올라가버려 commit 하고 싶지 않은 파일도 hook에 의해 다 commit되었다. 

## 해결
```bash
git commit -m "comments" --no-verify
```  
커밋할 때 `--no-verify` 옵션을 붙여주면 hook이 실행되지 않았다.  
평소에 github desktop을 사용하고 있어서 이런 옵션을 사용해보지 않았다. 편하지만 능사는 아니란 걸 알게되었다.

## 참고자료 
- [https://stackoverflow.com/questions/7230820/skip-git-commit-hooks](https://stackoverflow.com/questions/7230820/skip-git-commit-hooks)
