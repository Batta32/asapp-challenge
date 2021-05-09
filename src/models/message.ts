import { dbQuery } from '../services';
import { Content } from './content';

/**
 * Message class
 */
export class Message {

    public id = -1;
    public sender = -1;
    public recipient = -1;
    public timestamp: Date = new Date();
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
        const milliseconds: number = this.timestamp.getTime();
        // Await to insert a message and content into database
        await Promise.all([
            // Insert message
            await dbQuery(
                'INSERT INTO message (senderId, recipientId, timestamp, contentType) VALUES (?, ?, ?, ?)',
                [this.sender, this.recipient, milliseconds, this.content.type]
            ),
            // After inserting the message, we search the assigned message id
            await this.getIdBySender(),
            // Insert content
            await dbQuery(
                `INSERT INTO ${ this.content.type } ${ this.content.getQueryColumns() } VALUES${ this.content.getQueryValues() }`,
                [this.id].concat(this.content.getParameters())
            )
        ]);
    }

    // Get message by sender
    public async getIdBySender(): Promise<void> {
        const rows: any = await dbQuery('SELECT * FROM message WHERE timestamp = ? AND senderId = ?', [this.timestamp.getTime(), this.sender]);
        this.id = rows[0].id;
    }
}
