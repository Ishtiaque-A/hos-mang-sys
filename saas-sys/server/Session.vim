let SessionLoad = 1
let s:so_save = &g:so | let s:siso_save = &g:siso | setg so=0 siso=0 | setl so=-1 siso=-1
let v:this_session=expand("<sfile>:p")
silent only
silent tabonly
cd ~/Docomentss/aC/zaimah-tech/hos-mang-sys/saas-sys/server
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
let s:shortmess_save = &shortmess
if &shortmess =~ 'A'
  set shortmess=aoOA
else
  set shortmess=aoO
endif
badd +113 app/Http/Controllers/UserController.php
badd +49 app/Traits/ApiCallTrait.php
badd +143 routes/api.php
badd +48 app/Http/Controllers/Subscription/SubscriptionRequestController.php
badd +67 app/Service/SubscriptionPlanService.php
badd +49 app/Jobs/DatabaseImportJob.php
badd +1 ~/Docomentss/aC/zaimah-tech/hos-mang-sys/saas-sys/server/storage/logs/laravel.log
badd +37 ~/Docomentss/aC/zaimah-tech/hos-mang-sys/saas-sys/server/.env
argglobal
%argdel
edit ~/Docomentss/aC/zaimah-tech/hos-mang-sys/saas-sys/server/.env
argglobal
balt app/Jobs/DatabaseImportJob.php
setlocal fdm=indent
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=99
setlocal fml=1
setlocal fdn=20
setlocal fen
let s:l = 37 - ((36 * winheight(0) + 33) / 67)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 37
normal! 019|
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
