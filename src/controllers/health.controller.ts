import { Router, Request, Response } from "express";
import { AppRoute } from "../models/app-route";
import { Health } from "../models/health";


export class HealthController implements AppRoute {
    public route = "/check";
    public router: Router = Router();

    // Constructor
    public constructor() {
        this.router.post("/", this.check);
    }

    /**
     * Checks if the app is running fine.
     */
    public check(request: Request, response: Response): void {
        try {
            const health: Health = new Health();
            if (health.isAlive()) {
                response.status(200).send(response.json({
                    health: "ok"
                }));
            } else {
                throw new Error("There is a problem in the system");
            }
        } catch (err) {
            response.status(500).json({
                err: err.message
            })
        }
    }
}