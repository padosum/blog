---
title   : Failed to load module script 
date    : 2022-11-11 22:44:41 +0900
updated : 2022-11-11 22:47:01 +0900
aliases : ["Failed to load module script"]
tags : ["error", "JavaScript", "How to"]
draft : false
---

> Failed to load module script: Expected a JavaScript module script but the server responded with a MIME type of "text/html". Strict MIME type checking is enforced for module scripts per HTML spec.


보통 JavaScript에서 모듈을 import할 때 확장자를 제대로 적어주지 않는 경우에 많이 발생했다.  
그래서 확장자를 다 적은 걸 확인하고 다시 실행했는데 오류가 여전했다.  
원인은 확장자가 아니라 경로 자체가 제대로 작성되지 않은 것이었다.

결론적으로 상기한 오류가 나타나는 이유는,  
모듈 `import`시 모듈의 경로나 확장자가 작성되었을 때 발생한다!



