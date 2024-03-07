import config from "./config/config.js";
import {scoreLevel, level} from "./constants.js";
import * as appenderStrategy from "./appenders/appenderStrategy.js"
import {transformMessageLog} from "./util.js";

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

const appendersStream = appenderStrategy.initAppenders();

function executeLog(lvl, category, message = []) {
    if (scoreLevel[lvl] <= config.scoreLevel) {
        appendersStream.push({
            date: Date.now(),
            level:lvl,
            category,
            message:transformMessageLog(message)
        });
    }
}

process.on("beforeExit", ()=>{
    appendersStream.push(null)
})


export default {
    getLogger(category) {
        return logger(category);
    }
};


