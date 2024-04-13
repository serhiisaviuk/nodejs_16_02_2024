import {Router} from "express";
import UserService from "../service/UserService.js";
import {allow} from "../middleware/authMiddleware.js"

export default class AdminController extends Router {
    constructor() {
        super();
        this.userService = UserService.getInstance();

        this.init()
    }

    init = () => {
        this.get("/", async (req, res) => {
            const users = {}
            await this.userService.getUsers();

            res.render("admin", {users, csrfToken: req.session.csrfToken});
        })

        this.get("/user/all", (req, res) => {
            const users = this.userService.getUsers();

            res.json(users);
        });

        this.post("/user/create",
            // checkCsrfTokenMiddleware, TODO don't' forget
            async (req, res) => {
                const {name, password} = req.body;

                try {
                    await this.userService.create(name, password);
                } catch (e) {
                   throw e;
                }

                res.send({
                    message: "Saved"
                });
            })

        this.delete("/user/:userId", allow("ADMIN"), (req, res) => {
            this.userService.deleteById(req.params.userId)

            res.json({message:"Deleted"});
        });

    }


}
