import { dbQuery } from '../services/db';
import { Image, Text, Video, VideoTypes } from './content';
import { Content } from './content/content';
import { Message } from './message';

export class User {
    public id = -1;
    public username: string;
    public password: string;

    // Constructor
    public constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }

    public async create(): Promise<User> {
        await dbQuery('INSERT INTO user (username, password) VALUES(?, ?)', [this.username, this.password]);
        return await this.getUserByUsername();
    }

    public async getReceivedMessages(startId: number, limit: number): Promise<Message[]> {
        const messages: Message[] = [];
        // TODO: The query should be a JOIN between MESSAGE VS (TEXT/IMAGE/VIDEO)
        // in order to hit the database one time
        // I'm leaving as is because it will require changes
        const rows: any[] = await dbQuery(`SELECT * FROM message WHERE id >= ? AND recipientId = ? ORDER BY ID LIMIT ?`, [startId, this.id, limit]);
        for (const row of rows) {
            const content: Content = await this.getContentByRow(row);
            if (content !== undefined) {
                const message: Message = new Message(row.senderId, this.id, content);
                message.id = row.id;
                message.timestamp = new Date(row.timestamp);
                messages.push(message);
            }
        }
        return messages;
    }

    public async getUserByUsername(): Promise<User> {
        const rows: any = await dbQuery('SELECT * FROM user WHERE username = ?', [this.username]);
        const user: User = new User(rows[0].username, rows[0].password);
        user.id = rows[0].id;
        return user;
    }

    private async getContentByRow(row: any): Promise<Content | undefined> {
        let content: Content | undefined = undefined;
        switch (row.contentType.toLowerCase()) {
            case 'text': {
                content = new Text('');
                content = await content.getContent(row.id);
                break;
            }
            case 'image': {
                content = new Image('', -1, -1);
                content = await content.getContent(row.id);
                break;
            }
            case 'video': {
                content = new Video('', VideoTypes.NULL);
                content = await content.getContent(row.id);
                break;
            }
        }

        return content;
    }
}