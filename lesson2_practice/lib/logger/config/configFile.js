import fs from "fs";
import {validateLogLevel, validateAppender} from "./validator.js";

const path = process.env.LOG_CONFIG_FILE;

function configFromFile() {

    const config = {};

    if (!path) {
        return config;
    }

    try {
        const configFile = JSON.parse(fs.readFileSync(path, "utf8")) ?? {};

        if (validateLogLevel(configFile.logLevel)) {
            config.logLevel = configFile.logLevel;
        }

        if (validateAppender(configFile.appender)) {
            config.appender = configFile.appender;
        }

    } catch (e) {
        // TODO can't read file, throw error!
    }

    return config;

}

export default {configFromFile}
