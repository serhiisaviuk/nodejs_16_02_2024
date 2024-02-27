import { LOG_DELIMETTER } from '../envConstants.js';
function formatMessage(date, level, category, message, newRow = true) {
  return `Date: ${date}, category:${category}, level:${level}, message:${message
    .map((el) => JSON.stringify(el))
    .join(LOG_DELIMETTER)}${newRow ? '\n' : ''}`;
}

export default { formatMessage };
