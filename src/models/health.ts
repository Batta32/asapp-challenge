import { checkState } from '../services';

/**
 * Health class
 */
export class Health {

    // Check if the system is alive
    public isAlive(): boolean {
        // Check state of the database
        return checkState();
    }
}
