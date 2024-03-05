import {Transform} from "stream";

export default class FilenameTransformer extends Transform {
    constructor(options) {
        super({...options, objectMode: true});
    }


    _transform(chunk, encoding, callback) {
        const filename = process.argv[1];
        this.push({...chunk, filename});
        callback();
    }
}
