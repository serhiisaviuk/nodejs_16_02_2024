import {Router} from "express";
import {authorizedInSessionMiddleware} from "../middleware/authMiddleware.js";
import {checkCsrfTokenMiddleware} from "../middleware/csrfMiddleware.js";
import UrlService from "../service/UrlService.js";

export default class UrlController extends Router {
    #urlService;

    constructor() {
        super();
        this.initController();
        this.#urlService = UrlService.getInstance();
    }

    initController = () => {
        this.get("/:code", (req, res) => {
            const url = this.#urlService.visitUrl(req.params.code);

            res.redirect(302, url);
        })

        this.post("/",
            authorizedInSessionMiddleware,
            checkCsrfTokenMiddleware,
            async (req, res) => {
                await this.#urlService.createUrl(req.session.userId, UrlModel.createFromRequest(req.body));

                res.send();
            });
    }
}
