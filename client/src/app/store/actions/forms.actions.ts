import { EditModeForm, EntryModeForm } from '@models/forms';
import { createAction, props } from '@ngrx/store';


// EDIT MODE

export const userSavedFormSchema = createAction(
    '[Forms] User Saved Form Schema',
    props<{ form: EditModeForm }>());

// SUBMIT

export const userSubmitted = createAction(
    '[Forms] User Submitted',
    props<{ form: EntryModeForm }>());

export const submitSuccess = createAction(
    '[Forms] Submit Success',
    props<{ form: EntryModeForm }>()
);

export const submitFailure = createAction(
    '[Forms] Submit Failure',
    props<{ errorMsg: string }>()
);

// FETCH

export const fetchSuccess = createAction(
    '[Forms] Fetch Success',
    props<{ editModeForms: EditModeForm[], entryModeForms: EntryModeForm[] }>()
);

export const fetchFailure = createAction(
    '[Forms] Fetch Failure',
    props<{ errorMsg: string }>()
);