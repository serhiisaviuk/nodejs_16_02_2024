import fs from "fs";

function log(date, level, category, message) {
  const logMessage = formatMessage(date, level, category, message);
  fs.appendFileSync("app.log", logMessage + "\n", { flag: "a" });
}

function formatMessage(date, level, category, message) {
  return `Data: ${date}, level: ${level}, category: ${category} message: ${JSON.stringify(
    message
  )}`;
}

export default { log };
