import { FormSchemaField } from '@models/form-schema-field';
import { createAction, props } from '@ngrx/store';

export const userModifiedSchema = createAction(
    '[Edit Mode] User Modified Schema',
    props<{ fields: FormSchemaField[] }>());

export const fetch = createAction(
    '[Form Schema/API] Fetch Is Needed',
    props<{ query: string }>()
);

export const fetchSuccess = createAction(
    '[Form Schema/API] Fetch Success',
    props<{ fields: FormSchemaField[] }>()
);

export const fetchFailure = createAction(
    '[Form Schema/API] Fetch Failure',
    props<{ errorMsg: string }>()
);
