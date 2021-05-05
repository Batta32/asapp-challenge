import { dbQuery } from "../services/db";
import { Content } from "./content/content";

export class Message {
    public id: number = -1;
    public senderId: number = -1;
    public recipientId: number = -1;;
    public timestamp: Date | undefined = undefined;
    public content: Content;

    constructor(senderId: number, recipientId: number, content: Content) {
        this.senderId = senderId;
        this.recipientId = recipientId;
        this.content = content;
    }

    public setId(id: number) {
        this.id = id;
    }

    public async send(): Promise<void> {
        this.timestamp = new Date();
        //TODO: Promise.all?
        await dbQuery('INSERT INTO message (senderId, recipientId, timestamp, contentType) VALUES (?, ?, ?, ?)', [this.senderId, this.recipientId, this.timestamp, this.content.type]);
        await this.getIdFromDatabase();
        const querySpecificMessage: string = `INSERT INTO ${this.content.type} ${this.content.queryColumns} VALUES${this.content.queryValues}`;
        const paramsSpecificMessage: any[] = [this.id, this.content.getParameters()];
        await dbQuery(querySpecificMessage, paramsSpecificMessage);
    }

    private async getIdFromDatabase(): Promise<void> {
        const assignedId: any = await dbQuery('SELECT id FROM messages WHERE timestamp = ?', [this.timestamp]);
        this.setId(assignedId[0].id);
    }
}

