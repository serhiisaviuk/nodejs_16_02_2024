import fs from "fs";

const LOG_FILE_PATH = "./app.log"; //TODO Make configurable
const LOG_FILE_ERROR_PATH = "./app_error.log";

const log = formatter => (date, level, category, message) => {
    const logMessage = formatter(date, level, category, message) + "\n";
    appendLog(logMessage);

    if(level === "ERROR"){
        appendErrorFile(logMessage);
    }
}

async function appendLog(message) {
    await fs.promises.appendFile(LOG_FILE_PATH, message);
}

async function appendErrorFile(message){
    await fs.promises.appendFile(LOG_FILE_ERROR_PATH, message);
}

function init(formatter) {

    return {
        log: log(formatter)
    }
}

export default init;
