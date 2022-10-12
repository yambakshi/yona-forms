import { EntryModeForm } from "@models/entry-mode-form";
import { createReducer, on } from "@ngrx/store";
import { EntryModeActions } from "../actions";

export const entryModeFeatureKey = 'entryMode';

export interface State {
    forms: EntryModeForm[];
}

const initialState: State = {
    forms: [],
};

export const reducer = createReducer(
    initialState,
    // Even though the `state` is unused, it helps infer the return type

    on(EntryModeActions.submitSuccess, (state, { form }) =>
        ({ ...state, forms: [...state.forms, form] })),

    on(EntryModeActions.fetch, (state, { id }) => ({
        ...state,
        id
    })),

    on(EntryModeActions.fetchSuccess, (state, { forms }) => ({
        ...state,
        forms
    }))
);

export const selectEntryModeValue = (state: State) => state.forms;