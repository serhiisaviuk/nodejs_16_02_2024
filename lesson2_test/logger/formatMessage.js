function formatMessage(date, level,name, message) {
    return `Date: ${date}, category:${name}, level: ${level}, message: ${JSON.stringify(message)}`;
}

export default formatMessage;
