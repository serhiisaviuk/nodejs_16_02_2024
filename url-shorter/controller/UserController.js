import express, {Router} from "express";
import UserService from "../service/UserService.js";

export default class UserController extends Router {
    constructor() {
        super();
        this.userService = UserService.getInstance();

        this.init()
    }

    init = () => {
        this.get("/", (req, res) => {
            const users = this.userService.getUsersPublicData();

            console.log(req.session.csrfToken);

            res.render("users", {users, csrfToken: req.session.csrfToken});
        })

        this.all("/", (req, res) => {
            res.send("UserController here!");
        })

        this.get("/all", (req, res) => {
            const users = this.userService.getUsersPublicData();

            res.json(users);
        });

        this.post("/create",
            (req, res, next) => {
                if (req.session.csrfToken !== req.body.csrfToken) {
                    return res.status(403);
                }
                next();
            },
            (req, res) => {
                const {name, password} = req.body;


                try {
                    this.userService.create(name, password);
                } catch (e) {
                    console.log(e);
                }

                res.send({
                    message: "Saved!"
                });
            })
    }


}
