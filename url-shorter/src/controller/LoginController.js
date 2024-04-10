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
            res.render("login", {errorMessage: ""})
        });

        this.post("/", async (req, res) => {
            const {login, password} = req.body;

            if (await this.userService.checkPassword(login, password)) {
                req.session.email = login;
                res.redirect(302, "/dashboard");
            } else {
                res.render("login", {errorMessage: "Unauthorized"});
            }

        });
    }
}
