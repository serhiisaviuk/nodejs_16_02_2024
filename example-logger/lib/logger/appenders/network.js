import net from "net";
import config from "../config/config.js";
import {Transform} from "stream";

let client;

function connect(inputStream, formatter) {

    client = net.connect({port: config.network.port}, () => {
        console.log("Connected");
    });

    inputStream.pipe(formatter.transformer()).pipe(client);


    process.on("exit", () => {
        client.end();
    });

    client.on("error", () => {
        console.log("CLIENT Error");
        client.end();
    });

}

function init(inputStream, formatter) {
    connect(inputStream, formatter);
}

export default init;
