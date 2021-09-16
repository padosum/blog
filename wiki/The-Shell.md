---
title   : 셸(The Shell)
excerpt : missing-semester 정리  
date    : 2020-08-08 12:46:43 +0900
updated : 2020-08-08 12:46:55 +0900
tags    : [Shell]
---

## 셸(Shell) 이란 ?  

- 컴퓨터가 제공하는 도구를 최대한 활용하기 위한 구식 방식의 텍스트 인터페이스  
  - 접근 가능한 거의 모든 플랫폼에는 셸이 있다.  
    - 그 중 다수의 플랫폼에는 몇 개의 셸이 있음.  
      - ex) bash 

## 셸 사용하기  
- 터미널을 실행한 뒤의 기본 프롬프트의 모습  
  ```zsh
  missing:~$
  ```
  - 현재 missing이라는 기계에 있고 현재 어느 디렉토리에 있는지 표시된다.  
  - 이 프롬프트에서 명령어를 입력할 수 있고 명령은 셸에 의해 해석된다.  

    ```zsh 
    missing:~$ echo hello 
    hello
    ``` 
    - `echo`라는 프로그램은 단순하게 인자를 출력한다.  
      - 셸은 명령을 띄어쓰기로 분할해서 첫번째 단어로 표시된 프로그램을 실행하고 뒤의 단어는 인자로 제공  

## 이동하기  
- 셸의 경로는 구분 문자이다.  
  - Linux, macOS: `/` 
    - `/`가 파일 시스템의 루트(root)
  - Windows: `\`  
    - 각 디스크 파티션에 대한 루트가 있음 (ex: `C:\`)  

- `/`로 시작하는 경로들은 절대(absolute) 경로 라고 부른다.  
  - 다른 경로들은 상대(relative) 경로    
  - 상대는 최근 작업 디렉토리에 상대적이다.  
- 최근 작업 디렉토리 표시: `pwd`
- 디렉토리 이동: `cd`
- 현재 디렉토리: `.`
- 상위 디렉토리(parent directory): `..`    
- 기본적으로 프로그램의 실행은 현재 디렉토리에서 작동한다.  
  - 현재 디렉토리에 무엇이 있는지 확인하려면? `ls`  

- 이름변경, 파일이동: `mv` 
- 파일복사: `cp`  
- 새 디렉토리 만들기: `mkdir`  


### 플래그 옵션 
- `-h` 또는 `--help`를 사용하면 명령을 사용하기 위한 플래그 옵션을 알려주는 도움말 텍스트가 표시된다.  
  - ex) `ls --help`  
  ```zsh
  ls -l /home
  drwxr-xr-x  10 aalto  staff     320  8  8 12:23 _includes
  ```
  - d는 디렉토리임을 나타냄 
  - 다음 세개의 문자 (`rwx`): 파일 소유자(`aalto`), 소유 그룹(`staff`), 다른 모든 사람들이 관련 항목에 대해 각각 권한을 가지고 있는지를 나타낸다.  
    - `-`는 권한이 없음을 표시  
    - `w`: 파일 추가/제거
    - `x`: 디렉토리 입력(execute의 약자) 
    - `r`: 읽기 권한  

- 작동법을 알고싶다면? `man`을 사용(manual의 약자), 매뉴얼 페이지를 보여주고 `q`로 종료  

## 프로그램 연결하기  

- 셸에서는 키보드로 입력하고 화면으로 출력한다.  
```zsh 
$ echo hello > hello.txt 
$ echo cat hello.txt 
hello 
$ echo cat < hello.txt 
hello
$ echo cat < hello.txt > hello2.txt
$ echo cat hello2.txt 
hello 
```

## 연습문제  

1. `/tmp`에 `missing`이라는 새로운 경로 만들기

```zsh
mkdir /tmp/missing 
```

2. `touch`라는 프로그램 관찰. `man`을 사용하자.  
```zsh
man touch 
```

3. `touch`를 이용해 `semester`라는 파일을 `missing`안에 만들기  
```zsh
cd /tmp/missing 
touch semester 
``` 

4. 파일 실행하기 
```zsh
zsh: permission denied: ./semester
```  

5. `sh` 인터프리터로 시작해 명령어를 실행하고, `semester` 파일을 첫 인자로 주세요.  
왜 `/.smemster`는 되지 않고 `sh semester`는 될까?    
    - semester내용 중 `bin/sh`가 적혀있다..  
    - 권한 때문인가?  

6. chmod를 사용해 `sh semester` 대신 `./semester`를 사용가능하게 변경  
   - 파일과 디렉토리의 사용권한을 변경하는 것  