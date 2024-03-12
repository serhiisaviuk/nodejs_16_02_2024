import express from "express"
import {authorizedInSessionMiddleware} from "./middleware/authMiddleware.js";
import UserController from "./controller/UserController.js";
import LoginController from "./controller/LoginController.js";
import cookieParser from "cookie-parser";
import session from "express-session";

import {createClient} from "redis"
import RedisStore from "connect-redis"
import {initCsrfTokenMiddleware} from "./middleware/csrfMiddleware.js";

// Initialize client.
let redisClient = createClient({
    url: "redis://@127.0.0.1:6380",
});

redisClient.connect().catch(console.error);


redisClient.set("MyTest", "VALUEEE");

const test = await redisClient.get("MyTest");

console.log("Redis:", test);


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cookieParser());
app.use(session({
    store: new RedisStore({
        client: redisClient, ttl: 86400
    }),
    secret: "QWESdfisdfj3",
    saveUninitialized: true,
    resave: true,
    name: "sessionId",
    cookie: {
        httpOnly: true,
        domain: "127.0.0.1",
    //     maxAge: 3600
    }
}));

app.all("/", (req, res) => {
    res.send("Works!");
});

app.use("/login", new LoginController())
app.use(authorizedInSessionMiddleware)
app.use(initCsrfTokenMiddleware);

app.use("/user", new UserController());


app.use((err, req, res, next) => {
    console.log(err);

    res.status(500).send(err.message);
});

app.set("views", "view");
app.set("view engine", "ejs");

app.get("/get_pug", (req, res) => {
    res.render("index.pug", {name: "ADMIN"});
});

app.get("/get_ejs", (req, res) => {
    res.render("index", {password: "QWERTY"});
})

app.use("/files", express.static("view"));


app.listen(3001, () => {
    console.log("Server Started, port: http://127.0.0.1:3001/");
})
