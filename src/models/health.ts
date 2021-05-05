import { checkState } from "../services/db";

export class Health {
    // Constructor
    public constructor() {

    }

    public isAlive(): boolean {
        return this.validateDatabase();
    }

    private validateDatabase(): boolean {
        return checkState();
    }
}