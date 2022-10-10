import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormBuilder, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validators } from '@angular/forms';
import { Field } from '@models/field';


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
export class FieldInputComponent implements ControlValueAccessor {
    @Input() submitted: boolean = false;
    @Output() fieldChanged: EventEmitter<Field> = new EventEmitter<Field>();
    fieldInputForm: FormGroup;
    field: Field = new Field();
    touched: boolean = false;
    disabled: boolean = false;

    constructor(private formBuilder: FormBuilder) {
        this.fieldInputForm = this.formBuilder.group({
            label: [null, [Validators.required, Validators.maxLength(50)]],
            type: [null, Validators.required]
        });
    }

    get f() { return this.fieldInputForm.controls; }

    onInput(field: string): void {
        this.field[field] = this.fieldInputForm.get(field).value;
        this.onChange(this.field);
        this.fieldChanged.emit(this.field);
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
        const { label, type } = field;
        this.fieldInputForm.get('label').setValue(label);
        this.fieldInputForm.get('type').setValue(type);
        this.field = field;
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