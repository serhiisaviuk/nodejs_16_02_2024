import {Transform} from "stream";

function transformer() {
    return new Transform({
        objectMode: true,
        transform(chunk, encoding, callback) {
            callback(null, JSON.stringify(chunk) + '\n');
        }
    })
}


export default {
    transformer
}
