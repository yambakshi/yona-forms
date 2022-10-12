import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { FormsApiService } from '@services/forms-api.service';
import { EntryModeActions } from "@store/actions";
import { EntryModeForm } from "@models/entry-form";

@Injectable()
export class EntryModeEffects {
    fetch$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EntryModeActions.fetch),
            switchMap(({ id }) => {
                return this.formsApiService.getForms().pipe(
                    map((forms: EntryModeForm[]) => EntryModeActions.fetchSuccess({ forms })),
                    catchError((err) =>
                        of(EntryModeActions.fetchFailure({ errorMsg: err.message }))
                    )
                );
            })
        )
    );

    submit$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EntryModeActions.userSubmitted),
            switchMap(({ form }) => {
                return this.formsApiService.submitForm(form).pipe(
                    map((form: EntryModeForm) => EntryModeActions.submitSuccess({ form })),
                    catchError((err) =>
                        of(EntryModeActions.submitFailure({ errorMsg: err.message }))
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