import {Router} from "express";
import {authorizedInSessionMiddleware} from "../middleware/authMiddleware.js";
import {checkCsrfTokenMiddleware} from "../middleware/csrfMiddleware.js";
import UrlService from "../service/UrlService.js";

export default class UrlController extends Router {
    #urlService;

    constructor() {
        super();
        this.initRoutes();
        this.#urlService = UrlService.getInstance();
    }

    initRoutes = () => {

        this.post("/",
            authorizedInSessionMiddleware,
            checkCsrfTokenMiddleware,
            async (req, res) => {
                await this.#urlService.createUrl(req.session.userId, UrlModel.createFromRequest(req.body));

                res.send();
            });

        //TODO create URL
        // turn off/on url
        // add to api length and custom code
        // add expire date support


    }
}
