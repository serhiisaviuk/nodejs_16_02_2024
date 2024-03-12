import {Router} from "express";
import UserService from "../service/UserService.js";

export default class LoginController extends Router {
    constructor() {
        super();
        this.initRoutes();
        this.userService = UserService.getInstance();
    }

    initRoutes = function () {
        this.get("/", (req, res) => {
            res.render("login", {errorMessage:""})
        });

        this.post("/", (req, res) => {
            const {login, password} = req.body;

            if (this.userService.checkPassword(login, password)) {
                req.session.login = login;
                res.redirect(302, "/user");
            } else {
                res.render("login", {errorMessage: "Unauthorized"});
            }

        });
    }
}
