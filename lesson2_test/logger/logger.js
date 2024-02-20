import config from "./config.js";
import {ERROR, INFO, levels, WARN} from "./constants.js";
import appenderStrategy from "./appenderStrategy.js";

const conf = config();

const appender = appenderStrategy.getAppender(conf.appender);

const logger = (category) => ({
    info: (message) => {
        log(INFO, category, message);
    },
    warn: (message) => {
        log(WARN, category, message);
    },
    error: (message) => {
        log(ERROR, category, message);
    }
})

function log(level, category, message) {
    const score = levels[level];
    if (score <= conf.levelScore) {
            const date = new Date().toUTCString();
            appender(date, level, category, message);
        }
}


export default {
    getLogger: (category) => {
        return logger(category);
    }
}
