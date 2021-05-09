import { Router, Request, Response } from 'express';
import { AppRoute } from '../server';
import { sendResponse, Status } from '../models/helpers';
import { User, encryptPassword } from '../models';

export class UserController implements AppRoute {
    public route = '/users';
    public router: Router = Router();

    // Constructor
    public constructor() {
        this.router.post('/', this.createUser);
    }

    /**
     * Creates a user.
     */
    public async createUser(request: Request, response: Response): Promise<void> {
        try {            
            const encryptedPassword: string = await encryptPassword(request.body.password);
            let user: User = new User(request.body.username, encryptedPassword);
            user = await user.create();
            sendResponse(response, Status.OK, { id: user.id });
        } catch (err) {
            sendResponse(response, Status.SERVER_ERROR, { err: err.message });
        }
    }
}