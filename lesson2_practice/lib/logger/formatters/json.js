function formatMessage(date, level, category, message) {
  const data = {
    date,
    category,
    level,
    message: JSON.stringify(message, null, 2),
  };
  return JSON.stringify(data, null, 2) + ',';
}

export default { formatMessage };
