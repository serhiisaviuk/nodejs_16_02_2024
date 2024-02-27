import config from './config.js';
import { scoreLevel, level } from './constants.js';
import * as appenderStrategy from './appenderStrategy.js';
import * as formatterStrategy from './formatterStrategy.js';

const logger = (category) => ({
  info: (...message) => {
    executeLog(level.INFO, category, message);
  },
  warn: (...message) => {
    executeLog(level.WARN, category, message);
  },
  error: (...message) => {
    executeLog(level.ERROR, category, message);
  },
  debug: (...message) => {
    executeLog(level.DEBUG, category, message);
  },
  trace: (...message) => {
    executeLog(level.TRACE, category, message);
  },
});

const appender = appenderStrategy.getAppender();
const formatter = formatterStrategy.getFormatter();

function executeLog(level, category, message) {
  if (scoreLevel[level] <= config.scoreLevel) {
    for (const iterator of appender) {
      iterator.log(
        formatter.formatMessage(Date.now(), level, category, message),
        level
      );
    }
  }
}

export default {
  getLogger(category) {
    return logger(category);
  },
};
