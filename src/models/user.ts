import { dbQuery } from "../services/db";
import { Image, Text, Video, VideoTypes } from "./content";
import { Content } from "./content/content";
import { Message } from "./message";
import bcrypt from 'bcryptjs';

export class User {
    public id: number = -1;
    public username: string;
    public password: string;

    // Constructor
    public constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }

    public setId(id: number) {
        this.id = id;
    }

    public async create(): Promise<void> {
        await dbQuery('INSERT INTO user (username, password) VALUES(?, ?)', [this.username, this.password]);
        await this.getIdFromDatabase();
    }

    public async getMessages(startId: number, limit: number): Promise<Message[]> {
        const messages: Message[] = [];
        const query: string = `SELECT * FROM message WHERE id >= ? AND recipientId = ? LIMIT ?`;
        const params: any[] = [startId, this.id, limit];
        const rows: any[] = await dbQuery(query, params) as any[];
        for(const row of rows) {
            const content: Content | undefined = await this.getContentByRow(row)
            if (content !== undefined) {
                const message: Message = new Message(row.senderId, this.id, content);
                message.id = row.id
                message.timestamp = new Date(row.timestamp);
                messages.push(message);
            }
        }
        return messages;
    }

    private async getIdFromDatabase(): Promise<void> {
        const user: any = await dbQuery('SELECT id FROM user WHERE username = ?', [this.username]);
        this.setId(user[0].id);
    }

    public async encryptPassword(password: string): Promise<string> {
        const salt: string = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }

    public async validatePassword(password: string): Promise<boolean> {
        return await bcrypt.compare(password, this.password);
    }

    public static async login(username: string): Promise<User | undefined> {
        try {
            const row: any = await dbQuery('SELECT * FROM user WHERE username = ?', [username]);
            const user: User = new User(row[0].username, row[0].password)
            user.id = row[0].id;
            return user;
        } catch (err) {
            return undefined;
        }
    }

    private async getContentByRow(row: any): Promise<Content | undefined> {
        let content: Content | undefined = undefined;
        switch (row.contentType.toLowerCase()) {
            case "text": {
                content = new Text("");
                content = await content.getContent(row.id);
                break;
            }
            case "image": {
                content = new Image("", -1, -1);
                content = await content.getContent(row.id);;
                break;
            }
            case "video": {
                content = new Video("", VideoTypes.NULL);
                content = await content.getContent(row.id);;
                break;
            }
        }

        return content;
    }
}