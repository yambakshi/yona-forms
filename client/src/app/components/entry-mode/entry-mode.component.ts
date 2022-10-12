import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, PLATFORM_ID, SimpleChange, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { EntryModeForm } from '@models/entry-form';
import { FormSchemaField } from '@models/form-schema-field';
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
    // @Input() formSchema: FormSchemaField[];
    // @Input() entryFormSchema: EntryModeForm;
    @ViewChild('form') ngEntryForm: NgForm;
    submitted: boolean = false;
    entryForm: FormGroup;
    showLoader: boolean = false;

    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
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

    ngOnChanges(changes: SimpleChange) {
        // if (!isPlatformBrowser(this.platformId) || changes['entryFormSchema']) return;

        // if (this.ngEntryForm) {
        //     this.ngEntryForm.resetForm();
        // }

        // const entryFieldsGroups = this.formSchema.map(({ label, type, options }, i) => {
        //     const answer = this.entryFormSchema[i] && this.entryFormSchema[i].answer;
        //     const entryFieldGroup = this.formBuilder.group({
        //         metadata: [{ label, type, options }, []],
        //         answer: [answer, Validators.required],
        //     })

        //     return entryFieldGroup;
        // })

        // this.entryForm.setControl('entryFields', this.formBuilder.array(entryFieldsGroups));
    }

    onInput(): void {
        // const fields = this.entryFields.controls.map(control => {
        //     const { metadata, answer } = control.value;
        //     return { question: metadata.label, answer };
        // });

        // const form: EntryModeForm = { fields };

        // this.editModestore.dispatch(EntryModeActions.userAnswered({ form }));
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