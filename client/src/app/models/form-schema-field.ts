import { FieldType } from "@enums/field-type.enum";

export class FormSchemaField {
    label: string;
    type: FieldType = FieldType.Number;
    options?: string[] = [];

    constructor(formSchemaField?: FormSchemaField) {
        if (!formSchemaField) return;
        this.label = formSchemaField.label;
        this.type = formSchemaField.type;
        this.options = formSchemaField.options;
    }
}