---
title   : coc.nvim과 coc-snippets  
date    : 2021-07-08 22:03:55 +0900
updated : 2022-10-04 16:29:37 +0900
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

단축키는 다음과 같이 지정할 수 있다. 
```vim
" Use <C-l> for trigger snippet expand.
imap <C-l> <Plug>(coc-snippets-expand)

" Use <C-j> for select text for visual placeholder of snippet.
vmap <C-j> <Plug>(coc-snippets-select)

" Use <C-j> for jump to next placeholder, it's default of coc.nvim
let g:coc_snippet_next = '<c-j>'

" Use <C-k> for jump to previous placeholder, it's default of coc.nvim
let g:coc_snippet_prev = '<c-k>'

" Use <C-j> for both expand and jump (make expand higher priority.)
imap <C-j> <Plug>(coc-snippets-expand-jump)

" Use <leader>x for convert visual selected code to snippet
xmap <leader>x  <Plug>(coc-convert-snippet)
```

<kbd>Tab</kbd>으로 자동완성을 하려면 다음과 같이 설정한다.
```
inoremap <silent><expr> <TAB>
      \ coc#pum#visible() ? coc#_select_confirm() :
      \ coc#expandableOrJumpable() ? "\<C-r>=coc#rpc#request('doKeymap', ['snippets-expand-jump',''])\<CR>" :
      \ CheckBackSpace() ? "\<TAB>" :
      \ coc#refresh()

function! CheckBackSpace() abort
  let col = col('.') - 1
  return !col || getline('.')[col - 1]  =~# '\s'
endfunction

let g:coc_snippet_next = '<tab>'
```

### Commands 
- `:CocList snippets`: 스니펫 목록 조회  
- `:CocCommand snippets.editSnippets`: 현재 파일 형식의 사용자 스니펫 수정  
- `:CocCommand snippets.openSnippetFiles`: 현재 파일 형식의 스니펫 파일 열

### Snippet 설정하기
`:CocCommand snippets.editSnippets`로 연 파일에서 다음과 같이 작성한다.
```
snippet til "Today I Learn"
## Today I Learn
### ${1}
endsnippet
```
`snippet` 뒤에 스니펫을 트리거 이름을 적는다. 그 다음줄 부터 스니펫을 작성한 다음 `endsnippet`을 적는다. `${1}`은 placeholder인데 스니펫을 불러온다음 커서를 적힌 번호 순서대로 이동시킬 수 있다. 단축키에 지정한대로 `<C-j>`, `<C-k>`로 이동하면 되는데 나는 `<tab>`이 편해서 다음과 같이 수정했다. [출처](https://github.com/neoclide/coc-snippets/issues/5)

```vim
" To make completion works like VSCode
inoremap <expr> <TAB> pumvisible() ? "\<C-y>" : "\<TAB>"
let g:coc_snippet_next = '<TAB>'
let g:coc_snippet_prev = '<S-TAB>'
```

## vimwiki와 충돌
<kbd>Tab</kbd> 으로 자동완성을하게 되면 vimwiki가 테이블에서 다음 컬럼 이동시 <kbd>Tab</kbd>을 사용하기 때문에 제대로 동작하지 않는다.

vim 설정파일에서 다음을 추가한다.
```
let g:vimwiki_table_mappings = 0
```

## reference
- [https://github.com/neoclide/coc.nvim](https://github.com/neoclide/coc.nvim)
- [https://github.com/neoclide/coc-snippets](https://github.com/neoclide/coc-snippets)
