import {transformer} from "../formatters/default.js";

function init(inputStream, formatter) {

    const formatTransformer = transformer();

    inputStream.pipe(formatTransformer)
        .pipe(process.stdout);


    inputStream.on("log", (date, category, level, message) => {
        inputStream.push({date, category, level, message})
    })
}

export default init;
