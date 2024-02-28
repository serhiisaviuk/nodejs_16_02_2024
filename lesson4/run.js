'use strict'

import EventEmitter from "node:events";
import fs from "fs";

const ee = new EventEmitter();


const delay = (ms) => {
    const now = Date.now();
    while (Date.now() - now <= ms) {
    }
}

const sleep = async ms => new Promise(resolve => setTimeout(resolve, ms));


console.log("Start");

ee.on("event", async () => {
    // setTimeout(()=>{
    console.log("Event 1");
    // }, 5000)
    // delay(5000)
});


ee.on("event", () => {
    console.log("EVENT 2");
})
ee.on("log", (date, category, message) => {
    console.log("LOG 1", date, category, message);
});

ee.on("log", (date, category, message) => {
    fs.appendFile("./log.txt", JSON.stringify({date, category, message}), (err) => {
        console.log(err);
    });
});

const listener = () => {
    console.log("ONCE EVENT");
};

ee.once("event", listener)

ee.prependListener("event", () => {
    console.log("I'm FIRST");
})

ee.removeListener("event", listener);
ee.removeAllListeners("event")

// console.log(ee.eventNames());
//
// ee.emit("event");
// ee.emit("event");

// const server = new Server();
//
// server.on("connect", ()=>{
//
// })

// ee.emit("log", new Date(), "main.js", "TEXT")

// console.log("Finish");


process.on("uncaughtException", (err) =>{
    console.log("Catched");
    console.log(err.message);
});


process.on("unhandledRejection", (err, promise) => {
    console.log("unhandledRejection", err);
});


process.on("warning", )

new Promise((resolve, reject) => {
    reject("PROMISE EROROROR")
}).then().catch(err =>{
    console.log("CAtched", err);
})

async function test(){
    try {
        throw Error("aync error");
    } catch (e) {
        console.log(e.message);
    }
}

// test()

console.log(r);

function errorF(){
    throw new Error("ERROR funct");
}

// errorF();



// process.on("SIGINT", (code) => {
//     console.log("SIGINT code", code);
//     // close();
//
//     // process.exit(0);
// })


// throw new Error("MY ERROR");

// await sleep(15000);

// console.log(process.env.DB_URL);

// fs.readFile(.env , ....) + process.env + custom.values.env
