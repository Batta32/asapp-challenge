import { Router, Request, Response } from 'express';
import { AppRoute } from '../server';
import { Health } from '../models';
import { sendResponse, Status } from '../models/helpers';

export class HealthController implements AppRoute {
    public route = '/check';
    public router: Router = Router();

    // Constructor
    public constructor() {
        this.router.post('/', this.check);
    }

    /**
     * Checks if the app is running fine.
     */
    public check(request: Request, response: Response): void {
        try {
            if (new Health().isAlive()) sendResponse(response, Status.OK, { health: 'ok' });
            else throw new Error('There is a problem in the system');
        } catch (err) {
            sendResponse(response, Status.SERVER_ERROR, { err: err.message });
        }
    }
}

