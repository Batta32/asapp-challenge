import { ContentTypes, Content } from "./content";

export class Text extends Content {
    public text: string;

    constructor(text: string) {
        super();
        this.text = text;
    }

    public getType(): ContentTypes {
        return ContentTypes.TEXT;
    }

    public getQueryColumns(): string {
        return "(messageId, text)";
    }

    public getQueryValues(): string {
        return "(?, ?)";
    }

    public getParameters(): any[] {
        return [this.text];
    }

    protected createContent(rows: any[]): Content {
        return new Text(rows[0].text);
    }
}