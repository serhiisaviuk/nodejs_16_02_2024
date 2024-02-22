import fs from "fs";

const LOG_FILE_PATH = "./app.log"; //TODO Make configurable
const LOG_FILE_ERROR_PATH = "./app_error.log";

const log = formatter => (date, level, category, message) => {
    const logMessage = formatter(date, level, category, message) + "\n";
    appendLog(logMessage);
}

function appendLog(message) {
    fs.appendFileSync(LOG_FILE_PATH, message);
}

function init(formatter) {
    //INIT file?

    return {
        log: log(formatter)
    }
}

export default init;
