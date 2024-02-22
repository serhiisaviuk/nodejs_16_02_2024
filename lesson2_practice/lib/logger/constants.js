const level = {
    ERROR: "ERROR",
    WARN: "WARN",
    INFO: "INFO"
}

const scoreLevel = {
    [level.ERROR]: 1,
    [level.WARN]: 2,
    [level.INFO]: 3,
}

const appender = {
    CONSOLE: "CONSOLE",
    FILE: "FILE"
}

const formatters = {
    JSON: "JSON",
    DEFAULT:"DEFAULT"
}

export {level, scoreLevel, appender, formatters}
