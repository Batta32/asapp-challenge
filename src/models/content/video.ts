import { ContentTypes, Content } from './';

/**
 * Types of video
 */
export enum VideoTypes {
    INVALID,
    VIMEO,
    YOUTUBE
}

/**
 * Video content
 */
export class Video extends Content {

    public type: string = ContentTypes[ContentTypes.VIDEO];
    public url: string;
    public source: VideoTypes;

    // Constructor
    constructor(url: string, source: VideoTypes) {
        super();
        this.url = url;
        this.source = source;
    }

    /**
     * @extends {Content}
     */
    public getQueryColumns(): string {
        return '(messageId, url, source)';
    }

    /**
     * @extends {Content}
     */
    public getQueryValues(): string {
        return '(?, ?, ?)';
    }

    /**
     * @extends {Content}
     */
    public getParameters(): any[] {
        return [this.url, this.source];
    }

    /**
     * @extends {Content}
     */
    public createByRow(row: any): Content {
        return new Video(row.url, row.source);
    }
}
