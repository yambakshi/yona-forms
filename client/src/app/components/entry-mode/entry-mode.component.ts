import { Component, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { EntryModeForm } from '@models/entry-mode-form';
import { select, Store } from '@ngrx/store';
import { EntryModeActions } from '@store/actions';
import * as fromEditMode from '@store/reducers/edit-mode.reducer';
import * as fromEntryMode from '@store/reducers/entry-mode.reducer';
import { selectEditModeStateValue } from '@store/selectors/edit-mode.selector';


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
    @ViewChild('form') ngEntryForm: NgForm;
    submitted: boolean = false;
    entryForm: FormGroup;
    showLoader: boolean = false;

    constructor(
        private editModeStore: Store<fromEditMode.State>,
        private entryModeStore: Store<fromEntryMode.State>,
        private formBuilder: FormBuilder) {
        this.entryForm = this.formBuilder.group({
            entryFields: this.formBuilder.array([])
        })

        this.editModeStore.pipe(select(selectEditModeStateValue)).subscribe(formSchema => {
            if (this.ngEntryForm) {
                this.ngEntryForm.resetForm();
            }

            const entryFieldsGroups = formSchema.fields.map(({ label, type, options }, i) => {
                const entryFieldGroup = this.formBuilder.group({
                    metadata: [{ label, type, options }, []],
                    answer: ['', Validators.required],
                })

                return entryFieldGroup;
            })

            this.entryForm.setControl('entryFields', this.formBuilder.array(entryFieldsGroups));
        })
    }

    get entryFields(): FormArray {
        return this.entryForm.get('entryFields') as FormArray;
    }

    onSubmit(): void {
        (this.entryForm as any).submitted = true;
        if (this.entryForm.invalid) {
            return;
        }

        const fields = this.entryFields.controls.map(control => {
            const { metadata, answer } = control.value;
            return { question: metadata.label, answer };
        });

        const form: EntryModeForm = { fields };

        this.entryModeStore.dispatch(EntryModeActions.userSubmitted({ form }));
    }
}