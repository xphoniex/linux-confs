#!/bin/bash

progress_bar() {
    local -r percent=${1:?$(error 'Percentage is required')}
    local -r max_percent=${2:-100}
    local -r divisor=${3:-2}
    local -r progress=$(( (percent > max_percent ? max_percent : percent) / divisor ))

    printf -v bar "%*s" $progress ""
    #echo "${bar// /█}"
    echo "${bar// /=}"
}

hide_previous_notification() {
	pkill -SIGUSR1 herbe
}

notify_volume() {
	vol=$(pactl list sinks | grep '^[[:space:]]Volume:' | head -n $(( $SINK + 1 )) | tail -n 1 | sed -e 's,.* \([0-9][0-9]*\)%.*,\1,')
	herbe "Volume: $vol% $(progress_bar "$vol")" &
	#notify-send -h string:synchronous:vol -h int:value:$vol  -i audio-volume-medium-symbolic Vol
}

notify_brightness() {
	bright=$(brightnessctl | grep Current | cut -d ' ' -f 4 | tr -d '(%)')
	herbe "Bright: $bright% $(progress_bar "$bright")" &
	#notify-send -h string:synchronous:bright -h int:value:$bright  -i notification-display-brightness-medium Bright
}


# only applicable when using herbe
tries=0
while [ $(ps x | grep herbe | wc -l) != "1" ]; do
        tries=$((tries+1));
        if [ "$tries" == "40" ]; then
                exit 1
        fi
	hide_previous_notification
	sleep 0.01;
done

if [ "$1" == "volume" ]; then
	notify_volume
fi

if [ "$1" == "brightness" ]; then
	notify_brightness
fi
