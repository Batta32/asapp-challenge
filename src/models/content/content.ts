import { dbQuery } from "../../services/db";

export abstract class Content {
    public abstract getParameters(): any[];
    public abstract getType(): ContentTypes;
    public abstract getQueryColumns(): string;
    public abstract getQueryValues(): string;
    protected abstract createContent(rows: any[]): Content;

    constructor() {
    }

    public async getContent(messageId: number): Promise<Content> {
        const rows: any[] = await dbQuery(`SELECT * FROM ${ContentTypes[this.getType()]} WHERE messageId = ?`, [messageId]) as any[];
        return this.createContent(rows);
    }
}

export enum ContentTypes {
    TEXT,
    IMAGE,
    VIDEO
}