var input = ""; // numbers split by newlines

input = input.split("\n");

var result = 0;

var frequencies = [];

for (var i = 0; i < input.length; i++) {
    result = result + Number(input[i]);

    if (frequencies.indexOf(result) === -1) {
        frequencies.push(result);
    } else {
        break;
    }

    if (i + 1 === input.length) {
        i = -1;
    }
}

console.log(result);