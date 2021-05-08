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

    public createByRow(row: any): Content {
        return new Text(row.text);
    }
}