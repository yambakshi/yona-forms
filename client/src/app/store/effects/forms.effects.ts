import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { FormsApiService } from '@services/forms-api.service';
import { FormsActions } from "@store/actions";
import { EntryModeForm } from "@models/forms";

@Injectable()
export class FormsModeEffects {
    fetch$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FormsActions.fetch),
            switchMap(({ id }) => {
                return this.formsApiService.getForms(id).pipe(
                    map((forms: EntryModeForm[]) => FormsActions.fetchSuccess({ forms })),
                    catchError((err) =>
                        of(FormsActions.fetchFailure({ errorMsg: err.message }))
                    )
                );
            })
        )
    );

    submit$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FormsActions.userSubmitted),
            switchMap(({ form }) => {
                return this.formsApiService.submitForm(form).pipe(
                    map((form: EntryModeForm) => FormsActions.submitSuccess({ form })),
                    catchError((err) =>
                        of(FormsActions.submitFailure({ errorMsg: err.message }))
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