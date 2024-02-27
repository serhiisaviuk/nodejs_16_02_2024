import * as constants from './constants.js';
import config from './config.js';
import consoleAppender from './appenders/console.js';
import fileAppender from './appenders/file.js';

const appenders = {
  [constants.appender.CONSOLE]: consoleAppender,
  [constants.appender.FILE]: fileAppender,
  [undefined]: consoleAppender,
};
function getAppender() {
  const appendersRes = [];
  for (const iterator of config.appender) {
    appendersRes.push(appenders[iterator]);
  }
  return appendersRes;
}

export { getAppender };
