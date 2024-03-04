import * as constants from "../constants.js";
import {configFromFile} from "./configFile.js";
import {configFromEnvs} from "./configEnv.js"


const defaultConfig = {
    logLevel: constants.level.INFO,
    scoreLevel: constants.scoreLevel[constants.level.INFO],
    appenders: [constants.appender.CONSOLE],
    formatter: constants.formatters.DEFAULT,
    delimiter: constants.DELIMITER
}

function enrichConfig(config) {
    config.scoreLevel = constants.scoreLevel[config.logLevel]
}

function initConfig() {
    const config = Object.assign(defaultConfig, configFromFile(), configFromEnvs());

    enrichConfig(config);

    return config;
}

const config = initConfig();
export default config;
