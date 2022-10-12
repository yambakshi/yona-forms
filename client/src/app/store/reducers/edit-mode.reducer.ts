import { EditModeForm } from "@models/forms";
import { createReducer, on } from "@ngrx/store";
import { EditModeActions } from "../actions";

export const editModeFeatureKey = 'editMode';

export interface State {
    form: EditModeForm;
}

const initialState: State = {
    form: new EditModeForm(),
};

export const reducer = createReducer(
    initialState,
    // Even though the `state` is unused, it helps infer the return type
    on(EditModeActions.userSaved, (state, { form }) => ({ form })),
);

export const selectEditModeValue = (state: State) => state.form;