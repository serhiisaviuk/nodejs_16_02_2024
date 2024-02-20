const INFO = 'INFO';
const WARN = 'WARN';
const ERROR = 'ERROR';


const levels = {
    [INFO]: 0,
    [WARN]: 1,
    [ERROR]: 2
}

const appenders = {
    console: "console"
}

export {
    INFO, WARN, ERROR,
    levels, appenders
}
