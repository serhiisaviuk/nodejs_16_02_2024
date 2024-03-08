const level = {
    ERROR: "ERROR",
    WARN: "WARN",
    INFO: "INFO",
    DEBUG: "DEBUG",
    TRACE: "TRACE"
}

const scoreLevel = {
    [level.ERROR]: 1,
    [level.WARN]: 2,
    [level.INFO]: 3,
    [level.DEBUG]: 4,
    [level.TRACE]: 5
}

const appender = {
    CONSOLE: "CONSOLE",
    FILE: "FILE",
    CSV: "CSV"
}

const formatters = {
    DEFAULT:"DEFAULT",
    JSON: "JSON",
    CSV: "CSV"
}

const DELIMITER = " "

export {level, scoreLevel, appender, formatters, DELIMITER}
