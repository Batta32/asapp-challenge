import { Router, Request, Response } from "express";
import { AppRoute } from "../models/app-route";
import { User } from "../models/user";

export class AuthController implements AppRoute {
    public route = "/login";
    public router: Router = Router();

    // Constructor
    public constructor() {
        this.router.post("/", this.login);
    }

    /**
     * Login allows the user to authenticate with credentials 
     * and get a token to use on secured endpoints. 
     */
    public async login(request: Request, response: Response): Promise<void> {
        try {
            const user: User = new User(request.body.username, request.body.password);
            await user.login();
            // TODO: User must login and a token must be generated
            response.status(200).send(response.json({
                id: user.id,
                token: "tokenMocked"
            }));
        } catch (err) {
            response.status(500).json({
                err: err.message
            });
        }
    }
}