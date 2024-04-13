import {Router} from "express";
import UrlService from "../service/UrlService.js";

export default class RedirectController extends Router{
    #urlService;

    constructor() {
        super();
        this.#urlService = UrlService.getInstance();
        this.initRoutes();
    }

    initRoutes = ()=>{
        this.get("/:code", (req, res) => {
            const url = this.#urlService.visitUrl(req.params.code);

            res.redirect(302, url);
        });
    }
}
