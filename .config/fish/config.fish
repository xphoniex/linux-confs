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

