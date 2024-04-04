import {Server} from 'socket.io';


const clients = [];

function init(server) {

    const wss = new Server(server);

    wss.on('connection', function connection(socket) {

        socket.on('error', console.error);

        socket.on('event', function message(data) {
            console.log('received: %s', data);
        });

        setInterval(()=>{
            socket.emit("event", 'SERVER HELLO');
        }, 1000)

    });

}

export default init;
