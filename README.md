# MRR toolkit

I wanted to generate a lightweight universal class I could leverage for productivity, tracking, and general Javascript enhancements. The idea is I can create a class, and then use a bookmarklet to generate/access the available toolkit.

## Epoch('1999-12-31 GMT-0700')

While playing around with the concept of a personal 'epoch'. The days since I was born. I've also explored a version of metric time. Each day is divided into 1000 "moments" (86.4 seconds) or 10000 "ticks" (8.64 seconds). Generate Epoch Class with your DOB datestamp to track personal epoch date.

### e.visualTickTock()

Converts the page into a grid of 1000 boxes, Filling from the beginning to end of the day.

### e.tabCountdown('00:00')

Creates a metric time countdown timer in the browser tab. Omit parameter to default a prompt dialog.

### e.tabClock()

Creates a metric time clock in the browser tab.

### e.duration('00:00')

A helpful method for converting hours + minutes into metric time.