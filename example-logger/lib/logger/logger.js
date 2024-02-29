import config from "./config/config.js";
import {scoreLevel, level} from "./constants.js";
import * as appenderStrategy from "./appenders/appenderStrategy.js"

const logger = (category) => ({
    trace: (...message) => {
        executeLog(level.TRACE, category, message)
    },
    debug: (...message) => {
        executeLog(level.DEBUG, category, message)
    },
    info: (...message) => {
        executeLog(level.INFO, category, message)
    },
    warn: (...message) => {
        executeLog(level.WARN, category, message)
    },
    error: (...message) => {
        executeLog(level.ERROR, category, message)
    }
});

const appender = appenderStrategy.getAppender();

function executeLog(level, category, message = []) {
    const data = message.join(" ");
    if (scoreLevel[level] <= config.scoreLevel) {
        appender.log(Date.now(), level, category, data);
    }
}


export default {
    getLogger(category) {
        return logger(category);
    }
};
