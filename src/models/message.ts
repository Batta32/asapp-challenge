import { dbQuery } from "../services/db";
import { Content, ContentTypes } from "./content/content";

export class Message {
    public id: number = -1;
    public sender: number = -1;
    public recipient: number = -1;;
    public timestamp: Date = new Date();
    public content: Content;

    constructor(sender: number, recipient: number, content: Content) {
        this.sender = sender;
        this.recipient = recipient;
        this.content = content;
    }

    public setId(id: number) {
        this.id = id;
    }

    public async send(): Promise<void> {
        this.timestamp = new Date();
        const milliseconds: number = this.timestamp.getTime();
        //TODO: Promise.all?
        await dbQuery('INSERT INTO message (senderId, recipientId, timestamp, contentType) VALUES (?, ?, ?, ?)', [this.sender, this.recipient, milliseconds,  ContentTypes[this.content.getType()]]);
        await this.getIdBySender(this.sender);
        const querySpecificMessage: string = `INSERT INTO ${ContentTypes[this.content.getType()]} ${this.content.getQueryColumns()} VALUES${this.content.getQueryValues()}`;
        const paramsSpecificMessage: any[] = [this.id].concat(this.content.getParameters());
        await dbQuery(querySpecificMessage, paramsSpecificMessage);
    }

    private async getIdBySender(senderId: number): Promise<void> {
        const assignedId: any = await dbQuery('SELECT id FROM message WHERE timestamp = ? AND senderId = ?', [this.timestamp.getTime(), senderId]);
        this.setId(assignedId[0].id);
    }
}

