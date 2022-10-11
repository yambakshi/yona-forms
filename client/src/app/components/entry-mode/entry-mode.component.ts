import { Component, Input, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Field } from '@models/field';
import { Store } from '@ngrx/store';
import { FormsApiService } from '@services/forms-api.service';
import * as fromLayout from '@store/reducers/layout.reducer';


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
    @Input() formSchema: Field[];
    @ViewChild('form') ngEntryForm: NgForm;
    submitted: boolean = false;
    entryForm: FormGroup;
    showLoader: boolean = false;

    constructor(
        private store: Store<fromLayout.State>,
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
        this.ngEntryForm && this.ngEntryForm.resetForm();
        const entryFieldsGroups = this.formSchema.map(({ label, type, options }) => {
            const entryFieldGroup = this.formBuilder.group({
                metadata: [{ label, type, options }, []],
                answer: [null, Validators.required],
            })

            return entryFieldGroup;
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