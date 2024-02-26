import * as constants from './constants.js';
import { LOG_LEVEL, LOG_APPENDER, LOG_FORMATTER } from './envConstants.js';

const defaultConfig = {
  logLevel: LOG_LEVEL || constants.level.INFO,
  scoreLevel: constants.scoreLevel[constants.level.INFO],
  appender: LOG_APPENDER || constants.appender.CONSOLE,
  formater: LOG_FORMATTER || constants.formatter.DEFAULT,
};

function enrichConfig(config) {
  config.scoreLevel = constants.scoreLevel[config.logLevel];
}

function initConfig() {
  const config = defaultConfig;
  enrichConfig(config);
  return config;
}

const config = initConfig();
export default config;
