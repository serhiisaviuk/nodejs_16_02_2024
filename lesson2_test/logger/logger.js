import config from "./config.js";
import { scoreLevel, level } from "./constants.js";
import * as appenderStrategy from "./appenderStrategy.js";

const logger = (category) => ({
  info: (message) => {
    executedLog(level.INFO, category, message);
  },
  warn: (message) => {
    executedLog(level.WARN, category, message);
  },
  error: (message) => {
    executedLog(level.ERROR, category, message);
  },
});

const appender = appenderStrategy.getAppender();

function executedLog(level, category, message) {
  if (scoreLevel[level] <= config.scoreLevel) {
    appender.log(Date.now(), level, category, message);
  }
}

export default {
  getLogger(category) {
    return logger(category);
  },
};
