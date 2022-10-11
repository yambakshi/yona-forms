import { EntryField } from "@models/entry-field";
import { createReducer, on } from "@ngrx/store";
import { EntryFormActions } from "../actions";

export const entryFormFeatureKey = 'entryForm';

export interface State {
    fields: EntryField[];
}

const initialState: State = {
    fields: [],
};

export const reducer = createReducer(
    initialState,
    // Even though the `state` is unused, it helps infer the return type
    on(EntryFormActions.userAnswered, (state, { fields }) => ({ fields }))
);

export const selectEntryFormValue = (state: State) => state.fields;