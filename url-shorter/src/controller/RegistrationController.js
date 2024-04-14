import {Router} from "express";
import Joi from "joi"
import UserService from "../service/UserService.js";
import ValidationError from "../error/ValidationError.js";


//custom errorS?
const userSchema = Joi.object({
    email: Joi.string().required().email().error(errors => {
        const message = errors.map(e => {
            return e.toString();
        }).join(", ");
        return new ValidationError(message, "email")
    }),
    password: Joi.string().required().error(errors => {
        const message = errors.map(e => {
            return e.toString();
        }).join(", ");
        return new ValidationError(message, "password")
    })
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

        this.post("/", async (req, res, next) => {

            try {
                const {email, password} = req.body;

                const {error, value} = userSchema.validate({email, password}, {});

                if (error) {
                    throw error;
                }

                await this.userService.create(email, password);

                req.session.email = email;

                res.redirect(302, "/dashboard");

                // res.status(200).json()
            } catch (e) {
                next(e);
            }
        })
    }

}
