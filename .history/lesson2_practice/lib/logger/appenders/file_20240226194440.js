import fs from 'fs';
import { MAIN_LOG_FILE, ERROR_LOG_FILE } from '../envConstants.js';
import { level as constLevele } from '../constants.js';

function appendCallback(err) {
  if (err) {
    console.log(err);
  }
}

async function log(message, level) {
  try {
    fs.promises.appendFile(MAIN_LOG_FILE, message);
    if (level === constLevele.ERROR) {
      fs.appendFile(ERROR_LOG_FILE, message, appendCallback);
    }
  } catch (err) {
    console.log(err);
  }
  fs.promises.appendFile(MAIN_LOG_FILE, message, appendCallback);

  return;
}

export default { log };
