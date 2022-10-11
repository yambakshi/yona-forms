import { Component, ElementRef, Input, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { Field } from '@models/field';


@Component({
    selector: 'view-mode',
    templateUrl: './view-mode.component.html',
    styleUrls: [
        './view-mode.component.common.scss',
        './view-mode.component.desktop.scss',
        './view-mode.component.mobile.scss',
    ],
    encapsulation: ViewEncapsulation.None
})
export class ViewModeComponent {
    @Input() formSchema: Field[];
    @ViewChild('viewModeContainer') viewModeContainer: ElementRef;

    constructor(
        private renderer: Renderer2) { }

    ngOnChanges(): void {
        if (!this.viewModeContainer) return;
        const stateLogEntry = this.renderer.createElement('div');

        // Date
        const date = this.renderer.createElement('div');
        this.renderer.setAttribute(date, 'class', 'state-log-entry-date');
        this.renderer.setProperty(date, 'innerHTML', new Date());

        // Form entry
        const formEntry = this.renderer.createElement('div');
        const formEntryH1 = this.renderer.createElement('h1');
        const formEntryValue = this.renderer.createElement('div');
        this.renderer.setProperty(formEntryH1, 'innerHTML', 'Form Entry');
        this.renderer.setProperty(formEntryValue, 'innerHTML', '');
        this.renderer.appendChild(formEntry, formEntryH1);
        this.renderer.appendChild(formEntry, formEntryValue);

        // Form schema
        const formSchema = this.renderer.createElement('div');
        const formSchemaH1 = this.renderer.createElement('h1');
        const formSchemaValue = this.renderer.createElement('div');
        this.renderer.setProperty(formSchemaH1, 'innerHTML', 'Form Schema');
        this.renderer.setProperty(formSchemaValue, 'innerHTML', JSON.stringify(this.formSchema));
        this.renderer.appendChild(formSchema, formSchemaH1);
        this.renderer.appendChild(formSchema, formSchemaValue);

        this.renderer.setAttribute(stateLogEntry, 'class', 'state-log-entry');
        this.renderer.appendChild(stateLogEntry, date);
        this.renderer.appendChild(stateLogEntry, formEntry);
        this.renderer.appendChild(stateLogEntry, formSchema);
        this.renderer.appendChild(this.viewModeContainer.nativeElement, stateLogEntry);
    }
}