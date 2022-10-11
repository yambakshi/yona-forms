import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, PLATFORM_ID, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { EntryField } from '@models/entry-field';
import { FormSchemaField } from '@models/form-schema-field';
import { Store } from '@ngrx/store';
import { FormsApiService } from '@services/forms-api.service';
import { EntryModeActions } from '@store/actions';
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
    @Input() formSchemaStore: FormSchemaField[];
    @Input() entryFormStore: EntryField[];
    @ViewChild('form') ngEntryForm: NgForm;
    submitted: boolean = false;
    entryForm: FormGroup;
    showLoader: boolean = false;
    entryFormChanges: Subscription;

    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
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
        if (!isPlatformBrowser(this.platformId)) return;

        if (this.ngEntryForm) {
            this.entryFormChanges.unsubscribe();
            this.ngEntryForm.resetForm();
        }

        const entryFieldsGroups = this.formSchemaStore.map(({ label, type, options }, i) => {
            const entryFieldGroup = this.formBuilder.group({
                metadata: [{ label, type, options }, []],
                answer: [this.entryFormStore[i].answer, Validators.required],
            })

            return entryFieldGroup;
        })

        this.entryForm.setControl('entryFields', this.formBuilder.array(entryFieldsGroups));

        this.entryFormChanges = this.entryForm.valueChanges.pipe(
            startWith([]),
            pairwise()
        ).subscribe(([prev, next]) => {
            const fields = next.entryFields.map(({ metadata, answer }) => ({ question: metadata.label, answer }));
            this.store.dispatch(EntryModeActions.userAnswered({ fields }));
        })
    }

    onSubmit(): void {
        (this.entryForm as any).submitted = true;
        if (this.entryForm.invalid) {
            return;
        }

        console.log(JSON.stringify(this.entryForm.value))
    }
}