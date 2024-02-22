const level = {
  ERROR: 'ERROR',
  WARN: 'WARN',
  INFO: 'INFO',
  DEBUG: 'DEBUG',
  TRACE: 'TRACE',
};

const scoreLevel = {
  [level.ERROR]: 1,
  [level.WARN]: 2,
  [level.INFO]: 3,
  [level.DEBUG]: 4,
  [level.TRACE]: 5,
};

const appender = {
  CONSOLE: 'CONSOLE',
  FILE: 'FILE',
};

export { level, scoreLevel, appender };
