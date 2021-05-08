import { Content, ContentTypes } from './content';

export class NullContent extends Content {
    public getParameters(): any[] {
        throw new Error('Method not implemented.');
    }
    public getQueryColumns(): string {
        throw new Error('Method not implemented.');
    }
    public getQueryValues(): string {
        throw new Error('Method not implemented.');
    }
    protected create(rows: any[]): Content {
        throw new Error('Method not implemented.');
    }
    public type: string = ContentTypes[ContentTypes.INVALID];
}