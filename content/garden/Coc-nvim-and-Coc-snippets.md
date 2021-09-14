---
title   : coc.nvim과 coc-snippets  
date    : 2021-07-08 22:03:55 +0900
updated : 2021-07-08 22:19:32 +0900
aliases : ["coc.nvim과 coc-snippets"]
tags: ["How to", "Tools"]
---
neovim에서 작업을 할 때 snippets으로 자주쓰는 코드를 입력하고 싶어졌다. **coc**라는 플러그인을 알게되었는데 개발용으로 사용하기위한 엄청나게 많은 옵션들이 있었다. 나는 현재 문서작업만 하려하기 때문에 간단히 설치만 하고 사용했다. 

## 설치 
- nodejs는 12.12 버전 이상이 필요하다.  
- vim-plug를 이용해 설치했다. 추가 후에 `:PlugInstall`  
  ```vim
  // init.vim
  call plug#begin('~/.config/nvim/plugged')
  Plug 'neoclide/coc.nvim', {'branch': 'release'}
  call plug#end()
  ```
- coc-snippets는 `:CocInstall coc-snippets`으로 설치한다.  

### Commands 
- `:CocList snippets`: 스니펫 목록 조회  
- `:CocCommand snippets.editSnippets`: 현재 파일 형식의 사용자 스니펫 수정  
- `:CocCommand snippets.openSnippetFiles`: 현재 파일 형식의 스니펫 파일 열


## reference
- [https://github.com/neoclide/coc.nvim](https://github.com/neoclide/coc.nvim)
- [https://github.com/neoclide/coc-snippets](https://github.com/neoclide/coc-snippets)
