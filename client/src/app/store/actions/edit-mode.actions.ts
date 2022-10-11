import { FormSchemaField } from '@models/form-schema-field';
import { createAction, props } from '@ngrx/store';

export const userModifiedSchema = createAction(
    '[Edit Mode] User Modified Schema',
    props<{ fields: FormSchemaField[] }>());