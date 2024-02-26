function formatMessage(date, level, category, message) {
  const data = [date, category, level, JSON.stringify(message)].join(',');
  return data + '\n';
}

export default { formatMessage };
