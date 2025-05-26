#!/usr/bin/python3
# -u is needed above for systemd log (unbuffered)

# while true; do xprop -id $(xprop -root 32x '\t$0' _NET_ACTIVE_WINDOW | cut -f 2) _NET_WM_NAME && sleep 1; done;

import os
import time
import subprocess

def get(command):
	try:
		return subprocess.check_output(command).decode("utf-8").strip()
	except subprocess.CalledProcessError:
		pass


LOGs = {}
count = 1

prev_win_name = None
tick = 1

events = []

path = os.path.dirname(os.path.abspath(__file__))

#print (os.environ)

if 'DISPLAY' not in os.environ:
	os.environ['DISPLAY'] = ':0'

while True:
	win_name = get([path + '/get_window.sh'])

	try:
		win_name = win_name[29:-1]
	except:
		time.sleep(5)
		#return 1	# bug: it seems to keep outputting: `xprop:  unable to open display ''`
				#      waiting doesn't affect it! restarting the script does.
		continue

	if win_name != prev_win_name:
		prev_win_name = win_name
		events += [win_name, str(int(time.time()))]
		#print ([win_name, int(time.time())])
		#print (time.strftime('%Y-%m-%d %H-%M-%S'))

	tick += 1

	# append every 5 minutes
	if tick % 300 == 0 and len(events) > 0:
		with open(path + time.strftime('/data/%Y-%m-%d.logs'), 'a') as f:
			f.write('\n'.join(events))
			f.write('\n')
			events = []

	"""
	try:
		LOGs[win_name] += 1
	except:
		LOGs[win_name] = 1

	count += 1

	if count % 5 == 0:
		for k, v in LOGs.items():
			print (k,'\t',v)
	"""

	time.sleep(1)
