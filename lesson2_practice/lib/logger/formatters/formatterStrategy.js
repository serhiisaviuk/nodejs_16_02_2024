import * as constants from "../constants.js";
import config from "../config/config.js";
import defaultFormatter from "./default.js"
import jsonFormatter from "./json.js"

const formatters = {
    [constants.formatters.JSON]: jsonFormatter,
    [constants.formatters.DEFAULT]: defaultFormatter,
    [undefined]:defaultFormatter
}
function getFormatter(formatter){
    return formatters[formatter];
}

export {getFormatter}
