import * as constants from "./constants.js";
import consoleApp from "./appenders/console.js";

const appenders = {
    [constants.appenders.console]: () => {
        return consoleApp;
    },
    [undefined]: () => {
        return consoleApp;
    }
}

function getAppender(appender) {
    return appenders[appender]();
}

export default {getAppender};
