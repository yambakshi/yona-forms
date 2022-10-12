import { EditModeForm, EntryModeForm } from "@models/forms";
import { createReducer, on } from "@ngrx/store";
import { FormsActions } from "../actions";

export const formsFeatureKey = 'forms';

export interface State {
    editModeForms: EditModeForm[];
    entryModeForms: EntryModeForm[];
}

const initialState: State = {
    editModeForms: [new EditModeForm()],
    entryModeForms: [],
};

export const reducer = createReducer(
    initialState,
    // Even though the `state` is unused, it helps infer the return type

    // SAVE

    on(FormsActions.userSubmitted, (state, { form }) => {
        state.entryModeForms.push(form);
        return state;
    }),

    on(FormsActions.userSavedFormSchema, (state, { form }) => {
        state.editModeForms.push(form);
        return state;
    }),

    // FETCH

    on(FormsActions.fetchSuccess, (state, { editModeForms, entryModeForms }) => ({
        editModeForms, entryModeForms
    }))
);

export const selectFormsValue = (state: State) => state;