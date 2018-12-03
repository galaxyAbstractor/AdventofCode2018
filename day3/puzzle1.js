var input = ""; // Input split by newlines

input = input.split("\n");

const regex = /(#\d+) @ (\d+),(\d+): (\d+)x(\d+)/gm;
var claims = {};

input.forEach(function (value) {
    let m;

    while ((m = regex.exec(value)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        // The result can be accessed through the `m`-variable.
        claims[m[1]] = {
            x: Number(m[2]),
            y: Number(m[3]),
            w: Number(m[4]),
            h: Number(m[5])
        }
    }
});

var cloth = {};

for (var key in claims) {
    var current = claims[key];

    var xMin = current.x;
    var yMin = current.y;
    var xMax = current.x + current.w;
    var yMax = current.y + current.h;

    var xCurr = xMin;
    var yCurr = yMin;

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

var overlaps = 0;

for (var y in cloth) {
    for (var x in cloth[y]) {
        if (cloth[y][x] > 1) {
            overlaps++;
        }
    }
}

console.log(overlaps);