import * as constants from "../constants.js";
import config from "../config/config.js";
import consoleAppender from "./console.js"
import fileAppender from "./file.js";
import {getFormatter} from "../formatters/formatterStrategy.js";

const appenders = {
    [constants.appender.CONSOLE]: consoleAppender,
    [constants.appender.FILE]: fileAppender,
    [undefined]:consoleAppender
}

function getAppenders(){
    const outputFormat = getFormatter(config.formatter);

    return config.appenders
        .map(a => appenders[a])
        .map(a => a(outputFormat));
}

export {getAppenders}
