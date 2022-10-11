import { Field } from "@models/field";
import { createReducer, on } from "@ngrx/store";
import { LayoutActions } from "../actions";

export const layoutFeatureKey = 'layout';

export interface State {
    fields: Field[];
}

const initialState: State = {
    fields: [new Field()],
};

export const reducer = createReducer(
    initialState,
    // Even though the `state` is unused, it helps infer the return type
    on(LayoutActions.typeSearchValue, (state, { fields }) => ({ fields }))
);

export const selectSearchValue = (state: State) => state.fields;