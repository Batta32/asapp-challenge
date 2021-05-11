import { ContentTypes, Content } from './';

/**
 * Image content
 */
export class Image extends Content {

    public type: string = ContentTypes[ContentTypes.IMAGE];
    public url: string;
    public height: number;
    public width: number;

    // Constructor
    constructor(url: string, height: number, width: number) {
        super();
        this.url = url;
        this.height = height;
        this.width = width;
    }

    /**
     * @extends {Content}
     */
    public getQueryColumns(): string {
        return '(messageId, url, height, width)';
    }

    /**
     * @extends {Content}
     */
    public getQueryValues(): string {
        return '(?, ?, ?, ?)';
    }

    /**
     * @extends {Content}
     */
    public getParameters(): any[] {
        return [this.url, this.height, this.width];
    }

    /**
     * @extends {Content}
     */
    public createByRow(row: any): Content {
        return new Image(row.url, row.height, row.width);
    }
}
