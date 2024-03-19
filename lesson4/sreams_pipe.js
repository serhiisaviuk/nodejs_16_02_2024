import {Readable, Writable, Transform, PassThrough} from "stream"


const formatTrans = new Transform({
    encoding: "utf8",
    transform(chunk, encoding, callback) {
        callback(null, chunk.toString("utf8").toUpperCase());
    }
});

const errorTrans = new Transform({
    encoding: "utf8",
    transform(chunk, encoding, callback) {
        callback(null, "ERROR " + chunk.toString("utf8"));
    }
});


const readable = new Readable({encoding: "utf8"});

const writable1 = new Writable({
    encoding: "utf8",
    write(chunk, encoding, callback) {
        console.log("writable1:", chunk.toString("utf8"));
        callback();
    }
});

const writable2 = new Writable({
    encoding: "utf8",
    write(chunk, encoding, callback) {
        console.log("writable2:", chunk.toString("utf8"));
        callback();
    }
});


const passThrough = new PassThrough({
    transform(chunk, encoding, callback) {
        callback(null, chunk);
    }
});


readable.pipe(formatTrans).pipe(writable1);

readable.pipe(errorTrans).pipe(formatTrans).pipe(writable2);




readable.push("TEst")
readable.push("TEst1")
readable.push("TEst2")

readable.push("ERROR")

// passThrough.write("new ERROR")


readable.push(null);


// readable.on("data", (data)=>{
//     // console.log("my data", data);
//
//     if(data === "ERROR"){
//         errorTrans.write(data);
//     }
// })
