import { Router } from 'express';
import { AuthController, HealthController, MessageController, UserController } from '../controllers';
import { AppRoute } from './';

export class AppRouting {
    private route: Router;

    constructor(route: Router) {
        this.route = route;
        this.configure();
    }

    public configure(): void {
        // Add the routing classes.
        this.addRoute([new HealthController(), new UserController(), new AuthController(), new MessageController()]);
    }

    private addRoute(appRoutes: AppRoute[]) {
        appRoutes.forEach(route => {
            this.route.use(route.route, route.router);    
        });
    }
}