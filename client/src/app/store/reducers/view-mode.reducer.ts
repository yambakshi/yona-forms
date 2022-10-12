import { EntryModeForm } from "@models/entry-form";
import { createReducer, on } from "@ngrx/store";
import { ViewModeActions } from "../actions";

export const viewModeFeatureKey = 'viewMode';

export interface State {
    forms: EntryModeForm[];
}

const initialState: State = {
    forms: [],
};

export const reducer = createReducer(
    initialState,
    // Even though the `state` is unused, it helps infer the return type
    on(ViewModeActions.entryModeFormAdded, (state, { form }) => {
        state.forms.push(form);
        return state;
    }),

    // Fetch

    on(ViewModeActions.fetch, (state, { id }) => ({
        ...state,
        id
    })),
    on(ViewModeActions.fetchSuccess, (state, { forms }) => ({
        ...state,
        forms
    }))
);

export const selectViewModeValue = (state: State) => state.forms;