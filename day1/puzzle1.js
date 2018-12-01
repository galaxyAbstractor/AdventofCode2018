var input = ""; // numbers split by newlines

input = input.split("\n");

var result = 0;

input.forEach(function (number) {
    result = result + Number(number);
});

console.log(result);