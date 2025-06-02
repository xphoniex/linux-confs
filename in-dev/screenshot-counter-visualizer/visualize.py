import os

from datetime import datetime

counts = []
dates = []

x1 = [] # dates
y1 = [] # counts

with open(os.path.dirname(__file__) + '/screenshot_ts.txt') as f:
    for line in f:
        l = line.rstrip().lstrip()
        count, date = l.split(' ')

        #counts.append(int(count))
        #dates.append(date)

        y1.append(int(count))
        x1.append(datetime.strptime(date, "%Y-%m-%d"))


        #print (count, " -- ", date)

x2 = [] # dates
y2 = [] # switches * 2

with open(os.path.dirname(__file__) + '/timetracker_ts.txt') as f:
    for line in f:
        l = line.rstrip().lstrip()
        switches, date = l.split(' ')
        y2.append(int(switches)/10)
        #x2.append(date)
        x2.append(datetime.strptime(date, "%Y-%m-%d"))



import matplotlib.pyplot as plt
import numpy as np

plt.style.use('_mpl-gallery')

        # make data
        #x = np.linspace(0, 10, 100)
        #y = 4 + 1 * np.sin(2 * x)
        #x2 = np.linspace(0, 10, 25)
        #y2 = 4 + 1 * np.sin(2 * x2)

        ## plot
        #fig, ax = plt.subplots()
        #
        #ax.plot(x2, y2 + 2.5, 'x', markeredgewidth=2)
        #ax.plot(x, y, linewidth=2.0)
        #ax.plot(x2, y2 - 2.5, 'o-', linewidth=2)
        #
        #ax.set(xlim=(0, 8), xticks=np.arange(1, 8),
        #       ylim=(0, 8), yticks=np.arange(1, 8))

#x1 = dates
#y1 = counts

fig, ax = plt.subplots()

ax.stairs(y2[:-1],x2, linewidth=0.75, color='gray')
ax.stairs(y1[:-1],x1, linewidth=0.75, alpha=0.5)

#ax.tick_params(axis='x', labelrotation=90)
#plt.plot(x,y)

#ax.set(xlim=(dates[0], dates[-1]))
ax.set(xlim=(x1[0], x1[-1]))
#plt.tight_layout()

plt.show()

#fig, ax = plt.subplots()
#ax.stairs(y, linewidth=1)
#max_x = len(x)
#max_y = max(y) + 20
#ax.set(xlim=(0,max_x), xticks=np.arange(1, max_x),
#        ylim=(0,max_y), yticks=np.arange(1, max_y))
#plt.show()
