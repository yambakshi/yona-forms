import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromEntryForm from '../reducers/entry-form.reducer';

export const selectEntryFormState = createFeatureSelector<fromEntryForm.State>(
    fromEntryForm.entryFormFeatureKey
);

export const selectEntryFormStateValue = createSelector(
    selectEntryFormState,
    fromEntryForm.selectEntryFormValue
);