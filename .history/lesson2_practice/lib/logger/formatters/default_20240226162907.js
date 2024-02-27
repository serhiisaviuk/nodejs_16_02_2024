function formatMessage(date, level, category, message, newRow = true) {
  return `Date: ${date}, category:${category}, level:${level}, message:${JSON.stringify(
    message
  )}${newRow ? '\n' : ''}`;
}

export default { formatMessage };
