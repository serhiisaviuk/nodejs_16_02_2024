import {Readable, Transform} from "stream";
import fs from "fs";

const readable = new Readable({
    objectMode: true,
    read(size) {
    }
});


const transform = new Transform({
    objectMode: true,
    readableObjectMode: true,
    writableObjectMode: true,
    transform(chunk, encoding, callback) {

    }
});

transform.on('error', (err) => {
    console.log(err);
})

const writeStream = fs.createWriteStream("./test.log");

// const newVar = {data: "tsst"};
// const readable = Readable.from([newVar]);

readable.push({data: "test"});
// readable.push(null)

readable.pipe(transform).on('data', (data) => {
    console.log(data); // Виведення модифікованого об'єкта
});
// .pipe(process.stdout);
// readable.pipe(writeStream);

// readable.push("qweqweq");
// readable.push("TEST");
// readable.push("My log\n");
// readable.push("aaa\n");

// readable.push(null);

