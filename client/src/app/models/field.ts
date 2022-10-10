export class Field {
    label: string;
    type: string;
    value: any;

    constructor(field?: Field) {
        if (!field) return;
        this.label = field.label;
        this.type = field.type;
        this.value = field.value;
    }
}