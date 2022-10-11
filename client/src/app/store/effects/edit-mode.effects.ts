import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { FormsApiService } from '@services/forms-api.service';
import { FormSchemaField } from "@models/form-schema-field";
import { EditModeActions } from "@store/actions";

@Injectable()
export class EditModeEffects {
    fetch$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EditModeActions.fetch),
            switchMap(({ query }) => {
                return this.formsApiService.getFormSchema().pipe(
                    map((fields: FormSchemaField[]) => EditModeActions.fetchSuccess({ fields })),
                    catchError((err) =>
                        of(EditModeActions.fetchFailure({ errorMsg: err.message }))
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

function debounceTime(debounce: any, scheduler: any): any {
    throw new Error("Function not implemented.");
}
