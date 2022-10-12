import { EditModeForm } from '@models/edit-mode-form';
import { createAction, props } from '@ngrx/store';

export const userSaved = createAction(
    '[Edit Mode] User Saved',
    props<{ form: EditModeForm }>());
