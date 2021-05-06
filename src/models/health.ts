import { checkState } from '../services/db';

export class Health {
    public static isAlive(): boolean {
        return Health.validateDatabase();
    }

    private static validateDatabase(): boolean {
        return checkState();
    }
}