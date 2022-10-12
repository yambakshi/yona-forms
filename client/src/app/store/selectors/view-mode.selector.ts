import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromViewMode from '../reducers/view-mode.reducer';

export const selectViewModeState = createFeatureSelector<fromViewMode.State>(
    fromViewMode.viewModeFeatureKey
);

export const selectViewModeStateValue = createSelector(
    selectViewModeState,
    fromViewMode.selectViewModeValue
);