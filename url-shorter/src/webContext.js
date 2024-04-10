import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import RedisStore from "connect-redis";
import redisClient from "./redis/redisClient.js";
import {initCsrfTokenMiddleware} from "./middleware/csrfMiddleware.js";
import LoginController from "./controller/LoginController.js";
import {
    authorizedInSessionMiddleware,
    basicAuthorizationMiddleware,
    bearerAuthMiddleware
} from "./middleware/authMiddleware.js";
import UserController from "./controller/UserController.js";
import UrlController from "./controller/UrlController.js";
import TokenController from "./controller/TokenController.js";
import ValidationError from "./error/ValidationError.js";

const app = express();

function initMiddlewares(app){
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    app.use(cookieParser());
    app.use(session({
        store: new RedisStore({
            client: redisClient, ttl: 86400
        }),
        secret: "QWESdfisdfj3", //TODO should be stored in config!
        saveUninitialized: true,
        resave: true,
        name: "sessionId",
        cookie: {
            httpOnly: true,
            domain: "127.0.0.1",
        }
    }));
    app.use(initCsrfTokenMiddleware);
}

function initControllers(app){
    app.all("/", (req, res) => {
        res.send("Works!");
    });

    app.use("/token", new TokenController());
    app.use("/login", new LoginController())

    // app.use(bearerAuthMiddleware);
    app.use("/code", new UrlController());
    // app.use(authorizedInSessionMiddleware)
    app.use("/user", new UserController());
    // app.use("/dashboard");

}

function initViews(app){

    app.set("views", "view");
    app.set("view engine", "ejs");
    app.use("/files", express.static("view"));

}

function initErrorHandling(app){
    app.use((err, req, res, next) => {

        if(err instanceof HttpStatusError){
            res.status(err.httpStatus())
        }


        if(err instanceof ValidationError){
            return res.send(`Fields error: ${err.fields}`);
        }

        if(err instanceof Error && req.method === "POST"){
            res.status(500).json({error: err.message})
        }

        res.status(500).send(err.message);
    });
}

export default function (){
    initMiddlewares(app);
    initViews(app);
    initControllers(app)
    initErrorHandling(app);

    return app;
}
