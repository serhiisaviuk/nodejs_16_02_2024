import fs from "fs";
import csvformatter from "../formatters/csv.js"
import * as fileAppender from "./file.js"

const HEADER = "Date,Level,Category,Message\n";

let appFileName;
let appFileErrorName;

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

function init(inputStream) {

    initFiles();

    fileAppender.init(inputStream, csvformatter, {
        logFileName: appFileName,
        logErrorFileName: appFileErrorName
    })
}

export default init;
