import * as constants from "../constants.js";
import config from "../config/config.js";
import consoleAppender from "./console.js"
import fileAppender from "./fileAppender.js";
import {getFormatter} from "../formatters/formatterStrategy.js";

const appenders = {
    [constants.appender.CONSOLE]: consoleAppender,
    [constants.appender.FILE]: fileAppender,
    [undefined]:consoleAppender
}
function getAppender(){
    const outputFormat = getFormatter(config.formatter);
    return appenders[config.appender](outputFormat);
}

export {getAppender}
