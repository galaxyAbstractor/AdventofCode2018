let input = ""; // Input split by newlines

input = input.split("\n");

const regex = /(#\d+) @ (\d+),(\d+): (\d+)x(\d+)/gm;
const claims = {};

input.forEach(function (value) {
    let m;

    while ((m = regex.exec(value)) !== null) {
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        claims[m[1]] = {
            x: Number(m[2]),
            y: Number(m[3]),
            w: Number(m[4]),
            h: Number(m[5])
        }
    }
});

const cloth = {};

for (let key in claims) {
    let current = claims[key];

    let xMin = current.x;
    let yMin = current.y;
    let xMax = current.x + current.w;
    let yMax = current.y + current.h;

    let xCurr = xMin;
    let yCurr = yMin;

    for (; yCurr < yMax; yCurr++) {
        if (!cloth.hasOwnProperty(yCurr)) {
            cloth[yCurr] = {};
        }

        for (; xCurr < xMax; xCurr++) {
            if (!cloth[yCurr].hasOwnProperty(xCurr)) {
                cloth[yCurr][xCurr] = 1;
            } else {
                cloth[yCurr][xCurr]++;
            }
        }

        xCurr = xMin;
    }

}

let overlaps = 0;

for (let y in cloth) {
    for (let x in cloth[y]) {
        if (cloth[y][x] > 1) {
            overlaps++;
        }
    }
}

for (let key in claims) {
    let current = claims[key];

    let xMin = current.x;
    let yMin = current.y;
    let xMax = current.x + current.w;
    let yMax = current.y + current.h;

    let xCurr = xMin;
    let yCurr = yMin;

    let overlapped = false;

    for (; (yCurr < yMax) && !overlapped; yCurr++) {
        for (; (xCurr < xMax) && !overlapped; xCurr++) {
                if(cloth[yCurr][xCurr] > 1) {
                    overlapped = true;
                }
        }
        xCurr = xMin;
    }

    if (!overlapped) {
        console.log(key);
    }

}
