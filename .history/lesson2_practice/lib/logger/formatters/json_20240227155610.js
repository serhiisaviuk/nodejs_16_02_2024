import { LOG_DELIMETTER } from '../envConstants.js';
function formatMessage(date, level, category, message) {
  const data = {
    date,
    category,
    level,
    message: message.map((el) => JSON.stringify(el)).join(LOG_DELIMETTER),
  };
  return JSON.stringify(data, null, 2) + ',';
}

export default { formatMessage };
