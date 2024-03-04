import fs from "fs";

const LOG_FILE_PATH = "./app.logger"; //TODO Make configurable
const LOG_FILE_ERROR_PATH = "./app_error.logger";

const logger = formatter => (date, level, category, message) => {
    const logMessage = formatter(date, level, category, message) + "\n";
    appendLog(logMessage);

    if (level === "ERROR") {
        appendErrorFile(logMessage);
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

    emitter.on("log", (...args) => {
        log(...args);
    });
}

export default init;
