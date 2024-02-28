
import EventEmitter from "node:events";

const ee = new EventEmitter();


export const sleep = async (timeoutMs) =>
    new Promise(resolve => setTimeout(resolve, timeoutMs));

const delay = (ms) => {
    const start = Date.now();
    while (Date.now() - start < ms) {}
};


const listener = async ()=>{
    // await sleep(5000)
    console.log("Event 1");
    // delay(10000)
};
ee.on("event", listener)


ee.on("event", ()=>{
    console.log("Event 2");
})

ee.prependListener("event", ()=>{
    console.log("prepended");
})


ee.emit("event")




console.log(ee.eventNames());


ee.removeListener("event", listener)
ee.removeAllListeners("event")

ee.emit("event")

const eventNames = ee.eventNames();

console.log(eventNames);






