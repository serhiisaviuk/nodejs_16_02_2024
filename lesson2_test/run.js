let util = require('/Users/s.saviuk/work/ithillel/nodejs16022024/lesson1/util');

let stringify = require('../lesson1/stringify');

let sum = util.add(1, 2);

console.log(util.HOSTNAME);

console.log("REsult:", sum);

let obj = {
    a: 1,
    b: "My best string"
};

let result = stringify(obj);

console.log(result);

