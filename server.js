import * as http from "http";
import net from "net";

const storageLog = [];

const httpServer = http.createServer( (req, res)=>{
    if(req.url === "/logs"){
        res.setHeader("content-type","application/json")
        res.write(JSON.stringify(storageLog));
        res.end()
    }else{
        res.statusCode = 404;
        res.end("Not found")
    }

});

const server = net.createServer();

server.on("connection", socket=>{
    console.log("new client connected");

    let buffer = '';
    socket.on('data', (data) => {
        buffer += data.toString();
        let boundary = buffer.indexOf('\n');
        while (boundary !== -1) {
            const message = buffer.substring(0, boundary);
            storageLog.push(JSON.parse(message));
            buffer = buffer.substring(boundary + 1);
            boundary = buffer.indexOf('\n');
        }
    });


    socket.on("error", (err)=>{
        socket.end(()=>{
            console.log("Socket error", err);
        })
    });

    socket.on("close", ()=>{
        console.log("Client disconnected");
    })
})

httpServer.listen(3001, ()=>{
    console.log("HTTP Server Started");
});


server.listen(3002, ()=>{
    console.log("TCP Server Started");
});
