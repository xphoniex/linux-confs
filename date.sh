#!/bin/bash

#commit=$1
#count=$(git rev-list $1 --count)

count=$1

echo "count = $count"

extra=0
#for i in $(eval echo {1..$count})
for i in $(seq $count -1 0)
do
	let diff=$extra+$count-$i
	#echo "for i =  $i"
	day=$(date -d "+$diff day" +%a)
	if [[ $day = "Sat" ]]; then
		let extra=$extra+2
		let diff=$extra+$count-$i
	fi
	date=$(date -d "+$diff day" --utc +%Y-%m-%dT%H:%M:%S%z)
	echo "date = $date"
	GIT_COMMITTER_DATE=$date git rebase "HEAD~$i" --exec "git commit --amend --no-edit --date=$date"  &> /dev/null
done
