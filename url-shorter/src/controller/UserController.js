import {Router} from "express";
import UserService from "../service/UserService.js";
import {checkCsrfTokenMiddleware} from "../middleware/csrfMiddleware.js";

export default class UserController extends Router {
    constructor() {
        super();
        this.userService = UserService.getInstance();

        this.init()
    }

    init = () => {
        this.get("/", async (req, res) => {
            const users = {}
                // await this.userService.getUsersPublicData();

            res.render("users", {users, csrfToken: req.session.csrfToken});
        })

        this.get("/:userId", (req, res, next) => {
            const user = this.userService.getUser(req.params.userId);
            res.json(user);
        });

        this.get("/all", (req, res) => {
            const users = this.userService.getUsersPublicData();

            res.json(users);
        });

        this.post("/create",
            // checkCsrfTokenMiddleware,
            async (req, res) => {
                const {name, password} = req.body;

                try {
                    await this.userService.create(name, password);
                } catch (e) {
                    console.log(e);
                }

                res.send({
                    message: "Saved!"
                });
            })


        this.all("/", (req, res) => {
            res.send("UserController here!");
        })
    }


}
