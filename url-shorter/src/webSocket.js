import {WebSocketServer} from 'ws';


const clients = [];

function init(server) {

    const wss = new WebSocketServer({server});

    wss.on('connection', function connection(ws) {

        clients.push(ws);

        if(clients.length >= 3){
            wss.clients.forEach(c =>{
                c.send("Count connected clients:", clients.length);
            })
        }

        ws.on('error', console.error);

        ws.on('message', function message(data) {
            console.log('received: %s', data);
        });

        ws.send('something');
    });

}

export default init;
