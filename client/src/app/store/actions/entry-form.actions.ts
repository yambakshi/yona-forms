import { EntryField } from '@models/entry-field';
import { createAction, props } from '@ngrx/store';

export const userAnswered = createAction(
    '[Entry Forms] User Answered',
    props<{ fields: EntryField[] }>());