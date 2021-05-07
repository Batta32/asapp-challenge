import { Router, Request, Response } from 'express';
import { AppRoute } from '../models/app-route';
import { encryptPassword } from '../models/security';
import { User } from '../models/user';

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
            const user: User = new User(request.body.username, request.body.password);
            user.password = await encryptPassword(user.password);
            await user.create();
            response.status(200).send({
                id: user.id
            });
        } catch(err) {
            response.status(500).send({
                err: err.message
            });
        }
    }
}