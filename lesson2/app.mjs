import color from "./color.mjs";
import * as otherColors from "./color.mjs";
import {blue, default as colorDefault} from "./color.mjs";
import data from "./data.json" assert {type: "json"}


// import fruits from "./fruit.cjs";

// import {createRequire} from "node:module"
// const require = createRequire(import.meta.url);
//
// const fruit1 = require("./fruit.cjs");

console.log("DATA", data);

console.log(color);
console.log(otherColors);
console.log(blue);
console.log(colorDefault);
// console.log(fruits);
// console.log(fruit1);
