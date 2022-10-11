import { Field } from '@models/field';
import { createAction, props } from '@ngrx/store';

export const typeSearchValue = createAction(
    '[Layout] Type Search Value',
    props<{ fields: Field[] }>());