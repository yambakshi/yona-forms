import { FieldType } from "@enums/field-type.enum";

export class EditModeField {
    label: string;
    type: FieldType = FieldType.Number;
    options?: string[] = [];

    constructor() { }
}