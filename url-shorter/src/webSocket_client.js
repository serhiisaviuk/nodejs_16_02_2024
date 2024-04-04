import {WebSocket} from "ws";

const ws = new WebSocket("http://127.0.0.1:3001/");

ws.on("open", ()=>{
    console.log("Connected to Server");

    ws.send("hi from client");
})

ws.on("message", data =>{
    console.log("DATA:", data.toString("utf8"));
})
