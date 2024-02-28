import fs from "fs";
import {validateLogLevel, validateAppender, validateFormatter} from "./validator.js";

const path = process.env.LOG_CONFIG_FILE;

function configFromFile() {

    const config = {};

    if (!path) {
        return config;
    }

    try {
        const configFile = JSON.parse(fs.readFileSync(path, "utf8")) ?? {};

        const logLevel = configFile.logLevel.toUpperCase();
        if (validateLogLevel(logLevel)) {
            config.logLevel = logLevel;
        }

        const appender = configFile.appender.toUpperCase();
        if (validateAppender(appender)) {
            config.appender = appender;
        }

        const formatter = configFile.outputFormat.toUpperCase();
        if(validateFormatter(formatter)){
            config.formatter = formatter;
        }

    } catch (e) {
        // TODO can't read file, throw error!
    }

    return config;

}

export default {configFromFile}
