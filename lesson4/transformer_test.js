import { Transform, Readable } from 'stream';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

class AddFilenameTransform extends Transform {
    constructor(options) {
        super({ ...options, objectMode: true });
    }

    _transform(chunk, encoding, callback) {
        const filename = path.basename(__filename);
        const modifiedChunk = { ...chunk, filename };
        this.push(modifiedChunk);
        callback();
    }
}

const addFilenameTransform = new AddFilenameTransform();

const exampleObject = { data: 'Деякі дані' };
const objectStream = Readable.from([exampleObject]);

objectStream.pipe(addFilenameTransform).on('data', (data) => {
    console.log(data);
});
