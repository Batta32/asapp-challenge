import { Router } from 'express';
import { AuthController, HealthController, MessageController, UserController } from '../controllers';
import { AppRoute } from './';

/**
 * Route class to configure endpoints
 */
export class AppRouting {

    private route: Router;

    // Constructor
    constructor(route: Router) {
        this.route = route;
        this.configure();
    }

    // Configure controllers
    public configure(): void {
        // Add the routing classes.
        this.addRoute([new HealthController(), new UserController(), new AuthController(), new MessageController()]);
    }

    // Add route for each controller
    private addRoute(appRoutes: AppRoute[]) {
        appRoutes.forEach(route => {
            this.route.use(route.route, route.router);    
        });
    }
}
