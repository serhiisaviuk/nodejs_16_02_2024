import fs from "fs";
import path from "path";
import {Transform, pipeline} from "stream";


const readStream = fs.createReadStream(path.join("./", "log.txt"), {encoding: "utf8"});
const writeStream = fs.createWriteStream(path.join("./", "log1.txt"), {encoding: "utf8", flags:"a+"});



const transform = new Transform({
    transform(chunk, encoding, callback) {
        const s = chunk.toString();
        const all = s.replaceAll("Log", "\nLOGGER");
        console.log('Transform');
        callback(null, all);
    }
});

const transform_lower = new Transform({
    transform(chunk, encoding, callback) {
        const s = chunk.toString();

        callback(null, s.toLowerCase());
    }
});



// const pipeline1 = pipeline(readStream, transform,transform_lower, writeStream, (err) =>{
//     console.log(err);
// });


console.log("before stream");
const stream = readStream.pipe(transform).pipe(writeStream);
console.log("After stream");

stream.on("finish",()=>{
    console.log("File finished");
} )

// writeStream.on("open", ()=>{
//     console.log("File opened");
// });
//
// writeStream.on("finish", ()=>{
//     console.log("File finished");
// });
//
// writeStream.write("Log1")
// writeStream.write("Log1")
// writeStream.write("Log1")
// writeStream.write("Log1")
// writeStream.write("Log2")
// writeStream.write("Log3")
// writeStream.write("Log4")
//
// writeStream.end(()=>{
//     console.log("File ended");
// })
//
