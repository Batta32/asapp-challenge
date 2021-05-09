import { User } from './';

export class Login {
    public async login(username: string): Promise<User | undefined> {
        try {
            let user: User = new User(username, '');
            user = await user.getUserByUsername();
            return user;
        } catch (err) {
            return undefined;
        }
    }
}