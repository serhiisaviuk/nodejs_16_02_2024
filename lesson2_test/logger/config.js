import fs from "fs";
import path from "path";
import * as constants from "./constants.js";


const defaults = {
    level: constants.INFO,
    appender: constants.appenders.console
}

function getFileConfiguration() {
    const logConfigFilePath = process.env.LOG_CONFIG_FILE;
    if (logConfigFilePath) {
        // const path1 = path.parse(logConfigFilePath);
        const file = fs.readFileSync(logConfigFilePath, "utf-8");
        console.log(file);
        return JSON.parse(file);
    }
    return {};
}

function initConfig() {
    const configs = Object.assign(defaults, getFileConfiguration());

    if (process.env.LOG_LEVEL) {
        configs.level = process.env.LOG_LEVEL;
    }
    if (process.env.LOG_APPENDER) {
        configs.appender = process.env.LOG_APPENDER;
    }

    calculatePayload(configs);

    return configs;
}

function calculatePayload(configs) {
    configs.level = configs.level.toUpperCase();
    configs.levelScore = constants.levels[configs.level];
}

const configuration = initConfig();

function config() {
    return configuration;
}

export default config;
