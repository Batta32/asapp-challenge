import { ContentTypes, Content } from './';

/**
 * Text content
 */
export class Text extends Content {

    public type: string = ContentTypes[ContentTypes.TEXT];
    public text: string;

    // Constructor
    constructor(text: string) {
        super();
        this.text = text;
    }

    /**
     * @extends {Content}
     */
    public getQueryColumns(): string {
        return '(messageId, text)';
    }

    /**
     * @extends {Content}
     */
    public getQueryValues(): string {
        return '(?, ?)';
    }

    /**
     * @extends {Content}
     */
    public getParameters(): any[] {
        return [this.text];
    }

    /**
     * @extends {Content}
     */
    public createByRow(row: any): Content {
        return new Text(row.text);
    }
}
