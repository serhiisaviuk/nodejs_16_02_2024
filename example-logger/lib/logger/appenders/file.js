import fs from "fs";
import {Transform} from "stream";
import * as constants from "../constants.js";

const LOG_FILE_PATH = "./app.log"; //TODO Make configurable
const LOG_FILE_ERROR_PATH = "./app_error.log";

function initFilesStream(fileName, errorFileName) {
    const fileStream = fs.createWriteStream(fileName, {flags: "a+"});
    const fileErrorStream = fs.createWriteStream(errorFileName, {flags: "a+"});

    return {fileStream, fileErrorStream};
}

export function init(inputStream, formatter, {
    logFileName = LOG_FILE_PATH,
    logErrorFileName = LOG_FILE_ERROR_PATH
}) {

    const {fileStream, fileErrorStream} = initFilesStream(logFileName, logErrorFileName);

    inputStream.pipe(formatter.transformer()).pipe(fileStream);

    inputStream.pipe(new Transform({
        objectMode: true,
        transform(chunk, encoding, callback) {
            if (chunk.level === constants.level.ERROR) {
                callback(null, chunk);
            } else {
                callback();
            }
        }
    }))
        .pipe(formatter.transformer()).pipe(fileErrorStream);
}

export default (inputStream, formatter) => {
    init(inputStream, formatter, {
        logFileName: LOG_FILE_PATH,
        logErrorFileName: LOG_FILE_ERROR_PATH
    })
};
