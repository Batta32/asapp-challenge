import { Router, Request, Response } from 'express';
import { AppRoute } from '../server';
import { User, Login, validatePassword } from '../models';
import { getToken } from '../models/middlewares';
import { sendResponse, Status } from '../models/helpers';

/**
 * Controller to handle the login of a user
 */
export class AuthController implements AppRoute {

    // Main endpoint
    public route = '/login';
    public router: Router = Router();

    // Constructor
    public constructor() {
        // POST: route endpoint to execute login
        this.router.post('/', this.login);
    }

    /**
     * Login allows the user to authenticate with credentials 
     * and get a token to use on secured endpoints. 
     */
    public async login(request: Request, response: Response): Promise<void> {
        try {
            // Log user
            const user: User | undefined = await new Login().login(request.body.username);
            // Check existence of the logged user
            if (user === undefined) sendResponse(response, Status.NOT_FOUND, 'Username or password is wrong');
            else {
                // Check password
                const correctPassword: boolean = await validatePassword(request.body.password, user.password);
                if (!correctPassword) sendResponse(response, Status.BAD_REQUEST, 'Invalid password');
                // Get JWT Authentication token
                const token: string = getToken(user.id);
                // Send response
                sendResponse(response, Status.OK, { id: user.id, token: token });
            }
        } catch (err) {
            // Send caught error
            sendResponse(response, Status.SERVER_ERROR, { err: err.message });
        }
    }
}
