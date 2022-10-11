import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromEntryMode from '../reducers/entry-mode.reducer';

export const selectEntryModeState = createFeatureSelector<fromEntryMode.State>(
    fromEntryMode.entryModeFeatureKey
);

export const selectEntryModeStateValue = createSelector(
    selectEntryModeState,
    fromEntryMode.selectEntryModeValue
);