import { dbInsert, dbQuery } from '../services';
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
            await this.insertMessage().then((id) => {
                this.id = id;
            }),
            // Insert content
            await this.insertContent()
        ]);
    }

    // Insert message
    private async insertMessage(): Promise<any> {
        return await dbInsert(
            'INSERT INTO message (senderId, recipientId, timestamp, contentType) VALUES (?, ?, ?, ?)',
            [this.sender, this.recipient, this.timestamp.getTime(), this.content.type]
        );
    }

    // Insert content
    private async insertContent(): Promise<void> {
        await dbQuery(
            `INSERT INTO ${ this.content.type } ${ this.content.getQueryColumns() } VALUES${ this.content.getQueryValues() }`,
            [this.id].concat(this.content.getParameters())
        );
    }
}
