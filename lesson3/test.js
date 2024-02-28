import EventEmitter from  "node:events"
import * as fs from "fs";

class MyEventEmitter extends EventEmitter{

}

const my = new MyEventEmitter();

my.on("test", ()=>{
    console.log("My test event");
})


my.emit("test")

my.on('close', ()=>{
    console.log("finish read");
})



