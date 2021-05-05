import { dbQuery } from "../../services/db";

export abstract class Content {
    public type: ContentTypes;
    public queryColumns: string;
    public queryValues: string;

    public abstract getParameters(): any[];
    protected abstract createContent(rows: any[]): Content;

    constructor(type: ContentTypes, queryColumns: string, queryValues: string) {
        this.type = type;
        this.queryColumns = queryColumns;
        this.queryValues = queryValues;
    }

    public async getContent(messageId: number): Promise<Content> {
        const rows: any[] = await dbQuery(`SELECT * FROM ${this.type} WHERE messageId = ?`, [messageId]) as any[];
        return this.createContent(rows);
    }
}

export enum ContentTypes {
    TEXT,
    IMAGE,
    VIDEO
}