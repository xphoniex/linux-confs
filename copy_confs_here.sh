#!/bin/bash
cp ~/.config/sxhkd/notifs.sh .config/sxhkd/
cp ~/.config/sxhkd/sxhkdrc .config/sxhkd/

cp ~/.config/bspwm/bspwmrc .config/bspwm/

cp ~/.config/polybar/config .config/polybar/config

cp ~/.config/fish/config.fish .config/fish/
cp ~/.config/fish/functions/fish_user_key_bindings.fish .config/fish/functions/
cp ~/.config/mimeapps.list .config/
cp ~/.config/Code/User/settings.json .config/Code/User/
cp ~/.config/mpv/mpv.conf .config/mpv/
cp ~/.config/mpv/input.conf .config/mpv/

cp ~/.alacritty.yml .

cp /usr/lib/systemd/user/mpd.service usr/lib/systemd/user/mpd.service

cp ~/.config/systemd/user/timetracker.service .config/systemd/user/

cp ~/.vimrc .

cp /usr/local/bin/archive-current-bg usr/local/bin/
cp /usr/local/bin/enable-side-scroll usr/local/bin/
cat ~/.gitconfig | grep -v email > .gitconfig
