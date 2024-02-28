import fs from "fs";
import path from "path";
import * as readline from "readline";

const readStream = fs.createReadStream(path.join("./", "log.txt"), {encoding: "utf8"});


const rl = readline.createInterface({
    input: readStream
});


rl.on("line", (input ) =>{
    console.log("LINE:", input);
})

readStream.on("open", () => {
    console.log("File read STARTED");
})
// readStream.on("data", (chunk) => {
//     console.log("chunk", chunk);
// })

readStream.on('end', () => {
    console.log("File read finished");
})
