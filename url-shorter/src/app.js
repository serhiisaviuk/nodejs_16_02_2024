import http from "http";

import exampleLogger from "example-logger";

import config from "./config.js";
import webContext from "./webContext.js";
import dbInit from "./db/knex.js";
import https from "https";

const log = exampleLogger.getLogger("app.js");

dbInit(config.dbConfig);
const app = webContext();


// if (process.env.NODE_ENV !== 'production') {
    const httpServer = http.createServer(app);
    const server = httpServer.listen(config.port, () => {

    });
// } else {
//     app.enable('trust proxy');
//
//     const credentials = {
//         key: SERVICE_KEY,
//         cert: SERVICE_CERT
//     };
//     const httpsServer = https.createServer(credentials, app);
//     const server = httpsServer.listen(3003, () => {
//         log.info("Server Started, port: http://127.0.0.1:3001/")
//
//     });
// }


process.on("unhandledRejection", (error) => {
    log.error(error.stack) //TODO improve logger for error
});
process.on("uncaughtException", (error) => {
    log.error(error.stack)
});
