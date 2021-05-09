import { User } from './';

/**
 * Login class
 */
export class Login {

    // Log a user
    public async login(username: string): Promise<User | undefined> {
        try {
            // Get the user from the database
            return await this.getUser(username);
        } catch (err) {
            return undefined;
        }
    }

    private async getUser(username: string): Promise<User> {
        // Get the user from the database
        const user: User = new User(username, '');
        return await user.getUserByUsername();
    }
}
