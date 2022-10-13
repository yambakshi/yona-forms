import { EntryModeField } from "./entry-mode-field";

export type EntryModeForm = {
    id: number;
    title: string;
    fields: EntryModeField[];
    created_on: string;
}