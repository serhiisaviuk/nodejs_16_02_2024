import { Readable, Transform } from 'stream';
import fs from 'fs';

const readable = new Readable({
    objectMode: true,
    read() {}
});

const transform = new Transform({
    objectMode: true,
    transform(chunk, encoding, callback) {
        const filename = process.argv[1];
        this.push({ ...chunk, filename });
        callback();
    }
});

const writeStream = fs.createWriteStream('./test.log');

readable.push({ data: 'test' });
readable.push(null);
readable.pipe(transform).on("data", data =>{
    console.log(data);
})
    // .pipe(process.stdout);
