var input = ""; // ids split by newlines

input = input.split("\n");

var map = {};

input.forEach(function (id) {
    input.forEach(function (otherId) {
        if (id === otherId) return;

        map[similar(id, otherId)] = [id, otherId];
    })
});


var oneOf = map[25];

var result = oneOf[0].split("").reduce(function (previousValue, currentValue, index) {
    if (currentValue === oneOf[1].charAt(index)){
        return previousValue + oneOf[1].charAt(index);
    } else {
        return previousValue;
    }
}, "");

console.log(result);

function similar(a, b) {
    var equal = 0;

    for(var i = 0; i < a.length; i++) {
        if(a[i] === b[i]) {
            equal++;
        }
    }
    return equal;
}