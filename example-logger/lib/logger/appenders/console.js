const logger = formatter => (date, level, category, message) => {
    const data = formatter(date, level, category, message) + '\n';

    process.stdout.write(data);
}

function init(emitter, formatter) {

    const log = logger(formatter);

    emitter.on("log", (...args) => {
        log(...args);
    })
}

export default init;
