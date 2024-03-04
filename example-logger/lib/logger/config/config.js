import * as constants from "../constants.js";
import configFile from "./configFile.js";
import {validateLogLevel, validateAppender, validateFormatter} from "./validator.js";


const defaultConfig = {
    logLevel: constants.level.INFO,
    scoreLevel: constants.scoreLevel[constants.level.INFO],
    appender: constants.appender.CONSOLE,
    formatter: constants.formatters.DEFAULT,
    delimiter: constants.DELIMITER
}

function enrichConfig(config) {
    config.scoreLevel = constants.scoreLevel[config.logLevel]
}

function getConfigFromEnvs() {
    const logLevel = process.env.LOG_LEVEL?.toUpperCase();
    const appender = process.env.LOG_APPENDER?.toUpperCase();
    const formatter = process.env.LOG_OUTPUT_FORMAT?.toUpperCase();
    const delimiter = process.env.LOG_DELIMITER?.toUpperCase();

    const config = {}
    if (validateLogLevel(logLevel)) {
        config.logLevel = logLevel
    }

    if (validateAppender(appender)) {
        config.appender = appender
    }

    if(validateFormatter(formatter)){
        config.formatter = formatter;
    }

    if(delimiter){
        config.delimiter = delimiter;
    }

    return config;
}

function initConfig() {
    const config = Object.assign(defaultConfig, configFile.configFromFile(), getConfigFromEnvs());

    enrichConfig(config);

    return config;
}

const config = initConfig();
export default config;
