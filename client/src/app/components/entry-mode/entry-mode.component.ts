import { Component, Input, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { FormSchemaField } from '@models/form-schema-field';
import { Store } from '@ngrx/store';
import { FormsApiService } from '@services/forms-api.service';
import { EntryFormActions } from '@store/actions';
import * as fromEditMode from '@store/reducers/edit-mode.reducer';
import { Subscription } from 'rxjs';
import { pairwise, startWith } from 'rxjs/operators';


@Component({
    selector: 'entry-mode',
    templateUrl: './entry-mode.component.html',
    styleUrls: [
        './entry-mode.component.common.scss',
        './entry-mode.component.desktop.scss',
        './entry-mode.component.mobile.scss',
    ]
})
export class EntryModeComponent {
    @Input() formSchema: FormSchemaField[];
    @ViewChild('form') ngEntryForm: NgForm;
    submitted: boolean = false;
    entryForm: FormGroup;
    showLoader: boolean = false;
    entryFormChanges: Subscription;

    constructor(
        private store: Store<fromEditMode.State>,
        private formsApiService: FormsApiService,
        private formBuilder: FormBuilder) {
        this.entryForm = this.formBuilder.group({
            entryFields: this.formBuilder.array([])
        })
    }

    get entryFields(): FormArray {
        return this.entryForm.get('entryFields') as FormArray;
    }

    ngOnChanges() {
        if (this.ngEntryForm) {
            this.entryFormChanges.unsubscribe();
            this.ngEntryForm.resetForm();
        }

        const entryFieldsGroups = this.formSchema.map(({ label, type, options }) => {
            const entryFieldGroup = this.formBuilder.group({
                metadata: [{ label, type, options }, []],
                answer: [null, Validators.required],
            })

            return entryFieldGroup;
        })

        this.entryFormChanges = this.entryForm.valueChanges.pipe(
            startWith([]),
            pairwise()
        ).subscribe(([prev, next]) => {
            const fields = next.entryFields.map(({ metadata, answer }) => ({ question: metadata.label, answer }));
            this.store.dispatch(EntryFormActions.userAnswered({ fields }));
        })

        this.entryForm.setControl('entryFields', this.formBuilder.array(entryFieldsGroups));
    }

    onSubmit(): void {
        (this.entryForm as any).submitted = true;
        if (this.entryForm.invalid) {
            return;
        }

        console.log(JSON.stringify(this.entryForm.value))
    }
}