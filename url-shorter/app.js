import express from "express"
import webContext from "./webContext.js";

const app = express();

webContext(app);

app.listen(3001, () => {
    console.log("Server Started, port: http://127.0.0.1:3001/");
})
