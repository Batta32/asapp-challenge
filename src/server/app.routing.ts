import { Router } from 'express';
import { AuthController } from '../controllers/auth.controllers';
import { HealthController } from '../controllers/health.controller';
import { MessageController } from '../controllers/message.controller';
import { UserController } from '../controllers/user.controller';
import { AppRoute } from '../models/app-route';

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