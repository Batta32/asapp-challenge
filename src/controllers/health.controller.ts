import { Router, Request, Response } from 'express';
import { AppRoute } from '../server';
import { Health } from '../models';
import { sendResponse, Status } from '../models/helpers';

/**
 * Controler to analyze if the system is alive
 */
export class HealthController implements AppRoute {

    // Main endpoint
    public route = '/check';
    public router: Router = Router();

    // Constructor
    public constructor() {
        // POST: route endpoint to execute check of the server
        this.router.post('/', this.check);
    }

    /**
     * Checks if the app is running fine.
     */
    public check(request: Request, response: Response): void {
        try {
            // Validate if the server is alive
            if (new Health().isAlive()) sendResponse(response, Status.OK, { health: 'ok' });
            else throw new Error('There is a problem in the system');
        } catch (err) {
            // Send caught error
            sendResponse(response, Status.SERVER_ERROR, err.message);
        }
    }
}
