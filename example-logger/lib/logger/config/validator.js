import * as constants from "../constants.js";

export function validateLogLevel(level) {
    return level && !!constants.level[level];
}

export function validateAppender(appender) {
    return appender && !!constants.appender[appender];
}

export function validateFormatter(formatter) {
    return formatter && !!constants.formatters[formatter];
}
