import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromEditMode from '../reducers/edit-mode.reducer';


export const selectEditModeState = createFeatureSelector<fromEditMode.State>(
    fromEditMode.editModeFeatureKey
);

export const selectEditModeStateValue = createSelector(
    selectEditModeState,
    fromEditMode.selectEditModeValue
);