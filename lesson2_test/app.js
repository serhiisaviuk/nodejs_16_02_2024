import color from "./color.mjs"
import shape from "./shape.cjs"
import fruits from "./fruits.js"
import data from "./data.json" assert {type: "json"}
// let fruits = require("./fruits.js");

import logger from "./logger/logger.js";

const log = logger.getLogger("app.js");


// console.log(color);
// console.log(shape);
// console.log(fruits);
// console.log(data);

log.info(color)
log.error(color)
log.error(color)
log.info(shape)
log.info(fruits)
log.warn(fruits)
log.info(data)
