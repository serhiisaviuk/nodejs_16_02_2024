import express from "express"
import webContext from "./webContext.js";
import exampleLogger from "example-logger";

const log = exampleLogger.getLogger("app.js");
const app = express();

webContext(app);

app.listen(3001, () => {
    log.info("Server Started, port: http://127.0.0.1:3001/")
})
