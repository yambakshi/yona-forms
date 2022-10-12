import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { FormsApiService } from '@services/forms-api.service';
import { ViewModeActions } from "@store/actions";
import { EntryModeForm } from "@models/entry-form";

@Injectable()
export class ViewModeEffects {
    fetch$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ViewModeActions.fetch),
            switchMap(({ id }) => {
                return this.formsApiService.getForms().pipe(
                    map((forms: EntryModeForm[]) => ViewModeActions.fetchSuccess({ forms })),
                    catchError((err) =>
                        of(ViewModeActions.fetchFailure({ errorMsg: err.message }))
                    )
                );
            })
        )
    );

    constructor(
        private actions$: Actions,
        private formsApiService: FormsApiService
    ) { }
}