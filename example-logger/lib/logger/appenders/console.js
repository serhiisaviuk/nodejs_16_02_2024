import {Readable} from "stream"
import FilenameTransformer from "../transformers/filenameTransformer.js";

import {transformer} from "../formatters/default.js";

function init(emitter, formatter) {

    const filenameTransformer = new FilenameTransformer();
    const formatTransformer = transformer();

    const readable = new Readable({
        objectMode: true, read(size) {
        }
    });

    readable.pipe(filenameTransformer).pipe(formatTransformer)
        .pipe(process.stdout);


    emitter.on("log", (date, category, level, message) => {
        readable.push({date, category, level, message})
    })
}

export default init;
