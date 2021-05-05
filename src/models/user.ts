import { dbQuery } from "../services/db";
import { Image, Text, Video, VideoTypes } from "./content";
import { Content } from "./content/content";
import { Message } from "./message";

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
        await dbQuery('INSERT INTO users (username, password) VALUES(?, ?)', [this.username, this.password]);
        await this.getIdFromDatabase();
    }

    public async login(): Promise<void> {
        await this.getIdFromDatabase();
    }

    public async getMessages(startId: number, limit: number): Promise<Message[]> {
        const messages: Message[] = [];
        const query: string = `SELECT TOP (?) id, senderId, recipientId, contentType, timestamp FROM message WHERE id <= ? AND recipientId = ?`;
        const params: any[] = [limit, startId, this.id];
        const rows: any[] = await dbQuery(query, params) as any[];
        let content: Content;
        rows.forEach(async row => {
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
            const message: Message = new Message(-1, this.id, content);
            message.timestamp = row.timestamp;
            messages.push(message);
        });
        return messages;
    }

    private async getIdFromDatabase(): Promise<void> {
        const assignedId: any = await dbQuery('SELECT id FROM users WHERE username = ? and password = ?', [this.username, this.password]);
        this.setId(assignedId[0].id);
    }
}