import {Router} from "express";

export default class DashboardController extends Router {

    constructor() {
        super();
        this.initRoutes();
    }

    initRoutes = () => {
        this.get("/", (req, res) => {
            res.render("dashboard");
        })
    }
}
