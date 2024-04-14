import http from "http";

import exampleLogger from "example-logger";

import config from "./config.js";
import webContext from "./webContext.js";
import dbInit from "./db/knex.js";

const log = exampleLogger.getLogger("app.js");

dbInit(config.dbConfig);
const app = webContext();

const server = http.createServer(app);

server.listen(3001, () => {
    log.info("Server Started, port: http://127.0.0.1:3001/")
});


process.on("unhandledRejection", (error) => {
    log.error(error.stack) //TODO improve logger for error
});
process.on("uncaughtException", (error) => {
    log.error(error.stack)
});
