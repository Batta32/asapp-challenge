import { ContentTypes, Content } from "./content";

export class Text extends Content {
    public text: string;

    constructor(text: string) {
        super(ContentTypes.TEXT, "(messageId, text)", "(?, ?)");
        this.text = text;
    }

    public getParameters(): any[] {
        return [this.text];
    }

    protected createContent(rows: any[]): Content {
        return new Text(rows[0].text);
    }
}