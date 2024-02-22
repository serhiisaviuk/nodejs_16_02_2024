import { formatMessage } from '../helper/utils.js';

function log(date, level, category, message) {
  console.log(formatMessage(date, level, category, message));
}

export default { log };
