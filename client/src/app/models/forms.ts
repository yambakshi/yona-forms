import { FieldType } from "@enums/field-type.enum";

export type EntryModeField = {
    question: string;
    answer: number | string;
}

export type EditModeField = {
    label: string;
    type: FieldType;
    options?: string[];
}

export class EditModeForm {
    fields: EditModeField[] = [];

    constructor() { }
}

export class EntryModeForm {
    fields: EntryModeField[];

    constructor() { }
}