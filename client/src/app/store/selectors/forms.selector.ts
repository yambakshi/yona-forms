import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromForms from '../reducers/forms.reducer';

export const selectFormsState = createFeatureSelector<fromForms.State>(
    fromForms.formsFeatureKey
);

export const selectFormsStateValue = createSelector(
    selectFormsState,
    fromForms.selectFormsValue
);