---
title   : mac에서 iCloud drive 동기화 오류 
date    : 2023-03-08 11:56:49 +0900
updated : 2023-03-08 12:01:14 +0900
aliases : 
draft : false
---

## Goal

mac에서 iCloud drive 동기화를 원활하게 하자.

## 문제

인터넷 연결에는 문제가 없는 것을 확인했으나 iCloud drive가 업로드하고, 다운로드를 하는데 제대로 동기화가 되지 않고 있다는 것을 발견했다. 그러니까 동기화가 하루종일(?) 진행되고 있었다. 아무런 파일 업데이트가 없었는데도

검색해보니 동기화를 시키는 daemon(백그라운드 프로세스)을 종료시키고 iCloud meta-data 저장소를 삭제하면 된다고 한다.

다음 명령어를 입력하면 해당 daemon이 종료된다.
```sh
killall bird
```

그리고 iCloud meta-data가 저장된 디렉터리(`CloudDocs`)를 삭제한다.
```sh
cd ~/Library/ApplicationSupport
rm -rf CloudDocs
```

재부팅하면 동기화가 제대로 잘 작동했다!

## reference
- [https://www.clien.net/service/board/cm_mac/16024641](https://www.clien.net/service/board/cm_mac/16024641)

