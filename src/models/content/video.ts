import { ContentTypes, Content } from "./content";

export class Video extends Content {
    public url: string;
    public source: VideoTypes;
    
    constructor(url: string, source: VideoTypes) {
        super(ContentTypes.VIDEO, "(messageId, url, source)", "(?, ?, ?)");
        this.url = url;
        this.source = source;
    }

    public getParameters(): any[] {
        return [this.url, this.source];
    }

    protected createContent(rows: any[]): Content {
        return new Video(rows[0].url, rows[0].source);
    }
}

export enum VideoTypes {
    YOUTUBE,
    VIMEO,
    NULL
}