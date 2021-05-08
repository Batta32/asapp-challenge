import { dbQuery } from '../../services/db';

export enum ContentTypes {
    TEXT,
    IMAGE,
    INVALID,
    VIDEO
}

export abstract class Content {
    public abstract getParameters(): any[];
    public abstract getQueryColumns(): string;
    public abstract getQueryValues(): string;
    protected abstract create(rows: any[]): Content;
    public abstract type: string;

    public async getContentById(messageId: number): Promise<Content> {
        const rows: any[] = await dbQuery(`SELECT * FROM ${ this.type } WHERE messageId = ?`, [messageId]);
        return this.create(rows);
    }

    public static async getContent(type: string, callback: {(data: any): Promise<Content>}[], data: any): Promise<Content> {
        switch (type.toLowerCase()) {
            case 'text': {
                return await callback[0](data);
            }
            case 'image': {
                return await callback[1](data);
            }
            case 'video': {
                return await callback[2](data);
            }
            default: {
                throw new Error('Non-supported type');
            }
        }
    }
}
