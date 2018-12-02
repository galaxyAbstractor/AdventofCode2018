var input = ""; // ids split by newlines

input = input.split("\n");

var two = 0;
var three = 0;

input.forEach(function (id) {

    var counts = {};

    for (var i = 0; i < id.length; i++) {
        if (counts.hasOwnProperty(id[i])) {
            counts[id[i]]++;
        } else {
            counts[id[i]] = 1;
        }
    }

    var vals = Object.values(counts).filter(function (value) { return value !== 1 }).sort(function (a, b) { return a < b});

    if (vals.includes(3)) three++;
    if (vals.includes(2)) two++;
});

console.log(two * three);