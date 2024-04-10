import express from "express"
import webContext from "./webContext.js";
import exampleLogger from "example-logger";
import webSocket from "./webSocket.js";
import socketIo from "./view/socketIo.js";
import http from "http";

const log = exampleLogger.getLogger("app.js");

const app = webContext();

const server = http.createServer(app);

socketIo(server);

server.listen(3001, () => {
    log.info("Server Started, port: http://127.0.0.1:3001/")
})
