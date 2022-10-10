import { FieldType } from "@enums/field-type.enum";

export class Field {
    label: string;
    type: FieldType = FieldType.Number;
    value: any;

    constructor(field?: Field) {
        if (!field) return;
        this.label = field.label;
        this.type = field.type;
        this.value = field.value;
    }
}