import { Router } from 'express';

/**
 * Interface to route controllers
 */
export interface AppRoute {
    route: string;
    router: Router;
}
