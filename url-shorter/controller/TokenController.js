import {Router} from "express";
import TokenService from "../service/TokenService.js";

export default class TokenController extends Router {
    constructor() {
        super();
        this.tokenService = TokenService.getInstance();

        this.init();
    }

    init = () => {
        this.post("/", (req, res, next) => {
            const token = this.tokenService.generateToken("userId12345");

            res.send(token);
        })
    }

}
