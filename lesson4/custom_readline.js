import fs from "fs";
import EventEmitter from "node:events";

const readline = new EventEmitter();


// const buffer = new Buffer(1024);

const buffer = [];
readline.on('line', (line) => {
    console.log("LINE", line);
});

function emitLine() {
    let s = "";
    while (buffer.length > 0) {
        const value = buffer.pop();
        s += value;
    }

    if(s !== ""){
        readline.emit("line", s);
    }
}

const readStream = fs.createReadStream("log.txt", {encoding: "utf8", highWaterMark: 1});

readStream.on("data", chunk => {

    if (chunk === "\n") {
        emitLine();
    } else {
        buffer.push(chunk);
    }
})

readStream.on("end", () => {
    emitLine();
    console.log("File finished");
})
