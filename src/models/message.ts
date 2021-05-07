import { dbQuery } from '../services/db';
import { Content } from './content/content';

export class Message {
    public id = -1;
    public sender = -1;
    public recipient = -1;
    public timestamp: Date = new Date();
    public content: Content;

    constructor(sender: number, recipient: number, content: Content) {
        this.sender = sender;
        this.recipient = recipient;
        this.content = content;
    }

    public async send(): Promise<void> {
        this.timestamp = new Date();
        const milliseconds: number = this.timestamp.getTime();
        //TODO: Promise.all?
        await dbQuery('INSERT INTO message (senderId, recipientId, timestamp, contentType) VALUES (?, ?, ?, ?)', [this.sender, this.recipient, milliseconds, this.content.type]);
        await this.getIdBySender(this.sender);
        const querySpecificMessage = `INSERT INTO ${ this.content.type } ${ this.content.getQueryColumns() } VALUES${ this.content.getQueryValues() }`;
        const paramsSpecificMessage: any[] = [this.id].concat(this.content.getParameters());
        await dbQuery(querySpecificMessage, paramsSpecificMessage);
    }

    private async getIdBySender(senderId: number): Promise<void> {
        const assignedId: any = await dbQuery('SELECT id FROM message WHERE timestamp = ? AND senderId = ?', [this.timestamp.getTime(), senderId]);
        this.id = assignedId[0].id;
    }
}

