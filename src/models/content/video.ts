import { ContentTypes, Content } from './';

export class Video extends Content {
    public type: string = ContentTypes[ContentTypes.VIDEO];
    public url: string;
    public source: VideoTypes;
    
    constructor(url: string, source: VideoTypes) {
        super();
        this.url = url;
        this.source = source;
    }

    public getQueryColumns(): string {
        return '(messageId, url, source)';
    }

    public getQueryValues(): string {
        return '(?, ?, ?)';
    }

    public getParameters(): any[] {
        return [this.url, this.source];
    }

    public createByRow(row: any): Content {
        return new Video(row.url, row.source);
    }
}

export enum VideoTypes {
    INVALID,
    VIMEO,
    YOUTUBE
}