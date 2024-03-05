import fs from "fs";

const LOG_FILE_PATH = "./app.log"; //TODO Make configurable
const LOG_FILE_ERROR_PATH = "./app_error.log";

let fileStream;
let fileErrorStream;
const logger = formatter => (date, level, category, message) => {
    const logMessage = formatter(date, level, category, message) + "\n";
    // appendLog(logMessage);
    fileStream.write(logMessage);
    if (level === "ERROR") {
        fileErrorStream.write(logMessage)
    }
}

async function appendLog(message) {

    await fs.promises.appendFile(LOG_FILE_PATH, message);
}

async function appendErrorFile(message) {
    await fs.promises.appendFile(LOG_FILE_ERROR_PATH, message);
}

function init(emitter, formatter) {

    const log = logger(formatter);
    fileStream = fs.createWriteStream(LOG_FILE_PATH, {flags: "a+"});
    fileErrorStream = fs.createWriteStream(LOG_FILE_ERROR_PATH, {flags: "a+"});

    process.on("beforeExit", () => {
        fileStream.end();
        fileErrorStream.end();
    })


    emitter.on("log", (...args) => {
        log(...args);
    });
}

export default init;
