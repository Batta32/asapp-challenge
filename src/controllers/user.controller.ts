import { Router, Request, Response } from 'express';
import { AppRoute } from '../server';
import { sendResponse, Status } from '../models/helpers';
import { User, encryptPassword } from '../models';

/**
 * Controller to handle the creation of a user
 */
export class UserController implements AppRoute {

    // Main endpoint
    public route = '/users';
    public router: Router = Router();

    // Constructor
    public constructor() {
        // POST: route endpoint to execute the user's creation
        this.router.post('/', this.createUser);
    }

    /**
     * Creates a user.
     */
    public async createUser(request: Request, response: Response): Promise<void> {
        try {         
            // Encrypt received password   
            const encryptedPassword: string = await encryptPassword(request.body.password);
            let user: User = new User(request.body.username, encryptedPassword);
            // Create new user
            user = await user.create();
            // Send response
            sendResponse(response, Status.OK, { id: user.id });
        } catch (err) {
            // Send caught error
            sendResponse(response, Status.SERVER_ERROR, { err: err.message });
        }
    }
}
