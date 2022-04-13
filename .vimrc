"	move line up/down with Alt + k/j
map <Esc>j <A-j>
map <Esc>k <A-k>
nnoremap <A-j> :m .+1<CR>==
nnoremap <A-k> :m .-2<CR>==
inoremap <A-j> <Esc>:m .+1<CR>==gi
inoremap <A-k> <Esc>:m .-2<CR>==gi
vnoremap <A-j> :m '>+1<CR>gv=gv
vnoremap <A-k> :m '<-2<CR>gv=gv

"	visual block
:nnoremap vb <c-v>

"	default color scheme
colorscheme darkblue

"	syntax highlighting (coloring)
syntax enable
filetype plugin indent on

"	autocomplete menu color, pick from 8, 27, 23
highlight Pmenu ctermbg=23

"	color for lines w/ compiler error (from: YcmWarningSection)
highlight SpellCap ctermbg=52
highlight SpellBad ctermbg=52

"	status bar
set laststatus=2

"	instead of auto-hover after 5 sec, use \h
nmap <leader>h <plug>(YCMHover)
let g:ycm_auto_hover=''

"	completion infos are shown in preview by default, we switch to popup
let g:ycm_add_preview_to_completeopt = 'popup'

"	don't let macro-errors through, BUG in rust-analyzer
let g:ycm_filter_diagnostics = { "rust": { "regex": ["unresolved-proc-macro"] } }

"	jump to definition/declaration
nnoremap gd :YcmCompleter GoToDefinitionElseDeclaration
"	back with Ctrl + o
nnoremap gf :tab split \| YcmCompleter GoToDefinition<CR>
"	gf creates new tab, switch with gt, gT, :tabn #
