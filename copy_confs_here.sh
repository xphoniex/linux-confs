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
cp ~/.config/mpv/osc.lua .config/mpv/

cp ~/.alacritty.yml .

cp /usr/lib/systemd/user/mpd.service usr/lib/systemd/user/mpd.service

cp ~/.config/systemd/user/timetracker.service .config/systemd/user/
cp ~/.config/systemd/user/chapchap.service .config/systemd/user/

cp ~/Documents/devops/chapchap.config .config/chapchap.config

cp ~/.vimrc .

cp ~/snap/firefox/common/.mozilla/firefox/7irn3dcm.default-1560603164746/chrome/userChrome.css snap/firefox/common/.mozilla/firefox/7irn3dcm.default-1560603164746/chrome/

cp ~/.local/bin/archive-current-bg .local/bin/
cp ~/.local/bin/enable-side-scroll .local/bin/
cp ~/.local/bin/mp4_to_gif .local/bin/
cp ~/.local/bin/take-thumbnail-screenshot .local/bin/
cp ~/.local/bin/toggle-grayscale .local/bin/

cat ~/.gitconfig | grep -v email > .gitconfig
