import { FormSchemaField } from "@models/form-schema-field";
import { createReducer, on } from "@ngrx/store";
import { EditModeActions } from "../actions";

export const editModeFeatureKey = 'editMode';

export interface State {
    fields: FormSchemaField[];
}

const initialState: State = {
    fields: [new FormSchemaField()],
};

export const reducer = createReducer(
    initialState,
    // Even though the `state` is unused, it helps infer the return type
    on(EditModeActions.userModifiedSchema, (state, { fields }) => ({ fields }))
);

export const selectEditModeValue = (state: State) => state.fields;