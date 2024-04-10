import {Router} from "express";
import Joi from "joi"
import UserService from "../service/UserService.js";


//custom errorS?
const userSchema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required()
});

export default class RegistrationController extends Router {
    userService;

    constructor() {
        super();

        this.userService = UserService.getInstance();

        this.initRoutes();
    }

    initRoutes = () => {
        this.get("/", (req, res, next) => {
            res.render("registration", {pepper: "GENERATE_ME"})
        });

        this.post("/", async (req, res) => {

            const {email, password} = req.body;

            const {error, value} = userSchema.validate({email, password}, {});

            if(error){
                throw error;
            }

            await this.userService.create(email, password);

            req.session.email = email;

            res.redirect(302, "/user");

            // res.status(200).json()
        })
    }

}
