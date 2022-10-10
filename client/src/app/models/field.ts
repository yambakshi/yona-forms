import { FieldType } from "@enums/field-type.enum";

export class Field {
    label: string;
    type: FieldType = FieldType.Number;
    options: string[] = [];
    value: any;

    constructor(field?: Field) {
        if (!field) return;
        this.label = field.label;
        this.type = field.type;
        this.options = field.options;
        this.value = field.value;
    }
}