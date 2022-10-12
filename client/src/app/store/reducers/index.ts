import { InjectionToken } from "@angular/core";
import { Action, ActionReducerMap } from "@ngrx/store";
import * as fromRouter from '@ngrx/router-store';
import * as fromEditMode from './edit-mode.reducer';
import * as fromEntryMode from './entry-mode.reducer';
import * as fromViewMode from './view-mode.reducer';


export interface State {
    [fromEditMode.editModeFeatureKey]: fromEditMode.State;
    [fromEntryMode.entryModeFeatureKey]: fromEntryMode.State;
    [fromViewMode.viewModeFeatureKey]: fromViewMode.State;
    router: fromRouter.RouterReducerState<any>;
}

export const ROOT_REDUCERS = new InjectionToken<
    ActionReducerMap<State, Action>
>('Root reducers token', {
    factory: () => ({
        [fromEditMode.editModeFeatureKey]: fromEditMode.reducer,
        [fromEntryMode.entryModeFeatureKey]: fromEntryMode.reducer,
        [fromViewMode.viewModeFeatureKey]: fromViewMode.reducer,
        router: fromRouter.routerReducer,
    }),
});
