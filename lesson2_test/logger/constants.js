const level = {
  ERROR: "ERROR",
  INFO: "INFO",
  WARN: "WARN",
  DEBUG: "DEBUG",
  TRACE: "TRACE",
};

const appender = {
  CONSOLE: "CONSOLE",
};

const scoreLevel = {
  [level.ERROR]: 1,
  [level.INFO]: 2,
  [level.WARN]: 3,
  [level.DEBUG]: 4,
  [level.TRACE]: 5,
};

export { level, scoreLevel, appender };
