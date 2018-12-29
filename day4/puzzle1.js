var input = ""; // Input split by newlines

input = input.split("\n");

const regex = /\[(\d+)-(\d+)-(\d+) (\d+):(\d+)\] (.+)/gm;

const events = [];

input.forEach(function (event) {
    let m;

    while ((m = regex.exec(event)) !== null) {
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        events.push([Date.parse(Number(m[1]) + "-" + m[2] + "-" + m[3] + "T" + m[4] + ":" + m[5]), m[6]]);
    }
});

events.sort((a, b) => a[0] - b[0]);

let id = -1;
let startTime;
let asleepTime;
let wakeTime;

const idRegex = /(\d+)/gm;

const guards = {};

// Ugly
events.forEach(function(event) {
    let date = new Date(event[0]);

    if (event[1].indexOf("Guard") > -1) {
        let m;

        while ((m = idRegex.exec(event[1])) !== null) {
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }

            id = m[1];
            startTime = date;
        }

    } else if(event[1].indexOf("asleep") > -1) {
        asleepTime = date;
    } else {
        wakeTime = date;

        if (guards.hasOwnProperty(id)) {
            guards[id].total += wakeTime.getMinutes() - asleepTime.getMinutes() - 1;

            for (let x = asleepTime.getMinutes(); x < wakeTime.getMinutes() - 1; x++) {
                if (guards[id].minutes.hasOwnProperty(x)) {
                    guards[id].minutes[x]++;
                } else {
                    guards[id].minutes[x] = 1;
                }
            }

        } else {
            guards[id] = {};
            guards[id].total = wakeTime.getMinutes() - asleepTime.getMinutes() - 1;
            guards[id].minutes = {};

            for (let x = asleepTime.getMinutes(); x < wakeTime.getMinutes() - 1; x++) {
                guards[id].minutes[x] = 1;
            }
        }
    }
});

let guardArr = Object.keys(guards).map(function(key) {
    return [Number(key), guards[key]];
});

guardArr.sort(function (a, b) {
    return b[1].total - a[1].total;
});

let guardMostSleep = guardArr[0];

let minArr = Object.keys(guardMostSleep[1].minutes).map(function(key) {
    return [Number(key), guardMostSleep[1].minutes[key]];
});

minArr.sort(function (a, b) {
    return b[1] - a[1];
});
guardMostSleep[1].minutes = minArr[0];

console.log(guardMostSleep);