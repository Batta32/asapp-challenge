import { ContentTypes, Content } from './content';

export class Text extends Content {
    public type: string = ContentTypes[ContentTypes.TEXT];
    public text: string;

    constructor(text: string) {
        super();
        this.text = text;
    }

    public getQueryColumns(): string {
        return '(messageId, text)';
    }

    public getQueryValues(): string {
        return '(?, ?)';
    }

    public getParameters(): any[] {
        return [this.text];
    }

    protected create(rows: any[]): Content {
        return new Text(rows[0].text);
    }
}