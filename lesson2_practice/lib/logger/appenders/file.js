import fs from 'fs';
import { formatMessage } from '../helper/utils.js';
import { MAIN_LOG_FILE, ERROR_LOG_FILE } from '../envConstants.js';
import { level as constLevele } from '../constants.js';

function appendCallback(err) {
  if (err) {
    console.log(err);
  }
}

function log(date, level, category, message) {
  const text = formatMessage(date, level, category, message, true);
  fs.appendFile(MAIN_LOG_FILE, text, appendCallback);
  if (level === constLevele.ERROR) {
    fs.appendFile(ERROR_LOG_FILE, text, appendCallback);
  }
  return;
}

export default { log };
