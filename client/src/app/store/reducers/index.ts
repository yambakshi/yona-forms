import { InjectionToken } from "@angular/core";
import { Action, ActionReducerMap } from "@ngrx/store";
import * as fromRouter from '@ngrx/router-store';
import * as fromEditMode from './edit-mode.reducer';
import * as fromEntryMode from './entry-mode.reducer';


export interface State {
    [fromEditMode.editModeFeatureKey]: fromEditMode.State;
    [fromEntryMode.entryModeFeatureKey]: fromEntryMode.State;
    router: fromRouter.RouterReducerState<any>;
}

export const ROOT_REDUCERS = new InjectionToken<
    ActionReducerMap<State, Action>
>('Root reducers token', {
    factory: () => ({
        [fromEditMode.editModeFeatureKey]: fromEditMode.reducer,
        [fromEntryMode.entryModeFeatureKey]: fromEntryMode.reducer,
        router: fromRouter.routerReducer,
    }),
});
