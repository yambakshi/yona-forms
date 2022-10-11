import { InjectionToken } from "@angular/core";
import { Action, ActionReducerMap, createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromRouter from '@ngrx/router-store';
import * as fromEditMode from './edit-mode.reducer';
import * as fromEntryForm from './entry-form.reducer';


export interface State {
    [fromEditMode.editModeFeatureKey]: fromEditMode.State;
    router: fromRouter.RouterReducerState<any>;
}

export const ROOT_REDUCERS = new InjectionToken<
    ActionReducerMap<State, Action>
>('Root reducers token', {
    factory: () => ({
        [fromEditMode.editModeFeatureKey]: fromEditMode.reducer,
        [fromEntryForm.entryFormFeatureKey]: fromEntryForm.reducer,
        router: fromRouter.routerReducer,
    }),
});

export const selectLayoutState = createFeatureSelector<fromEditMode.State>(
    fromEditMode.editModeFeatureKey
);

export const selectSearchStateValue = createSelector(
    selectLayoutState,
    fromEditMode.selectEditModeValue
);
