import {Readable, Transform} from "stream";
import fs from "fs";


const transform1 = new Transform({
    encoding: "utf8",
    transform(chunk, encoding, callback) {
        const s = chunk.toString("utf8").toUpperCase();
        callback(null, s)
    }
});


class NewLineTransformer extends Transform {
    constructor(options) {
        super(options);
    }

    _transform(chunk, encoding, callback) {
        const s = chunk.toString("utf8") + "\n";
        callback(null, s);
    }
}


const readable = new Readable({
    encoding: "utf8",
    read(size) {
    }
});


const writeStream = fs.createWriteStream("./test.log", {flags: "a+"});

// writeStream.write("DATAAAAA")

// const transformStream =


readable.pipe(transform1).pipe(new NewLineTransformer()).pipe(writeStream)
readable.pipe(new NewLineTransformer()).pipe(process.stdout);


// Transform -> DUPLEX -> Readable , Writable
// transformStream.write("test");


readable.push("qwe")
readable.push("qwe")
readable.push("qwe")
readable.push("qwe")


writeStream.on("close", ()=>{
    console.log("I'm closing");
})

transform1.on("close", ()=>{
    console.log("TRANS close");
})
process.on("beforeExit", ()=>{
    readable.push(null);
    // transform1.end()
    // writeStream.end();
})



const queue = [];

