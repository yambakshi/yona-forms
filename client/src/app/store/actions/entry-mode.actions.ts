import { EntryModeForm } from '@models/entry-form';
import { createAction, props } from '@ngrx/store';

// export const userAnswered = createAction(
//     '[Entry Forms] User Answered',
//     props<{ form: EntryModeForm }>());

// SUBMIT

export const userSubmitted = createAction(
    '[Entry Forms] User Submitted',
    props<{ form: EntryModeForm }>());

export const submitSuccess = createAction(
    '[Entry Forms] Submit Success',
    props<{ form: EntryModeForm }>()
);

export const submitFailure = createAction(
    '[Entry Forms] Submit Failure',
    props<{ errorMsg: string }>()
);

// FETCH

export const fetch = createAction(
    '[Entry Mode] Fetch Is Needed',
    props<{ id: string }>()
);

export const fetchSuccess = createAction(
    '[Entry Mode] Fetch Success',
    props<{ forms: EntryModeForm[] }>()
);

export const fetchFailure = createAction(
    '[Entry Mode] Fetch Failure',
    props<{ errorMsg: string }>()
);
