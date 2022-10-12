import { EntryModeForm } from '@models/entry-form';
import { createAction, props } from '@ngrx/store';


export const entryModeFormAdded = createAction(
    '[View Mode] Entry Mode Form Added',
    props<{ form: EntryModeForm }>()
);

export const fetch = createAction(
    '[View Mode] Fetch Is Needed',
    props<{ id: string }>()
);

export const fetchSuccess = createAction(
    '[View Mode] Fetch Success',
    props<{ forms: EntryModeForm[] }>()
);

export const fetchFailure = createAction(
    '[View Mode] Fetch Failure',
    props<{ errorMsg: string }>()
);
