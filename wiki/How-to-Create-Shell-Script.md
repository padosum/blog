---
title   : 쉘 스크립트 작성하기 
date    : 2022-12-06 21:34:33 +0900
updated : 2022-12-06 23:04:27 +0900
aliases : ["쉘 스크립트 작성하기"] 
tags: ["Shell", "How to"] 
draft : false
description: week number를 출력하는 프로그램 만들기
---

## Goal
[[The-Shell|쉘]] 스크립트를 작성하고 실행하는 방법을 알아본다.


주간 회고를 기록할 때 week number를 표기한다. 그런데 이번주 번호가 뭔지 기억이 나지 않는다. 작성시마다 매번 지난 주 회고를 확인했기 때문에 번거로움을 느꼈다. 그래서 찾아보니 `date`라는 명령어가 있었다.

[다음 코드를 입력하면 week number가 출력된다.](https://unix.stackexchange.com/questions/282609/how-to-use-the-date-command-to-display-week-number-of-the-year):
```bash
date +"%U"
```

그런데 나는 특정 날짜를 입력할 때도 week number를 구하고 싶었다. `-d` 옵션을 추가하고 날짜를 입력하면 된다는데 `-d` 옵션이 없다는 오류만 나타났다.
```bash
date -d "2022-12-06" +"%U"
```

`man date`로 명령을 확인해보니, `-d` 옵션은 없었다.  

[검색](https://knight76.tistory.com/entry/mac-os-x%EC%97%90%EC%84%9C-linux%EC%9D%98-date-%ED%85%8C%EC%8A%A4%ED%8A%B8%ED%95%98%EA%B8%B0-mac-os-x%EA%B3%BC-linux%EC%9D%98-date%EB%8A%94-%EB%8B%A4%EB%A5%B4%EB%8B%A4) 을 해보니, mac osx와 linux의 `date` 명령이 다르다고 한다. mac은 unix 계열이기 때문이라고. 그래서 [coreutils](https://ko.wikipedia.org/wiki/GNU_%EC%BD%94%EC%96%B4_%EC%9C%A0%ED%8B%B8%EB%A6%AC%ED%8B%B0) 를 설치해서 사용하라고 했다. 명령어를 묶어 놓은 패키지라고 한다.

```bash
brew install coreutils
```

설치 후에 `gdate`라는 명령어를 실행하니 값이 잘 나왔다.

```bash
gdate -d "2022-12-06" +"%U"
```

좋다. 하지만 week number를 구하고 싶을 때 매번 이 명령어를 입력하기 귀찮으니, 쉘 스크립트를 작성해서 `week`라는 프로그램을 만들어보자.

## 쉘 스크립트?
- 쉘 스크립트는 명령어들이 나열되어 있는 파일[^1]
- 쉘 스크립트에 내가 필요한 명령어를 나열하고 해당 스크립트를 실행하면 되겠다.

## 쉘 스크립트 작성하기

`week`라는 파일을 생성하자. 여기에 쉘 스크립트를 작성할 것이다.
```bash
touch week
```

다음 스크립트를 입력한다:
```bash
#!/bin/bash

# show week number program
gdate +"%Y-W%V" # ex) 2022-W49
```

- `#`: 주석
- `#!/bin/bash`: [[2022-11-01|저번에 알게된]] shebang 이다. 뒤에 작성하는 스크립트를 실행하기 위한 인터프리터의 이름을 시스템에게 알려준다.

이제 파일을 저장한다.

## 쉘 스크립트 실행하기

만들어진 `week` 프로그램을 실행하자.
```bash
$ week
command not found: week
```

이상하다. 명령어를 찾을 수 없다고 한다. 스크립트를 실행하기 위해 정확한 경로를 입력해야 하기 때문에 `./week`라고 실행해야 한다. (현재 디렉터리에 스크립트가 존재한다.)

```bash
$ ./week
permission denied: ./week
```
이번엔 `permission denied: week`라는 오류가 나타난다. 실행 권한을 설정하지 않았기 때문이다. `chmod` 명령어를 사용해 설정하면 된다.

`755`는 모든 사용자에게 실행 권한을 주고, `700`은 파일 소유자만 실행 가능하다.
```bash
chmod 755 week
```

다시 실행해보자.
```bash
$ ./week
2022-W49
```

잘 나오는 것을 확인할 수 있다. 음.. 그런데 앞에 `./`를 매번 입력하는 것은 번거롭고 또 멋이 없다. 다른 명령처럼 없애고 싶다. 어떻게 해야할까?

시스템은 실행 프로그램을 찾을 때마다 디렉토리 목록을 검색한다. 예를 들어 `ls` 명령은 `/bin/ls`에 위치하고 있다. `/bin` 디렉토리는 시스템이 자동으로 검색하는 디렉토리 중 하나인데, 이 디렉터리 목록은 `PATH`라고 하는 환경 변수에 설정되어 있다.

다음 명령을 실행하면 디렉토리 목록이 조회된다:
```bash
$ echo $PATH
```

`~/bin` 디렉토리는 개인적인 용도로 사용하려는 스크립트를 저장하기에 적합한 장소라고 한다.[^2] 그래서 `$PATH`라는 환경 변수에 해당 디렉토리를 추가해주자.

```
# .bashrc

export PATH=~/bin:"$PATH"
```

그리고 쉘이 이 설정을 바로 적용하도록 `source` 명령을 사용하자.

```bash
$ source ./bashrc
```

앞서 만든 프로그램은 `~/bin` 디렉토리 내부로 이동시키자.
```bash
$ mkdir bin
$ mv week bin
$ week
2022-W49
```

이제 경로를 입력하지 않아도 환경 변수에 설정된 디렉토리에서 프로그램을 찾아 실행할 수 있다.

## 매개변수

만들어 놓고 보니, 특정 날짜의 week number를 조회하는 것이 필요할 수도 있겠다는 생각이 들었다. 그렇다면 프로그램에 매개변수를 전달하면 될 것 같은데 쉘 스크립트에선 어떻게 사용할까?

`$`에 숫자를 붙여서 매개변수를 사용할 수 있다. 
```
#! /bin/bash
echo $0 # 스크립트 파일 실행 명령어
echo $1 # 첫 번째 인자
echo $2 # 두 번째 인자
# ....
```

그리고 스크립트에 `if` 문도 사용할 수 있으므로 매개변수가 전달된 경우와 아닌 경우 분기 처리가 가능할 것 같다.

그럼 스크립트를 다음과 같이 수정하자:
```
#!/bin/bash

# show week number program

DATE=$1

if [[ $1 ]]; then
		gdate -d $1 +"%Y-W%V" | xclip
else
		gdate +"%Y-W%V" | xclip
fi
```

첫 번째 매개변수가 전달된 경우에는 `-d` 옵션을 사용하고, 그 외에는 현재 날짜의 week number를 보여주도록 한다.

## 결과 복사하기
여기까지 스크립트를 작성하니, week number를 보는 것 뿐만 아니라 바로 클립보드에 복사가 되었으면 좋겠다.

mac에서 명령어의 결과를 복사하려면 `pbcopy` 명령어를 사용하면 된다.

```
#!/bin/bash

# show week number program

DATE=$1

if [[ $DATE ]]; then
		WEEK_NUMBER=$(gdate -d $DATE +"%Y-W%V")
else
		WEEK_NUMBER=$(gdate +"%Y-W%V")
fi

echo $WEEK_NUMBER
echo $WEEK_NUMBER | pbcopy
```


## 생각
- 《리눅스 커맨드라인 완벽 입문서》가 아주 큰 도움이 되었다.
  - 내 기억으론 이 책은 약 7~8년 전에 구매한 듯 싶은데, 아주 오랜만에 펼쳤다. 다음에도 많은 도움이 될 것이다.


[^1]: 이종우, 정영신 역, 윌리엄 E. 샤츠 주니어 저, 《리눅스 커맨드라인 완벽 입문서》, 2012년, 351쪽
[^2]: 이종우, 정영신 역, 윌리엄 E. 샤츠 주니어 저, 《리눅스 커맨드라인 완벽 입문서》, 2012년, 354쪽



