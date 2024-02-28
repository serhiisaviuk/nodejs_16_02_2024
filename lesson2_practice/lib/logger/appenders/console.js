const log = formatter => (date, level, category, message) => {
    console.log(formatter(date, level, category, message));
}

function init(formatter) {
    return {log: log(formatter)}
}

export default init;
