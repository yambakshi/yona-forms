import { InjectionToken } from "@angular/core";
import { Action, ActionReducerMap, createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromRouter from '@ngrx/router-store';
import * as fromLayout from './layout.reducer';
import * as fromEntryForm from './entry-form.reducer';


export interface State {
    [fromLayout.layoutFeatureKey]: fromLayout.State;
    router: fromRouter.RouterReducerState<any>;
}

export const ROOT_REDUCERS = new InjectionToken<
    ActionReducerMap<State, Action>
>('Root reducers token', {
    factory: () => ({
        [fromLayout.layoutFeatureKey]: fromLayout.reducer,
        [fromEntryForm.entryFormFeatureKey]: fromEntryForm.reducer,
        router: fromRouter.routerReducer,
    }),
});

export const selectLayoutState = createFeatureSelector<fromLayout.State>(
    fromLayout.layoutFeatureKey
);

export const selectSearchStateValue = createSelector(
    selectLayoutState,
    fromLayout.selectSearchValue
);
