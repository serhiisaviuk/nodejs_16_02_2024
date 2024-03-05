import EventEmitter from "node:events";
import {Readable} from "stream"

import * as constants from "../constants.js";
import config from "../config/config.js";
import consoleAppender from "./console.js"
import fileAppender from "./file.js";
import csvAppender from "./csv.js";
import {getFormatter} from "../formatters/formatterStrategy.js";
import FilenameTransformer from "../transformers/filenameTransformer.js";

const appenders = {
    [constants.appender.CONSOLE]: consoleAppender,
    [constants.appender.FILE]: fileAppender,
    [constants.appender.CSV]: csvAppender,
    [undefined]: consoleAppender
}

// const appenderEmitter = new EventEmitter();
const readable = new Readable({
    objectMode: true, read(size) {
    }
});

function initAppenders() {
    const outputFormat = getFormatter(config.formatter);

    const filenameTransformer = new FilenameTransformer();
    readable.pipe(filenameTransformer)

    config.appenders
        .map(a => appenders[a])
        .filter(a => !!a)
        .map(a => a(filenameTransformer, outputFormat));

    return filenameTransformer;
}

export {initAppenders}
