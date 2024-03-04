import * as net from "net";


const client = net.connect({port:8080}, ()=>{
    console.log("Connected");
});
client.on("data", (data) =>{
    console.log("Received from server", data.toString("utf8"));
});

client.write("DATA from client");

client.on("end", ()=>{
    console.log("Client end");
});

client.on("close", (err)=>{
    console.log("CLOSE");
})

