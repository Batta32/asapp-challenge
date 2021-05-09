import { dbQuery } from '../services';
import { Content } from './content';

/**
 * Message class
 */
export class Message {

    public id = -1;
    public sender = -1;
    public recipient = -1;
    public timestamp: Date = new Date('0001-01-01T00:00:00Z');
    public content: Content;

    // Constructor
    constructor(sender: number, recipient: number, content: Content) {
        this.sender = sender;
        this.recipient = recipient;
        this.content = content;
    }

    // Send message
    public async send(): Promise<void> {
        this.timestamp = new Date();
        // Await to insert a message and content into database
        await Promise.all([
            // Insert message
            await this.insertMessage(),
            // After inserting the message, we search the assigned message id
            await this.getIdBySender(),
            // Insert content
            await this.insertContent()
        ]);
    }

    // Insert message
    private async insertMessage(): Promise<void> {
        await dbQuery(
            'INSERT INTO message (senderId, recipientId, timestamp, contentType) VALUES (?, ?, ?, ?)',
            [this.sender, this.recipient, this.timestamp.getTime(), this.content.type]
        );
    }

    // Get message by sender
    private async getIdBySender(): Promise<void> {
        const rows: any = await dbQuery('SELECT * FROM message WHERE timestamp = ? AND senderId = ?', [this.timestamp.getTime(), this.sender]);
        this.id = rows[0].id;
    }

    // Insert content
    private async insertContent(): Promise<void> {
        await dbQuery(
            `INSERT INTO ${ this.content.type } ${ this.content.getQueryColumns() } VALUES${ this.content.getQueryValues() }`,
            [this.id].concat(this.content.getParameters())
        );
    }
}
