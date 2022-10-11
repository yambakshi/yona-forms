import { EntryField } from "@models/entry-field";
import { createReducer, on } from "@ngrx/store";
import { EntryModeActions } from "../actions";

export const entryModeFeatureKey = 'entryMode';

export interface State {
    fields: EntryField[];
}

const initialState: State = {
    fields: [],
};

export const reducer = createReducer(
    initialState,
    // Even though the `state` is unused, it helps infer the return type
    on(EntryModeActions.userAnswered, (state, { fields }) => ({ fields }))
);

export const selectEntryModeValue = (state: State) => state.fields;