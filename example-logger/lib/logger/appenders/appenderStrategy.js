import {Readable} from "stream";
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

function initAppenders() {
    const outputFormat = getFormatter(config.formatter);


    const inputStream = new Readable({
        objectMode: true,
        read(size) {
        }
    });

    const stream = inputStream.pipe(new FilenameTransformer());

    config.appenders
        .map(a => appenders[a])
        .filter(a => !!a)
        .map(a => a(stream, outputFormat));

    return inputStream;
}

export {initAppenders}
