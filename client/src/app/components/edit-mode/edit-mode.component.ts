import { isPlatformBrowser } from '@angular/common';
import { AfterViewChecked, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { pairwise, startWith } from 'rxjs/operators';
import { Field } from '@models/field';


@Component({
    selector: 'edit-mode',
    templateUrl: './edit-mode.component.html',
    styleUrls: [
        './edit-mode.component.common.scss',
        './edit-mode.component.desktop.scss',
        './edit-mode.component.mobile.scss',
    ]
})
export class EditModeComponent implements OnInit, AfterViewChecked {
    submitted: boolean = false;
    editModeForm: FormGroup;
    afterViewCheckedEnabled: boolean = true;
    showLoader: boolean = false;

    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        private formBuilder: FormBuilder) {
    }

    get fields(): FormArray {
        return this.editModeForm.get('fields') as FormArray;
    }

    get fieldsRange(): { min: number, max: number } {
        return { min: 1, max: 10 };
    }

    get isRemoveDisabled(): boolean {
        return this.fields.length < this.fieldsRange.min + 1;
    }

    ngOnInit(): void {
        const fields = [new Field()]
        this.editModeForm = this.formBuilder.group({
            fields: this.formBuilder.array(fields.map(field => this.createFieldControl(field)))
        })
    }

    ngAfterViewChecked(): void {
        if (!isPlatformBrowser(this.platformId) || !this.afterViewCheckedEnabled) return;
    }

    getFieldName(i: number): string {
        return `#${i > 8 ? (i + 1) : '0' + (i + 1)} ${this.fields.value[i].label || 'Untitled'}`;
    }

    onFieldsChanged(i?: number, $event?): void {
    }

    isFieldInvalid(i: number): boolean {
        return this.submitted && this.fields.controls[i].invalid;
    }

    removeField($event, i: number): void {
        if (this.isRemoveDisabled) return;
        $event.stopPropagation();
        this.fields.removeAt(i);
    }

    createFieldControl(field?: Field): AbstractControl {
        const fieldControl = this.formBuilder.control(field || new Field(), Validators.required);
        fieldControl.valueChanges.pipe(
            startWith(field || new Field()),
            pairwise()
        ).subscribe(([prev, next]) => {
            this.afterViewCheckedEnabled = prev !== next;
        })

        if (this.submitted) {
            fieldControl.setErrors({ required: true });
        }

        return fieldControl;
    }

    addField(): void {
        const fieldControl = this.createFieldControl();
        this.fields.push(fieldControl);
        this.afterViewCheckedEnabled = true;
        this.onFieldsChanged();
    }

    onSubmit(): void {
    }
}