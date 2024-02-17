let util = require('./util');
let stringify = require('./stringify');

let sum = util.add(1, 2);


// console.log(util.HOSTNAME);
//
// console.log("REsult:", sum);

let obj = {
    a: 1,
    b: "My best string"
};

let result = stringify(obj);

console.log(result);
console.log(require('./stringify')(obj));
console.log(require('./stringify')(obj));
console.log(require('./stringify')(obj));


require('./test2')

// console.log(util.multiple("g1", 2,3));
// console.log(util.multiple("g1", 2,3));
// console.log(util.multiple("g1", 2,3));
// console.log(util.multiple("g2", 4,3));
