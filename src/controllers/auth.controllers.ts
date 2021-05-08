import { Router, Request, Response } from 'express';
import { AppRoute } from '../models/app-route';
import { User } from '../models/user';
import { Login } from '../models/login';
import { getToken } from '../models/authentication/token';
import { validatePassword } from '../models/security';
import { sendResponse, Status } from '../models/helpers/responses';

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
            const user: User | undefined = await new Login().login(request.body.username);
            if (user === undefined) sendResponse(response, Status.NOT_FOUND, 'Username or password is wrong');
            else {
                const correctPassword: boolean = await validatePassword(request.body.password, user.password);
                if (!correctPassword) sendResponse(response, Status.BAD_REQUEST, 'Invalid password');
                const token: string = getToken(user.id);
                sendResponse(response, Status.OK, { id: user.id, token: token });
            }
        } catch (err) {
            sendResponse(response, Status.SERVER_ERROR, { err: err.message });
        }
    }
}
