import { dbQuery } from '../../services';

/**
 * Types of content
 */
export enum ContentTypes {
    TEXT,
    IMAGE,
    VIDEO
}

/**
 * Abstract model with the definition of the specific contents
 */
export abstract class Content {

    // Gets the default parameters to query a database
    public abstract getParameters(): any[];
    // Gets the default columns to query a database
    public abstract getQueryColumns(): string;
    // Gets the values to query a database
    public abstract getQueryValues(): string;
    // Create model by a row from the database
    public abstract createByRow(row: any): Content;
    // Gets the type of the Content
    public abstract type: string;

    // Get the content by messageId
    public async getContentById(messageId: number): Promise<Content> {
        // Get the specific content from database
        const rows: any[] = await dbQuery(`SELECT * FROM ${ this.type } WHERE messageId = ?`, [messageId]);
        // Initialize specific content
        return this.createByRow(rows[0]);
    }
}
