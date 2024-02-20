import * as constants from "./constants.js";

const defaultConfig = {
    logLevel: constants.level.INFO,
    scoreLevel: constants.scoreLevel[constants.level.INFO],
    appender: constants.appender.CONSOLE
}

function enrichConfig(config) {
    config.scoreLevel = constants.scoreLevel[config.logLevel]
}

function initConfig() {
    const config = defaultConfig;

    const logLevel = process.env.LOG_LEVEL?.toUpperCase();
    const appender = process.env.LOG_APPENDER?.toUpperCase();

    if(logLevel){
        //TODO check for ifExist
        config.logLevel = logLevel
    }

    if(appender){
        //TODO check for ifExist
        config.appender = appender
    }

    enrichConfig(config);

    return config;
}

const config = initConfig();
export default config;
