import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import RedisStore from "connect-redis";
import redisClient from "./db/redisClient.js";
import {initCsrfTokenMiddleware} from "./middleware/csrfMiddleware.js";
import LoginController from "./controller/LoginController.js";
import {
    authorizedInSessionMiddleware,
    basicAuthorizationMiddleware,
    bearerAuthMiddleware
} from "./middleware/authMiddleware.js";
import AdminController from "./controller/AdminController.js";
import UrlController from "./controller/UrlController.js";
import TokenController from "./controller/TokenController.js";
import ValidationError from "./error/ValidationError.js";
import RegistrationController from "./controller/RegistrationController.js";
import HttpStatusError from "./error/HttpStatusError.js";
import DashboardController from "./controller/DashboardController.js";
import RedirectController from "./controller/RedirectController.js";

const app = express();

function initMiddlewares(app) {
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
        }
    }));
    app.use(initCsrfTokenMiddleware);
}

function initControllers(app) {
    app.all("/", (req, res) => {
        res.redirect(301, "/dashboard");
    });

    app.use("/token", new TokenController());
    app.use("/login", new LoginController());
    app.use("/registration", new RegistrationController());

    app.use("/r", new RedirectController());

    // app.use(bearerAuthMiddleware);
    app.use(authorizedInSessionMiddleware)
    app.use("/code", new UrlController());
    app.use("/admin", new AdminController());
    app.use("/dashboard", new DashboardController());

}

function initViews(app) {

    app.set("views", "./view");
    app.set("view engine", "ejs");
    app.use("/files", express.static("view"));

}

function initErrorHandling(app) {
    app.use((err, req, res, next) => {

        if (err instanceof HttpStatusError) {
            res.status(err.httpStatus)
        }

        if (err instanceof ValidationError) {
            return res.send({error: err.message, field: err.field});
        }

        if (err instanceof Error && req.method === "POST") {
            return res.status(500).json({error: err.message})
        }

        res.status(500).send(err.message);
    });
}

export default function () {
    initMiddlewares(app);
    initViews(app);
    initControllers(app)
    initErrorHandling(app);

    return app;
}
