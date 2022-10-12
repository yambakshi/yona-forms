import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormSchemaField } from '@models/form-schema-field';
import { EditModeForm } from '@models/forms';
import { Store } from '@ngrx/store';
import { EditModeActions } from '@store/actions';
import * as fromEditMode from '@store/reducers/edit-mode.reducer';


@Component({
    selector: 'edit-mode',
    templateUrl: './edit-mode.component.html',
    styleUrls: [
        './edit-mode.component.common.scss',
        './edit-mode.component.desktop.scss',
        './edit-mode.component.mobile.scss',
    ]
})
export class EditModeComponent implements OnInit {
    submitted: boolean = false;
    formSchemaForm: FormGroup;
    showLoader: boolean = false;

    constructor(
        private store: Store<fromEditMode.State>,
        private formBuilder: FormBuilder) {
    }

    get fields(): FormArray {
        return this.formSchemaForm.get('fields') as FormArray;
    }

    get fieldsRange(): { min: number, max: number } {
        return { min: 1, max: 10 };
    }

    get isRemoveDisabled(): boolean {
        return this.fields.length < this.fieldsRange.min + 1;
    }

    ngOnInit(): void {
        const fields = [new FormSchemaField()]
        this.formSchemaForm = this.formBuilder.group({
            fields: this.formBuilder.array(fields.map(field => this.createFieldControl(field)))
        })

        // this.formSchemaForm.valueChanges.pipe(
        //     startWith({ fields }),
        //     pairwise()
        // ).subscribe(([prev, next]) => {
        //     this.store.dispatch(EditModeActions.userModifiedSchema(next));
        // })
    }

    getFieldName(i: number): string {
        return `#${i > 8 ? (i + 1) : '0' + (i + 1)} ${this.fields.value[i].label || 'Untitled'}`;
    }

    isFieldInvalid(i: number): boolean {
        return this.submitted && this.fields.controls[i].invalid;
    }

    removeField($event, i: number): void {
        if (this.isRemoveDisabled) return;
        $event.stopPropagation();
        this.fields.removeAt(i);
    }

    createFieldControl(field?: FormSchemaField): AbstractControl {
        const fieldControl = this.formBuilder.control(field || new FormSchemaField(), Validators.required);
        return fieldControl;
    }

    addField(): void {
        const fieldControl = this.createFieldControl();
        this.fields.push(fieldControl);
    }

    onSubmit(): void {
        this.submitted = true;
        if (this.formSchemaForm.invalid) return;
        // this.showLoader = true;
        // this.formsApiService.addFormSchema(this.formSchemaForm.value.fields).subscribe((res: ApiResponse) => {
        //     this.showLoader = false;
        //     if (!res) return;
        // })

        const form: EditModeForm = { fields: this.formSchemaForm.value.fields };
        this.store.dispatch(EditModeActions.userSubmitted({ form }));
    }
}