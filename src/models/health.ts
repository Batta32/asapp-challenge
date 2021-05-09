import { checkState } from '../services';

export class Health {
    public isAlive(): boolean {
        return checkState();
    }
}