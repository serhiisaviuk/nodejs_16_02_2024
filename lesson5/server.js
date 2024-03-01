import * as net from "net";

const server = net.createServer();

server.on("connection", (socket) =>{
    console.log("i'm CONNECTION");
    socket.write("Hello from server");

    socket.end()
})
server.on("connection", (socket) =>{
    console.log("i'm CONNECTION");
    socket.write("Hello from server");
})

server.on("listening", function () {

});


server.on("error", (err) =>{
    console.log("ERROR", err.message);
})

server.listen(8000, () =>{
    console.log("Server started");
});




