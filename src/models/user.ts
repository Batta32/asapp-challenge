import { dbInsert, dbQuery } from '../services';
import { Content, Image, Text, Video, VideoTypes } from './content';
import { Message } from './';
import { encryptPassword } from './security';

/**
 * User class
 */
export class User {

    public id = -1;
    public username: string;
    public password: string;

    // Constructor
    public constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }

    // Creates user into database
    public async create(): Promise<User> {
        // Encrypt received password   
        this.password = await encryptPassword(this.password);
        // Insert user
        await this.insert().then((id) => {
            this.id = id;
        });
        return this;
    }

    // Gets user's messages
    public async getReceivedMessages(startId: number, limit: number): Promise<Message[]> {
        const messages: Message[] = [];
        // Get messages filtering by messageId and recipient and limitting the number of messages
        const rows: any[] = await this.getMessages(startId, limit);
        for (const row of rows) {
            // Create a content depending message
            const content: Content = await this.getContentByRow(row);
            // Create full message
            const message: Message = new Message(row.senderId, this.id, content);
            message.id = row.id;
            message.timestamp = new Date(row.timestamp);
            messages.push(message);
        }
        // Return messages
        return messages;
    }

    // Gets user by username
    public async getUserByUsername(): Promise<User> {
        const rows: any = await dbQuery('SELECT * FROM user WHERE username = ?', [this.username]);
        const user: User = new User(rows[0].username, rows[0].password);
        user.id = rows[0].id;
        return user;
    }

    // Gets user by id
    public async getUserById(): Promise<User> {
        const rows: any = await dbQuery('SELECT * FROM user WHERE id = ?', [this.id]);
        const user: User = new User(rows[0].username, rows[0].password);        
        return user;
    }

    // Get messages filtering by messageId and recipient and limitting the number of messages
    private async getMessages(startId: number, limit: number): Promise<any[]> {
        // TODO: The query should be a JOIN between MESSAGE VS (TEXT/IMAGE/VIDEO)
        // in order to hit the database one time
        // I'm leaving as is because it will require changes
        // Get messages filtering by messageId and recipient and limitting the number of messages
        return await dbQuery(`SELECT * FROM message WHERE id >= ? AND recipientId = ? ORDER BY ID LIMIT ?`, [startId, this.id, limit]);
    }

    // Initialize content by row
    private async getContentByRow(row: any): Promise<Content> {
        const type: string = row.contentType;
        let content: Content;
        switch (type.toLowerCase()) {
            case 'text': {
                content = new Text('');
                break;
            }
            case 'image': {
                content = new Image('', -1, -1);
                break;
            }
            case 'video': {
                content = new Video('', VideoTypes.INVALID);
                break;
            }
            default: {
                throw new Error('Non-supported type');
            }
        }
        return content.createByRow(row);
    }

    private async insert(): Promise<any> {
        try {
            return await dbInsert('INSERT INTO user (username, password) VALUES(?, ?)', [this.username, this.password]);
        } catch (err) {
            throw new Error('The user already exists');
        }
    }
}
