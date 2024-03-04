import EventEmitter from "node:events";

import * as constants from "../constants.js";
import config from "../config/config.js";
import consoleAppender from "./console.js"
import fileAppender from "./file.js";
import csvAppender from "./csv.js";
import {getFormatter} from "../formatters/formatterStrategy.js";

const appenders = {
    [constants.appender.CONSOLE]: consoleAppender,
    [constants.appender.FILE]: fileAppender,
    [constants.appender.CSV]: csvAppender,
    [undefined]: consoleAppender
}

const appenderEmitter = new EventEmitter();

function initAppenders() {
    const outputFormat = getFormatter(config.formatter);

    config.appenders
        .map(a => appenders[a])
        .filter(a => !!a)
        .map(a => a(appenderEmitter, outputFormat));

    return appenderEmitter;
}

export {initAppenders}
