import fs from "fs";
import {validateLogLevel, validateAppender, validateFormatter} from "./validator.js";

const path = process.env.LOG_CONFIG_FILE;

function handleAppenders(appenders = []) {
    return appenders.map(a => a.toUpperCase()).filter(validateAppender);
}

export function configFromFile() {

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

        const appenders = handleAppenders(configFile.appenders);
        if (appenders.length > 0) {
            config.appenders = appenders;
        }

        const formatter = configFile.outputFormat.toUpperCase();
        if (validateFormatter(formatter)) {
            config.formatter = formatter;
        }

    } catch (e) {
        // TODO can't read file, throw error!
        console.log(e);
    }

    return config;

}

export default {configFromFile}
