set fish_greeting '' #'🐟'

function fish_prompt
    set -l textcol  white
    set -l bgcol    blue
    set -l userc    yellow
    set -l arrowcol green
    #echo -n " "(basename $PWD)" "

    set_color black -b yellow
    echo -n (whoami)'@'(hostname)':'

    #set_color $textcol -b $bgcol
    set_color grey -b blue
    #set_color white -b cyan
    echo -n (prompt_pwd)

    set_color $arrowcol -b normal
    echo -n "⮀ "
end

export DOCKER_HOST=unix:///run/user/1000/docker.sock

export GOPATH=$HOME/.go
set PATH /usr/local/go/bin $PATH
set PATH $GOPATH/bin $PATH
#set PATH $HOME/.nvm/versions/node/v18.5.0/bin $PATH


if test -s ~/.TODO
	set_color magenta
	echo
	cat ~/.TODO | sed 's/^/ /' | grep -v '\[x\]' | shuf -n 1
	echo
end
set_color normal

alias disable-hdmi "xrandr --output HDMI-1 --off && bspc monitor -d 1 2 3 4 5 6 7 8 9 0 && feh --bg-fill --randomize ~/Pictures/Wallpapers/* && killall polybar; polybar large & disown"
alias gommit "env GIT_COMMITTER_DATE=(date --utc +%Y-%m-%dT%H:%M:%S%z) git commit -S -s -a --date=(date --utc +%Y-%m-%dT%H:%M:%S%z)"
alias gammend "env GIT_COMMITTER_DATE=(date --utc +%Y-%m-%dT%H:%M:%S%z) git commit -S -s -a --amend --date=(date --utc +%Y-%m-%dT%H:%M:%S%z)"
