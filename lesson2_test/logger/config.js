import fs from "fs";
import path from "path";
import * as constants from "./constants.js";

function readConfigFile(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, { encoding: "utf-8" });
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(`Error reading config file: ${error.message}`);
    return {};
  }
}

function initConfig() {
  const defaultConfig = {
    logLevel: constants.level.INFO,
    scoreLevel: constants.scoreLevel[constants.level.INFO],
    appender: constants.appender.CONSOLE,
    logConfigFile: process.env.LOG_CONFIG_FILE || "logger.json",
  };

  const logLevel = process.env.LOG_LEVEL?.toUpperCase();
  const appender = process.env.LOG_APPENDER?.toUpperCase();
  const logConfigFile = process.env.LOG_CONFIG_FILE;

  if (logConfigFile) {
    const fileConfig = readConfigFile(logConfigFile);
    Object.assign(defaultConfig, fileConfig);
  }

  if (logLevel && constants.level[logLevel]) {
    defaultConfig.logLevel = logLevel;
  }

  if (appender && constants.appender[appender]) {
    defaultConfig.appender = appender;
  }

  defaultConfig.scoreLevel = constants.scoreLevel[defaultConfig.logLevel];

  const validLogLevels = new Set(Object.values(constants.level));

  if (!validLogLevels.has(defaultConfig.logLevel)) {
    console.error(
      `Invalid LOG_LEVEL: ${defaultConfig.logLevel}. Using default level: ${constants.level.INFO}`
    );
    defaultConfig.logLevel = constants.level.INFO;
  }

  if (!constants.level[defaultConfig.logLevel]) {
    console.error(
      `Invalid LOG_LEVEL: ${defaultConfig.logLevel}. Using default level: ${constants.level.INFO}`
    );
    defaultConfig.logLevel = constants.level.INFO;
  }

  if (
    defaultConfig.logLevel === constants.level.DEBUG ||
    defaultConfig.logLevel === constants.level.TRACE
  ) {
    console.log("Enabling DEBUG/TRACE mode");
  }

  return defaultConfig;
}

const config = initConfig();

export default config;
