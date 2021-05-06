import { dbQuery } from '../services/db';
import { User } from './user';

export class Login {
    public static async login(username: string): Promise<User | undefined> {
        try {
            const row: any = await dbQuery('SELECT * FROM user WHERE username = ?', [username]);
            const user: User = new User(row[0].username, row[0].password);
            user.id = row[0].id;
            return user;
        } catch (err) {
            return undefined;
        }
    }
}