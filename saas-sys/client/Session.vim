let SessionLoad = 1
let s:so_save = &g:so | let s:siso_save = &g:siso | setg so=0 siso=0 | setl so=-1 siso=-1
let v:this_session=expand("<sfile>:p")
silent only
silent tabonly
cd ~/Docomentss/aC/zaimah-tech/hos-mang-sys/saas-sys/client
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
let s:shortmess_save = &shortmess
if &shortmess =~ 'A'
  set shortmess=aoOA
else
  set shortmess=aoO
endif
badd +420 src/pages/register/index.js
badd +132 src/layouts/dashboard/side-nav.js
badd +135 src/pages/auth/reset-password.js
badd +88 src/pages/auth/send-otp.js
badd +98 src/pages/auth/login.js
argglobal
%argdel
edit src/pages/register/index.js
argglobal
balt src/layouts/dashboard/side-nav.js
setlocal fdm=indent
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=99
setlocal fml=1
setlocal fdn=20
setlocal fen
35
normal! zo
413
normal! zo
414
normal! zo
419
normal! zo
422
normal! zo
422
normal! zo
422
normal! zo
422
normal! zo
422
normal! zo
422
normal! zo
422
normal! zo
422
normal! zo
422
normal! zo
422
normal! zo
422
normal! zo
423
normal! zo
439
normal! zo
439
normal! zo
439
normal! zo
439
normal! zo
439
normal! zo
439
normal! zo
439
normal! zo
444
normal! zo
454
normal! zo
455
normal! zo
456
normal! zo
457
normal! zo
474
normal! zo
483
normal! zo
let s:l = 420 - ((33 * winheight(0) + 33) / 67)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 420
normal! 0
tabnext 1
if exists('s:wipebuf') && len(win_findbuf(s:wipebuf)) == 0 && getbufvar(s:wipebuf, '&buftype') isnot# 'terminal'
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20
let &shortmess = s:shortmess_save
let s:sx = expand("<sfile>:p:r")."x.vim"
if filereadable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &g:so = s:so_save | let &g:siso = s:siso_save
set hlsearch
nohlsearch
let g:this_session = v:this_session
let g:this_obsession = v:this_session
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
