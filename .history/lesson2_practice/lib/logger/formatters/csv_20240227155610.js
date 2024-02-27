import { LOG_DELIMETTER } from '../envConstants.js';
function formatMessage(date, level, category, message) {
  const data = [
    date,
    category,
    level,
    message.map((el) => JSON.stringify(el)).join(LOG_DELIMETTER),
  ].join(',');
  return data + '\n';
}

export default { formatMessage };
