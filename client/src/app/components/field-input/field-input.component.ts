import { isPlatformBrowser } from '@angular/common';
import { Component, Input, Output, EventEmitter, ViewEncapsulation, Inject, PLATFORM_ID, AfterViewChecked } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormArray, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validators } from '@angular/forms';
import { FieldType } from '@enums/field-type.enum';
import { Field } from '@models/field';
import { pairwise, startWith } from 'rxjs/operators';

interface DropdownOption {
    value: string;
    viewValue: string;
}

@Component({
    selector: 'field-input',
    templateUrl: './field-input.component.html',
    styleUrls: ['./field-input.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        multi: true,
        useExisting: FieldInputComponent
    },
    {
        provide: NG_VALIDATORS,
        multi: true,
        useExisting: FieldInputComponent
    }]
})
export class FieldInputComponent implements ControlValueAccessor, AfterViewChecked {
    @Input() submitted: boolean = false;
    @Output() fieldChanged: EventEmitter<Field> = new EventEmitter<Field>();
    afterViewCheckedEnabled: boolean = true;
    fieldInputForm: FormGroup;
    field: Field = new Field();
    fieldTypes: DropdownOption[] = [];
    touched: boolean = false;
    disabled: boolean = false;

    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        private formBuilder: FormBuilder) {
        this.fieldTypes = Object.entries(FieldType).map(([k, v]) => ({
            value: v,
            viewValue: k.charAt(0).toUpperCase() + k.slice(1)
        }));

        this.fieldInputForm = this.formBuilder.group({
            label: [null, [Validators.required, Validators.maxLength(80)]],
            type: [null, Validators.required],
            options: this.formBuilder.array([])
        });

        this.fieldInputForm.valueChanges.pipe(
            startWith({}),
            pairwise()
        ).subscribe(([prev, next]) => {
            this.onChange(next);
        })
    }

    get f() { return this.fieldInputForm.controls; }

    get options(): FormArray {
        return this.fieldInputForm.get('options') as FormArray;
    }

    get isRadioButton(): boolean {
        return this.fieldInputForm.get('type').value === FieldType.Radio;
    }

    get isRemoveDisabled(): boolean {
        return this.options.length < this.optionsRange.min + 1;
    }

    get optionsRange(): { min: number, max: number } {
        return { min: 1, max: 10 };
    }

    ngAfterViewChecked(): void {
        if (!isPlatformBrowser(this.platformId) || !this.afterViewCheckedEnabled) return;
    }

    ngOnChanges(): void {
        if (this.submitted) {
            this.fieldInputForm.controls['label'].markAsTouched();
            this.options.controls.forEach(option => option.markAsTouched());
        } else {
            this.fieldInputForm.controls['label'].markAsUntouched()
            this.options.controls.forEach(option => option.markAsUntouched());
        }
    }

    createOptionControl(value?: string): FormControl {
        const optionControl = this.formBuilder.control(value, [Validators.required, Validators.maxLength(80)]);

        if (this.submitted) {
            optionControl.markAsTouched();
        }

        return optionControl;
    }

    removeFieldOption($event, i: number): void {
        if (this.isRemoveDisabled) return;
        $event.stopPropagation();
        this.options.removeAt(i);
    }

    addOption(): void {
        const fieldControl = this.createOptionControl();
        this.options.push(fieldControl);
        this.afterViewCheckedEnabled = true;
    }

    onTouched = () => { };

    markAsTouched() {
        if (!this.touched) {
            this.onTouched();
            this.touched = true;
        }
    }

    onChange = (field: Field) => { };

    registerOnChange(onChange: any): void {
        this.onChange = onChange;
    }

    writeValue(field: Field) {
        if (!field) return;
        const { label, type, options } = field;
        this.fieldInputForm.get('label').setValue(label);
        this.fieldInputForm.get('type').setValue(type);
        this.fieldInputForm.get('options').setValue(options);
        this.field = field;

        while (this.options.length !== 0) {
            this.options.removeAt(0);
        }

        options.forEach(option => {
            this.options.push(
                this.createOptionControl(option),
                { emitEvent: false });
        })

        if (options.length < this.optionsRange.max) {
            this.options.push(this.createOptionControl());
        }
    }

    registerOnTouched(onTouched: any) {
        this.onTouched = onTouched;
    }

    setDisabledState(disabled: boolean) {
        this.disabled = disabled;
    }

    validate(control: AbstractControl): ValidationErrors | null {
        if (!control.value) {
            return { field: { value: control.value } };
        } else if (!control.value.label) {
            return { label: { value: control.value.label } };
        } else if (!control.value.type) {
            return { type: { value: control.value.type } };
        }

        return null;
    }
}