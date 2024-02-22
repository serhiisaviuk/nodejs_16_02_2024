import * as constants from './constants.js';
import { LOG_LEVEL, LOG_APPENDER } from './envConstants.js';

const defaultConfig = {
  logLevel: LOG_LEVEL || constants.level.INFO,
  scoreLevel: constants.scoreLevel[constants.level.INFO],
  appender: LOG_APPENDER || constants.appender.CONSOLE,
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
