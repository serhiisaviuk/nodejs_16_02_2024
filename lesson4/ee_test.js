import EventEmitter from "node:events";

class MyEmitter extends EventEmitter{
    init(){
        this.on("log", (...a)=>{
            console.log(...a);
        })
    }
}



const emitter = new MyEmitter();
emitter.init();

emitter.emit("log", "qwe", "asd", 3);
