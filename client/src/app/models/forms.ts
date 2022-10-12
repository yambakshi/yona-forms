import { FieldType } from "@enums/field-type.enum";

export type EntryModeField = {
    question: string;
    answer: number | string;
}

export class EditModeField {
    label: string;
    type: FieldType = FieldType.Number;
    options?: string[] = [];

    constructor() { }
}

export class EditModeForm {
    fields: EditModeField[] = [];

    constructor() { }
}

export class EntryModeForm {
    id?: number;
    fields: EntryModeField[];
    created_on?: string;

    constructor() { }
}