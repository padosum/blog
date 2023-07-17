---
title   : your computer restarted because of a problem
date    : 2023-07-17 23:18:20 +0900
updated : 2023-07-17 23:39:56 +0900
aliases : ["your computer restarted because of a problem"]
tags : ["mac", "error", "How to"]
draft : false
---

## Goal

"your computer restarted because of a problem" 에러 해결하기


## 계속 재부팅되는 현상

어제 컴퓨터가 먹통이 되었었다. 오늘 반드시 고쳐지길 바라면서 잠들었는데 다행히 잘 작동되고 있다.  

"your computer restarted because of a problem" 라는 메시지와 함께 계속 재부팅되었다. 로그인을 해도 저 문구의 오류메시지가 뜬 뒤에 다시 부팅화면으로 들어갔다. 한가지 특징은 로그인시 profile 이미지가 보이지 않았던 것.  

이리 저리 검색해보니 **"커널패닉"** 이라는 증상이었다. 문제가 발생하는 이유는 다양했는데 나의 지식으론 한계가 있었다.  

많은 사람들이 설명하는 해결책 중 하나는 os를 재설치하는 방법이었다. 따라해보기로 했다.


## 해결하기

[Mac 시동 키 조합 문서](https://support.apple.com/ko-kr/HT201255)를 참고하면 <kbd>⌘</kbd> + <kbd>R</kbd> 조합으로 복구를 할 수 있다고 한다.  
사과 모양이 나왔을 때 키를 동시에 길게 누르고 있으면 와이파이 설정 화면이 나타나며 그 뒤에 복구 화면이 나타난다.  

여러 항목 중 두번째에 있는 `macOS 다시 설치`를 클릭해 진행하면 된다.  
![macOS reinstall](https://support.apple.com/library/content/dam/edam/applecare/images/ko_KR/macos/ventura/macos-ventura-recovery-mode-options-list.png)

진행중에 재설치를 할 하드디스크를 선택할 때 "the operation couldn't be completed com.apple.preflight.error error 21"라는 오류가 나오며 진행이 되지 않았는데 검색해보니 인터넷 연결 문제라는 이야기가 나왔다. 그래서 복구 화면에 들어갈 때 키 조합을 <kbd>Shift</kbd>를 제외한 것으로 했다. <kbd>Shift</kbd> 키를 함께 누르면 인터넷을 통해 복구를 시동하는 것이라고 한다.

아무튼 우여곡절 끝에 진행하려고 하니 이번엔 디스크 용량이 부족하다는 메시지가 떴다. OS를 재설치하기 위한 용량에 1Gb가 부족했다! 백업도 하지 않았는데 다 밀어버릴 순 없는 노릇이어서 이제 진짜 끝인가 싶었다.  

그러던 중 복구 화면에서 Terminal에 접속 가능하다는 사실을 알게되었다. 상단바에서 **Utility > terminal**로 실행해 불필요한 파일 삭제 후 추가 용량을 확보했다.  


여기서도 한가지 문제가 있었는데 내가 사용하는 파일들이 있는 경로가 아무리 찾아도 안보였다. `Users`에서 user name 폴더에 있을 줄 알았는데 user name 폴더가 안보였다! 찾느라 많은 시간을 소비했다.  
다른 사람들의 관련 스크린샷을 찾아보다 Disk Utility 항목에서 디렉토리를 확인할 수 있는 방법이 있었다.  
복구 화면에서 Disk Utility를 클릭한 후 상단 바에서 **File > New Image > Image from Folder...** 에 들어가서 내 디렉토리 경로들을 확인할 수 있었다. 황당하게도 내가 사용하던 디스크의 이름은 `Untitled` 였다. 아마 이 방법이 없었다면 못찾고 포맷을 했을텐데 생각만 해도 끔찍하다.  

다시는 위와 같은 오류가 나타나지 않도록 후속 처리가 필요할 것 같은데 좀 더 찾아봐야겠다. 일단 현재는 OS 재설치로 부팅을 할 수 있어서 다행이다.  




