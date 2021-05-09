import { User } from './';

/**
 * Login class
 */
export class Login {

    // Log a user
    public async login(username: string): Promise<User | undefined> {
        try {
            // Get the user from the database
            let user: User = new User(username, '');
            user = await user.getUserByUsername();
            return user;
        } catch (err) {
            return undefined;
        }
    }
}
