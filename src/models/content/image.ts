import { ContentTypes, Content } from './content';

export class Image extends Content {
    public type: string = ContentTypes[ContentTypes.IMAGE];
    public url: string;
    public height: number;
    public width: number;
    
    constructor(url: string, height: number, width: number) {
        super();
        this.url = url;
        this.height = height;
        this.width = width;
    }

    public getQueryColumns(): string {
        return '(messageId, url, height, width)';
    }

    public getQueryValues(): string {
        return '(?, ?, ?, ?)';
    }

    public getParameters(): any[] {
        return [this.url, this.height, this.width];
    }

    protected createContent(rows: any[]): Content {
        return new Image(rows[0].url, rows[0].height, rows[0].width);
    }
}