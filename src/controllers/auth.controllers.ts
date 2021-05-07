import { Router, Request, Response } from 'express';
import { AppRoute } from '../models/app-route';
import { User } from '../models/user';
import { Login } from '../models/login';
import { getToken } from '../models/authentication/token';
import { validatePassword } from '../models/security';

export class AuthController implements AppRoute {
    public route = '/login';
    public router: Router = Router();

    // Constructor
    public constructor() {
        this.router.post('/', this.login);
    }

    /**
     * Login allows the user to authenticate with credentials 
     * and get a token to use on secured endpoints. 
     */
    public async login(request: Request, response: Response): Promise<void> {
        try {
            const user: User | undefined = await Login.login(request.body.username);
            if (user === undefined) response.status(400).json('Email or password is wrong');
            else {
                const correctPassword: boolean = await validatePassword(request.body.password, user.password);
                if (!correctPassword) response.status(400).json('Invalid password');
                const token: string = getToken(user.id);
                response.status(200).header('Authorization', token).send({
                    id: user.id,
                    token: token
                });
            }
        } catch (err) {
            response.status(500).send({
                err: err.message
            });
        }
    }
}
