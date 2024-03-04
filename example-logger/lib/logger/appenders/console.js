const logger = formatter => (date, level, category, message) => {
    console.log(formatter(date, level, category, message));
}

function init(emitter, formatter) {

    const log = logger(formatter);

    emitter.on("log", (...args) => {
        log(...args);
    })
}

export default init;
