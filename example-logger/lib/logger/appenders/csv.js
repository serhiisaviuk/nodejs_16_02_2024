import fs from "fs";
import csvformatter from "../formatters/csv.js"

const HEADER = "Date,Level,Category,Message\n";

let appFileName;
let appFileErrorName;
const log = formatter => (date, level, category, message) => {
    const logMessage = formatter(date, level, category, message) + "\n";
    appendLog(logMessage);

    if (level === "ERROR") {
        appendErrorFile(logMessage);
    }
}

async function appendLog(message) {
    await fs.promises.appendFile(appFileName, message);
}

async function appendErrorFile(message) {
    await fs.promises.appendFile(appFileErrorName, message);
}

function initFiles() {
    const fileName = createFileName();

    appFileName = fileName + ".csv";
    appFileErrorName = fileName + "_error.csv";

    const createFile = name => {
        if (!fs.existsSync(name)) {
            fs.appendFileSync(name, HEADER);
        }
    }

    createFile(appFileName);
    createFile(appFileErrorName);
}

function createFileName() {
    const padZeros = n => n.toString().padStart(2, "0")

    const date = new Date();

    return `app_${padZeros(date.getDay())}_${padZeros(date.getMonth() + 1)}_${date.getFullYear()}`;
}

function init() {

    initFiles();

    return {
        log: log(csvformatter)
    }
}

export default init;
