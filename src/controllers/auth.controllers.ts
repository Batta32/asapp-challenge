import { Router, Request, Response } from "express";
import { AppRoute } from "../models/app-route";
import { User } from "../models/user";
import * as jwt from 'jsonwebtoken';

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
            const user: User | undefined = await User.login(request.body.username);
            if (user === undefined) response.status(400).json('Email or password is wrong')
            else {
                const correctPassword: boolean = await user.validatePassword(request.body.password);
                if (!correctPassword) {
                    response.status(400).json('Invalid password');
                }
                const token: string = jwt.sign({id: user.id}, process.env.TOKEN_SECRET || 'DEFAULT_TOKEN_SECRET', {
                    // 1 hour
                    expiresIn: 60 * 60 * 24
                });
                response.status(200).send(response.header('Authorization', token).json({
                    id: user.id,
                    token: token
                }));
            }
        } catch (err) {
            response.status(500).json({
                err: err.message
            });
        }
    }
}