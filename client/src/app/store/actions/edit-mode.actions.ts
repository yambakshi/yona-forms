import { EditModeForm } from '@models/forms';
import { createAction, props } from '@ngrx/store';

export const userSaved = createAction(
    '[Edit Mode] User Saved',
    props<{ form: EditModeForm }>());
