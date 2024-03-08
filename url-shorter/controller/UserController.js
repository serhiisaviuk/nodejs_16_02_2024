import {Router} from "express";
import UserService from "../service/UserService.js";

export default class UserController extends Router {
    constructor() {
        super();
        this.userService = new UserService();

        this.init()
    }

    init = ()=> {
        this.get("/", (req,res) =>{
            const users = this.userService.getUsersPublicData();

            res.render("users", {users});
        })

        this.all("/", (req,res)=>{
            res.send("UserController here!");
        })

        this.get("/all", (req, res) => {
            const users = this.userService.getUsersPublicData();

            res.json(users);
        });

        this.post("/create", (req, res) => {
            const {name, password} = req.body;
            this.userService.create(name, password);

            res.send("Saved!");
        })
    }


}
