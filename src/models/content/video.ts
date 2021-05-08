import { ContentTypes, Content } from './content';

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

    protected create(rows: any[]): Content {
        return new Video(rows[0].url, rows[0].source);
    }
}

export enum VideoTypes {
    INVALID,
    VIMEO,
    YOUTUBE
}