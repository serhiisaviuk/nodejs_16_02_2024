// const color = require("./color.mjs");
const shape = require("./shape.cjs");
const fruits = require("./fruits.js");

// console.log(color);
console.log(shape);
console.log(fruits);


(async () => {
    // let fruits_m = await import("./fruits_m.js");
    let fruits = await import("./color.mjs");
    // console.log(fruits_m);
    console.log(fruits);

})();
