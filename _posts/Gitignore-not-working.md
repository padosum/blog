---
title   : .gitignore이 적용 안될 때   
date    : 2021-01-23 14:28:19 +0900
updated : 2021-01-23 14:30:12 +0900
tags    : [Git]
excerpt : 
parent  : 
layout  :
---

```bash 
git rm -r --cached .
git add .
git commit -m "fixed untracked files"
```

## 참고  
- [https://stackoverflow.com/questions/11451535/gitignore-is-ignored-by-git](https://stackoverflow.com/questions/11451535/gitignore-is-ignored-by-git)
