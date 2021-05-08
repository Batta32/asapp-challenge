import { checkState } from '../services/db';

export class Health {
    public isAlive(): boolean {
        return checkState();
    }
}