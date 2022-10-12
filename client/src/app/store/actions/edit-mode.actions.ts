import { EditModeForm } from '@models/forms';
import { createAction, props } from '@ngrx/store';

export const userSubmitted = createAction(
    '[Edit Mode] User Submitted',
    props<{ form: EditModeForm }>());

export const submitSuccess = createAction(
    '[Edit Mode] Submit Success',
    props<{ form: EditModeForm }>()
);

export const submitFailure = createAction(
    '[Edit Mode] Submit Failure',
    props<{ errorMsg: string }>()
);